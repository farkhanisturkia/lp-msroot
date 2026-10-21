<script setup lang="ts">
import { onMounted } from 'vue';
import bingungImage from '../assets/illustrations/bingung.png';

onMounted(() => {
  void import('../views/Home.vue').catch(() => {
  });
});
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)] bg-white dark:bg-carbon-950 py-12 text-slate-900 dark:text-gray-100">
    <div class="container mx-auto flex flex-col items-center px-4 text-center">
      <img
        :src="bingungImage"
        alt="Ilustrasi anak kecil yang kebingungan"
        class="h-56 w-56 object-contain sm:h-64 sm:w-64"
      />

      <h1
        class="mt-6 bg-linear-to-r from-tosca-500 to-cyan-400 bg-clip-text text-7xl font-extrabold tracking-tight text-transparent sm:text-8xl"
      >
        404
      </h1>
      <p class="mt-3 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
        Halaman yang kamu cari tidak ada.
      </p>
      <p class="mt-2 max-w-md text-sm leading-relaxed text-slate-500 dark:text-gray-400 sm:text-base">
        Mungkin alamatnya salah ketik atau sudah dipindahkan. Tenang, si kecil ini juga ikut bingung nyarinya.
      </p>

      <router-link
        to="/"
        class="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-tosca-500 px-6 py-3 text-sm font-bold text-white shadow-md shadow-tosca-500/30 transition duration-300 hover:bg-tosca-600 hover:shadow-lg hover:shadow-tosca-500/40 dark:bg-neon-600 dark:shadow-neon-sm dark:hover:bg-neon-500 sm:text-base"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 11l9-8 9 8M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9" />
        </svg>
        Kembali ke Beranda
      </router-link>
    </div>
  </div>
</template>


