import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParlourCard } from "@/components/parlour/ParlourCard";
import { PARLOURS } from "@/data/parlours";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const BrowseParlours = () => {
  const [search, setSearch] = useState("");
  const city = "Pune";

  const filtered = PARLOURS.filter(
    (p) =>
      p.city === city &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 section-container py-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <Badge variant="secondary" className="rounded-full text-xs">Pune</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Beauty <span className="text-primary">Parlours</span>
          </h1>
          <p className="text-muted-foreground">Browse trusted beauty salons handpicked for you 💕</p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative max-w-md"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-12 rounded-xl border-border/50 shadow-soft focus:shadow-premium transition-shadow"
          />
        </motion.div>

        {/* Results */}
        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <ParlourCard key={p.id} parlour={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-3">
            <p className="text-4xl">💇‍♀️</p>
            <p className="text-muted-foreground">No parlours found. Try a different search.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BrowseParlours;
