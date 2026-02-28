<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useLanguage } from "../../../lib/useLanguage";
import { usePageContext } from "vike-vue/usePageContext";

const pageContext = usePageContext();
const slug = pageContext.routeParams?.slug as string;

const { language } = useLanguage();

interface PaperDetail {
  pageContent: string;
  title: string;
  authors: string;
  year: number;
  venue?: string;
  doi?: string;
  url?: string;
  category?: string;
}

const paper = ref<PaperDetail | null>(null);
const isLoading = ref(true);

async function loadPaper() {
  if (typeof window === "undefined") return;
  try {
    isLoading.value = true;
    // Try static JSON first (production), then API (dev)
    let data: any;
    const staticRes = await fetch(`/data/paper-post-${language.value}-${slug}.json`);
    if (staticRes.ok) {
      data = await staticRes.json();
    } else {
      const apiRes = await fetch(`/api/paper-post?slug=${slug}&lang=${language.value}`);
      if (!apiRes.ok) throw new Error("Not found");
      data = await apiRes.json();
    }
    paper.value = data;
  } catch (e) {
    console.error("Failed to load paper:", e);
    paper.value = null;
  } finally {
    isLoading.value = false;
  }
}

watch(language, () => loadPaper(), { immediate: true });
</script>

<template>
  <div>
    <div v-if="isLoading" class="text-center py-8">
      <p class="text-text-light text-sm">Loading...</p>
    </div>
    <div v-else-if="paper">
      <header class="mb-8 pb-6 border-b border-border-light">
        <span v-if="paper.category" class="text-xs font-medium text-accent">{{ paper.category }}</span>
        <h1 class="text-2xl font-bold tracking-tight mt-1">{{ paper.title }}</h1>
        <p class="text-sm text-text-muted mt-2">{{ paper.authors }}</p>
        <p class="text-xs text-text-light mt-1">
          {{ paper.year }}<span v-if="paper.venue"> · {{ paper.venue }}</span>
        </p>
        <div v-if="paper.doi || paper.url" class="flex gap-3 mt-3">
          <a v-if="paper.doi" :href="paper.doi" target="_blank" class="text-xs font-medium text-accent hover:underline">DOI ↗</a>
          <a v-if="paper.url" :href="paper.url" target="_blank" class="text-xs font-medium text-accent hover:underline">External Link ↗</a>
        </div>
      </header>
      <div class="paper-content" v-html="paper.pageContent"></div>
    </div>
    <div v-else class="text-center py-8">
      <p class="text-text-light text-sm">Paper not found.</p>
      <a href="/papers" class="text-sm text-accent hover:underline mt-2 inline-block">← Back to papers</a>
    </div>
  </div>
</template>

<style scoped>
.paper-content {
  line-height: 1.8;
  font-size: 0.95rem;
}
.paper-content :deep(p) { margin-bottom: 1rem; }
.paper-content :deep(h2) { font-size: 1.375rem; font-weight: 600; margin-top: 2rem; margin-bottom: 0.75rem; }
.paper-content :deep(h3) { font-size: 1.125rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.5rem; }
.paper-content :deep(a) { color: var(--color-accent); text-decoration: underline; }
.paper-content :deep(blockquote) { border-left: 3px solid var(--color-accent); padding-left: 1rem; color: var(--color-text-muted); font-style: italic; margin: 0 0 1rem 0; }
.paper-content :deep(code) { background-color: var(--color-border-light); padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-size: 0.85em; }
</style>
