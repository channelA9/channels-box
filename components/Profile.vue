<script setup lang="ts">
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { RiTranslate, RiGithubFill, RiLinkedinFill } from "oh-vue-icons/icons/ri";
import { IoCubeSharp } from "oh-vue-icons/icons/io";
import { onMounted } from "vue";
import { useLanguage } from "../lib/useLanguage";

addIcons(RiTranslate, RiGithubFill, RiLinkedinFill, IoCubeSharp);

const { t, initLanguage } = useLanguage();

onMounted(() => {
  initLanguage();
});
</script>
<template>
  <div class="flex flex-col gap-3 min-w-36 min-h-36">
    <img src="/photos/portrait.png" alt="User Profile" class="rounded-full w-36 h-36 object-cover" />
    <div class="flex flex-col">
      <h1 class="text-lg font-bold tracking-tight">{{ t.home.profile.name }}</h1>
      <h2 class="text-sm text-neutral-500">{{ t.home.profile.title }}</h2>
    </div>
    <div class="flex items-center gap-2 text-neutral-500">
      <a class="hover:text-black transition-colors" href="https://github.com/channelA9"
        ><OhVueIcon name="ri-github-fill"
      /></a>
      <a class="hover:text-black transition-colors" href="https://www.linkedin.com/in/shauncolegado/"
        ><OhVueIcon name="ri-linkedin-fill"
      /></a>
    </div>
  </div>
</template>
