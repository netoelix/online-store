import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Category from './Category';
import Cart from '../assets/cartshop.png';
import { APISearchResults } from '../types/apiSearch';
import Card from '../components/card';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { getCartSize } from '../services/cartFunctions';

function Home() {
  const navigate = useNavigate();
  const [productList, setProductList] = useState<APISearchResults>();
  const [inputValue, setInputValue] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [cartsize, setCartSize] = useState<string>('');
  const productsFound = productList ? (productList.results.length > 0) : false;

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  async function handleSearch() {
    const data = await getProductsFromCategoryAndQuery(category, inputValue);
    setProductList(data);
  }

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCategory(event.target.id);
      handleSearch();
    }
  };

  return (
    <main>
      <div className="home-page">
        <section className="search-bar">
          <input
            id="search"
            type="text"
            size={ 150 }
            data-testid="query-input"
            onChange={ handleInputChange }
            value={ inputValue }
            placeholder="Pesquise o nome do produto"
          />
          <button
            id="search-button"
            data-testid="query-button"
            onClick={ handleSearch }
          >
            Pesquisar

          </button>
          <button
            id="shopping-button"
            data-testid="shopping-cart-button"
            onClick={ () => navigate('/cart') }
          >
            <img src={ Cart } alt="cartshop" width={ 18 } />
            <p data-testid="shopping-cart-size">{getCartSize()}</p>
          </button>
        </section>
        <section className="product-home-page">
          <nav className="nav-category">
            <Category handleCategoryChange={ handleCategoryChange } />
          </nav>
          {productsFound ? (
            <div className="product-list">
              {productList?.results.map((product) => (
                <div className="produc-item" key={ product.id }>
                  <Card product={ product } setCartSize={ setCartSize } />
                </div>
              ))}
            </div>
          )
            : (
              <div className="product-list">
                <p data-testid="home-initial-message">
                  Digite algum termo de pesquisa ou escolha uma categoria.
                </p>
              </div>
            )}
        </section>
      </div>
    </main>
  );
}

export default Home;
