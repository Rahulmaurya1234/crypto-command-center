import { Link } from "react-router-dom";
import { Sparkles, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/90 backdrop-blur-xl border-b border-border shadow-soft"
          : "bg-transparent"
      }`}
    >
      <nav className="section-container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <Sparkles className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 h-6 w-6 text-primary blur-md opacity-50" />
          </div>
          <span className="text-xl font-serif font-bold text-foreground tracking-tight">
            Shringar<span className="text-primary">Setu</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200">
            Home
          </Link>
          <Link to="/parlours" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200">
            Browse Parlours
          </Link>
          <Link to="/parlours">
            <Button size="sm" className="shadow-glow hover:shadow-glow-lg transition-shadow">
              ✨ Find a Parlour
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-accent/50 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-xl px-4 py-5 space-y-3 animate-fade-in">
          <Link to="/" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-primary py-1">
            Home
          </Link>
          <Link to="/parlours" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-primary py-1">
            Browse Parlours
          </Link>
          <Link to="/parlours" onClick={() => setMobileOpen(false)}>
            <Button size="sm" className="w-full mt-2 shadow-glow">✨ Find a Parlour</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
