import { motion } from "framer-motion";
import { CalendarCheck, MapPin, Sparkles } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: <CalendarCheck className="w-8 h-8" />,
    title: "Book Your Slot",
    description: "Choose your date, time, and service. Booking takes less than 2 minutes from your phone.",
  },
  {
    step: "02",
    icon: <MapPin className="w-8 h-8" />,
    title: "We Arrive at Your Location",
    description: "Our expert draper comes to you — home, hotel, or venue. No travel stress on your special day.",
  },
  {
    step: "03",
    icon: <Sparkles className="w-8 h-8" />,
    title: "Get Perfectly Draped",
    description: "Sit back and relax. We handle every pleat, pin, and detail until you look absolutely flawless.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24" style={{ background: "hsl(20, 40%, 95%)" }}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[0.3em] text-sm font-medium text-primary block mb-3">Simple Process</span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">How It Works</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full opacity-50"></div>
          <p className="mt-6 text-foreground/70 max-w-xl mx-auto text-lg">
            Three easy steps to looking your absolute best.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
                viewport={{ once: true, margin: "-80px" }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-8">
                  <div className="w-32 h-32 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-500">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {step.icon}
                    </div>
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-2xl font-serif text-foreground mb-3">{step.title}</h3>
                <p className="text-foreground/65 leading-relaxed max-w-xs">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
