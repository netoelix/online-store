import Category from './Category';

function Home() {
  return (
    <div className="home-page">
      <p data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
      <Category />
    </div>
  );
}

export default Home;
