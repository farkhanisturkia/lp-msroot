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
  <div class="min-h-screen bg-white text-slate-900 py-12 lg:py-20">
    <div class="container mx-auto px-4">
      <button 
        @click="backToProduct" 
        class="inline-flex items-center gap-1 text-tosca-600 hover:text-tosca-700 mb-8 md:mb-12 font-semibold text-sm md:text-base cursor-pointer"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        back
      </button>
      <div class="mb-10 text-center md:text-left">
        <h1 class="text-3xl md:text-5xl font-bold text-slate-900 mb-3">JavaScript & TypeScript Projects</h1>
        <p class="text-slate-600 text-sm md:text-base max-w-2xl">
          Here is a list of applications and web systems built using the JavaScript and TypeScript ecosystem.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div v-for="(project, index) in projects" :key="index" class="group relative h-full">
          <div class="absolute -inset-0.5 bg-linear-to-r from-tosca-400 to-cyan-400 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
          <div class="relative bg-white border border-tosca-200/80 p-6 md:p-8 rounded-2xl h-full flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-tosca-500/10 transition duration-500">
            <div>
              <h3 class="text-xl md:text-2xl font-bold text-slate-900 mb-3">{{ project.title }}</h3>
              <p class="text-slate-500 text-sm md:text-base mb-4 leading-relaxed">
                {{ project.description }}
              </p>
            </div>
            <div class="flex flex-col sm:flex-row items-end sm:items-center justify-between border-t border-tosca-100 gap-4">
              <div class="flex flex-wrap gap-2 mt-4 max-w-full sm:max-w-[70%]">
                <span 
                  v-for="(value, idx) in project.tech" 
                  :key="idx" 
                  class="text-xs bg-tosca-100 text-tosca-700 font-medium px-3 py-1 rounded-full border border-tosca-200"
                >
                  {{ value }}
                </span>
              </div>
              <a :href="project.link" target="_blank" rel="noopener noreferrer" class="text-sm font-semibold text-tosca-600 hover:text-tosca-700 inline-flex items-center gap-1 shrink-0">
                Demo app
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
