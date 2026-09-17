import sharp from 'sharp'

// Removes a near-white background via edge-connected flood fill: only white-ish
// pixels reachable from the image border become transparent, so white pixels
// *inside* the subject (fur highlights, eye glints) are left alone.

const SRC = process.argv[2]
const OUT = process.argv[3]
const THRESHOLD = 235 // min R/G/B to be considered "background white"

async function main() {
  const img = sharp(SRC).ensureAlpha()
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info

  const isBgWhite = (i) => {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    return r >= THRESHOLD && g >= THRESHOLD && b >= THRESHOLD
  }

  const visited = new Uint8Array(width * height)
  const seedStack = []
  for (let x = 0; x < width; x++) {
    seedStack.push([x, 0], [x, height - 1])
  }
  for (let y = 0; y < height; y++) {
    seedStack.push([0, y], [width - 1, y])
  }

  while (seedStack.length) {
    const [x, y] = seedStack.pop()
    if (x < 0 || y < 0 || x >= width || y >= height) continue
    const idx = y * width + x
    if (visited[idx]) continue
    const pi = idx * channels
    if (!isBgWhite(pi)) continue
    visited[idx] = 1
    data[pi + 3] = 0 // alpha = 0
    seedStack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1])
  }

  await sharp(data, { raw: { width, height, channels } }).png().toFile(OUT)
  console.log('wrote', OUT)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
