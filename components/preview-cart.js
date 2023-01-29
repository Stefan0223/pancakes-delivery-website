let cartBtn = document.querySelector("#cart");
let closeCart = document.querySelector("#cart-close");
let cartBox = document.querySelector(".cart-container");

cartBtn.onclick = () => {
  cartBox.classList.toggle("cart-container__active");
  return false;
};

closeCart.onclick = () => {
  cartBox.classList.remove("cart-container__active");
};
