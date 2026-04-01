<script setup lang="ts">
import { onMounted, ref } from "vue";

const countdown = ref(3);
const redirecting = ref(false);

onMounted(() => {
  const interval = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(interval);
      redirecting.value = true;
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
  }, 1000);
});
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-8 pb-6 border-b border-border-light">
      <p class="text-xs font-semibold uppercase tracking-wider text-accent mb-2">30 Days of Development</p>
      <h1 class="text-2xl font-bold tracking-tight">Last Rescue Service</h1>
      <p class="text-sm text-text-muted mt-1">A grid-based survival command sim</p>
    </div>

    <!-- Thumbnail -->
    <div class="mb-8">
      <img
        src="/photos/gamethumb.png"
        alt="Last Rescue Service"
        class="w-full rounded border border-border-light"
      />
    </div>

    <!-- Plot -->
    <section class="mb-8 space-y-4 text-sm text-text-muted leading-relaxed">
      <p>It's been four months since the controls turned against us. Now every creature that roams the earth waits to kill us.</p>
      <p>Our towns are ruined. Our countries and great ambitions put to rest. Their anger is ruthless. Merciless murder and destruction was wrought upon us.</p>
      <p>The few of us who have managed to escape have struggled to find refuge. In places few and far in between, we have scraped together what little we have left.</p>
      <p>How far did we go to be the masters of this planet? Even now, they wait to prey on us. To kill us, and complete their revenge. There is no fair battle. No level playing field.</p>
      <p>There is little else left to do here. But the thought that some of us are still out there lingers. People lost in the wreckage alone, separated from their final union.</p>
      <p>Here lies our last mission. Our final purpose. We can still bring them here, to a moment's peace. A second of life, before the lights go out for good.</p>
    </section>

    <!-- Game Description -->
    <section class="mb-8 pb-8 border-b border-border-light">
      <h2 class="text-xs font-semibold uppercase tracking-wider text-accent mb-3">About the Game</h2>
      <p class="text-sm text-text-muted leading-relaxed">
        Grid based game where you guide 'survivors' to safety based on your team resources and a unique "radio command management sim" where you give advice to the survivor with a live view of their map on specific incidents that will require agent and resource management, alongside balancing the politics of competing factions and settlements in the midst of an apocalypse.
      </p>
    </section>

    <!-- Letter -->
    <section class="mb-8 pb-8 border-b border-border-light">
      <div class="text-sm text-text-muted leading-relaxed italic space-y-3">
        <p>Director,</p>
        <p>I hope this message finds you well.</p>
        <p>I do not know where we would be without your tireless work in the face of this crisis since it all began two months ago. Your work on the council has been immeasurable, and you have my unending thanks for your efforts.</p>
        <p>I hope you can appreciate, then, that my skepticism in this program comes from a place of respect. I don't believe we are in a position to dedicate resources and men to a cause that doesn't focus on ensuring our safety and continued survival as the first and foremost priority.</p>
        <p>We surely do not have enough guns, ammunition, food, and supplies as it is. How can we justify gathering more mouths to feed and house? How can we justify the risk of losing men and women for a cause that doesn't serve the goal of keeping us alive?</p>
        <p>But these are my personal doubts. It is true that things seem to have quieted down enough that we can start breathing a little more. If it is true that there is salvation out there, we certainly cannot afford to think so cautiously forever.</p>
        <p>The council agreed to delegate the old communications tower to you.</p>
      </div>
    </section>

    <!-- Demo Link -->
    <section class="text-center py-6">
      <p class="text-sm text-text-muted mb-2" v-if="!redirecting">
        Loading demo in <strong>{{ countdown }}</strong>...
      </p>
      <p class="text-sm text-text-muted" v-else>Redirecting to demo...</p>
    </section>
  </div>
</template>
