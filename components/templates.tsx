import { getPage, isJunkText, pages } from "@/lib/content";
import { tr } from "@/lib/i18n";
import { resolveHref } from "@/lib/links";
import { editorialPlate, galleries, galleryPlates, keywordPlate, pageImages, realPlate } from "@/lib/media";
import { packageRest, parsePackages } from "@/lib/packages";
import type { Block } from "@/lib/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Bi } from "./bi";
import { Blocks } from "./blocks";
import { ContactForm } from "./contact-form";
import { GalleryGrid } from "./lightbox";
import { Ledger } from "./ledger";
import { PlateView } from "./plate";
import { Rich } from "./rich";
import { SeedCard } from "./seed";
import { SpaceShowcase } from "./showcase";
import { TitleSync } from "./title-sync";
import { modelHome } from "@/lib/home";

function Head({ slug, plate }: { slug: string; plate: ReturnType<typeof keywordPlate> }) {
  const page = getPage(slug);
  const h1 = page.blocks.find((b) => b.t === "h1")?.text || page.title;
  return (
    <header className="chapter" style={{ paddingBottom: 12 }}>
      <TitleSync pt={page.title} en={tr(page.title)} />
      <div className="shell">
        <PlateView plate={plate} sizes="100vw" priority ratio="16 / 8" />
        <h1><Bi text={h1} /></h1>
      </div>
    </header>
  );
}

function related(slug: string) {
  const page = getPage(slug);
  const hrefs = new Set<string>();
  for (const b of page.blocks) {
    const candidates = [b.href, ...(b.links || []).map((l) => l.href)].filter(Boolean) as string[];
    for (const href of candidates) {
      const r = resolveHref(href);
      if (!r.external && r.href.startsWith("/") && r.href !== `/${slug}` && r.href !== "/") hrefs.add(r.href.slice(1));
    }
  }
  return [...hrefs].slice(0, 3);
}

export function JournalPage({ slug }: { slug: string }) {
  const page = getPage(slug);
  const own = pageImages(page.blocks, 3);
  const blob = `${slug} ${page.title} ${page.blocks.map((b) => b.text || "").join(" ").slice(0, 400)}`;
  const header = own[0] ? realPlate(own[0], "A QUINTA") : keywordPlate(blob);
  const rel = related(slug);
  return (
    <article>
      <Head slug={slug} plate={header} />
      <div className="shell" style={{ paddingBottom: 72 }}>
        <Blocks blocks={page.blocks.filter((b) => b.t !== "h1")} />
        {rel.length ? (
          <div className="seed-grid" style={{ marginTop: 36 }}>
            {rel.map((s) => {
              const target = pages[s];
              if (!target) return null;
              const img = pageImages(target.blocks, 1)[0];
              const plate = img ? realPlate(img, "A QUINTA") : keywordPlate(s + " " + target.title);
              const title = target.blocks.find((b) => b.t === "h1")?.text || target.title;
              return <SeedCard key={s} href={`/${s}`} src={plate.src} alt={title} title={<Bi text={title} />} cat={<Bi text="Quinta" />} kind="navy" />;
            })}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function QuintaHub() {
  const page = getPage("a-quinta-do-torneiro");
  const home = modelHome(getPage("home").blocks);
  const first = page.blocks.find((b) => b.t === "p")?.text || "";
  const subtitle = first.split(/(?<=\.)\s/)[0] || first;
  const intro: Block[] = [];
  for (const b of page.blocks) {
    if (b.t === "h3") break;
    intro.push(b);
  }
  return (
    <article>
      <TitleSync pt={page.title} en={tr(page.title)} />
      <header className="chapter" style={{ paddingBottom: 0 }}>
        <div className="shell prose">
          <PlateView plate={realPlate("/media/location/historia-03.jpg", "A QUINTA · HISTÓRIA")} sizes="100vw" priority />
          <Blocks blocks={intro} images={false} />
        </div>
      </header>
      <section className="chapter">
        <div className="shell">
          <SpaceShowcase cards={home.spaces} subtitle={subtitle} />
        </div>
      </section>
    </article>
  );
}

const RAIL = [
  { y: "1734", t: "Sabemos que foi em 1734 pertenceu a Feliciana Teresa da Mota mas nada mais sabemos sobre esta pessoa." },
  { y: "1784", t: "Em 1784, sabe-se que a Quinta do Torneiro pertenceu a Feliciana Teresa da Mota." },
  { y: "1820", t: "No Portao da Quinta do Torneiro, consta uma inscrição datada de 1820 com o nome de Isidoro Silva e ao lado uma fonte mandada construir pelo mesmo." },
];

export function HistoryPage() {
  const page = getPage("historia-da-quinta-do-torneiro");
  return (
    <article>
      <Head slug="historia-da-quinta-do-torneiro" plate={realPlate("/media/location/historia-01.jpg", "A QUINTA · HISTÓRIA")} />
      <div className="shell" style={{ paddingBottom: 72 }}>
        {RAIL.map((item) => (
          <div className="history-rail" key={item.y}>
            <b>{item.y}</b>
            <p style={{ margin: 0 }}><Bi text={item.t} /></p>
          </div>
        ))}
        <Blocks blocks={page.blocks.filter((b) => b.t !== "h1")} />
      </div>
    </article>
  );
}

export function FaqPage() {
  const page = getPage("faqs-quinta-do-torneiro-portugues");
  const items: { n: string; q: string; a: Block[] }[] = [];
  let cur: { n: string; q: string; a: Block[] } | null = null;
  for (const b of page.blocks) {
    const text = b.text?.trim() || "";
    const m = text.match(/^(\d+)\.\s/);
    if (b.t === "p" && m) {
      cur = { n: m[1], q: text, a: [] };
      items.push(cur);
    } else if (cur && b.t === "p") cur.a.push(b);
  }
  return (
    <article>
      <Head slug="faqs-quinta-do-torneiro-portugues" plate={realPlate("/media/location/capela-01.jpg", "CAPELA")} />
      <div className="shell" style={{ paddingBottom: 80 }}>
        <Blocks blocks={page.blocks.filter((b) => b.t === "h1" || b.t === "h2")} images={false} />
        <Accordion type="single" collapsible>
          {items.map((item) => (
            <AccordionItem key={item.n} value={item.n} id={`q-${item.n}`}>
              <AccordionTrigger><Bi text={item.q} /></AccordionTrigger>
              <AccordionContent>
                {item.a.map((p, i) => <Rich key={i} text={p.text || ""} links={p.links} />)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </article>
  );
}

export function ContactPage() {
  const page = getPage("contato-portugal");
  return (
    <article>
      <TitleSync pt={page.title} en={tr(page.title)} />
      <header className="chapter">
        <div className="shell">
          <div className="seed-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <PlateView plate={editorialPlate("/media/plates/contact-courtyard.jpg", "Pátio")} sizes="(min-width: 800px) 45vw, 100vw" priority />
            <PlateView plate={realPlate("/media/location/entrada-01.jpg", "JARDIM DA ENTRADA")} sizes="(min-width: 800px) 45vw, 100vw" />
          </div>
          <Blocks blocks={page.blocks} images={false} />
          <ContactForm id="contato" showTitle={false} />
        </div>
      </header>
    </article>
  );
}

export function LocationPage() {
  const page = getPage("localizacao-quinta-do-torneiro");
  const lines = page.blocks.filter((b) => b.t === "p");
  const distances = lines.filter((b) => (b.text || "").trim().startsWith("-"));
  const prose = page.blocks.filter((b) => !(b.t === "p" && (b.text || "").trim().startsWith("-")));
  return (
    <article>
      <Head slug="localizacao-quinta-do-torneiro" plate={realPlate("/media/location/entrada-01.jpg", "JARDIM DA ENTRADA")} />
      <div className="shell" style={{ paddingBottom: 72 }}>
        <Blocks blocks={prose.filter((b) => b.t !== "h1")} images={false} />
        <div className="distances">
          {distances.map((d, i) => <Rich key={i} text={d.text || ""} />)}
        </div>
        <p>
          <a href="https://goo.gl/maps/ccY2N3NcF6HZS4RL6" target="_blank" rel="noopener noreferrer">
            <Bi text="Nos encontre no Google Maps" />
          </a>
        </p>
      </div>
    </article>
  );
}

export function GalleryHub() {
  const page = getPage("galeria-portugal");
  const slugs = Object.keys(galleries);
  return (
    <article>
      <Head slug="galeria-portugal" plate={realPlate("/media/location/nobre-01.jpg", "SALÃO NOBRE")} />
      <div className="shell" style={{ paddingBottom: 72 }}>
        <Blocks blocks={page.blocks.filter((b) => b.t !== "h1" && b.t !== "img")} images={false} />
        <div className="seed-grid">
          {slugs.map((slug) => {
            const plates = galleryPlates(slug);
            const title = getPage(slug).blocks.find((b) => b.t === "h1")?.text || slug;
            return <SeedCard key={slug} href={`/${slug}`} src={plates[0].src} alt={title} title={<Bi text={title} />} cat={<Bi text="Galeria" />} kind="brand" />;
          })}
        </div>
      </div>
    </article>
  );
}

export function GalleryPage({ slug }: { slug: string }) {
  const page = getPage(slug);
  const plates = galleryPlates(slug);
  const live = `https://www.quintadotorneiro-eventos.com/${slug}`;
  return (
    <article>
      <Head slug={slug} plate={plates[0]} />
      <div className="shell" style={{ paddingBottom: 72 }}>
        <Blocks blocks={page.blocks.filter((b) => b.t !== "h1" && b.t !== "img")} images={false} />
        <GalleryGrid plates={plates} />
        {(slug.includes("suite") || slug.includes("quarto") || slug.includes("praia")) ? (
          <p>
            <a href={live} target="_blank" rel="noopener noreferrer">
              <span className="lang-pt">Ver a galeria em quintadotorneiro-eventos.com</span>
              <span className="lang-en">View the gallery on quintadotorneiro-eventos.com</span>
            </a>
          </p>
        ) : null}
      </div>
    </article>
  );
}

const LEDGER = new Set(["pacotes-precos-casamentos-portugal", "pacotes-de-casamento-2026", "pacotes-de-casamento-2027"]);
const ACCORDION = new Set([
  "detalhes-pacotes-de-casamento",
  "detalhes-pacotes-mini-casamento",
  "menu-casamento-quinta-do-torneiro",
  "menu-mini-casamento-quinta-do-torne",
  "pacote-casamento-80-sem-estadia",
  "pacote-elopement-wedding-portugal",
]);

export function PackagePage({ slug }: { slug: string }) {
  const page = getPage(slug);
  const y2026 = parsePackages(getPage("pacotes-de-casamento-2026").blocks);
  const y2027 = parsePackages(getPage("pacotes-de-casamento-2027").blocks);
  const rest = slug === "pacotes-precos-casamentos-portugal"
    ? page.blocks
    : packageRest(page.blocks);
  return (
    <article>
      <Head slug={slug} plate={editorialPlate("/media/plates/packages-stilllife.jpg", "Preçário")} />
      <div className="shell" style={{ paddingBottom: 28 }}>
        <PlateView plate={realPlate("/media/location/nobre-03.jpg", "SALÃO NOBRE")} sizes="100vw" />
      </div>
      <section id="pacotes" className="chapter anchor" style={{ paddingTop: 12 }}>
        <div className="shell">
          <Ledger y2026={y2026} y2027={y2027} initial={slug.endsWith("2027") ? 2027 : 2026} />
        </div>
      </section>
      <section id="detalhes" className="chapter anchor" style={{ paddingTop: 0 }}>
        <div className="shell">
          {ACCORDION.has(slug) ? <SectionAccordion blocks={page.blocks} /> : <Blocks blocks={rest.filter((b) => b.t !== "img" && b.t !== "h1")} images={false} />}
        </div>
      </section>
    </article>
  );
}

function SectionAccordion({ blocks }: { blocks: Block[] }) {
  const heads = blocks.filter((b) => b.t === "h2");
  const sections: { title: string; body: Block[] }[] = [];
  let cur: { title: string; body: Block[] } | null = null;
  for (const b of blocks) {
    if (b.t === "h6" || (b.t === "h3" && b.text)) {
      cur = { title: b.text || "", body: [] };
      sections.push(cur);
    } else if (cur && b.t !== "h1" && b.t !== "h2" && b.t !== "img") cur.body.push(b);
  }
  const loose = blocks.filter((b) => {
    if (b.t === "h1" || b.t === "h2" || b.t === "h6" || b.t === "img") return false;
    return !sections.some((s) => s.body.includes(b) || s.title === b.text);
  });
  return (
    <>
      <Blocks blocks={heads} images={false} />
      <Blocks blocks={loose.filter((b) => !isJunkText(b.text) && b.t === "p").slice(0, 4)} images={false} />
      <Accordion type="multiple">
        {sections.filter((s) => s.title).map((s, i) => (
          <AccordionItem key={s.title + i} value={`${i}`}>
            <AccordionTrigger><Bi text={s.title} /></AccordionTrigger>
            <AccordionContent>
              <Blocks blocks={s.body} images={false} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

export function isLedgerSlug(slug: string) {
  return LEDGER.has(slug);
}
export function isAccordionSlug(slug: string) {
  return ACCORDION.has(slug);
}

export function BlogPage() {
  const page = getPage("blog");
  const cats = page.blocks.filter((b) => b.t === "li");
  const posts: { title: string; src: string }[] = [];
  let pending: string | null = null;
  for (const b of page.blocks) {
    if (b.t === "img" && b.id) pending = `/media/wix/${b.id}.webp`;
    if (b.t === "h2" && b.text) {
      posts.push({ title: b.text.trim(), src: pending || "/media/location/terraco-01.jpg" });
      pending = null;
    }
  }
  return (
    <article>
      <Head slug="blog" plate={realPlate("/media/location/frances-03.jpg", "JARDIM FRANCÊS")} />
      <div className="shell" style={{ paddingBottom: 72 }}>
        <ul>
          {cats.map((c) => {
            const href = c.links?.[0]?.href || "https://www.quintadotorneiro-eventos.com/blog";
            const r = resolveHref(href);
            return (
              <li key={c.text}>
                <a href={r.external ? href : r.href} target={r.external ? "_blank" : undefined} rel={r.external ? "noopener noreferrer" : undefined}>
                  <Bi text={c.text || ""} />
                </a>
              </li>
            );
          })}
        </ul>
        <div className="seed-grid">
          {posts.map((p) => (
            <SeedCard
              key={p.title}
              href="https://www.quintadotorneiro-eventos.com/blog"
              external
              src={p.src}
              alt={p.title}
              title={<Bi text={p.title} />}
              cat={<Bi text="Blog" />}
              kind="navy"
            />
          ))}
        </div>
      </div>
    </article>
  );
}

export const GALLERY_SLUGS = new Set(Object.keys(galleries));

export function DetailPage({ slug }: { slug: string }) {
  const page = getPage(slug);
  return (
    <article>
      <Head slug={slug} plate={realPlate("/media/location/nobre-04.jpg", "SALÃO NOBRE")} />
      <section id="detalhes" className="chapter anchor" style={{ paddingTop: 0 }}>
        <div className="shell">
          <SectionAccordion blocks={page.blocks} />
        </div>
      </section>
    </article>
  );
}
