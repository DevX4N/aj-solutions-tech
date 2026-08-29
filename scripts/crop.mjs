import { chromium } from 'playwright'
const browser = await chromium.launch({ channel: 'chrome' })
const ctx = await browser.newContext({ viewport:{width:1440,height:900}, reducedMotion:'reduce' })
const page = await ctx.newPage()
await page.goto('http://localhost:5173',{waitUntil:'networkidle'})
await page.evaluate(()=>document.fonts?.ready); await page.waitForTimeout(400)
// metrics band: find the section containing "100%"
const shots = [
  {name:'crop-services', y:2300},
  {name:'crop-metrics', y:6300},
]
for(const s of shots){
  await page.evaluate((y)=>window.scrollTo(0,y), s.y)
  await page.waitForTimeout(300)
  await page.screenshot({path:`.impeccable/review/${s.name}.png`})
  console.log('shot',s.name)
}
await browser.close()
