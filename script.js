let wall = document.getElementById('wall');

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

  // TODO: 儲存到 Google Sheet
}

function deleteCategory(btn) {
  if (confirm('確定刪除這個分類？')) {
    btn.closest('.category').remove();
    // TODO: 更新 Google Sheet
  }
}

function addItem(btn) {
  const itemsDiv = btn.closest('.category').querySelector('.items');
  
  const itemDiv = document.createElement('div');
  itemDiv.className = 'item';
  itemDiv.innerHTML = `
    <input type="text" placeholder="輸入細項..." onchange="saveData()">
    <input type="text" placeholder="圖片連結 (可選)" onchange="saveData()">
    <button onclick="deleteItem(this)">❌刪除細項</button>
  `;

  itemsDiv.appendChild(itemDiv);

  // TODO: 儲存到 Google Sheet
}

function deleteItem(btn) {
  if (confirm('確定刪除這個細項？')) {
    btn.closest('.item').remove();
    // TODO: 更新 Google Sheet
  }
}

function saveData() {
  // TODO: 將目前資料整理並送到 Google Sheet
}
