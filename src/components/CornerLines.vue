<script setup lang="ts">
import { computed } from 'vue';

/**
 * Latar garis lurus tepi ber sudut siku (corner brackets) — HANYA di
 * empat pojok: garis horizontal/vertikal, bracket bersarang, dan kotak
 * kecil. Tanpa percabangan, tanpa garis miring/akar.
 *
 * Warna memakai currentColor: atur lewat class di tempat pemakaian, mis.
 *   class="text-tosca-500/25 dark:text-neon-500/30"
 */
const props = withDefaults(defineProps<{ seed?: number }>(), { seed: 1 });

// RNG deterministik (mulberry32)
function mulberry32(a: number) {
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 1000;
const H = 1000;

type Shape = { d: string; w: number };

function build(seed: number): Shape[] {
  const rand = mulberry32(Math.round(seed * 1013 + 7));
  const out: Shape[] = [];

  // empat pojok: dx/dy menentuk arah "masuk ke dalam"
  const corners: [number, number][] = [
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1],
  ];

  for (const [dx, dy] of corners) {
    // jarak pojok motif ke tepi elemen (unit dari 1000)
    const m = 36 + rand() * 34;
    const ox = dx === 1 ? m : W - m;
    const oy = dy === 1 ? m : H - m;
    const aX = 90 + rand() * 90; // panjang lengan horizontal
    const aY = 90 + rand() * 90; // panjang lengan vertikal

    // 1) bracket siku luar: garis lurus horizontal + vertikal bersudut 90°
    out.push({
      d: `M ${ox + dx * aX} ${oy} L ${ox} ${oy} L ${ox} ${oy + dy * aY}`,
      w: 3,
    });

    // 2) bracket siku dalam (bersarang)
    const o = 18 + rand() * 16;
    const px = ox + dx * o;
    const py = oy + dy * o;
    out.push({
      d: `M ${px + dx * (aX * 0.55)} ${py} L ${px} ${py} L ${px} ${py + dy * (aY * 0.55)}`,
      w: 1.5,
    });

    // 3) kotak kecil (kotak-kotak)
    const o2 = o + 26 + rand() * 26;
    const qx = ox + dx * o2;
    const qy = oy + dy * o2;
    const s = 14 + rand() * 16;
    out.push({
      d: `M ${qx} ${qy} L ${qx + dx * s} ${qy} L ${qx + dx * s} ${qy + dy * s} L ${qx} ${qy + dy * s} Z`,
      w: 1.5,
    });

    // 4) garis lurus pendek sejajar tepi (horizontal, dekat tepi atas/bawah)
    const ty = oy - dy * 14;
    const tx = ox - dx * 14;
    out.push({
      d: `M ${ox + dx * (aX + 16)} ${ty} L ${ox + dx * (aX + 16 + 60 + rand() * 70)} ${ty}`,
      w: 1.5,
    });
    // 5) garis lurus pendek sejajar tepi (vertikal, dekat tepi kiri/kanan)
    out.push({
      d: `M ${tx} ${oy + dy * (aY + 16)} L ${tx} ${oy + dy * (aY + 16 + 60 + rand() * 70)}`,
      w: 1.5,
    });
  }
  return out;
}

const shapes = computed(() => build(props.seed));
</script>

<template>
  <svg
    data-corner-lines
    viewBox="0 0 1000 1000"
    preserveAspectRatio="none"
    class="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
    aria-hidden="true"
  >
    <path
      v-for="(p, i) in shapes"
      :key="i"
      :d="p.d"
      fill="none"
      stroke="currentColor"
      :stroke-width="p.w"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
