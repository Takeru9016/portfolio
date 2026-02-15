"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react";

import { ContactForm, MagneticButton, SkeletonCard } from "@/components";

const MailboxScene = dynamic(
  () =>
    import("@/components/3D/MailBoxScene").then((mod) => ({
      default: mod.MailboxScene,
    })),
  {
    ssr: false,
    loading: () => <SkeletonCard className="w-full h-[300px] md:h-[400px]" />,
  },
);

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/Takeru9016",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/sahiljadhav",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/sahiljadhav",
    icon: Twitter,
  },
];

export function ContactContent() {
  const [success, setSuccess] = useState(false);

  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <section className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-mono text-secondary mb-2"
          >
            ./contact
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold mb-4"
          >
            Let&apos;s <span className="text-primary">Connect</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Have a project in mind or just want to chat? Drop me a message!
          </motion.p>
        </section>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: 3D Scene + Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* 3D Mailbox */}
            <div className="rounded-2xl border border-border bg-card/50 overflow-hidden mb-8">
              <MailboxScene success={success} />
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/50"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="text-primary" size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a
                    href="mailto:timetocode22@gmail.com"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    timetocode22@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/50"
              >
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <MapPin className="text-secondary" size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">India 🇮🇳</p>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-3 pt-4"
              >
                <span className="text-sm text-muted-foreground">
                  Find me on:
                </span>
                {socials.map((social) => (
                  <MagneticButton key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                      aria-label={social.name}
                    >
                      <social.icon size={18} />
                    </a>
                  </MagneticButton>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 md:p-8 rounded-2xl border border-border bg-card"
          >
            <h2 className="text-xl font-heading font-semibold mb-6">
              Send a Message
            </h2>
            <ContactForm onSuccess={() => setSuccess(true)} />
          </motion.div>
        </div>

        {/* Success Celebration */}
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            onClick={() => setSuccess(false)}
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="bg-card border border-border rounded-2xl p-8 max-w-md mx-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h3 className="text-2xl font-heading font-bold mb-2">
                Message Sent!
              </h3>
              <p className="text-muted-foreground mb-6">
                Thanks for reaching out! I&apos;ll get back to you as soon as
                possible.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                Got it!
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
