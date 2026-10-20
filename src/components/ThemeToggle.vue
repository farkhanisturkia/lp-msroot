<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useTheme, type ThemeChoice } from '../composables/useTheme';

withDefaults(defineProps<{ variant?: 'dropdown' | 'segmented' }>(), {
  variant: 'dropdown',
});

const { choice, setTheme } = useTheme();

const open = ref(false);
const root = ref<HTMLElement | null>(null);

const options: { value: ThemeChoice; label: string }[] = [
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
  { value: 'system', label: 'System' },
];

// ikon bawaan (heroicons outline): sun / moon / desktop-computer
const icons: Record<ThemeChoice, string> = {
  light: 'M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z',
  dark: 'M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z',
  system: 'M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25',
};

const select = (value: ThemeChoice) => {
  setTheme(value);
  open.value = false;
};

const onDocClick = (e: MouseEvent) => {
  if (root.value && !root.value.contains(e.target as Node)) open.value = false;
};
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') open.value = false;
};

onMounted(() => {
  document.addEventListener('mousedown', onDocClick);
  document.addEventListener('keydown', onKeydown);
});
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDocClick);
  document.removeEventListener('keydown', onKeydown);
});
</script>

<template>
  <div ref="root" class="relative">
    <!-- Desktop: dropdown ikon -->
    <button
      v-if="variant === 'dropdown'"
      type="button"
      class="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-tosca-50 hover:text-tosca-600 dark:text-white dark:hover:bg-white/8 dark:hover:text-neon-400"
      :aria-label="`Pilih tema (saat ini: ${choice})`"
      :aria-expanded="open"
      aria-haspopup="menu"
      title="Ganti tema"
      @click="open = !open"
    >
      <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" :d="icons[choice]" />
      </svg>
    </button>

    <transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="open"
        role="menu"
        class="absolute right-0 top-full z-50 mt-2 w-40 origin-top-right rounded-xl border border-tosca-100 bg-white p-1 shadow-lg dark:border-white/10 dark:bg-carbon-900 dark:shadow-black/40"
      >
        <button
          v-for="opt in options"
          :key="opt.value"
          type="button"
          role="menuitem"
          class="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-semibold transition"
          :class="
            choice === opt.value
              ? 'bg-tosca-50 text-tosca-700 dark:bg-white/10 dark:text-neon-400'
              : 'text-slate-600 hover:bg-tosca-50 hover:text-tosca-700 dark:text-white dark:hover:bg-white/8 dark:hover:text-neon-300'
          "
          @click="select(opt.value)"
        >
          <svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" :d="icons[opt.value]" />
          </svg>
          {{ opt.label }}
          <svg
            v-if="choice === opt.value"
            class="ml-auto h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </button>
      </div>
    </transition>

    <!-- Mobile: switch segmented 3 pilihan (Dark | Light | System) -->
    <div
      v-if="variant === 'segmented'"
      role="radiogroup"
      aria-label="Tema tampilan"
      class="flex w-full items-center gap-1 rounded-xl border border-tosca-200/70 bg-tosca-50 p-1 dark:border-white/10 dark:bg-white/5"
    >
      <button
        v-for="opt in options"
        :key="opt.value"
        type="button"
        role="radio"
        :aria-checked="choice === opt.value"
        :aria-label="`Tema ${opt.label}`"
        class="flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-bold transition"
        :class="
          choice === opt.value
            ? 'bg-white text-tosca-700 shadow-sm ring-1 ring-tosca-200/60 dark:bg-carbon-800 dark:text-neon-400 dark:ring-white/10'
            : 'text-slate-500 hover:text-tosca-600 dark:text-white/60 dark:hover:text-neon-300'
        "
        @click="setTheme(opt.value)"
      >
        <svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" :d="icons[opt.value]" />
        </svg>
        {{ opt.label }}
      </button>
    </div>
  </div>
</template>
