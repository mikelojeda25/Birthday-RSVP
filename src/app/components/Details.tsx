import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, Palette } from "lucide-react";

export function Details() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };
  return (
    <section id="details" className="py-24 px-4 bg-[#1B3022]/30">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-[#D4AF37]">
            Event Details
          </h2>
          <p className="text-lg text-[#FDFCF0]/70">
            A timeline of the evening's festivities
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center gap-8 mb-16">
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="bg-[#121212]/50 p-8 rounded-lg border border-[#D4AF37]/20 text-center w-full md:w-64 md:max-w-64"
          >
            <Clock className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
            <h3 className="text-xl font-serif mb-2 text-[#D4AF37]">
              Arrival & Cocktails
            </h3>
            <p className="text-[#FDFCF0]/70">5:00 PM</p>
            <p className="text-sm text-[#FDFCF0]/50 mt-2">
              Welcome drinks and mingling
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="bg-[#121212]/50 p-8 rounded-lg border border-[#D4AF37]/20 text-center w-full md:w-64 md:max-w-64"
          >
            <Calendar className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
            <h3 className="text-xl font-serif mb-2 text-[#D4AF37]">Dinner</h3>
            <p className="text-[#FDFCF0]/70">6:00 PM</p>
            <p className="text-sm text-[#FDFCF0]/50 mt-2">
              Exquisite multi-course dining
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.3 }}
            className="bg-[#121212]/50 p-8 rounded-lg border border-[#D4AF37]/20 text-center w-full md:w-64 md:max-w-64"
          >
            <Users className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
            <h3 className="text-xl font-serif mb-2 text-[#D4AF37]">
              Activities
            </h3>
            <p className="text-[#FDFCF0]/70">8:00 PM onwards</p>
            <p className="text-sm text-[#FDFCF0]/50 mt-2">
              Program, games & celebration
            </p>
          </motion.div>
        </div>

        {/* Theme Section */}
        <motion.div
          {...fadeInUp}
          className="bg-gradient-to-r from-[#1B3022]/50 to-[#121212]/50 p-8 rounded-lg border border-[#D4AF37]/20 mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-8 h-8 text-[#D4AF37]" />
            <h3 className="text-2xl font-serif text-[#D4AF37]">
              Dress Code: Old Money / Quiet Luxury
            </h3>
          </div>
          <p className="text-[#FDFCF0]/80 mb-6">
            Embrace timeless elegance and understated sophistication. Think
            refined classics over trends.
          </p>
          <div className="flex gap-4 flex-wrap items-center">
            <div className="text-sm text-[#FDFCF0]/70">Color Palette:</div>
            <div className="flex gap-2">
              <div
                className="w-12 h-12 rounded-full bg-[#1B3022] border-2 border-[#D4AF37]/30"
                title="Forest Green"
              ></div>
              <div
                className="w-12 h-12 rounded-full bg-[#121212] border-2 border-[#D4AF37]/30"
                title="Charcoal"
              ></div>
              <div
                className="w-12 h-12 rounded-full bg-[#D4AF37] border-2 border-[#FDFCF0]/30"
                title="Champagne Gold"
              ></div>
              <div
                className="w-12 h-12 rounded-full bg-[#FDFCF0] border-2 border-[#D4AF37]/30"
                title="Ivory"
              ></div>
            </div>
          </div>
        </motion.div>

        {/* Map Section */}
        <motion.div
          {...fadeInUp}
          className="bg-[#121212]/50 p-8 rounded-lg border border-[#D4AF37]/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-8 h-8 text-[#D4AF37]" />
            <h3 className="text-2xl font-serif text-[#D4AF37]">Location</h3>
          </div>
          <div className="aspect-video bg-[#1B3022]/30 rounded-lg flex items-center justify-center border border-[#D4AF37]/10">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-[#D4AF37]/50 mx-auto mb-4" />
              <p className="text-[#FDFCF0]/50">Venue details to be announced</p>
              <p className="text-sm text-[#FDFCF0]/30 mt-2">
                Check your RSVP confirmation for location
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
