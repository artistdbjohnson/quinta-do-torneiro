import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SpacePage } from "@/components/space-page";
import {
  BlogPage,
  ContactPage,
  DetailPage,
  FaqPage,
  GALLERY_SLUGS,
  GalleryHub,
  GalleryPage,
  HistoryPage,
  JournalPage,
  LocationPage,
  PackagePage,
  QuintaHub,
  isAccordionSlug,
  isLedgerSlug,
} from "@/components/templates";
import { pages } from "@/lib/content";
import { SPACE_SLUGS } from "@/lib/spaces";

export function generateStaticParams() {
  return Object.keys(pages)
    .filter((slug) => slug !== "home")
    .map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) return {};
  return { title: page.title, description: page.description };
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!pages[slug]) notFound();
  if (SPACE_SLUGS.has(slug)) return <SpacePage slug={slug} />;
  if (slug === "a-quinta-do-torneiro") return <QuintaHub />;
  if (slug === "historia-da-quinta-do-torneiro") return <HistoryPage />;
  if (slug === "faqs-quinta-do-torneiro-portugues") return <FaqPage />;
  if (slug === "contato-portugal") return <ContactPage />;
  if (slug === "localizacao-quinta-do-torneiro") return <LocationPage />;
  if (slug === "blog") return <BlogPage />;
  if (slug === "galeria-portugal") return <GalleryHub />;
  if (GALLERY_SLUGS.has(slug)) return <GalleryPage slug={slug} />;
  if (isLedgerSlug(slug)) return <PackagePage slug={slug} />;
  if (isAccordionSlug(slug)) return <DetailPage slug={slug} />;
  return <JournalPage slug={slug} />;
}
