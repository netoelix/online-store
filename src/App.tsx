import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Cart from './pages/cart';
import ProductDetails from './pages/details';
import Purchase from './pages/Purchase';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route index element={ <Home /> } />
        <Route path="/cart" element={ <Cart /> } />
        <Route path="/details/:productId" element={ <ProductDetails /> } />
        <Route path="/cart/purchase" element={ <Purchase /> } />
      </Route>
    </Routes>
  );
}

export default App;
