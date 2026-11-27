import sys, asyncio
from playwright.async_api import async_playwright

ROUTES = sys.argv[1:] or ["login"]

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width":390,"height":844}, device_scale_factor=2)
        page = await ctx.new_page()
        for r in ROUTES:
            url = f"http://localhost:3000/{r}"
            try:
                await page.goto(url, wait_until="networkidle", timeout=30000)
                await page.wait_for_timeout(1200)
                await page.screenshot(path=f"/tmp/m_{r}.png", full_page=True)
                print("shot", r)
            except Exception as e:
                print("ERR", r, e)
        await b.close()

asyncio.run(main())
