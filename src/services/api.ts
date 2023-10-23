export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId: string, query: string) {
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId || ''}&q=${query || ''}`);
  const data = await result.json();
  return data;
}

export async function getProductById(productId: string) {
  const result = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  const data = await result.json();
  return data;
}
