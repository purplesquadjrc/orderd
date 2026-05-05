import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Pencil, Sparkles, Clock, Home, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Basic Package",
    price: 499,
    duration: "30 min",
    tagline: "Quick & elegant for any occasion",
    icon: <Home className="w-5 h-5" />,
    accent: "hsl(28, 60%, 65%)",
    features: [
      "Standard Nivi drape",
      "Neat pleating & pinning",
      "30-minute session",
      "Home service available",
    ],
    highlight: false,
    cta: "Book Basic",
    badge: null,
    bookings: "142 bookings",
  },
  {
    name: "Bridal Package",
    price: 1499,
    duration: "60 min",
    tagline: "The complete bridal experience",
    icon: <Star className="w-5 h-5" />,
    accent: "hsl(28, 60%, 65%)",
    features: [
      "Full bridal draping style",
      "Precision pleating & pallu styling",
      "Secured pinning for all-day hold",
      "60-minute session",
      "Home/venue service",
      "Dupatta arrangement",
    ],
    highlight: true,
    cta: "Book Bridal",
    badge: "Most Popular",
    bookings: "389 bookings",
  },
  {
    name: "Premium Package",
    price: 2499,
    duration: "90 min",
    tagline: "Head-to-toe luxury styling",
    icon: <Sparkles className="w-5 h-5" />,
    accent: "hsl(28, 60%, 65%)",
    features: [
      "Everything in Bridal Package",
      "Accessories arrangement",
      "Touch-up kit provided",
      "90-minute session",
      "Priority home/venue service",
      "Post-draping touch-up check",
    ],
    highlight: false,
    cta: "Book Premium",
    badge: null,
    bookings: "97 bookings",
  },
];

export function Pricing() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="pricing" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="uppercase tracking-[0.3em] text-sm font-medium text-primary block mb-3">
            Transparent Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Simple Packages</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full opacity-50"></div>
          <p className="mt-6 text-foreground/70 max-w-xl mx-auto text-lg">
            No hidden charges. Choose what suits your occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              viewport={{ once: true, margin: "-80px" }}
              onHoverStart={() => setHovered(index)}
              onHoverEnd={() => setHovered(null)}
              whileHover={plan.highlight ? { y: -6 } : { y: -8, scale: 1.02 }}
              className={`relative flex flex-col rounded-3xl transition-shadow duration-500 cursor-default ${
                plan.highlight
                  ? "md:scale-105 shadow-2xl shadow-primary/25 z-10"
                  : "shadow-md hover:shadow-xl"
              }`}
              style={{
                background: plan.highlight
                  ? "linear-gradient(145deg, hsl(28,65%,62%), hsl(15,70%,58%))"
                  : "hsl(20, 40%, 99%)",
                border: plan.highlight
                  ? "none"
                  : `1px solid ${hovered === index ? "hsl(28,50%,75%)" : "hsl(20,30%,90%)"}`,
              }}
            >
              {/* Animated shimmer on highlighted card */}
              {plan.highlight && (
                <motion.div
                  className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none"
                  initial={false}
                >
                  <motion.div
                    animate={{ x: ["−100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12"
                  />
                </motion.div>
              )}

              {/* Decorative glow on non-highlight hover */}
              {!plan.highlight && hovered === index && (
                <motion.div
                  layoutId="hoverGlow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at top left, hsl(28,60%,92%) 0%, transparent 70%)",
                  }}
                />
              )}

              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 18 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-1.5 bg-foreground text-background text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase shadow-lg"
                  >
                    <Sparkles className="w-3 h-3" />
                    {plan.badge}
                  </motion.span>
                </div>
              )}

              {/* Admin edit button — appears on hover */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={hovered === index ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.18 }}
                className="absolute top-4 right-4 z-20"
              >
                <button
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg shadow transition-all duration-200 ${
                    plan.highlight
                      ? "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                      : "bg-foreground/8 text-foreground/60 hover:bg-foreground/12 border border-border/60"
                  }`}
                  style={
                    !plan.highlight
                      ? { background: "hsl(20,20%,94%)", border: "1px solid hsl(20,20%,86%)" }
                      : {}
                  }
                >
                  <Pencil className="w-3 h-3" />
                  Edit
                </button>
              </motion.div>

              {/* Card body */}
              <div className="p-8 flex flex-col flex-grow relative z-10">
                {/* Icon + name */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      plan.highlight ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                    }`}
                  >
                    {plan.icon}
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-serif font-semibold leading-tight ${
                        plan.highlight ? "text-white" : "text-foreground"
                      }`}
                    >
                      {plan.name}
                    </h3>
                  </div>
                </div>

                <p
                  className={`text-sm mb-6 leading-relaxed ${
                    plan.highlight ? "text-white/75" : "text-muted-foreground"
                  }`}
                >
                  {plan.tagline}
                </p>

                {/* Price */}
                <div className="mb-2">
                  <div className="flex items-end gap-1.5">
                    <span
                      className={`text-5xl font-serif font-bold tracking-tight ${
                        plan.highlight ? "text-white" : "text-foreground"
                      }`}
                    >
                      ₹{plan.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span
                      className={`text-xs flex items-center gap-1 ${
                        plan.highlight ? "text-white/60" : "text-muted-foreground"
                      }`}
                    >
                      per session
                    </span>
                    <span
                      className={`text-xs flex items-center gap-1 font-medium ${
                        plan.highlight ? "text-white/70" : "text-foreground/60"
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      {plan.duration}
                    </span>
                  </div>
                </div>

                {/* Social proof */}
                <div className="mb-6">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                      plan.highlight
                        ? "bg-white/15 text-white/80"
                        : "bg-primary/8 text-primary/80"
                    }`}
                    style={!plan.highlight ? { background: "hsl(28,50%,93%)" } : {}}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        plan.highlight ? "bg-white/60" : "bg-primary/60"
                      }`}
                    />
                    {plan.bookings}
                  </span>
                </div>

                {/* Divider */}
                <div
                  className={`h-px mb-6 ${
                    plan.highlight ? "bg-white/20" : "bg-border/60"
                  }`}
                />

                {/* Features */}
                <ul className="space-y-3 flex-grow mb-8">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + i * 0.05, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 text-sm"
                    >
                      <span
                        className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                          plan.highlight ? "bg-white/20" : "bg-primary/10"
                        }`}
                      >
                        <Check
                          className={`w-3 h-3 ${
                            plan.highlight ? "text-white" : "text-primary"
                          }`}
                        />
                      </span>
                      <span
                        className={
                          plan.highlight ? "text-white/90" : "text-foreground/75"
                        }
                      >
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  asChild
                  className={`w-full rounded-full py-6 font-semibold tracking-wide text-sm transition-all duration-300 ${
                    plan.highlight
                      ? "bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                      : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  <a href="#contact">{plan.cta}</a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-sm text-foreground/50 mt-10"
        >
          All packages include home / venue service. Prices inclusive of materials.
        </motion.p>
      </div>
    </section>
  );
}
