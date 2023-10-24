import { useNavigate } from 'react-router-dom';
import Cart from '../assets/cartshop.png';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-page">
      <input
        id="search"
        type="text"
        size={ 150 }
      />
      <button
        data-testid="shopping-cart-button"
        onClick={ () => navigate('/cart') }
      >
        <img src={ Cart } alt="cartshop" width={ 18 } />
      </button>
      <p data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
    </div>
  );
}

export default Home;
