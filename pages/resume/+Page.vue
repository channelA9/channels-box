<script setup lang="ts">
import { ref, computed } from "vue";
import { useLanguage } from "../../lib/useLanguage";
import { useCVData } from "../../lib/useCVData";

const { t } = useLanguage();
const { cvData, isLoading } = useCVData();

const sections = [
  { id: "contact", key: "contact" },
  { id: "education", key: "education" },
  { id: "experience", key: "experience" },
  { id: "research", key: "research" },
  { id: "presentations", key: "presentations" },
  { id: "projects", key: "projects" },
  { id: "skills", key: "skills" },
  { id: "coursework", key: "coursework" },
  { id: "awards", key: "awards" },
  { id: "languages", key: "languages" },
  { id: "extracurricular", key: "extracurricular" },
];

const activeSection = ref("contact");

const scrollToSection = (id: string) => {
  activeSection.value = id;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold tracking-tight">{{ t.cv.title }}</h1>
      <p class="text-sm text-text-muted mt-1">{{ t.cv.subtitle }}</p>
    </div>

    <div v-if="isLoading" class="text-sm text-text-light py-8">Loading...</div>

    <div v-else-if="cvData" class="flex gap-6">
      <!-- Sidebar Nav -->
      <nav class="hidden lg:block w-40 flex-shrink-0 sticky top-6 self-start">
        <ul class="space-y-0.5">
          <li v-for="section in sections" :key="section.id">
            <button
              class="text-xs w-full text-left px-2 py-1 rounded transition-colors"
              :class="activeSection === section.id
                ? 'bg-accent text-white font-medium'
                : 'text-text-muted hover:text-text hover:bg-border-light'"
              @click="scrollToSection(section.id)"
            >
              {{ t.cv.sections[section.key as keyof typeof t.cv.sections] }}
            </button>
          </li>
        </ul>
      </nav>

      <!-- CV Content -->
      <div class="flex-grow min-w-0 space-y-8">
        <!-- Contact -->
        <section id="contact">
          <h2 class="cv-heading">{{ t.cv.sections.contact }}</h2>
          <dl class="text-sm space-y-1">
            <div class="flex gap-4"><dt class="font-medium w-20 text-text-muted flex-shrink-0">Name</dt><dd>{{ cvData.contact.name }}</dd></div>
            <div class="flex gap-4"><dt class="font-medium w-20 text-text-muted flex-shrink-0">Location</dt><dd>{{ cvData.contact.location }}</dd></div>
            <div class="flex gap-4"><dt class="font-medium w-20 text-text-muted flex-shrink-0">Email</dt><dd>{{ cvData.contact.email }}</dd></div>
          </dl>
        </section>

        <!-- Education -->
        <section id="education">
          <h2 class="cv-heading">{{ t.cv.sections.education }}</h2>
          <div v-for="(edu, i) in cvData.education" :key="i" class="mb-3 last:mb-0">
            <h3 class="font-medium text-sm">{{ edu.institution }}</h3>
            <p class="text-xs text-text-muted">{{ edu.degree }}, GPA: {{ edu.gpa }}</p>
            <p class="text-xs text-text-light">{{ edu.dates }} · {{ edu.location }}</p>
          </div>
        </section>

        <!-- Experience -->
        <section id="experience">
          <h2 class="cv-heading">{{ t.cv.sections.experience }}</h2>
          <div v-for="(exp, i) in cvData.experience" :key="i" class="mb-5 last:mb-0">
            <h3 class="font-medium text-sm">{{ exp.title }}</h3>
            <p class="text-xs text-text-muted">{{ exp.organization }} · {{ exp.location }}</p>
            <p class="text-xs text-text-light mb-2">{{ exp.dates }}</p>
            <ul class="space-y-1 text-xs text-text-muted">
              <li v-for="(bullet, j) in exp.bullets" :key="j" class="leading-relaxed pl-3 relative">
                <span class="absolute left-0">·</span>{{ bullet }}
              </li>
            </ul>
          </div>
        </section>

        <!-- Research -->
        <section id="research">
          <h2 class="cv-heading">{{ t.cv.sections.research }}</h2>
          <ul class="space-y-2">
            <li v-for="(item, i) in cvData.research" :key="i" class="text-sm leading-relaxed">
              {{ item.citation }}
            </li>
          </ul>
        </section>

        <!-- Presentations -->
        <section id="presentations">
          <h2 class="cv-heading">{{ t.cv.sections.presentations }}</h2>
          <ul class="space-y-2">
            <li v-for="(item, i) in cvData.presentations" :key="i" class="text-sm leading-relaxed">
              {{ item.citation }}
            </li>
          </ul>
        </section>

        <!-- Projects -->
        <section id="projects">
          <h2 class="cv-heading">{{ t.cv.sections.projects }}</h2>
          <div v-for="(proj, i) in cvData.projects" :key="i" class="mb-3 last:mb-0">
            <h3 class="font-medium text-sm">
              <a :href="proj.url" target="_blank" class="text-accent hover:underline">{{ proj.name }}</a>
            </h3>
            <p class="text-xs text-text-light">{{ proj.date }}</p>
            <p class="text-xs text-text-muted mt-0.5 leading-relaxed">{{ proj.description }}</p>
          </div>
        </section>

        <!-- Skills -->
        <section id="skills">
          <h2 class="cv-heading">{{ t.cv.sections.skills }}</h2>
          <div class="space-y-2">
            <div v-for="(skill, i) in cvData.skills" :key="i" class="flex gap-2">
              <span class="font-medium text-xs w-32 flex-shrink-0">{{ skill.category }}</span>
              <span class="text-xs text-text-muted">{{ skill.items }}</span>
            </div>
          </div>
        </section>

        <!-- Coursework -->
        <section id="coursework">
          <h2 class="cv-heading">{{ t.cv.sections.coursework }}</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div v-for="(course, i) in cvData.coursework" :key="i">
              <h3 class="font-medium text-xs mb-0.5">{{ course.category }}</h3>
              <ul class="text-xs text-text-muted">
                <li v-for="(item, j) in course.items" :key="j">{{ item }}</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Awards -->
        <section id="awards">
          <h2 class="cv-heading">{{ t.cv.sections.awards }}</h2>
          <div v-for="(award, i) in cvData.awards" :key="i" class="mb-2 last:mb-0">
            <h3 class="font-medium text-xs">{{ award.name }}</h3>
            <ul class="text-xs text-text-muted">
              <li v-for="(detail, j) in award.details" :key="j">{{ detail }}</li>
            </ul>
          </div>
        </section>

        <!-- Languages -->
        <section id="languages">
          <h2 class="cv-heading">{{ t.cv.sections.languages }}</h2>
          <div v-for="(lang, i) in cvData.languages" :key="i" class="mb-1.5 last:mb-0">
            <span class="font-medium text-xs">{{ lang.name }}</span>
            <span class="text-xs text-text-muted"> — {{ lang.proficiency }}</span>
          </div>
        </section>

        <!-- Extracurricular -->
        <section id="extracurricular">
          <h2 class="cv-heading">{{ t.cv.sections.extracurricular }}</h2>
          <div v-for="(item, i) in cvData.extracurricular" :key="i" class="mb-2 last:mb-0">
            <h3 class="font-medium text-xs">{{ item.name }}</h3>
            <p class="text-xs text-text-muted leading-relaxed">{{ item.description }}</p>
            <p v-if="item.dates" class="text-xs text-text-light">{{ item.dates }}</p>
          </div>
        </section>
      </div>
    </div>

    <div v-else class="text-sm text-text-light py-8">Failed to load CV data.</div>
  </div>
</template>

<style scoped>
.cv-heading {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-accent);
  padding-bottom: 0.375rem;
  border-bottom: 1px solid var(--color-border-light);
  margin-bottom: 0.75rem;
}
</style>
