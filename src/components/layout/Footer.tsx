import { Sparkles, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card mt-16 overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px premium-gradient opacity-60" />

      <div className="section-container py-12 space-y-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-serif font-bold text-foreground text-lg">
                Shringar<span className="text-primary">Setu</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connecting you with trusted local beauty parlours. Your beauty, our bridge. 💕
            </p>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-foreground">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/list-parlour" className="text-muted-foreground hover:text-primary transition-colors">List Your Parlour</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-foreground">Get in Touch</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>hello@shrigarsetu.com</li>
              <li>+91 98765 43210</li>
              <li>Pune, Maharashtra</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">© 2026 ShrigarSetu. All rights reserved.</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-primary fill-primary" /> for beautiful souls
          </p>
        </div>
      </div>
    </footer>
  );
}
