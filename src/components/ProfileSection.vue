<script setup lang="ts">
import farkhanImage from '../assets/farkhan.jpeg';

const stats = [
  { label: 'Job', value: 'Software Developer' },
  { label: 'Focus', value: 'Backend Web Developer' },
];

const socials = [
  {
    name: 'GitHub',
    href: 'https://github.com/farkhanisturkia',
    path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.467-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abdurrohman-farkhan-syamaidzar-s-kom-26b1701b7/',
    path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
  },
];
</script>

<template>
  <section id="profile-section" class="relative z-10 scroll-mt-20 overflow-hidden bg-white dark:bg-linear-to-b dark:from-carbon-900 dark:to-carbon-950 py-20 md:py-28">
    <div class="pointer-events-none absolute left-1/2 top-0 h-px w-full max-w-5xl -translate-x-1/2 bg-gradient-to-r from-transparent via-tosca-200 dark:via-neon-500/40 to-transparent dark:from-transparent dark:to-transparent"></div>


    <div class="container relative mx-auto px-4">
      <div class="flex flex-col items-center justify-between gap-12 md:flex-row">
        <div class="w-full md:w-1/2">
          <span class="text-sm font-bold uppercase tracking-widest text-tosca-600 dark:text-neon-400">About me</span>
          <h2 class="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Building Solutions with Passion.
          </h2>
          <p class="mt-6 text-lg leading-relaxed text-slate-500 dark:text-gray-400">
            Hello! My name is Farkhan. As a software developer, I have a strong interest in web application
            development using modern technologies such as Go, TypeScript/JavaScript, and Laravel.
          </p>

          <div class="mt-8 grid grid-cols-2 gap-6">
            <div v-for="stat in stats" :key="stat.label" class="rounded-2xl border border-tosca-100 bg-tosca-50/60 dark:border-white/8 dark:bg-carbon-800 p-5">
              <h3 class="text-sm font-bold uppercase tracking-wider text-tosca-600 dark:text-neon-400">{{ stat.label }}</h3>
              <p class="mt-1.5 font-semibold text-slate-800 dark:text-gray-100">{{ stat.value }}</p>
            </div>
          </div>
        </div>

        <div class="relative z-10 flex w-full justify-center md:w-5/12">
          <div class="group relative w-full max-w-sm">
            <div
              class="absolute -inset-1 rounded-3xl bg-linear-to-r from-tosca-400 to-cyan-400 dark:from-neon-600 dark:to-neon-400 opacity-25 dark:opacity-40 blur transition duration-700 group-hover:opacity-70"
            ></div>
            <div
              class="relative flex flex-col items-center rounded-3xl border border-tosca-100 bg-white dark:border-white/8 dark:bg-carbon-800 p-8 text-center shadow-2xl shadow-tosca-500/10 dark:shadow-neon-sm"
            >
              <div
                class="relative z-10 mb-6 h-40 w-40 overflow-hidden rounded-full border-4 border-tosca-500 dark:border-neon-500 shadow-lg dark:shadow-neon"
              >
                <img
                  :src="farkhanImage"
                  alt="Abdurrohman Farkhan Syamaidzar"
                  class="h-full w-full object-cover"
                />
              </div>
              <h3 class="mb-2 text-2xl font-bold text-slate-900 dark:text-white">Abdurrohman Farkhan Syamaidzar</h3>
              <p class="mb-4 text-sm font-bold uppercase tracking-wide text-tosca-600 dark:text-neon-400">Software Developer</p>
              <p class="mb-6 px-4 text-sm leading-relaxed text-slate-500 dark:text-gray-400">
                Writing clean, efficient code to solve real-world problems and improve the effectiveness of digital
                services.
              </p>

              <div class="flex gap-3">
                <a
                  v-for="social in socials"
                  :key="social.name"
                  :href="social.href"
                  target="_blank"
                  class="relative z-10 rounded-full bg-tosca-50 p-2.5 text-tosca-700 ring-1 ring-tosca-100 transition hover:bg-tosca-500 hover:text-white dark:bg-white/6 dark:text-neon-300 dark:ring-white/10 dark:hover:bg-neon-600 dark:hover:text-white dark:hover:shadow-neon-sm"
                >
                  <span class="sr-only">{{ social.name }}</span>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path :d="social.path" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/6287720039818?text=Hi%20Farkhan,%20I%20got%20your%20number%20from%20msroot.id"
                  target="_blank"
                  class="relative z-10 rounded-full bg-tosca-50 p-2.5 text-tosca-700 ring-1 ring-tosca-100 transition hover:bg-tosca-500 hover:text-white dark:bg-white/6 dark:text-neon-300 dark:ring-white/10 dark:hover:bg-neon-600 dark:hover:text-white dark:hover:shadow-neon-sm"
                >
                  <span class="sr-only">WhatsApp</span>
                  <svg viewBox="0 0 640 640" class="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-width="30"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m 80,560 l 50,-100 a240,240 200 1,1 50,50 z"
                    />
                    <path
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="40"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m 220,180 l40,50 l-40,40 c 0,0 50,80 140,140 l40,-30 l50,40 c 0,0 -40,40 -100,20 c 0,0 -140,-80 -160,-160 c 0,0 -10,-40 10,-80 c 0,0 10,-20 20,-20 z"
                    />
                  </svg>
                </a>
                <a
                  href="https://msroot.my.id"
                  target="_blank"
                  class="relative z-10 rounded-full bg-tosca-50 p-2.5 text-tosca-700 ring-1 ring-tosca-100 transition hover:bg-tosca-500 hover:text-white dark:bg-white/6 dark:text-neon-300 dark:ring-white/10 dark:hover:bg-neon-600 dark:hover:text-white dark:hover:shadow-neon-sm"
                >
                  <span class="sr-only">Website</span>
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
