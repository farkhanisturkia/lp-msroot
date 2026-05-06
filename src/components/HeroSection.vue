<script setup lang="ts">
import heroImage from '../assets/heroSection.jpeg';

const scrollToProducts = () => {
  const productSection = document.getElementById('product-section');
  if (productSection) {
    productSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const scrollToProfile = () => {
  const profileSection = document.getElementById('profile-section');
  if (profileSection) {
    profileSection.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
  <section id="hero-section"  class="relative text-white overflow-hidden">
    <div 
      class="absolute inset-0 bg-cover bg-center" 
      :style="{ backgroundImage: `url(${heroImage})` }"
    ></div>
    <div class="absolute inset-0 bg-zinc-950/60 mix-blend-multiply"></div>
    <div class="container mx-auto px-4 py-24 md:py-32 relative z-10">
      <div class="flex flex-col md:flex-row items-center justify-between">
        <div class="w-full md:w-1/2 mb-12 md:mb-0">
          <h1 class="mb-6 leading-tight">
            <span class="text-5xl md:text-6xl font-bold text-orange-600">MsRoot.ID</span><br>
            <span class="text-3xl md:text-5xl font-bold">Innovate.<br>Automate.<br>Elevate.</span>
          </h1>
          <p class="text-xl mb-8 text-gray-300">We deliver innovative websites, custom software, and reliable IT solutions.</p>
          <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              @click="scrollToProfile"
              class="bg-white/30 hover:bg-black/70 text-blue-300 hover:text-white font-semibold px-8 py-3 rounded-full transition duration-300 text-center"
            >
              Contact us
            </button>
            <button 
              @click="scrollToProducts"
              class="border-2 border-blue-300/50 text-blue-300 font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-blue-900 transition duration-300 text-center cursor-pointer"
            >
              Our products
            </button>
          </div>
        </div>
        <div class="w-full md:w-1/2 md:pl-12">
          <div class="bg-black/10 text-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-2xl">
            <h2 class="text-2xl font-semibold mb-6">Why MsRoot?</h2>
            <ul class="space-y-4">
              <li class="flex items-center">
                <svg class="w-6 h-6 mr-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <span>Fast Performance</span>
              </li>
              <li class="flex items-center">
                <svg class="w-6 h-6 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <span>Secure Security</span>
              </li>
              <li class="flex items-center">
                <svg class="w-6 h-6 mr-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                </svg>
                <span>AI-powered</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
      </svg>
    </div>
  </section>
</template>