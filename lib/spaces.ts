export type SpaceDef = {
  slug: string;
  key: string;
  title: string;
  cat: string;
  pill: "garden" | "brand" | "gold" | "navy";
  caption: string;
  sunset?: boolean;
  editorial?: boolean;
};

export const SPACES: SpaceDef[] = [
  { slug: "jardim-do-patio-quinta-portugal", key: "patio", title: "Jardim do Pátio", cat: "Jardim", pill: "garden", caption: "JARDIM DO PÁTIO" },
  { slug: "quinta-jardim-frances-portugal", key: "frances", title: "Jardim Francês", cat: "Jardim", pill: "garden", caption: "JARDIM FRANCÊS", sunset: true },
  { slug: "jardim-da-entrada-quinta-portugal", key: "entrada", title: "Jardim da Entrada", cat: "Jardim", pill: "garden", caption: "JARDIM DA ENTRADA" },
  { slug: "capela-quinta-portugal", key: "capela", title: "Capela", cat: "Capela", pill: "gold", caption: "CAPELA" },
  { slug: "salao-nobre-quinta-do-torneiro", key: "nobre", title: "Salão Nobre", cat: "Salão", pill: "brand", caption: "SALÃO NOBRE" },
  { slug: "sala-do-brasao-quinta-do-torneiro", key: "brasao", title: "Sala do Brasão", cat: "Sala", pill: "brand", caption: "SALA DO BRASÃO" },
  { slug: "sala-das-caravelas-portugal", key: "caravelas", title: "Sala das Caravelas", cat: "Sala", pill: "brand", caption: "SALA DAS CARAVELAS" },
  { slug: "sala-da-lareira-quinta-do-torneiro", key: "lareira", title: "Sala da Lareira", cat: "Sala", pill: "brand", caption: "SALA DA LAREIRA" },
  { slug: "terraco-coberto-quinta-do-torneiro", key: "terraco", title: "Terraço Coberto", cat: "Terraço", pill: "navy", caption: "TERRAÇO COBERTO" },
  { slug: "suite-principal-portugal", key: "suite", title: "Suíte Principal", cat: "Suíte", pill: "navy", caption: "SUÍTE PRINCIPAL", editorial: true },
  { slug: "quinta-casamentos-quartos-portugal", key: "quartos", title: "Quartos", cat: "Quartos", pill: "navy", caption: "QUARTOS", editorial: true },
];

export const SPACE_SLUGS = new Set(SPACES.map((s) => s.slug));

export function spaceBySlug(slug: string): SpaceDef | undefined {
  return SPACES.find((s) => s.slug === slug);
}

/** Published connection lines, quoted from the harvested copy. */
export const ENFILADE = [
  {
    slug: "salao-nobre-quinta-do-torneiro",
    title: "Salão Nobre",
    src: "/media/location/nobre-01.jpg",
    caption: "SALÃO NOBRE",
    line: "pode ser conjugado com as salas contíguas e com o Terraço Coberto. Conecta ao Jardim Coberto e à Sala do Brasão, que por sua vez conecta a Sala das Caravelas e a Sala da Lareira.",
  },
  {
    slug: "sala-do-brasao-quinta-do-torneiro",
    title: "Sala do Brasão",
    src: "/media/location/brasao-01.jpg",
    caption: "SALA DO BRASÃO",
    line: "Conecta ainda com o Salão Nobre e a Sala das Caravelas e o Terraço Coberto.",
  },
  {
    slug: "sala-das-caravelas-portugal",
    title: "Sala das Caravelas",
    src: "/media/location/caravelas-01.jpg",
    caption: "SALA DAS CARAVELAS",
    line: "Faz parte do conjunto de Salas e Salões contíguos da Casa Senhorial da Quinta do Torneiro e conecta ainda com o Terraço Coberto.",
  },
  {
    slug: "sala-da-lareira-quinta-do-torneiro",
    title: "Sala da Lareira",
    src: "/media/location/lareira-01.jpg",
    caption: "SALA DA LAREIRA",
    line: "A Sala da Lareira pode ser usado conjugada com as outras salas contíguas ou individualmente.",
  },
  {
    slug: "terraco-coberto-quinta-do-torneiro",
    title: "Terraço Coberto",
    src: "/media/location/terraco-01.jpg",
    caption: "TERRAÇO COBERTO",
    line: "O Terraço esta ligado com o Jardim Francês.",
  },
] as const;

export const LINKS_BETWEEN: Record<string, string[]> = {
  "salao-nobre-quinta-do-torneiro": [
    "sala-do-brasao-quinta-do-torneiro",
    "sala-das-caravelas-portugal",
    "sala-da-lareira-quinta-do-torneiro",
    "terraco-coberto-quinta-do-torneiro",
  ],
  "sala-do-brasao-quinta-do-torneiro": [
    "salao-nobre-quinta-do-torneiro",
    "sala-das-caravelas-portugal",
    "terraco-coberto-quinta-do-torneiro",
    "capela-quinta-portugal",
  ],
  "sala-das-caravelas-portugal": [
    "sala-do-brasao-quinta-do-torneiro",
    "sala-da-lareira-quinta-do-torneiro",
    "terraco-coberto-quinta-do-torneiro",
    "salao-nobre-quinta-do-torneiro",
  ],
  "sala-da-lareira-quinta-do-torneiro": [
    "sala-das-caravelas-portugal",
    "salao-nobre-quinta-do-torneiro",
    "sala-do-brasao-quinta-do-torneiro",
  ],
  "terraco-coberto-quinta-do-torneiro": [
    "salao-nobre-quinta-do-torneiro",
    "quinta-jardim-frances-portugal",
    "sala-do-brasao-quinta-do-torneiro",
  ],
  "jardim-do-patio-quinta-portugal": [
    "capela-quinta-portugal",
    "sala-do-brasao-quinta-do-torneiro",
    "jardim-da-entrada-quinta-portugal",
  ],
  "quinta-jardim-frances-portugal": [
    "terraco-coberto-quinta-do-torneiro",
    "salao-nobre-quinta-do-torneiro",
  ],
  "jardim-da-entrada-quinta-portugal": [
    "jardim-do-patio-quinta-portugal",
    "capela-quinta-portugal",
  ],
  "capela-quinta-portugal": [
    "jardim-do-patio-quinta-portugal",
    "sala-do-brasao-quinta-do-torneiro",
  ],
  "suite-principal-portugal": ["quinta-casamentos-quartos-portugal", "salao-nobre-quinta-do-torneiro"],
  "quinta-casamentos-quartos-portugal": ["suite-principal-portugal", "salao-nobre-quinta-do-torneiro"],
};
