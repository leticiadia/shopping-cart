const STORAGE_KEY = "cart";

export function getCart() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function calculateTotalItems(cart) {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function createCartItem(product) {
  return {
    id: Number(product.id),
    name: product.name,
    quantity: 1,
  };
}

export function addProduct(cart, product) {
  const existingProduct = cart.find(
    (item) => Number(item.id) === Number(product.id),
  );

  if (existingProduct) {
    return cart.map((item) =>
      Number(item.id) === Number(product.id)
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
  }

  return [...cart, createCartItem(product)];
}

export function removeProduct(cart, productId) {
  return cart.filter((item) => Number(item.id) !== Number(productId));
}

export function clearCartData() {
  localStorage.removeItem(STORAGE_KEY);
  return [];
}
