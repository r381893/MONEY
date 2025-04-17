document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("recordForm");
  const list = document.getElementById("recordList");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const number = document.getElementById("number").value;
    google.script.run
      .withSuccessHandler(() => {
        document.getElementById("number").value = "";
        loadRecords();
      })
      .saveRecord(number);
  });

  function loadRecords() {
    google.script.run.withSuccessHandler((data) => {
      list.innerHTML = "";
      data.reverse().forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.date}（${item.day}）：${item.number}`;
        list.appendChild(li);
      });
    }).getRecords();
  }

  loadRecords();
});
