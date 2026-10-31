/**
 * Rasterise assets/banner.html -> assets/banner.png at 2x.
 *
 * Run with a playwright-core that has a Chromium available, e.g.:
 *   node assets/render.mjs
 * (set PLAYWRIGHT_CHROMIUM to an explicit browser binary if needed)
 */
import { chromium } from "playwright-core";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));

const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM || undefined,
});
const page = await browser.newPage({
  viewport: { width: 1200, height: 240 },
  deviceScaleFactor: 2,
});
await page.goto("file://" + path.join(here, "banner.html"));
await page.screenshot({ path: path.join(here, "banner.png") });
await browser.close();
console.log("wrote assets/banner.png");
