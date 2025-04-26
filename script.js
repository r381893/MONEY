let editingId = null;

// 按 新增細項
document.getElementById('addCardBtn').addEventListener('click', () => {
  editingId = null;
  document.getElementById('formTitle').innerText = '新增細項';
  clearForm();
  showForm();
});

// 按 取消
document.getElementById('cancelCardBtn').addEventListener('click', () => {
  hideForm();
});

// 按 儲存
document.getElementById('saveCardBtn').addEventListener('click', () => {
  const time = document.getElementById('cardTime').value;
  const content = document.getElementById('cardContent').value.trim();
  const category = document.getElementById('cardCategory').value.trim();
  const person = document.getElementById('cardPerson').value.trim();

  if (!time || !content || !category || !person) {
    alert('請填寫完整資訊');
    return;
  }

  let cards = getCards();

  if (editingId) {
    const index = cards.findIndex(c => c.id === editingId);
    if (index !== -1) {
      cards[index] = { id: editingId, time, content, category, person };
    }
  } else {
    cards.push({
      id: Date.now(),
      time,
      content,
      category,
      person
    });
  }

  saveCards(cards);
  renderCards();
  hideForm(); // 儲存後隱藏表單
});

// 顯示表單
function showForm() {
  document.getElementById('cardFormContainer').classList.remove('hidden');
}

// 隱藏表單
function hideForm() {
  document.getElementById('cardFormContainer').classList.add('hidden');
}

// 清空表單
function clearForm() {
  document.getElementById('cardTime').value = '';
  document.getElementById('cardContent').value = '';
  document.getElementById('cardCategory').value = '';
  document.getElementById('cardPerson').value = '';
}

// 取得資料
function getCards() {
  try {
    return JSON.parse(localStorage.getItem('cards')) || [];
  } catch {
    return [];
  }
}

// 儲存資料
function saveCards(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
}

// 渲染卡片
function renderCards() {
  const cards = getCards();
  document.getElementById('board').innerHTML = '';

  const categories = [...new Set(cards.map(c => c.category))];

  categories.forEach(category => {
    const column = document.createElement('div');
    column.className = 'column';
    column.dataset.category = category;
    column.innerHTML = `<h2>${category}</h2><div class="cardList"></div>`;
    document.getElementById('board').appendChild(column);
  });

  cards.forEach(card => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    cardEl.innerHTML = `
      <div class="cardContent"><strong>內容：</strong>${card.content}</div>
      <div class="cardFooter">
        <div><strong>時間：</strong>${formatTime(card.time)}</div>
        <div><strong>人物：</strong>${card.person}</div>
      </div>
      <button onclick="editCard(${card.id})">✏️</button>
      <button style="right: 30px;" onclick="deleteCard(${card.id})">🗑️</button>
    `;
    const column = document.querySelector(`.column[data-category="${card.category}"] .cardList`);
    if (column) column.appendChild(cardEl);
  });
}

// 編輯卡片
function editCard(id) {
  const cards = getCards();
  const card = cards.find(c => c.id === id);
  if (card) {
    editingId = id;
    document.getElementById('formTitle').innerText = '編輯細項';
    document.getElementById('cardTime').value = card.time;
    document.getElementById('cardContent').value = card.content;
    document.getElementById('cardCategory').value = card.category;
    document.getElementById('cardPerson').value = card.person;
    showForm();
  }
}

// 刪除卡片
function deleteCard(id) {
  if (confirm('確定要刪除這筆資料嗎？')) {
    let cards = getCards();
    cards = cards.filter(c => c.id !== id);
    saveCards(cards);
    renderCards();
  }
}

// 時間格式化
function formatTime(timeString) {
  const d = new Date(timeString);
  if (!isNaN(d)) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0') +
           ' ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }
  return timeString;
}

// 初始化
renderCards();
