import { useState } from "react";
import { AdminDashboard } from "@/app/components/admin-dashboard";
import { Separator } from "@/app/components/ui/separator";
import { Toaster } from "@/app/components/ui/sonner";
import { Hero } from "@/app/components/Hero.tsx";
import { About } from "@/app/components/About.tsx";
import { Details } from "@/app/components/Details.tsx";
import { Gallery } from "@/app/components/Gallery.tsx";
import { RSVP } from "@/app/components/RSVP.tsx";
import { Navigation } from "@/app/components/Navigation.tsx";

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  if (showAdmin) {
    return <AdminDashboard />;
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen relative">
      <Toaster position="top-center" richColors />

      <Navigation />
      {/* Hero Section */}
      <Hero />
      {/* About Section */}
      <About />
      {/* Event Details Section */}
      <Details />
      {/* Gallery Section */}
      <Gallery />

      {/* RSVP Section */}
      <RSVP />

      {/* Footer */}
      <footer className="py-20 px-6 bg-[#FAF9F6] border-t border-[#AD8B73]/10 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Decorative Initial or Logo */}
          <div className="mb-8">
            <span className="font-serif text-3xl text-[#AD8B73]/40 italic tracking-widest">
              A
            </span>
          </div>

          <div className="space-y-4">
            <h4 className="text-[#4A3728] font-serif text-lg tracking-wide">
              Questions about the evening?
            </h4>
            <p className="text-[#5C4033]/60 font-light">
              Please reach out to our concierge at{" "}
              <a
                href="mailto:mikelojeda25@gmail.com"
                className="text-[#AD8B73] hover:text-[#4A3728] transition-colors font-medium border-b border-[#AD8B73]/30"
              >
                mikelojeda25@gmail.com
              </a>
            </p>
          </div>

          {/* Elegant Divider */}
          <div className="flex items-center justify-center gap-4 my-12">
            <div className="h-[1px] w-16 bg-[#AD8B73]/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#AD8B73]/40" />
            <div className="h-[1px] w-16 bg-[#AD8B73]/20" />
          </div>

          {/* Bottom Credits & Hidden Admin Link */}
          <div className="flex flex-col items-center gap-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#AD8B73]/60 font-bold">
              Twenty-Five & Grace — 2026
            </p>

            <button
              onClick={() => setShowAdmin(true)}
              className="text-[10px] uppercase tracking-widest text-[#AD8B73]/30 hover:text-[#4A3728] transition-all duration-300"
            >
              Manage Guest List
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
