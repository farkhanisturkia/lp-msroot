<script setup lang="ts">
const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const links = [
  { label: 'Home', target: 'hero-section' },
  { label: 'Our Professional', target: 'our-professional-section' },
  { label: 'Product & Skill', target: 'product-section' },
  { label: 'Find us', target: 'find-us-section' },
];
</script>

<template>
  <footer class="relative z-10 bg-white dark:bg-carbon-950">
    <div class="container mx-auto px-4">
      <hr class="my-8 border-tosca-100 dark:border-white/8" />

      <div class="flex flex-col items-center gap-8 md:flex-row md:justify-between">
        <div class="flex items-center space-x-3">
          <img src="/logo-black.png" alt="MsRoot Logo" class="w-8 h-8 object-contain dark:hidden" />
          <img src="/logo-white.png" alt="MsRoot Logo" class="hidden dark:block w-8 h-8 object-contain" />
          <span class="text-xl font-bold tracking-wider text-slate-900 dark:text-white">MsRoot<span class="text-tosca-600 dark:text-neon-400">.ID</span></span>
        </div>

        <div class="flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-gray-400">
          <a
            v-for="link in links"
            :key="link.label"
            class="cursor-pointer transition-colors hover:text-tosca-600 dark:hover:text-neon-400"
            @click="scrollTo(link.target)"
          >
            {{ link.label }}
          </a>
        </div>

        <div class="hidden md:flex items-center justify-end w-1/9" />
      </div>

      <div class="text-center text-slate-400 dark:text-gray-500 text-sm mt-12 pb-4">
        <p>&copy; 2026 MsRoot.ID. All rights reserved. Built with passion and robust software architecture.</p>
      </div>
    </div>
  </footer>
</template>
