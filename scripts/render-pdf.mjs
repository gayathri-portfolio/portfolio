import * as mupdf from 'mupdf'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const PDF_PATH = 'C:/Users/bhara/Desktop/Claude/UltraGym_Pro.pdf'
const OUT_DIR = path.resolve('public/case-studies/ultragym-pro')
const SCALE = 3

async function main() {
  const buf = await readFile(PDF_PATH)
  const doc = mupdf.Document.openDocument(buf, 'application/pdf')
  const n = doc.countPages()
  console.log('Pages:', n)

  for (let i = 0; i < n; i++) {
    const page = doc.loadPage(i)
    const pixmap = page.toPixmap(mupdf.Matrix.scale(SCALE, SCALE), mupdf.ColorSpace.DeviceRGB, false, true)
    const png = pixmap.asPNG()
    const outPath = path.join(OUT_DIR, `page-${String(i + 1).padStart(2, '0')}.png`)
    await writeFile(outPath, png)
    console.log('Wrote', outPath)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
