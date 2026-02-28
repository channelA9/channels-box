<script setup lang="ts">
import { useLanguage } from "../../lib/useLanguage";
import { useBlogData, type BlogArticle } from "../../lib/useBlogData";
import { computed } from "vue";

const { language, t } = useLanguage();
const { blogArticles, isLoading } = useBlogData();

const formatDate = (date: Date) => {
  const locale = language.value === "jp" ? "ja-JP" : "en-US";
  const d = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
};
</script>

<template>
  <div>
    <div class="mb-10">
      <h1 class="text-3xl font-bold tracking-tight">{{ t.blog.title }}</h1>
      <p class="text-sm text-text-muted mt-1">{{ t.blog.subtitle }}</p>
    </div>

    <div v-if="isLoading" class="text-sm text-text-light py-8">Loading...</div>

    <ul v-else-if="blogArticles.length > 0" class="space-y-6">
      <li v-for="article in blogArticles" :key="article.slug" class="border-b border-border-light pb-6 last:border-0">
        <a :href="article.href" class="block group">
          <span v-if="article.category" class="text-xs font-medium text-accent">{{ article.category }}</span>
          <h2 class="text-lg font-bold group-hover:text-accent transition-colors mt-0.5">{{ article.title }}</h2>
          <p class="text-xs text-text-light mt-1">{{ formatDate(article.date) }}</p>
        </a>
      </li>
    </ul>

    <p v-else class="text-sm text-text-light py-8">{{ t.blog.noPosts }}</p>
  </div>
</template>
