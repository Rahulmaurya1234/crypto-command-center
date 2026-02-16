import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="section-container py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-serif font-bold text-foreground">ShrigarSetu</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Connecting you with trusted local beauty parlours.
          </p>
          <p className="text-xs text-muted-foreground">© 2026 ShrigarSetu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
