import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Badge } from "@/app/components/ui/badge";
import { Trash2, Lock, Download } from "lucide-react";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import { toast } from "sonner";

interface RSVP {
  id: string;
  name: string;
  email: string;
  attending: boolean;
  dietaryRestrictions: string;
  createdAt: string;
}

export function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (password === "admin2026") {
      setIsAuthenticated(true);
      fetchRSVPs(password);
    } else {
      toast.error("Incorrect password");
    }
  };

  const fetchRSVPs = async (authPassword: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-c6c41ee9/rsvps?password=${encodeURIComponent(authPassword)}`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setRsvps(data.rsvps || []);
      } else {
        toast.error("Failed to fetch RSVPs");
        console.error("Failed to fetch RSVPs:", await response.text());
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error("Fetch RSVPs error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-c6c41ee9/rsvp/${id}?password=${encodeURIComponent(password)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        },
      );

      if (response.ok) {
        toast.success("RSVP deleted");
        setRsvps(rsvps.filter((r) => r.id !== id));
      } else {
        toast.error("Failed to delete RSVP");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error("Delete RSVP error:", error);
    }
  };

  const exportToCSV = () => {
    if (rsvps.length === 0) {
      toast.error("No RSVPs to export");
      return;
    }

    // CSV headers
    const headers = ["Name", "Email", "Status", "Dietary Restrictions", "Date"];
    const rows = rsvps.map((rsvp) => [
      rsvp.name,
      rsvp.email,
      rsvp.attending ? "Attending" : "Declined",
      rsvp.dietaryRestrictions || "",
      new Date(rsvp.createdAt).toLocaleDateString(),
    ]);

    // Create CSV content
    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((cell) => {
            // Escape quotes and wrap in quotes if contains comma
            const escaped = String(cell).replace(/"/g, '""');
            return escaped.includes(",") ? `"${escaped}"` : escaped;
          })
          .join(","),
      ),
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `birthday-rsvps-${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("RSVPs exported as CSV");
  };

  useEffect(() => {
    if (isAuthenticated && password) {
      const interval = setInterval(() => {
        fetchRSVPs(password);
      }, 10000); // Refresh every 10 seconds

      return () => clearInterval(interval);
    }
  }, [isAuthenticated, password]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1B3022] flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-[#1B3022]/50 border-[#D4AF37]/30">
          <CardHeader>
            <CardTitle className="text-2xl text-[#D4AF37] flex items-center gap-2">
              <Lock className="h-6 w-6" />
              Admin Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="bg-[#121212]/50 border-[#D4AF37]/30 text-[#FDFCF0]"
            />
            <Button
              onClick={handleLogin}
              className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-[#121212]"
            >
              Login
            </Button>
            <p className="text-sm text-[#FDFCF0]/50 text-center">
              Default password: admin2026
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const attendingCount = rsvps.filter((r) => r.attending).length;
  const decliningCount = rsvps.filter((r) => !r.attending).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1B3022] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-serif text-[#D4AF37]">Guest List</h1>
          <div className="flex gap-2">
            <Button
              onClick={() => exportToCSV()}
              disabled={rsvps.length === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <Button
              onClick={() => fetchRSVPs(password)}
              disabled={loading}
              className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#121212]"
            >
              {loading ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-[#1B3022]/50 border-[#D4AF37]/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-[#FDFCF0]/70">
                Total RSVPs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#D4AF37]">
                {rsvps.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1B3022]/50 border-[#D4AF37]/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-[#FDFCF0]/70">
                Attending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">
                {attendingCount}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1B3022]/50 border-[#D4AF37]/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-[#FDFCF0]/70">
                Declining
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">
                {decliningCount}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-[#1B3022]/50 border-[#D4AF37]/30">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#D4AF37]/20">
                    <TableHead className="text-[#D4AF37]">Name</TableHead>
                    <TableHead className="text-[#D4AF37]">Email</TableHead>
                    <TableHead className="text-[#D4AF37]">Status</TableHead>
                    <TableHead className="text-[#D4AF37]">
                      Dietary Notes
                    </TableHead>
                    <TableHead className="text-[#D4AF37]">Date</TableHead>
                    <TableHead className="text-[#D4AF37]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rsvps.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-[#FDFCF0]/50 py-8"
                      >
                        No RSVPs yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    rsvps.map((rsvp) => (
                      <TableRow key={rsvp.id} className="border-[#D4AF37]/10">
                        <TableCell className="text-[#FDFCF0] font-medium">
                          {rsvp.name}
                        </TableCell>
                        <TableCell className="text-[#FDFCF0]/70">
                          {rsvp.email}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={rsvp.attending ? "default" : "destructive"}
                            className={
                              rsvp.attending ? "bg-green-600" : "bg-red-600"
                            }
                          >
                            {rsvp.attending ? "Attending" : "Declined"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-[#FDFCF0]/70 max-w-xs truncate">
                          {rsvp.dietaryRestrictions || "—"}
                        </TableCell>
                        <TableCell className="text-[#FDFCF0]/70">
                          {new Date(rsvp.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(rsvp.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
