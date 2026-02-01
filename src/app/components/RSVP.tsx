import { motion } from "framer-motion";
import { RSVPForm } from "@/app/components/rsvp-form";
import { MailOpen } from "lucide-react";

export function RSVP() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <section id="rsvp" className="py-24 relative overflow-hidden px-16">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hidden lg:block absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/shimmer.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-6xl md:text-8xl font-serif mb-6 text-[#3E2723] tracking-tight">
            R.S.V.P.
          </h2>

          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-[#8D6E63]/40" />
            <p className="text-[#8D6E63] font-semibold tracking-[0.3em] uppercase text-[10px]">
              Save the Date
            </p>
            <div className="h-[1px] w-12 bg-[#8D6E63]/40" />
          </div>

          <p className="text-2xl text-[#5D4037] font-light italic">
            Kindly respond by June 15, 2026
          </p>
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#8D6E63]/30 rounded-tl-[3rem] pointer-events-none" />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#8D6E63]/30 rounded-br-[3rem] pointer-events-none" />

          <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] shadow-[0_20px_50px_rgba(62,39,35,0.1)] border border-white overflow-hidden py-10 px-4">
            <RSVPForm />
          </div>
        </motion.div>

        <motion.p
          {...fadeInUp}
          transition={{ delay: 0.4 }}
          className="text-center mt-12 text-[#8D6E63] text-xs font-medium uppercase tracking-[0.4em]"
        >
          We look forward to celebrating with you
        </motion.p>
      </div>
    </section>
  );
}
