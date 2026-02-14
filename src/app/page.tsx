import {
  FeaturedProjects,
  HeroSection,
  PageTransition,
  StatsSection,
} from "@/components";
import { getFeaturedProjects, getSiteSettings } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

export default async function Home() {
  const [settings, projects] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(),
  ]);

  // Transform Sanity image URLs
  const transformedProjects =
    projects?.map((p: any) => ({
      ...p,
      slug: p.slug?.current,
      image: p.image ? urlFor(p.image).width(600).height(400).url() : undefined,
    })) || [];

  return (
    <PageTransition>
      <main>
        <HeroSection settings={settings} />
        <StatsSection stats={settings?.stats} />
        <FeaturedProjects projects={transformedProjects} />
      </main>
    </PageTransition>
  );
}
