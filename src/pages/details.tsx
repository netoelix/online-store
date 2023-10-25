import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import { APISearchItem } from '../types/apiSearchItem';
import Cart from '../assets/cartshop.png';
import { addToCart } from '../services/cartFunctions';

function ProductDetails() {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState<APISearchItem>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProductDetails() {
      if (productId) {
        const result = await getProductById(productId);
        setProductDetails(result);
      }
    }
    fetchProductDetails();
  }, [productId]);

  return (
    <div>
      <h1>Product Details</h1>
      <h2 data-testid="product-detail-name">{productDetails?.title}</h2>
      <img
        src={ productDetails?.thumbnail }
        alt={ productDetails?.title }
        data-testid="product-detail-image"
      />
      <p data-testid="product-detail-price">{`R$ ${productDetails?.price}`}</p>
      <ul>
        <li>
          {productDetails?.available_quantity}
        </li>
        <li>
          {productDetails?.sold_quantity}
        </li>
      </ul>
      <button
        onClick={ () => addToCart(productDetails) }
        className="cart-btn"
        data-testid="product-detail-add-to-cart"
      >
        Adicionar ao Carrinho
      </button>
      <button
        data-testid="shopping-cart-button"
        onClick={ () => navigate('/cart') }
      >
        <img src={ Cart } alt="cartshop" width={ 18 } />
      </button>
    </div>
  );
}

export default ProductDetails;
