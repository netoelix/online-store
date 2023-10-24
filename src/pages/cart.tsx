import { getCart } from '../services/cartFunctions';

function Cart() {
  // Obtenha o carrinho do local storage
  const cart = getCart();

  return (
    <div>
      {cart.length > 0 ? (
        <div>
          {cart.map((product) => (
            <div key={ product.id }>
              <p data-testid="shopping-cart-product-name">{product.title}</p>
              <p data-testid="shopping-cart-product-quantity">
                Quantidade:
                {' '}
                {product.quantity}
              </p>
              <p>
                Preço: R$
                {' '}
                {product.price}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      )}
    </div>
  );
}

export default Cart;
