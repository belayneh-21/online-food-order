// for navigation bar responsive
let menu = document.querySelector("#menu-bars");
let navbar = document.querySelector(".navbar");
let close = document.querySelector("#close-bars");

menu.addEventListener("click", () => {
  close.style.display = "inline-block";
  menu.style.display = "none";
  navbar.style.display = "block";
});

close.addEventListener("click", () => {
  menu.style.display = "inline-block";
  close.style.display = "none";
  navbar.style.display = "none";
});

// for search form display

let search = document.querySelector("#search-form");
let closeSearch = document.querySelector("#close");
let searchIcon = document.querySelector("#search-icon");

searchIcon.addEventListener("click", () => {
  search.style.top = "0";
});

closeSearch.addEventListener("click", () => {
  search.style.top = "-110%";
});

// home slider

var swiper = new Swiper(".home-slider", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,
});

// review slider

var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  centeredSlides: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  loop: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// loder gif

function loader() {
  document.querySelector(".loader-container").classList.add("fade-out");
}

function fadeOut() {
  setInterval(loader, 3000);
}

window.onload = fadeOut;

// cart button show and hide

var cart = document.querySelector("#cart-diplay");
var closeCart = document.querySelector("#cart-close");
var CartIcon = document.querySelector("#cart-icon");

CartIcon.addEventListener("click", () => {
  cart.classList.remove("-right-full");
  cart.classList.add("right-0");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("right-0");
  cart.classList.add("-right-full");
});

// add to cart  button

let listProductHTML = document.querySelector(".listProduct");
let listCartHTML = document.querySelector(".listCard");
let iconCartSpan = document.querySelector("#cart-count");
let totalAmount = document.querySelector("#totalPrice");
let listProducts = [];
let carts = [];

const addDataToHTML = () => {
  listProductHTML.innerHTML = "";
  if (listProducts.length > 0) {
    listProducts.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.dataset.id = product.id;
      newProduct.classList.add("box");
      newProduct.innerHTML = `
            <img src="${product.image}" alt="" />
            <h3>${product.name}</h3>
            <p>${product.text}</p>
            <span class="pice">${product.price}</span>
            <a href="#" class="addCart btn ">add to cart</a>
      `;
      listProductHTML.appendChild(newProduct);
    });
  }
};

listProductHTML.addEventListener("click", (event) => {
  event.preventDefault();
  let positionClick = event.target;
  if (positionClick.classList.contains("addCart")) {
    let productId = positionClick.parentElement.dataset.id;
    addToCart(productId);
  }
});

const addToCart = (productId) => {
  let positionThisProductInCart = carts.findIndex((value) => value.productId == productId);
  if (carts.length <= 0) {
    carts = [
      {
        productId: productId,
        quantity: 1,
      },
    ];
  } else if(positionThisProductInCart < 0){
    carts.push({
      productId: productId,
      quantity : 1
    });
  } else {
    carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
  }
  addCartToHTML()
};


const addCartToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  let totalPrice = 0;
  if(carts.length > 0) {
    carts.forEach((cart) => {
      totalQuantity = totalQuantity + cart.quantity
      let newCart = document.createElement("div");
      newCart.classList.add("item");
      newCart.dataset.id = cart.productId;
      let positionProduct = listProducts.findIndex((value) => value.id == cart.productId);
      let info = listProducts[positionProduct];
      newCart.innerHTML = `
          <div class="image w-36">
            <img src="${info.image}" class="w-full" alt="">
          </div>
          <div class="name text-white text-2xl ">
          ${info.name}
          </div>
          <div class="totalPrice text-white text-2xl">
          ${info.price * cart.quantity}
          </div>
          <div class="quantity flex gap-5 text-2xl items-center justify-center">
            <span class="minus bg-black text-white px-3 cursor-pointer rounded-lg font-bold">-</span>
            <span class="bg-white px-3 rounded-lg">${cart.quantity}</span>
            <span class="plus bg-black text-white px-3 cursor-pointer rounded-lg font-bold">+</span>
          </div>
      `
      listCartHTML.appendChild(newCart);
    })
  }
  totalAmount = 12.55 * totalQuantity;
  iconCartSpan.innerText = totalQuantity;
  totalAmount.innerText = totalPrice;
} 

listCartHTML.addEventListener('click', (event) => {
  let positionClick = event.target;
  if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
      let productId = positionClick.parentElement.parentElement.dataset.id;
      let type = 'minus';
      if(positionClick.classList.contains('plus')){
          type = 'plus';
      }
      changeQuantity(productId, type);
  }
})

const changeQuantity = (productId, type) => {
  let positionItemInCart = carts.findIndex((value) => value.productId == productId);
  if(positionItemInCart >= 0){ 
      switch (type) {
          case 'plus':
              carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
              break;
      
          default:
              let valueChange = carts[positionItemInCart].quantity - 1;
              if (valueChange > 0) {
                  carts[positionItemInCart].quantity = valueChange;
              }else{
                  carts.splice(positionItemInCart, 1);
              }
              break;
      }
  }
  addCartToHTML();
}

const initApp = () => {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      listProducts = data;
      addDataToHTML();
    });
};
initApp();
