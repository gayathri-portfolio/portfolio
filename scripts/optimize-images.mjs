import sharp from 'sharp'
import { readdir } from 'node:fs/promises'
import path from 'node:path'

const DIR = path.resolve('public/case-studies/ultragym-pro')

async function main() {
  const files = (await readdir(DIR)).filter((f) => f.endsWith('.png'))
  for (const file of files) {
    const inPath = path.join(DIR, file)
    const outPath = path.join(DIR, file.replace('.png', '.webp'))
    const meta = await sharp(inPath).metadata()
    const targetWidth = Math.min(meta.width, 2400)
    await sharp(inPath)
      .resize({ width: targetWidth })
      .webp({ quality: 82 })
      .toFile(outPath)
    console.log('Optimized', outPath)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
