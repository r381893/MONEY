const API_URL = '你的Google Apps Script Web App網址'; // ⚡請記得換成你的！

document.addEventListener('DOMContentLoaded', () => {
  loadRecords();
});

document.getElementById('recordForm').addEventListener('submit', async e => {
  e.preventDefault();

  const now = new Date();
  const data = {
    category: document.getElementById('category').value,
    time: now.toISOString().replace('T', ' ').substring(0, 19),
    index: document.getElementById('index').value,
    strike: document.getElementById('strike').value,
    price: document.getElementById('price').value,
    image: document.getElementById('image').value
  };

  await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(data)
  });

  document.getElementById('recordForm').reset();
  loadRecords();
});

async function loadRecords() {
  const res = await fetch(API_URL);
  const records = await res.json();

  const list = document.getElementById('recordList');
  list.innerHTML = records.reverse().map((r, index) => {
    return `
      <div class="record">
        <strong>${r.category}</strong><br/>
        📅 ${r.time}<br/>
        📈 指數：${r.index}<br/>
        📍 履約價：${r.strike}<br/>
        💰 成交價：${r.price}<br/>
        ${r.image ? `<img src="${r.image}" width="100%">` : ''}
        <button class="delete-btn" onclick="deleteRecord(${records.length - 1 - index})">🗑 刪除</button>
      </div>
    `;
  }).join('');
}

async function deleteRecord(index) {
  if (!confirm("確定要刪除這筆紀錄嗎？")) return;
  const payload = { deleteIndex: index };

  await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  loadRecords();
}
