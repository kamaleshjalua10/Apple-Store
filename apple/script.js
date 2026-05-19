(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const stored = localStorage.getItem("theme");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const current = stored || (prefersDark ? "dark" : "light");

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      if (toggle) toggle.textContent = "☀️";
    } else {
      root.setAttribute("data-theme", "light");
      if (toggle) toggle.textContent = "🌙";
    }
  }

  function initSearch() {
    const searchInput = document.querySelector(
      '.header-actions input[type="search"]',
    );
    const searchBtn = document.querySelector(
      ".header-actions button:not(#theme-toggle)",
    );
    const header = document.querySelector(".site-header");
    const productGrid = document.querySelector(".product-grid");

    if (!searchInput || !searchBtn || !productGrid) return;

    const resultsMessage = document.createElement("div");
    resultsMessage.id = "search-message";
    resultsMessage.className = "search-results-message";
    header.insertAdjacentElement("afterend", resultsMessage);

    const cards = Array.from(productGrid.querySelectorAll(".product-card"));

    function applySearch(query) {
      const trimmed = query.trim().toLowerCase();
      if (!trimmed) {
        cards.forEach((card) => (card.style.display = ""));
        resultsMessage.textContent = "";
        return;
      }

      const matches = cards.filter((card) => {
        const text = card.textContent.toLowerCase();
        return text.includes(trimmed);
      });

      cards.forEach((card) => {
        card.style.display = matches.includes(card) ? "" : "none";
      });

      resultsMessage.textContent = matches.length
        ? `Search results for "${query}" — ${matches.length} item${matches.length === 1 ? "" : "s"}`
        : `No results for "${query}"`;
    }

    searchBtn.addEventListener("click", () => applySearch(searchInput.value));
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        applySearch(searchInput.value);
      }
    });
  }

  applyTheme(current);

  if (toggle) {
    toggle.addEventListener("click", () => {
      const now = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(now);
      localStorage.setItem("theme", now);
    });
  }

  document.addEventListener("DOMContentLoaded", initSearch);
})();
