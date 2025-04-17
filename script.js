const apiUrl = 'https://script.google.com/macros/s/AKfycbySLXDED1lwY6Lzagv1KoFpXQECHjmh4aBpLMWhiSsPk3kej8FGRvDqWVAQkVHdYzHh/exec';

document.getElementById("saveBtn").addEventListener("click", saveNote);

function loadNotes() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("recordList");
      list.innerHTML = "";
      data.forEach(note => {
        const li = document.createElement("li");
        li.textContent = `[${note.date} ${note.time}] ${note.content}`;
        list.appendChild(li);
      });
    })
    .catch(err => {
      document.getElementById("recordList").innerHTML = "❌ 無法讀取紀錄，請檢查後端設定";
      console.error("讀取失敗", err);
    });
}

function saveNote() {
  const input = document.getElementById("noteInput").value.trim();
  if (!input) return alert("請輸入內容！");
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
      alert("❌ 儲存失敗，請檢查後端設定！");
      console.error("儲存錯誤", err);
    });
}

loadNotes();
