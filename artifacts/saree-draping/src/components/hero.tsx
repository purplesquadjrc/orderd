import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero.png"
          alt="Elegant bride being draped in a silk saree"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft luxury gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent md:via-background/40"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col items-start text-left pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="uppercase tracking-[0.3em] text-sm font-medium text-primary mb-4 block">
            Elevate Your Presence
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-foreground leading-[1.1] mb-6">
            Professional Saree Draping Services
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-lg font-light leading-relaxed">
            Perfect draping for weddings, parties & special occasions. Feel like a bride, look absolutely flawless.
          </p>
          <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
            <a href="#contact">Book Your Session</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
