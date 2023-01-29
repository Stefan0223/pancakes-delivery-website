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
