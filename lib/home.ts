import type { Block } from "./types";

export type HomeCard = {
  title: string;
  paragraphs: Block[];
  button?: string;
};

const PACKAGE_HREF: Record<string, string> = {
  "Pacotes de Casamento 2026": "/pacotes-de-casamento-2026",
  "Pacotes de Casamento 2027": "/pacotes-de-casamento-2027",
  "Pacotes sem Acomodação": "/pacote-casamento-80-sem-estadia",
};

export const SPACE_HREF: Record<string, string> = {
  "Jardim do Pátio": "/jardim-do-patio-quinta-portugal",
  "Jardim da Entrada": "/jardim-da-entrada-quinta-portugal",
  "Terraço Coberto": "/terraco-coberto-quinta-do-torneiro",
  "Sala do Brasão": "/sala-do-brasao-quinta-do-torneiro",
  "Jardim Francês": "/quinta-jardim-frances-portugal",
  "Capela": "/capela-quinta-portugal",
  "Salão Nobre": "/salao-nobre-quinta-do-torneiro",
  "Sala das Caravelas": "/sala-das-caravelas-portugal",
  "Sala da Lareira": "/sala-da-lareira-quinta-do-torneiro",
};

export const EVENT_HREF: Record<string, string> = {
  "Casamento em Portugal": "/casamentos-em-portugal",
  "Festa em Portugal": "/festas-portugal",
  "Eventos Corporativos": "/eventos-corporativos-portugal",
};

export type HomeModel = {
  title: string;
  kicker: string;
  intro: Block[];
  packagesIntro: Block | null;
  packageCards: (HomeCard & { href: string })[];
  manorTitle: string;
  manor: Block[];
  manorButton: string;
  spaces: (HomeCard & { href: string })[];
  events: (HomeCard & { href: string })[];
  portugal: Block[];
  filmTitle: string;
};

type Section = { title: string; body: Block[] };

function sections(blocks: Block[]): Section[] {
  const out: Section[] = [];
  let cur: Section | null = null;
  for (const b of blocks) {
    if (b.t === "h3" && b.text) {
      cur = { title: b.text.trim(), body: [] };
      out.push(cur);
    } else if (cur) {
      cur.body.push(b);
    }
  }
  return out;
}

export function modelHome(blocks: Block[]): HomeModel {
  const text = blocks.filter((b) => b.t !== "img");
  const h2 = text.filter((b) => b.t === "h2");
  const paras = text.filter((b) => b.t === "p");
  const intro = paras.slice(0, 2);
  const packagesIntro = paras[2] ?? null;
  const secs = sections(text);
  const by = (map: Record<string, string>) =>
    secs
      .filter((s) => map[s.title])
      .map((s) => ({
        title: s.title,
        href: map[s.title],
        paragraphs: s.body.filter((b) => b.t === "p"),
        button: s.body.find((b) => b.t === "button")?.text,
      }));

  const manor = secs.find((s) => s.title === "A Quinta do Torneiro");
  const eventTitles = new Set(Object.keys(EVENT_HREF));
  const portugal: Block[] = [];
  const eventos = secs.find((s) => s.title === "Eventos Corporativos");
  if (eventos) {
    let seenP = 0;
    for (const b of eventos.body) {
      if (b.t === "p") {
        seenP += 1;
        if (seenP > 1) portugal.push(b);
      }
    }
  }
  const film = secs.find((s) => /Wedding in Portugal/i.test(s.title));

  return {
    title: h2[0]?.text?.trim() || "QUINTA DO TORNEIRO",
    kicker: h2[1]?.text?.trim() || "Eventos e Casamentos em Portugal",
    intro,
    packagesIntro,
    packageCards: by(PACKAGE_HREF),
    manorTitle: manor?.title || "A Quinta do Torneiro",
    manor: (manor?.body || []).filter((b) => b.t === "p"),
    manorButton: manor?.body.find((b) => b.t === "button")?.text || "Conheça a Quinta do Torneiro",
    spaces: by(SPACE_HREF),
    events: secs
      .filter((s) => eventTitles.has(s.title))
      .map((s) => ({
        title: s.title,
        href: EVENT_HREF[s.title],
        paragraphs: s.body.filter((b) => b.t === "p").slice(0, 1),
        button: undefined,
      })),
    portugal,
    filmTitle: film?.title || "Quinta do Torneiro Wedding in Portugal by Lisbon Wedding Planner",
  };
}
