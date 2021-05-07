// let getShopping =  shoppingBasketList = [];
// import {shoppingBasketItem} from './our-boxes.js';



function loadList() {
  let list = JSON.parse(localStorage.getItem('items'));
  let basketContainer = document.getElementById('basketContainer');
  let shoppingBasketList = [];
  let totalPrice = 0;

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    let itemQtyOption = '';
    let itemTotal = parseInt((item.price)*item.qty);
    totalPrice += itemTotal;

    for (let i = 0; i <= item.qty; i++){
        if (i === 0) {
            itemQtyOption +=  `
            <option>Delete</option>
            `
        } else if (i == item.qty){
                itemQtyOption +=  `
        <option selected='true'> ${i} </option>
        `
        } else {
                itemQtyOption +=  `
            <option> ${i} </option>
            `
            }
        }
        
    const addItemToBasketHtml = `
            <li class="basket-item row justify-content-center">
            <div class="col-12 col-md-8">
                <h3 class="item-name">${item.item} <span class="item-size">${item.size}</span></h3>
            <p class="item-desc col-10">${item.contents}</p>
            </div>
            <div class="col-5 offset-7 col-md-4 offset-md-0 align-self-center text-end">
                <div class="row pricing-container justify-content-end">
                <select id="${item.id}Select" class="col-5">${itemQtyOption}</select>
                    <h3 class="item-price price col-5">£${parseInt(item.price)*item.qty}</h3>
                </div>
            </div>
            </li>
            `;
    shoppingBasketList.push(addItemToBasketHtml);
  }
  basketContainer.innerHTML = shoppingBasketList.join('');
  calculateTotal(totalPrice);
  addSelectToQuantity();
}

function calculateTotal(total) {
  let totalContainer = document.getElementById('total');
  let totalHtml = `
    <div class="col-5 offset-7 col-md-4 offset-md-8">
      <div class="row align-items-center justify-content-end">
        <h5 id="totalHead" class="col-5">Total</h5>
        <h3 class="item-price price col-5">£${total}</h3>
      </div>
    </div>
  `;
  totalContainer.innerHTML = totalHtml;
}

function addSelectToQuantity() {
  let items = JSON.parse(localStorage.getItem('items'));
  
  let allItemSelect = document.getElementsByClassName('pricing-container');let itemList = document.getElementsByClassName('basket-item');
  console.log(itemList);
  for (let i = 0; i < allItemSelect.length; i++) {
    let itemSelect = allItemSelect[i].children[0];
    let itemLi = itemList[i];
    // const itemli = allItemSelect.parentElement.parentElement;
    itemSelect.addEventListener('change', (e) => {
      let newItemQty = e.target.value;
      let itemId = e.target.id;
      let itemIdRef = itemId.slice(0, itemId.length-6);
        
      for (let j = 0; j < items.length; j++) {
        let item = items[j];
        console.log(item)
        
        if (item.id === itemIdRef){
            if (newItemQty === 'Delete'){
                items.splice(j,1);
            }else {
            item.qty = newItemQty;
            } 
        }
      }
      console.log(items);
      localStorage.setItem('items', JSON.stringify(items));
      loadList(items);
      window.location.reload();
    });
  }
}

window.onload = loadList();