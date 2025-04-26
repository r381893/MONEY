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
    <button class="add-btn" onclick="openModal('${cat}')">＋ 新增</button>
    <div class="card-container"></div>
  `;
  board.appendChild(column);
});

// 彈窗控制
function openModal(category) {
  document.getElementById('targetCategory').value = category;
  document.getElementById('modal').style.display = 'block';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
  document.getElementById('recordForm').reset();
}

// 表單提交
document.getElementById('recordForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const category = document.getElementById('targetCategory').value;
  const item = document.getElementById('item').value;
  const date = document.getElementById('date').value;
  const location = document.getElementById('location').value;
  const person = document.getElementById('person').value;
  const status = document.getElementById('status').value;
  const description = document.getElementById('description').value;
  const image = document.getElementById('image').value;

  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <p><strong>項目：</strong>${item}</p>
    <p><strong>日期：</strong>${date}</p>
    <p><strong>地點：</strong>${location}</p>
    <p><strong>處理人員：</strong>${person}</p>
    <p><strong>狀態：</strong>${status}</p>
    <p><strong>說明：</strong>${description}</p>
    ${image ? `<img src="${image}" alt="圖片">` : ''}
  `;

  const container = document.querySelector(`#${category} .card-container`);
  container.prepend(card); // 最新在上
  closeModal();
});
