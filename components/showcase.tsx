import Link from "next/link";
import { getPage } from "@/lib/content";
import { editorialPlate, locationFiles, realPlate } from "@/lib/media";
import { SPACES, type SpaceDef } from "@/lib/spaces";
import type { HomeCard } from "@/lib/home";
import { Bi } from "./bi";
import { Rich } from "./rich";
import { Pill, SeedCard, SeedMedia } from "./seed";
import { SunsetChip } from "./sunset-chip";

function cover(space: SpaceDef) {
  if (space.editorial) return editorialPlate("/media/plates/suite-morning.jpg", space.title);
  const file = locationFiles(space.key)[0];
  return realPlate(file, space.caption);
}

export function SpaceShowcase({
  cards,
  subtitle,
}: {
  cards: (HomeCard & { href: string })[];
  subtitle: string;
}) {
  const byTitle = new Map(cards.map((c) => [c.title, c]));
  const nobre = SPACES.find((s) => s.key === "nobre")!;
  const nobreCard = byTitle.get("Salão Nobre");
  const nobrePlate = cover(nobre);
  const rest = SPACES.filter((s) => s.key !== "nobre");

  return (
    <div>
      <header className="seed-head">
        <span className="seed-badge"><Bi text="A Quinta" /></span>
        <h2 className="seed-title"><Bi text="Conheça os Espaços da Quinta" /></h2>
        <div className="seed-head-row">
          <p className="seed-sub"><Bi text={subtitle} /></p>
          <Link className="navy-pill" href="/a-quinta-do-torneiro"><Bi text="Conheça a Quinta do Torneiro" /></Link>
        </div>
      </header>
      <Link href={`/${nobre.slug}`} className="seed-featured">
        <SeedMedia src={nobrePlate.src} alt={nobrePlate.alt} sizes="(min-width: 1024px) 50vw, 100vw" fillHeight position={nobrePlate.position} />
        <div className="seed-featured-copy">
          <Pill kind="brand"><Bi text="Espaço" /></Pill>
          <h3><Bi text="Salão Nobre" /></h3>
          {nobreCard?.paragraphs[0] ? <Rich text={nobreCard.paragraphs[0].text || ""} links={nobreCard.paragraphs[0].links} /> : null}
          <div className="seed-foot">
            <p className="seed-fact"><Bi text="120 pessoas em plateia" /></p>
            <Pill kind="brand"><Bi text="Salão" /></Pill>
          </div>
        </div>
      </Link>
      <div className="seed-grid">
        {rest.map((space) => {
          const card = byTitle.get(space.title);
          const plate = cover(space);
          const page = !card ? getPage(space.slug) : null;
          const blurb = card?.paragraphs[0]?.text || page?.blocks.find((b) => b.t === "p")?.text || space.title;
          return (
            <div key={space.slug}>
              <SeedCard
                href={`/${space.slug}`}
                src={plate.src}
                alt={plate.alt}
                position={plate.position}
                title={<Bi text={space.title} />}
                cat={<Bi text={space.cat} />}
                kind={space.pill}
              />
              <p style={{ marginTop: 8 }}>
                <Bi text={blurb} />
                {space.sunset ? <SunsetChip /> : null}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
