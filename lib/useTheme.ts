import { ref, computed, onMounted } from "vue";

export type ThemePreference = "system" | "light" | "dark";

const currentPreference = ref<ThemePreference>("system");
let themeInitialized = false;

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(resolved: "light" | "dark") {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

function resolveTheme(pref: ThemePreference): "light" | "dark" {
  return pref === "system" ? getSystemTheme() : pref;
}

function initTheme() {
  if (themeInitialized) return;
  if (typeof window === "undefined") return;
  themeInitialized = true;

  const saved = localStorage.getItem("theme-preference") as ThemePreference;
  if (saved && ["system", "light", "dark"].includes(saved)) {
    currentPreference.value = saved;
  }

  applyTheme(resolveTheme(currentPreference.value));

  // Listen for system theme changes when preference is "system"
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (currentPreference.value === "system") {
      applyTheme(getSystemTheme());
    }
  });
}

export function useTheme() {
  // Defer theme init to after hydration — the blocking script in +Head.vue
  // already applied the correct class before first paint. This just syncs
  // the reactive state without causing a hydration mismatch.
  onMounted(() => {
    initTheme();
  });

  const isDark = computed(() => resolveTheme(currentPreference.value) === "dark");

  const cycleTheme = () => {
    const order: ThemePreference[] = ["system", "light", "dark"];
    const idx = order.indexOf(currentPreference.value);
    currentPreference.value = order[(idx + 1) % order.length];
    if (typeof window !== "undefined") {
      localStorage.setItem("theme-preference", currentPreference.value);
    }
    applyTheme(resolveTheme(currentPreference.value));
  };

  return {
    preference: computed(() => currentPreference.value),
    isDark,
    cycleTheme,
  };
}
