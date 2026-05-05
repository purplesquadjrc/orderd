import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Priya S.",
    role: "Bride, December Wedding",
    review:
      "I was so nervous about my saree on my wedding day but Drape & Grace was absolutely incredible. My silk Kanjeevaram stayed perfect through 6 hours of ceremonies and dance. I felt like a queen.",
    rating: 5,
    initials: "PS",
  },
  {
    name: "Ananya M.",
    role: "Guest at a reception",
    review:
      "Booked the party package for a family wedding. The draper arrived exactly on time and transformed my look in under 30 minutes. So many compliments on my pallu styling!",
    rating: 5,
    initials: "AM",
  },
  {
    name: "Kavya R.",
    role: "Bridal Package customer",
    review:
      "Worth every rupee of the premium package. The accessories arrangement and the final touch-up before we left for the venue — that little detail made all the difference. Highly recommend.",
    rating: 5,
    initials: "KR",
  },
  {
    name: "Deepa N.",
    role: "Pre-pleated saree setup",
    review:
      "I had a morning function and no time to drape. The pre-pleated setup service saved me completely. It looked freshly draped and stayed in place the whole day. Absolute lifesaver.",
    rating: 5,
    initials: "DN",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[0.3em] text-sm font-medium text-primary block mb-3">Customer Stories</span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">What Our Clients Say</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full opacity-50"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              viewport={{ once: true, margin: "-80px" }}
              className="bg-card border border-border/50 rounded-2xl p-8 relative hover:shadow-lg transition-shadow duration-500"
            >
              <div className="absolute top-6 right-8 text-primary/10 font-serif text-8xl leading-none select-none">"</div>
              <Stars count={review.rating} />
              <p className="mt-4 text-foreground/75 leading-relaxed italic relative z-10">"{review.review}"</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm flex-shrink-0">
                  {review.initials}
                </div>
                <div>
                  <p className="font-serif font-semibold text-foreground">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
