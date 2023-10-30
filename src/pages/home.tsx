import { useState } from 'react';
import Category from './Category';
import { APISearchResults } from '../types/apiSearch';
import Card from '../components/card';
import { getProductsFromCategoryAndQuery } from '../services/api';

function Home() {
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
