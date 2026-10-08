import { HomePage } from "@/components/home-page";
import { getPage } from "@/lib/content";

const home = getPage("home");

export const metadata = {
  title: home.title,
  description: home.description,
};

export default function Page() {
  return <HomePage />;
}
