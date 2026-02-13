import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

const socials = [
  { href: "https://github.com/Takeru9016", icon: Github, label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/sahiljadhav",
    icon: Linkedin,
    label: "LinkedIn",
  },
  { href: "https://x.com/dev_takeru", icon: Twitter, label: "X / Twitter" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="text-sm text-black">
            © {new Date().getFullYear()}{"  "}
            <span className="font-heading font-bold text-primary">
              Sahil Jadhav
            </span>
            . Built with passion & code.
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-lg bg-background border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-all duration-300 hover:-translate-y-0.5"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4 dark:text-muted-foreground dark:hover:text-white hover:text-primary text-black" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
