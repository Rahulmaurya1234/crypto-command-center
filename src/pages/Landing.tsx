import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, MapPin, Search, Heart } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="section-container py-16 md:py-24 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-secondary-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            Now in Pune
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground leading-tight max-w-3xl mx-auto">
            Your Beauty,<br />
            <span className="text-primary">One Click Away</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Discover trusted beauty parlours near you. Browse services, compare prices, and book your appointment — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link to="/parlours">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                <Search className="h-4 w-4" />
                Browse Parlours
              </Button>
            </Link>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-secondary/50 py-16">
          <div className="section-container space-y-10">
            <h2 className="text-3xl font-serif font-bold text-center text-foreground">How It Works</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { icon: Search, title: "Search", desc: "Find parlours in your city by browsing our curated listings." },
                { icon: Heart, title: "Choose", desc: "Compare services, prices, and ratings to pick your perfect salon." },
                { icon: MapPin, title: "Visit", desc: "Call the parlour directly to book and visit at your convenience." },
              ].map((step, i) => (
                <div key={i} className="text-center space-y-3 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground text-sm max-w-xs mx-auto">{step.desc}</p>
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
    </div>
  );
};

export default Landing;
