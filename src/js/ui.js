const pathPrefix = location.pathname.includes("/pages/") ? "../" : "";

export const spinnerHTML = `
  <div class="col-span-full flex justify-center py-16">
    <i class="fa-solid fa-spinner fa-spin text-3xl text-indigo-600"></i>
  </div>`;

export function renderError(container, message, retryFn) {
  container.innerHTML = `
    <div class="col-span-full flex flex-col items-center gap-4 py-16 text-center">
      <i class="fa-solid fa-triangle-exclamation text-4xl text-amber-500"></i>
      <p class="text-slate-500 dark:text-slate-400">${message}</p>
      <button class="retry-btn bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-semibold transition">
        Try Again
      </button>
    </div>`;
  container.querySelector(".retry-btn").addEventListener("click", retryFn);
}

export function productCardTemplate(product) {
  // calculate the original price before the discount based on the discount percentage
  const originalPrice = (
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return `
  <article class="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700
                  overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300">
    <a href="${pathPrefix}pages/product.html?id=${product.id}" class="block">
      <div class="aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700">
        <img src="${product.thumbnail}" alt="${product.title}" loading="lazy"
             class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
      </div>
      <div class="p-4">
        <span class="text-xs uppercase tracking-wide font-semibold text-indigo-600 dark:text-indigo-400">
          ${product.category}
        </span>
        <h3 class="mt-1 font-semibold text-slate-900 dark:text-white truncate">${product.title}</h3>
        <div class="mt-1 flex items-center gap-1.5 text-sm">
          <i class="fa-solid fa-star text-amber-500"></i>
          <span class="text-slate-600 dark:text-slate-300">${product.rating}</span>
        </div>
        <div class="mt-2 flex items-center justify-between">
          <span class="text-lg font-bold text-slate-900 dark:text-white">$${product.price}</span>
          <span class="text-sm text-slate-400 line-through">$${originalPrice}</span>
        </div>
      </div>
    </a>
  </article>`;
}
