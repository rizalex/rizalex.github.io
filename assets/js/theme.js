// Local override of portfolYOU theme's assets/js/theme.js.
//
// Behavior:
// - No saved preference  -> follow the OS/system color scheme, and keep
//   following it live when the system theme changes.
// - User clicks the navbar toggle -> manual choice wins, is persisted to
//   localStorage, and system changes no longer override it.
// - The toggle button (toggleTheme) is unchanged and always available.

const STORAGE_KEY = "theme";
const THEME_ATTR = "data-theme";
const QUERY_KEY = "(prefers-color-scheme: dark)";

const themes = {
  LIGHT: "light",
  DARK: "dark",
};

initTheme();

function readSavedTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === themes.DARK || saved === themes.LIGHT) return saved;
  } catch (e) {
    // Storage unavailable (e.g. private mode) -> fall through to system.
  }
  return null;
}

function systemTheme() {
  if (window.matchMedia && window.matchMedia(QUERY_KEY).matches) {
    return themes.DARK;
  }
  return themes.LIGHT;
}

function initTheme() {
  // Manual preference wins; otherwise follow the system.
  setTheme(readSavedTheme() || systemTheme());

  // Keep following the system, but only while the user has not
  // chosen manually (manual choice is the persisted override).
  if (window.matchMedia) {
    const mq = window.matchMedia(QUERY_KEY);
    const onSystemChange = (e) => {
      if (!readSavedTheme()) {
        setTheme(e.matches ? themes.DARK : themes.LIGHT);
      }
    };
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", onSystemChange);
    } else if (typeof mq.addListener === "function") {
      mq.addListener(onSystemChange); // older Safari
    }
  }
}

function toggleTheme() {
  const next = getTheme() === themes.DARK ? themes.LIGHT : themes.DARK;
  setTheme(next);
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch (e) {
    // Storage unavailable -> manual choice applies for this session only.
  }
}

function getTheme() {
  return document.documentElement.getAttribute(THEME_ATTR);
}

function setTheme(value) {
  document.documentElement.setAttribute(THEME_ATTR, value);
}
