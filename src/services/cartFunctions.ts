export function addToCart(product) {
  // Recupere o carrinho atual do local storage
  const cart = getCart();

  // Verifique se o produto já está no carrinho
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    // Se o produto já existe, atualize a quantidade
    existingProduct.quantity++;
  } else {
    // Caso contrário, adicione o produto ao carrinho
    const cartProduct = { ...product, quantity: 1 };
    cart.push(cartProduct);
  }

  // Salve o carrinho atualizado no local storage
  saveCart(cart);
}
export function getCart() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  return cart;
}

export function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
