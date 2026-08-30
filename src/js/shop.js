import { fetchProductsPaged } from "./api.js";
import { productCardTemplate, spinnerHTML, renderError } from "./ui.js";

const grid = document.getElementById("products-grid");
const countEl = document.getElementById("result-count");
const filtersEl = document.getElementById("active-filters");
const paginationEl = document.getElementById("pagination");

const PER_PAGE = 12;

// ---- State:  (Single Source of Truth) ----
const urlParams = new URLSearchParams(location.search);

const state = {
  category: urlParams.get("category"),
  page: Math.max(1, parseInt(urlParams.get("page"), 10) || 1),
  total: 0,
};

function updateUrl() {
  const params = new URLSearchParams();
  if (state.category) params.set("category", state.category);
  if (state.page > 1) params.set("page", state.page);
  const qs = params.toString();

  history.replaceState(null, "", qs ? `?${qs}` : location.pathname);
}

// ---- Render helpers ----
function renderCategoryBadge() {
  if (!state.category) {
    filtersEl.innerHTML = "";
    return;
  }
  const label = state.category.replace(/-/g, " ");
  filtersEl.innerHTML = `
    <div class="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/40
                text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-medium">
      Category:
      <span class="capitalize font-semibold">${label}</span>
      <button id="clear-category" title="Clear filter" class="hover:text-red-500 transition">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>`;

  document.getElementById("clear-category").addEventListener("click", () => {
    state.category = null;
    state.page = 1;
    updateUrl();
    loadProducts();
  });
}

function renderCount() {
  const start = (state.page - 1) * PER_PAGE + 1;
  const end = Math.min(state.page * PER_PAGE, state.total);
  countEl.textContent = `Showing ${start}–${end} of ${state.total} products`;
}

function renderPagination() {
  const totalPages = Math.ceil(state.total / PER_PAGE);

  if (totalPages <= 1) {
    paginationEl.innerHTML = "";
    return;
  }

  const base =
    "w-10 h-10 grid place-items-center rounded-lg text-sm font-semibold transition";
  const idle =
    "border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800";

  const pages = [];
  const start = Math.max(1, state.page - 2);
  const end = Math.min(totalPages, state.page + 2);

  if (start > 1) pages.push(1);
  if (start > 2) pages.push("…");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < totalPages - 1) pages.push("…");
  if (end < totalPages) pages.push(totalPages);

  paginationEl.innerHTML = `
    <button data-page="prev" aria-label="Previous page"
            class="${base} ${idle} ${state.page === 1 ? "opacity-40 cursor-not-allowed" : ""}">
      <i class="fa-solid fa-chevron-left"></i>
    </button>
    ${pages
      .map((p) =>
        p === "…"
          ? `<span class="w-10 h-10 grid place-items-center text-slate-400 select-none">…</span>`
          : `<button data-page="${p}"
                 class="${base} ${p === state.page ? "bg-indigo-600 text-white" : idle}">
               ${p}
             </button>`,
      )
      .join("")}
    <button data-page="next" aria-label="Next page"
            class="${base} ${idle} ${state.page === totalPages ? "opacity-40 cursor-not-allowed" : ""}">
      <i class="fa-solid fa-chevron-right"></i>
    </button>`;
}

// ---- Events: Event Delegation  ----
paginationEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-page]");
  if (!btn) return;

  const totalPages = Math.ceil(state.total / PER_PAGE);
  const value = btn.dataset.page;

  if (value === "prev") {
    if (state.page <= 1) return;
    state.page--;
  } else if (value === "next") {
    if (state.page >= totalPages) return;
    state.page++;
  } else {
    state.page = parseInt(value, 10);
  }

  updateUrl();
  loadProducts();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---- Data loading ----
async function loadProducts() {
  grid.innerHTML = spinnerHTML;
  renderCategoryBadge();

  try {
    const data = await fetchProductsPaged({
      limit: PER_PAGE,
      skip: (state.page - 1) * PER_PAGE,
      category: state.category,
    });

    state.total = data.total;

    if (data.products.length === 0 && state.page > 1) {
      state.page = 1;
      updateUrl();
      loadProducts();
      return;
    }

    grid.innerHTML = data.products.map(productCardTemplate).join("");
    renderCount();
    renderPagination();
  } catch (err) {
    console.error(err);
    renderError(
      grid,
      "Failed to load products. Check your connection.",
      loadProducts,
    );
  }
}

loadProducts();
