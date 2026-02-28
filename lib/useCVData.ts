import { ref, computed, watch } from "vue";
import { useLanguage } from "./useLanguage";

export interface CVData {
  contact: {
    name: string;
    title: string;
    email: string;
    location: string;
  };
  education: Array<{
    institution: string;
    location: string;
    degree: string;
    gpa: string;
    dates: string;
  }>;
  experience: Array<{
    title: string;
    organization: string;
    location: string;
    dates: string;
    bullets: string[];
  }>;
  research: Array<{ citation: string }>;
  presentations: Array<{ citation: string }>;
  projects: Array<{
    name: string;
    url: string;
    date: string;
    description: string;
  }>;
  skills: Array<{ category: string; items: string }>;
  coursework: Array<{ category: string; items: string[] }>;
  awards: Array<{ name: string; details: string[] }>;
  languages: Array<{ name: string; proficiency: string }>;
  extracurricular: Array<{
    name: string;
    description: string;
    dates?: string;
  }>;
}

const cvCache = ref<CVData | null>(null);
const isLoading = ref(false);

async function loadCVData(): Promise<CVData | null> {
  if (typeof window === "undefined") return null;
  if (cvCache.value) return cvCache.value;

  try {
    isLoading.value = true;
    const response = await fetch("/api/cv-data");
    if (!response.ok) throw new Error(`Failed to load CV data: ${response.statusText}`);
    const data = await response.json();
    cvCache.value = data;
    return data;
  } catch (error) {
    console.error("Error loading CV data:", error);
    return null;
  } finally {
    isLoading.value = false;
  }
}

export function useCVData() {
  const cvData = ref<CVData | null>(null);

  // Load on first use
  if (typeof window !== "undefined") {
    loadCVData().then((data) => {
      cvData.value = data;
    });
  }

  return {
    cvData: computed(() => cvData.value),
    isLoading: computed(() => isLoading.value),
  };
}
