import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const BASE = 'https://oryzo.ai';

const assets = [
  // Meta
  ['/meta/favicon-96x96.png', 'public/meta/favicon-96x96.png'],
  ['/meta/favicon.svg', 'public/meta/favicon.svg'],
  ['/meta/favicon.ico', 'public/meta/favicon.ico'],
  ['/meta/apple-touch-icon.png', 'public/meta/apple-touch-icon.png'],
  // Video thumb
  ['/images/video_thumb.webp', 'public/images/video_thumb.webp'],
  // Wearable gallery thumbs
  ['/images/wearable-gallery/thumbs/intro.webp', 'public/images/wearable-gallery/thumbs/intro.webp'],
  ['/images/wearable-gallery/thumbs/yoga.webp', 'public/images/wearable-gallery/thumbs/yoga.webp'],
  ['/images/wearable-gallery/thumbs/shoulder.webp', 'public/images/wearable-gallery/thumbs/shoulder.webp'],
  ['/images/wearable-gallery/thumbs/bikini_on.webp', 'public/images/wearable-gallery/thumbs/bikini_on.webp'],
  ['/images/wearable-gallery/thumbs/glasses.webp', 'public/images/wearable-gallery/thumbs/glasses.webp'],
  ['/images/wearable-gallery/thumbs/bite.webp', 'public/images/wearable-gallery/thumbs/bite.webp'],
  ['/images/wearable-gallery/thumbs/pocket.webp', 'public/images/wearable-gallery/thumbs/pocket.webp'],
  ['/images/wearable-gallery/thumbs/outro.webp', 'public/images/wearable-gallery/thumbs/outro.webp'],
  // Wearable gallery full
  ['/images/wearable-gallery/shoulder.webp', 'public/images/wearable-gallery/shoulder.webp'],
  ['/images/wearable-gallery/bikini_on.webp', 'public/images/wearable-gallery/bikini_on.webp'],
  ['/images/wearable-gallery/bikini.webp', 'public/images/wearable-gallery/bikini.webp'],
  ['/images/wearable-gallery/glasses.webp', 'public/images/wearable-gallery/glasses.webp'],
  ['/images/wearable-gallery/pocket.webp', 'public/images/wearable-gallery/pocket.webp'],
  // Testimonies
  ['/images/testimonies/astronut_MOBILE.webp', 'public/images/testimonies/astronut.webp'],
  ['/images/testimonies/pirate_king_MOBILE.webp', 'public/images/testimonies/pirate_king.webp'],
  ['/images/testimonies/youtuber_MOBILE.webp', 'public/images/testimonies/youtuber.webp'],
  ['/images/testimonies/attention_MOBILE.webp', 'public/images/testimonies/attention.webp'],
  ['/images/testimonies/flat_earth_MOBILE.webp', 'public/images/testimonies/flat_earth.webp'],
  // Social content
  ['/images/social-content/edge_MOBILE.webp', 'public/images/social-content/edge.webp'],
  ['/images/social-content/sticker_1_MOBILE.webp', 'public/images/social-content/sticker_1.webp'],
  ['/images/social-content/always_on_MOBILE.webp', 'public/images/social-content/always_on.webp'],
  ['/images/social-content/color_MOBILE.webp', 'public/images/social-content/color.webp'],
  ['/images/social-content/3090_MOBILE.webp', 'public/images/social-content/3090.webp'],
  ['/images/social-content/perfect_MOBILE.webp', 'public/images/social-content/perfect.webp'],
  ['/images/social-content/drop_test_MOBILE.webp', 'public/images/social-content/drop_test.webp'],
  ['/images/social-content/sticker_2_MOBILE.webp', 'public/images/social-content/sticker_2.webp'],
  ['/images/social-content/legacy_support_MOBILE.webp', 'public/images/social-content/legacy_support.webp'],
];

async function download(url, dest) {
  const fullDest = path.join(root, dest);
  const dir = path.dirname(fullDest);
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
  if (existsSync(fullDest)) { process.stdout.write('.'); return; }
  try {
    const res = await fetch(BASE + url);
    if (!res.ok) { console.log(`\n⚠ ${url} → ${res.status}`); return; }
    const buf = await res.arrayBuffer();
    await writeFile(fullDest, Buffer.from(buf));
    process.stdout.write('✓');
  } catch(e) {
    console.log(`\n✗ ${url}: ${e.message}`);
  }
}

// Download in batches of 4
const BATCH = 4;
for (let i = 0; i < assets.length; i += BATCH) {
  await Promise.all(assets.slice(i, i + BATCH).map(([url, dest]) => download(url, dest)));
}
console.log('\nDone!');
