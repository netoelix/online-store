type Props = {
  product: {
    title: string;
    thumbnail: string;
    price: number;
  };
};

function Card({ product }: Props) {
  return (
    <div className="card" data-testid="product">
      <h2>{product.title}</h2>
      <img src={ product.thumbnail } alt={ product.title } />
      <p>{`R$ ${product.price}`}</p>
    </div>
  );
}

export default Card;
