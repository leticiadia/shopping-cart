function getCartFromStorage() {
  try {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : {};
  } catch (error) {
    console.error("Erro ao fazer parse do carrinho:", error);
    return {};
  }
}

function showCartQuantity() {
  const cart = getCartFromStorage();

  const cartQuantityElement = document.getElementById("cart-quantity");

  let totalQuantity = Object.values(cart).reduce(
    (accumulation, currentValue) => accumulation + Number(currentValue),
    0
  );

  cartQuantityElement.textContent = totalQuantity;
}

showCartQuantity();

function addCart() {
  let addCartButton = document.querySelectorAll(".add-cart");

  addCartButton.forEach((button) => {
    button.addEventListener("click", () => {
      let productName = button.parentElement.querySelector("p").innerText;

      let cart = getCartFromStorage();

      cart[productName] = (cart[productName] || 0) + 1;
      localStorage.setItem("cart", JSON.stringify(cart));

      showCartQuantity();
    });
  });
}

addCart();

function renderCartProducts(container) {
  const cart = getCartFromStorage();
  if (!container) return;

  if (Object.keys(cart).length === 0) {
    container.innerHTML = `
      <p>Produtos:</p>
      <p class="empty-cart">Seu carrinho está vazio!</p>
    `;
  } else {
    container.innerHTML = `
      ${Object.entries(cart)
        .map(
          ([name, quantity]) =>
            `<div class="product-name"><p>${name}</p><p>${quantity}</p></div>`
        )
        .join("")}
    `;
  }
}

function showCart() {
  const container = document.getElementById("products");

  if (!container) return;

  container.innerHTML = `
    <div class="title">
        <p>Seu Carrinho</p>
    </div>

    <div class="products-list"></div>

    <button id="clear-cart">
        Limpar Carrinho
        <i class="ph ph-trash"></i>
    </button>
    `;

  renderCartProducts(container.querySelector(".products-list"));

  document.getElementById("clear-cart").addEventListener("click", clearCart);
}

showCart();

function clearCart() {
  localStorage.removeItem("cart");

  let productsList = document.querySelector(".products-list");

  if (productsList) {
    productsList.innerHTML = `
      <p>Produtos:</p>
      <p class="empty-cart">Seu carrinho está vazio!</p>
      `;
  }

  showCartQuantity();
}
