const fs = require('node:fs');
const path = require('node:path');
const { root, openBrowser } = require('./millet-browser.cjs');

(async () => {
  const base = path.join(root, 'assets/images/millets');
  const manifest = JSON.parse(fs.readFileSync(path.join(base, 'prompts.json'), 'utf8'));
  const browser = await openBrowser();
  try {
    await browser.navigate('/__canvas');
    for (const asset of manifest.assets) {
      const exports = [
        { width: 480, height: 270, format: 'webp', quality: 0.85, name: 'grain-480.webp' },
        { width: 960, height: 540, format: 'webp', quality: 0.87, name: 'grain-960.webp' },
        { width: 1440, height: 810, format: 'webp', quality: 0.9, name: 'grain-1440.webp' },
        { width: 960, height: 540, format: 'jpeg', quality: 0.88, name: 'grain-960.jpg' },
        { width: 3840, height: 2160, format: 'jpeg', quality: 0.94, name: 'grain-4k-upscaled.jpg' }
      ];
      const source = '/assets/images/millets/' + asset.source;
      for (const spec of exports) {
        const output = await browser.evaluate(`(async () => {
          const image = new Image(); image.src = ${JSON.stringify(source)};
          await image.decode();
          const canvas = document.createElement('canvas');
          canvas.width = ${spec.width}; canvas.height = ${spec.height};
          const context = canvas.getContext('2d');
          context.imageSmoothingEnabled = true; context.imageSmoothingQuality = 'high';
          const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
          const w = image.naturalWidth * scale, h = image.naturalHeight * scale;
          context.drawImage(image, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
          return { width: image.naturalWidth, height: image.naturalHeight, data: canvas.toDataURL('image/${spec.format}', ${spec.quality}) };
        })()`);
        fs.writeFileSync(path.join(base, asset.id, spec.name), Buffer.from(output.data.split(',')[1], 'base64'));
        asset.nativeSize = [output.width, output.height];
      }
      asset.exports = exports.map(({ name, width, height }) => ({ path: asset.id + '/' + name, width, height, bytes: fs.statSync(path.join(base, asset.id, name)).size, upscaled: width > asset.nativeSize[0] }));
      console.log('Exported ' + asset.id + ': native ' + asset.nativeSize.join('x') + ', responsive WebP, JPEG fallback, labeled 4K upscale.');
    }
    fs.writeFileSync(path.join(base, 'prompts.json'), JSON.stringify(manifest, null, 2) + '\n');
  } finally { browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
