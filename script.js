let wall = document.getElementById('wall');

// 如果有存在 localStorage，先載入
if (localStorage.getItem('workWall')) {
  wall.innerHTML = localStorage.getItem('workWall');
}

// 監聽動態新增的元素
wall.addEventListener('input', saveLocal);
wall.addEventListener('click', saveLocal);

function addCategory() {
  const categoryName = document.getElementById('newCategory').value.trim();
  if (categoryName === '') return;

  const categoryDiv = document.createElement('div');
  categoryDiv.className = 'category';

  categoryDiv.innerHTML = `
    <div class="category-header">
      <h3 contenteditable="true">${categoryName}</h3>
      <div>
        <button onclick="addItem(this)">➕細項</button>
        <button onclick="deleteCategory(this)">🗑️刪除分類</button>
      </div>
    </div>
    <div class="items"></div>
  `;

  wall.appendChild(categoryDiv);
  document.getElementById('newCategory').value = '';
  saveLocal();
}

function deleteCategory(btn) {
  if (confirm('確定刪除這個分類？')) {
    btn.closest('.category').remove();
    saveLocal();
  }
}

function addItem(btn) {
  const itemsDiv = btn.closest('.category').querySelector('.items');
  
  const now = new Date();
  const timestamp = now.toLocaleString();

  const itemDiv = document.createElement('div');
  itemDiv.className = 'item';
  itemDiv.innerHTML = `
    <div><strong>時間：</strong>${timestamp}</div>
    <input type="text" placeholder="指數 (例: 19800)" onchange="saveLocal()">
    <input type="text" placeholder="履約價 (例: 20000)" onchange="saveLocal()">
    <input type="text" placeholder="成交價 (例: 85)" onchange="saveLocal()">
    <input type="text" placeholder="圖片連結 (可選)" onchange="saveLocal()">
    <button onclick="deleteItem(this)">❌刪除細項</button>
  `;

  itemsDiv.appendChild(itemDiv);
  saveLocal();
}

function deleteItem(btn) {
  if (confirm('確定刪除這個細項？')) {
    btn.closest('.item').remove();
    saveLocal();
  }
}

function saveLocal() {
  localStorage.setItem('workWall', wall.innerHTML);
}

function getAllData() {
  const categories = [];
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
    categories.push({ name: categoryName, items });
  });
  return categories;
}

function saveToGoogle() {
  const data = getAllData();

  const form = document.createElement('form');
  form.action = 'https://script.google.com/macros/s/AKfycbxJqXhXs-6mhSWFhX5KIuWrJQg9BbaHJA5kTYRFnCwS_K74XGlciw05MaO444MRrkE8HA/exec';  // ★★★要填正確的 Web App URL
  form.method = 'POST';
  form.target = '_blank'; // 可有可無，讓表單開新頁面
  form.style.display = 'none';

  const input = document.createElement('input');
  input.name = 'data';
  input.value = JSON.stringify(data);
  form.appendChild(input);

  document.body.appendChild(form);
  form.submit();
}
