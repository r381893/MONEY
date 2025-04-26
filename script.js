let editingId = null;

renderCards();

document.getElementById('addCardBtn').addEventListener('click', () => {
  editingId = null;
  clearForm();
  showForm();
});

document.getElementById('cancelCardBtn').addEventListener('click', () => {
  hideForm();
});

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

document.getElementById('addCategoryBtn').addEventListener('click', () => {
  const newCategory = prompt('請輸入新的分類名稱：');
  if (newCategory) {
    let categories = getCategories();
    if (!categories.includes(newCategory)) {
      categories.push(newCategory);
      saveCategories(categories);
      renderCards();
    }
  }
});

function showForm() {
  document.getElementById('cardFormContainer').classList.add('show');
  updateCategoryOptions();
}

function hideForm() {
  document.getElementById('cardFormContainer').classList.remove('show');
}

function clearForm() {
  document.getElementById('cardTime').value = '';
  document.getElementById('cardContent').value = '';
  document.getElementById('cardCategory').value = '';
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

function getCategories() {
  try {
    return JSON.parse(localStorage.getItem('categories')) || ["冷氣", "天車", "消防系統", "水系統", "空壓機", "一般鉗工"];
  } catch {
    return ["冷氣", "天車", "消防系統", "水系統", "空壓機", "一般鉗工"];
  }
}

function saveCategories(categories) {
  localStorage.setItem('categories', JSON.stringify(categories));
}

function updateCategoryOptions() {
  const categories = getCategories();
  const select = document.getElementById('cardCategory');
  select.innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join('');
}

function renderCards() {
  const cards = getCards();
  let categories = getCategories();
  const board = document.getElementById('board');
  board.innerHTML = '';

  if (categories.length === 0) {
    categories = ["冷氣", "天車", "消防系統", "水系統", "空壓機", "一般鉗工"];
    saveCategories(categories);
  }

  categories.forEach(category => {
    const column = document.createElement('div');
    column.className = 'column';
    column.dataset.category = category;

    column.innerHTML = `
      <div class="columnHeader">
        <h2 class="categoryTitle">${category}</h2>
        <div class="columnButtons">
          <button class="editCategoryBtn" data-category="${category}">✏️</button>
          <button class="deleteCategoryBtn" data-category="${category}">🗑️</button>
        </div>
      </div>
      <div class="cardList"></div>
    `;
    board.appendChild(column);
  });

  document.querySelectorAll('.editCategoryBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const oldCategory = btn.getAttribute('data-category');
      editCategory(oldCategory);
    });
  });

  document.querySelectorAll('.deleteCategoryBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      deleteCategory(category);
    });
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
      <button style="right: 5px;" onclick="deleteCard(${card.id})">🗑️</button>
    `;
    const column = document.querySelector(`.column[data-category="${card.category}"] .cardList`);
    if (column) column.appendChild(cardEl);
  });
}

function editCategory(oldCategory) {
  const newCategory = prompt('請輸入新的分類名稱：', oldCategory);
  if (newCategory && newCategory !== oldCategory) {
    let categories = getCategories();
    categories = categories.map(c => c === oldCategory ? newCategory : c);
    saveCategories(categories);

    let cards = getCards();
    cards = cards.map(card => {
      if (card.category === oldCategory) {
        card.category = newCategory;
      }
      return card;
    });
    saveCards(cards);

    renderCards();
  }
}

function deleteCategory(category) {
  if (confirm(`確定要刪除分類 "${category}"？這將會刪除該分類下所有細項！`)) {
    let categories = getCategories().filter(c => c !== category);
    saveCategories(categories);

    let cards = getCards().filter(card => card.category !== category);
    saveCards(cards);

    renderCards();
  }
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
