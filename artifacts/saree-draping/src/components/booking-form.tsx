import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, X, Calendar, Sparkles } from "lucide-react";

const SERVICE_LABELS: Record<string, string> = {
  bridal: "Bridal Saree Draping",
  party: "Party / Function Draping",
  prepleated: "Pre-Pleated Saree Setup",
  home: "Home Service",
};

export function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowPopup(true);
    }, 2000);
  };

  const handleClose = () => {
    setShowPopup(false);
    setForm({ name: "", phone: "", date: "", location: "", service: "" });
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <>
      <section id="contact" className="py-24" style={{ background: "hsl(20, 40%, 95%)" }}>
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <span className="uppercase tracking-[0.3em] text-sm font-medium text-primary block mb-3">
                Ready to Look Flawless?
              </span>
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
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">Full Name</label>
                    <input
                      name="name"
                      type="text"
                      required
                      disabled={loading}
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
                      disabled={loading}
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
                      disabled={loading}
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
                      disabled={loading}
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
                    disabled={loading}
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Area, City (e.g. Koramangala, Bangalore)"
                    className={inputClass}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full py-6 text-base font-semibold tracking-wider shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-100 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3"
                      >
                        {/* Spinner */}
                        <svg
                          className="w-5 h-5 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12" cy="12" r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                          />
                          <path
                            className="opacity-80"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Confirming your booking...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Book My Draping Session
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Popup */}
      <AnimatePresence>
        {showPopup && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
              onClick={handleClose}
            />

            {/* Modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
            >
              <div className="bg-card rounded-3xl shadow-2xl max-w-md w-full p-10 text-center relative pointer-events-auto">
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Animated check */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 250, damping: 16, delay: 0.1 }}
                  className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 relative"
                >
                  {/* Ripple rings */}
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0.6 }}
                    animate={{ scale: 1.6, opacity: 0 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full bg-primary/20"
                  />
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0.4 }}
                    animate={{ scale: 1.9, opacity: 0 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
                    className="absolute inset-0 rounded-full bg-primary/10"
                  />
                  <CheckCircle className="w-12 h-12 text-primary relative z-10" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <p className="uppercase tracking-[0.25em] text-xs font-medium text-primary mb-2">
                    Success
                  </p>
                  <h3 className="text-3xl font-serif font-bold text-foreground mb-3">
                    Booking Confirmed!
                  </h3>
                  <p className="text-foreground/65 leading-relaxed mb-2">
                    Thank you, <span className="font-semibold text-foreground">{form.name}</span>.
                  </p>
                  <p className="text-foreground/65 leading-relaxed text-sm">
                    Your <span className="text-primary font-medium">{SERVICE_LABELS[form.service]}</span> session
                    on <span className="font-medium text-foreground">{form.date}</span> has been received.
                    We'll reach out on WhatsApp within 2 hours to confirm.
                  </p>
                </motion.div>

                {/* Booking summary pills */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="flex flex-wrap justify-center gap-2 mt-6 mb-8"
                >
                  <span className="flex items-center gap-1.5 text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full">
                    <Calendar className="w-3 h-3" />{form.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full">
                    <Sparkles className="w-3 h-3" />{SERVICE_LABELS[form.service]}
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <Button
                    className="flex-1 rounded-full py-5 font-semibold"
                    onClick={handleClose}
                  >
                    Book Another Session
                  </Button>
                  <a
                    href={`https://wa.me/919876543210?text=Hi! I just booked a ${SERVICE_LABELS[form.service]} session for ${form.date}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 rounded-full py-5 border border-border text-foreground/70 text-sm font-semibold hover:bg-muted/40 transition-colors"
                  >
                    Chat on WhatsApp
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
