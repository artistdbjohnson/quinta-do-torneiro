"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import type { PackRow, Season } from "@/lib/packages";

const SEASONS: Season[] = ["winter", "shoulder", "summer"];
const LABELS: Record<Season, { pt: string; en: string }> = {
  winter: { pt: "Novembro – Março", en: "November – March" },
  shoulder: { pt: "Abril, Maio e Outubro", en: "April, May and October" },
  summer: { pt: "Junho a Setembro", en: "June to September" },
};

function SeasonName({ season }: { season: Season }) {
  const l = LABELS[season];
  return (
    <>
      <span className="lang-pt">{l.pt}</span>
      <span className="lang-en">{l.en}</span>
    </>
  );
}

function RowLinks({ row }: { row: PackRow }) {
  return (
    <p style={{ margin: "8px 0 0", display: "flex", gap: 14 }}>
      <Link href={row.infoHref}>PACKAGE INFO</Link>
      <Link href={row.bookHref}>BOOK NOW</Link>
    </p>
  );
}

function RowBody({ row }: { row: PackRow }) {
  return (
    <>
      <strong style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 500, fontSize: 20 }}>{row.title}</strong>
      <div style={{ color: "var(--muted)", fontSize: 15 }}>{row.days}</div>
      {row.fee ? <div style={{ fontSize: 15 }}>{row.fee}</div> : null}
      <div>{row.guests}</div>
      <div style={{ fontSize: 15 }}>{row.extra}</div>
      <div style={{ fontSize: 15 }}>{row.stay}</div>
      <div style={{ fontSize: 14, color: "var(--muted)" }}>{row.vat}</div>
    </>
  );
}

export function Ledger({
  y2026,
  y2027,
  initial = 2026,
}: {
  y2026: PackRow[];
  y2027: PackRow[];
  initial?: 2026 | 2027;
}) {
  const [year, setYear] = useState<2026 | 2027>(initial);
  const rows = year === 2026 ? y2026 : y2027;
  return (
    <div>
      <div className="chips" role="group" aria-label="Year">
        <button className="chip" type="button" aria-pressed={year === 2026} onClick={() => setYear(2026)}>2026</button>
        <button className="chip" type="button" aria-pressed={year === 2027} onClick={() => setYear(2027)}>2027</button>
      </div>
      <div className="ledger-table ledger-wrap">
        <table className="ledger">
          <tbody>
            {SEASONS.map((season) => {
              const group = rows.filter((r) => r.season === season);
              if (!group.length) return null;
              return (
                <Fragment key={season}>
                  <tr className="season">
                    <th colSpan={3}><SeasonName season={season} /></th>
                  </tr>
                  {group.map((row) => (
                    <tr key={row.title}>
                      <td><RowBody row={row} /></td>
                      <td className="price">{row.price}</td>
                      <td><RowLinks row={row} /></td>
                    </tr>
                  ))}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="ledger-cards">
        {SEASONS.map((season) => {
          const group = rows.filter((r) => r.season === season);
          if (!group.length) return null;
          return (
            <div key={season}>
              <p className="caption"><SeasonName season={season} /></p>
              {group.map((row) => (
                <article className="ledger-card" key={row.title}>
                  <RowBody row={row} />
                  <p className="price">{row.price}</p>
                  <RowLinks row={row} />
                </article>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
