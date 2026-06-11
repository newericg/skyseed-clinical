import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = 'public';
const targets = [
  { file: 'assets/hero/hero-desktop.jpeg', maxWidth: 1920, quality: 78 },
  { file: 'assets/hero/hero-mobile.jpeg', maxWidth: 1080, quality: 78 },
  { file: 'assets/about/about-us.jpeg', maxWidth: 1120, quality: 78 },
  { file: 'assets/blogs/magnesio-web.jpeg', maxWidth: 960, quality: 76 },
  { file: 'assets/blogs/magnesio-mobile.jpeg', maxWidth: 640, quality: 76 },
  { file: 'assets/blogs/sono-web.jpeg', maxWidth: 960, quality: 76 },
  { file: 'assets/blogs/sono-mobile.jpeg', maxWidth: 640, quality: 76 },
  { file: 'assets/blogs/microbioma-web.jpeg', maxWidth: 960, quality: 76 },
  { file: 'assets/blogs/microbioma-mobile.jpeg', maxWidth: 640, quality: 76 },
  { file: 'bg-sky.png', maxWidth: 1920, quality: 80 },
];

for (const target of targets) {
  const inputPath = path.join(publicDir, target.file);
  if (!fs.existsSync(inputPath)) {
    console.warn('Skip missing:', inputPath);
    continue;
  }

  const ext = path.extname(target.file).toLowerCase();
  const base = target.file.slice(0, -ext.length);
  const webpPath = path.join(publicDir, `${base}.webp`);

  const pipeline = sharp(inputPath).resize({ width: target.maxWidth, withoutEnlargement: true });

  if (ext === '.png') {
    await pipeline.webp({ quality: target.quality }).toFile(webpPath);
    const optimizedPng = path.join(publicDir, target.file);
    await sharp(inputPath)
      .resize({ width: target.maxWidth, withoutEnlargement: true })
      .png({ quality: 80, compressionLevel: 9 })
      .toFile(optimizedPng + '.tmp');
    fs.renameSync(optimizedPng + '.tmp', optimizedPng);
  } else {
    await pipeline.jpeg({ quality: target.quality, mozjpeg: true }).toFile(inputPath + '.tmp');
    fs.renameSync(inputPath + '.tmp', inputPath);
    await sharp(inputPath).webp({ quality: target.quality }).toFile(webpPath);
  }

  const inSize = fs.statSync(inputPath).size;
  const webpSize = fs.existsSync(webpPath) ? fs.statSync(webpPath).size : 0;
  console.log(`${target.file}: ${Math.round(inSize / 1024)}KB, webp: ${Math.round(webpSize / 1024)}KB`);
}

console.log('Image optimization complete.');
