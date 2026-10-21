<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { professionals } from '../data/professionals';
import ProfessionalCard from './ProfessionalCard.vue';

/**
 * Carousel berjalan otomatis saat jumlah anggota melebihi batas:
 * - Mobile : looping jika anggota > 1
 * - Desktop: looping jika anggota > 4
 * Selain itu kartu ditampilkan diam di tengah.
 */
const isMobile = ref(false);
let mediaQuery: MediaQueryList | null = null;

const updateViewport = (mq: MediaQueryList | MediaQueryListEvent) => {
  isMobile.value = mq.matches;
};

onMounted(() => {
  mediaQuery = window.matchMedia('(max-width: 768px)');
  updateViewport(mediaQuery);
  mediaQuery.addEventListener('change', updateViewport);
});

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener('change', updateViewport);
});

const isMarquee = computed(() =>
  isMobile.value ? professionals.length > 1 : professionals.length > 4,
);

const marqueeDuration = computed(() => Math.max(professionals.length * 12, 30));
</script>

<template>
  <section
    id="our-professional-section"
    class="relative z-10 scroll-mt-20 overflow-hidden bg-white dark:bg-carbon-950 py-20 md:py-28"
  >
    <div class="pointer-events-none absolute left-1/2 top-0 h-px w-full max-w-5xl -translate-x-1/2 bg-linear-to-r from-transparent via-tosca-200 dark:via-neon-500/40 to-transparent"></div>

    <div class="container relative mx-auto px-4">
      <div class="mx-auto max-w-2xl text-center">
        <span class="text-sm font-bold uppercase tracking-widest text-tosca-600 dark:text-neon-400">Our Professional</span>
        <h2 class="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
          Meet the Team Behind MsRoot.
        </h2>
        <p class="mt-4 text-lg leading-relaxed text-slate-500 dark:text-gray-400">
          Skilled developers who turn ideas into reliable digital products.
        </p>
      </div>
    </div>

    <!-- Carousel berjalan (aktif otomatis saat jumlah anggota melebihi batas) -->
    <div v-if="isMarquee" class="op-marquee relative mt-12 w-full md:mt-16">
      <div class="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-white to-transparent dark:from-carbon-950 md:w-32"></div>
      <div class="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-white to-transparent dark:from-carbon-950 md:w-32"></div>

      <div
        class="op-track flex w-max items-stretch"
        :style="{ animationDuration: `${marqueeDuration}s` }"
      >
        <template v-for="copy in 2" :key="copy">
          <div
            v-for="(person, index) in professionals"
            :key="`${copy}-${index}`"
            class="w-[80vw] shrink-0 px-3 sm:w-88 md:w-[24rem] md:px-4"
            :aria-hidden="copy === 2 ? 'true' : undefined"
          >
            <ProfessionalCard :professional="person" />
          </div>
        </template>
      </div>
    </div>

    <!-- Mode diam, semua kartu ditampilkan berdampingan di tengah -->
    <div v-else class="mt-12 flex flex-wrap justify-center gap-6 px-4 md:mt-16">
      <div v-for="(person, index) in professionals" :key="index" class="w-full max-w-sm">
        <ProfessionalCard :professional="person" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.op-track {
  animation-name: op-scroll;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.op-marquee:hover .op-track {
  animation-play-state: paused;
}

@keyframes op-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .op-track {
    animation: none;
  }
}
</style>
