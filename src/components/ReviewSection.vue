<script setup lang="ts">
import { reviewsTop, reviewsBottom } from '../data/reviews';

const rowTopDuration = 50;
const rowBottomDuration = 55;
</script>

<template>
  <section
    id="review-section"
    class="relative z-10 scroll-mt-20 overflow-hidden bg-white py-16 dark:bg-carbon-950 md:py-24"
  >
    <div class="pointer-events-none absolute left-1/2 top-0 h-px w-full max-w-5xl -translate-x-1/2 bg-linear-to-r from-transparent via-tosca-200 dark:via-neon-500/40 to-transparent"></div>

    <div class="container relative mx-auto px-4">
      <div class="mx-auto max-w-2xl text-center">
        <span class="text-sm font-bold uppercase tracking-widest text-tosca-600 dark:text-neon-400">Reviews</span>
        <h2 class="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
          What They Say About Us.
        </h2>
      </div>
    </div>

    <!-- Dua baris carousel: atas kanan->kiri, bawah kiri->kanan -->
    <div class="relative mt-10 space-y-4 md:mt-14 md:space-y-5">
      <!-- fade pinggir -->
      <div class="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-white to-transparent dark:from-carbon-950 md:w-28"></div>
      <div class="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-white to-transparent dark:from-carbon-950 md:w-28"></div>

      <!-- Baris atas: kanan ke kiri -->
      <div class="review-marquee">
        <div class="review-track review-track--rtl" :style="{ animationDuration: `${rowTopDuration}s` }">
          <template v-for="copy in 2" :key="`top-${copy}`">
            <div
              v-for="(review, index) in reviewsTop"
              :key="`top-${copy}-${index}`"
              class="w-[78vw] shrink-0 px-2 sm:w-80 md:w-96 md:px-3"
              :aria-hidden="copy === 2 ? 'true' : undefined"
            >
              <figure class="flex aspect-3/1 flex-col justify-between overflow-hidden rounded-2xl border border-tosca-100 bg-tosca-50/60 p-4 shadow-sm dark:border-white/8 dark:bg-carbon-800">
                <blockquote class="line-clamp-3 text-sm leading-snug text-slate-600 dark:text-gray-400">
                  "{{ review.comment }}"
                </blockquote>
                <figcaption class="mt-2 flex items-baseline gap-2 truncate">
                  <span class="truncate text-sm font-bold text-slate-900 dark:text-white">{{ review.name }}</span>
                  <span class="truncate text-xs font-medium text-tosca-600 dark:text-neon-400">{{ review.title }}</span>
                </figcaption>
              </figure>
            </div>
          </template>
        </div>
      </div>

      <!-- Baris bawah: kiri ke kanan -->
      <div class="review-marquee">
        <div class="review-track review-track--ltr" :style="{ animationDuration: `${rowBottomDuration}s` }">
          <template v-for="copy in 2" :key="`bottom-${copy}`">
            <div
              v-for="(review, index) in reviewsBottom"
              :key="`bottom-${copy}-${index}`"
              class="w-[78vw] shrink-0 px-2 sm:w-80 md:w-96 md:px-3"
              :aria-hidden="copy === 2 ? 'true' : undefined"
            >
              <figure class="flex aspect-3/1 flex-col justify-between overflow-hidden rounded-2xl border border-tosca-100 bg-white p-4 shadow-sm dark:border-white/8 dark:bg-carbon-800">
                <blockquote class="line-clamp-3 text-sm leading-snug text-slate-600 dark:text-gray-400">
                  "{{ review.comment }}"
                </blockquote>
                <figcaption class="mt-2 flex items-baseline gap-2 truncate">
                  <span class="truncate text-sm font-bold text-slate-900 dark:text-white">{{ review.name }}</span>
                  <span class="truncate text-xs font-medium text-tosca-600 dark:text-neon-400">{{ review.title }}</span>
                </figcaption>
              </figure>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.review-track {
  display: flex;
  width: max-content;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

/* Baris atas: kanan -> kiri */
.review-track--rtl {
  animation-name: review-rtl;
}

/* Baris bawah: kiri -> kanan */
.review-track--ltr {
  animation-name: review-ltr;
}

.review-marquee:hover .review-track {
  animation-play-state: paused;
}

@keyframes review-rtl {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes review-ltr {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .review-track {
    animation: none;
  }
}
</style>
