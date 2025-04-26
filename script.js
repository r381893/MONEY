// script.js

const addCardBtn = document.getElementById('addCardBtn');
const cardFormContainer = document.getElementById('cardFormContainer');
const saveCardBtn = document.getElementById('saveCardBtn');
const cancelCardBtn = document.getElementById('cancelCardBtn');
const cardContainer = document.getElementById('cardContainer');

const cardCategory = document.getElementById('cardCategory');
const cardTitle = document.getElementById('cardTitle');
const cardDetails = document.getElementById('cardDetails');
const formTitle = document.getElementById('formTitle');

let editingCardId = null;

// 讀取本地資料
let cards = JSON.parse(localStorage.getItem('cards')) || [];

function renderCards() {
  cardContainer.innerHTML = '';
  cards.forEach((card, index) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    cardEl.innerHTML = `
      <div class="category">分類：${card.category}</div>
      <h3>${card.title}</h3>
      <div class="details">${card.details}</div>
      <div class="cardButtons">
        <button onclick="editCard(${index})">✏️ 編輯</button>
        <button onclick="deleteCard(${index})">🗑️ 刪除</button>
      </div>
    `;
    cardContainer.appendChild(cardEl);
  });
}

function openForm(isEdit = false) {
  cardFormContainer.classList.remove('hidden');
  formTitle.textContent = isEdit ? '編輯工作' : '新增工作';
}

function closeForm() {
  cardFormContainer.classList.add('hidden');
  cardCategory.value = '';
  cardTitle.value = '';
  cardDetails.value = '';
  editingCardId = null;
}

addCardBtn.addEventListener('click', () => {
  openForm(false);
});

cancelCardBtn.addEventListener('click', () => {
  closeForm();
});

saveCardBtn.addEventListener('click', () => {
  const category = cardCategory.value.trim();
  const title = cardTitle.value.trim();
  const details = cardDetails.value.trim();

  if (!category || !title) {
    alert('請填寫分類和標題！');
    return;
  }

  if (editingCardId !== null) {
    cards[editingCardId] = { category, title, details };
  } else {
    cards.push({ category, title, details });
  }

  localStorage.setItem('cards', JSON.stringify(cards));
  renderCards();
  closeForm();
});

function editCard(index) {
  const card = cards[index];
  cardCategory.value = card.category;
  cardTitle.value = card.title;
  cardDetails.value = card.details;
  editingCardId = index;
  openForm(true);
}

function deleteCard(index) {
  if (confirm('確定要刪除這張卡片嗎？')) {
    cards.splice(index, 1);
    localStorage.setItem('cards', JSON.stringify(cards));
    renderCards();
  }
}

// 初始化
renderCards();

// 把全域函數掛到 window，讓 HTML 裡 onclick 可以呼叫
window.editCard = editCard;
window.deleteCard = deleteCard;
