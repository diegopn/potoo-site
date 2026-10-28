(() => {
  const root = document.documentElement;
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  let theme = systemPrefersDark ? "dark" : "light";
  let choice = "system";

  try {
    const savedTheme = window.localStorage.getItem("potoo-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      theme = savedTheme;
      choice = "saved";
    }
  } catch {}

  root.dataset.theme = theme;
  root.dataset.themeChoice = choice;

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = theme === "dark" ? "#0A0B0A" : "#eef9f0";
})();
