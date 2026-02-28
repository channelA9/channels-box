<script setup lang="ts">
import { computed } from "vue";
import { useLanguage } from "../../../lib/useLanguage";
import { useBlogPost } from "../../../lib/useBlogPost";
import { usePageContext } from "vike-vue/usePageContext";

const pageContext = usePageContext();
const slug = pageContext.routeParams?.slug as string;

const { language } = useLanguage();
const { blogPost, isLoading } = useBlogPost(slug);

const formattedDate = computed(() => {
  if (!blogPost.value) return "";
  const locale = language.value === "jp" ? "ja-JP" : "en-US";
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(blogPost.value.date);
});
</script>

<template>
  <div class="blog-post-container">
    <div v-if="isLoading" class="text-center py-8">
      <p class="text-text-light text-sm">Loading...</p>
    </div>
    <div v-else-if="blogPost">
      <header class="mb-8 pb-6 border-b border-border-light">
        <span v-if="blogPost.category" class="text-xs font-medium text-accent">{{ blogPost.category }}</span>
        <h1 class="text-3xl font-bold tracking-tight mt-1">{{ blogPost.title }}</h1>
        <time class="text-sm text-text-light mt-2 block">{{ formattedDate }}</time>
        <p v-if="blogPost.excerpt" class="text-sm text-text-muted mt-3 italic">{{ blogPost.excerpt }}</p>
      </header>
      <div class="blog-post-content" v-html="blogPost.pageContent"></div>
    </div>
    <div v-else class="text-center py-8">
      <p class="text-text-light text-sm">Blog post not found</p>
    </div>
  </div>
</template>

<style scoped>
.blog-post-content {
  line-height: 1.8;
  font-size: 0.95rem;
}

.blog-post-content :deep(h1),
.blog-post-content :deep(h2),
.blog-post-content :deep(h3) {
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.blog-post-content :deep(h1) { font-size: 1.75rem; }
.blog-post-content :deep(h2) { font-size: 1.375rem; }
.blog-post-content :deep(h3) { font-size: 1.125rem; }

.blog-post-content :deep(p) {
  margin-bottom: 1rem;
}

.blog-post-content :deep(ul),
.blog-post-content :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.blog-post-content :deep(li) {
  margin-bottom: 0.25rem;
}

.blog-post-content :deep(code) {
  background-color: var(--color-border-light);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.85em;
}

.blog-post-content :deep(pre) {
  background-color: #1f2937;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.blog-post-content :deep(pre code) {
  background: none;
  padding: 0;
}

.blog-post-content :deep(blockquote) {
  border-left: 3px solid var(--color-accent);
  padding-left: 1rem;
  margin: 0 0 1rem 0;
  color: var(--color-text-muted);
  font-style: italic;
}

.blog-post-content :deep(a) {
  color: var(--color-accent);
  text-decoration: underline;
}

.blog-post-content :deep(img) {
  max-width: 100%;
  border-radius: 0.5rem;
  margin: 1rem 0;
}
</style>
