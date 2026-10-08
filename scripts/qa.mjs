import { chromium } from "playwright";
import { mkdir } from "fs/promises";

const base = "http://127.0.0.1:3456";
const out = "docs/qa";
await mkdir(out, { recursive: true });

const browser = await chromium.launch();
const hashes = ["a-quinta", "pacotes", "casa-senhorial", "espacos", "saloes", "eventos", "portugal", "filme", "contatos"];

async function shot(page, name) {
  await page.screenshot({ path: `${out}/${name}.png`, fullPage: false });
  console.log("shot", name);
}

async function fresh(width, height, init) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  if (init) await context.addInitScript(init);
  const page = await context.newPage();
  return { context, page };
}

// Opening at 1440 and 390. Capture before networkidle — the sequence ends in 2.4s.
for (const [w, h, tag] of [[1440, 900, "1440"], [390, 844, "390"]]) {
  const { context, page } = await fresh(w, h);
  const nav = page.goto(`${base}/?replay=1`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("[data-phase='lay']", { timeout: 8000 });
  await page.waitForTimeout(520);
  await shot(page, `open-lay-${tag}`);
  await page.waitForSelector("[data-phase='flip']", { timeout: 4000 });
  await page.waitForTimeout(280);
  await shot(page, `open-flip-${tag}`);
  await page.waitForFunction(() => !document.documentElement.classList.contains("qdt-opening"), null, { timeout: 5000 });
  await nav;
  await page.waitForSelector("img", { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(400);
  await shot(page, `home-top-after-open-${tag}`);
  await context.close();
}

const seen = () => {
  sessionStorage.setItem("qdt-open-seen", "1");
};

// Home hashes
for (const [w, h, tag] of [[1440, 900, "1440"], [390, 844, "390"]]) {
  const { context, page } = await fresh(w, h, seen);
  for (const id of hashes) {
    await page.goto(`${base}/#${id}`, { waitUntil: "load" });
    await page.waitForFunction((hashId) => {
      const el = document.getElementById(hashId);
      const nav = document.querySelector(".site-nav");
      if (!el || !nav) return false;
      const top = el.getBoundingClientRect().top;
      const expected = nav.getBoundingClientRect().bottom + 16;
      return Math.abs(top - expected) < 14;
    }, id, { timeout: 8000 });
    await page.waitForTimeout(150);
    await shot(page, `hash-${id}-${tag}`);
  }
  await context.close();
}

// Nav
{
  const { context, page } = await fresh(1440, 900, seen);
  await page.goto(base, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /A Quinta/i }).first().click();
  await page.waitForTimeout(200);
  await shot(page, "nav-aquinta-1440");
  await page.getByRole("button", { name: /Mais|More/i }).first().click();
  await page.waitForTimeout(200);
  await shot(page, "nav-mais-1440");
  await context.close();
}
for (const width of [1024, 1280]) {
  const { context, page } = await fresh(width, 800, seen);
  await page.goto(base, { waitUntil: "networkidle" });
  await shot(page, `nav-${width}`);
  await context.close();
}
{
  const { context, page } = await fresh(390, 844, seen);
  await page.goto(base, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Menu/i }).click();
  await page.waitForTimeout(200);
  await shot(page, "nav-phone-390");
  await context.close();
}

// Space
for (const [w, h, tag] of [[1440, 900, "1440"], [390, 844, "390"]]) {
  const { context, page } = await fresh(w, h, seen);
  await page.goto(`${base}/salao-nobre-quinta-do-torneiro`, { waitUntil: "networkidle" });
  await shot(page, `space-top-${tag}`);
  await page.goto(`${base}/salao-nobre-quinta-do-torneiro#galeria`, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  await shot(page, `space-galeria-${tag}`);
  await context.close();
}

// Ledger
for (const [w, h, tag] of [[1440, 900, "1440"], [390, 844, "390"]]) {
  const { context, page } = await fresh(w, h, seen);
  await page.goto(`${base}/pacotes-de-casamento-2026#pacotes`, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  await shot(page, `ledger-${tag}`);
  await context.close();
}

// FAQ
for (const [w, h, tag] of [[1440, 900, "1440"], [390, 844, "390"]]) {
  const { context, page } = await fresh(w, h, seen);
  await page.goto(`${base}/faqs-quinta-do-torneiro-portugues`, { waitUntil: "networkidle" });
  await page.locator("#q-1 button").click();
  await page.waitForTimeout(200);
  await shot(page, `faq-open-${tag}`);
  await context.close();
}

// Contato study note
for (const [w, h, tag] of [[1440, 900, "1440"], [390, 844, "390"]]) {
  const { context, page } = await fresh(w, h, seen);
  await page.goto(`${base}/contato-portugal`, { waitUntil: "networkidle" });
  const form = page.locator("main form").first();
  await form.locator("input[name='nome']").fill("Estudo");
  await form.locator("input[name='email']").fill("estudo@example.com");
  await form.locator("textarea[name='mensagem']").fill("Olá");
  await form.locator("button[type='submit']").click();
  await page.waitForSelector(".study-note");
  await shot(page, `contato-note-${tag}`);
  await context.close();
}

// Dark
for (const path of ["/", "/jardim-do-patio-quinta-portugal"]) {
  const { context, page } = await fresh(1440, 900, () => {
    sessionStorage.setItem("qdt-open-seen", "1");
    localStorage.setItem("qdt-theme", "dark");
  });
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(200);
  const name = path === "/" ? "dark-home-1440" : "dark-space-1440";
  await shot(page, name);
  const { context: c2, page: p2 } = await fresh(390, 844, () => {
    sessionStorage.setItem("qdt-open-seen", "1");
    localStorage.setItem("qdt-theme", "dark");
  });
  await p2.goto(base + path, { waitUntil: "networkidle" });
  await shot(p2, name.replace("1440", "390"));
  await context.close();
  await c2.close();
}

// EN
for (const path of ["/", "/capela-quinta-portugal"]) {
  const init = () => {
    sessionStorage.setItem("qdt-open-seen", "1");
    localStorage.setItem("qdt-lang", "en");
  };
  const { context, page } = await fresh(1440, 900, init);
  await page.goto(base + path, { waitUntil: "networkidle" });
  const name = path === "/" ? "en-home-1440" : "en-space-1440";
  await shot(page, name);
  await context.close();
  const { context: c2, page: p2 } = await fresh(390, 844, init);
  await p2.goto(base + path, { waitUntil: "networkidle" });
  await shot(p2, name.replace("1440", "390"));
  await c2.close();
}

// Journal
for (const [w, h, tag] of [[1440, 900, "1440"], [390, 844, "390"]]) {
  const { context, page } = await fresh(w, h, seen);
  await page.goto(`${base}/casamento-na-praia-portugal`, { waitUntil: "networkidle" });
  await shot(page, `journal-${tag}`);
  await context.close();
}

await browser.close();
console.log("qa done");
