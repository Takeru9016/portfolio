import { PageTransition, SkillsContent } from "@/components";
import { getSkills } from "@/sanity/lib/fetch";

export const metadata = {
  title: "Skills | Sahil Jadhav",
  description: "Technologies and tools I work with.",
};

export const revalidate = 60;

export default async function Skills() {
  const skills = await getSkills();
  return (
    <PageTransition>
      <SkillsContent skills={skills} />
    </PageTransition>
  );
}
