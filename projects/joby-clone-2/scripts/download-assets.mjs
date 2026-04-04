import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const PUBLIC = path.resolve('public');

const assets = [
  // Logo
  { url: 'https://www.jobyaviation.com/images/logo-animated-256.webp?v=1775164230834', dest: 'images/logo-animated.webp' },
  // Hero video poster / screenshot (external CDN)
  // Experience section images (Sanity CDN - full quality)
  { url: 'https://cdn.sanity.io/images/h5mp19kq/production/a0cc53073d2e2741323b19bcc392b9b3fc5ea888-1444x1700.jpg?w=800&fm=webp&q=85', dest: 'images/experience-1.webp' },
  { url: 'https://cdn.sanity.io/images/h5mp19kq/production/050c5279f4a679a956a0e3d341f45723e624a5a0-1444x1700.jpg?w=800&fm=webp&q=85', dest: 'images/experience-2.webp' },
  { url: 'https://cdn.sanity.io/images/h5mp19kq/production/7fe8973f1288a16f20520b22e08b67c5f5ac6e2b-1444x1700.jpg?w=800&fm=webp&q=85', dest: 'images/experience-3.webp' },
  // App section images
  { url: 'https://cdn.sanity.io/images/h5mp19kq/production/896d4d7e05eb68acd3a49e98a0ff6f9804601e84-2248x1450.jpg?w=800&fm=webp&q=85', dest: 'images/app-screen.webp' },
  { url: 'https://cdn.sanity.io/images/h5mp19kq/production/b3c6200a3053e3e70ece01b29cd0f58604fa692b-515x747.jpg?w=400&fm=webp&q=85', dest: 'images/app-mobile.webp' },
  { url: 'https://cdn.sanity.io/images/h5mp19kq/production/86c8943db1672031c0b73ddbf16932e3aed15a4b-552x552.jpg?w=400&fm=webp&q=85', dest: 'images/app-icon.webp' },
  // Technology section
  { url: 'https://cdn.sanity.io/images/h5mp19kq/production/fe892333d4c9a9934032f2ee33da32ac0f61211f-3200x1800.jpg?w=1200&fm=webp&q=85', dest: 'images/technology-bg.webp' },
  { url: 'https://cdn.sanity.io/images/h5mp19kq/production/bb2f1438061f5e799944e0ba4659720790d63bf2-1125x2250.jpg?rect=0,0,914,2250&w=600&fm=webp&q=85', dest: 'images/technology-mobile.webp' },
  // News articles
  { url: 'https://cdn.sanity.io/images/h5mp19kq/production/9d0764b417418fd1c74f84ceffb1197d861b40fa-6000x4000.jpg?w=800&fm=webp&q=85', dest: 'images/news-1.webp' },
  { url: 'https://cdn.sanity.io/images/h5mp19kq/production/6f800281b68a999fc7fac710d5abf199282530df-3000x2000.jpg?w=800&fm=webp&q=85', dest: 'images/news-2.webp' },
  { url: 'https://cdn.sanity.io/images/h5mp19kq/production/411a712308f1858194b3efd9368aa51dad54a599-6000x4000.jpg?w=800&fm=webp&q=85', dest: 'images/news-3.webp' },
];

async function download(url, dest) {
  const fullPath = path.join(PUBLIC, dest);
  const dir = path.dirname(fullPath);
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
  try {
    const res = await fetch(url);
    if (!res.ok) { console.warn(`SKIP ${dest}: HTTP ${res.status}`); return; }
    const buf = await res.arrayBuffer();
    await writeFile(fullPath, Buffer.from(buf));
    console.log(`✓ ${dest}`);
  } catch (e) {
    console.warn(`FAIL ${dest}: ${e.message}`);
  }
}

// Batch 4 at a time
for (let i = 0; i < assets.length; i += 4) {
  await Promise.all(assets.slice(i, i + 4).map(a => download(a.url, a.dest)));
}
console.log('Done.');
