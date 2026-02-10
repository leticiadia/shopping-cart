export function renderCount(container, count) {
  if (!container) {
    return;
  }

  container.textContent = count;
}

function renderEmptyState(container) {
  container.innerHTML = `
  <li class="empty-state"> 
    <p>Seu carrinho está vazio!</p>        
  </li>
  `;
}

function renderCartItem(item) {
  return `
    <li class="product-item" data-id="${item.id}">
        <article>
            <p class="product-name">${item.name}</p>

            <div class="product-controls">
                <span class="product-quantity">${item.quantity}</span>

                <button
                class="remove-product"
                aria-label="Remover produto do carrinho"
                >
                <img
                    src="../assets/icons/trash-red.svg"
                    alt="Remover produto do carrinho"
                />
                </button>
            </div>
        </article>
    </li>
  `;
}

export function renderList(container, cart) {
  if (!container) {
    return;
  }

  if (cart.length === 0) {
    renderEmptyState(container);
    return;
  }

  container.innerHTML = cart.map(renderCartItem).join("");
}
