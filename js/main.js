// NAVBAR DISPLAY START
let menuBtn = document.querySelector(".menu-button");
let navbar = document.querySelector(".navbar__list");

menuBtn.onclick = () => {
  menuBtn.classList.toggle("fa-times");
  navbar.classList.toggle("navbar__active");
};
// NAVBAR DISPLAY END

// CART DISPLAY START
let cartBtn = document.querySelector("#cart");
let closeCart = document.querySelector("#cart-close");
let cartBox = document.querySelector(".cart-container");
cartBtn.onclick = () => {
  cartBox.classList.add("cart-container__active");
  return false;
};

closeCart.onclick = () => {
  cartBox.classList.remove("cart-container__active");
};
// CART DISPLAY END

// CART CLOSE WHEN CLICKED OUTSIDE START
document.onclick = function clickOutsideCart(e) {
  if (cartBox && !cartBox.contains(e.target)) {
    cartBox.classList.remove("cart-container__active");
  }
  if (e.target.id == "cart" || e.target.id == "trash") {
    cartBox.classList.add("cart-container__active");
  }
};
// CART CLOSE WHEN CLICKED OUTSIDE END

// DOM CONTENT AND EVENT LISTENERS START
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  let trashButtons = document.getElementsByClassName("fa-trash");
  for (let i = 0; i < trashButtons.length; i++) {
    let button = trashButtons[i];
    button.addEventListener("click", removeItem);
  }

  let quantityInput = document.getElementsByClassName("cart__quantity");
  for (let i = 0; i < quantityInput.length; i++) {
    let input = quantityInput[i];
    input.addEventListener("change", quantityChanged);
  }

  let quantityPreviewInput = document.getElementsByClassName(
    "preview-item__quantity"
  );
  for (let i = 0; i < quantityPreviewInput.length; i++) {
    let input = quantityPreviewInput[i];
    input.addEventListener("change", quantityChanged);
  }

  let addToCartBtn = document.getElementsByClassName("preview-container__btn");
  for (let i = 0; i < addToCartBtn.length; i++) {
    let button = addToCartBtn[i];
    button.addEventListener("click", sendDataToCart);
  }

  let menuItems = document.getElementsByClassName("menu-item");
  for (let i = 0; i < menuItems.length; i++) {
    let item = menuItems[i];
    item.addEventListener("click", function () {
      navbar.classList.remove("navbar__active");
      menuBtn.classList.toggle("fa-times");
    });
  }
}
// DOM CONTENT AND EVENT LISTENERS END

// MINIM AND MAXIM MESSAGE START
let infoComandaMinima = document.querySelector(".comanda-minima");
let infoComandaMaxima = document.querySelector(".comanda-maxima");
// MINIM AND MAXIM MESSAGE

// CHECK CART EMPTY STATE START
function checkEmptyStateAfterAdd() {
  let emptyTextDiv = document.getElementsByClassName("empty__cart")[0];
  let emptyButtonState = document.getElementsByClassName("cart-btn")[0];
  if (cartArray.length > 0) {
    emptyTextDiv.classList.add("empty__cart-inactive");
    emptyButtonState.classList.add("btn--active");
  }
}
// CHECK CART EMPTY STATE END

// CHECK CART EMPTY STATE AFTER REMOVE ITEM START
function checkEmptyStateAfterRemove() {
  let emptyTextDiv = document.getElementsByClassName("empty__cart")[0];
  let emptyButtonState = document.getElementsByClassName("cart-btn")[0];
  if (cartArray.length <= 0) {
    emptyTextDiv.classList.remove("empty__cart-inactive");
    emptyButtonState.classList.remove("btn--active");
  }
}
// CHECK CART EMPTY STATE AFTER REMOVE ITEM END

// CART POP-UP DISPLAY START
function checkPopCart() {
  let popCart = document.querySelector(".cart-pop");
  if (cartArray.length > 0) {
    popCart.classList.add("cart-pop-active");
  } else {
    popCart.classList.remove("cart-pop-active");
  }
}
// CART POP-UP DISPLAY END

// REMOVE ITEM FROM CART START
function removeItem(e) {
  let button = e.target;
  let parent = button.parentElement;
  let secondChild = parent.getElementsByTagName("div")[0];
  let firstOfTheSecond = secondChild.getElementsByTagName("div")[0];
  let itemTitle = firstOfTheSecond.innerText;
  for (let i = 0; i < arrayOfObjects.length; i++) {
    let item = arrayOfObjects[i];
    if (item.name == itemTitle) {
      arrayOfObjects.splice(i, 1);
    }
  }
  setState();
  button.parentElement.remove();
  cartArray.pop();
  cartUpdateTotal();
  checkEmptyStateAfterRemove();
  checkPopCart();
}
//REMOVE ITEM FROM CART END

// CART ITEM QUANTITY INPUT CONTROL START
function quantityChanged(e) {
  let input = e.target;
  if (isNaN(input.value) || input.value <= 0 || input.value > 40) {
    input.value = 1;
  }
  cartUpdateTotal();
}
// CART ITEM QUANTITY INPUT CONTROL END

// CART UPDATE TOTAL START
function cartUpdateTotal() {
  let cartContent = document.getElementsByClassName("cart-content")[0];
  let cartBoxes = cartContent.getElementsByClassName("cart-box");
  let cartButton = document.querySelector(".cart-btn");
  let itemButtons = document.querySelectorAll(".preview-container__btn");
  let total = 0;
  let totalQuantity = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let cartItemPrice = cartBox.getElementsByClassName("item__price")[0];
    let price = parseFloat(cartItemPrice.innerText);

    let cartItemTitle = cartBox.getElementsByClassName("cart__title")[0];

    let cartItemQuantity = cartBox.getElementsByClassName("cart__quantity")[0];
    let quantity = cartItemQuantity.value;
    let popQuantity = parseFloat(quantity);
    total = total + price * quantity;
    totalQuantity += popQuantity;
    if (totalQuantity > 40) {
      alert(
        "Comanda maximă este de 40 clătite. Modificați cantitățile din coș"
      );
      cartButton.disabled = true;
      infoComandaMaxima.style.display = "block";
      infoComandaMinima.style.display = "none";
      itemButtons.forEach((button) => {
        button.disabled = true;
      });
    } else if (totalQuantity < 3) {
      cartButton.disabled = true;
      infoComandaMinima.style.display = "block";
      infoComandaMaxima.style.display = "none";
    } else {
      cartButton.disabled = false;
      infoComandaMaxima.style.display = "none";
      infoComandaMinima.style.display = "none";
      itemButtons.forEach((button) => {
        button.disabled = false;
      });
    }
    for (let i = 0; i < arrayOfObjects.length; i++) {
      let item = arrayOfObjects[i];
      if (item.name == cartItemTitle.innerText) {
        item.quantity = quantity;
      }
    }
    setState();
  }
  document.getElementsByClassName("cart__price")[0].innerText = total + " Lei";
  document.getElementsByClassName("cart-pop")[0].innerText = totalQuantity;
}
// CART UPDATE TOTAL END

// SWIPER START
let swiper = new Swiper(".home-slider", {
  grabCursor: true,
  loop: true,
  cssMode: true,
  centeredSlides: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
// SWIPER END

// DISPLAY MENU ITEM PREVIEW START
let previewContainer = document.querySelector(".preview-container");
let previewItem = previewContainer.querySelectorAll(".preview-item");
let itemCard = document.querySelectorAll(".menu .card__container");

itemCard.forEach((item) => {
  item.onclick = () => {
    previewContainer.style.display = "flex";
    let itemName = item.getAttribute("data-name");
    previewItem.forEach((preview) => {
      let target = preview.getAttribute("data-target");
      if (itemName == target) {
        preview.classList.add("active");
      }
    });
  };
});

let closePreview = previewContainer.querySelectorAll("#close-preview");
closePreview.forEach((item) => {
  item.onclick = () => {
    previewContainer.style.display = "none";
    previewItem.forEach((close) => {
      close.classList.remove("active");
    });
  };
});
// DISPLAY MENU ITEM PREVIEW END

// CHECKOUT PREVIEW START
let orderBtn = document.querySelector("#cart__btn");
let checkoutPage = document.querySelector(".checkout-page");
let checkoutContainer = document.querySelector(".checkout-page-container");
let closeCheckoutPageBtn = document.querySelector("#close-checkout-page");

orderBtn.onclick = () => {
  checkoutPage.classList.add("active");
  checkoutContainer.style.display = "flex";
  cartBox.classList.remove("cart-container__active");
  sendDataToTable();
  addToHiddenInput();
};

closeCheckoutPageBtn.onclick = () => {
  checkoutPage.classList.remove("active");
  checkoutContainer.style.display = "none";
  removeFromTable();
};
// CHECKOUT PREVIEW END

// CLOSE MENU ITEM PREVIEW WHEN CLICKED OUTSIDE START
previewContainer.addEventListener("click", function (e) {
  let clickSpot = e.target;
  if (clickSpot.id == "preview-container") {
    previewContainer.style.display = "none";
    previewItem.forEach((preview) => {
      preview.classList.remove("active");
    });
  }
});
// CLOSE MENU ITEM PREVIEW WHEN CLICKED OUTSIDE END

// ADD TO CART FUNCTIONALITY START
// SEND DATA TO CART START
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
  let cartObjectItem = new CartObject(
    itemTitle,
    itemPrice,
    itemImage,
    itemQuantity
  );
  arrayOfObjects.push(cartObjectItem);
  cartUpdateTotal();
  previewContainer.style.display = "none";
  previewItem.forEach((preview) => {
    preview.classList.remove("active");
  });
  setState();
}

let cartArray = [];

let arrayOfObjects = [];

let setState = function () {
  localStorage.setItem("Produse", JSON.stringify(arrayOfObjects));
};
// SEND DATA TO CART END

// PERSISTENT CART START
window.onload = function () {
  if (localStorage.getItem("Produse") !== null) {
    let localArr = JSON.parse(localStorage.getItem("Produse"));
    for (let i = 0; i < localArr.length; i++) {
      let item = localArr[i];
      arrayOfObjects.push(item);
      addItemToCart(item.name, item.price, item.image, item.quantity);
      cartUpdateTotal();
    }
  }
};
// PERSISTENT CART END

// DISPLAY ITEM IN CART START
function addItemToCart(itemTitle, itemPrice, itemImage, itemQuantity) {
  console.log(arrayOfObjects);
  let cartBox = document.createElement("div");
  cartBox.classList.add("cart-box");
  let cartContent = document.getElementsByClassName("cart-content")[0];
  let cartItemTitle = cartContent.getElementsByClassName("cart__title");
  for (let i = 0; i < cartItemTitle.length; i++) {
    if (cartItemTitle[i].innerText == itemTitle) {
      alert(
        "Ai adăugat deja acest produs în coș! Dacă dorești altă cantitate modifică direct în coș."
      );
      return;
    }
  }

  let cartBoxContent = `
                          <img src="${itemImage}" class='cart-item-image' alt="">
                        <div class="cart__details">
                          <div class="cart__title">${itemTitle}</div>
                          <div class="item__price">${itemPrice}</div>
                          <input type="number" value="${itemQuantity}" class="cart__quantity">
                          </div>
                          <i class="fas fa-trash" id="trash"></i>`;

  cartBox.innerHTML = cartBoxContent;
  cartContent.append(cartBox);
  cartBox
    .getElementsByClassName("fa-trash")[0]
    .addEventListener("click", removeItem);
  cartBox
    .getElementsByClassName("cart__quantity")[0]
    .addEventListener("change", quantityChanged);

  cartArray.push(cartBox);
  checkEmptyStateAfterAdd();
  checkPopCart();
}
// DISPLAY ITEM IN CART START
// ADD TO CART FUNCTIONALITY END

// CART ITEM OBJECT CONSTRUCTOR START
function CartObject(itemTitle, itemPrice, itemImage, itemQuantity) {
  this.name = itemTitle;
  this.price = itemPrice;
  this.image = itemImage;
  this.quantity = itemQuantity;
}
// CART ITEM OBJECT CONSTRUCTOR END

// ADD TO CHECKOUT TABLE FUNCTIONALITY START
// SEND DATA TO TABLE START
function sendDataToTable() {
  let cartContent = document.getElementsByClassName("cart-content")[0];
  let cartBox = cartContent.getElementsByClassName("cart-box");
  createTable();
  let cartTotal = 0;
  for (let i = 0; i < cartBox.length; i++) {
    let itemTitle =
      cartBox[i].getElementsByClassName("cart__title")[0].innerText;
    let itemImage = cartBox[i].getElementsByClassName("cart-item-image")[0].src;
    let itemPrice =
      cartBox[i].getElementsByClassName("item__price")[0].innerText;
    let itemQuantity =
      cartBox[i].getElementsByClassName("cart__quantity")[0].value;
    cartTotal += parseFloat(itemPrice) * parseFloat(itemQuantity);
    addItemToTable(itemTitle, itemImage, itemPrice, itemQuantity, cartTotal);
  }
}
// SEND DATA TO TABLE END

// CREATE CHECKOUT TABLE START
function createTable() {
  let table = document.createElement("table");
  table.classList.add("checkout-table");
  let tableContent = `<tr>
  <th class="table-header">Produse comandate</th>
  <th class="table-header">Preț unitar</th>
  <th class="table-header">Cantitate</th>
  <th class="table-header">Preț total</th>
</tr>
<tr>
  <td colspan="4" class="table-total">
  </td>
</tr>
<tr>
  <td colspan="4" class="table-transport">Valoare transport - <b class="gratuit">GRATUIT</b></td>
</tr>
<tr>
  <td colspan="4" class="table-transport">Plata se face la livrare - <b class="gratuit">DOAR NUMERAR</b></td>
</tr>
<tr>
  <td colspan="4" class="table-transport">Livrăm doar în - <b class="gratuit">VATRA DORNEI</b></td>
</tr>`;
  let tableSpot = document.getElementsByClassName(
    "checkout-page__sumar-table"
  )[0];

  table.innerHTML = tableContent;
  tableSpot.append(table);
}
// CREATE CHECKOUT TABLE END

// DISPLAY ITEM IN TABLE START
function addItemToTable(
  itemTitle,
  itemImage,
  itemPrice,
  itemQuantity,
  cartTotal
) {
  let myTable = document.getElementsByClassName("checkout-table")[0];
  let insertRow = myTable.insertRow(1);
  insertRow.classList.add("inserted-row");
  let cell1 = insertRow.insertCell(0);
  cell1.classList.add("item-cell");
  let cell2 = insertRow.insertCell(1);
  cell2.classList.add("pret-cells");
  let cell3 = insertRow.insertCell(2);
  cell3.classList.add("pret-cells");
  let cell4 = insertRow.insertCell(3);
  cell4.classList.add("pret-cells", "item-total");

  cell1.innerHTML = `<img src="${itemImage}" class='table-img'><p class="table-item-name">${itemTitle}</p>`;
  cell2.innerHTML = `${itemPrice}`;
  cell3.innerHTML = `${itemQuantity}`;

  let parsedPrice = parseFloat(itemPrice);
  let parsedQuantity = parseFloat(itemQuantity);
  let itemTotal = parsedPrice * parsedQuantity;

  let tableTotalRow = document.querySelector(".table-total");
  cell4.innerHTML = `${itemTotal} Lei`;
  tableTotalRow.innerHTML = `<b class='total-comanda'>Total comandă: </b>${cartTotal} Lei`;
}
// DISPLAY ITEM IN TABLE END

// REMOVE ITEMS FROM TABLE START
function removeFromTable() {
  let myTable = document.getElementsByClassName("checkout-table")[0];
  myTable.parentNode.removeChild(myTable);
}

let removeState = function () {
  localStorage.removeItem("Produse");
  arrayOfObjects.splice(0, arrayOfObjects.length);
};
// REMOVE ITEMS FROM TABLE START
// ADD TO CHECKOUT TABLE FUNCTIONALITY END

// SEND DATA TO SERVER START
let sendOrderBtn = document.querySelector(".order-submit-btn");
let cartContent = document.querySelector(".cart-content");
let cartBoxes = cartContent.querySelectorAll(".cart-box");

function addToHiddenInput() {
  let inputProd = document.querySelector(".hidden__produse");
  let formProduse = document.querySelector(".hidden__produse").innerText;
  let formTotal = document.querySelector(".hidden__total");
  let orderTotal = document.querySelector(".cart__price").innerText;
  for (let i = 0; i < arrayOfObjects.length; i++) {
    let object = arrayOfObjects[i];
    let product = JSON.stringify(object["name"]);
    let quant = JSON.stringify(object["quantity"]);
    formProduse = formProduse + " ---- " + quant + " x " + product;
    inputProd.value = formProduse;
  }
  formTotal.value = orderTotal;
}

sendOrderBtn.onclick = () => {
  // CLEAR THE SESSION START
  cartBoxes.forEach((item) => {
    item.remove();
  });
  removeState();
};
// SEND DATA TO SERVER END

// FORM CUSTOM ERROR MESAGES START
let inputName = document.querySelector('input[name="Nume"]');
let inputAdress = document.querySelector('input[name="Adresa"]');
let inputTel = document.querySelector('input[name="Telefon"]');
let inputGdpr = document.querySelector('input[name="GDPR"]');

inputName.addEventListener("invalid", (e) => {
  if (e.target.validity.valueMissing) {
    e.target.setCustomValidity(
      "Vă rugăm să vă introduceți numele și prenumele"
    );
  }
});
inputName.addEventListener("change", (e) => {
  e.target.setCustomValidity("");
});

inputAdress.addEventListener("invalid", (e) => {
  if (e.target.validity.valueMissing) {
    e.target.setCustomValidity("Vă rugăm să introduceți adresa de livrare");
  }
});
inputAdress.addEventListener("change", (e) => {
  e.target.setCustomValidity("");
});

inputTel.addEventListener("invalid", (e) => {
  if (e.target.validity.valueMissing) {
    e.target.setCustomValidity("Vă rugăm să vă introduceți numărul de telefon");
  }
});
inputTel.addEventListener("change", (e) => {
  e.target.setCustomValidity("");
});

inputGdpr.addEventListener("invalid", (e) => {
  if (e.target.validity.valueMissing) {
    e.target.setCustomValidity(
      "Vă rugăm să bifați căsuța pentru acordul cu privire la prelucrarea datelor personale"
    );
  }
});
inputGdpr.addEventListener("change", (e) => {
  e.target.setCustomValidity("");
});
// FORM CUSTOM ERROR MESAGES END

//PLUS MINUS QUANTITY BUTTONS FOR EACH PREVIEW ITEM START
// PREVIEW 1
let q1 = document.querySelector(".q1");
let increment1 = () => {
  if (q1.value < 40) {
    q1.value = Number(q1.value) + 1;
  } else {
    alert("Cantitatea maximă este 40");
    q1.value === 1;
  }
};
let decrement1 = () => {
  if (q1.value > 1) {
    q1.value = Number(q1.value) - 1;
  } else {
    alert("Cantitatea minimă este 1");
    q1.value === 1;
  }
};
document.querySelector(".i1").addEventListener("click", increment1);
document.querySelector(".d1").addEventListener("click", decrement1);
// PREVIEW 1

// PREVIEW 2
let q2 = document.querySelector(".q2");
let increment2 = () => {
  if (q2.value < 40) {
    q2.value = Number(q2.value) + 1;
  } else {
    alert("Cantitatea maximă este 40");
    q2.value === 1;
  }
};
let decrement2 = () => {
  if (q2.value > 1) {
    q2.value = Number(q2.value) - 1;
  } else {
    alert("Cantitatea minimă este 1");
    q2.value === 1;
  }
};
document.querySelector(".i2").addEventListener("click", increment2);
document.querySelector(".d2").addEventListener("click", decrement2);
// PREVIEW 2

// PREVIEW 3
let q3 = document.querySelector(".q3");
let increment3 = () => {
  if (q3.value < 40) {
    q3.value = Number(q3.value) + 1;
  } else {
    alert("Cantitatea maximă este 40");
    q3.value === 1;
  }
};
let decrement3 = () => {
  if (q3.value > 1) {
    q3.value = Number(q3.value) - 1;
  } else {
    alert("Cantitatea minimă este 1");
    q3.value === 1;
  }
};
document.querySelector(".i3").addEventListener("click", increment3);
document.querySelector(".d3").addEventListener("click", decrement3);
// PREVIEW 3

// PREVIEW 4
let q4 = document.querySelector(".q4");
let increment4 = () => {
  if (q4.value < 40) {
    q4.value = Number(q4.value) + 1;
  } else {
    alert("Cantitatea maximă este 40");
    q4.value === 1;
  }
};
let decrement4 = () => {
  if (q4.value > 1) {
    q4.value = Number(q4.value) - 1;
  } else {
    alert("Cantitatea minimă este 1");
    q4.value === 1;
  }
};
document.querySelector(".i4").addEventListener("click", increment4);
document.querySelector(".d4").addEventListener("click", decrement4);
// PREVIEW 4

// PREVIEW 5
let q5 = document.querySelector(".q5");
let increment5 = () => {
  if (q5.value < 40) {
    q5.value = Number(q5.value) + 1;
  } else {
    alert("Cantitatea maximă este 40");
    q5.value === 1;
  }
};
let decrement5 = () => {
  if (q5.value > 1) {
    q5.value = Number(q5.value) - 1;
  } else {
    alert("Cantitatea minimă este 1");
    q5.value === 1;
  }
};
document.querySelector(".i5").addEventListener("click", increment5);
document.querySelector(".d5").addEventListener("click", decrement5);
// PREVIEW 5

// PREVIEW 6
let q6 = document.querySelector(".q6");
let increment6 = () => {
  if (q6.value < 40) {
    q6.value = Number(q6.value) + 1;
  } else {
    alert("Cantitatea maximă este 40");
    q6.value === 1;
  }
};
let decrement6 = () => {
  if (q6.value > 1) {
    q6.value = Number(q6.value) - 1;
  } else {
    alert("Cantitatea minimă este 1");
    q6.value === 1;
  }
};
document.querySelector(".i6").addEventListener("click", increment6);
document.querySelector(".d6").addEventListener("click", decrement6);
// PREVIEW 6

// PREVIEW 7
let q7 = document.querySelector(".q7");
let increment7 = () => {
  if (q7.value < 40) {
    q7.value = Number(q7.value) + 1;
  } else {
    alert("Cantitatea maximă este 40");
    q7.value === 1;
  }
};
let decrement7 = () => {
  if (q7.value > 1) {
    q7.value = Number(q7.value) - 1;
  } else {
    alert("Cantitatea minimă este 1");
    q7.value === 1;
  }
};
document.querySelector(".i7").addEventListener("click", increment7);
document.querySelector(".d7").addEventListener("click", decrement7);
// PREVIEW 7

// PREVIEW 8
let q8 = document.querySelector(".q8");
let increment8 = () => {
  if (q8.value < 40) {
    q8.value = Number(q8.value) + 1;
  } else {
    alert("Cantitatea maximă este 40");
    q8.value === 1;
  }
};
let decrement8 = () => {
  if (q8.value > 1) {
    q8.value = Number(q8.value) - 1;
  } else {
    alert("Cantitatea minimă este 1");
    q8.value === 1;
  }
};
document.querySelector(".i8").addEventListener("click", increment8);
document.querySelector(".d8").addEventListener("click", decrement8);
// PREVIEW 8

// PREVIEW 9
let q9 = document.querySelector(".q9");
let increment9 = () => {
  if (q9.value < 40) {
    q9.value = Number(q9.value) + 1;
  } else {
    alert("Cantitatea maximă este 40");
    q9.value === 1;
  }
};
let decrement9 = () => {
  if (q9.value > 1) {
    q9.value = Number(q9.value) - 1;
  } else {
    alert("Cantitatea minimă este 1");
    q9.value === 1;
  }
};
document.querySelector(".i9").addEventListener("click", increment9);
document.querySelector(".d9").addEventListener("click", decrement9);
// PREVIEW 9
//PLUS MINUS QUANTITY BUTTONS FOR EACH PREVIEW ITEM END
