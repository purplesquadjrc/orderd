import { motion } from "framer-motion";
import { useGetGalleryImages } from "@workspace/api-client-react";
import { ImageOff, Loader2 } from "lucide-react";

export function Gallery() {
  const { data: images, isLoading, isError } = useGetGalleryImages();

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

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm">Loading gallery...</p>
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-muted-foreground">
            <ImageOff className="w-10 h-10 text-primary/40" />
            <p className="text-sm">Could not load gallery images. Please try again later.</p>
          </div>
        )}

        {images && images.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
            <ImageOff className="w-10 h-10 text-primary/40" />
            <p className="text-sm">No gallery images yet. Check back soon!</p>
          </div>
        )}

        {images && images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
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
                {/* Gradient overlay always present but more visible on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Text label — slides up on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-white font-serif text-xl font-semibold leading-snug mb-1">
                    {image.title}
                  </h3>
                  <p className="text-white/75 text-sm leading-relaxed line-clamp-2">
                    {image.description}
                  </p>
                </div>

                {/* Subtle badge always visible at bottom */}
                <div className="absolute bottom-4 left-4 right-4 group-hover:opacity-0 transition-opacity duration-300">
                  <span className="inline-block bg-background/80 backdrop-blur-sm text-foreground/80 text-xs font-medium px-3 py-1 rounded-full">
                    {image.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
