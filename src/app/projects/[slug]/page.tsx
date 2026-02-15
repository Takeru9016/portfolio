import { notFound } from "next/navigation";

import { PageTransition, ProjectDetailContent } from "@/components";
import { getProjectBySlug, getAllProjects } from "@/sanity/lib/fetch";

interface Props {
  params: Promise<{ slug: string }>;
}

// Default slugs for static generation
const defaultSlugs = ["portfolio", "ecommerce", "taskapp"];

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  const titles: Record<string, string> = {
    portfolio: "3D Portfolio Website",
    ecommerce: "E-Commerce Platform",
    taskapp: "Task Management App",
  };

  return {
    title: `${project?.title || titles[slug] || "Project"} | Sahil Jadhav`,
    description: project?.description || "Project details",
  };
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  const sanityParams =
    projects?.map((p: { slug: { current: string } }) => ({
      slug: p.slug.current,
    })) || [];

  // Merge with defaults
  const defaultParams = defaultSlugs.map((slug) => ({ slug }));
  const allSlugs = new Set([
    ...sanityParams.map((p: { slug: string }) => p.slug),
    ...defaultParams.map((p) => p.slug),
  ]);

  return Array.from(allSlugs).map((slug) => ({ slug }));
}

export const revalidate = 60;

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  // Allow rendering with null project - component will use defaults
  // Only show 404 for slugs that aren't in our default list
  if (!project && !defaultSlugs.includes(slug)) {
    notFound();
  }

  return (
    <PageTransition>
      <ProjectDetailContent project={project} />
    </PageTransition>
  );
}
