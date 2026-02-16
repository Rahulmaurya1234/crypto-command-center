import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="section-container py-10 space-y-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-serif font-bold text-foreground text-lg">ShrigarSetu</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting you with trusted local beauty parlours.
            </p>
          </div>

          {/* About */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-foreground">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link to="/list-parlour" className="text-muted-foreground hover:text-foreground transition-colors">List Your Parlour</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-foreground">Get in Touch</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>hello@shrigarsetu.com</li>
              <li>+91 98765 43210</li>
              <li>Pune, Maharashtra</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">© 2026 ShrigarSetu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
