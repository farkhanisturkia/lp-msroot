<script setup lang="ts">
import CornerLines from './CornerLines.vue';

const scrollToProducts = () => {
  const productSection = document.getElementById('product-section');
  if (productSection) {
    productSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const scrollToFindUs = () => {
  const findUsSection = document.getElementById('find-us-section');
  if (findUsSection) {
    findUsSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const features = [
  {
    title: 'Fast Performance',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    title: 'Secure Security',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    title: 'AI-powered',
    icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z',
  },
];
</script>

<template>
  <section id="hero-section" class="relative z-10 min-h-[150vh] md:min-h-[190vh] scroll-mt-20 overflow-hidden">
    <!-- aksen gradasi tosca halus -->
    <div class="pointer-events-none absolute -right-40 -top-40 h-128 w-lg rounded-full bg-tosca-100/60 dark:bg-neon-500/10 blur-3xl"></div>
    <div class="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-tosca-50 dark:bg-neon-500/10 blur-3xl"></div>

    <!-- garis lurus + kotak di pojokan: tosca di light, neon merah glow di dark -->
    <CornerLines
      :seed="7"
      class="text-tosca-500/25 dark:text-neon-500/30 dark:drop-shadow-[0_0_6px_rgb(255_52_72/0.35)]"
    />

    <div class="container relative mx-auto px-4">
      <div class="flex flex-col h-svh items-center md:flex-row md:justify-between">
        <div class="w-full pt-12 pb-24 md:w-1/2 md:pt-28 md:pb-32">
          <span
            class="inline-flex items-center gap-2 rounded-full border border-tosca-200 bg-tosca-50 dark:border-neon-500/40 dark:bg-neon-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-tosca-700 dark:text-neon-300"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-tosca-500 dark:bg-neon-400 dark:shadow-[0_0_8px_rgb(255_52_72/0.8)]"></span>
            MsRoot.ID
          </span>

          <h1 class="mt-6 leading-[1.05] tracking-tight text-slate-900 dark:text-white">
            <span class="block text-4xl font-extrabold sm:text-5xl lg:text-6xl">
              Innovate.<br />
              Automate.<br />
              Elevate.
            </span>
          </h1>

          <p class="mt-6 max-w-lg text-lg leading-relaxed text-slate-500 dark:text-gray-400">
            We deliver innovative websites, custom software, and reliable IT solutions.
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button
              @click="scrollToFindUs"
              class="rounded-full bg-tosca-500 dark:bg-neon-600 px-8 py-3.5 text-center font-semibold text-white shadow-lg shadow-tosca-500/25 dark:shadow-neon transition duration-300 hover:bg-tosca-600 dark:hover:bg-neon-500"
            >
              Find us
            </button>
            <button
              @click="scrollToProducts"
              class="rounded-full border-2 border-tosca-200 dark:border-neon-500/50 px-8 py-3.5 text-center font-semibold text-tosca-700 dark:text-neon-300 transition duration-300 hover:border-tosca-500 hover:bg-tosca-50 dark:hover:border-neon-400 dark:hover:bg-neon-500/10"
            >
              Our products
            </button>
          </div>

          <ul class="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            <li v-for="feature in features" :key="feature.title" class="flex items-center gap-2.5">
              <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-tosca-50 ring-1 ring-tosca-100 dark:bg-neon-500/10 dark:ring-neon-500/30">
                <svg class="h-5 w-5 text-tosca-600 dark:text-neon-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" :d="feature.icon"></path>
                </svg>
              </span>
              <span class="text-sm font-semibold text-slate-600 dark:text-gray-300">{{ feature.title }}</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </section>
</template>
