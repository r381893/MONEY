function showForm() {
  document.getElementById('formContainer').style.display = 'block';
}

function hideForm() {
  document.getElementById('formContainer').style.display = 'none';
  document.getElementById('recordForm').reset();
}

document.getElementById('recordForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const category = document.getElementById('category').value;
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
    ${image ? `<img src="${image}" alt="工作照片">` : ''}
  `;

  document.getElementById(category).appendChild(card);

  hideForm();
});
