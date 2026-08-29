import { chromium } from 'playwright'
const browser = await chromium.launch({ channel: 'chrome' })
const ctx = await browser.newContext({ viewport:{width:1440,height:900}, reducedMotion:'reduce', deviceScaleFactor:2 })
const page = await ctx.newPage()
await page.goto('http://localhost:5173',{waitUntil:'networkidle'})
await page.evaluate(()=>document.fonts?.ready); await page.waitForTimeout(500)
const box = await page.evaluate(()=>{
  const el=[...document.querySelectorAll('#inicio div')].find(d=>(d.className||'').includes('rounded-[30px]'))
  const r=el.getBoundingClientRect()
  return {x:r.left-16,y:r.top-16,width:r.width+32,height:r.height+32}
})
await page.screenshot({path:'.impeccable/review/phone-closeup.png', clip:box})
console.log('done', JSON.stringify(box))
await browser.close()
