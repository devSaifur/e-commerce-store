const carouselBtn = document.querySelectorAll("[data-carousel-btn]");
const menuIcon = document.querySelectorAll(".menu-icon");
const menuOpen = document.querySelector(".menu-icon.open");
const menuClose = document.querySelector(".menu-icon.close");
const nav = document.querySelector(".nav").children;
const thumbnails = document.querySelectorAll(".thumbnail");
const activeImages = document.querySelectorAll(".activeted-img");
const cart = document.querySelector(".cart");
const cartBtn = document.querySelector(".user-cart");
const cartEmpty = document.querySelector(".cart-empty");
const cartContains = document.querySelector(".cart-contains");

const numberOfItems = document.getElementById("number-of-item");
const plusBtn = document.getElementById("plus-btn");
const minusBtn = document.getElementById("minus-btn");
const addCartBtn = document.getElementById("add-cart-btn");

const price = document.querySelector(".price");
const totalPrice = document.querySelector(".total-price");
const cartAmount = document.querySelector(".cart-amount");
const cartDeleteBtn = document.querySelector(".cart-delete-btn");

const overlay = document.getElementById("overlay");
const carouselFullView = document.getElementById("carosel-full-view");

carouselBtn.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselBtn === "next" ? 1 : -1;
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");

    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});

menuIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    if (icon.dataset.menu === "open") {
      menuOpen.style.display = "none";
      menuClose.style.display = "block";

      nav[0].classList.toggle("active");
    } else if (icon.dataset.menu === "close") {
      menuOpen.style.display = "block";
      menuClose.style.display = "none";

      nav[0].classList.toggle("active");
    }
  });
});

thumbnails.forEach((thumbnail) => {
  const fileName = thumbnail.src.replace(/^.*[\\\/]/, "");
  const modifiedName = fileName.replace("-thumbnail", "");

  thumbnail.addEventListener("click", (e) => {
    activeImages.forEach((activeImg) => {
      activeImg.setAttribute("src", `./images/${modifiedName}`);
    });

    const clickedElement = e.target;
    const thumbnailArray = Array.from(thumbnails);
    const remainingThumb = thumbnailArray.filter(
      (element) => element !== clickedElement
    );

    clickedElement.classList.add("active");
    remainingThumb.forEach((thumb) => {
      thumb.classList.remove("active");
    });
  });
});

activeImages.forEach((img) => {
  img.addEventListener("click", () => {
    function addStylesOnMinWidth(mq1) {
      if (mq1.matches) {
        overlay.style.display = "block";
        carouselFullView.style.display = "grid";
      } else {
        overlay.style.display = "none";
        carouselFullView.style.display = "none";
      }
    }
    const minWidthQuery = window.matchMedia("(min-width: 40em)");
    addStylesOnMinWidth(minWidthQuery);

    minWidthQuery.addEventListener("change", addStylesOnMinWidth);
  });

  const overlayCloseBtn = document.querySelector(".overlay-close");
  overlayCloseBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    carouselFullView.style.display = "none";
  });
});

cartBtn.addEventListener("click", () => {
  if (numberOfItems.innerText === "0") {
    if (cart.style.display === "grid") {
      cart.style.display = "none";
      cartEmpty.style.display = "none";
    } else {
      cart.style.display = "grid";
      cartEmpty.style.display = "grid";
    }
  } else {
    if (cart.style.display === "grid") {
      cart.style.display = "none";
      cartContains.style.display = "none";
    } else {
      cart.style.display = "grid";
      cartContains.style.display = "grid";
    }
  }
});

function addCart() {
  numberOfItems.innerText = parseInt(numberOfItems.innerText) + 1;
}
function removeCart() {
  if (numberOfItems.innerText === "0") return;
  numberOfItems.innerText = parseInt(numberOfItems.innerText) - 1;
}

plusBtn.addEventListener("click", addCart);
minusBtn.addEventListener("click", removeCart);

addCartBtn.addEventListener("click", (e) => {
  const perProductPrice = 125.0;
  price.innerText = `$125.00 x ${numberOfItems.innerText}`;
  totalPrice.innerText =
    "$" + numberOfItems.innerText * perProductPrice + ".00";
  cartAmount.innerText = numberOfItems.innerText;
});

cartDeleteBtn.addEventListener("click", () => {
  cart.style.display = "grid";
  cartEmpty.style.display = "grid";
  cartContains.style.display = "none";
  cartAmount.innerText = 0;
});
