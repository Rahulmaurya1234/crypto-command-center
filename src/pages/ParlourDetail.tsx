import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PARLOURS } from "@/data/parlours";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin, Clock, Phone, ArrowLeft, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const ParlourDetail = () => {
  const { id } = useParams<{ id: string }>();
  const parlour = PARLOURS.find((p) => p.id === id);

  if (!parlour) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 section-container py-16 text-center space-y-4">
          <p className="text-5xl">😢</p>
          <h1 className="text-2xl font-serif font-bold text-foreground">Parlour not found</h1>
          <Link to="/parlours">
            <Button variant="outline">Back to Browse</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 section-container py-8 space-y-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Link to="/parlours" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
            <ArrowLeft className="h-4 w-4" />
            Back to parlours
          </Link>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-[16/7] rounded-2xl overflow-hidden shadow-premium"
        >
          <img src={parlour.image} alt={parlour.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1.5">
            <Star className="h-4 w-4 fill-gold text-gold" />
            <span className="text-sm font-semibold text-foreground">{parlour.rating}</span>
            <span className="text-xs text-muted-foreground">({parlour.reviewCount})</span>
          </div>
        </motion.div>

        {/* Info */}
        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-5"
          >
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">{parlour.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary/60" />{parlour.address}, {parlour.city}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary/60" />{parlour.openHours}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {parlour.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="rounded-full px-3">{tag}</Badge>
              ))}
            </div>

            {/* Services */}
            <section className="space-y-4 pt-4">
              <h2 className="text-xl font-serif font-semibold text-foreground">Services & Prices 💅</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {parlour.services.map((s, i) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                  >
                    <Card className="border-border/50 hover:shadow-soft hover:border-primary/20 transition-all duration-300">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">{s.name}</p>
                          <p className="text-xs text-muted-foreground">{s.duration}</p>
                        </div>
                        <p className="font-semibold text-primary text-lg">₹{s.price}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>

          {/* Contact card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="sticky top-20 shadow-premium border-border/50 overflow-hidden">
              <div className="h-1 premium-gradient" />
              <CardContent className="p-6 space-y-5">
                <h3 className="font-serif text-lg font-semibold text-foreground">Book an Appointment ✨</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Call or WhatsApp the parlour directly to schedule your visit. No online payment needed.
                </p>
                <a href={`tel:${parlour.phone.replace(/\s/g, "")}`} className="block">
                  <Button className="w-full gap-2 shadow-glow hover:shadow-glow-lg transition-all h-11">
                    <Phone className="h-4 w-4" />
                    {parlour.phone}
                  </Button>
                </a>
                <a
                  href={`https://wa.me/${parlour.phone.replace(/[\s+]/g, "")}?text=Hi!%20I%20found%20you%20on%20ShrigarSetu.%20I%20want%20to%20book%20an%20appointment.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="outline" className="w-full gap-2 h-11 hover:bg-success/10 hover:text-success hover:border-success/30 transition-all">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </Button>
                </a>
                <p className="text-xs text-muted-foreground text-center">
                  Open: {parlour.openHours}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ParlourDetail;
