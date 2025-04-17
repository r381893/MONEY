const API_URL = "https://script.google.com/macros/s/AKfycbwc8FS1vXeO7CclLALyJDxafyifNegFOpE2sxLDe4ziGPj5XK2gvk-cArOndT6x4c0z/exec";

document.getElementById("recordForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const number = document.getElementById("number").value;

  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ number }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  document.getElementById("number").value = "";
  loadRecords(); // 重新載入紀錄
});

async function loadRecords() {
  const res = await fetch(API_URL);
  const data = await res.json();

  const list = document.getElementById("recordList");
  list.innerHTML = "";

  data.reverse().forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.date}（${item.day}）：${item.number}`;
    list.appendChild(li);
  });
}

loadRecords();
