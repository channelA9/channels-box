<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useLanguage } from "../lib/useLanguage";
import { useBlogData, type BlogArticle } from "../lib/useBlogData";
import { usePapersData, type PaperArticle } from "../lib/usePapersData";

const { language, t } = useLanguage();
const { blogArticles } = useBlogData();
const { papersArticles } = usePapersData();

const isClient = ref(false);
const isOpen = ref(false);
const query = ref("");
const inputRef = ref<HTMLInputElement | null>(null);

interface SearchResult {
  type: "blog" | "paper";
  title: string;
  href?: string;
  subtitle: string;
}

const results = computed<SearchResult[]>(() => {
  const q = query.value.toLowerCase().trim();
  if (!q || q.length < 2) return [];

  const matches: SearchResult[] = [];

  blogArticles.value.forEach((article: BlogArticle) => {
    if (
      article.title.toLowerCase().includes(q) ||
      (article.excerpt && article.excerpt.toLowerCase().includes(q)) ||
      (article.category && article.category.toLowerCase().includes(q))
    ) {
      matches.push({
        type: "blog",
        title: article.title,
        href: article.href,
        subtitle: article.category || "Blog",
      });
    }
  });

  papersArticles.value.forEach((paper: PaperArticle) => {
    if (
      paper.title.toLowerCase().includes(q) ||
      paper.authors.toLowerCase().includes(q) ||
      (paper.venue && paper.venue.toLowerCase().includes(q))
    ) {
      matches.push({
        type: "paper",
        title: paper.title,
        href: `/papers`,
        subtitle: `${paper.authors} · ${paper.year}`,
      });
    }
  });

  return matches.slice(0, 8);
});

const open = () => {
  isOpen.value = true;
  query.value = "";
  setTimeout(() => inputRef.value?.focus(), 50);
};

const close = () => {
  isOpen.value = false;
  query.value = "";
};

const handleKeydown = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault();
    isOpen.value ? close() : open();
  }
  if (e.key === "Escape") close();
};

onMounted(() => {
  isClient.value = true;
  document.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeydown);
});

defineExpose({ open });
</script>

<template>
  <!-- Search trigger button -->
  <button
    @click="open"
    class="p-1.5 rounded transition-colors text-text-muted hover:text-text"
    aria-label="Search"
    title="Search (Ctrl+K)"
  >
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
    </svg>
  </button>

  <!-- Search modal — client-only to avoid SSR hydration mismatch with Teleport -->
  <Teleport v-if="isClient" to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" @click.self="close">
      <div class="fixed inset-0 bg-black/40" @click="close" />
      <div class="relative w-full max-w-lg mx-4 bg-bg-card text-text rounded-lg shadow-2xl border border-border overflow-hidden">
        <div class="flex items-center gap-3 px-4 py-3 border-b border-border-light">
          <svg class="w-4 h-4 text-text-light flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            ref="inputRef"
            v-model="query"
            type="text"
            placeholder="Search blog posts and papers..."
            class="w-full bg-transparent text-sm outline-none text-text placeholder:text-text-light"
          />
          <kbd class="hidden sm:inline-flex text-[10px] px-1.5 py-0.5 rounded border border-border-light text-text-light">ESC</kbd>
        </div>
        <div v-if="query.length >= 2" class="max-h-80 overflow-y-auto">
          <div v-if="results.length === 0" class="px-4 py-6 text-sm text-text-light text-center">
            No results found.
          </div>
          <a
            v-for="(result, i) in results"
            :key="i"
            :href="result.href"
            class="flex items-center gap-3 px-4 py-3 hover:bg-border-light transition-colors border-b border-border-light last:border-0"
            @click="close"
          >
            <span class="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
              :class="result.type === 'blog' ? 'bg-accent/10 text-accent' : 'bg-blue-100 text-blue-800'">
              {{ result.type }}
            </span>
            <div class="min-w-0">
              <p class="text-sm font-medium truncate">{{ result.title }}</p>
              <p class="text-xs text-text-light truncate">{{ result.subtitle }}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </Teleport>
</template>
