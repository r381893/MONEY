let editingId = null;

// 點新增
document.getElementById('addCardBtn').addEventListener('click', () => {
  editingId = null;
  clearForm();
  showForm();
});

// 點取消
document.getElementById('cancelCardBtn').addEventListener('click', () => {
  hideForm();
});

// 點儲存
document.getElementById('saveCardBtn').addEventListener('click', () => {
  const time = document.getElementById('cardTime').value;
  const content = document.getElementById('cardContent').value.trim();
  const category = document.getElementById('cardCategory').value;
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
  hideForm();
});

// 基本功能
function showForm() {
  document.getElementById('cardFormContainer').classList.add('show');
}

function hideForm() {
  document.getElementById('cardFormContainer').classList.remove('show');
}

function clearForm() {
  document.getElementById('cardTime').value = '';
  document.getElementById('cardContent').value = '';
  document.getElementById('cardCategory').value = '冷氣';
  document.getElementById('cardPerson').value = '';
}

function getCards() {
  try {
    return JSON.parse(localStorage.getItem('cards')) || [];
  } catch {
    return [];
  }
}

function saveCards(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
}

function renderCards() {
  const cards = getCards();
  document.querySelectorAll('.cardList').forEach(list => list.innerHTML = '');

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

function editCard(id) {
  const cards = getCards();
  const card = cards.find(c => c.id === id);
  if (card) {
    editingId = id;
    document.getElementById('cardTime').value = card.time;
    document.getElementById('cardContent').value = card.content;
    document.getElementById('cardCategory').value = card.category;
    document.getElementById('cardPerson').value = card.person;
    showForm();
  }
}

function deleteCard(id) {
  if (confirm('確定要刪除這筆資料嗎？')) {
    let cards = getCards();
    cards = cards.filter(c => c.id !== id);
    saveCards(cards);
    renderCards();
  }
}

function formatTime(timeString) {
  const d = new Date(timeString);
  if (!isNaN(d)) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0') +
           ' ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }
  return timeString;
}

renderCards();
