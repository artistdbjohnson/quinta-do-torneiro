#!/usr/bin/env python3
"""Build-time EN dictionary. Committed output; nothing calls this at runtime."""
import json
import re
import sys
from pathlib import Path

import argostranslate.translate

ROOT = Path(__file__).resolve().parents[1]
pages = json.loads((ROOT / "docs/pages.json").read_text())
nav = json.loads((ROOT / "docs/nav.json").read_text())

ACCENT = re.compile(r"[áàâãéêíóôõúçÁÀÂÃÉÊÍÓÔÕÚÇ]")
PT = re.compile(
    r"\b(não|nao|você|voce|casamento|casamentos|quinta|para|uma|são|sao|também|tambem|"
    r"convidados|salão|salao|jardim|está|nossos|nosso|pela|pelo|dos|das|seu|sua|"
    r"festa|eventos|clique|aqui|saiba|conheça|conheca|fale|contato|contate|connosco|"
    r"conosco|onde|qual|quais|menu|pacote|pacotes|detalhes|historia|história|"
    r"localiza|preço|preco|quartos|capela|entre|sobre|como|mais|temos|pode|podem|"
    r"seu|sua|nos|com|em|do|da|de|os|as|um|ao|à|ou|se|foi|que|por)\b",
    re.I,
)

OVERRIDES = {
    "Home": "Home",
    "Portugal": "Portugal",
    "A Quinta": "The Quinta",
    "Eventos": "Events",
    "Casamentos": "Weddings",
    "Decoração": "Decoration",
    "Serviços": "Services",
    "Galeria": "Gallery",
    "Local": "Location",
    "Preçario": "Prices",
    "Contato": "Contact",
    "FAQ": "FAQ",
    "Blog": "Blog",
    "Mais": "More",
    "Pacotes": "Packages",
    "Clique Aqui": "Click here",
    "Saiba mais!": "Learn more",
    "Entre em contato": "Get in touch",
    "Conheça a Quinta do Torneiro": "Discover Quinta do Torneiro",
    "Conheça os Espaços da Quinta": "Discover the spaces of the Quinta",
    "Contate a Quinta do Torneiro": "Contact Quinta do Torneiro",
    "Espaço para Eventos e Casamentos em Portugal": "A venue for events and weddings in Portugal",
    "Eventos e Casamentos em Portugal": "Events and weddings in Portugal",
    "QUINTA DO TORNEIRO": "QUINTA DO TORNEIRO",
    "Fale conosco!": "Talk to us!",
    "Fale Connosco!": "Talk to us!",
    "Fale Connosco - Clique Aqui": "Talk to us — click here",
    "Nome": "Name",
    "Email": "Email",
    "Mensagem": "Message",
    "Enviar": "Send",
    "Pacotes de Casamento": "Wedding packages",
    "Pacotes de Casamento 2026": "Wedding packages 2026",
    "Pacotes de Casamento 2027": "Wedding packages 2027",
    "Pacotes sem Acomodação": "Packages without accommodation",
    "Espaço": "Space",
    "Jardim": "Garden",
    "Sala": "Room",
    "Salão": "Hall",
    "Capela": "Chapel",
    "Terraço": "Terrace",
    "Suíte": "Suite",
    "Quartos": "Rooms",
    "Novembro – Março": "November – March",
    "Abril, Maio e Outubro": "April, May and October",
    "Junho a Setembro": "June to September",
    "PACKAGE INFO": "PACKAGE INFO",
    "BOOK NOW": "BOOK NOW",
    "Sitemap": "Sitemap",
    "Ver em quintadotorneiro-eventos.com": "View on quintadotorneiro-eventos.com",
    "Nos encontre no Google Maps": "Find us on Google Maps",
    "A Quinta do Torneiro": "Quinta do Torneiro",
    "Casamento em Portugal": "Wedding in Portugal",
    "Festa em Portugal": "Party in Portugal",
    "Eventos Corporativos": "Corporate events",
    "Jardim do Pátio": "Courtyard Garden",
    "Jardim da Entrada": "Entrance Garden",
    "Jardim Francês": "French Garden",
    "Sala do Brasão": "Coat of Arms Room",
    "Sala das Caravelas": "Caravels Room",
    "Sala da Lareira": "Fireplace Room",
    "Salão Nobre": "Noble Hall",
    "Terraço Coberto": "Covered Terrace",
    "Suíte Principal": "Principal Suite",
}


def fix(s: str) -> str:
    s = s.replace("espaço vazia", "espaço vazio")
    s = s.replace("assuma a forma de lingua", "assume a forma de língua")
    s = re.sub(r"\bcom com\b", "com", s)
    return s


def needs(s: str) -> bool:
    t = s.strip()
    if not t:
        return False
    if t.startswith(("http://", "https://", "mailto:", "tel:")):
        return False
    if "VAT not included" in t:
        return False
    if t in OVERRIDES:
        return False
    if ACCENT.search(t) or PT.search(t):
        return True
    return False


strings: set[str] = set()


def add(s):
    if isinstance(s, str) and s.strip():
        strings.add(s)
        f = fix(s)
        if f != s:
            strings.add(f)


for p in pages.values():
    add(p.get("title"))
    add(p.get("description"))
    for b in p["blocks"]:
        add(b.get("text"))
        add(b.get("alt"))
        for link in b.get("links") or []:
            add(link.get("text"))

for g in nav:
    add(g.get("label"))
    for c in g.get("children") or []:
        add(c.get("label"))

for s in OVERRIDES:
    add(s)

items = sorted(strings)
out: dict[str, str] = {}
print(f"strings {len(items)}", flush=True)
for i, s in enumerate(items):
    if s in OVERRIDES:
        out[s] = OVERRIDES[s]
    elif not needs(s):
        out[s] = s
    else:
        try:
            translated = argostranslate.translate.translate(s, "pt", "en")
            out[s] = translated or s
        except Exception as exc:  # noqa: BLE001
            print("ERR", exc, s[:80], file=sys.stderr)
            out[s] = s
    if i % 100 == 0:
        print(f"{i}/{len(items)}", flush=True)

dest = ROOT / "lib" / "i18n" / "en.json"
dest.parent.mkdir(parents=True, exist_ok=True)
dest.write_text(json.dumps(out, ensure_ascii=False, indent=1) + "\n")
print("wrote", dest, "entries", len(out))
