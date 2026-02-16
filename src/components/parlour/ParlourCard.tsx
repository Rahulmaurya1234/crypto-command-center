import { Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import type { Parlour } from "@/data/parlours";

interface ParlourCardProps {
  parlour: Parlour;
}

export function ParlourCard({ parlour }: ParlourCardProps) {
  return (
    <Link
      to={`/parlours/${parlour.id}`}
      className="group block rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={parlour.image}
          alt={parlour.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-serif text-lg font-semibold text-foreground">{parlour.name}</h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{parlour.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium text-foreground">{parlour.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({parlour.reviewCount} reviews)</span>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {parlour.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-sm font-medium text-primary pt-1">
          From ₹{Math.min(...parlour.services.map((s) => s.price))}
        </p>
      </div>
    </Link>
  );
}
