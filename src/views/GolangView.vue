<script setup lang="ts">
const projects = [
  {
    title: 'MS News',
    description: 'Under MsRoot.ID, Ms News is A modern, minimalist news aggregator and portal platform built for high-performance content delivery.',
    tech: ['Vite', 'Tailwind', 'Docker', 'Nginx', 'Golang', 'Gin', 'MySQL'],
    link: 'https://news.msroot.my.id'
  },
  {
    title: 'MS Chat',
    description: 'A responsive, real-time chat application featuring persistent room-based management and instant synchronization across devices.',
    tech: ['HTML5', 'CSS3', 'Golang', 'Gin', 'Gorilla WebSocket', 'SQLite'],
    link: 'https://chat.msroot.my.id'
  },
]

import { useRouter } from 'vue-router'

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
  <div class="min-h-screen bg-gray-900 text-white py-12 lg:py-24">
    <div class="container mx-auto px-4">
      <button 
        @click="backToProduct" 
        class="inline-flex items-center text-orange-500 hover:text-orange-400 mb-8 md:mb-12 font-medium text-sm md:text-base cursor-pointer"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        back
      </button>
      <div class="mb-10 text-center md:text-left">
        <h1 class="text-3xl md:text-5xl font-bold text-white mb-3">Golang Projects</h1>
        <p class="text-gray-400 text-sm md:text-base max-w-2xl">
          Here is a list of applications and web systems built using the Golang ecosystem.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div v-for="(project, index) in projects" :key="index" class="group relative h-full">
          <div class="absolute -inset-0.5 bg-linear-to-r from-orange-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
          <div class="relative bg-gray-800/50 backdrop-blur-xl border border-gray-700 p-6 md:p-8 rounded-2xl h-full flex flex-col justify-between">
            <div>
              <h3 class="text-xl md:text-2xl font-bold text-white mb-3">{{ project.title }}</h3>
              <p class="text-gray-400 text-sm md:text-base mb-4 leading-relaxed">
                {{ project.description }}
              </p>
            </div>
            <div class="flex flex-col sm:flex-row items-end sm:items-center justify-between border-t border-gray-800 gap-4">
              <div class="flex flex-wrap gap-2 mt-4 max-w-full sm:max-w-[70%]">
                <span 
                  v-for="(value, idx) in project.tech" 
                  :key="idx" 
                  class="text-xs bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full border border-purple-500/20"
                >
                  {{ value }}
                </span>
              </div>
              <a :href="project.link" target="_blank" rel="noopener noreferrer" class="text-sm font-semibold text-orange-500 hover:text-orange-400 inline-flex items-center gap-1 shrink-0">
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