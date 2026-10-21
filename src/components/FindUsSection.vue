<script setup lang="ts">
const contacts = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/msroot.id',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/micro-systems-root',
  },
  {
    name: 'Gmail',
    href: 'mailto:msroot.id@gmail.com',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/6287720039818?text=Hi%20MsRoot',
  },
];
</script>

<template>
  <section
    id="find-us-section"
    class="relative z-10 scroll-mt-20 overflow-hidden bg-tosca-50/40 dark:bg-linear-to-b dark:from-carbon-900 dark:to-carbon-950 py-16 md:py-24"
  >
    <div class="pointer-events-none absolute left-1/2 top-0 h-px w-full max-w-5xl -translate-x-1/2 bg-linear-to-r from-transparent via-tosca-200 dark:via-neon-500/40 to-transparent"></div>

    <div class="container relative mx-auto px-4">
      <div class="mx-auto max-w-2xl text-center">
        <span class="text-sm font-bold uppercase tracking-widest text-tosca-600 dark:text-neon-400">Find us</span>
        <h2 class="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
          Let's Connect with MsRoot.
        </h2>

        <div class="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <a
            v-for="contact in contacts"
            :key="contact.name"
            :href="contact.href"
            :title="contact.name"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex h-12 w-12 items-center justify-center rounded-full border border-tosca-200 bg-white text-tosca-600 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-tosca-500 hover:bg-tosca-500 hover:text-white hover:shadow-lg hover:shadow-tosca-500/30 dark:border-white/10 dark:bg-carbon-800 dark:text-neon-300 dark:hover:border-neon-600 dark:hover:bg-neon-600 dark:hover:text-white dark:hover:shadow-neon-sm md:h-14 md:w-14"
          >
            <span class="sr-only">{{ contact.name }}</span>

            <!-- Instagram -->
            <svg v-if="contact.name === 'Instagram'" class="h-5 w-5 md:h-6 md:w-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
              />
            </svg>
            <!-- LinkedIn -->
            <svg v-else-if="contact.name === 'LinkedIn'" class="h-5 w-5 md:h-6 md:w-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
              />
            </svg>
            <!-- Gmail -->
            <svg v-else-if="contact.name === 'Gmail'" class="h-5 w-5 md:h-6 md:w-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
              />
            </svg>
            <!-- WhatsApp -->
            <svg v-else viewBox="0 0 640 640" class="h-5 w-5 md:h-6 md:w-6" xmlns="http://www.w3.org/2000/svg">
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
        </div>
      </div>
    </div>
  </section>
</template>
