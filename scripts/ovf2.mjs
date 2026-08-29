import { chromium } from 'playwright'
const browser = await chromium.launch({ channel: 'chrome' })
const ctx = await browser.newContext({ viewport:{width:390,height:844}, reducedMotion:'reduce' })
const page = await ctx.newPage()
await page.goto('http://localhost:5173',{waitUntil:'networkidle'})
await page.waitForTimeout(400)
const res = await page.evaluate(()=>{
  const vw = window.innerWidth
  const escaping = []
  document.querySelectorAll('*').forEach(el=>{
    const r = el.getBoundingClientRect()
    if (r.right <= vw + 1) return
    // walk ancestors: is it clipped before body?
    let p = el.parentElement, clipped = false
    while (p && p !== document.body) {
      const o = getComputedStyle(p).overflowX
      if (o === 'hidden' || o === 'clip') { clipped = true; break }
      p = p.parentElement
    }
    if (!clipped) escaping.push({ tag: el.tagName, cls:(el.className?.toString?.()||'').slice(0,70), right: Math.round(r.right), w: Math.round(r.width), sectionId: el.closest('section')?.id||'—' })
  })
  return { vw, docW: document.documentElement.scrollWidth, escaping: escaping.sort((a,b)=>b.right-a.right).slice(0,8) }
})
console.log(JSON.stringify(res,null,1))
await browser.close()
