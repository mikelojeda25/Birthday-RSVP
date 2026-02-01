import { motion } from "framer-motion";
import { CountdownTimer } from "@/app/components/countdown-timer";
import { Separator } from "@/app/components/ui/separator";
import imgB from "@/app/images/2.jpg";
import imgD from "@/app/images/1.jpg";
import imgF from "@/app/images/3.jpg";
import imgI from "@/app/images/i.jpg";

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  initial: (i: number) => ({
    opacity: 0,
    y: i % 2 === 0 ? -100 : 100,
  }),
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};
export function Hero() {
  const boxes = [
    { className: "mt-20", src: imgI },
    { className: "", src: imgB },
    { className: "mt-20", src: imgF },
    { className: "", src: imgD },
  ];

  return (
    <section
      id="home"
      className="h-svh flex flex-col-reverse xl:flex-row items-center justify-around px-20 py-20 relative overflow-hidden md:bg-white/70  xl:bg-[#FFFBE9] 2xl:px-35"
    >
      <span className="absolute bottom-0 left-0 w-full h-[70%] bg-gradient-to-t from-[#FFFBE9] via-white to-transparent pointer-events-none md:hidden"></span>

      <section className="flex-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 absolute xl:static top-3/4 md:top-[55%] left-1/2 transform -translate-x-1/2 xl:translate-x-0 -translate-y-1/2 xl:-translate-y-0 w-[500px]"
        >
          <div className="mb-5 scale-80 md:scale-100 text-black/80 text-sm tracking-[0.3em] xl:text-[#E3CAA5] uppercase">
            You are cordially invited
          </div>
          <h1 className="text-6xl md:text-8xl font-serif text-[#dbb125] mb-5 xl:mb-10">
            The 25th
          </h1>
          <p className="hidden md:block text-xl text-black/50 md:text-2xl xl:text-[#AD8B73]/80 mb-2 font-light md:mb-8">
            A Celebration of a Quarter Century
          </p>
          <p className="text-xl md:text-4xl :text-xl text-black/80 md:text-black/60 xl:text-[#AD8B73]/60 md:mb-12">
            May 25, 2026 • 5:00 PM
          </p>
          <Separator className="max-w-xs mx-auto mt-8 hidden md:block" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <CountdownTimer />
          </motion.div>

          <a
            href="#rsvp"
            className="mt-5 inline-flex items-center justify-center px-20 py-4 bg-[#3E2723] text-[#FAF9F6] border border-[#AD8B73]/20 rounded-full text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold hover:bg-[#5D4037] hover:scale-105 transition-all duration-500 cursor-pointer shadow-md shadow-[#3E2723]/10 relative group overflow-hidden"
          >
            {/* Subtle shimmer effect inside */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />

            <span className="relative z-10 text-center">
              Confirm Attendance
            </span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10"
        ></motion.div>
      </section>
      {/** IMAGES **/}
      <motion.section
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className=" gap-5  items-center justify-center flex-wrap mb-10 lg:mb-0 hidden xl:flex"
      >
        {boxes.map((box, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={itemVariants}
            className={`h-50 md:h-140 w-[17%] bg-[#E3CAA5] rounded-2xl ${box.className}`}
          >
            <img
              src={box.src}
              alt={`Image ${i + 1}`}
              loading="eager"
              className="h-full w-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
            />
            <div className="h-50 md:h-140  w-[100%] bg-[#E3CAA5]/10 rounded-2xl -mt-[550px] ml-2 bg-gradient-to-t from-black/5 to-transparent p-4"></div>
          </motion.div>
        ))}
      </motion.section>

      <div>
        <img
          src={imgI}
          alt="Additional decorative image"
          className="w-full h-full object-cover absolute top-0 left-0 opacity-60 pointer-events-none -z-40"
        />
      </div>

      <div className="text-[#D4AF37]/50 text-sm animate-bounce absolute bottom-12 ">
        Scroll to explore
      </div>
    </section>
  );
}
