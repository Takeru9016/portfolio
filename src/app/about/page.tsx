import { Metadata } from "next";

import { AboutContent, PageTransition } from "@/components";
import { getSiteSettings } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "About | Sahil Jadhav",
  description: "Learn more about Sahil Jadhav — a fullstack developer.",
};

export const revalidate = 60;

export default async function About() {
  const settings = await getSiteSettings();

  return (
    <PageTransition>
      <AboutContent settings={settings} />
    </PageTransition>
  );
}
