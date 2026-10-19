<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

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
  { label: 'About', target: 'profile-section' },
  { label: 'Product & Skill', target: 'product-section' },
];
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b border-tosca-100 bg-white/85 backdrop-blur-md">
    <div class="container mx-auto flex h-16 items-center justify-between px-4">
      <a href="#" class="flex items-center gap-2.5" @click.prevent="scrollTo('hero-section')">
        <img src="/logo-black.png" alt="MsRoot logo" class="h-8 w-8 object-contain" />
        <span class="text-lg font-extrabold tracking-tight text-slate-900">
          MsRoot<span class="text-tosca-600">.ID</span>
        </span>
      </a>

      <nav class="hidden items-center gap-8 md:flex">
        <a
          v-for="link in links"
          :key="link.target"
          class="cursor-pointer text-sm font-semibold text-slate-600 transition-colors hover:text-tosca-600"
          @click="scrollTo(link.target)"
        >
          {{ link.label }}
        </a>
        <a
          class="cursor-pointer rounded-full bg-tosca-500 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-tosca-500/30 transition hover:bg-tosca-600"
          @click="scrollTo('profile-section')"
        >
          Contact us
        </a>
      </nav>

      <button
        class="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-tosca-50 md:hidden"
        aria-label="Toggle menu"
        @click="open = !open"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path v-if="!open" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
          <path v-else stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>

    <div v-if="open" class="border-t border-tosca-100 bg-white px-4 py-3 md:hidden">
      <a
        v-for="link in links"
        :key="link.target"
        class="block cursor-pointer rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-tosca-50 hover:text-tosca-700"
        @click="scrollTo(link.target)"
      >
        {{ link.label }}
      </a>
      <a
        class="mt-1 block cursor-pointer rounded-lg bg-tosca-500 px-3 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-tosca-600"
        @click="scrollTo('profile-section')"
      >
        Contact us
      </a>
    </div>
  </header>
</template>
