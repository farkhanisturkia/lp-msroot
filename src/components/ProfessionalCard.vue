<script setup lang="ts">
import type { Professional } from '../data/professionals';

defineProps<{ professional: Professional }>();
</script>

<template>
  <div class="group relative h-full">
    <div
      class="absolute -inset-0.5 rounded-3xl bg-linear-to-r from-tosca-400 to-cyan-400 opacity-25 blur transition duration-700 group-hover:opacity-60 dark:from-neon-600 dark:to-neon-400 dark:opacity-40"
    ></div>
    <div
      class="relative flex h-full flex-col items-center rounded-3xl border border-tosca-100 bg-white p-8 text-center shadow-2xl shadow-tosca-500/10 dark:border-white/8 dark:bg-carbon-800 dark:shadow-neon-sm"
    >
      <div
        class="relative z-10 mb-6 h-32 w-32 overflow-hidden rounded-full border-4 border-tosca-500 shadow-lg dark:border-neon-500 dark:shadow-neon md:h-36 md:w-36"
      >
        <img :src="professional.photo" :alt="professional.name" class="h-full w-full object-cover" />
      </div>

      <h3 class="z-10 mb-1 text-xl font-bold text-slate-900 dark:text-white md:text-2xl">
        {{ professional.name }}
      </h3>
      <p class="z-10 mb-1 text-sm font-bold uppercase tracking-wide text-tosca-600 dark:text-neon-400">
        {{ professional.role }}
      </p>
      <p class="z-10 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-white/40">
        {{ professional.focus }}
      </p>
      <p class="z-10 mb-6 px-2 text-sm leading-relaxed text-slate-500 dark:text-gray-400">
        {{ professional.bio }}
      </p>

      <div class="z-10 mt-auto flex w-full flex-col items-center gap-4 pt-2">
        <a
          v-if="professional.cv"
          :href="professional.cv"
          download
          class="inline-flex w-full max-w-56 items-center justify-center gap-2 rounded-full bg-tosca-500 px-6 py-3 text-sm font-bold text-white shadow-md shadow-tosca-500/30 transition duration-300 hover:bg-tosca-600 hover:shadow-lg hover:shadow-tosca-500/40 dark:bg-neon-600 dark:shadow-neon-sm dark:hover:bg-neon-500"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download CV
        </a>

        <div class="flex gap-3">
          <a
            v-for="social in professional.socials"
            :key="social.name"
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-full bg-tosca-50 p-2.5 text-tosca-700 ring-1 ring-tosca-100 transition hover:bg-tosca-500 hover:text-white dark:bg-white/6 dark:text-neon-300 dark:ring-white/10 dark:hover:bg-neon-600 dark:hover:text-white dark:hover:shadow-neon-sm"
          >
            <span class="sr-only">{{ social.name }}</span>
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path :d="social.path" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
