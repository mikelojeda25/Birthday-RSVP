import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, Sparkles } from "lucide-react";

export function Details() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="details"
      className="py-32 px-6 bg-[#FAF9F6] relative overflow-hidden "
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24 space-y-4"
        >
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-[1px] w-12 bg-[#AD8B73]/40" />
            <Sparkles size={18} className="text-[#AD8B73]" />
            <div className="h-[1px] w-12 bg-[#AD8B73]/40" />
          </div>

          <h2 className="text-[#AD8B73] tracking-[0.5em] uppercase text-[10px] font-bold">
            The Itinerary
          </h2>

          <h3 className="text-6xl md:text-7xl font-serif text-[#3E2723]">
            Event{" "}
            <span className="italic font-light text-[#AD8B73]">Details</span>
          </h3>
          <div className="w-16 h-[1px] bg-[#AD8B73]/30 mx-auto mt-6" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
        >
          {[
            {
              icon: Clock,
              time: "5:00 PM",
              title: "Arrival",
              desc: "Welcome drinks & light jazz",
            },
            {
              icon: Calendar,
              time: "6:00 PM",
              title: "Dinner",
              desc: "A curated multi-course experience",
            },
            {
              icon: Users,
              time: "8:00 PM",
              title: "Celebration",
              desc: "Programs, toasts & dancing",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="group bg-white p-12 rounded-[2rem] border border-[#AD8B73]/10 shadow-sm hover:shadow-xl hover:shadow-[#AD8B73]/5 transition-all duration-500 text-center"
            >
              <item.icon className="w-10 h-10 text-[#AD8B73] mx-auto mb-8 stroke-[1px]" />
              <h3 className="text-[#AD8B73] text-[10px] uppercase tracking-[0.3em] font-bold mb-3">
                {item.time}
              </h3>
              <h4 className="text-2xl font-serif text-[#3E2723] mb-4">
                {item.title}
              </h4>
              <p className="text-[#5D4037]/60 text-sm font-light leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#3E2723] p-16 rounded-[3rem] text-white relative overflow-hidden shadow-2xl"
          >
            <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                <h3 className="text-4xl font-serif text-[#E3CAA5]">
                  Dress Code
                </h3>
                <div className="w-20 h-[1px] bg-[#AD8B73]" />
              </div>

              <p className="text-[#FAF9F6] text-2xl font-serif italic tracking-wide">
                "Timeless Elegance & Quiet Luxury"
              </p>

              <p className="text-white/60 text-sm leading-relaxed max-w-sm font-light">
                We invite you to wear a palette of **Deep Coffee, Warm Gold, and
                Neutral Creams**. Think tailored silhouettes and refined
                textures.
              </p>

              <div className="flex flex-wrap gap-4 pt-6">
                {[
                  { hex: "#3E2723", name: "Espresso" },
                  { hex: "#795548", name: "Coffee" },
                  { hex: "#AD8B73", name: "Bronze" },
                  { hex: "#E3CAA5", name: "Champagne" },
                  { hex: "#FAF9F6", name: "Pearl" },
                ].map((color, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div
                      className="w-12 h-12 rounded-full border border-white/20 shadow-xl transition-all duration-500 group-hover:scale-110"
                      style={{
                        backgroundColor: color.hex,
                        boxShadow:
                          color.hex === "#AD8B73"
                            ? "0 0 15px rgba(173, 139, 115, 0.4)"
                            : "none",
                      }}
                    />
                    <span className="text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-16 rounded-[3rem] border border-[#AD8B73]/20 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-[#AD8B73]">
                <MapPin size={28} strokeWidth={1} />
                <h3 className="text-4xl font-serif text-[#3E2723]">
                  The Venue
                </h3>
              </div>
              <p className="text-[#5D4037]/70 font-light text-lg italic">
                A sanctuary of charm and exclusivity.
              </p>
            </div>

            <div className="mt-12 relative group cursor-help">
              <div className="absolute inset-0 bg-[#AD8B73]/5 blur-xl group-hover:bg-[#AD8B73]/10 transition-colors" />
              <div className="relative aspect-[16/6] bg-[#FAF9F6] rounded-2xl border border-dashed border-[#AD8B73]/30 flex flex-col items-center justify-center text-[#AD8B73]">
                <MapPin
                  size={32}
                  className="mb-3 animate-bounce stroke-[1px]"
                />
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold">
                  Secret Location
                </p>
                <p className="text-[9px] text-[#AD8B73]/60 mt-1 uppercase">
                  Revealed via Invitation Email
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
