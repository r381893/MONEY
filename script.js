const wall = document.getElementById('wall');
const API_URL = '你的 Google Apps Script Web App URL'; // ⚡替換成你的網址！

// 初始化載入資料
fetch(`${API_URL}?action=get`)
  .then(res => res.json())
  .then(data => renderData(data));

// 渲染分類與細項
function renderData(data){
  wall.innerHTML='';
  data.forEach(cat=>{
    const div=addCategoryDiv(cat.name);
    cat.items.forEach(item=>addItemDiv(div.querySelector('.items'),item));
  });
}

// 新增分類
function addCategory(){
  const name=document.getElementById('newCategory').value.trim();
  if(!name)return;
  addCategoryDiv(name);
  document.getElementById('newCategory').value='';
}

function addCategoryDiv(name){
  const div=document.createElement('div');
  div.className='category';
  div.innerHTML=`
    <div class="header">
      <h3 contenteditable="true">${name}</h3>
      <div>
        <button onclick="addItem(this)">➕細項</button>
        <button onclick="removeCategory(this)">🗑️刪除分類</button>
      </div>
    </div>
    <div class="items"></div>`;
  wall.appendChild(div);
  return div;
}

// 新增細項
function addItem(btn){
  const itemsDiv=btn.closest('.category').querySelector('.items');
  addItemDiv(itemsDiv,{
    time:new Date().toLocaleString(),
    index:'',
    strike:'',
    price:'',
    image:''
  });
}

function addItemDiv(container,item){
  const div=document.createElement('div');
  div.className='item';
  div.innerHTML=`
    <div>⏰${item.time}</div>
    <input placeholder="指數" value="${item.index}">
    <input placeholder="履約價" value="${item.strike}">
    <input placeholder="成交價" value="${item.price}">
    <input placeholder="圖片連結(可留空)" value="${item.image}">
    <button onclick="removeItem(this)">❌刪除細項</button>`;
  container.appendChild(div);
}

// 刪除分類
function removeCategory(btn){
  if(confirm('確定刪除分類？'))btn.closest('.category').remove();
}

// 刪除細項
function removeItem(btn){
  if(confirm('確定刪除細項？'))btn.closest('.item').remove();
}

// 收集並儲存
function saveAll(){
  const data=[];
  document.querySelectorAll('.category').forEach(cat=>{
    const items=[];
    cat.querySelectorAll('.item').forEach(it=>{
      const inputs=it.querySelectorAll('input');
      items.push({
        time:it.querySelector('div').innerText.replace('⏰','').trim(),
        index:inputs[0].value,
        strike:inputs[1].value,
        price:inputs[2].value,
        image:inputs[3].value
      });
    });
    data.push({name:cat.querySelector('h3').innerText,items});
  });
  
  fetch(`${API_URL}?action=save`,{
    method:'POST',
    body:JSON.stringify(data),
    headers:{'Content-Type':'application/json'}
  }).then(()=>alert('✅已成功儲存到表單'));
}

// 清空資料
function clearAll(){
  if(confirm('⚠️確定清空全部資料？')){
    wall.innerHTML='';
    fetch(`${API_URL}?action=clear`)
      .then(()=>alert('已清空'));
  }
}
