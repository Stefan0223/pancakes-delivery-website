let trashButtons = document.getElementsByClassName("fa-trash");
for (let i = 0; i < trashButtons.length; i++) {
  let button = trashButtons[i];
  button.addEventListener("click", removeItem);
}

function removeItem(e) {
  let button = e.target;
  button.parentElement.remove();
}
