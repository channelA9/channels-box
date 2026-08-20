<script lang="ts" setup>
import Link from "../components/Link.vue";
import SearchModal from "../components/SearchModal.vue";
import { useLanguage } from "../lib/useLanguage";
import { useTheme } from "../lib/useTheme";
import { ref, onMounted } from "vue";

const { language, t, toggleLanguage } = useLanguage();
const { preference, isDark, cycleTheme } = useTheme();

const isClient = ref(false);
const isMenuOpen = ref(false);

onMounted(() => {
  isClient.value = true;
  // Remove the loading guard set by the blocking script in +Head.vue.
  // By this point, onMounted in useLanguage + useTheme have already fired
  // (same tick), so the correct language/theme state is applied before reveal.
  document.documentElement.removeAttribute('data-loading');
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const disableMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <div class="layout-wrapper min-h-screen relative font-sans bg-bg text-text flex flex-col">
    <header class="w-full max-w-[680px] mx-auto px-6 py-6 flex justify-between items-center relative z-10">
      <nav class="hidden md:flex items-center space-x-6 text-sm">
        <Link href="/" class="font-bold text-base hover:text-accent transition-colors">Shaun Colegado</Link>
        <Link href="/blog" class="hover:text-text transition-colors">{{ t.nav.blog }}</Link>
        <Link href="/papers" class="hover:text-text transition-colors">{{ t.nav.papers }}</Link>
        <Link href="/resume" class="hover:text-text transition-colors">{{ t.nav.cv }}</Link>
      </nav>

      <div class="hidden md:flex items-center gap-2">
        <a href="https://github.com/channelA9" class="text-text-muted hover:text-text transition-colors p-1" aria-label="GitHub">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a href="https://www.linkedin.com/in/shauncolegado/" class="text-text-muted hover:text-text transition-colors p-1" aria-label="LinkedIn">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>

        <!-- Language toggle -->
        <button
          class="px-2 py-1 text-xs hover:bg-bg-card transition-colors font-medium text-text-muted"
          @click="toggleLanguage"
        >
          <img v-if="language == 'en'" src="/icons/en.webp" alt="EN" class="h-4">
          <img v-else src="/icons/ja.webp" alt="JA" class="h-4">
        </button>

        <!-- Theme toggle: system → light → dark (client-only) -->
        <button
          v-if="isClient"
          class="p-1.5 rounded transition-colors text-text-muted hover:text-text"
          @click="cycleTheme"
          :title="`Theme: ${preference}`"
          aria-label="Cycle theme"
        >
          <!-- System: monitor icon -->
          <svg v-if="preference === 'system'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          <!-- Light: sun icon -->
          <svg v-else-if="preference === 'light'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
          <!-- Dark: moon icon -->
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
          </svg>
        </button>

        <!-- Search -->
        <SearchModal />
      </div>

      <!-- Mobile menu button -->
      <div class="md:hidden flex items-center justify-between w-full">
        <Link href="/" class="font-bold text-base">Shaun Colegado</Link>
        <div class="flex items-center gap-2">
          <SearchModal />
          <button
            v-if="isClient"
            class="p-1.5 rounded text-text-muted hover:text-text"
            @click="cycleTheme"
          >
            <svg v-if="preference === 'system'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <svg v-else-if="preference === 'light'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
          </button>
          <button class="z-20 p-2" @click="toggleMenu" aria-label="Menu">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile overlay -->
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 bg-bg flex flex-col items-center justify-center z-30 md:hidden"
      >
        <button class="absolute top-4 right-4 text-3xl text-text-muted" @click="disableMenu">&times;</button>
        <Link href="/" class="mb-6 text-lg font-medium" @click="disableMenu">{{ t.nav.home }}</Link>
        <Link href="/blog" class="mb-6 text-lg font-medium" @click="disableMenu">{{ t.nav.blog }}</Link>
        <Link href="/papers" class="mb-6 text-lg font-medium" @click="disableMenu">{{ t.nav.papers }}</Link>
        <Link href="/resume" class="mb-6 text-lg font-medium" @click="disableMenu">{{ t.nav.cv }}</Link>
        <button
          class="mt-6 px-4 py-2 border border-border rounded hover:bg-bg-card transition-colors text-sm font-medium"
          @click="toggleLanguage"
        >
          <img v-if="language == 'en'" src="/icons/en.webp" alt="EN" class="h-4">
          <img v-else src="/icons/ja.webp" alt="JA" class="h-4">
        </button>
      </div>
    </header>

    <main id="page-content" class="w-full max-w-[680px] mx-auto px-6 py-8 flex-grow relative z-0">
      <slot />
    </main>

    <footer class="w-full max-w-[680px] mx-auto px-6 py-8 border-t border-border-light">
      <p class="text-xs text-text-light text-center">{{ t.footer.copyright }}</p>
    </footer>
  </div>
</template>

<style>
@import "./tailwind.css";

body {
  margin: 0;
  background-color: var(--color-bg);
  transition: background-color 0.3s ease, color 0.3s ease;
}

a {
  text-decoration: none;
  color: inherit;
}

/* Dark mode color overrides */
html.dark {
  --color-bg: var(--color-bg-dark);
  --color-bg-card: var(--color-bg-card-dark);
  --color-text: var(--color-text-dark);
  --color-text-muted: var(--color-text-muted-dark);
  --color-text-light: var(--color-text-light-dark);
  --color-accent: var(--color-accent-dark);
  --color-accent-light: var(--color-accent-light-dark);
  --color-border: var(--color-border-dark);
  --color-border-light: var(--color-border-light-dark);
}

html.dark body {
  background-color: var(--color-bg-dark);
}

/* Page transitions */
#page-content {
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}
body.page-is-transitioning #page-content {
  opacity: 0;
}
</style>
