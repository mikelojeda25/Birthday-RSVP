import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import { toast } from "sonner";

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
        toast.success("RSVP submitted successfully!");
        setFormData({
          name: "",
          email: "",
          attending: "",
          dietaryRestrictions: "",
        });
      } else {
        toast.error(data.error || "Failed to submit RSVP");
        console.error("RSVP submission error:", data);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("RSVP submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-[#FDFCF0] text-base">
          Full Name *
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="bg-[#1B3022]/30 border-[#D4AF37]/30 text-[#FDFCF0] focus:border-[#D4AF37]"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-[#FDFCF0] text-base">
          Email Address *
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="bg-[#1B3022]/30 border-[#D4AF37]/30 text-[#FDFCF0] focus:border-[#D4AF37]"
          required
        />
      </div>

      <div className="space-y-3">
        <Label className="text-[#FDFCF0] text-base">Will you attend? *</Label>
        <RadioGroup
          value={formData.attending}
          onValueChange={(value) =>
            setFormData({ ...formData, attending: value })
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="yes"
              id="yes"
              className="border-[#D4AF37] text-[#D4AF37]"
            />
            <Label htmlFor="yes" className="text-[#FDFCF0] cursor-pointer">
              Joyfully accept
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="no"
              id="no"
              className="border-[#D4AF37] text-[#D4AF37]"
            />
            <Label htmlFor="no" className="text-[#FDFCF0] cursor-pointer">
              Regretfully decline
            </Label>
          </div>
        </RadioGroup>
      </div>

      {formData.attending === "yes" && (
        <div className="space-y-2">
          <Label htmlFor="dietary" className="text-[#FDFCF0] text-base">
            Dietary Restrictions or Preferences
          </Label>
          <Textarea
            id="dietary"
            value={formData.dietaryRestrictions}
            onChange={(e) =>
              setFormData({ ...formData, dietaryRestrictions: e.target.value })
            }
            className="bg-[#1B3022]/30 border-[#D4AF37]/30 text-[#FDFCF0] focus:border-[#D4AF37] min-h-[100px]"
            placeholder="Please let us know of any dietary requirements..."
          />
        </div>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-[#121212] font-semibold py-6 text-lg"
      >
        {loading ? "Submitting..." : "Submit RSVP"}
      </Button>
    </form>
  );
}
