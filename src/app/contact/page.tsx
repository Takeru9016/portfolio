import { ContactContent, PageTransition } from "@/components";

export const metadata = {
  title: "Contact | Sahil Jadhav",
  description:
    "Get in touch with me for collaborations, projects, or just to say hi!",
};

export default function ContactPage() {
  return (
    <PageTransition>
      <ContactContent />
    </PageTransition>
  );
}
