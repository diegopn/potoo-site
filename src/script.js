const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

if (menuButton && navigation) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", event => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });
}

const themeButton = document.querySelector("[data-theme-toggle]");
const rootElement = document.documentElement;
const themeMedia = window.matchMedia("(prefers-color-scheme: dark)");
const themeLanguage = rootElement.lang.toLowerCase();
const themeLabels = themeLanguage.startsWith("pt")
  ? { light: "Ativar modo claro", dark: "Ativar modo escuro" }
  : themeLanguage.startsWith("es")
    ? { light: "Activar modo claro", dark: "Activar modo oscuro" }
    : { light: "Switch to light mode", dark: "Switch to dark mode" };

const updateThemeButton = theme => {
  if (!themeButton) return;
  const label = theme === "dark" ? themeLabels.light : themeLabels.dark;
  themeButton.setAttribute("aria-label", label);
  themeButton.setAttribute("aria-pressed", String(theme === "dark"));
  themeButton.title = label;
};

const setTheme = (theme, saveChoice = false) => {
  rootElement.dataset.theme = theme;
  rootElement.dataset.themeChoice = saveChoice ? "saved" : "system";

  if (saveChoice) {
    try {
      window.localStorage.setItem("potoo-theme", theme);
    } catch {}
  }

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = theme === "dark" ? "#0A0B0A" : "#eef9f0";
  updateThemeButton(theme);
};

if (themeButton) {
  updateThemeButton(rootElement.dataset.theme || "light");
  themeButton.addEventListener("click", () => {
    setTheme(rootElement.dataset.theme === "dark" ? "light" : "dark", true);
  });
}

themeMedia.addEventListener("change", event => {
  if (rootElement.dataset.themeChoice === "system") {
    setTheme(event.matches ? "dark" : "light");
  }
});
