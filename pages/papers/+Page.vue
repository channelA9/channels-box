<script setup lang="ts">
import { ref, computed } from "vue";
import { useLanguage } from "../../lib/useLanguage";
import { usePapersData } from "../../lib/usePapersData";

const { t } = useLanguage();
const { papersByYear, isLoading } = usePapersData();

const filterQuery = ref("");

const filteredPapersByYear = computed(() => {
  const q = filterQuery.value.toLowerCase().trim();
  if (!q) return papersByYear.value;

  const filtered = new Map<number, typeof papersByYear.value extends Map<number, infer V> ? V : never>();
  papersByYear.value.forEach((papers, year) => {
    const matched = papers.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.authors.toLowerCase().includes(q) ||
        (p.venue && p.venue.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)),
    );
    if (matched.length > 0) {
      filtered.set(year, matched);
    }
  });
  return filtered;
});
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold tracking-tight">{{ t.papers.title }}</h1>
      <p class="text-sm text-text-muted mt-1">{{ t.papers.subtitle }}</p>
    </div>

    <!-- Filter -->
    <div class="mb-8">
      <input
        v-model="filterQuery"
        type="text"
        :placeholder="t.papers.filterPlaceholder"
        class="w-full max-w-sm px-4 py-2 text-sm border border-border rounded-lg bg-bg-card focus:outline-none focus:border-accent transition-colors"
      />
    </div>

    <div v-if="isLoading" class="text-sm text-text-light py-8">Loading...</div>

    <div v-else-if="filteredPapersByYear.size > 0">
      <div v-for="[year, papers] in filteredPapersByYear" :key="year" class="mb-8">
        <div class="flex items-start gap-6">
          <div class="flex-grow">
            <div
              v-for="paper in papers"
              :key="paper.slug"
              class="py-4 border-b border-border-light last:border-0"
            >
              <div class="flex items-start gap-4">
                <div class="flex-grow">
                  <span
                    v-if="paper.category"
                    class="inline-block text-xs font-semibold text-white bg-accent px-2 py-0.5 rounded mb-1"
                  >{{ paper.category }}</span>
                  <h3 class="font-bold text-base">
                    <a
                      :href="paper.doi || paper.url || `/papers/${paper.slug}`"
                      :target="(paper.doi || paper.url) ? '_blank' : undefined"
                      class="hover:text-accent transition-colors"
                    >{{ paper.title }}</a>
                  </h3>
                  <p class="text-sm text-text-muted mt-1">{{ paper.authors }}</p>
                  <p class="text-xs text-text-light mt-0.5">{{ paper.year }}{{ paper.venue ? ` · ${paper.venue}` : '' }}</p>
                  <div class="flex items-center gap-2 mt-2">
                    <a
                      v-if="paper.doi"
                      :href="paper.doi"
                      target="_blank"
                      class="text-xs font-medium text-accent hover:underline"
                    >DOI</a>
                    <a
                      v-if="paper.url"
                      :href="paper.url"
                      target="_blank"
                      class="text-xs font-medium text-accent hover:underline"
                    >Link</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span class="text-4xl font-light text-text-light flex-shrink-0 hidden md:block pt-4">{{ year }}</span>
        </div>
      </div>
    </div>

    <p v-else class="text-sm text-text-light py-8">{{ t.papers.noPapers }}</p>
  </div>
</template>
