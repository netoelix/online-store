import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getCart } from '../services/cartFunctions';

type CartProps = {
  id: string;
  quantity: number;
  title: string;
  price: number;
  available_quantity: number;
};

function Cart() {
  const cart = getCart();
  const [cartQ, setCartQ] = useState<CartProps[]>(cart);

  const handleIncreaseQtd = (product: CartProps) => {
    const updatedCart = cartQ.map((item) => {
      if (item.id === product.id && item.quantity < item.available_quantity) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCartQ(updatedCart);
  };

  const handleDecreaseQtd = (product: CartProps) => {
    const updatedCart = cartQ.map((item) => {
      if (item.id === product.id) {
        if (item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return {
          ...item,
          quantity: 1,
        };
      }
      return item;
    });
    setCartQ(updatedCart);
  };

  const handleRemoveProduct = (product: CartProps) => {
    const updatedCart = cartQ.filter((item) => item.id !== product.id);
    setCartQ(updatedCart);
  };

  return (
    <div className="cartContainer">
      {cart.length > 0 ? (
        <div>
          {cartQ.map((product) => (
            <div key={ product.id }>
              <p data-testid="shopping-cart-product-name">{product.title}</p>
              <p data-testid="shopping-cart-product-quantity">
                Quantidade:
                {' '}
                <button
                  data-testid="product-decrease-quantity"
                  onClick={ () => handleDecreaseQtd(product) }
                >
                  -
                </button>
                {product.quantity}
                <button
                  data-testid="product-increase-quantity"
                  onClick={ () => handleIncreaseQtd(product) }
                >
                  +
                </button>
              </p>
              <p>
                Preço: R$
                {' '}
                {product.price}
              </p>
              <button
                data-testid="remove-product"
                onClick={ () => handleRemoveProduct(product) }
              >
                Remove Item
              </button>
            </div>
          ))}
          <div>
            <Link
              to="/cart/purchase"
              data-testid="checkout-products"
            >
              Finalizar Compra

            </Link>
          </div>
        </div>
      ) : (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      )}
    </div>
  );
}

export default Cart;
