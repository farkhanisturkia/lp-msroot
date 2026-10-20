import { computed, ref } from 'vue';

export type ThemeChoice = 'dark' | 'light' | 'system';

const STORAGE_KEY = 'msroot-theme';

const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

function readStored(): ThemeChoice {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light' || saved === 'system') return saved;
  } catch {
    /* localStorage tidak tersedia — pakai default */
  }
  return 'system';
}

const choice = ref<ThemeChoice>(readStored());

// MediaQueryList.matches BUKAN state reaktif Vue, sehingga computed di bawah
// tidak tahu saat preferensi sistem berubah. Tick dipakai sebagai dependensi
// reaktif untuk meng-invalidate cache computed dari luar.
const systemTick = ref(0);

/** Tema efektif (dark / light) setelah memperhitungkan preferensi sistem. */
const resolved = computed<'dark' | 'light'>(() => {
  void systemTick.value; // dependensi reaktif: invalidasi saat sistem berubah
  if (choice.value === 'system') return systemDark.matches ? 'dark' : 'light';
  return choice.value;
});

function apply() {
  const dark = resolved.value === 'dark';
  document.documentElement.classList.toggle('dark', dark);
  // colorScheme agar scrollbar/form control native ikut tema
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light';

  // favicon: logo putih di tema gelap, logo hitam di tema terang
  const favicon = document.getElementById('favicon') as HTMLLinkElement | null;
  if (favicon) favicon.href = dark ? '/logo-white.png' : '/logo-black.png';
}

function setTheme(next: ThemeChoice) {
  choice.value = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* abaikan jika storage penuh/blokir */
  }
  apply();
}

// Saat mode "system", ikuti perubahan preferensi OS secara live.
systemDark.addEventListener('change', () => {
  if (choice.value !== 'system') return;
  systemTick.value++; // paksa computed `resolved` dihitung ulang
  apply();
});

// Terapkan sesegera mungkin saat modul dimuat (mencegah flash tema salah).
apply();

export function useTheme() {
  return { choice, resolved, setTheme };
}
