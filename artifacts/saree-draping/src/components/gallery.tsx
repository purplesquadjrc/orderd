import { motion } from "framer-motion";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1610189019599-f4e95e23f956?w=600&q=80",
    alt: "Bridal saree draping - classic Nivi style",
    label: "Classic Nivi Drape",
  },
  {
    src: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80",
    alt: "Bengali style saree draping",
    label: "Bengali Style",
  },
  {
    src: "https://images.unsplash.com/photo-1617704548623-340376564e68?w=600&q=80",
    alt: "Gujarati style saree",
    label: "Gujarati Style",
  },
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    alt: "Lehenga saree draping",
    label: "Lehenga Saree",
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
    alt: "Party look saree draping",
    label: "Party Look",
  },
  {
    src: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?w=600&q=80",
    alt: "Pre-pleated saree setup",
    label: "Pre-Pleated Style",
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-24" style={{ background: "hsl(20, 40%, 95%)" }}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[0.3em] text-sm font-medium text-primary block mb-3">Our Work</span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Draping Gallery</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full opacity-50"></div>
          <p className="mt-6 text-foreground/70 max-w-xl mx-auto text-lg">
            Every fold tells a story. Every drape is a work of art.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-80px" }}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-white font-serif text-lg font-medium">{image.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
