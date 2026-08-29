import { renderHeader, renderFooter } from "./components.js";

renderHeader();
renderFooter();

/* ---------- Dark Mode ---------- */
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
  document.documentElement.classList.add("dark");
}

function syncThemeIcon() {
  const icon = document.querySelector("#dark-mode-toggle i");
  if (!icon) return;
  const isDark = document.documentElement.classList.contains("dark");
  icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
}
syncThemeIcon();

/* ---------- Event Delegation ---------- */
document.addEventListener("click", (e) => {
  // Dark mode toggle
  if (e.target.closest("#dark-mode-toggle")) {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    syncThemeIcon();
  }

  // Mobile menu
  if (e.target.closest("#mobile-menu-btn")) {
    document.getElementById("mobile-menu").classList.toggle("hidden");
  }
});