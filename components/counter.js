const display = document.querySelector(".counter__value");
const allBtns = document.querySelector("#allBtns");

allBtns.addEventListener("click", counter);

let value = 1;
function counter(e) {
  const btn = e.target.id;
  if (btn === "increment") {
    if (value < 40) {
      value += 1;
    } else {
      btn.disabled = true;
    }
  } else if (btn === "decrement") {
    if (value <= 1) {
      btn.disabled = true;
    } else {
      value -= 1;
    }
  } else {
    value = 1;
  }
  display.textContent = value;
}
