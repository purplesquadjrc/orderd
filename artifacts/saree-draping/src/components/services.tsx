import { motion } from "framer-motion";
import { Star, Sparkles, Scissors, Home } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Services() {
  const services = [
    {
      title: "Bridal Saree Draping",
      description: "Exquisite styling for your big day. Perfect pleats, pinned securely to last all night through every dance.",
      icon: <Star className="w-8 h-8 text-primary" />,
    },
    {
      title: "Party & Function Draping",
      description: "Stand out at any event. Fast, elegant draping tailored to the occasion and your chosen fabric.",
      icon: <Sparkles className="w-8 h-8 text-primary" />,
    },
    {
      title: "Pre-Pleated Saree Setup",
      description: "Save time on the day. We press, pleat, and pin your saree in advance so you can slip it on in minutes.",
      icon: <Scissors className="w-8 h-8 text-primary" />,
    },
    {
      title: "Home Service Available",
      description: "Get ready in the comfort of your own home or hotel suite. We travel to you for a stress-free experience.",
      icon: <Home className="w-8 h-8 text-primary" />,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full opacity-50"></div>
          <p className="mt-6 text-foreground/70 max-w-2xl mx-auto text-lg">
            Tailored styling experiences that ensure you look effortless and feel confident.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item} className="h-full">
              <Card className="h-full bg-card/50 hover:bg-card border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-500 group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-8 flex flex-col items-center text-center relative z-10 h-full">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-serif font-medium mb-3 text-foreground">{service.title}</h3>
                  <p className="text-foreground/70 leading-relaxed flex-grow">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
