import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const URL = process.env.SHOOT_URL || 'http://localhost:5173'
const outDir = '.impeccable/review'
mkdirSync(outDir, { recursive: true })

const targets = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]

const browser = await chromium.launch({ channel: 'chrome' })
for (const t of targets) {
  const ctx = await browser.newContext({
    viewport: { width: t.width, height: t.height },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce', // settle entrance motion for valid captures
  })
  const page = await ctx.newPage()
  await page.goto(URL, { waitUntil: 'networkidle' })
  // let fonts + lazy content settle
  await page.evaluate(() => document.fonts?.ready)
  await page.waitForTimeout(600)
  // scroll through to trigger whileInView reveals, then back to top
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 90))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${outDir}/${t.name}.png`, fullPage: true })
  console.log(`captured ${t.name}.png`)
  await ctx.close()
}
await browser.close()
console.log('done')
