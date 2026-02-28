<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
  href: string;
  category?: string;
  date?: string;
}>();
</script>

<template>
  <a
    :href="href"
    class="group block h-full border-2 border-black bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
  >
    <div class="flex h-full flex-col justify-between">
      <div>
        <div v-if="category" class="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
          {{ category }}
        </div>
        <h3 class="mb-2 text-2xl font-bold leading-tight group-hover:underline decoration-yellow-400 decoration-4 underline-offset-4">
          {{ title }}
        </h3>
        <p v-if="description" class="text-gray-600">
          {{ description }}
        </p>
      </div>
      <div v-if="date" class="mt-4 text-sm font-medium text-gray-400">
        {{ date }}
      </div>
    </div>
  </a>
</template>
