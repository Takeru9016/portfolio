import { PageTransition, ProjectsContent } from "@/components";
import { getAllProjects } from "@/sanity/lib/fetch";

export const metadata = {
  title: "Projects | Sahil Jadhav",
  description: "Explore my portfolio of web development projects.",
};

export const revalidate = 60;

export default async function Projects() {
  const projects = await getAllProjects();
  return (
    <PageTransition>
      <ProjectsContent projects={projects} />
    </PageTransition>
  );
}
