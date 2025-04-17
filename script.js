const apiUrl = 'https://script.google.com/macros/s/AKfycbxWYBbOsFTxwrArwQLNOqMJcWOMHHe-fqBGtqXgcvy2o7dMyShe2PLS5AL8jKs1WesD/exec';

function loadNotes() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("recordList");
      list.innerHTML = "";
      data.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `[${item.date} ${item.time}] ${item.content}`;
        list.appendChild(li);
      });
    })
    .catch(err => {
      document.getElementById("recordList").innerHTML = "❌ 無法讀取紀錄";
      console.error("讀取失敗：", err);
    });
}

function saveNote() {
  const input = document.getElementById("noteInput").value.trim();
  if (!input) {
    alert("請輸入內容");
    return;
  }

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: input })
  })
  .then(() => {
    document.getElementById("noteInput").value = "";
    loadNotes();
  })
  .catch(err => {
    alert("❌ 無法儲存紀錄");
    console.error("儲存錯誤：", err);
  });
}

loadNotes();
