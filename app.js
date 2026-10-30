const products=[
{id:1,name:"Витамин C",cat:"Витамины",price:45000,icon:"🍊"},
{id:2,name:"Комплекс витаминов",cat:"Витамины",price:89000,icon:"💊"},
{id:3,name:"Аптечка дорожная",cat:"Первая помощь",price:65000,icon:"🩹"},
{id:4,name:"Антисептик для рук",cat:"Уход и гигиена",price:22000,icon:"🧴"},
{id:5,name:"Термометр электронный",cat:"Медтехника",price:78000,icon:"🌡️"},
{id:6,name:"Бинт медицинский",cat:"Первая помощь",price:12000,icon:"➕"},
{id:7,name:"Крем для рук",cat:"Уход и гигиена",price:35000,icon:"🧴"},
{id:8,name:"Пульсоксиметр",cat:"Медтехника",price:165000,icon:"🩺"}
];
const money=n=>new Intl.NumberFormat("ru-RU").format(n)+" сум";
const getCart=()=>JSON.parse(localStorage.getItem("aptekaCart")||"[]");
const setCart=c=>{localStorage.setItem("aptekaCart",JSON.stringify(c));updateCount();};
function updateCount(){document.querySelectorAll("#cartCount").forEach(e=>e.textContent=getCart().reduce((s,x)=>s+x.qty,0));}
function productCard(p){return `<article class="product"><div class="product-art">${p.icon}</div><div class="category">${p.cat}</div><h3>${p.name}</h3><div class="price">${money(p.price)}</div><button onclick="addToCart(${p.id})">＋ В корзину</button></article>`;}
function addToCart(id){let c=getCart(),x=c.find(i=>i.id===id);x?x.qty++:c.push({id,qty:1});setCart(c);alert("Товар добавлен в корзину");}
function removeFromCart(id){setCart(getCart().filter(x=>x.id!==id));renderCart();}
function renderCart(){let target=document.getElementById("cartPage");if(!target)return;let c=getCart();if(!c.length){target.innerHTML='<div class="empty">Ваша корзина пока пуста. <a class="text-link" href="catalog.html">Перейти в каталог →</a></div>';return;}let total=0;target.innerHTML=c.map(x=>{let p=products.find(p=>p.id===x.id);total+=p.price*x.qty;return `<div class="cart-row"><div><b>${p.name}</b><div class="muted">${x.qty} × ${money(p.price)}</div></div><b>${money(p.price*x.qty)}</b><button onclick="removeFromCart(${p.id})">Удалить</button></div>`}).join("")+`<div class="cart-summary"><b>Итого: ${money(total)}</b><button class="btn" onclick="alert('Это демонстрационный сайт. Подключите сервер для реального оформления заказов.')">Оформить заявку</button></div>`;}
const featured=document.getElementById("featured");if(featured)featured.innerHTML=products.slice(0,4).map(productCard).join("");
const grid=document.getElementById("catalogGrid");
function renderCatalog(){if(!grid)return;let q=(document.getElementById("search").value||"").toLowerCase(),cat=document.getElementById("category").value;let list=products.filter(p=>p.name.toLowerCase().includes(q)&&(cat==="Все"||p.cat===cat));grid.innerHTML=list.length?list.map(productCard).join():'<div class="empty">Ничего не найдено. Попробуйте изменить запрос.</div>';}
if(grid){document.getElementById("search").addEventListener("input",renderCatalog);document.getElementById("category").addEventListener("change",renderCatalog);renderCatalog();}
renderCart();updateCount();
document.querySelectorAll(".menu").forEach(b=>b.addEventListener("click",()=>b.closest(".header").classList.toggle("open")));
const cf=document.getElementById("contactForm");if(cf)cf.addEventListener("submit",e=>{e.preventDefault();document.getElementById("formResult").textContent="Спасибо! Форма работает в деморежиме — подключите сервер для отправки сообщений.";cf.reset();});
