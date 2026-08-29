import { chromium } from 'playwright'
const browser = await chromium.launch({ channel: 'chrome' })
for (const [name,w] of [['mphone-390',390],['mphone-360',360]]) {
  const ctx = await browser.newContext({ viewport:{width:w,height:844}, reducedMotion:'reduce' })
  const page = await ctx.newPage()
  await page.goto('http://localhost:5173',{waitUntil:'networkidle'})
  await page.evaluate(()=>document.fonts?.ready); await page.waitForTimeout(400)
  const info = await page.evaluate(()=>{
    const ph=[...document.querySelectorAll('#inicio div')].find(d=>(d.className||'').includes('rounded-[30px]'))
    ph?.scrollIntoView({block:'center'})
    return null
  })
  await page.waitForTimeout(300)
  await page.screenshot({path:`.impeccable/review/${name}.png`})
  const clip = await page.evaluate(()=>{
    const ph=[...document.querySelectorAll('#inicio div')].find(d=>(d.className||'').includes('rounded-[30px]'))
    const r=ph.getBoundingClientRect()
    return {phoneLeft:Math.round(r.left), phoneRight:Math.round(r.right), vw:window.innerWidth, cutRight:r.right>window.innerWidth, cutLeft:r.left<0}
  })
  console.log(name, JSON.stringify(clip))
  await ctx.close()
}
await browser.close()
