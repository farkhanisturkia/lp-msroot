<script setup lang="ts">
import farkhanImage from '../assets/farkhan.jpeg';
</script>

<template>
  <section id="profile-section" class="py-20 bg-white text-black relative overflow-hidden">
    <div class="container mx-auto px-4 relative z-10">
      <div class="flex flex-col md:flex-row items-center justify-between gap-12">
        <div class="w-full md:w-1/2">
          <span class="text-orange-500 font-semibold uppercase tracking-wider text-sm">About me</span>
          <h2 class="text-4xl md:text-5xl font-bold mt-2 mb-6">Building Solutions with Passion.</h2>
          <p class="text-gray-600 text-lg mb-6 leading-relaxed">
            Hello! My name is Farkhan. As a software developer, I have a strong interest in web application development using modern technologies such as Go, TypeScript/JavaScript, and Laravel. 
          </p>
          <div class="grid grid-cols-2 gap-6 mt-8">
            <div>
              <h3 class="text-xl font-semibold text-orange-500">Job</h3>
              <p class="text-gray-700 mt-2">Software Developer</p>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-orange-500">Focus</h3>
              <p class="text-gray-700 mt-2">Backend Web Developer</p>
            </div>
          </div>
        </div>
        <div class="w-full md:w-5/12 flex justify-center relative z-10">
          <div class="relative group max-w-sm w-full">
            <div class="absolute -inset-1 bg-linear-to-r from-orange-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div class="relative bg-gray-800 border border-gray-700 p-8 rounded-2xl shadow-2xl flex flex-col items-center text-center">
              <div class="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-orange-500 shadow-lg relative z-10">
                <img :src="farkhanImage" 
                     alt="Abdurrohman Farkhan Syamaidzar" 
                     class="w-full h-full object-cover">
              </div>
              <h3 class="text-2xl font-bold text-white mb-2">Abdurrohman Farkhan Syamaidzar</h3>
              <p class="text-orange-500 text-sm font-medium tracking-wide uppercase mb-4">Software Developer</p>
              <p class="text-gray-400 text-sm px-4 mb-6">
                Writing clean, efficient code to solve real-world problems and improve the effectiveness of digital services.
              </p>
              <div class="flex space-x-4">
                <a href="https://github.com/farkhanisturkia" target="_blank" class="p-2 bg-gray-700 hover:bg-gray-500 text-white rounded-full transition-colors duration-300 relative z-10">
                  <span class="sr-only">GitHub</span>
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.467-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/abdurrohman-farkhan-syamaidzar-s-kom-26b1701b7/" target="_blank" class="p-2 bg-gray-700 hover:bg-blue-500 text-white rounded-full transition-colors duration-300 relative z-10">
                  <span class="sr-only">LinkedIn</span>
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a 
                  href="https://wa.me/6287720039818?text=Hi%20Farkhan,%20I%20got%20your%20number%20from%20msroot.id" 
                  class="p-2 bg-gray-700 hover:bg-green-500 text-white rounded-full transition-colors duration-300 relative z-10" 
                  target="_blank"
                >
                  <span class="sr-only">WhatsApp</span>
                  <svg viewBox="0 0 640 640" class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" stroke="currentColor" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" d="m 80,560 l 50,-100 a240,240 200 1,1 50,50 z"/>
                    <path fill="currentColor" stroke="currentColor" stroke-width="40" stroke-linecap="round" stroke-linejoin="round" d="m 220,180 l40,50 l-40,40 c 0,0 50,80 140,140 l40,-30 l50,40 c 0,0 -40,40 -100,20 c 0,0 -140,-80 -160,-160 c 0,0 -10,-40 10,-80 c 0,0 10,-20 20,-20 z"/>
                  </svg>
                </a>
                <a href="https://msroot.id" target="_blank" class="p-2 bg-gray-700 hover:bg-orange-500 text-white rounded-full transition-colors duration-300 relative z-10">
                  <span class="sr-only">Website</span>
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>