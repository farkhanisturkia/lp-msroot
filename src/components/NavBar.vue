<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ThemeToggle from './ThemeToggle.vue';

const route = useRoute();
const router = useRouter();
const open = ref(false);

const scrollTo = async (id: string) => {
  open.value = false;
  if (route.name !== 'home') {
    await router.push('/');
    await nextTick();
    await new Promise((r) => setTimeout(r, 150));
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const links = [
  { label: 'Home', target: 'hero-section' },
  { label: 'Our Professional', target: 'our-professional-section' },
  { label: 'Product & Skill', target: 'product-section' },
  { label: 'Find Us', target: 'find-us-section' },
];
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b border-tosca-100 dark:border-neon-500/20 bg-white/85 dark:bg-carbon-950/85 backdrop-blur-md dark:shadow-[0_16px_40px_-24px_rgb(255_52_72/0.8)]">
    <div class="container mx-auto flex h-16 items-center justify-between px-4">
      <a href="#" class="flex items-center gap-2.5" @click.prevent="scrollTo('hero-section')">
        <img src="/logo-black.png" alt="MsRoot logo" class="dark:hidden h-8 w-8 object-contain" />
        <img src="/logo-white.png" alt="MsRoot logo" class="hidden dark:flex h-8 w-8 object-contain" />
        <span class="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
          MsRoot<span class="text-tosca-600 dark:text-neon-400">.ID</span>
        </span>
      </a>

      <nav class="hidden md:flex items-center gap-8">
        <a
          v-for="link in links"
          :key="link.label"
          class="cursor-pointer text-sm font-semibold text-slate-600 dark:text-white transition-colors hover:text-tosca-600 dark:hover:text-neon-400"
          @click="scrollTo(link.target)"
        >
          {{ link.label }}
        </a>
        <div class="flex items-center gap-3">
          <a
            class="cursor-pointer rounded-full bg-tosca-500 dark:bg-neon-600 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-tosca-500/30 dark:shadow-neon-sm transition hover:bg-tosca-600 dark:hover:bg-neon-500"
            @click="scrollTo('find-us-section')"
          >
            Find us
          </a>
          <ThemeToggle />
        </div>
      </nav>

      <button
        class="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 dark:text-white transition hover:bg-tosca-50 dark:hover:bg-white/8 md:hidden"
        aria-label="Toggle menu"
        @click="open = !open"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path v-if="!open" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
          <path v-else stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>

    <div v-if="open" class="md:hidden border-t border-tosca-100 dark:border-neon-500/20 bg-white dark:bg-carbon-950/95 px-4 py-3">
      <a
        v-for="link in links"
        :key="link.label"
        class="block cursor-pointer rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 dark:text-white transition hover:bg-tosca-50 hover:text-tosca-700 dark:hover:bg-white/8 dark:hover:text-neon-300"
        @click="scrollTo(link.target)"
      >
        {{ link.label }}
      </a>
      <a
        class="mt-1 block cursor-pointer rounded-lg bg-tosca-500 dark:bg-neon-600 px-3 py-2.5 text-center text-sm font-semibold text-white shadow-sm shadow-tosca-500/30 dark:shadow-neon-sm transition hover:bg-tosca-600 dark:hover:bg-neon-500"
        @click="scrollTo('find-us-section')"
      >
        Find us
      </a>
      <div class="mt-3 px-3">
        <!-- <span class="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-white/50">
          Theme
        </span> -->
        <ThemeToggle variant="segmented" />
      </div>
    </div>
  </header>
</template>
