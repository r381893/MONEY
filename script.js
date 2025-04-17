const apiUrl = 'https://script.google.com/macros/s/AKfycbxWYBbOsFTxwrArwQLNOqMJcWOMHHe-fqBGtqXgcvy2o7dMyShe2PLS5AL8jKs1WesD/exec';

function loadNotes() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const list = document.getElementById("recordList");
      list.innerHTML = "";
      data.forEach(note => {
        const li = document.createElement("li");
        li.textContent = `[${note.date} ${note.time}] ${note.content}`;
        list.appendChild(li);
      });
    })
    .catch(error => {
      console.error("讀取失敗：", error);
      document.getElementById("recordList").innerHTML = "❌ 無法讀取紀錄，請檢查後端設定";
    });
}

function saveNote() {
  const input = document.getElementById("noteInput").value.trim();
  if (!input) {
    alert("請輸入內容！");
    return;
  }

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: input })
  })
    .then(() => {
      document.getElementById("noteInput").value = "";
      loadNotes();
    })
    .catch(error => {
      console.error("儲存失敗：", error);
      alert("❌ 無法儲存紀錄，請檢查後端設定！");
    });
}

loadNotes();
