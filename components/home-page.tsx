import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPage } from "@/lib/content";
import { modelHome } from "@/lib/home";
import { editorialPlate, realPlate } from "@/lib/media";
import { tr } from "@/lib/i18n";
import { ENFILADE } from "@/lib/spaces";
import { parsePackages } from "@/lib/packages";
import { Bi } from "./bi";
import { Rich } from "./rich";
import { PlateView } from "./plate";
import { SeedCard } from "./seed";
import { SpaceShowcase } from "./showcase";
import { Ledger } from "./ledger";
import { Enfilade, type Door } from "./enfilade";
import { Film } from "./film";
import { ContactForm } from "./contact-form";
import { TitleSync } from "./title-sync";

const RAIL = [
  ["01", "#a-quinta"],
  ["02", "#pacotes"],
  ["03", "#casa-senhorial"],
  ["04", "#espacos"],
  ["05", "#saloes"],
  ["06", "#eventos"],
  ["07", "#portugal"],
  ["08", "#filme"],
  ["09", "#contatos"],
];

function Chapter({ id, n, label, children }: { id: string; n: string; label: string; children: ReactNode }) {
  return (
    <section id={id} className="chapter anchor">
      <div className="shell">
        <div className="chapter-kicker">
          <span className="num">{n} —</span>
          <span className="chapter-label"><Bi text={label} /></span>
        </div>
        {children}
      </div>
    </section>
  );
}

export function HomePage() {
  const page = getPage("home");
  const home = modelHome(page.blocks);
  const quinta = getPage("a-quinta-do-torneiro");
  const first = quinta.blocks.find((b) => b.t === "p")?.text || "";
  const subtitle = first.split(/(?<=\.)\s/)[0] || first;
  const y2026 = parsePackages(getPage("pacotes-de-casamento-2026").blocks);
  const y2027 = parsePackages(getPage("pacotes-de-casamento-2027").blocks);
  const doors: Door[] = ENFILADE.map((d) => ({
    slug: d.slug,
    titlePt: d.title,
    titleEn: tr(d.title),
    src: d.src,
    caption: `QUINTA DO TORNEIRO · ${d.caption}`,
    linePt: d.line,
    lineEn: tr(d.line),
  }));
  const pkgPhotos = [
    "/media/location/eventos-03.jpg",
    "/media/location/nobre-02.jpg",
    "/media/location/frances-02.jpg",
  ];

  return (
    <>
      <TitleSync pt={page.title} en={tr(page.title)} />
      <nav className="rail" aria-label="Chapters">
        {RAIL.map(([n, href]) => (
          <a key={href} href={href}>{n}</a>
        ))}
      </nav>
      <section className="hero-screen">
        <div className="hero-frame">
          <div style={{ position: "relative", height: 10 }}>
            <Image src="/media/logo/frieze-thin.jpg" alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
          </div>
          <div className="hero-photo">
            <PlateView plate={realPlate("/media/location/entrada-01.jpg", "JARDIM DA ENTRADA")} sizes="100vw" priority ratio="auto" className="hero-fill" />
          </div>
          <div className="hero-copy shell">
            <span className="logo-plate">
              <Image src="/media/logo/cartouche-lisboa.jpg" alt="Quinta do Torneiro · Lisboa" width={148} height={128} />
            </span>
            <h1>{home.title}</h1>
            <span className="gilded" />
            <p className="hero-kicker"><Bi text={home.kicker} /></p>
            {home.intro[0] ? <Rich className="lede" text={home.intro[0].text || ""} links={home.intro[0].links} /> : null}
            <div className="hero-actions">
              <Link className="gold-pill" href="/contato-portugal"><Bi text="Contate a Quinta do Torneiro" /></Link>
              <a className="text-link" href="#pacotes"><Bi text="Pacotes de Casamento" /></a>
            </div>
          </div>
        </div>
      </section>

      <Chapter id="a-quinta" n="01" label="A Quinta">
        {home.intro.map((p, i) => <Rich key={i} text={p.text || ""} links={p.links} />)}
        <PlateView plate={realPlate("/media/location/historia-03.jpg", "A QUINTA · HISTÓRIA")} sizes="(min-width: 900px) 80vw, 100vw" />
      </Chapter>

      <Chapter id="pacotes" n="02" label="Pacotes">
        {home.packagesIntro ? <Rich text={home.packagesIntro.text || ""} links={home.packagesIntro.links} /> : null}
        <div className="seed-grid">
          {home.packageCards.map((card, i) => (
            <div key={card.title}>
              <SeedCard
                href={card.href}
                src={pkgPhotos[i] || pkgPhotos[0]}
                alt={card.title}
                title={<Bi text={card.title} />}
                cat={<Bi text="Pacotes" />}
                kind="navy"
              />
              <p><Link href={card.href}><Bi text={card.button || "Clique Aqui"} /></Link></p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 28 }}>
          <PlateView plate={editorialPlate("/media/plates/packages-stilllife.jpg", "Preçário")} sizes="(min-width: 900px) 80vw, 100vw" />
        </div>
        <div style={{ marginTop: 36 }}>
          <Ledger y2026={y2026} y2027={y2027} />
        </div>
      </Chapter>

      <Chapter id="casa-senhorial" n="03" label="A Casa Senhorial">
        <h2><Bi text={home.manorTitle} /></h2>
        {home.manor.map((p, i) => <Rich key={i} text={p.text || ""} links={p.links} />)}
        <div className="seed-grid">
          <PlateView plate={realPlate("/media/location/historia-01.jpg", "A QUINTA · HISTÓRIA")} sizes="(min-width: 900px) 33vw, 100vw" />
          <PlateView plate={realPlate("/media/location/historia-04.jpg", "A QUINTA · HISTÓRIA")} sizes="(min-width: 900px) 33vw, 100vw" />
          <PlateView plate={editorialPlate("/media/plates/azulejo-macro.jpg", "Azulejo")} sizes="(min-width: 900px) 33vw, 100vw" />
        </div>
        <p style={{ marginTop: 22 }}>
          <Link className="navy-pill" href="/a-quinta-do-torneiro"><Bi text={home.manorButton} /></Link>
        </p>
      </Chapter>

      <section id="espacos" className="chapter anchor">
        <div className="shell">
          <div className="chapter-kicker">
            <span className="num">04 —</span>
            <span className="chapter-label"><Bi text="Os Espaços" /></span>
          </div>
          <SpaceShowcase cards={home.spaces} subtitle={subtitle} />
        </div>
      </section>

      <div className="chapter" style={{ paddingBottom: 0 }}>
        <div className="shell">
          <div className="chapter-kicker">
            <span className="num">05 —</span>
            <span className="chapter-label"><Bi text="Os Salões" /></span>
          </div>
        </div>
      </div>
      <Enfilade
        doors={doors}
        headPt="Para grandes eventos, os salões da Quinta do Torneiro podem tornar-se um só."
        headEn={tr("Para grandes eventos, os salões da Quinta do Torneiro podem tornar-se um só.")}
        subPt="Ao abrir as portas, todos os cômodos ficam acessíveis e livres para circulação dos seus convidados."
        subEn={tr("Ao abrir as portas, todos os cômodos ficam acessíveis e livres para circulação dos seus convidados.")}
      />

      <Chapter id="eventos" n="06" label="Eventos">
        <div className="seed-grid">
          {home.events.map((card, i) => (
            <div key={card.title}>
              <SeedCard
                href={card.href}
                src={["/media/location/entrada-03.jpg", "/media/location/eventos-02.jpg", "/media/location/eventos-01.jpg"][i]}
                alt={card.title}
                title={<Bi text={card.title} />}
                cat={<Bi text="Eventos" />}
                kind="brand"
              />
              {card.paragraphs[0] ? <Rich text={card.paragraphs[0].text || ""} links={card.paragraphs[0].links} /> : null}
            </div>
          ))}
        </div>
      </Chapter>

      <Chapter id="portugal" n="07" label="Porquê Portugal">
        <h2><Bi text="Porquê o seu Evento ou Casamento em Portugal?" /></h2>
        {home.portugal.map((p, i) => <Rich key={i} text={p.text || ""} links={p.links} />)}
        <div className="seed-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <PlateView plate={realPlate("/media/location/frances-01.jpg", "JARDIM FRANCÊS")} sizes="(min-width: 800px) 50vw, 100vw" />
          <PlateView plate={realPlate("/media/location/patio-01.jpg", "JARDIM DO PÁTIO")} sizes="(min-width: 800px) 50vw, 100vw" />
        </div>
      </Chapter>

      <Chapter id="filme" n="08" label="Filme">
        <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)" }}><Bi text={home.filmTitle} /></h2>
        <Film />
        <p className="caption">QUINTA DO TORNEIRO · JARDIM DO PÁTIO</p>
      </Chapter>

      <Chapter id="contatos" n="09" label="Contatos">
        <div className="seed-grid" style={{ gridTemplateColumns: "1.1fr 0.9fr", alignItems: "start" }}>
          <div>
            <h2><Bi text="Contatos" /></h2>
            <p><Bi text="Quinta do Torneiro - Espaço de Eventos e Casamentos" /></p>
            <p><Bi text="Lisboa - Portugal" /></p>
            <p>
              <a href="https://goo.gl/maps/ccY2N3NcF6HZS4RL6" target="_blank" rel="noopener noreferrer">
                <Bi text="Nos encontre no Google Maps" />
              </a>
            </p>
            <p><a href="tel:+351938903880">+351 938 903 880</a> · <a href="https://wa.me/351938903880">WhatsApp</a></p>
            <ContactForm />
          </div>
          <div>
            <PlateView plate={editorialPlate("/media/plates/contact-courtyard.jpg", "Pátio")} sizes="(min-width: 800px) 40vw, 100vw" />
            <div style={{ height: 16 }} />
            <PlateView plate={realPlate("/media/location/entrada-06.jpg", "JARDIM DA ENTRADA")} sizes="(min-width: 800px) 40vw, 100vw" />
          </div>
        </div>
      </Chapter>
      <style>{`
        .hero-fill .plate { height: min(68vh, 740px); aspect-ratio: auto !important; }
        @media (max-width: 800px) {
          #contatos .seed-grid, #portugal .seed-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
