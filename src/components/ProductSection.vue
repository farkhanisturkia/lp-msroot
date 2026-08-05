<script setup lang="ts">
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const products = [
  {
    title: 'PHP Laravel Ecosystem',
    badge: 'PHP',
    link: '/php-laravel',
    desc: 'Robust enterprise web applications built with Laravel. Feature-rich architectures including custom ERPs, CMS, RESTful APIs, and background job queues.',
    tags: ['Laravel Framework', 'REST API', 'Queue Jobs', 'MySQL']
  },
  {
    title: 'Modern Web Applications',
    badge: 'JS/TS',
    link: '/js-ts',
    desc: 'Dynamic Single Page Applications (SPA) engineered with Vue 3, TypeScript, and Tailwind CSS. Focused on responsiveness, speed, and smooth UI/UX.',
    tags: ['Vue 3', 'Javascript', 'TypeScript', 'Tailwind CSS', 'Vite']
  },
  {
    title: 'High-Performance Backend',
    badge: 'Go',
    link: '/golang',
    desc: 'Ultra-fast backend services and microservices built using Go (Golang). Optimized for high concurrency, micro-latency, and containerized deployment.',
    tags: ['Golang', 'Microservices', 'REST API', 'gRPC', 'Docker', 'PostgreSQL', 'Sqlite']
  }
];
</script>

<template>
  <section 
    id="product-section" 
    class="min-h-screen w-full md:snap-start flex flex-col justify-between bg-stone-50 text-stone-800 py-12"
  >
    <div class="container mx-auto px-6 lg:px-12 my-auto max-w-7xl">
      
      <!-- Section Title -->
      <div class="mb-14 text-center max-w-3xl mx-auto space-y-3">
        <span class="text-xs uppercase tracking-widest text-amber-800 font-bold">Services & Products</span>
        <h2 class="text-4xl sm:text-5xl font-serif font-bold text-stone-900">Specialized Engineering Solutions</h2>
        <p class="text-stone-600 text-lg">High-quality development services tailored for modern business requirements.</p>
      </div>

      <!-- Card Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-12">
        <div 
          v-for="item in products" 
          :key="item.title"
          class="bg-white border border-stone-200 hover:border-amber-800/50 rounded-3xl p-8 lg:p-10 transition duration-300 shadow-xs hover:shadow-md flex flex-col justify-between group"
        >
          <div>
            <!-- Badge Header -->
            <div class="flex items-center justify-between mb-8">
              <div class="w-14 h-14 bg-amber-50/80 rounded-2xl flex items-center justify-center text-amber-900 font-bold border border-amber-200/60 shadow-2xs shrink-0">
                <span :class="item.badge.length > 3 ? 'text-xs tracking-tight' : 'text-sm'">
                  {{ item.badge }}
                </span>
              </div>
              <router-link 
                :to="item.link" 
                class="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition"
              >
                <span>View Details</span>
                <svg class="w-4 h-4 transform group-hover:translate-x-1 transition" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </router-link>
            </div>

            <router-link :to="item.link" class="block">
              <h3 class="text-2xl font-serif font-bold text-stone-900 mb-4 group-hover:text-amber-900 transition">
                {{ item.title }}
              </h3>
            </router-link>
            
            <p class="text-stone-600 leading-relaxed mb-8 text-base">
              {{ item.desc }}
            </p>
          </div>

          <div class="space-y-6 pt-6 border-t border-stone-100">
            <!-- Tags -->
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tag in item.tags" 
                :key="tag" 
                class="px-3 py-1 bg-stone-100 text-stone-700 text-xs font-semibold rounded-md border border-stone-200/50"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Action Button Link -->
            <router-link 
              :to="item.link" 
              class="w-full inline-flex items-center justify-center gap-2 bg-stone-50 hover:bg-amber-900 text-stone-700 hover:text-white border border-stone-200/80 hover:border-amber-900 py-3 px-5 rounded-xl font-medium text-sm transition duration-300 shadow-2xs"
            >
              <span>Explore {{ item.title }}</span>
            </router-link>
          </div>
        </div>
      </div>

    </div>

    <!-- Footer Area -->
    <div class="container mx-auto px-6 lg:px-12 max-w-7xl">
      <hr class="border-stone-200/80 mb-8">
      
      <div class="flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex items-center space-x-3">
          <span class="text-2xl font-serif font-bold text-stone-900">MsRoot<span class="text-amber-800">.ID</span></span>
        </div>
        
        <div class="flex flex-wrap justify-center gap-8 text-sm text-stone-600 font-medium">
          <a @click="scrollToSection('hero-section')" class="cursor-pointer hover:text-amber-800 transition">Home</a>
          <a @click="scrollToSection('profile-section')" class="cursor-pointer hover:text-amber-800 transition">About</a>
          <a @click="scrollToSection('product-section')" class="cursor-pointer hover:text-amber-800 transition">Products</a>
        </div>

        <p class="text-xs text-stone-400">
          © 2021 - {{ currentYear }} MsRoot.ID. All rights reserved.
        </p>
      </div>
    </div>
  </section>
</template>