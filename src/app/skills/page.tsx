import { PageTransition } from "@/components";

export const metadata = { title: "Skills" };

export default function Skills() {
  return (
    <PageTransition>
      <section className="flex items-center justify-center min-h-[80vh]">
        <h1 className="text-5xl font-heading font-bold">
          My <span className="text-primary">Skills</span>
        </h1>
      </section>
    </PageTransition>
  );
}
