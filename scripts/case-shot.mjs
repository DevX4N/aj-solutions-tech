import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

// Captura o print real de um projeto publicado para usar no preview do case.
// Uso: SHOT_URL=<url> SHOT_OUT=<arquivo> node scripts/case-shot.mjs
const URL = process.env.SHOT_URL || 'https://aether-ochre-iota.vercel.app'
const OUT = process.env.SHOT_OUT || 'public/projects/aether.jpg'
const W = Number(process.env.SHOT_W || 1600)
const H = Number(process.env.SHOT_H || 1000)

mkdirSync('public/projects', { recursive: true })

const browser = await chromium.launch({ channel: 'chrome' })
const ctx = await browser.newContext({
  viewport: { width: W, height: H },
  deviceScaleFactor: 2,
})
const page = await ctx.newPage()
await page.goto(URL, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts?.ready)
// deixa o hero 3D/orbital assentar num quadro representativo
await page.waitForTimeout(2500)
await page.screenshot({ path: OUT, type: 'jpeg', quality: 92 })
console.log('captured', OUT)
await ctx.close()
await browser.close()
