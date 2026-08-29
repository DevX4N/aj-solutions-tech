import { chromium } from 'playwright'
const browser = await chromium.launch({ channel: 'chrome' })
const ctx = await browser.newContext({ viewport:{width:390,height:844}, reducedMotion:'reduce' })
const page = await ctx.newPage()
await page.goto('http://localhost:5173',{waitUntil:'networkidle'})
await page.waitForTimeout(400)
const offenders = await page.evaluate(()=>{
  const vw = window.innerWidth
  const out = []
  document.querySelectorAll('*').forEach(el=>{
    const r = el.getBoundingClientRect()
    if (r.right > vw + 1 || r.left < -1) {
      out.push({ tag: el.tagName, cls: (el.className?.toString?.()||'').slice(0,60), left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width) })
    }
  })
  return { vw, docW: document.documentElement.scrollWidth, offenders: out.slice(0,12) }
})
console.log(JSON.stringify(offenders,null,1))
await browser.close()
