import { fixTypos, tr } from "@/lib/i18n";

export function Bi({ text, className }: { text: string; className?: string }) {
  const pt = fixTypos(text);
  const en = tr(text);
  if (pt === en) return <span className={className}>{pt}</span>;
  return (
    <span className={className}>
      <span className="lang-pt">{pt}</span>
      <span className="lang-en">{en}</span>
    </span>
  );
}
