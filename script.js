const categories = [
  "冷氣",
  "天車",
  "空壓機",
  "消防系統",
  "水系統",
  "工作母機",
  "堆高機與升空車",
  "一般鉗工",
  "電銲"
];

// 建立分類欄位
const board = document.getElementById('board');
categories.forEach(cat => {
  const column = document.createElement('div');
  column.className = 'column';
  column.id = cat;
  column.innerHTML = `
    <h2>${cat}</h2>
    <button class="add-btn" onclick="openModal('${cat}')">➕ 新增紀錄</button>
    <div class="card-container"></div>
  `;
  board.appendChild(column);
});

function openModal(category) {
  document.getElementById('targetCategory').value = category;
  document.getElementById('modal').style.display = 'block';
  document.getElementById('date').valueAsDate = new Date();
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
  document.getElementById('recordForm').reset();
}

document.getElementById('recordForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const category = document.getElementById('targetCategory').value;
  const item = document.getElementById('item').value;
  const date = document.getElementById('date').value;
  const location = document.getElementById('location').value;
  const person = document.getElementById('person').value;
  const status = document.getElementById('status').value;
  const description = document.getElementById('description').value;
  let image = document.getElementById('image').value;

  // ⛏️ 自動轉換 Google Drive 分享網址
  const match = image.match(/\/d\/(.*?)\//);
  if (match) {
    image = `https://drive.google.com/uc?id=${match[1]}`;
  }

  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <p><strong>項目：</strong><span contenteditable="true">${item}</span></p>
    <p><strong>日期：</strong><span contenteditable="true">${date}</span></p>
    <p><strong>地點：</strong><span contenteditable="true">${location}</span></p>
    <p><strong>人員：</strong><span contenteditable="true">${person}</span></p>
    <p><strong>狀態：</strong><span contenteditable="true">${status}</span></p>
    <p><strong>說明：</strong><span contenteditable="true">${description}</span></p>
    ${image ? `<img src="${image}" alt="圖片">` : ''}
  `;

  const container = document.querySelector(`#${category} .card-container`);
  container.prepend(card);
  closeModal();
});
