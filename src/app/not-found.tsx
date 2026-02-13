import Link from "next/link";

import { PageTransition } from "@/components";

export default function NotFound() {
  return (
    <PageTransition>
      <section className="flex flex-col items-center justify-center min-h-[80vh] gap-6 text-center px-6">
        <h1 className="text-8xl font-heading font-bold text-primary">404</h1>
        <p className="text-xl text-muted max-w-md">
          Oops! This page got lost in space. Let&apos;s get you back home.
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
        >
          Back to Home
        </Link>
      </section>
    </PageTransition>
  );
}
