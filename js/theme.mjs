const STORAGE_KEY = "weather_theme";
const root = document.documentElement;
const toggleBtn = document.querySelector("[data-theme-toggle]");

function apply(theme) {
  root.dataset.theme = theme;
  localStorage.setItem(STORAGE_KEY, theme);
}

function toggleHandler() {
  const current = root.dataset.theme || "light";
  apply(current === "dark" ? "light" : "dark");
}

function loadSaved() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") {
    apply(saved);
    return;
  }
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  apply(prefersDark ? "dark" : "light");
}

export function initTheme() {
  toggleBtn?.addEventListener("click", toggleHandler);
  loadSaved();
}
