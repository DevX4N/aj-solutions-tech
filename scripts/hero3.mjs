import { chromium } from 'playwright'
const browser = await chromium.launch({ channel: 'chrome' })
for (const [name,w,h] of [['hero-desktop',1440,900],['hero-tablet',820,1100],['hero-mobile',390,844]]) {
  const ctx = await browser.newContext({ viewport:{width:w,height:h}, reducedMotion:'reduce' })
  const page = await ctx.newPage()
  await page.goto('http://localhost:5173',{waitUntil:'networkidle'})
  await page.evaluate(()=>document.fonts?.ready); await page.waitForTimeout(500)
  await page.screenshot({path:`.impeccable/review/${name}.png`})
  // horizontal scroll check
  const overflow = await page.evaluate(()=>({docW:document.documentElement.scrollWidth, winW:window.innerWidth}))
  console.log(name, 'overflowX:', overflow.docW>overflow.winW ? 'YES '+overflow.docW+'>'+overflow.winW : 'no')
  await ctx.close()
}
await browser.close()
