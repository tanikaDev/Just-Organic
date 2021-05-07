// localStorage.clear();
function addBuyEventListeners() {
  const buyBtns = document.getElementsByClassName('price-btn');
  for (let i = 0; i < buyBtns.length; i++) {
    let items = [];
    const buyBtn = buyBtns[i];
    buyBtn.addEventListener('click', (e) => {
      // getItems(e.target.id);
      const boxSelected = e.target.id;
      const itemName = document.getElementById(`${boxSelected.slice(0, boxSelected.length - 2)}Name`).innerText;
      const itemSize = document.getElementById(`${boxSelected}Size`).innerText;
      const itemContents = document.getElementById(`${boxSelected}Contents`).innerText;
      const itemPrice = document.getElementById(`${boxSelected}Price`).innerText;

      if ((typeof(Storage) !== 'undefined')) {
        let item = {
          id: boxSelected,
          item: itemName.slice(0, itemName.length - 2),
          size: itemSize,
          contents: itemContents,
          price: itemPrice.slice(1, 3),
          qty: 1,
        };
        if (JSON.parse(localStorage.getItem('items')) === null) {
          items.push(item);
          localStorage.setItem("items", JSON.stringify(items));
          window.location.reload();
        } else {
          const localItems = JSON.parse(localStorage.getItem('items'));
          localItems.map((data) => {
            if (item.id === data.id) {
              let newQty = parseInt(data.qty)+1;
              item.qty = newQty;
              console.log(item.qty);
            } else {
              items.push(data);
            }
          });
          items.push(item);
          localStorage.setItem('items', JSON.stringify(items));
          window.location.reload();
        }
      }
    });
  }
}

window.onload = addBuyEventListeners();
