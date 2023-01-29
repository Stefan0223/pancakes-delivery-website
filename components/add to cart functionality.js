let addToCartBtn = document.getElementsByClassName("preview-container__btn");
for (let i = 0; i < addToCartBtn.length; i++) {
  let button = addToCartBtn[i];
  button.addEventListener("click", sendDataToCart);
}

function sendDataToCart(e) {
  let button = e.target;
  let item = button.parentElement;
  let itemTitle = item.getElementsByClassName("item__title")[0].innerText;
  let itemPrice = item.getElementsByClassName("preview-item__price")[0]
    .innerText;
  let itemImage = item.getElementsByClassName("preview-item__image")[0].src;
  let itemQuantity = item.getElementsByClassName("preview-item__quantity")[0]
    .value;
  addItemToCart(itemTitle, itemPrice, itemImage, itemQuantity);

  //update TOTAL !!!!
}

function addItemToCart(itemTitle, itemPrice, itemImage, itemQuantity) {
  let cartBox = document.createElement("div");
  cartBox.classList.add("cart-box");

  let cartContent = document.getElementsByClassName("cart-content")[0];
  let cartItemTitle = cartContent.getElementsByClassName("cart__title");
  for (let i = 0; i < cartItemTitle.length; i++) {
    if (cartItemTitle[i].innerText == itemTitle) {
      alert(
        "Ai adăugat deja acest produs în coș! Dacă dorești altă cantitate, modifică direct în coș."
      );
      return;
    }
  }

  let cartBoxContent = `
            <img src="${itemImage}" alt="">
          <div class="cart__details">
            <div class="cart__title">${itemTitle}</div>
            <div class="cart__price">${itemPrice}</div>
            <input type="number" value="${itemQuantity}" class="cart__quantity">
          </div>
          <i class="fas fa-trash"></i>`;

  cartBox.innerHTML = cartBoxContent;
  cartContent.append(cartBox);
  cartBox
    .getElementsByClassName("fa-trash")[0]
    .addEventListener("click", removeItem);
}
