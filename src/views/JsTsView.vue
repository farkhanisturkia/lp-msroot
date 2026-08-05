<script setup lang="ts">
import { useRouter } from 'vue-router'

const projects = [
  {
    title: 'MsRoot.ID Landing Page',
    description: 'Under MsRoot.ID, MsRoot.ID is a service platform that provides custom website development to meet clients business needs.',
    tech: ['Vite', 'TypeScript', 'Vue 3', 'Tailwind CSS'],
    link: 'https://msroot.my.id'
  },
  {
    title: 'HR Management',
    description: 'Under MsRoot.ID, HR Management is a comprehensive human resource management system featuring integrated face recognition for secure attendance, streamlined employee tracking, and robust performance management.',
    tech: ['Vue.js', 'Inertia.js', 'Tailwind CSS', 'Laravel', 'Face Recognition', 'Python', 'Docker', 'MySQL'],
    link: 'https://hrm.msroot.my.id'
  },
  {
    title: 'MS News',
    description: 'Under MsRoot.ID, MS News is a modern, minimalist news aggregator and portal platform built for high-performance content delivery.',
    tech: ['Vite', 'Vue.js', 'Tailwind CSS', 'Docker', 'Nginx', 'Golang', 'Gin', 'MySQL'],
    link: 'https://news.msroot.my.id'
  }
]

const router = useRouter()

const backToProduct = async () => {
  await router.push('/')
  
  setTimeout(() => {
    const section = document.getElementById('product-section')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }, 100)
}
</script>

<template>
  <div class="min-h-screen bg-stone-50 text-stone-800 py-12 lg:py-20 font-sans">
    <div class="container mx-auto px-6 lg:px-12 max-w-7xl">

      <button 
        @click="backToProduct" 
        class="inline-flex items-center text-amber-800 hover:text-amber-900 mb-8 md:mb-12 font-medium text-sm md:text-base cursor-pointer group transition duration-200"
      >
        <svg class="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to Products
      </button>

      <div class="mb-12 text-left space-y-3">
        <span class="text-xs uppercase tracking-widest text-amber-800 font-bold">Category Showcase</span>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 leading-tight">
          JavaScript & TypeScript Projects
        </h1>
        <p class="text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed">
          Here is a collection of modern web applications, interactive dashboards, and client-side solutions built with JS/TS frameworks.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        <div 
          v-for="(project, index) in projects" 
          :key="index" 
          class="bg-white border border-stone-200 hover:border-amber-800/50 rounded-3xl p-8 lg:p-10 transition duration-300 shadow-xs hover:shadow-md flex flex-col justify-between group"
        >
          <div>
            <div class="flex items-center justify-between mb-6">
              <span class="px-3.5 py-1 bg-amber-50 text-amber-900 border border-amber-200/60 rounded-full text-xs font-bold tracking-wide">
                JS / TS / Vue
              </span>
              
              <a 
                :href="project.link" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="text-xs font-bold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition"
              >
                <span>Live Demo</span>
                <svg class="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            </div>

            <h3 class="text-2xl font-serif font-bold text-stone-900 mb-4 group-hover:text-amber-900 transition">
              {{ project.title }}
            </h3>
            
            <p class="text-stone-600 text-base leading-relaxed mb-8">
              {{ project.description }}
            </p>
          </div>

          <div class="space-y-6 pt-6 border-t border-stone-100">
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="(value, idx) in project.tech" 
                :key="idx" 
                class="px-3 py-1 bg-stone-100 text-stone-700 text-xs font-semibold rounded-md border border-stone-200/50"
              >
                {{ value }}
              </span>
            </div>

            <a 
              :href="project.link" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="w-full inline-flex items-center justify-center gap-2 bg-stone-50 hover:bg-amber-900 text-stone-700 hover:text-white border border-stone-200/80 hover:border-amber-900 py-3 px-5 rounded-xl font-medium text-sm transition duration-300 shadow-2xs"
            >
              <span>Visit Demo App</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div> 

        </div>
      </div>

    </div>
  </div>
</template>