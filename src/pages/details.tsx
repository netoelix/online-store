import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import { APISearchItem } from '../types/apiSearchItem';
import Cart from '../assets/cartshop.png';
import { addToCart, getCartSize } from '../services/cartFunctions';
import Review from '../components/Review';

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
    <div className="product-details-center">
      <div className="product-details-container">
        <h1>Product Details</h1>
        <h2 data-testid="product-detail-name">{productDetails?.title}</h2>
        <img
          src={ productDetails?.thumbnail }
          alt={ productDetails?.title }
          data-testid="product-detail-image"
          className="img-product"
        />
        <p data-testid="product-detail-price">{`R$ ${productDetails?.price}`}</p>
        {productDetails?.shipping.free_shipping
      && <p data-testid="free-shipping">Frete Grátis</p>}
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
          className="cart-btn"
          data-testid="shopping-cart-button"
          onClick={ () => navigate('/cart') }
        >
          <img src={ Cart } alt="cartshop" width={ 18 } />
          <p data-testid="shopping-cart-size">{getCartSize()}</p>
        </button>
        <Review productId={ productId || '' } />
      </div>
    </div>
  );
}

export default ProductDetails;
