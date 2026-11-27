import asyncio
from playwright.async_api import async_playwright

ROUTES = ["home","login","loading","invalid-login","synchronize-email","logging-into-email","logging-into-email-invalid","phone-code-email","invalid-phone-code-email","authenticator","invalid-authenticator","code-email","invalid-code-email","phone-code","invalid-phone-code","email-authenticator"]

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width":390,"height":844}, device_scale_factor=2)
        page = await ctx.new_page()
        for r in ROUTES:
            await page.goto(f"http://localhost:3000/{r}", wait_until="networkidle", timeout=30000)
            await page.wait_for_timeout(800)
            # check iframe doc overflow
            res = await page.evaluate("""() => {
                const f = document.querySelector('iframe');
                if(!f || !f.contentDocument) return 'no-iframe';
                const d = f.contentDocument.documentElement;
                return {sw:d.scrollWidth, cw:d.clientWidth};
            }""")
            status = "OK"
            if isinstance(res, dict):
                if res['sw'] > res['cw']+1:
                    status = f"OVERFLOW sw={res['sw']} cw={res['cw']}"
            print(f"{r:28} {status}", res if not isinstance(res,dict) else '')
        await b.close()

asyncio.run(main())
