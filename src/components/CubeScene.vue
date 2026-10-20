<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as THREE from 'three';
import { useTheme } from '../composables/useTheme';

/*
 * Scene 3D logo MsRoot (6 cube) yang merapat menjadi logo saat di-scroll.
 *
 * Geometri hasil analisis piksel src/assets/logo.png:
 *   - 6 cube isometrik tersusun pada ring, bersudut 60° satu sama lain
 *   - jarak pusat logo ke pusat cube (ring radius) = 1.22 x panjang sisi cube
 *   - orientasi cube = rotasi isometrik (rotateY 35.264° lalu rotateX 45°)
 *     sehingga tampak persis seperti gambar logo (sisi kiri rata, bidang miring 60°)
 *   - warna cube tosca, garis tepi putih seperti gaya outline logo
 *
 * Pada posisi awal cube-cube terpisah + melayang (desktop: di kanan atas,
 * mobile: di bawah blok teks). Saat di-scroll, cube merapat (assemble)
 * menjadi logo di TENGAH layar, menunggu sejenak, lalu MELEDAK: tiap cube
 * pecah menjadi 27 cube kecil (grid 3x3x3) yang beterbangan lalu menyusut
 * hilang, menyambut section About. Canvas berada DI BELAKANG konten (z-0)
 * sehingga section berikutnya menutupi scene secara alami saat scroll.
 */

const wrapper = ref<HTMLDivElement | null>(null);
const canvasOpacity = ref(1);

const CUBE_COUNT = 6;
const RING_RADIUS = 1.22; // dalam satuan panjang sisi cube
// saat meledak, tiap cube pecah menjadi cube kecil bergrid SHARD_DIV^3
// (27 = 3x3x3; grid reguler membuat pecahan tepat mengisi volume cube
// induk tanpa celah pada momen pertama pecah)
const SHARD_DIV = 3;
const SHARD_COUNT = SHARD_DIV ** 3;
const SHARD_SIZE = 1 / SHARD_DIV;
// Iso orientation: sikap cube agar tampak seperti gambar logo
const ISO_QUAT = new THREE.Quaternion().setFromEuler(
  new THREE.Euler(Math.PI / 4, Math.atan(1 / Math.SQRT2), 0, 'YXZ'),
);

const TOSCA = '#14b8a6';
const NEON = '#ff3448'; // merah neon saat dark mode (glow in the dark)
const EDGE_COLOR = '#ffffff';

// pseudo random deterministik [0,1)
const rnd = (i: number, k: number) => {
  const s = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return s - Math.floor(s);
};
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const smoothstep = (a: number, b: number, x: number) => {
  const k = clamp((x - a) / (b - a), 0, 1);
  return k * k * (3 - 2 * k);
};
// Ambang snap untuk nilai teredam: damping eksponensial tak pernah
// menyentuh target secara persis (saat target 0 ia berhenti di sekitar
// 1e-323). Juga dipakai sebagai ambang "ledakan aktif" untuk visibilitas
// cube induk vs pecahan.
const SNAP_EPS = 1e-4;

type Cube = {
  mesh: THREE.Mesh;
  edges: THREE.LineSegments;
  formation: THREE.Vector3; // posisi saat logo terbentuk
  scatter: THREE.Vector3; // posisi terpisah (sebaran menutupi seluruh layar)
  scatterEuler: THREE.Euler; // orientasi acak dasar saat tersebar
  spinAxis: THREE.Vector3; // sumbu putar (dinormalisasi)
  spinSpeed: number; // rad/detik saat tersebar
  anchorPx: THREE.Vector2; // titik awal jelajah di ruang layar (px)
  roam: THREE.Vector2; // posisi jelajah saat ini (px layar)
  vel: THREE.Vector2; // kecepatan jelajah (px/detik), berubah saat mantul
};

type Shard = {
  mesh: THREE.Mesh;
  parent: number; // index cube induk
  offset: THREE.Vector3; // pusat pecahan dalam frame lokal cube induk
  dir: THREE.Vector3; // arah terbang (radial dari pusat logo + acak)
  dist: number; // jarak terbang (satuan dunia)
  axis: THREE.Vector3; // sumbu rotasi saat meledak
  spin: number; // total rotasi selama ledakan (rad)
  smooth: number; // progres ledakan saat pecahan mulai menyusut hilang
};

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let fillLight: THREE.DirectionalLight;
const { resolved } = useTheme();
let stopThemeWatch = () => {};
let camera: THREE.PerspectiveCamera;
let group: THREE.Group;
let boxGeo: THREE.BoxGeometry;
let mat: THREE.MeshStandardMaterial;
let edgeGeo: THREE.BufferGeometry;
let edgeMat: THREE.LineBasicMaterial;
let shardEdgeMat: THREE.LineBasicMaterial;
let cubes: Cube[] = [];
let shards: Shard[] = [];
let raf = 0;
let scrollY = 0;
let prog = 0; // progress assembly (damped)
let explode = 0; // progress ledakan (damped)
let heroHeight = 900;
let isDesktopLayout = true;
let pxX = 155; // pixel per satuan dunia (sumbu x)
let pxY = 155; // pixel per satuan dunia (sumbu y)
let camDist = 8; // jarak kamera (untuk koreksi perspektif sebaran)
let vpW = 1440; // ukuran viewport terakhir (jelajah & mantul di ruang layar)
let vpH = 900;
let inited = false;
let lastT = -1; // waktu frame sebelumnya (integrasi kecepatan jelajah)

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const center = new THREE.Vector3();

function layout() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  vpW = w;
  vpH = h;
  const aspect = w / h;
  isDesktopLayout = w >= 768;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(w, h);
  camera.aspect = aspect;

  // hitung jarak kamera agar muat di layar
  const TAN = Math.tan(THREE.MathUtils.degToRad(22.5)); // fov 45
  const halfW = RING_RADIUS + 0.8165; // lebar formasi (ring + siluet cube)
  const halfH = RING_RADIUS * 0.866 + 0.707; // tinggi formasi
  // desktop: logo ~44% lebar layar; mobile: LOGO KECIL (~55% lebar)
  // sesuai permintaan — saat menyatu jangan sebesar/mendominasi layar
  const fW = isDesktopLayout ? 0.44 : 0.55;
  const fH = isDesktopLayout ? 0.64 : 0.32;
  const dist = Math.max(halfW / (fW * TAN * aspect), halfH / (fH * TAN));

  const visH = 2 * dist * TAN;
  const visW = visH * aspect;

  // kamera lurus ke origin; posisi formasi diatur lewat group.position
  // (pemetaan dunia->layar linear & pasti). Saat logo sudah menyatu,
  // formasi tepat berada di pusat bidang kamera -> bebas distorsi keystone
  camera.position.set(0, 0, dist);
  camera.lookAt(0, 0, 0);
  camera.clearViewOffset();
  camera.updateProjectionMatrix();

  pxX = w / visW;
  pxY = h / visH;
  camDist = dist;

  // posisi istirahat = pusat layar. Grup tidak perlu bergesar karena
  // sebaran cube sendiri sudah menutupi SELURUH viewport (canvas z-0
  // berada di belakang konten hero, jadi cube boleh menutupi teks).
  // catatan: sumbu-Y dunia menghadap ke atas, baris layar menghadap ke bawah
  center.set(0, 0, 0);
  group.position.copy(center);

  // sebaran menutupi seluruh layar: satu sel grid per cube + jitter
  // deterministik + variasi kedalaman z (cube jauh tampil lebih kecil)
  const edgePad = 0.9 * pxX; // ≥ setengah siluet cube (0.8165 pxX) + aman
  const bx0 = edgePad;
  const bx1 = w - edgePad;
  const by0 = edgePad;
  const by1 = h - edgePad;
  const cols = isDesktopLayout ? 3 : 2;
  const rows = Math.ceil(CUBE_COUNT / cols); // 2 baris desktop / 3 mobile
  const zMin = isDesktopLayout ? -1.8 : -1.2;
  const toLocalX = (sx: number) => (sx - w / 2) / pxX;
  const toLocalY = (sy: number) => (h / 2 - sy) / pxY;
  // anchor fraksional menutupi seluruh layar (grid seragam menyisakan
  // pita kosong di tepi) — fraksi tetap per sumbu + jitter kecil,
  // hasil di-clamp agar siluet cube selalu muat di dalam viewport
  const fracX = cols === 3 ? [0.14, 0.5, 0.86] : [0.2, 0.8];
  const fracY = rows === 3 ? [0.16, 0.5, 0.84] : [0.16, 0.84];

  for (let i = 0; i < cubes.length; i++) {
    const c = cubes[i];
    const col = i % cols;
    const row = Math.floor(i / cols);
    const sx = clamp((fracX[col] + (rnd(i, 31) - 0.5) * 0.12) * w, bx0, bx1);
    const sy = clamp((fracY[row] + (rnd(i, 32) - 0.5) * 0.12) * h, by0, by1);
    const z = zMin * (0.2 + rnd(i, 33) * 0.8); // zMin..~0, selalu menjauh kamera
    // koreksi perspektif: target piksel (sx,sy) dihitung pada bidang z=0,
    // skalakan koordinat dunia agar proyeksi tetap jatuh tepat di (sx,sy)
    const persp = (camDist - z) / camDist;
    c.scatter.set(toLocalX(sx) * persp, toLocalY(sy) * persp, z);

    // jelajah di ruang layar: titik awal = anchor, kecepatan tetap
    // 4.8% lebar layar/detik (lantai 48 px/detik di layar sempit) ×
    // variasi 0.8–1.3 — terlihat bergerak tapi tidak terlalu cepat
    c.anchorPx.set(sx, sy);
    c.roam.copy(c.anchorPx);
    const spdBase = Math.max(48, 0.048 * w);
    const spd = spdBase * (0.8 + rnd(i, 34) * 0.5);
    const ang = rnd(i, 35) * Math.PI * 2;
    c.vel.set(Math.cos(ang) * spd, Math.sin(ang) * spd);
  }

  // rentang scroll mengikuti tinggi hero agar selalu terkunci dengan layout
  heroHeight = document.getElementById('hero-section')?.offsetHeight || h;
}

function buildScene() {
  if (!wrapper.value) return;
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearAlpha(0);
  wrapper.value.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);

  // pencahayaan: 3 bidang cube mendapat intensitas berbeda (seperti logo)
  scene.add(new THREE.AmbientLight(0xffffff, 1.35));
  const key = new THREE.DirectionalLight(0xffffff, 2.0);
  key.position.set(1.2, 3.0, 4.2);
  scene.add(key);
  fillLight = new THREE.DirectionalLight(0x9ff0e6, 0.55);
  fillLight.position.set(-3.4, -1.2, 2.2);
  scene.add(fillLight);

  group = new THREE.Group();
  scene.add(group);

  boxGeo = new THREE.BoxGeometry(1, 1, 1);
  mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(TOSCA),
    roughness: 0.42,
    metalness: 0.04,
  });
  edgeGeo = new THREE.EdgesGeometry(boxGeo);
  edgeMat = new THREE.LineBasicMaterial({ color: new THREE.Color(EDGE_COLOR) });
  // garis tepi pecahan: opacity dianimasikan 0 -> 1 saat ledakan mulai,
  // supaya garis grid di dalam cube tidak mendadak muncul di momen pecah
  shardEdgeMat = new THREE.LineBasicMaterial({
    color: new THREE.Color(EDGE_COLOR),
    transparent: true,
    opacity: 0,
  });

cubes = [];
  for (let i = 0; i < CUBE_COUNT; i++) {
    const angle = (i / CUBE_COUNT) * Math.PI * 2;
    const formation = new THREE.Vector3(
      Math.cos(angle) * RING_RADIUS,
      Math.sin(angle) * RING_RADIUS,
      0,
    );
    // diisi formation dulu; layout() menentukan sebaran final
    // menutupi seluruh layar (grid sel per cube)
    const scatter = formation.clone();
    // sumbu + kecepatan putar deterministik: tiap cube berputar terus
    // dengan laju berbeda sambil berpindah-pindah (kala tersebar)
    const spinAxis = new THREE.Vector3(
      rnd(i, 8) - 0.5,
      rnd(i, 9) - 0.5,
      rnd(i, 10) - 0.5,
    );
    if (spinAxis.lengthSq() < 1e-8) spinAxis.set(0.3, 0.5, 0.8);
    else spinAxis.normalize();
    const mesh = new THREE.Mesh(boxGeo, mat);
    const edges = new THREE.LineSegments(edgeGeo, edgeMat);
    mesh.add(edges);
    mesh.position.copy(formation);
    group.add(mesh);
    cubes.push({
      mesh,
      edges,
      formation,
      scatter,
      scatterEuler: new THREE.Euler(
        (rnd(i, 5) - 0.5) * Math.PI * 1.6,
        (rnd(i, 6) - 0.5) * Math.PI * 1.6,
        (rnd(i, 7) - 0.5) * Math.PI * 1.6,
      ),
      spinAxis,
      spinSpeed: 0.5 + rnd(i, 11) * 0.9, // rad/detik
      anchorPx: new THREE.Vector2(),
      roam: new THREE.Vector2(),
      vel: new THREE.Vector2(),
    });
  }

  // pecahan: setiap cube diisi SHARD_COUNT cube kecil bergrid tepat
  // (momen pecah tanpa celah), dianimasikan meledak saat scroll
  shards = [];
  const cell = new THREE.Vector3();
  const cellIso = new THREE.Vector3();
  const spawn = new THREE.Vector3();
  for (let i = 0; i < CUBE_COUNT; i++) {
    for (let s = 0; s < SHARD_COUNT; s++) {
      const key = i * SHARD_COUNT + s;
      const gx = s % SHARD_DIV;
      const gy = Math.floor(s / SHARD_DIV) % SHARD_DIV;
      const gz = Math.floor(s / (SHARD_DIV * SHARD_DIV)) % SHARD_DIV;
      cell.set(
        (gx - (SHARD_DIV - 1) / 2) * SHARD_SIZE,
        (gy - (SHARD_DIV - 1) / 2) * SHARD_SIZE,
        (gz - (SHARD_DIV - 1) / 2) * SHARD_SIZE,
      );
      // rotasi ISO hanya untuk arah terbang awal; offset disimpan dalam
      // frame lokal cube induk agar bisa dipakai bersama transform induk
      spawn
        .copy(cubes[i].formation)
        .add(cellIso.copy(cell).applyQuaternion(ISO_QUAT));

      // arah ledakan: radial dari pusat logo + acak agar tidak kaku
      const dir = spawn.clone().normalize();
      dir.x += (rnd(key, 21) - 0.5) * 1.0;
      dir.y += (rnd(key, 22) - 0.5) * 1.0;
      dir.z += (rnd(key, 23) - 0.5) * 0.9;
      dir.normalize();
      const axis = new THREE.Vector3(
        rnd(key, 26) - 0.5,
        rnd(key, 27) - 0.5,
        rnd(key, 28) - 0.5,
      );
      if (axis.lengthSq() < 1e-8) axis.set(0, 1, 0);
      else axis.normalize();

      const mesh = new THREE.Mesh(boxGeo, mat);
      mesh.add(new THREE.LineSegments(edgeGeo, shardEdgeMat));
      mesh.scale.setScalar(SHARD_SIZE);
      mesh.position.copy(spawn);
      mesh.visible = false;
      group.add(mesh);
      shards.push({
        mesh,
        parent: i,
        offset: cell.clone(),
        dir,
        dist: 2.2 + rnd(key, 24) * 3.2,
        axis,
        spin: 1.6 + rnd(key, 25) * 3.4,
        smooth: rnd(key, 29) * 0.55,
      });
    }
  }

  inited = true;
  layout();
}

// ganti warna cube mengikuti tema aktif: tosca (terang) / neon merah (gelap)
function applyColorScheme() {
  if (!inited) return;
  mat.color.set(resolved.value === 'dark' ? NEON : TOSCA);
  fillLight.color.set(resolved.value === 'dark' ? 0xff9aa2 : 0x9ff0e6);
}

const tumbleQuat = new THREE.Quaternion();
const spinQuat = new THREE.Quaternion();
const burstQuat = new THREE.Quaternion();
const tmpPos = new THREE.Vector3();
const tmpOffset = new THREE.Vector3();

function update(time: number) {
  // integrasi kecepatan jelajah (px/detik); di-clamp agar lompatan
  // saat tab disembunyikan tidak menghamburkan cube jauh sekaligus
  const dt = lastT < 0 ? 0 : Math.min(0.05, Math.max(0, time - lastT));
  lastT = time;
  // koreografi scroll, semuanya mengunci pada tinggi hero:
  //   0 → 42%   : cube merapat (assemble) menjadi logo di tengah layar
  //   42% → 52% : logo bertahan sejenak
  //   52% → 72% : LEDAKAN — tiap cube pecah menjadi SHARD_COUNT cube kecil
  //               yang beterbangan lalu menyusut hilang
  //   72% → 90% : canvas fade out menyambut section About
  const assembleEnd = Math.max(240, heroHeight * 0.42);
  const explodeStart = heroHeight * 0.52;
  const explodeLen = Math.max(240, heroHeight * 0.2);
  const fadeStart = heroHeight * 0.72;
  const fadeLen = Math.max(160, heroHeight * 0.18);

  const target = clamp(scrollY / assembleEnd, 0, 1);
  prog += (target - prog) * 0.1;
  const explodeTarget = clamp((scrollY - explodeStart) / explodeLen, 0, 1);
  explode += (explodeTarget - explode) * 0.1;
  // snap ke target agar prog/explode benar-benar mencapai 0 (damping
  // eksponensial hanya mendekati 0 tanpa pernah menyentuhnya)
  if (Math.abs(target - prog) < SNAP_EPS) prog = target;
  if (Math.abs(explodeTarget - explode) < SNAP_EPS) explode = explodeTarget;

  const fade = clamp((scrollY - fadeStart) / fadeLen, 0, 1);
  const op = 1 - fade;
  const rounded = Math.round(op * 100) / 100;
  if (rounded !== canvasOpacity.value) canvasOpacity.value = rounded;

  const t = easeInOutCubic(clamp(prog, 0, 1));
  const floatAmp = (1 - t) * (reduceMotion ? 0 : 1);
  const spinMul = reduceMotion ? 0 : 1; // hormati prefers-reduced-motion

  for (let i = 0; i < cubes.length; i++) {
    const c = cubes[i];

    // posisi: menjelajah luas di ruang layar dengan kecepatan tetap,
    // MANTUL saat menyentuh tepi halaman; merapat ke formasi logo saat
    // menyatu; kembali ke titik awal (anchor) lalu menjelajah lagi
    // saat scroll up
    tmpPos.copy(c.scatter);
    if (floatAmp > 0) {
      c.roam.x += c.vel.x * dt;
      c.roam.y += c.vel.y * dt;
      // z tetap beroscilasi kecil agar hidup (kedalaman → ukuran kubu)
      tmpPos.z += Math.sin(time * 0.26 + i * 1.3) * 0.28 * floatAmp;
      const kF = camDist / (camDist - tmpPos.z);
      const halfPx = 0.8165 * pxX * kF + 4;
      // mantul di tepi halaman: batas siluet + balik arah kecepatan
      if (c.roam.x < halfPx) { c.roam.x = halfPx; c.vel.x = Math.abs(c.vel.x); }
      else if (c.roam.x > vpW - halfPx) { c.roam.x = vpW - halfPx; c.vel.x = -Math.abs(c.vel.x); }
      if (c.roam.y < halfPx) { c.roam.y = halfPx; c.vel.y = Math.abs(c.vel.y); }
      else if (c.roam.y > vpH - halfPx) { c.roam.y = vpH - halfPx; c.vel.y = -Math.abs(c.vel.y); }
      // px layar → dunia (koreksi perspektif sesuai kedalaman cube)
      tmpPos.x = (c.roam.x - vpW / 2) / (pxX * kF);
      tmpPos.y = (vpH / 2 - c.roam.y) / (pxY * kF);
    }
    // penuh menyatu → reset jelajah ke titik awal, sehingga saat scroll
    // up cube kembali ke sebaran awal dan mulai menjelajah dari situ
    if (t >= 0.999) c.roam.copy(c.anchorPx);
    tmpPos.lerp(c.formation, t);
    // nafas halus saat sudah menyatu (agar tetap hidup)
    if (t > 0.001) {
      tmpPos.x += Math.sin(time * 0.9 + i) * 0.012 * t;
      tmpPos.y += Math.cos(time * 0.8 + i * 1.4) * 0.012 * t;
    }
    c.mesh.position.copy(tmpPos);

    // rotasi: berputar terus saat tersebar (sambil berpindah tempat),
    // slerp menuju sikap iso logo seiring menyatu; saat scroll up
    // putaran dan jelajah posisi dilanjutkan lagi dari kondisi tersebar
    tumbleQuat.setFromEuler(c.scatterEuler);
    spinQuat.setFromAxisAngle(c.spinAxis, time * c.spinSpeed * spinMul);
    tumbleQuat.premultiply(spinQuat);
    c.mesh.quaternion.copy(tumbleQuat).slerp(ISO_QUAT, t);

    const breathe = 1 + Math.sin(time * 1.1 + i * 1.3) * 0.014 * t;
    c.mesh.scale.setScalar(breathe);
  }

  // LEDAKAN: saat mulai, cube induk disembunyikan dan digantikan
  // SHARD_COUNT pecahan per cube yang terbang keluar sambil berputar,
  // lalu menyusut hilang secara bertahap (staggered) di ekor ledakan
  const e = explode;
  shardEdgeMat.opacity = clamp(e / 0.08, 0, 1);
  // pakai ambang, bukan `e <= 0` persis: nilai damping bisa tersangkut
  // pada pecahan kecil positif sehingga state visibilitas salah
  const exploded = e > SNAP_EPS;
  for (const c of cubes) c.mesh.visible = !exploded;
  if (exploded) {
    const fly = 1 - Math.pow(1 - e, 3); // ease-out: kilat lalu melambat
    for (const sh of shards) {
      const shrink = 1 - smoothstep(sh.smooth, 1, e);
      sh.mesh.visible = shrink > 0.02;
      if (!sh.mesh.visible) continue;
      // pecahan mengikuti transform cube induk (posisi, rotasi, skala),
      // sehingga saat scroll-up t mengecil pecahan ikut membubar mengikuti
      // scatter -- bukan terkunci pada formasi logo
      const parent = cubes[sh.parent];
      tmpOffset.copy(sh.offset).applyQuaternion(parent.mesh.quaternion);
      tmpPos
        .copy(parent.mesh.position)
        .add(tmpOffset)
        .addScaledVector(sh.dir, sh.dist * fly);
      sh.mesh.position.copy(tmpPos);
      burstQuat.setFromAxisAngle(sh.axis, sh.spin * fly);
      sh.mesh.quaternion.copy(parent.mesh.quaternion).multiply(burstQuat);
      sh.mesh.scale.setScalar(SHARD_SIZE * shrink * parent.mesh.scale.x);
    }
  } else {
    for (const sh of shards) sh.mesh.visible = false;
  }

  // goyangan sangat halus pada formasi agar terasa 3D
  group.rotation.z = Math.sin(time * 0.3) * 0.022 * t;
  group.rotation.y = Math.sin(time * 0.24) * 0.03 * t;

  // geser formasi dari area tersebar menuju pusat kamera (tengah layar)
  // seiring logo menyatu; saat t = 1 formasi tepat di sumbu kamera
  const inv = 1 - t;
  group.position.set(center.x * inv, center.y * inv, 0);

  if (canvasOpacity.value > 0.005 || op > 0.005) {
    renderer.render(scene, camera);
  }
}

function loop(now: number) {
  raf = requestAnimationFrame(loop);
  update(now * 0.001);
}

function onScroll() {
  scrollY = window.scrollY || window.pageYOffset;
}

onMounted(() => {
  buildScene();
  applyColorScheme();
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', layout);
  stopThemeWatch = watch(resolved, applyColorScheme);
  raf = requestAnimationFrame(loop);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', layout);
  stopThemeWatch();
  if (inited) {
    boxGeo.dispose();
    edgeGeo.dispose();
    mat.dispose();
    edgeMat.dispose();
    shardEdgeMat.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  }
});
</script>

<template>
  <div
    ref="wrapper"
    class="pointer-events-none fixed inset-0 z-0"
    :style="{ opacity: canvasOpacity }"
    aria-hidden="true"
  />
</template>
