import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    location: "",
    service: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-300";

  return (
    <section id="contact" className="py-24" style={{ background: "hsl(20, 40%, 95%)" }}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="uppercase tracking-[0.3em] text-sm font-medium text-primary block mb-3">Ready to Look Flawless?</span>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Book Your Session</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full opacity-50"></div>
            <p className="mt-6 text-foreground/70 text-lg">
              Fill in your details and we'll confirm your booking within 2 hours.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-80px" }}
            className="bg-card border border-border/50 rounded-3xl p-8 md:p-12 shadow-md"
          >
            {submitted ? (
              <div className="text-center py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-primary" />
                </motion.div>
                <h3 className="text-2xl font-serif text-foreground mb-3">Booking Request Received!</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Thank you, <strong>{form.name}</strong>. We'll confirm your appointment via WhatsApp within 2 hours.
                </p>
                <Button
                  className="mt-8 rounded-full px-8"
                  onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", date: "", location: "", service: "" }); }}
                >
                  Book Another Session
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">Full Name</label>
                    <input
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">Phone Number</label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">Preferred Date</label>
                    <input
                      name="date"
                      type="date"
                      required
                      value={form.date}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">Type of Service</label>
                    <select
                      name="service"
                      required
                      value={form.service}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="bridal">Bridal Saree Draping</option>
                      <option value="party">Party / Function Draping</option>
                      <option value="prepleated">Pre-Pleated Saree Setup</option>
                      <option value="home">Home Service</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Your Location</label>
                  <input
                    name="location"
                    type="text"
                    required
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Area, City (e.g. Koramangala, Bangalore)"
                    className={inputClass}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-full py-6 text-base font-semibold tracking-wider shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  Book My Draping Session
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
