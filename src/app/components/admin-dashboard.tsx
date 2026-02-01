"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import { Trash2, Lock, Download, RefreshCw, Users } from "lucide-react";
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
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this guest?")) return;
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
        toast.success("Guest removed from list");
        setRsvps(rsvps.filter((r) => r.id !== id));
      } else {
        toast.error("Failed to delete RSVP");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const exportToCSV = () => {
    if (rsvps.length === 0) {
      toast.error("No RSVPs to export");
      return;
    }
    const headers = ["Name", "Email", "Status", "Dietary Restrictions", "Date"];
    const rows = rsvps.map((rsvp) => [
      rsvp.name,
      rsvp.email,
      rsvp.attending ? "Attending" : "Declined",
      rsvp.dietaryRestrictions || "None",
      new Date(rsvp.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute(
      "download",
      `guest-list-${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Guest list exported successfully");
  };

  useEffect(() => {
    if (isAuthenticated && password) {
      const interval = setInterval(() => fetchRSVPs(password), 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, password]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFFBE9] flex items-center justify-center p-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="max-w-md w-full bg-white border-2 border-[#D4AF37]/30 shadow-2xl rounded-[2rem]">
            <CardHeader className="text-center pt-10">
              <div className="mx-auto bg-[#AD8B73]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Lock className="h-8 w-8 text-[#AD8B73]" />
              </div>
              <CardTitle className="text-3xl font-serif text-[#4A3728]">
                Admin Vault
              </CardTitle>
              <p className="text-[#AD8B73] text-sm">
                Please enter the security key to view guests
              </p>
            </CardHeader>
            <CardContent className="space-y-6 pb-12 px-10">
              <Input
                type="password"
                placeholder="Security Key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="bg-gray-50 border-[#AD8B73]/30 text-[#4A3728] h-14 rounded-xl focus-visible:ring-[#4A3728]"
              />
              <Button
                onClick={handleLogin}
                className="w-full bg-[#4A3728] hover:bg-black text-white h-14 rounded-xl text-lg font-serif transition-all"
              >
                Submit the Key
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  const attendingCount = rsvps.filter((r) => r.attending).length;

  return (
    <div className="min-h-screen bg-[#FFFBE9] p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-serif text-[#4A3728] mb-2 text-center md:text-left">
              Guest Registry
            </h1>
            <p className="text-[#AD8B73] text-center md:text-left tracking-widest uppercase text-xs">
              The 25th Celebration • Private Access
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={exportToCSV}
              variant="outline"
              className="border-[#AD8B73] text-[#4A3728] hover:bg-[#AD8B73] hover:text-white rounded-full px-6"
            >
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
            <Button
              onClick={() => fetchRSVPs(password)}
              disabled={loading}
              className="bg-[#D4AF37] hover:bg-[#B8860B] text-white rounded-full px-6"
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
              {loading ? "Syncing..." : "Refresh List"}
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              label: "Total Responses",
              val: rsvps.length,
              icon: <Users className="text-[#AD8B73]" />,
            },
            {
              label: "Confirmed Attending",
              val: attendingCount,
              icon: <div className="w-3 h-3 bg-green-500 rounded-full" />,
            },
            {
              label: "Declined",
              val: rsvps.length - attendingCount,
              icon: <div className="w-3 h-3 bg-gray-300 rounded-full" />,
            },
          ].map((stat, i) => (
            <Card
              key={i}
              className="bg-white border border-[#AD8B73]/20 shadow-sm rounded-3xl"
            >
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-tighter text-[#AD8B73] font-bold mb-1">
                    {stat.label}
                  </p>
                  <p className="text-4xl font-serif text-[#4A3728]">
                    {stat.val}
                  </p>
                </div>
                {stat.icon}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guest Table */}
        <Card className="bg-white border border-[#AD8B73]/20 shadow-xl rounded-[2.5rem] overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow className="border-b border-[#AD8B73]/10">
                    <TableHead className="py-6 px-8 text-[#4A3728] font-bold uppercase text-[10px] tracking-widest">
                      Full Name
                    </TableHead>
                    <TableHead className="text-[#4A3728] font-bold uppercase text-[10px] tracking-widest">
                      Email Address
                    </TableHead>
                    <TableHead className="text-[#4A3728] font-bold uppercase text-[10px] tracking-widest text-center">
                      Status
                    </TableHead>
                    <TableHead className="text-[#4A3728] font-bold uppercase text-[10px] tracking-widest">
                      Dietary Requirements
                    </TableHead>
                    <TableHead className="text-[#4A3728] font-bold uppercase text-[10px] tracking-widest">
                      Date
                    </TableHead>
                    <TableHead className="text-[#4A3728] font-bold uppercase text-[10px] tracking-widest text-right px-8">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rsvps.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-20 text-[#AD8B73] italic"
                      >
                        No guests have registered yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    rsvps.map((rsvp) => (
                      <TableRow
                        key={rsvp.id}
                        className="border-b border-gray-50 hover:bg-[#FFFBE9]/50 transition-colors"
                      >
                        <TableCell className="py-5 px-8 text-[#4A3728] font-medium">
                          {rsvp.name}
                        </TableCell>
                        <TableCell className="text-[#AD8B73] text-sm">
                          {rsvp.email}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            className={`rounded-full px-4 py-1 text-[10px] uppercase font-bold tracking-widest shadow-none ${
                              rsvp.attending
                                ? "bg-green-100 text-green-700 border border-green-200"
                                : "bg-gray-100 text-gray-500 border border-gray-200"
                            }`}
                          >
                            {rsvp.attending ? "Confirmed" : "Declined"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-[#4A3728] text-sm max-w-xs italic truncate">
                          {rsvp.dietaryRestrictions || "—"}
                        </TableCell>
                        <TableCell className="text-[#AD8B73] text-xs">
                          {new Date(rsvp.createdAt).toLocaleDateString(
                            undefined,
                            { month: "short", day: "numeric" },
                          )}
                        </TableCell>
                        <TableCell className="text-right px-8">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(rsvp.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors"
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
