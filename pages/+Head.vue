<!-- https://vike.dev/Head -->

<template>
  <!-- Blocking script: runs before first paint to apply stored theme + language.
       No async/defer — intentionally parser-blocking to prevent FOUC. -->
  <script>
    (function () {
      try {
        // --- Theme ---
        var pref = localStorage.getItem('theme-preference');
        if (pref === 'dark' || (!pref && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
        }
        // --- Language ---
        var lang = localStorage.getItem('preferred-language');
        if (lang === 'en' || lang === 'jp') {
          document.documentElement.setAttribute('data-lang', lang);
        } else {
          var browserLang = navigator.language.toLowerCase();
          document.documentElement.setAttribute('data-lang', browserLang.startsWith('ja') ? 'jp' : 'en');
        }
      } catch (e) {}
      // Hide body until Vue mounts and applies correct state
      document.documentElement.setAttribute('data-loading', '');
    })();
  </script>
  <!-- Keep body invisible until data-loading is removed post-mount -->
  <style>
    html[data-loading] body { visibility: hidden; }
  </style>
  <link rel="icon" :href="logoUrl" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Sans+JP:wght@100..900&display=swap"
    rel="stylesheet"
  />
</template>

<script setup lang="ts">
import logoUrl from "../assets/logo.svg";
</script>
