import { Link } from 'react-router-dom';
import Cart from '../assets/cartshop.png';
import { addToCart, getCart, saveCart } from '../services/cartFunctions';

type Props = {
  product: {
    id: string;
    title: string;
    thumbnail: string;
    price: number;
    shipping: {
      free_shipping: boolean;
    };
  };
};

function Card({ product }: Props) {
  const handleAddToCart = () => {
    addToCart(product);
  };
  return (
    <div className="card" data-testid="product">
      <Link to={ `/details/${product.id}` } data-testid="product-detail-link">
        <h2>{product.title}</h2>
        <img src={ product.thumbnail } alt={ product.title } />
        <p>{`R$ ${product.price}`}</p>
        {product.shipping.free_shipping
      && <p data-testid="free-shipping">Frete Grátis</p>}
      </Link>
      <button data-testid="product-add-to-cart" onClick={ handleAddToCart }>
        {' '}
        Adicionar ao Carrinho
        <img src={ Cart } alt="cartshop" width={ 18 } />

      </button>
    </div>
  );
}

export default Card;
