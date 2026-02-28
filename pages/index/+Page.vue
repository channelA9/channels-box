<script setup lang="ts">
import { useLanguage } from "../../lib/useLanguage";
import { useBlogData } from "../../lib/useBlogData";
import { usePapersData } from "../../lib/usePapersData";
import { marked } from "marked";
import { computed, ref, onMounted } from "vue";

const { language, t } = useLanguage();
const { blogArticles, recentBlogPost, isLoading } = useBlogData();
const { papersArticles, isLoading: papersLoading } = usePapersData();

const isClient = ref(false);
onMounted(() => { isClient.value = true; });

const formatDate = (date: Date) => {
  const locale = language.value === "jp" ? "ja-JP" : "en-US";
  const d = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
};

const recentPosts = computed(() => blogArticles.value.slice(0, 3));
const recentPapers = computed(() => papersArticles.value.slice(0, 3));

/** Split a string on literal \n sequences into paragraphs, render inline markdown */
const bioParagraphs = computed(() =>
  t.value.home.profile.bio
    .split(/\\n|\n/)
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => marked.parseInline(s) as string)
);
</script>

<template>
  <div>
    <!-- Profile Section -->
    <div class="flex items-start gap-8 mb-10 pb-8 border-b border-border-light">
      <img
        src="/photos/portrait.png"
        alt="Profile"
        class="lg:w-56 lg:h-72 w-32 h-48 object-cover flex-shrink-0"
      />
      <div class="flex flex-col space-y-3">
        <h1 class="text-xl font-bold tracking-tight">{{ t.home.profile.name }}</h1>
        <div class="text-sm text-text-muted space-y-2 bio-content">
          <p v-for="(para, i) in bioParagraphs" :key="i" v-html="para"></p>
        </div>
      </div>
    </div>

    <!-- Latest Post -->
    <!-- <section class="mb-10" v-if="isClient && recentBlogPost">
      <div class="flex items-baseline justify-between mb-4">
        <h2 class="text-xs font-semibold uppercase tracking-wider text-accent">{{ t.home.theLatest }}</h2>
      </div>
      <a :href="recentBlogPost.href" class="block group">
        <h3 class="text-lg font-bold group-hover:text-accent transition-colors">{{ recentBlogPost.title }}</h3>
        <p class="text-sm text-text-muted mt-1">{{ formatDate(recentBlogPost.date) }}</p>
        <p v-if="recentBlogPost.excerpt" class="text-sm text-text-muted mt-2">{{ recentBlogPost.excerpt }}</p>
      </a>
    </section> -->

    <!-- Recent Blog Posts -->
    <section class="mb-10" v-if="isClient">
      <div class="flex items-baseline justify-between mb-4">
        <h2 class="text-xs font-semibold uppercase tracking-wider text-accent">{{ t.home.recentBlog }}</h2>
        <a href="/blog" class="text-xs text-text-muted hover:text-text transition-colors">{{ t.home.viewAll }}</a>
      </div>
      <div v-if="isLoading" class="text-sm text-text-light">Loading...</div>
      <ul v-else-if="recentPosts.length > 0" class="space-y-3">
        <li v-for="post in recentPosts" :key="post.slug">
          <a :href="post.href" class="flex justify-between items-baseline group">
            <span class="font-medium group-hover:text-accent transition-colors">{{ post.title }}</span>
            <span class="text-xs text-text-light ml-4 flex-shrink-0">{{ formatDate(post.date) }}</span>
          </a>
        </li>
      </ul>
      <p v-else class="text-sm text-text-light">{{ t.home.noPosts }}</p>
    </section>

    <!-- Recent Papers -->
    <section class="mb-10" v-if="isClient">
      <div class="flex items-baseline justify-between mb-4">
        <h2 class="text-xs font-semibold uppercase tracking-wider text-accent">{{ t.home.recentPapers }}</h2>
        <a href="/papers" class="text-xs text-text-muted hover:text-text transition-colors">{{ t.home.viewAll }}</a>
      </div>
      <div v-if="papersLoading" class="text-sm text-text-light">Loading...</div>
      <ul v-else-if="recentPapers.length > 0" class="space-y-3">
        <li v-for="paper in recentPapers" :key="paper.slug">
          <a :href="paper.doi || paper.url || `/papers/${paper.slug}`" :target="(paper.doi || paper.url) ? '_blank' : undefined" class="block group cursor-pointer">
            <span class="font-medium group-hover:text-accent transition-colors">{{ paper.title }}</span>
            <p class="text-xs text-text-light mt-0.5">{{ paper.authors }} · {{ paper.year }}</p>
          </a>
        </li>
      </ul>
      <p v-else class="text-sm text-text-light">{{ t.home.noPapers }}</p>
    </section>
  </div>
</template>

<style scoped>
.bio-content :deep(a) {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.bio-content :deep(a:hover) {
  opacity: 0.8;
}
</style>
