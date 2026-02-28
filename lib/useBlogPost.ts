import { ref, computed, watch } from "vue";
import type { Language } from "./i18n";
import { useLanguage } from "./useLanguage";

export interface BlogPostData {
  title: string;
  date: Date;
  pageContent: string;
  excerpt?: string;
  category?: string;
}

// Cache for loaded blog posts
const postCache = ref<Record<string, Record<Language, BlogPostData>>>({});
const isLoading = ref(false);

async function loadBlogPost(slug: string, language: Language): Promise<BlogPostData | null> {
  // Only run on client side
  if (typeof window === "undefined") {
    return null;
  }

  if (postCache.value[slug]?.[language]) {
    return postCache.value[slug][language];
  }

  try {
    isLoading.value = true;

    // Try static JSON first (production), then API (dev)
    let data: any;
    const staticRes = await fetch(`/data/blog-post-${language}-${slug}.json`);
    if (staticRes.ok) {
      data = await staticRes.json();
    } else {
      const apiRes = await fetch(`/api/blog-post?slug=${slug}&lang=${language}`);
      if (!apiRes.ok) {
        if (apiRes.status === 404) return null;
        throw new Error(`Failed to load blog post: ${apiRes.statusText}`);
      }
      data = await apiRes.json();
    }

    if (!postCache.value[slug]) {
      postCache.value[slug] = {};
    }

    const blogPost: BlogPostData = {
      title: data.title,
      date: new Date(data.date),
      pageContent: data.pageContent,
      excerpt: data.excerpt,
      category: data.category,
    };

    postCache.value[slug][language] = blogPost;
    return blogPost;
  } catch (error) {
    console.error(`Error loading blog post ${slug} for ${language}:`, error);
    return null;
  } finally {
    isLoading.value = false;
  }
}

export function useBlogPost(slug: string) {
  const { language } = useLanguage();
  const post = ref<BlogPostData | null>(null);

  const blogPost = computed(() => post.value);

  // Load post when language changes
  watch(
    language,
    async (newLang) => {
      post.value = await loadBlogPost(slug, newLang);
    },
    { immediate: true },
  );

  return {
    blogPost,
    isLoading: computed(() => isLoading.value),
  };
}
