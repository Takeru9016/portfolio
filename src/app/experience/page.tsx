import { ExperienceContent, PageTransition } from "@/components";
import { getAllExperience } from "@/sanity/lib/fetch";

export const metadata = {
  title: "Experience | Sahil Jadhav",
  description: "My professional journey and work experience.",
};

export const revalidate = 60;

export default async function ExperiencePage() {
  const experiences = await getAllExperience();
  return (
    <PageTransition>
      <ExperienceContent experiences={experiences} />
    </PageTransition>
  );
}
