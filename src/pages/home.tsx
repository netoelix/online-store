import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Category from './Category';
import Cart from '../assets/cartshop.png';
import { APISearchResults } from '../types/apiSearch';
import Card from '../components/card';
import { getProductsFromCategoryAndQuery } from '../services/api';

function Home() {
  const navigate = useNavigate();
  const [productList, setProductList] = useState<APISearchResults>();
  const [inputValue, setInputValue] = useState<string>('');
  const [category, setCategory] = useState<string>('');
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
    <div className="home-page">
      <input
        id="search"
        type="text"
        size={ 150 }
        data-testid="query-input"
        onChange={ handleInputChange }
        value={ inputValue }
      />
      <button
        data-testid="query-button"
        onClick={ handleSearch }
      >
        Pesquisar

      </button>
      <button
        data-testid="shopping-cart-button"
        onClick={ () => navigate('/cart') }
      >
        <img src={ Cart } alt="cartshop" width={ 18 } />
      </button>
      <Category handleCategoryChange={ handleCategoryChange } />
      {productsFound ? (
        <div>
          {productList?.results.map((product) => (
            <div key={ product.id }>
              <Card product={ product } />
            </div>
          ))}
        </div>
      )
        : (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )}

    </div>
  );
}

export default Home;
