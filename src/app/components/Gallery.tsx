"use client";

import { motion } from "framer-motion";
import { ImageWithFallback } from "@/app/components/imgSettings/ImageWithFallback";

import img2 from "@/app/images/2.jpg";
import imgA from "@/app/images/a.jpg";
import imgB from "@/app/images/b.jpg";
import imgC from "@/app/images/c.jpg";
import imgD from "@/app/images/d.jpg";
import imgE from "@/app/images/e.jpg";
import imgF from "@/app/images/f.jpg";
import imgG from "@/app/images/g.jpg";
import imgH from "@/app/images/h.jpg";
import imgI from "@/app/images/i.jpg";
import imgJ from "@/app/images/j.jpg";
import aboutImg from "@/app/images/about.png";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4 },
};

export function Gallery() {
  const images = [
    imgA,
    img2,
    imgB,
    imgC,
    imgD,
    imgE,
    imgF,
    imgG,
    imgH,
    imgI,
    imgJ,
    aboutImg,
  ];

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20 space-y-4"
        >
          <h3 className="text-5xl md:text-6xl font-serif text-[#4A3728]">
            <span className="italic font-light text-[#AD8B73]">Gallery</span>
          </h3>
          <div className="w-24 h-[1px] bg-[#AD8B73]/30 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-[1px] md:gap-2 px-1">
          {images.map((img, index) => (
            <motion.div
              key={index}
              {...fadeInUp}
              className="aspect-square relative overflow-hidden"
            >
              <ImageWithFallback
                src={img}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
