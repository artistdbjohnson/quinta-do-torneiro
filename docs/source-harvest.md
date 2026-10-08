# Source harvest — quintadotorneiro-eventos.com (Wix, harvested 2026-10-08)

## Files
- `pages.json` — 148 pages keyed by live slug (`home` = /). Each: `url`, `title`, `description` (use as metadata exactly), `blocks[]` in reading order: `{t: h1..h6|p|li|img|button, text, href?, links?[], bold?, id? (img Wix media id), alt?}`. Cut at the Wix footer ("Retornar para a Home").
- `text/<slug>.txt` — flat exact text per page + IMAGES + LINKS (secondary reference).
- `nav.json` — exact main menu: 13 groups (Home · Portugal · A Quinta · Eventos · Casamentos · Decoração · Serviços · Galeria · Local · Preçario · Contato · FAQ · Blog), 124 children with exact labels + live hrefs. Every child slug exists in pages.json.
- `space-sets.json` / `gallery-map.json` — per-space real photo order; per gallery slug the files available in the bundle.
- `pages.txt`, `sitemap-urls.txt` — all live URLs.

## Brand (exact)
- Logo: azulejo cartouche "QUINTA DO TORNEIRO · LISBOA" (blue on white tiles) → `media-pack/logo/cartouche-lisboa.jpg` (1567×1354); wordmark PNG (blue, transparent) → `logo/wordmark-azulejo.png` (928×120). Azulejo frieze strips used by the live header/footer → `logo/frieze-top.jpg` (7680×217), `frieze-white.jpg`, `frieze-thin.jpg`. Keep them; never redraw. In dark mode put the cartouche/wordmark on a glaze (#FBFAF6) tile plate rather than recolouring it.
- Tagline (header): "Espaço para Eventos e Casamentos em Portugal".
- Colours (Wix theme): #2F6DC4 heading blue · #20455e / #2b5672 navy text · #707070 gray · #A78633 gold · #FCE3A5 pale gold CTA · #80A5DE wordmark blue.
- Fonts on live: Enriqueta (body), Playfair Display (headings), Futura Light (UI) → next/font: Playfair Display, Enriqueta, Jost.

## Contacts (global footer — exact)
"Contatos" / "Quinta do Torneiro - Espaço de Eventos e Casamentos" / "Lisboa - Portugal" / "Sinta-se à vontade para nos contatar por telefone ou email. Você também pode preencher o formulário anexo e entraremos em contato o mais rápido possível." / "Nos encontre no Google Maps" → https://goo.gl/maps/ccY2N3NcF6HZS4RL6 / "EMAIL: events@lisbonweddingplanner.com" / "Celular/ Whatsapp: +351 938 903 880 Joana" (tel:+351938903880, https://wa.me/351938903880) / form "Fale Connosco!" Nome · Email · Mensagem · Enviar ("Mensagem enviada!") / info@myvintageweddingportugal.com / "©2018 Quinta do Torneiro eventos Lisboa".
Partner line (exact labels + hrefs, target _blank): Portugal Wedding Guide https://www.portugalweddingguide.com/ | My Destination Wedding Portugal https://www.my-destination-wedding-portugal.com/ | Wedding Venues Portugal https://www.weddingvenuesportugal.com/ | Arriba by the Sea https://www.arribabythesea-portugal.com/ | Lisbon Wedding Celebrants https://www.lisbonweddingcelebrant.com/ | Lisbon Wedding PLanner https://www.lisbonweddingplanner.com/
Mailto as live: `mailto:events@lisbonweddingplanner.com?subject=Pedido de Informação Quinta do Torneiro`, `mailto:info@myvintageweddingportugal.com?subject=Pedido informação Quinta do Torneiro`.
Social: https://instagram.com/quintadotorneiro · Facebook https://pt-pt.facebook.com/pages/category/Product-Service/Quinta-do-Torneiro-379200112140687/ (text links, no Wix icon strip).
Address (Localização page, exact): "Morada: Estrada da Quinta do Torneiro - Quinta do Torneiro - 2770-144 Paço d´Arcos" + the distances list (Hotel 4**** 5 min a pé … Oceanário 24 min). Geo for sunset chip/map: 38.6996 N, −9.2953 W (Paço d'Arcos, Oeiras).
Some long pages repeat a contact block — keep each page's exact copy.

## Home (exact order on live)
Hero plates (4bf7cd_054a2854… Jardim da Entrada ceremony, 4bf7cd_027a62ce…) · "QUINTA DO TORNEIRO" / "Eventos e Casamentos em Portugal" · intro paragraphs · button "Contate a Quinta do Torneiro" · packages paragraph + three cards "Pacotes de Casamento 2026" / "Pacotes de Casamento 2027" / "Pacotes sem Acomodação" each "Clique Aqui" · "A Quinta do Torneiro" (4 paragraphs: Casa Senhorial Século XVIII…, "E mais...", decoração, localização) + "Conheça a Quinta do Torneiro" · space cards h3+p: Jardim do Pátio, Jardim da Entrada, Terraço Coberto, Sala do Brasão, Jardim Francês, Capela, Salão Nobre, Sala das Caravelas, Sala da Lareira · Casamento em Portugal / Festa em Portugal / Eventos Corporativos · "Porquê o seu Evento ou Casamento em Portugal?" (4 paragraphs) · video "Quinta do Torneiro Wedding in Portugal by Lisbon Wedding Planner" (Vimeo 438508117).

## Link fixes (working-links lock; meaning unchanged)
- Home "Pacotes de Casamento 2027 → Clique Aqui" points to the 2026 page on live (bug) → link to `/pacotes-de-casamento-2027`.
- Home "Contate a Quinta do Torneiro" points to the FAQ on live → link to `/contato-portugal` (the button's meaning).
- Internal links: if the target slug is in pages.json → internal route; otherwise → absolute live URL (target _blank rel noopener). Blog post links → live URLs. Never a dead link. Remove Wix share widgets (Facebook/Twitter/Pinterest/Tumblr/Copiar link), "top/bottom of page", A–Z/0–5 Wix anchors and language flags.
- Some pages' external partner URLs were captured as h2/p text (e.g. my-destination-wedding-portugal URLs) → render as a quiet link line, not as a heading.

## Packages (exact; 2026 and 2027 pages carry identical data — read each page's own blocks)
Small Wedding Package November - March · WEEKDAYS ONLY · 16 wedding guests · 10.000€ | Classic Wedding Package November - March · Monday to Thursday or Friday to Monday · 50 guests · 13.000€ | NEW PACK! April, May and October - Two Weekdays Nights · MONDAY TO THURSDAY · NEW PACK: 14.000€ | … Two Weekend Nights · SATURDAY TO MONDAY · NEW PACK: 16.000€ | NEW PACK! June to September - Two Weekdays Nights · 15.000€ | … Two Weekend Nights · 18.000€. Each: "1 event and 2 nights Villa Rental Fee", "Extra wedding guests 180€", "Stay for up to 16 sleeping guests, 2 nights", "VAT not included / TVA non incluse / IVA não incluso", "PACKAGE INFO" → /detalhes-pacotes-de-casamento, "BOOK NOW" → /contato-portugal. (Use hrefs from blocks if present.)

## Language
Most pages are Portuguese (pt-BR/pt-PT mix as published); package pages and some others are published in English. PT locale = exactly as published (incl. English-language pages). EN locale = faithful English translation of the Portuguese copy; already-English strings stay as they are. Trivial typos (e.g. "espaço vazia", "assuma a forma de lingua", doubled words "com com") may be silently corrected in PT; never change meaning, prices, numbers, names.

## Media
- 471 Wix media ids across the site; real venue photography only, no staff portraits published. Gallery pages on live are JS-loaded; the bundle carries the space sets.
- Suite/Quartos galleries publish no room interiors → generated `plates/suite-morning.jpg` captioned "ESTUDO EDITORIAL" + link to the live gallery.
