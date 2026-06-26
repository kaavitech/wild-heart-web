import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
import logo from "@/assets/wild-agile-logo.jpg.asset.json";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/team", label: "Team" },
  { to: "/gallery", label: "Gallery" },
  { to: "/newsletter", label: "Newsletter" },
  { to: "/join", label: "Join" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();
  const isHome = location.pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        transparent
          ? "bg-transparent"
          : "bg-background/85 backdrop-blur-xl border-b border-border/60 shadow-[0_2px_24px_-12px_rgba(46,94,78,0.18)]"
      }`}
      data-transparent={transparent ? "true" : "false"}
    >
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-border/50">
            <img src={logo.url} alt="Wild Agile Foundation" className="h-12 w-12 object-cover" />
          </div>
          <div className="hidden min-w-0 sm:block">
            <div className="font-serif text-lg leading-tight tracking-tight text-primary">
              Wild Agile
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Foundation
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  transparent
                    ? "text-white/90 hover:text-white"
                    : active
                    ? "text-primary"
                    : "text-foreground/75 hover:text-primary"
                }`}
              >
                {item.label}
                {active && !transparent && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/8"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/join" className="btn-gold hidden sm:inline-flex">
            <Heart className="h-4 w-4" /> Donate
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className={`grid h-11 w-11 place-items-center rounded-full lg:hidden ${
              transparent ? "bg-white/15 text-white border border-white/30" : "bg-muted text-primary"
            }`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl"
          >
            <div className="container-x flex flex-col py-4">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-xl px-4 py-3 text-base font-medium text-foreground/85 hover:bg-muted"
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/join" className="btn-gold mt-3 self-start">
                <Heart className="h-4 w-4" /> Donate
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
