let editingId = null;

// 點擊 "新增細項" 按鈕
document.getElementById('addCardBtn').addEventListener('click', () => {
  editingId = null;
  document.getElementById('formTitle').innerText = '新增細項';
  document.getElementById('cardFormContainer').classList.remove('hidden');
  clearForm();
});

// 點擊 "取消" 按鈕
document.getElementById('cancelCardBtn').addEventListener('click', () => {
  document.getElementById('cardFormContainer').classList.add('hidden');
});

// 點擊 "儲存" 按鈕
document.getElementById('saveCardBtn').addEventListener('click', () => {
  const time = document.getElementById('cardTime').value;
  const content = document.getElementById('cardContent').value.trim();
  const category = document.getElementById('cardCategory').value;
  const person = document.getElementById('cardPerson').value.trim();

  if (!time || !content || !person) {
    alert('請填寫完整資訊');
    return;
  }

  let cards = getCards();

  if (editingId) {
    // 編輯模式
    const cardIndex = cards.findIndex(c => c.id === editingId);
    if (cardIndex !== -1) {
      cards[cardIndex] = { id: editingId, time, content, category, person };
    }
  } else {
    // 新增模式
    const newCard = {
      id: Date.now(),
      time,
      content,
      category,
      person
    };
    cards.push(newCard);
  }

  saveCards(cards);
  renderCards();

  // ✅ 儲存後自動關閉表單
  document.getElementById('cardFormContainer').classList.add('hidden');
});

// 清空表單
function clearForm() {
  document.getElementById('cardTime').value = '';
  document.getElementById('cardContent').value = '';
  document.getElementById('cardCategory').value = '冷氣';
  document.getElementById('cardPerson').value = '';
}

// 取得 localStorage 中的卡片
function getCards() {
  const data = localStorage.getItem('cards');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('資料解析錯誤，自動清空', e);
      localStorage.removeItem('cards');
      return [];
    }
  }
  return [];
}

// 儲存卡片到 localStorage
function saveCards(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
}

// 渲染卡片到畫面上
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
    document.getElementById('cardFormContainer').classList.remove('hidden');
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

// 格式化時間
function formatTime(timeString) {
  const d = new Date(timeString);
  if (!isNaN(d)) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0') +
           ' ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }
  return timeString;
}

// 頁面載入時初始化
renderCards();
