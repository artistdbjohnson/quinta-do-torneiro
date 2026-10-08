import Image from "next/image";
import Link from "next/link";
import { getPage } from "@/lib/content";
import { tr } from "@/lib/i18n";
import { editorialPlate, locationFiles, pageImages, realPlate, type Plate } from "@/lib/media";
import { ENFILADE, LINKS_BETWEEN, SPACES, spaceBySlug } from "@/lib/spaces";
import { Bi } from "./bi";
import { Blocks } from "./blocks";
import { Enfilade, type Door } from "./enfilade";
import { GalleryGrid } from "./lightbox";
import { PlateView } from "./plate";
import { SeedCard } from "./seed";
import { SunsetChip } from "./sunset-chip";
import { TitleSync } from "./title-sync";
import { ContactForm } from "./contact-form";

function galleryFor(slug: string, key: string): Plate[] {
  const space = spaceBySlug(slug);
  const page = getPage(slug);
  if (space?.editorial) {
    const own = pageImages(page.blocks, 4).map((src) => realPlate(src, space.caption));
    return [editorialPlate("/media/plates/suite-morning.jpg", space.title), ...own];
  }
  const locals = locationFiles(key).slice(0, 6).map((src) => realPlate(src, space?.caption || "A QUINTA"));
  const extra = pageImages(page.blocks, 3).map((src) => realPlate(src, space?.caption || "A QUINTA"));
  const merged = [...locals];
  for (const plate of extra) {
    if (!merged.some((m) => m.src === plate.src) && merged.length < 6) merged.push(plate);
  }
  return merged.length ? merged : [realPlate(locationFiles(key)[0] || "/media/location/historia-03.jpg", space?.caption || "A QUINTA")];
}

export function SpacePage({ slug }: { slug: string }) {
  const space = spaceBySlug(slug)!;
  const page = getPage(slug);
  const plates = galleryFor(slug, space.key);
  const header = plates[0];
  const links = (LINKS_BETWEEN[slug] || []).map((s) => spaceBySlug(s)!).filter(Boolean);
  const others = SPACES.filter((s) => s.slug !== slug);
  const doors: Door[] = ENFILADE.map((d) => ({
    slug: d.slug,
    titlePt: d.title,
    titleEn: tr(d.title),
    src: d.src,
    caption: `QUINTA DO TORNEIRO · ${d.caption}`,
    linePt: d.line,
    lineEn: tr(d.line),
  }));
  const sunsetLine = page.blocks.find((b) => b.text?.includes("Sul - Poente"));

  return (
    <article>
      <TitleSync pt={page.title} en={tr(page.title)} />
      <header id="espaco" className="chapter anchor" style={{ paddingBottom: 24 }}>
        <div className="inset-frame">
          <div style={{ position: "relative", height: 10 }}>
            <Image src="/media/logo/frieze-thin.jpg" alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
          </div>
          <PlateView plate={header} sizes="100vw" priority ratio="16 / 9" />
        </div>
        <div className="shell prose">
          <h1><Bi text={page.blocks.find((b) => b.t === "h1")?.text || space.title} /></h1>
          {space.sunset && sunsetLine ? (
            <p>
              <Bi text={sunsetLine.text || ""} /> <SunsetChip />
            </p>
          ) : null}
          <Blocks blocks={page.blocks.filter((b) => b.t !== "h1" && !(space.sunset && b.text?.includes("Sul - Poente")))} images={false} />
          {space.editorial ? (
            <p>
              <a href={`https://www.quintadotorneiro-eventos.com/${slug.includes("quarto") ? "galeria-quartos-portugal" : "galeria-suite-principal-portugal"}`} target="_blank" rel="noopener noreferrer">
                <span className="lang-pt">Ver a galeria em quintadotorneiro-eventos.com</span>
                <span className="lang-en">View the gallery on quintadotorneiro-eventos.com</span>
              </a>
            </p>
          ) : null}
        </div>
      </header>
      <section id="galeria" className="chapter anchor" style={{ paddingTop: 24 }}>
        <div className="shell">
          <h2><Bi text="Galeria" /></h2>
          <GalleryGrid plates={plates} />
        </div>
      </section>
      {slug === "salao-nobre-quinta-do-torneiro" ? <Enfilade anchored={false} doors={doors} headPt="Para grandes eventos, os salões da Quinta do Torneiro podem tornar-se um só." headEn={tr("Para grandes eventos, os salões da Quinta do Torneiro podem tornar-se um só.")} subPt="Ao abrir as portas, todos os cômodos ficam acessíveis e livres para circulação dos seus convidados." subEn={tr("Ao abrir as portas, todos os cômodos ficam acessíveis e livres para circulação dos seus convidados.")} /> : null}
      <section id="ligacoes" className="chapter anchor">
        <div className="shell">
          <h2><Bi text="Ligações" /></h2>
          <div className="seed-grid">
            {links.map((s) => {
              const file = s.editorial ? "/media/plates/suite-morning.jpg" : locationFiles(s.key)[0];
              return (
                <SeedCard
                  key={s.slug}
                  href={`/${s.slug}`}
                  src={file}
                  alt={s.title}
                  title={<Bi text={s.title} />}
                  cat={<Bi text={s.cat} />}
                  kind={s.pill}
                />
              );
            })}
          </div>
          <h2 style={{ marginTop: 48 }}><Bi text="Conheça os outros espaços" /></h2>
          <div className="seed-grid">
            {others.map((s) => {
              const file = s.editorial ? "/media/plates/suite-morning.jpg" : locationFiles(s.key)[0];
              return (
                <SeedCard key={s.slug} href={`/${s.slug}`} src={file} alt={s.title} title={<Bi text={s.title} />} cat={<Bi text={s.cat} />} kind={s.pill} />
              );
            })}
          </div>
        </div>
      </section>
      <section id="contato" className="chapter anchor">
        <div className="shell">
          <h2><Bi text="Contato" /></h2>
          <p><Link href="/contato-portugal"><Bi text="Contate a Quinta do Torneiro" /></Link></p>
          <ContactForm />
        </div>
      </section>
    </article>
  );
}
