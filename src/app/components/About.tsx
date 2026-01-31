import { motion } from "framer-motion";
import { ImageWithFallback } from "@/app/components/imgSettings/ImageWithFallback";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function About() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeInUp} className="text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-12 text-[#D4AF37]">
            About the Celebration
          </h2>
          <div className="flex flex-col items-center gap-8">
            <div className="w-full max-w-md">
              <p className="text-lg text-[#FDFCF0]/80 leading-relaxed mb-6">
                Join us in celebrating 25 years of memories, milestones, and
                moments that have shaped an extraordinary journey.
              </p>
              <p className="text-lg text-[#FDFCF0]/80 leading-relaxed">
                An evening of refined elegance awaits, where timeless traditions
                meet modern celebration in an atmosphere of understated luxury.
              </p>
            </div>
            <div className="w-full max-w-md">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1768297087596-c4c0e6e1f542?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZ29sZCUyMGNoYW1wYWduZSUyMGdsYXNzZXMlMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3Njk3OTM4NzF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Celebration"
                className="rounded-lg shadow-2xl border border-[#D4AF37]/20 w-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
