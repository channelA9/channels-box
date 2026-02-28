import { ref, computed, watch } from "vue";
import type { Language } from "./i18n";
import { useLanguage } from "./useLanguage";

export interface BlogArticle {
  title: string;
  date: Date;
  href: string;
  excerpt?: string;
  category?: string;
  slug: string;
}

export interface RecentBlogPost {
  title: string;
  date: Date;
  href: string;
  excerpt?: string;
  category?: string;
  slug: string;
}

// Cache for loaded blog data
const blogCache = ref<Record<Language, BlogArticle[]>>({
  en: [],
  jp: [],
});

const isLoading = ref(false);

async function loadBlogData(language: Language): Promise<BlogArticle[]> {
  if (typeof window === "undefined") return [];

  if (blogCache.value[language].length > 0) {
    return blogCache.value[language];
  }

  try {
    isLoading.value = true;

    // Try static JSON first (production), then API (dev)
    let data: any;
    const staticRes = await fetch(`/data/blog-${language}.json`);
    if (staticRes.ok) {
      data = await staticRes.json();
      data.articles = data.posts; // normalize key name
    } else {
      const apiRes = await fetch(`/api/blog-data?lang=${language}`);
      if (!apiRes.ok) throw new Error(`Failed to load blog data: ${apiRes.statusText}`);
      data = await apiRes.json();
    }

    const articles = (data.articles || data.posts || []).map((article: any) => ({
      ...article,
      date: new Date(new Date(article.date).setHours(12, 0, 0, 0)),
    }));
    blogCache.value[language] = articles;
    return blogCache.value[language];
  } catch (error) {
    console.error(`Error loading blog data for ${language}:`, error);
    return [];
  } finally {
    isLoading.value = false;
  }
}

export function useBlogData() {
  const { language } = useLanguage();
  const articles = ref<BlogArticle[]>([]);

  const blogArticles = computed(() => {
    if (!articles.value || articles.value.length === 0) return [];
    return articles.value.sort((a, b) => {
      const dateA = a.date instanceof Date ? a.date : new Date(a.date);
      const dateB = b.date instanceof Date ? b.date : new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  });

  const recentBlogPost = computed(() => {
    const sorted = blogArticles.value;
    return sorted.length > 0 ? sorted[0] : null;
  });

  watch(
    language,
    async (newLang) => {
      articles.value = await loadBlogData(newLang);
    },
    { immediate: true },
  );

  return {
    blogArticles,
    recentBlogPost,
    isLoading: computed(() => isLoading.value),
  };
}
