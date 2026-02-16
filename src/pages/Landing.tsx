import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParlourCard } from "@/components/parlour/ParlourCard";
import { PARLOURS } from "@/data/parlours";
import { Search, MapPin, Sparkles, Heart, CalendarCheck, MessageCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

const SERVICES = ["Facial", "Haircut", "Bridal Makeup", "Manicure", "Hair Spa", "Waxing", "Nail Art", "Threading"];

const Landing = () => {
  const [serviceSearch, setServiceSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredServices = SERVICES.filter((s) =>
    s.toLowerCase().includes(serviceSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-b from-accent/40 to-background py-16 md:py-24">
          <div className="section-container text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-secondary-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Now in Pune
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight max-w-4xl mx-auto">
              Apne Shehar ke Best Beauty Parlour{" "}
              <span className="text-primary">Yahin Milega</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
              Discover trusted beauty parlours near you. Browse services, compare prices, and book your appointment.
            </p>

            {/* Search bar */}
            <div className="max-w-2xl mx-auto pt-4">
              <div className="flex flex-col sm:flex-row gap-3 bg-card rounded-xl border border-border p-3 shadow-sm">
                {/* City dropdown */}
                <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2.5 text-sm min-w-[140px]">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-foreground font-medium">Pune</span>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
                </div>

                {/* Service search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search service... Facial, Haircut, Bridal Makeup"
                    value={serviceSearch}
                    onChange={(e) => {
                      setServiceSearch(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="pl-10 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  {showSuggestions && serviceSearch && filteredServices.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-md z-20 py-1">
                      {filteredServices.map((s) => (
                        <button
                          key={s}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors text-foreground"
                          onMouseDown={() => {
                            setServiceSearch(s);
                            setShowSuggestions(false);
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link to="/parlours">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  <CalendarCheck className="h-4 w-4" />
                  Book Beauty Service
                </Button>
              </Link>
              <Link to="/list-parlour">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                  <Sparkles className="h-4 w-4" />
                  List Your Parlour
                </Button>
              </Link>
            </div>

            {/* Quick tags */}
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {SERVICES.slice(0, 6).map((s) => (
                <Badge key={s} variant="secondary" className="cursor-pointer hover:bg-accent transition-colors text-xs">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Parlours */}
        <section className="section-container py-16 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-serif font-bold text-foreground">Featured Parlours</h2>
            <p className="text-muted-foreground">Top-rated beauty salons in your city</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PARLOURS.map((p) => (
              <ParlourCard key={p.id} parlour={p} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/parlours">
              <Button variant="outline">View All Parlours</Button>
            </Link>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-secondary/50 py-16">
          <div className="section-container space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-serif font-bold text-foreground">How It Works</h2>
              <p className="text-muted-foreground">Book your beauty service in 3 easy steps</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { icon: Search, step: "1", title: "Search", desc: "Find parlours in your city by browsing services or searching by name." },
                { icon: Heart, step: "2", title: "Choose", desc: "Compare ratings, prices, and services to pick the perfect parlour." },
                { icon: CalendarCheck, step: "3", title: "Book", desc: "Call or WhatsApp the parlour directly to book your appointment." },
              ].map((item, i) => (
                <div key={i} className="text-center space-y-3 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <item.icon className="h-7 w-7 text-primary" />
                    <span className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm max-w-xs mx-auto">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-container py-16 text-center space-y-4">
          <h2 className="text-3xl font-serif font-bold text-foreground">Ready to Glow?</h2>
          <p className="text-muted-foreground">Explore the best beauty parlours in Pune today.</p>
          <Link to="/parlours">
            <Button size="lg">Explore Now</Button>
          </Link>
        </section>
      </main>

      <Footer />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919876543210?text=Hi%20ShrigarSetu!%20I%20need%20help."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(142_70%_45%)] text-white shadow-lg hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
};

export default Landing;
