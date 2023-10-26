import { NavLink } from 'react-router-dom';

function Menu() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/projects">Projetos</NavLink>
    </nav>
  );
}
export default Menu;
