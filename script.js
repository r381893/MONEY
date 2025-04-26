let editingId = null;

document.getElementById('addCardBtn').addEventListener('click', () => {
  editingId = null;
  document.getElementById('formTitle').innerText = '新增細項';
  document.getElementById('cardFormContainer').classList.remove('hidden');
  clearForm();
});

document.getElementById('cancelCardBtn').addEventListener('click', () => {
  document.getElementById('cardFormContainer').classList.add('hidden');
});

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
    const cardIndex = cards.findIndex(c => c.id === editingId);
    if (cardIndex !== -1) {
      cards[cardIndex] = { id: editingId, time, content, category, person };
    }
  } else {
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
  document.getElementById('cardFormContainer').classList.add('hidden');
  renderCards();
});

function clearForm() {
  document.getElementById('cardTime').value = '';
  document.getElementById('cardContent').value = '';
  document.getElementById('cardCategory').value = '冷氣';
  document.getElementById('cardPerson').value = '';
}

function getCards() {
  const data = localStorage.getItem('cards');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('解析 LocalStorage 錯誤，清空資料', e);
      localStorage.removeItem('cards');
      return [];
    }
  }
  return [];
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
    document.getElementById('formTitle').innerText = '編輯細項';
    document.getElementById('cardTime').value = card.time;
    document.getElementById('cardContent').value = card.content;
    document.getElementById('cardCategory').value = card.category;
    document.getElementById('cardPerson').value = card.person;
    document.getElementById('cardFormContainer').classList.remove('hidden');
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
    return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0') + ' ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }
  return timeString;
}

renderCards();
