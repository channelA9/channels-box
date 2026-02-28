import { ref, computed, watch } from "vue";
import type { Language } from "./i18n";
import { useLanguage } from "./useLanguage";

export interface PaperArticle {
  title: string;
  authors: string;
  year: number;
  venue?: string;
  doi?: string;
  url?: string;
  category?: string;
  slug: string;
}

const papersCache = ref<Record<Language, PaperArticle[]>>({
  en: [],
  jp: [],
});

const isLoading = ref(false);

async function loadPapersData(language: Language): Promise<PaperArticle[]> {
  if (typeof window === "undefined") return [];

  if (papersCache.value[language].length > 0) {
    return papersCache.value[language];
  }

  try {
    isLoading.value = true;

    // Try static JSON first (production), then API (dev)
    let data: any;
    const staticRes = await fetch(`/data/papers-${language}.json`);
    if (staticRes.ok) {
      data = await staticRes.json();
    } else {
      const apiRes = await fetch(`/api/papers-data?lang=${language}`);
      if (!apiRes.ok) throw new Error(`Failed to load papers data: ${apiRes.statusText}`);
      data = await apiRes.json();
    }

    papersCache.value[language] = data.papers || [];
    return papersCache.value[language];
  } catch (error) {
    console.error(`Error loading papers data for ${language}:`, error);
    return [];
  } finally {
    isLoading.value = false;
  }
}

export function usePapersData() {
  const { language } = useLanguage();
  const papers = ref<PaperArticle[]>([]);

  const papersArticles = computed(() => {
    return papers.value.sort((a, b) => b.year - a.year);
  });

  const papersByYear = computed(() => {
    const grouped = new Map<number, PaperArticle[]>();
    papersArticles.value.forEach((paper) => {
      if (!grouped.has(paper.year)) {
        grouped.set(paper.year, []);
      }
      grouped.get(paper.year)!.push(paper);
    });
    return grouped;
  });

  watch(
    language,
    async (newLang) => {
      papers.value = await loadPapersData(newLang);
    },
    { immediate: true },
  );

  return {
    papersArticles,
    papersByYear,
    isLoading: computed(() => isLoading.value),
  };
}
