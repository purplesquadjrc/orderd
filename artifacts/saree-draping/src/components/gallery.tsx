import { motion } from "framer-motion";

interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "1",
    imageUrl: "/images/gallery-1.png",
    title: "Bridal Kanjeevaram",
    description:
      "A timeless silk Kanjeevaram draped in the classic Nivi style, adorned with golden zari borders.",
  },
  {
    id: "2",
    imageUrl: "/images/gallery-2.png",
    title: "Festive Silk Drape",
    description:
      "Rich festive silk saree with intricate pleating and a gracefully pinned pallu for celebrations.",
  },
  {
    id: "3",
    imageUrl: "/images/gallery-3.png",
    title: "Modern Lehenga Style",
    description:
      "Contemporary lehenga-style draping that blends tradition with a modern silhouette.",
  },
  {
    id: "4",
    imageUrl: "/images/gallery-4.png",
    title: "Reception Look",
    description:
      "Elegant reception draping with a flowy pallu and floral accessories for a grand entrance.",
  },
  {
    id: "5",
    imageUrl: "/images/gallery-5.png",
    title: "Pre-Pleated Georgette",
    description:
      "Pre-pleated georgette saree with a neat pin-free finish — perfect for long events.",
  },
  {
    id: "6",
    imageUrl: "/images/gallery-6.png",
    title: "Engagement Drape",
    description:
      "Soft pastel silk draped in a half-and-half style, ideal for engagement and mehendi functions.",
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-24" style={{ background: "hsl(20, 40%, 95%)" }}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[0.3em] text-sm font-medium text-primary block mb-3">
            Our Work
          </span>

          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            Draping Gallery
          </h2>

          <div className="w-24 h-1 bg-primary mx-auto rounded-full opacity-50"></div>

          <p className="mt-6 text-foreground/70 max-w-xl mx-auto text-lg">
            Every fold tells a story. Every drape is a work of art.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
              viewport={{ once: true, margin: "-80px" }}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer"
            >
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <h3 className="text-white font-serif text-xl font-semibold leading-snug mb-1">
                  {image.title}
                </h3>

                <p className="text-white/75 text-sm leading-relaxed line-clamp-2">
                  {image.description}
                </p>
              </div>

              <div className="absolute bottom-4 left-4 right-4 group-hover:opacity-0 transition-opacity duration-300">
                <span className="inline-block bg-background/80 backdrop-blur-sm text-foreground/80 text-xs font-medium px-3 py-1 rounded-full">
                  {image.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}