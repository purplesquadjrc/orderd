import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Basic Package",
    price: "₹499",
    tagline: "Quick & elegant for any occasion",
    features: [
      "Standard Nivi drape",
      "Neat pleating & pinning",
      "30-minute session",
      "Home service available",
    ],
    highlight: false,
    cta: "Book Basic",
  },
  {
    name: "Bridal Package",
    price: "₹1,499",
    tagline: "The complete bridal experience",
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
  },
  {
    name: "Premium Package",
    price: "₹2,499",
    tagline: "Head-to-toe luxury styling",
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
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[0.3em] text-sm font-medium text-primary block mb-3">Transparent Pricing</span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Simple Packages</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full opacity-50"></div>
          <p className="mt-6 text-foreground/70 max-w-xl mx-auto text-lg">
            No hidden charges. Choose what suits your occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              viewport={{ once: true, margin: "-80px" }}
              className={`relative rounded-2xl flex flex-col ${
                plan.highlight
                  ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-105"
                  : "bg-card border border-border text-foreground"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-foreground text-background text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-serif font-semibold mb-1">{plan.name}</h3>
                <p className={`text-sm mb-6 ${plan.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {plan.tagline}
                </p>

                <div className="mb-8">
                  <span className="text-5xl font-serif font-bold">{plan.price}</span>
                  <span className={`text-sm ml-2 ${plan.highlight ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                    per session
                  </span>
                </div>

                <ul className="space-y-3 flex-grow mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          plan.highlight ? "text-primary-foreground" : "text-primary"
                        }`}
                      />
                      <span className={plan.highlight ? "text-primary-foreground/90" : "text-foreground/80"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`w-full rounded-full py-6 font-semibold tracking-wider ${
                    plan.highlight
                      ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  <a href="#contact">{plan.cta}</a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
