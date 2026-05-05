import { Phone, MessageCircle, Instagram } from "lucide-react";

export function Footer() {
  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "Gallery", href: "#gallery" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="border-t border-border/50 bg-background py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center text-center gap-8">
          <div>
            <p className="text-2xl font-serif font-bold text-foreground">Drape & Grace</p>
            <p className="text-sm text-muted-foreground mt-1">Making every occasion unforgettable</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-foreground/60 hover:text-primary transition-colors duration-300 uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <a
              href="tel:+919876543210"
              className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center text-foreground/60 hover:text-primary transition-all duration-300"
              aria-label="Phone"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center text-foreground/60 hover:text-primary transition-all duration-300"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/drapeandgrace"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center text-foreground/60 hover:text-primary transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>

          <div className="w-full border-t border-border/40 pt-6">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Drape & Grace. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
