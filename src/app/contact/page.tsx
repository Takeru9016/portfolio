import { PageTransition } from "@/components";

export const metadata = { title: "Contact" };

export default function Contact() {
  return (
    <PageTransition>
      <section className="flex items-center justify-center min-h-[80vh]">
        <h1 className="text-5xl font-heading font-bold">
          Get in <span className="text-primary">Touch</span>
        </h1>
      </section>
    </PageTransition>
  );
}
