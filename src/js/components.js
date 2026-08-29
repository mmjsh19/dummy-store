const pathPrefix = location.pathname.includes("/pages/") ? "../" : "";

export function renderHeader() {
  const el = document.getElementById("header-placeholder");
  if (!el) return;

  el.innerHTML = `
  <header class="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-700">
    <nav class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

      <!-- Logo -->
      <a href="${pathPrefix}index.html" class="flex items-center gap-2 text-xl font-extrabold">
        <i class="fa-solid fa-bag-shopping text-indigo-600 dark:text-indigo-400"></i>
        <span>Dummy<span class="text-indigo-600 dark:text-indigo-400">Store</span></span>
      </a>

      <!-- Desktop nav -->
      <ul class="hidden md:flex items-center gap-6 font-medium">
        <li><a href="${pathPrefix}index.html" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Home</a></li>
        <li><a href="${pathPrefix}pages/shop.html" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Shop</a></li>
        <li><a href="${pathPrefix}pages/wishlist.html" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Wishlist</a></li>
      </ul>

      <!-- Actions -->
      <div class="flex items-center gap-4">
        <button id="dark-mode-toggle" title="Toggle theme"
                class="w-9 h-9 grid place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
          <i class="fa-solid fa-moon"></i>
        </button>

        <a href="${pathPrefix}pages/cart.html" class="relative w-9 h-9 grid place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
          <i class="fa-solid fa-cart-shopping"></i>
          <span id="cart-count"
                class="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 rounded-full grid place-items-center">0</span>
        </a>

        <a href="${pathPrefix}pages/login.html" id="auth-link"
           class="hidden md:inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
          Sign In
        </a>

        <button id="mobile-menu-btn" class="md:hidden w-9 h-9 grid place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <div id="mobile-menu" class="hidden md:hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <ul class="px-4 py-3 space-y-1 font-medium">
        <li><a href="${pathPrefix}index.html" class="block px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">Home</a></li>
        <li><a href="${pathPrefix}pages/shop.html" class="block px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">Shop</a></li>
        <li><a href="${pathPrefix}pages/wishlist.html" class="block px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">Wishlist</a></li>
        <li><a href="${pathPrefix}pages/cart.html" class="block px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">Cart</a></li>
      </ul>
      <div class="px-4 pb-4">
        <a href="${pathPrefix}pages/login.html" class="block text-center bg-indigo-600 text-white py-2 rounded-lg font-semibold">Sign In</a>
      </div>
    </div>
  </header>`;
}

export function renderFooter() {
  const el = document.getElementById("footer-placeholder");
  if (!el) return;

  el.innerHTML = `
  <footer class="bg-slate-900 text-slate-300 mt-16">
    <div class="max-w-7xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-4">

      <div>
        <a href="${pathPrefix}index.html" class="flex items-center gap-2 text-xl font-extrabold text-white">
          <i class="fa-solid fa-bag-shopping text-indigo-400"></i> DummyStore
        </a>
        <p class="mt-3 text-sm leading-6 text-slate-400">
          A demo e-commerce project powered by DummyJSON API. Built with HTML, Tailwind CSS and vanilla JavaScript.
        </p>
        <div class="mt-4 flex gap-3 text-lg">
          <a href="#" class="hover:text-indigo-400 transition"><i class="fa-brands fa-github"></i></a>
          <a href="#" class="hover:text-indigo-400 transition"><i class="fa-brands fa-linkedin"></i></a>
          <a href="#" class="hover:text-indigo-400 transition"><i class="fa-brands fa-instagram"></i></a>
        </div>
      </div>

      <div>
        <h4 class="text-white font-semibold mb-3">Quick Links</h4>
        <ul class="space-y-2 text-sm">
          <li><a href="${pathPrefix}index.html" class="hover:text-indigo-400 transition">Home</a></li>
          <li><a href="${pathPrefix}pages/shop.html" class="hover:text-indigo-400 transition">Shop</a></li>
          <li><a href="${pathPrefix}pages/cart.html" class="hover:text-indigo-400 transition">Cart</a></li>
          <li><a href="${pathPrefix}pages/wishlist.html" class="hover:text-indigo-400 transition">Wishlist</a></li>
        </ul>
      </div>

      <div>
        <h4 class="text-white font-semibold mb-3">Categories</h4>
        <ul class="space-y-2 text-sm">
          <li><a href="${pathPrefix}pages/shop.html?category=smartphones" class="hover:text-indigo-400 transition">Smartphones</a></li>
          <li><a href="${pathPrefix}pages/shop.html?category=laptops" class="hover:text-indigo-400 transition">Laptops</a></li>
          <li><a href="${pathPrefix}pages/shop.html?category=fragrances" class="hover:text-indigo-400 transition">Fragrances</a></li>
          <li><a href="${pathPrefix}pages/shop.html?category=groceries" class="hover:text-indigo-400 transition">Groceries</a></li>
        </ul>
      </div>

      <div>
        <h4 class="text-white font-semibold mb-3">About</h4>
        <ul class="space-y-2 text-sm text-slate-400">
          <li>University Software Project</li>
          <li>Student: Afra</li>
          <li>Summer Term</li>
        </ul>
      </div>
    </div>

    <div class="border-t border-slate-800 py-4 text-center text-sm text-slate-500">
      © ${new Date().getFullYear()} DummyStore. All rights reserved.
    </div>
  </footer>`;
}