import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PARLOURS } from "@/data/parlours";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin, Clock, Phone, ArrowLeft } from "lucide-react";

const ParlourDetail = () => {
  const { id } = useParams<{ id: string }>();
  const parlour = PARLOURS.find((p) => p.id === id);

  if (!parlour) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 section-container py-16 text-center space-y-4">
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 section-container py-8 space-y-6 animate-fade-in">
        <Link to="/parlours" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to parlours
        </Link>

        {/* Hero image */}
        <div className="aspect-[16/7] rounded-xl overflow-hidden">
          <img src={parlour.image} alt={parlour.name} className="h-full w-full object-cover" />
        </div>

        {/* Info */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h1 className="text-3xl font-serif font-bold text-foreground">{parlour.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{parlour.address}, {parlour.city}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{parlour.openHours}</span>
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-primary text-primary" />{parlour.rating} ({parlour.reviewCount} reviews)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {parlour.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>

            {/* Services */}
            <section className="space-y-3 pt-4">
              <h2 className="text-xl font-serif font-semibold text-foreground">Services</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {parlour.services.map((s) => (
                  <Card key={s.id}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.duration}</p>
                      </div>
                      <p className="font-semibold text-primary">₹{s.price}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Contact card */}
          <div>
            <Card className="sticky top-20">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-serif text-lg font-semibold text-foreground">Book an Appointment</h3>
                <p className="text-sm text-muted-foreground">
                  Call the parlour directly to schedule your visit. No online payment needed.
                </p>
                <a href={`tel:${parlour.phone.replace(/\s/g, "")}`}>
                  <Button className="w-full gap-2">
                    <Phone className="h-4 w-4" />
                    {parlour.phone}
                  </Button>
                </a>
                <p className="text-xs text-muted-foreground text-center">
                  Open: {parlour.openHours}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ParlourDetail;
