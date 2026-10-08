import fs from "fs";
import path from "path";
import galleryMap from "@/docs/gallery-map.json";
import type { Block } from "./types";

const wixDir = path.join(process.cwd(), "public/media/wix");
const locationDir = path.join(process.cwd(), "public/media/location");

export const WIX = new Set(
  fs.readdirSync(wixDir).filter((f) => f.endsWith(".webp")).map((f) => f.replace(/\.webp$/, "")),
);

export function wixSrc(id?: string): string | null {
  if (!id || !WIX.has(id)) return null;
  return `/media/wix/${id}.webp`;
}

export function locationFiles(prefix: string): string[] {
  return fs
    .readdirSync(locationDir)
    .filter((f) => f.startsWith(`${prefix}-`) && f.endsWith(".jpg"))
    .sort()
    .map((f) => `/media/location/${f}`);
}

export type Plate = {
  src: string;
  alt: string;
  caption: string;
  editorial: boolean;
  position?: string;
};

const PORTRAIT = /capela-0[26]|historia-0[124]/;

export function positionFor(src: string): string {
  return PORTRAIT.test(src) ? "center 18%" : "center 42%";
}

export function realPlate(src: string, space: string, alt = ""): Plate {
  return {
    src,
    alt: alt || `Quinta do Torneiro — ${space}`,
    caption: `QUINTA DO TORNEIRO · ${space}`,
    editorial: false,
    position: positionFor(src),
  };
}

export function editorialPlate(src: string, alt: string): Plate {
  return {
    src,
    alt,
    caption: "ESTUDO EDITORIAL",
    editorial: true,
    position: "center 45%",
  };
}

type Rule = { test: RegExp; plate: Plate };

const RULES: Rule[] = [
  { test: /su[ií]te|quarto/, plate: editorialPlate("/media/plates/suite-morning.jpg", "Suíte, manhã") },
  { test: /capela/, plate: realPlate("/media/location/capela-01.jpg", "CAPELA") },
  { test: /jardim franc|franc[eê]s/, plate: realPlate("/media/location/frances-01.jpg", "JARDIM FRANCÊS") },
  { test: /p[aá]tio/, plate: realPlate("/media/location/patio-01.jpg", "JARDIM DO PÁTIO") },
  { test: /entrada/, plate: realPlate("/media/location/entrada-01.jpg", "JARDIM DA ENTRADA") },
  { test: /bras[aã]o/, plate: realPlate("/media/location/brasao-01.jpg", "SALA DO BRASÃO") },
  { test: /caravela/, plate: realPlate("/media/location/caravelas-01.jpg", "SALA DAS CARAVELAS") },
  { test: /lareira/, plate: realPlate("/media/location/lareira-01.jpg", "SALA DA LAREIRA") },
  { test: /nobre/, plate: realPlate("/media/location/nobre-01.jpg", "SALÃO NOBRE") },
  { test: /terra[cç]o|estufa|tenda/, plate: realPlate("/media/location/terraco-01.jpg", "TERRAÇO COBERTO") },
  { test: /doce|bolo|sobremesa/, plate: editorialPlate("/media/plates/sweets-table.jpg", "Mesa de doces") },
  { test: /praia/, plate: editorialPlate("/media/plates/ceremony-hands.jpg", "Cerimónia") },
  { test: /casamento/, plate: realPlate("/media/location/entrada-02.jpg", "JARDIM DA ENTRADA") },
  { test: /festa|evento|corporativ/, plate: realPlate("/media/location/eventos-01.jpg", "EVENTOS") },
  { test: /hist[oó]ria|azulejo|quinta/, plate: realPlate("/media/location/historia-03.jpg", "A QUINTA · HISTÓRIA") },
];

export function keywordPlate(blob: string): Plate {
  const hay = blob.toLowerCase();
  for (const rule of RULES) {
    if (rule.test.test(hay)) return rule.plate;
  }
  return realPlate("/media/location/historia-03.jpg", "A QUINTA · HISTÓRIA");
}

export function pageImages(blocks: Block[], limit = 3): string[] {
  const out: string[] = [];
  for (const b of blocks) {
    if (b.t !== "img") continue;
    const src = wixSrc(b.id);
    if (src) out.push(src);
    if (out.length >= limit) break;
  }
  return out;
}

export const galleries = galleryMap as Record<string, string[]>;

export function galleryPlates(slug: string): Plate[] {
  const files = galleries[slug] ?? [];
  if (!files.length) {
    if (slug.includes("suite") || slug.includes("quarto")) {
      return [editorialPlate("/media/plates/suite-morning.jpg", "Suíte, manhã")];
    }
    if (slug.includes("praia")) {
      return [editorialPlate("/media/plates/ceremony-hands.jpg", "Cerimónia à beira-mar")];
    }
    return [keywordPlate(slug)];
  }
  return files.map((src) => {
    const name = src.split("/").pop() ?? "";
    const space = captionFromFile(name);
    return realPlate(src, space);
  });
}

function captionFromFile(name: string): string {
  if (name.startsWith("brasao")) return "SALA DO BRASÃO";
  if (name.startsWith("capela")) return "CAPELA";
  if (name.startsWith("caravelas")) return "SALA DAS CARAVELAS";
  if (name.startsWith("entrada")) return "JARDIM DA ENTRADA";
  if (name.startsWith("eventos")) return "EVENTOS";
  if (name.startsWith("frances")) return "JARDIM FRANCÊS";
  if (name.startsWith("historia")) return "A QUINTA · HISTÓRIA";
  if (name.startsWith("lareira")) return "SALA DA LAREIRA";
  if (name.startsWith("nobre")) return "SALÃO NOBRE";
  if (name.startsWith("patio")) return "JARDIM DO PÁTIO";
  if (name.startsWith("terraco")) return "TERRAÇO COBERTO";
  return "A QUINTA";
}
