import { PageTransition } from "@/components";

export default function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <PageTransition>
      <section className="flex items-center justify-center min-h-[80vh]">
        <h1 className="text-5xl font-heading font-bold">
          Project: <span className="text-primary">{params.slug}</span>
        </h1>
      </section>
    </PageTransition>
  );
}
