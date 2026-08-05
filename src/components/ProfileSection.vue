<script setup lang="ts">
import farkhanImage from '../assets/farkhan.jpeg';

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/farkhanisturkia' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/abdurrohman-farkhan-syamaidzar-s-kom-26b1701b7/' },
  { name: 'WhatsApp', url: 'https://wa.me/6287720039818?text=Hi%20Farkhan,%20I%20got%20your%20number%20from%20msroot.id' },
  { name: 'Website', url: 'https://msroot.my.id' }
];

const techStack = ['Golang', 'JavaScript', 'TypeScript', 'Laravel', 'Vite', 'Vue.js', 'Docker', 'REST API', 'gRPC', 'MySQL', 'PostgreSql', 'Sqlite'];

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};
</script>

<template>
  <section 
    id="profile-section" 
    class="min-h-screen w-full md:snap-start flex flex-col justify-between bg-stone-100/70 text-stone-800 border-y border-stone-200/80 relative overflow-hidden py-12"
  >
    <div class="container mx-auto px-6 lg:px-12 my-auto max-w-7xl">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        <div class="lg:col-span-7 space-y-8">
          <span class="text-xs uppercase tracking-widest text-amber-800 font-bold">About Developer</span>
          
          <h2 class="text-4xl sm:text-5xl lg:text-6xl font-serif text-stone-900 leading-tight">
            Building Solutions with Purpose and Passion.
          </h2>
          
          <p class="text-lg lg:text-xl text-stone-600 leading-relaxed">
            Hello! My name is Farkhan. As a software developer, I focus on building sustainable, scalable web applications using modern technologies such as Go, TypeScript, and Laravel.
          </p>

          <div class="grid grid-cols-2 gap-8 pt-4 border-t border-stone-200">
            <div>
              <p class="text-xs uppercase tracking-wider text-stone-400 font-bold">Role</p>
              <p class="text-stone-900 font-serif font-bold text-xl mt-1">Software Developer</p>
            </div>
            <div>
              <p class="text-xs uppercase tracking-wider text-stone-400 font-bold">Specialization</p>
              <p class="text-stone-900 font-serif font-bold text-xl mt-1">Backend</p>
            </div>
          </div>

          <div>
            <p class="text-xs uppercase tracking-wider text-stone-400 font-bold mb-3">Primary Tech Stack</p>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tech in techStack" 
                :key="tech"
                class="px-3.5 py-1.5 bg-white border border-stone-200/80 text-stone-700 text-xs font-semibold rounded-lg shadow-2xs"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <div class="pt-2">
            <a 
              href="/cv-farkhan.pdf" 
              download="CV_Abdurrohman_Farkhan.pdf"
              class="inline-flex items-center gap-3 bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium px-8 py-4 rounded-xl transition duration-300 shadow-md text-base"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              <span>Download CV</span>
            </a>
          </div>
        </div>

        <div class="lg:col-span-5 flex justify-center">
          <div class="w-full bg-white border border-stone-200/90 rounded-3xl p-8 lg:p-10 shadow-sm text-center">
            <div class="w-40 h-40 mx-auto rounded-full overflow-hidden mb-6 border-4 border-stone-100 shadow-md">
              <img 
                :src="farkhanImage" 
                alt="Abdurrohman Farkhan Syamaidzar" 
                class="w-full h-full object-cover"
              />
            </div>
            
            <h3 class="text-2xl lg:text-3xl font-serif font-bold text-stone-900">Abdurrohman Farkhan S.</h3>
            <p class="text-xs text-amber-800 font-bold uppercase tracking-widest mt-1 mb-4">Software Developer</p>
            
            <p class="text-stone-600 leading-relaxed mb-8 text-sm lg:text-base">
              Writing clean, efficient code to solve complex problems and deliver meaningful digital experiences.
            </p>

            <div class="grid grid-cols-2 gap-3 pt-6 border-t border-stone-100">
              <a 
                v-for="link in socialLinks" 
                :key="link.name"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-xs font-semibold text-stone-700 hover:text-amber-800 bg-stone-50 hover:bg-amber-100/60 border border-stone-200/60 py-2.5 rounded-xl transition duration-200"
              >
                {{ link.name }}
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="hidden md:block text-center relative z-10 animate-bounce cursor-pointer opacity-70 hover:opacity-100" @click="scrollToSection('product-section')">
      <svg class="w-5 h-5 mx-auto text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>
</template>