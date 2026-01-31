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
    <div className="min-h-screen">
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
      <footer className="py-16 px-4 border-t border-[#D4AF37]/20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#FDFCF0]/50 mb-4">
            For inquiries, please contact us at{" "}
            <a
              href="mailto:event@the25th.com"
              className="text-[#D4AF37] hover:underline"
            >
              event@the25th.com
            </a>
          </p>
          <Separator className="max-w-xs mx-auto my-8 bg-[#D4AF37]/20" />
          <button
            onClick={() => setShowAdmin(true)}
            className="text-xs text-[#FDFCF0]/30 hover:text-[#D4AF37] transition-colors"
          >
            Guest List
          </button>
        </div>
      </footer>
    </div>
  );
}
