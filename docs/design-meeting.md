# Design meeting — Quinta do Torneiro (Path A pitch)
Date: Thu 2026-10-08 (PT geo day) · Studio lead: Grok · Source: https://www.quintadotorneiro-eventos.com/ (Wix) · Repo: artistdbjohnson/quinta-do-torneiro
Client: Quinta do Torneiro — Espaço para Eventos e Casamentos em Portugal · Estrada da Quinta do Torneiro, 2770-144 Paço d'Arcos (Oeiras, Lisboa) · Celular/Whatsapp +351 938 903 880 (Joana) · events@lisbonweddingplanner.com.
Cascais shortlist: #9 of top 10 — "high-ticket wedding Wix; typos; thin hierarchy". Not an existing dglxss.com case (checked lib/recent-cases.ts). Quinta Santa Maria skipped (compromised site — not touched).

## Domain line (stated before any code)
```
Domain: UI/UX — factory transplant (pitch).
Craft shelf: [Motionsites seed: blog-showcase] (+ twist: the seed's "Behind the lens" journal becomes "Conheça os Espaços da Quinta" — a featured 2-col space card + 3-col space grid with L-corner brackets, "+" reveal and category pills in the client's azulejo blue / gold / garden green; the open lays the client's own azulejo cartouche tile by tile and flips the tiles to the hero).
Resource search: shadcn Accordion (Radix, MIT) USE for the 21 FAQs + package details; magicui / motion-primitives looked at, not shipped. Color search: colorable.jxnblk.com contrast pass on the client's own blue #2F6DC4 / navy #20455e / gold #A78633 / pale gold #FCE3A5 → gold never text on light. Tool pass: footer.design + Mobbin contact flows + navbar.gallery (look only). Inspiration vote: deck.gallery (Jules seat) — chaptered "01 — A Quinta" pacing, one idea per slide (look only). Motion shelf: Prompt Motion "Photo print app launch film" (@twoclipping) — shape-driven scene changes, no crossfades, own code, prefers-reduced-motion honored. Expensive: tin-glazed azulejo (cobalt on white glaze) + limewash plaster + one gilded talha line.
Locks: EN|PT + dark|light (PT default — Oeiras local pitch; EN twin).
Stack: React + Tailwind + Next.js + GitHub + Vercel.
```

## Must not look like Quinta dos Pizões (prior Sintra wedding-quinta pitch)
Pizões = Motionsites wanderful-hero, still cinematic poster open (~1.2 s), matte solid chrome, Sintra day-of timeline, vista provenance dock, Contacte-nos mailto/call/WhatsApp dock.
Torneiro = blog-showcase journal grid of real rooms, azulejo tile-lay → tile-flip open built from the client's own cartouche, tin-glaze + limewash + gilded line (no chrome, no poster), Oeiras manor **enfilade** of the contiguous salões, **packages ledger** with exact 2026/2027 prices and a computed pôr-do-sol chip for the Jardim Francês, chaptered deck pacing, Playfair Display + Enriqueta + Jost (client's own Wix families / Futura alike). No poster open, no full-bleed cinematic hero video, no timeline, no vista dock.

## Opening vote (must differ from every prior open)
| Candidate | For | Against | Votes |
|---|---|---|---|
| **A. Azulejo tile-lay → tile-flip** — on a tin-glaze field the client's own cartouche ("QUINTA DO TORNEIRO · LISBOA", logo/cartouche-lisboa.jpg) is laid tile by tile like a tiler setting a panel (bottom row up, 1.1 s); one beat; then the whole viewport, cut into square tiles, flips in a diagonal wave and each tile's back face is the hero plate → the hero is revealed by shape, not by fade. ≤ 2.4 s. | Literal to the house (18th-c. azulejaria is the site's identity); uses the client's real mark; shape-driven change matches the Prompt Motion attitude; nothing like a poster/curtain/aperture/stamp/crest. | 3D flip perf on low-end phones → tile count capped (≤ 48 on phone, ≤ 96 desktop), transform-only, will-change. | **Reed, Nia, Lux, Prism, Mira, Axiom, Kit, Ash, Wren, Glyph, Jules (11)** |
| B. Doors-open enfilade (salão doors part to the garden) | Uses the "abrir as portas" copy | Reads as a curtain (Forsyth verandah) | Tasker (1) |
| C. Wedding film splash (Lisbon Wedding Planner Vimeo) | Client media | Video splash = BRA; Vimeo isn't ours to autoplay | 0 |
| D. Sunset wash over Jardim Francês | Romantic | Gradient fade family = Pizões poster / Farmington | Vale (1) |

Prior opens checked against (none reused): Quinta dos Pizões cinematic poster · Lane key-aperture · Espacio lexicon · Cary contour-line · Axis growth stamp · City Skin twin-badge · Oralvide smile stamp · Forsyth verandah curtain · Adamthwaite scroll-reveal · Franklin letterhead · Batley quiet · LP crest · Boho Ken Burns · Farmington poster · BRA video.
**WIN: A — Azulejo tile-lay → tile-flip.** Video did not win → Grok Imagine not needed for the open. Once per session (sessionStorage `qdt-open-seen`); skipped on hash deep-link, `prefers-reduced-motion` (static), tap/click/Esc/any key. Content SSR'd underneath; open is an aria-hidden overlay, never traps focus.

## Inspiration-shelf vote (look only — never copy a logo, brand system, post, deck or studio work)
| Seat | Shelf | Pull | Vote |
|---|---|---|---|
| Jules | deck.gallery | Chaptered decks: big numerals, one idea per slide, calm transitions | **WIN (8)** — Jules, Reed, Lux, Axiom, Kit, Wren, Vale, Tasker |
| Reed, Nia, Lux, Prism | visualjournal.it | Editorial captions under plates | 3 — Nia, Prism, Glyph (folded in: small-caps caption line under every plate) |
| Mira, Axiom, Kit, Ash | recent.design | Journal/blog card grids | 2 — Mira, Ash (seed already covers it) |
| Wren, Glyph, Tasker | brandguidelines.net | Clear-space for the cartouche | applied: cartouche clear-space = 1 tile |
| Vale | noiced.com | Glaze crackle grain | applied as 2% noise on the glaze field |
Take: home is a chaptered deck — "01 — A Quinta", "02 — Pacotes", "03 — A Casa Senhorial", "04 — Os Espaços", "05 — Os Salões", "06 — Eventos", "07 — Porquê Portugal", "08 — Filme", "09 — Contatos" — big Playfair numerals, one idea per chapter. Look only.

## Free-resource search (website-factory shelves A/B, free + MIT only)
- Shelf A: easyui / great-ui / paceui browsed for contact forms + pricing tables → none shipped; ledger + form built in our own code. vantaui, dev.cards = do-not-ship.
- Shelf B (free subset): **shadcn/ui Accordion (Radix, MIT) — USE** for the 21 FAQs, package "Detalhes" and menu sections. magicui Blur Fade (MIT) looked at, not shipped. Aceternity = do-not-ship.
- THIRD_PARTY.md with MIT notices (shadcn, Radix, framer-motion, lucide if used).

## Color-shelf search
- Client palette is EXACT (not a rebrand), read from the Wix theme: heading blue **#2F6DC4**, navy text **#20455e** / #2b5672, gray #707070, gold **#A78633** (rgb 167,134,51), pale gold CTA **#FCE3A5**, wordmark blue **#80A5DE**, white tile #FFFFFF.
- colorable contrast (computed on limewash #F5F2EB): #2F6DC4 = 4.58 (AA; headings + links) · #20455e = 9.06 (body) · #2b5672 = 7.02 · #A78633 = **3.08 (fail for text → gilded hairline / numerals ≥ 32px only)** · #FCE3A5 = 1.13 (fill only) · navy on pale gold = 8.04 (CTA pill OK) · muted #5F6B73 = 4.89. Dark (night glaze #0E1A2B): bone #ECE6DA 14.07 · wordmark blue #80A5DE (brand in dark) · gold #C9A44E 7.41 · #2F6DC4 = 3.42 (never body in dark).
- backgrounds.supply gradient-lab / shadergradient: none shipped (matte). ramps.studio look-only. colir / zoxilsi do-not-ship.
- Tokens (author in CSS): light `--paper #F5F2EB` (limewash), `--glaze #FBFAF6`, `--paper-2 #ECE7DC`, `--ink #20455e`, `--brand #2F6DC4`, `--cobalt #1E4FA0` (tile shadow tone), `--muted #5F6B73`, `--line rgba(32,69,94,.14)`, `--gold #A78633`, `--gold-pale #FCE3A5`, `--garden #3E5B3A`; dark `--paper #0E1A2B`, `--glaze #13223A`, `--paper-2 #172942`, `--ink #ECE6DA`, `--brand #80A5DE`, `--muted #A9B6C4`, `--line rgba(236,230,218,.14)`, `--gold #C9A44E`, `--gold-pale #FCE3A5`, `--garden #8FAF86`.

## Tool pass (reference only)
- footer.design → footer as an azulejo-frieze-topped "Contatos" panel (client frieze strip as the top band), contact + address + map + partner links, closing cartouche.
- Mobbin contact flows → "Fale conosco!" as one calm card: Nome / Email / Mensagem + Enviar (exact labels) + WhatsApp/phone/email row.
- navbar.gallery → solid limewash bar, centered wordmark on desktop with split menu groups, calm mega-panels for the long Wix submenus (2–3 columns, exact labels).

## Prompt Motion attitude (look only, our own code)
Reference: "Photo print app launch film" — https://www.prompt-motion.com/twoclipping-221cab (@twoclipping). Attitude: **shape-driven scene changes, never crossfades** — tiles, masks and doorframes carry each transition; restrained, one gesture at a time. Applied to the tile-flip open, the enfilade doorframe masks and chapter-plate reveals (clip-path rect). Never rehost the clip or paste its prompt. prefers-reduced-motion → static.

## Craft vote
| Option | Votes |
|---|---|
| **Motionsites seed blog-showcase** (unused by any prior build): featured full-width 2-col card (1fr 1fr, 20px radius, 1px border, min-height 520px, content side 60px padding, black "Must Read" pill, 48px title −1.5px tracking, footer pushed down with author + colored category pill) + 3-col grid (25px gap) of 16/10 media cards with title + right-aligned pill; hover: media scale 1.08 cubic-bezier(0.33,1,0.68,1) 0.5s, overlay rgba(0,0,0,.25) 0.4s, centered 70px "+" circle scaling 0.7→1 in 0.3s, white L-shaped corner brackets (12px, 1.5px, 15px inset); header = small grey badge + 64px heading −2.5px + subtitle + black pill "View all" (hover 1.02); responsive 1024 → 1-col featured / 2-col grid; 768 → 1-col. | **WIN (10)** |
| Free Framer template (wedding venue) | 2 (Kit, Tasker) |
| Motionsites garden-curtain | 1 (Vale) — already used (Visconde) |
Remap: "Behind the lens" → **"Conheça os Espaços da Quinta"** (exact menu label) with badge "A Quinta"; featured card = Salão Nobre (exact h3 + first paragraph, real plate), grid = the other spaces (exact h3 + pill); "Must Read" pill → "Espaço"; author line → capacity/size facts quoted from each space page; category pills: Jardim = garden green, Salão/Sala = azulejo blue #2F6DC4, Capela = gold #A78633 (pill with white text only on dark fills — check contrast; on light use navy text on #FCE3A5), Terraço/Suíte = navy. "View all posts" → "Conheça a Quinta do Torneiro" (exact button). Videos → real stills (no autoplay). Outfit → **Playfair Display** (client's Wix display face), Inter → **Enriqueta** (client's Wix body serif) for long copy, **Jost** (OFL Futura-alike for the client's Futura Light) for small caps UI/labels. Seed identity (its name, copy, photographer, CloudFront video URLs, Supabase) must NOT appear.
Already-used seeds avoided: surgical-prestige, equilibrium, clinical-editorial, mythic-naturecore, wanderful-hero, vortex-studio-hero, securify-hero, prosthetics-hero, neo-museum, creative-studio, skyelite-hero, prisma-landing, aethera-hero, trust-editorial, garden-curtain.

## Expensive material
**Tin-glazed azulejo** (cobalt on white glaze — the client's own frieze strips and cartouche, never redrawn) + **limewash plaster** field (warm, 2–3% noise) + **one gilded talha line** (1px #A78633 hairline under chapter numerals, echo of the chapel's gilded altar). Matte; no glass, no chrome, no glow, no gradient decoration. All real plates share one grade (gentle warm-neutral, lifted blacks no more than 3%); generated study plates matched to it. Type, spacing, photography carry the cost.

## Axiom twists (3)
1. **Azulejo tile-lay → tile-flip open** (above).
2. **Enfilade — "os salões podem tornar-se um só"**: Salão Nobre → Sala do Brasão → Sala das Caravelas → Sala da Lareira → Terraço Coberto as one pinned horizontal sequence (desktop ≤ 1.6 viewports of scroll; phone = CSS scroll-snap swipe) where each room is seen through a doorframe-shaped mask (tall arched rect) that widens as you move, with the exact sentence "Para grandes eventos, os salões da Quinta do Torneiro podem tornar-se um só." (from the space copy) as the rail headline, and each room's exact "conecta…/contígua…" connection line on the rail. Links to each room page.
3. **Packages ledger** — the exact 2026 and 2027 package data (from /pacotes-de-casamento-2026, -2027, /pacote-casamento-80-sem-estadia) rendered as a calm ledger: season columns (Novembro–Março · Abril, Maio e Outubro · Junho a Setembro) × weekday/weekend rows, exact prices, "Extra wedding guests 180€", "VAT not included / TVA non incluse / IVA não incluso"; year chips 2026 | 2027; each row links "PACKAGE INFO" / "BOOK NOW" exactly as live. Plus a small computed chip on the Jardim Francês card/page: "Pôr do sol hoje · 19:12" (EN "Sunset today · 7:12 pm"), NOAA sunrise/sunset algorithm for Oeiras 38.70 N, −9.31 W, Europe/Lisbon, computed client-side (hydration-safe), tied to the exact copy "Está orientado a Sul - Poente sendo palco de memoráveis por do sol".

## Reed taste gate
- Kill: poster opens, chrome, glass cards, icon rows, emoji, Wix social icon strips, auto-advancing sliders, fake stats, invented reviews, invented staff.
- Keep: real venue plate in every major section, small-caps caption line under every plate ("QUINTA DO TORNEIRO · SALÃO NOBRE"), one gilded line, generous rests (clamp(96px,12vh,160px) desktop / 72px phone), chapter numerals.
- Reed: **PASS** (conditional on plate coverage on every space page + nav fit at 1024/1280 with 13 groups).

## Identity / staff
- The live site publishes **no staff portraits** (Joana is named only as the WhatsApp contact). → no identity remap; **no invented staff faces**. Real couples/guests appear only inside the venue's own published event photography (kept as venue photography).
- Generated plates (media-pack/plates) are faceless editorial still lifes; captioned "ESTUDO EDITORIAL".

## IA (same slugs as live)
Home · every nav target (124 children across Portugal / A Quinta / Eventos / Casamentos / Decoração / Serviços / Galeria / Local / Preçario / Contato) + FAQ + Blog index — all 148 harvested pages rendered at their live slugs. Bespoke templates: Home, space pages (11), A Quinta hub, História, Preçario hub + 2026 / 2027 / sem estadia / detalhes / menu, Casamentos / Eventos Corporativos / Festas hubs, Galeria hub + gallery pages, Localização, FAQ, Contato. All other pages: one editorial "Journal" article template (chapter header plate + exact blocks + inline plates from the page's own photos).

## Ash 10/10 (target, scored at gauntlet)
Ash pre-score of the plan: 9.5 — distinct open + seed + material; risks: 13-group nav fit at 1024–1440, tile-flip perf on phone, long-tail page quality. Final score in Gauntlet log.

## Gauntlet log
(filled after preview review)
