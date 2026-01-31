// Simple icon generator for PWA
// Creates basic colored icons with text

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sizes = [192, 512]

function generateSVG(size) {
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#4f46e5;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.1}" fill="url(#bg)"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.4}" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">123</text>
</svg>`
}

const publicDir = path.join(__dirname, '..', 'public')

sizes.forEach((size) => {
  const svg = generateSVG(size)
  const filename = `icon-${size}.svg`
  fs.writeFileSync(path.join(publicDir, filename), svg)
  console.log(`Generated ${filename}`)
})

console.log('\nSVG icons generated. To convert to PNG, install sharp:')
console.log('npm install --save-dev sharp')
console.log('Then use an online converter or image editor to create PNG versions')
