import { motion } from "framer-motion";
import { Phone, MessageCircle, Instagram } from "lucide-react";

export function Contact() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="uppercase tracking-[0.3em] text-sm font-medium text-primary block mb-3">Get in Touch</span>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Contact Us</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full opacity-50"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.a
              href="tel:+919876543210"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-8 bg-card border border-border/50 rounded-2xl hover:border-primary/40 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-lg text-foreground mb-1">Call Us</h3>
              <p className="text-muted-foreground text-sm">+91 98765 43210</p>
            </motion.a>

            <motion.a
              href="https://wa.me/919876543210?text=Hi! I'd like to book a saree draping session."
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-8 bg-card border border-border/50 rounded-2xl hover:border-primary/40 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors duration-300" style={{ background: "#25D36620" }}>
                <MessageCircle className="w-6 h-6" style={{ color: "#25D366" }} />
              </div>
              <h3 className="font-serif text-lg text-foreground mb-1">WhatsApp</h3>
              <p className="text-muted-foreground text-sm">Chat with us instantly</p>
            </motion.a>

            <motion.a
              href="https://www.instagram.com/drapeandgrace"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-8 bg-card border border-border/50 rounded-2xl hover:border-primary/40 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors duration-300" style={{ background: "#E1306C20" }}>
                <Instagram className="w-6 h-6" style={{ color: "#E1306C" }} />
              </div>
              <h3 className="font-serif text-lg text-foreground mb-1">Instagram</h3>
              <p className="text-muted-foreground text-sm">@drapeandgrace</p>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
