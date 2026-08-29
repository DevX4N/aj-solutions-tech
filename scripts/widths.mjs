import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
mkdirSync('.impeccable/review', { recursive: true })
const browser = await chromium.launch({ channel: 'chrome' })
for (const w of [390, 640, 768, 900]) {
  const ctx = await browser.newContext({ viewport:{width:w,height:900}, reducedMotion:'reduce' })
  const page = await ctx.newPage()
  await page.goto('http://localhost:5173',{waitUntil:'networkidle'})
  await page.evaluate(()=>document.fonts?.ready); await page.waitForTimeout(400)
  await page.screenshot({path:`.impeccable/review/w-${w}.png`})
  console.log('shot', w)
  await ctx.close()
}
await browser.close()
