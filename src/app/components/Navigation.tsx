import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navVariants = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const linkVariants = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const mobileMenuVariants = {
  closed: { opacity: 0, x: "100%" },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      staggerChildren: 0.1,
    },
  },
};

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Details", href: "#details" },
    { name: "Gallery", href: "#gallery" },
    { name: "RSVP", href: "#rsvp" },
  ];

  return (
    <motion.nav
      variants={navVariants}
      initial="initial"
      animate="animate"
      className="w-full py-4 px-6 top-0 z-50 fixed bg-transparent md:bg-[#AD8B73] md:border-b md:border-[#D4AF37]/20"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          variants={linkVariants}
          className="hidden md:block text-2xl font-serif text-[#FFFBE9]"
        >
          The 25th
        </motion.div>

        <div className="hidden md:flex space-x-10">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              variants={linkVariants}
              className="text-[#FFFBE9]/80 hover:text-[#eec02a] hover:font-medium transition-colors uppercase tracking-wider text-sm"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        <div className="md:hidden ml-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none p-2 text-[#AD8B73] rounded-lg shadow-lg border border-[#D4AF37]/20"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-[#AD8B73] z-40 flex flex-col items-center justify-center space-y-8"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-[#FFFBE9]"
            >
              <X size={32} />
            </button>

            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                variants={linkVariants}
                onClick={() => setIsOpen(false)}
                className="text-[#FFFBE9] text-3xl uppercase tracking-[0.2em] font-serif"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
