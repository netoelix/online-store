import { Link } from 'react-router-dom';

type Props = {
  product: {
    id: string;
    title: string;
    thumbnail: string;
    price: number;
  };
};

function Card({ product }: Props) {
  return (
    <div className="card" data-testid="product">
      <Link to={ `/details/${product.id}` } data-testid="product-detail-link">
        <h2>{product.title}</h2>
        <img src={ product.thumbnail } alt={ product.title } />
        <p>{`R$ ${product.price}`}</p>
      </Link>
    </div>
  );
}

export default Card;
