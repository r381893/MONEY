const wall = document.getElementById('wall');
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxJqXhXs-6mhSWFhX5KIuWrJQg9BbaHJA5kTYRFnCwS_K74XGlciw05MaO444MRrkE8HA/exec';

// 頁面載入時還原 LocalStorage
window.onload = function() {
  const saved = localStorage.getItem('workWall');
  if (saved) {
    wall.innerHTML = saved;
  }
};

// 新增分類
function addCategory() {
  const name = document.getElementById('newCategory').value.trim();
  if (!name) return;

  const categoryDiv = document.createElement('div');
  categoryDiv.className = 'category';
  categoryDiv.innerHTML = `
    <div class="category-header">
      <h3 contenteditable="true">${name}</h3>
      <div>
        <button onclick="addItem(this)">➕ 細項</button>
        <button onclick="deleteCategory(this)">🗑️ 刪除分類</button>
      </div>
    </div>
    <div class="items"></div>
  `;
  wall.appendChild(categoryDiv);
  document.getElementById('newCategory').value = '';
  saveLocal();
}

// 新增細項
function addItem(btn) {
  const itemsDiv = btn.closest('.category').querySelector('.items');
  const now = new Date();
  const timestamp = now.toLocaleString();

  const itemDiv = document.createElement('div');
  itemDiv.className = 'item';
  itemDiv.innerHTML = `
    <div><strong>時間：</strong>${timestamp}</div>
    <input type="text" placeholder="指數 (例：19800)" onchange="saveLocal()">
    <input type="text" placeholder="履約價 (例：20000)" onchange="saveLocal()">
    <input type="text" placeholder="成交價 (例：85)" onchange="saveLocal()">
    <input type="text" placeholder="圖片連結 (可選)" onchange="saveLocal()">
    <button onclick="deleteItem(this)">❌ 刪除細項</button>
  `;
  itemsDiv.appendChild(itemDiv);
  saveLocal();
}

// 刪除分類
function deleteCategory(btn) {
  if (confirm('確定要刪除這個分類？')) {
    btn.closest('.category').remove();
    saveLocal();
  }
}

// 刪除細項
function deleteItem(btn) {
  if (confirm('確定要刪除這個細項？')) {
    btn.closest('.item').remove();
    saveLocal();
  }
}

// 儲存 LocalStorage
function saveLocal() {
  localStorage.setItem('workWall', wall.innerHTML);
}

// 清除 LocalStorage
function clearLocal() {
  if (confirm('確定要清除所有暫存資料？')) {
    localStorage.removeItem('workWall');
    location.reload();
  }
}

// 儲存到 Google 表單
function saveToGoogle() {
  const data = [];
  document.querySelectorAll('.category').forEach(category => {
    const categoryName = category.querySelector('h3').innerText.trim();
    const items = [];
    category.querySelectorAll('.item').forEach(item => {
      const fields = item.querySelectorAll('input');
      const timeText = item.querySelector('div').innerText.replace('時間：', '').trim();
      items.push({
        time: timeText,
        index: fields[0]?.value || '',
        strike: fields[1]?.value || '',
        price: fields[2]?.value || '',
        image: fields[3]?.value || ''
      });
    });
    data.push({ name: categoryName, items });
  });

  const form = document.createElement('form');
  form.action = SHEET_URL;
  form.method = 'POST';
  form.target = '_blank';
  form.style.display = 'none';

  const input = document.createElement('input');
  input.name = 'data';
  input.value = JSON.stringify(data);
  form.appendChild(input);

  document.body.appendChild(form);
  form.submit();
}
