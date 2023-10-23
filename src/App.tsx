import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Cart from './pages/cart';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/cart" element={ <Cart /> } />
      {/* <Route path="/coffees/:coffee" element={ <Coffee /> } /> */}
    </Routes>
  );
}

export default App;
