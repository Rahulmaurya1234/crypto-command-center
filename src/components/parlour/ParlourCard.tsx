import { Star, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import type { Parlour } from "@/data/parlours";
import { motion } from "framer-motion";

interface ParlourCardProps {
  parlour: Parlour;
  index?: number;
}

export function ParlourCard({ parlour, index = 0 }: ParlourCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        to={`/parlours/${parlour.id}`}
        className="group block rounded-2xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-premium transition-all duration-500 hover:-translate-y-1"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={parlour.image}
            alt={parlour.name}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {/* Rating badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            <span className="text-xs font-semibold text-foreground">{parlour.rating}</span>
          </div>
        </div>
        <div className="p-4 space-y-2.5">
          <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            {parlour.name}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary/60" />
            <span>{parlour.address}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">({parlour.reviewCount} reviews)</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {parlour.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs rounded-full px-2.5 font-normal">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <p className="text-sm font-semibold text-primary">
              From ₹{Math.min(...parlour.services.map((s) => s.price))}
            </p>
            <span className="text-xs text-muted-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
              View Profile <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
