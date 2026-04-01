const POOL_SIZE = 4;
const pool: HTMLAudioElement[] = [];
let poolIndex = 0;
let loaded = false;

function ensurePool() {
  if (loaded) return;
  loaded = true;
  for (let i = 0; i < POOL_SIZE; i++) {
    const audio = new Audio("/audio/spiderman-webshooter.mp3");
    audio.preload = "auto";
    audio.volume = 0.5;
    pool.push(audio);
  }
}

export function playWebShoot() {
  try {
    ensurePool();
    const audio = pool[poolIndex % POOL_SIZE];
    audio.currentTime = 0;
    audio.play().catch(() => {});
    poolIndex++;
  } catch {
    // Audio not available
  }
}
