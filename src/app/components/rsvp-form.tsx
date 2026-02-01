import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Added for smooth field reveal
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

export function RSVPForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: "",
    dietaryRestrictions: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.attending) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-c6c41ee9/rsvp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            attending: formData.attending === "yes",
            dietaryRestrictions: formData.dietaryRestrictions,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("We've received your RSVP. Thank you!");
        setFormData({
          name: "",
          email: "",
          attending: "",
          dietaryRestrictions: "",
        });
      } else {
        toast.error(data.error || "Failed to submit RSVP");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white/40 backdrop-blur-md md:p-12 rounded-[3rem]">
      <form onSubmit={handleSubmit} className="space-y-8 w-full">
        {/* Name Field */}
        <div className="space-y-3">
          <Label htmlFor="name" className="text-[#4A3728] font-serif text-lg">
            Full Name <span className="text-[#AD8B73]">*</span>
          </Label>
          <Input
            id="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-white/60 border-[#AD8B73]/20 text-[#4A3728] placeholder:text-[#AD8B73]/100 h-12 rounded-xl focus-visible:ring-[#AD8B73]"
            required
          />
        </div>

        {/* Email Field */}
        <div className="space-y-3">
          <Label htmlFor="email" className="text-[#4A3728] font-serif text-lg">
            Email Address <span className="text-[#AD8B73]">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your-email@gmail.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="bg-white/60 border-[#AD8B73]/20 text-[#4A3728] placeholder:text-[#AD8B73]/100 h-12 rounded-xl focus-visible:ring-[#AD8B73]"
            required
          />
        </div>

        {/* Attendance Selection */}
        <div className="space-y-4">
          <Label className="text-[#4A3728] font-serif text-lg">
            Response <span className="text-[#AD8B73]">*</span>
          </Label>
          <RadioGroup
            value={formData.attending}
            onValueChange={(value) =>
              setFormData({ ...formData, attending: value })
            }
            className="flex flex-col gap-3"
          >
            <div
              className={`flex items-center space-x-3 p-4 rounded-2xl border transition-all ${formData.attending === "yes" ? "bg-[#AD8B73]/10 border-[#AD8B73]" : "bg-white/40 border-[#AD8B73]/10"}`}
            >
              <RadioGroupItem
                value="yes"
                id="yes"
                className="border-[#AD8B73] text-[#AD8B73]"
              />
              <Label
                htmlFor="yes"
                className="text-[#4A3728] font-medium cursor-pointer flex-1"
              >
                Joyfully Accepts
              </Label>
            </div>
            <div
              className={`flex items-center space-x-3 p-4 rounded-2xl border transition-all ${formData.attending === "no" ? "bg-gray-100 border-gray-400" : "bg-white/40 border-[#AD8B73]/10"}`}
            >
              <RadioGroupItem
                value="no"
                id="no"
                className="border-[#AD8B73] text-[#AD8B73]"
              />
              <Label
                htmlFor="no"
                className="text-[#4A3728]/60 font-medium cursor-pointer flex-1"
              >
                Regretfully Declines
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Animated Dietary Restrictions */}
        <AnimatePresence>
          {formData.attending === "yes" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 overflow-hidden"
            >
              <Label
                htmlFor="dietary"
                className="text-[#4A3728] font-serif text-lg"
              >
                Dietary Requirements
              </Label>
              <Textarea
                id="dietary"
                value={formData.dietaryRestrictions}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dietaryRestrictions: e.target.value,
                  })
                }
                className="bg-white/60 border-[#AD8B73]/20 text-[#4A3728] placeholder:text-[#AD8B73]/100 rounded-xl min-h-[100px] focus-visible:ring-[#AD8B73]"
                placeholder="Allergies or preferences we should know about..."
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#4A3728] hover:bg-[#2D2118] text-white font-serif py-8 text-xl rounded-2xl transition-all duration-300 shadow-lg shadow-[#4A3728]/20 group"
        >
          {loading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <span className="flex items-center gap-2">
              Send RSVP{" "}
              <Send
                size={18}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </span>
          )}
        </Button>
      </form>
    </div>
  );
}
