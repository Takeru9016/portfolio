import { PageTransition } from "@/components";

export const metadata = { title: "About" };

export default function About() {
  return (
    <PageTransition>
      <section className="flex items-center justify-center min-h-[80vh]">
        <h1 className="text-5xl font-heading font-bold">
          About <span className="text-primary">Me</span>
        </h1>
      </section>
    </PageTransition>
  );
}
