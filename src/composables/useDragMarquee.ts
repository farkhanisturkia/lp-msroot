import { computed, nextTick, onBeforeUnmount, onMounted, ref, toValue, watch } from 'vue';
import type { MaybeRefOrGetter } from 'vue';

export type MarqueeDirection = 'ltr' | 'rtl';

export interface DragMarqueeOptions {
  /** Lama satu putaran (satu salinan konten) dalam detik. */
  duration: MaybeRefOrGetter<number>;
  /** Arah gerak otomatis: 'rtl' = kanan → kiri, 'ltr' = kiri → kanan. */
  direction?: MarqueeDirection;
  /** Nonaktifkan autoplay (mis. jumlah konten belum cukup untuk loop). */
  enabled?: MaybeRefOrGetter<boolean>;
}

/** Jarak geser (px) sebelum dianggap drag, bukan klik biasa. */
const DRAG_THRESHOLD = 5;

/**
 * Carousel marquee yang gerakannya di-drive `requestAnimationFrame`, sehingga:
 * - bisa diseret dengan mouse / jari ke kiri-kanan (1:1 dengan pointer),
 * - berhenti saat ditahan (pointer down) dan saat kursor hover,
 * - kembali berjalan normal otomatis begitu tidak lagi diseret/ditekan.
 *
 * Track harus memuat 2 salinan konten identik agar wrap-around terasa mulus.
 */
export function useDragMarquee(options: DragMarqueeOptions) {
  const { direction = 'rtl' } = options;

  const trackRef = ref<HTMLElement | null>(null);
  const isDragging = ref(false);

  const enabled = computed(() => (options.enabled ? toValue(options.enabled) : true));
  const isPressed = ref(false);
  const isHovered = ref(false);
  const justDragged = ref(false);
  const reducedMotion = ref(false);

  /** Posisi translateX track dalam px, selalu dalam rentang (-half, 0]. */
  let x = 0;
  /** Lebar satu salinan konten (track berisi 2 salinan identik). */
  let half = 0;
  let initialized = false;

  let startX = 0;
  let startY = 0;
  let startOffset = 0;
  let axis: 'x' | 'y' | null = null;
  let suppressClick = false;
  let suppressTimer: ReturnType<typeof setTimeout> | undefined;

  let rafId = 0;
  let lastTime = 0;
  let resizeObserver: ResizeObserver | null = null;
  let motionQuery: MediaQueryList | null = null;

  const updateMotion = () => (reducedMotion.value = motionQuery?.matches ?? false);

  const paused = computed(() => {
    if (!enabled.value || reducedMotion.value) return true;
    if (isPressed.value) return true;
    // Hover menjeda agar mudah membaca, TAPI setelah drag selesai carousel
    // tetap jalan selama kursor masih di atas ("seret selesai → jalan lagi").
    return isHovered.value && !justDragged.value;
  });

  /** Bungkus posisi ke (-half, 0] agar loop mulus (track = 2 salinan identik). */
  function wrap(value: number) {
    if (half <= 0) return 0;
    const wrapped = ((value % half) + half) % half; // 0 .. half
    return wrapped > 0 ? wrapped - half : 0;
  }

  function applyTransform() {
    trackRef.value?.style.setProperty('transform', `translate3d(${x}px, 0, 0)`);
  }

  function measure() {
    const el = trackRef.value;
    if (!el) return;
    half = el.scrollWidth / 2;
    if (!initialized && half > 0) {
      x = direction === 'ltr' ? -half : 0;
      initialized = true;
    }
    x = wrap(x);
    applyTransform();
  }

  function loop(now: number) {
    rafId = requestAnimationFrame(loop);
    const dt = Math.min(now - lastTime, 64); // batasi loncatan setelah tab tersembunyi
    lastTime = now;

    if (paused.value || half <= 0) return;

    const pxPerMs = half / Math.max(toValue(options.duration), 1) / 1000;
    x = wrap(x + (direction === 'ltr' ? 1 : -1) * pxPerMs * dt);
    applyTransform();
  }

  function onPointerDown(event: PointerEvent) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    clearTimeout(suppressTimer);
    suppressClick = false;
    isPressed.value = true;
    axis = null;
    startX = event.clientX;
    startY = event.clientY;
    startOffset = x;
    // Bungkus try/catch: sebagian browser bisa menolak capture (mis. pointer sudah
    // berakhir di antara down dan capture). Drag tetap jalan tanpa capture.
    try {
      (event.currentTarget as HTMLElement | null)?.setPointerCapture?.(event.pointerId);
    } catch {
      /* pointer capture ditolak — abaikan */
    }
  }

  function onPointerMove(event: PointerEvent) {
    if (!isPressed.value) return;

    const dx = event.clientX - startX;
    const dy = event.clientY - startY;

    if (axis === null) {
      if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
      axis = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y';
      if (axis === 'x') isDragging.value = true;
    }
    if (axis !== 'x') return; // gesture vertikal = scroll halaman, biarkan browser

    event.preventDefault();
    x = wrap(startOffset + dx);
    applyTransform();
  }

  function endPointer(event: PointerEvent, cancelled: boolean) {
    if (!isPressed.value) return;
    isPressed.value = false;

    const el = event.currentTarget as HTMLElement | null;
    try {
      if (el?.hasPointerCapture?.(event.pointerId)) el.releasePointerCapture(event.pointerId);
    } catch {
      /* pointer sudah dilepas browser — abaikan */
    }

    if (isDragging.value) {
      isDragging.value = false;
      justDragged.value = true;
      if (!cancelled) {
        // Cegah seretan memicu klik link di dalam kartu (Download CV, sosial, dll).
        suppressClick = true;
        suppressTimer = setTimeout(() => (suppressClick = false), 300);
      }
      x = wrap(x);
      applyTransform();
    }
    axis = null;
  }

  const onPointerUp = (event: PointerEvent) => endPointer(event, false);
  const onPointerCancel = (event: PointerEvent) => endPointer(event, true);

  function onClickCapture(event: MouseEvent) {
    if (!suppressClick) return;
    suppressClick = false;
    clearTimeout(suppressTimer);
    event.preventDefault();
    event.stopPropagation();
  }

  function onMouseEnter() {
    isHovered.value = true;
  }

  function onMouseLeave() {
    isHovered.value = false;
    if (!isPressed.value) justDragged.value = false;
  }

  // Ukur ulang setiap lebar track berubah (resize, kartu muncul/hilang, v-if).
  watch(
    trackRef,
    (el, old) => {
      if (old) resizeObserver?.unobserve(old);
      if (!el) return;
      if (!resizeObserver && 'ResizeObserver' in window) {
        resizeObserver = new ResizeObserver(() => measure());
      }
      resizeObserver?.observe(el);
      measure();
    },
    { immediate: true },
  );

  // Track bisa baru muncul setelah `enabled` berubah (v-if pada komponen pemakai).
  watch(enabled, async () => {
    await nextTick();
    measure();
  });

  onMounted(() => {
    motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    updateMotion();
    motionQuery.addEventListener('change', updateMotion);

    lastTime = performance.now();
    rafId = requestAnimationFrame(loop);
  });

  onBeforeUnmount(() => {
    cancelAnimationFrame(rafId);
    clearTimeout(suppressTimer);
    resizeObserver?.disconnect();
    motionQuery?.removeEventListener('change', updateMotion);
  });

  return {
    trackRef,
    isDragging,
    isPaused: paused,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onClickCapture,
    onMouseEnter,
    onMouseLeave,
  };
}
