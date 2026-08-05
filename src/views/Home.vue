<script setup lang="ts">
import HeroSection from '../components/HeroSection.vue'
import ProfileSection from '../components/ProfileSection.vue';
import ProductSection from '../components/ProductSection.vue';
</script>

<template>
  <main class="h-screen overflow-y-scroll md:snap-y md:snap-mandatory scroll-smooth">
    <HeroSection />
    <ProfileSection />
    <ProductSection />
  </main>
</template>