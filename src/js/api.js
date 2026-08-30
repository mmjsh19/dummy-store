const BASE_URL = "https://dummyjson.com";

async function request(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export function fetchProducts(limit = 8) {
  return request(`/products?limit=${limit}`).then((data) => data.products);
}

export function fetchProductsPaged({ limit = 12, skip = 0, category = null }) {
  const base = category ? `/products/category/${category}` : "/products";
  return request(`${base}?limit=${limit}&skip=${skip}`);
}

export function fetchCategories() {
  return request(`/products/category-list`); // ["beauty", "fragrances", ...]
}

export function fetchProductById(id) {
  return request(`/products/${id}`); // برای فاز صفحه محصول
}
