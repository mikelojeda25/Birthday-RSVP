import { motion } from "framer-motion";
import { ImageWithFallback } from "@/app/components/imgSettings/ImageWithFallback";
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};
export function Gallery() {
  return (
    <section id="gallery" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-[#D4AF37]">
            Gallery
          </h2>
          <p className="text-lg text-[#FDFCF0]/70">
            Moments of elegance and celebration
          </p>
        </motion.div>

        <motion.div {...fadeInUp} className="flex flex-col items-center gap-4">
          <div className="w-full aspect-video max-w-2xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1768508950637-7ecb769e686c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZm9ybWFsJTIwZGlubmVyJTIwcGFydHl8ZW58MXx8fHwxNzY5NzkzODcxfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Elegant dinner"
              className="w-full h-full object-cover rounded-lg border border-[#D4AF37]/20"
            />
          </div>
          <div className="w-full aspect-square max-w-sm">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1768297087596-c4c0e6e1f542?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZ29sZCUyMGNoYW1wYWduZSUyMGdsYXNzZXMlMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3Njk3OTM4NzF8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Champagne"
              className="w-full h-full object-cover rounded-lg border border-[#D4AF37]/20"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
