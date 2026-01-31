import { motion } from "framer-motion";
import { RSVPForm } from "@/app/components/rsvp-form";

export function RSVP() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };
  return (
    <section id="rsvp" className="py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-[#D4AF37]">
            RSVP
          </h2>
          <p className="text-lg text-[#FDFCF0]/70">
            Kindly respond by May 1, 2026
          </p>
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="bg-[#1B3022]/30 p-8 md:p-12 rounded-lg border border-[#D4AF37]/20"
        >
          <RSVPForm />
        </motion.div>
      </div>
    </section>
  );
}
