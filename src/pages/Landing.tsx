import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParlourCard } from "@/components/parlour/ParlourCard";
import { PARLOURS } from "@/data/parlours";
import { Search, MapPin, Sparkles, Heart, CalendarCheck, MessageCircle, ChevronDown, Star, Crown } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const SERVICES = ["Facial", "Haircut", "Bridal Makeup", "Manicure", "Hair Spa", "Waxing", "Nail Art", "Threading"];

const Landing = () => {
  const [serviceSearch, setServiceSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredServices = SERVICES.filter((s) =>
    s.toLowerCase().includes(serviceSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-20 md:py-32">
          {/* Background decorations */}
          <div className="absolute inset-0 bg-gradient-to-b from-accent/50 via-accent/20 to-background" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-lavender/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-20 w-48 h-48 bg-peach/15 rounded-full blur-2xl float-animation" />

          <div className="relative section-container text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/80 backdrop-blur-sm px-5 py-2 text-sm text-secondary-foreground shadow-soft"
            >
              <Crown className="h-4 w-4 text-gold" />
              <span className="font-medium">✨ Now Live in Kanpur, Fatehpur & Lucknow</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-[1.1] max-w-4xl mx-auto"
            >
               Apne Shehar ke Best Beauty Salon{" "}
              <span className="premium-gradient-text">Yahin Milega</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
            >
              Discover trusted beauty parlours near you. Browse services, compare prices, and book your appointment — all in one place 💅
            </motion.p>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-2xl mx-auto pt-2"
            >
              <div className="flex flex-col sm:flex-row gap-3 glass-card rounded-2xl p-3 shadow-premium">
                {/* City dropdown */}
                <div className="flex items-center gap-2 rounded-xl bg-accent/60 px-4 py-3 text-sm min-w-[150px] cursor-pointer hover:bg-accent transition-colors">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-foreground font-medium">Pune</span>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
                </div>

                {/* Service search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search... Facial, Haircut, Bridal 💕"
                    value={serviceSearch}
                    onChange={(e) => {
                      setServiceSearch(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="pl-10 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-12 text-base"
                  />
                  {showSuggestions && serviceSearch && filteredServices.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-premium z-20 py-2 overflow-hidden">
                      {filteredServices.map((s) => (
                        <button
                          key={s}
                          className="w-full text-left px-4 py-2.5 text-sm hover:bg-accent/50 transition-colors text-foreground"
                          onMouseDown={() => {
                            setServiceSearch(s);
                            setShowSuggestions(false);
                          }}
                        >
                          <span className="flex items-center gap-2">
                            <Sparkles className="h-3.5 w-3.5 text-primary/50" />
                            {s}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 justify-center pt-2"
            >
              <Link to="/parlours">
                <Button size="lg" className="w-full sm:w-auto gap-2 shadow-glow hover:shadow-glow-lg transition-all duration-300 text-base px-8 h-12">
                  <CalendarCheck className="h-5 w-5" />
                  Book Beauty Service
                </Button>
              </Link>
              <Link to="/list-parlour">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 hover:bg-accent/50 transition-all duration-300 text-base px-8 h-12">
                  <Sparkles className="h-5 w-5" />
                  List Your Parlour
                </Button>
              </Link>
            </motion.div>

            {/* Quick tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-2 pt-4"
            >
              {SERVICES.slice(0, 6).map((s) => (
                <Badge
                  key={s}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary/20 border border-transparent transition-all duration-300 text-xs rounded-full px-3.5 py-1.5"
                >
                  {s}
                </Badge>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Trust indicators */}
        <section className="section-container -mt-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 md:gap-12 text-center"
          >
            {[
              { value: "50+", label: "Beauty Parlours" },
              { value: "4.7★", label: "Average Rating" },
              { value: "10K+", label: "Happy Customers" },
              { value: "100%", label: "Verified" },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="text-2xl font-serif font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Featured Parlours */}
        <section className="section-container py-16 space-y-10">
          <div className="text-center space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="secondary" className="rounded-full px-4 py-1.5 text-xs font-medium mb-3">
                ⭐ Top Rated
              </Badge>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Featured <span className="text-primary">Parlours</span>
              </h2>
              <p className="text-muted-foreground mt-2">Handpicked salons loved by thousands of women</p>
            </motion.div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PARLOURS.map((p, i) => (
              <ParlourCard key={p.id} parlour={p} index={i} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/parlours">
              <Button variant="outline" size="lg" className="gap-2 hover:bg-accent/50 rounded-full px-8">
                View All Parlours
                <Star className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* How It Works */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/30 via-accent/50 to-accent/30" />
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

          <div className="relative section-container space-y-12">
            <div className="text-center space-y-3">
              <Badge variant="secondary" className="rounded-full px-4 py-1.5 text-xs font-medium mb-3">
                💫 Super Easy
              </Badge>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                How It <span className="text-primary">Works</span>
              </h2>
              <p className="text-muted-foreground">Book your beauty service in 3 easy steps</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: Search,
                  step: "1",
                  title: "Search",
                  desc: "Find parlours in your city by browsing services or searching by name.",
                  color: "bg-primary/10 text-primary",
                },
                {
                  icon: Heart,
                  step: "2",
                  title: "Choose",
                  desc: "Compare ratings, prices, and services to pick the perfect parlour.",
                  color: "bg-lavender/20 text-lavender",
                },
                {
                  icon: CalendarCheck,
                  step: "3",
                  title: "Book",
                  desc: "Call or WhatsApp the parlour directly to book your appointment.",
                  color: "bg-gold/15 text-gold",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative text-center space-y-4 bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-soft hover:shadow-premium transition-all duration-500 group"
                >
                  <div className="relative inline-flex h-18 w-18 items-center justify-center rounded-2xl">
                    <div className={`h-16 w-16 rounded-2xl ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="h-7 w-7" />
                    </div>
                    <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full premium-gradient text-primary-foreground text-xs font-bold flex items-center justify-center shadow-glow">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative section-container py-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl premium-gradient p-12 md:p-16 shadow-glow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-lavender/20" />
            <div className="relative space-y-5">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground">
                Ready to Glow? ✨
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-md mx-auto">
                Explore the best beauty parlours in Pune and book your next appointment today.
              </p>
              <Link to="/parlours">
                <Button size="lg" className="bg-card text-primary hover:bg-card/90 shadow-premium text-base px-10 h-12 rounded-full">
                  Explore Now 💕
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />

      {/* WhatsApp Floating Button */}
      <motion.a
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        href="https://wa.me/919876543210?text=Hi%20ShrigarSetu!%20I%20need%20help."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-success text-success-foreground shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.a>
    </div>
  );
};

export default Landing;
