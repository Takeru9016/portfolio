"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

import { ThemeToggle } from "@/components";
import { cn } from "@/lib";
import { useStore } from "@/stores";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { isNavOpen, toggleNav, closeNav } = useStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between rounded-2xl bg-surface/80 backdrop-blur-xl border border-border px-6 py-3">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeNav}
            className="text-xl font-heading font-bold text-foreground hover:text-primary transition-colors"
          >
            Sahil
            <span className="text-primary">.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive ? "text-primary" : (
                      "dark:text-muted-foreground dark:hover:text-white hover:text-primary"
                    ),
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active"
                      className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/20"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              onClick={toggleNav}
              className="md:hidden h-10 w-10 rounded-xl bg-surface border border-border flex items-center justify-center cursor-pointer"
              aria-label="Toggle menu"
            >
              {isNavOpen ?
                <X className="h-5 w-5" />
              : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isNavOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-2 rounded-2xl bg-surface/95 backdrop-blur-xl border border-border overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-1">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeNav}
                        className={cn(
                          "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                          isActive ?
                            "bg-primary/10 text-primary"
                          : "dark:text-muted-foreground dark:hover:text-white hover:text-primary hover:bg-surface",
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
