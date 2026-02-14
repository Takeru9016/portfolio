import {
  FeaturedProjects,
  HeroSection,
  PageTransition,
  StatsSection,
} from "@/components";

export default function Home() {
  return (
    <PageTransition>
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturedProjects />
      </main>
    </PageTransition>
  );
}
