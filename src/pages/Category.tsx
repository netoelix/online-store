import { useState, useEffect } from 'react';
import { getCategories } from '../services/api';

function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getCategories();
        setCategories(result);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {categories.map((category) => (
        <div key={ category.id }>
          <input type="radio" name="category_product" id={ category.id } />
          <label htmlFor={ category.id } data-testid="category">{category.name}</label>
        </div>
      ))}
    </>
  );
}
export default Category;
