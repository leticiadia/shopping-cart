import * as cartService from "./features/cart/cart.service.js";
import * as cartUI from "./features/cart/cart.ui.js";

const productListElement = document.querySelector(".product-list");
const cartQuantityElement = document.getElementById("cart-quantity");

function updateApp(cart) {
  cartService.saveCart(cart);
  cartUI.renderList(productListElement, cart);
  cartUI.renderCount(
    cartQuantityElement,
    cartService.calculateTotalItems(cart),
  );
}

function getProductFromButton(button) {
  const card = button.closest("li").querySelector(".card");
  return {
    id: Number(card.dataset.id),
    name: card.dataset.name,
  };
}

function init() {
  let cart = cartService.getCart();

  updateApp(cart);

  document.querySelectorAll(".add-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      const product = getProductFromButton(event.currentTarget);

      cart = cartService.addProduct(cart, product);
      updateApp(cart);
    });
  });

  if (productListElement) {
    productListElement.addEventListener("click", (event) => {
      const button = event.target.closest(".remove-product");
      if (!button) {
        return;
      }

      const productId = Number(button.closest(".product-item").dataset.id);
      cart = cartService.removeProduct(cart, productId);
      updateApp(cart);
    });
  }

  document.querySelector(".clear-button")?.addEventListener("click", () => {
    cart = cartService.clearCartData();
    updateApp(cart);
  });
}

document.addEventListener("DOMContentLoaded", init);
