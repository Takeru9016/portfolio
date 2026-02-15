import { Metadata } from "next";

import { AboutContent, PageTransition } from "@/components";
import { getSiteSettings } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "About | Sahil Jadhav",
  description: "Learn more about Sahil Jadhav — a fullstack developer.",
};

export const revalidate = 60;

export default async function About() {
  const settings = await getSiteSettings();

  const profileImage =
    settings?.profileImage ?
      urlFor(settings.profileImage).width(400).height(400).url()
    : null;

  const resumeUrl = settings?.resumeFile?.asset?.url || null;
  return (
    <PageTransition>
      <AboutContent
        settings={settings}
        profileImage={profileImage}
        resumeUrl={resumeUrl}
      />
    </PageTransition>
  );
}
