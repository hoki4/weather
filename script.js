const ThemeModule = (function() {
  const THEME_KEY = "weather_theme";
  const root = document.documentElement;
  const themeBtn = document.querySelector("[data-theme-toggle]");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") {
      applyTheme(saved);
      return;
    }
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    applyTheme(prefersDark ? "dark" : "light");
  }

  return {
    init: function() {
      themeBtn?.addEventListener("click", () => {
        const current = root.getAttribute("data-theme") || "light";
        applyTheme(current === "dark" ? "light" : "dark");
      });
      initTheme();
    }
  };
})();

ThemeModule.init();