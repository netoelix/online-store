import { NavLink, useNavigate } from 'react-router-dom';
import { getCartSize } from '../services/cartFunctions';
import Cart from '../assets/cartshop.png';

function Menu() {
  const navigate = useNavigate();
  return (
    <div className="navMenu">
      <nav className="navMenu-home">
        <NavLink to="/">Home</NavLink>
      </nav>
      <button
        id="shopping-button"
        data-testid="shopping-cart-button"
        onClick={ () => navigate('/cart') }
      >
        <img src={ Cart } alt="cartshop" width={ 18 } />
        <p data-testid="shopping-cart-size">{getCartSize()}</p>
      </button>
    </div>
  );
}
export default Menu;
