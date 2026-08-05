<script setup lang="ts">
import heroImage from '../assets/heroSection.jpeg';

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const features = [
  { title: 'Fast Performance', desc: 'Optimized speed, clean code, and lightweight architecture.' },
  { title: 'Enterprise Security', desc: 'Built-in security standards, data encryption, and safe protocols.' },
  { title: 'AI-powered Integration', desc: 'Smart automation and API integrations for modern workflows.' }
];

const stats = [
  { value: '99.9%', label: 'Uptime Reliability' },
  { value: 'Modern', label: 'Tech Stack' },
  { value: 'Custom', label: 'Tailored Solutions' }
];
</script>

<template>
  <section 
    id="hero-section" 
    class="min-h-screen w-full snap-start flex flex-col justify-between bg-stone-50 text-stone-800 relative overflow-hidden py-12"
  >
    <div 
      class="absolute inset-0 bg-cover bg-center opacity-5 filter grayscale contrast-125 pointer-events-none" 
      :style="{ backgroundImage: `url(${heroImage})` }"
    ></div>

    <div class="container mx-auto px-6 lg:px-12 my-auto relative z-10 max-w-7xl">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        <div class="lg:col-span-7 space-y-8">
          <div class="inline-block px-4 py-1.5 bg-amber-100/80 border border-amber-200 rounded-full text-amber-900 text-sm font-semibold tracking-wide">
            SOFTWARE DEVELOPMENT & IT SOLUTIONS
          </div>
          
          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-stone-900 leading-none">
            MsRoot<span class="text-amber-800">.ID</span><br>
            <span class="italic font-normal text-stone-600 text-4xl sm:text-5xl lg:text-6xl mt-2 block">Innovate. Automate. Elevate.</span>
          </h1>
          
          <p class="text-xl sm:text-2xl text-stone-600 max-w-2xl leading-relaxed">
            We deliver thoughtful websites, custom software, and reliable IT solutions crafted with precision and modern engineering.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 pt-2">
            <button 
              @click="scrollToSection('product-section')"
              class="bg-amber-900 hover:bg-amber-800 text-stone-50 font-medium px-9 py-4 rounded-xl transition duration-300 shadow-md hover:shadow-lg text-center cursor-pointer text-base"
            >
              Explore products
            </button>
            <button 
              @click="scrollToSection('profile-section')"
              class="border border-stone-300 hover:border-amber-900 bg-white/50 text-stone-700 hover:text-amber-900 font-medium px-9 py-4 rounded-xl transition duration-300 text-center cursor-pointer text-base"
            >
              About & Contact
            </button>
          </div>

          <div class="grid grid-cols-3 gap-6 pt-8 border-t border-stone-200/80 max-w-xl">
            <div v-for="s in stats" :key="s.label">
              <p class="text-2xl lg:text-3xl font-serif font-bold text-stone-900">{{ s.value }}</p>
              <p class="text-xs text-stone-500 font-medium uppercase tracking-wider mt-1">{{ s.label }}</p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="bg-white/90 backdrop-blur-md border border-stone-200/90 rounded-3xl p-8 lg:p-10 shadow-sm">
            <h2 class="text-xs font-bold uppercase tracking-widest text-amber-800 mb-8">Why Choose MsRoot?</h2>
            
            <div class="space-y-8">
              <div v-for="(item, idx) in features" :key="idx" class="flex gap-5 items-start">
                <div class="w-3 h-3 rounded-full bg-amber-800 mt-2 shrink-0 shadow-xs"></div>
                <div>
                  <h3 class="font-serif font-semibold text-stone-900 text-xl">{{ item.title }}</h3>
                  <p class="text-stone-600 mt-1.5 leading-relaxed text-sm lg:text-base">{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="text-center relative z-10 animate-bounce cursor-pointer opacity-70 hover:opacity-100" @click="scrollToSection('profile-section')">
      <span class="text-xs uppercase tracking-widest text-stone-400 font-medium block mb-1">Scroll Down</span>
      <svg class="w-5 h-5 mx-auto text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>
</template>