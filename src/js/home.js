import { fetchProducts, fetchCategories } from "./api.js";
import { productCardTemplate, spinnerHTML, renderError } from "./ui.js";

const categoriesGrid = document.getElementById("categories-grid");
const featuredGrid = document.getElementById("featured-grid");

async function loadCategories() {
  categoriesGrid.innerHTML = spinnerHTML;
  try {
    const categories = await fetchCategories();
    categoriesGrid.innerHTML = categories
      .map((cat) => {
        const label = cat.replace(/-/g, " ");
        return `
          <a href="pages/shop.html?category=${cat}"
             class="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700
                    bg-white dark:bg-slate-800 text-sm font-medium capitalize
                    hover:bg-indigo-600 hover:border-indigo-600 hover:text-white
                    transition">${label}</a>`;
      })
      .join("");
  } catch (err) {
    console.error(err);
    renderError(categoriesGrid, "Failed to load categories.", loadCategories);
  }
}

async function loadFeatured() {
  featuredGrid.innerHTML = spinnerHTML;
  try {
    const products = await fetchProducts(8);
    featuredGrid.innerHTML = products.map(productCardTemplate).join("");
  } catch (err) {
    console.error(err);
    renderError(
      featuredGrid,
      "Failed to load products. Check your connection.",
      loadFeatured,
    );
  }
}

loadCategories();
loadFeatured();
