const wrapper = document.querySelector(".wrapper");
const showCartButton = document.getElementById("show-cart");
const addCartButton = document.getElementById("add-cart");
const clearCartButton = document.getElementById("clear-cart");
const message = document.getElementById("message");

let cartQuantity = 0;

function setWrapperHeight(isVisible) {
  const isSmallScreen = window.innerWidth <= 768;
  wrapper.style.height = isVisible
    ? isSmallScreen
      ? "26rem"
      : "17rem"
    : isSmallScreen
    ? "20rem"
    : "11.25rem";
}

function updateMessage(content) {
  const isVisible = message.classList.contains("visible");

  message.innerHTML = content;
  message.classList.toggle("visible");

  setWrapperHeight(isVisible);

  if (!isVisible) {
    message.innerHTML = "";
  }
}

function showCartMessage() {
  updateMessage(`
    <div class='title'>
        <i class='ph ph-shopping-cart'></i>
        <p>Seu Carrinho</p>
    </div>
    <p class='textContent'>Quantidade de produtos no carrinho: ${cartQuantity}</p>
`);
}

function addToCartMessage() {
  cartQuantity += 1;

  updateMessage(`
    <div class='message-content'>
      <p>Produto adicionado ao carrinho!</p>
    </div>    
`);
}

function clearCartMessage() {
  cartQuantity = 0;

  updateMessage(`
    <div class='message-content'>
      <p>Seu carrinho foi esvaziado!</p>
    </div>    
`);
}

showCartButton.addEventListener("click", showCartMessage);
addCartButton.addEventListener("click", addToCartMessage);
clearCartButton.addEventListener("click", clearCartMessage);

window.addEventListener("resize", () => {
  if (message.innerHTML !== "") {
    setWrapperHeight(true);
  } else {
    setWrapperHeight(false);
  }
});
