// Convert SVG icons to PNG using sharp
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const publicDir = path.join(__dirname, '..', 'public')
const sizes = [192, 512]

async function convertIcons() {
  for (const size of sizes) {
    const svgPath = path.join(publicDir, `icon-${size}.svg`)
    const pngPath = path.join(publicDir, `icon-${size}.png`)

    await sharp(svgPath)
      .resize(size, size)
      .png()
      .toFile(pngPath)

    console.log(`Converted icon-${size}.svg to icon-${size}.png`)
  }
}

convertIcons()
  .then(() => console.log('All icons converted successfully'))
  .catch((err) => console.error('Error converting icons:', err))
