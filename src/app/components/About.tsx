import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Stars, Sparkles, Quote } from "lucide-react";
import aboutImg from "@/app/images/about.png";

export function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const scale = useTransform(smoothProgress, [0, 0.6], [0.8, 1.1]);
  const rotateImg = useTransform(smoothProgress, [0, 1], [-5, 5]);
  const textY = useTransform(smoothProgress, [0, 1], [50, -50]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-16 md:py-32 min-h-screen px-16 bg-[#fcf2e1] overflow-hidden relative"
    >
      <div className="absolute hidden md:block top-20 left-10 opacity-10 pointer-events-none">
        <h1 className="text-[15rem] font-serif text-[#AD8B73] select-none">
          25
        </h1>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        <div className="lg:col-span-6 relative flex justify-center">
          <div className="absolute inset-0 bg-[#AD8B73]/20 rounded-full blur-[150px] transform scale-150" />

          <motion.div
            style={{ scale, rotate: rotateImg }}
            className="relative z-10 w-full max-w-[480px] aspect-[3/4] rounded-[5rem] border-[15px] border-white shadow-[0_50px_100px_-20px_rgba(74,55,40,0.3)] overflow-hidden"
          >
            <img
              src={aboutImg}
              alt="Amara Aguilar"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4A3728]/20 to-transparent" />
          </motion.div>

          <motion.div
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -bottom-12 -left-8 text-[#D4AF37]/50"
          >
            <Sparkles size={100} strokeWidth={0.5} />
          </motion.div>

          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 right-0 bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl flex items-center gap-4 border border-[#AD8B73]/20 z-20"
          >
            <div className="bg-[#AD8B73]/10 p-3 rounded-full">
              <Stars className="text-[#D4AF37]" size={24} fill="#D4AF37" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#AD8B73] font-bold">
                Banwa Guest of Honor
              </p>
              <p className="font-serif text-[#4A3728]">Birthday Celebrant</p>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-6 space-y-12">
          <motion.div style={{ y: textY, opacity }} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-[#AD8B73]" />
              <h2 className="text-[#AD8B73] font-bold tracking-[0.8em] text-[10px] uppercase">
                Established 2001 • Quarter Century
              </h2>
            </div>

            <h3 className="scale-90 ml-[-10%] md:ml-0 md:scale-100 text-8xl md:text-9xl font-serif text-[#4A3728] leading-[0.8]">
              Amara <br className="false" />
              <span className="italic text-[#AD8B73] font-light relative">
                Aguilar
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  className="absolute -bottom-2 left-0 h-[2px] bg-[#AD8B73]/30"
                />
              </span>
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <Quote
              className="absolute -top-8 -left-12 text-[#AD8B73]/10"
              size={120}
            />
            <p className="text-2xl text-[#5C4033] font-light leading-relaxed pl-4">
              Guided by <span className="font-bold text-[#4A3728]">faith</span>{" "}
              and fueled by{" "}
              <span className="font-bold text-[#4A3728]">perseverance</span>,
              Amara enters her 25th year as a woman of substance. Her beauty is
              only matched by her
              <span className="text-[#AD8B73] italic"> deep respect</span> for
              others and her tireless work ethic.
            </p>

            <div className="mt-12 flex gap-8">
              <div>
                <p className="text-4xl font-serif text-[#4A3728]">25</p>
                <p className="text-[10px] uppercase tracking-widest text-[#AD8B73] font-bold">
                  Years of Grace
                </p>
              </div>
              <div className="w-[1px] h-12 bg-[#AD8B73]/20" />
              <div>
                <p className="text-4xl font-serif text-[#4A3728]">2026</p>
                <p className="text-[10px] uppercase tracking-widest text-[#AD8B73] font-bold">
                  New Beginnings
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
