import { useState, useEffect } from 'react';
import { getCategories } from '../services/api';

type CategoryType = {
  id: string;
  name: string;
};

// create the props for the component
type Props = {
  handleCategoryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function Category({ handleCategoryChange }: Props) {
  const [categories, setCategories] = useState<CategoryType[]>([]);

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
          <input
            type="radio"
            name="category_product"
            id={ category.id }
            onChange={ handleCategoryChange }
          />
          <label htmlFor={ category.id } data-testid="category">{category.name}</label>
        </div>
      ))}
    </>
  );
}
export default Category;
