import dict from "@/lib/i18n/en.json";

const en = dict as Record<string, string>;

export function fixTypos(input: string): string {
  return input
    .replaceAll("espaço vazia", "espaço vazio")
    .replaceAll("assuma a forma de lingua", "assume a forma de língua")
    .replace(/\bcom com\b/g, "com");
}

export function tr(input: string): string {
  if (!input) return input;
  const fixed = fixTypos(input);
  return en[fixed] ?? en[input] ?? fixed;
}
