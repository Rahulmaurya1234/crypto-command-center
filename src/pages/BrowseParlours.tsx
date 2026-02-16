import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParlourCard } from "@/components/parlour/ParlourCard";
import { PARLOURS } from "@/data/parlours";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 section-container py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Parlours in {city}</h1>
          <p className="text-muted-foreground mt-1">Browse trusted beauty salons near you</p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ParlourCard key={p.id} parlour={p} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground py-12 text-center">No parlours found. Try a different search.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BrowseParlours;
