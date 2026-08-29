import { chromium } from 'playwright'
const browser = await chromium.launch({ channel: 'chrome' })
const ctx = await browser.newContext({ viewport:{width:390,height:844}, reducedMotion:'reduce' })
const page = await ctx.newPage()
await page.goto('http://localhost:5173',{waitUntil:'networkidle'})
await page.evaluate(()=>document.fonts?.ready); await page.waitForTimeout(400)
const shots = {
  'm-about': '#sobre',
  'm-contact': '#contato',
}
for (const [name, sel] of Object.entries(shots)) {
  await page.evaluate((s)=>document.querySelector(s).scrollIntoView(), sel)
  await page.waitForTimeout(300)
  await page.screenshot({path:`.impeccable/review/${name}.png`})
  console.log('shot', name)
}
await browser.close()
