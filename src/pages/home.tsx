import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate;

  return (
    <div className="home-page">
      <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>
      <input id="search" type="text" />
    </div>
  );
}

export default Home;
