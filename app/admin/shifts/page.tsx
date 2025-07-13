"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Calendar,
  Clock,
  User,
  UserCheck,
  History,
  ArrowLeft,
} from "lucide-react";
import {
  supabase,
  type Shift,
  type Caregiver,
  type Client,
  type ShiftLog,
} from "@/lib/supabase";
import { toast } from "sonner";
import Link from "next/link";

interface ShiftFormData {
  caregiver_id: string;
  client_id: string;
  scheduled_date: string;
  start_time: string;
  end_time: string;
  service_type: string;
  hourly_rate: string;
  status: "assigned" | "checked_in" | "completed" | "cancelled" | "no_show";
  notes: string;
  admin_notes: string;
}

const initialFormData: ShiftFormData = {
  caregiver_id: "",
  client_id: "",
  scheduled_date: "",
  start_time: "",
  end_time: "",
  service_type: "",
  hourly_rate: "",
  status: "assigned",
  notes: "",
  admin_notes: "",
};

const serviceTypes = [
  "Personal Care",
  "In-Home Nursing",
  "Rehabilitation",
  "Specialty & Chronic Care",
  "Companionship",
  "Medication Management",
  "Meal Preparation",
  "Light Housekeeping",
  "Physical Therapy",
  "Wound Care",
];

export default function ShiftsPage() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [filteredShifts, setFilteredShifts] = useState<Shift[]>([]);
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [shiftLogs, setShiftLogs] = useState<ShiftLog[]>([]);
  const [selectedShiftLogs, setSelectedShiftLogs] = useState<ShiftLog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [formData, setFormData] = useState<ShiftFormData>(initialFormData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLogsDialogOpen, setIsLogsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [viewShift, setViewShift] = useState<Shift | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterShifts();
  }, [shifts, searchTerm, statusFilter, dateFilter]);

  const fetchData = async () => {
    try {
      // Fetch shifts with caregiver and client info
      const { data: shiftsData, error: shiftsError } = await supabase
        .from("shifts")
        .select(
          `
          *,
          caregiver:caregivers(id, first_name, last_name, hourly_rate),
          client:clients(id, first_name, last_name, address, city)
        `
        )
        .order("scheduled_date", { ascending: false });

      if (shiftsError) throw shiftsError;

      // Fetch caregivers
      const { data: caregiversData, error: caregiversError } = await supabase
        .from("caregivers")
        .select("*")
        .eq("status", "active")
        .order("first_name");

      if (caregiversError) throw caregiversError;

      // Fetch clients
      const { data: clientsData, error: clientsError } = await supabase
        .from("clients")
        .select("*")
        .eq("status", "active")
        .order("first_name");

      if (clientsError) throw clientsError;

      setShifts(shiftsData || []);
      setCaregivers(caregiversData || []);
      setClients(clientsData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const fetchShiftLogs = async (shiftId: string) => {
    try {
      const { data, error } = await supabase
        .from("shift_logs")
        .select("*")
        .eq("shift_id", shiftId)
        .order("performed_at", { ascending: false });

      if (error) throw error;
      setSelectedShiftLogs(data || []);
    } catch (error) {
      console.error("Error fetching shift logs:", error);
      toast.error("Failed to load shift logs");
    }
  };

  const filterShifts = () => {
    let filtered = shifts;

    if (searchTerm) {
      filtered = filtered.filter(
        (shift) =>
          shift.caregiver?.first_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          shift.caregiver?.last_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          shift.client?.first_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          shift.client?.last_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          shift.service_type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((shift) => shift.status === statusFilter);
    }

    if (dateFilter !== "all") {
      const today = new Date().toISOString().split("T")[0];
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

      if (dateFilter === "today") {
        filtered = filtered.filter((shift) => shift.scheduled_date === today);
      } else if (dateFilter === "upcoming") {
        filtered = filtered.filter((shift) => shift.scheduled_date >= today);
      } else if (dateFilter === "past") {
        filtered = filtered.filter((shift) => shift.scheduled_date < today);
      } else if (dateFilter === "this_week") {
        const weekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0];
        filtered = filtered.filter(
          (shift) =>
            shift.scheduled_date >= today && shift.scheduled_date <= weekFromNow
        );
      }
    }

    setFilteredShifts(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Combine scheduled_date and start_time into scheduled_at (ISO string)
      let scheduled_at = null;
      if (formData.scheduled_date && formData.start_time) {
        scheduled_at = `${formData.scheduled_date}T${formData.start_time}`;
      }
      const shiftData = {
        ...formData,
        // Convert empty strings to null for UUID fields
        caregiver_id:
          formData.caregiver_id === "" ? null : formData.caregiver_id,
        client_id: formData.client_id === "" ? null : formData.client_id,
        hourly_rate: formData.hourly_rate
          ? Number.parseFloat(formData.hourly_rate)
          : null,
        scheduled_at, // Add the combined field
      };

      if (editingId) {
        const { error } = await supabase
          .from("shifts")
          .update(shiftData)
          .eq("id", editingId);

        if (error) throw error;
        toast.success("Shift updated successfully");
      } else {
        const { error } = await supabase.from("shifts").insert([shiftData]);

        if (error) throw error;
        toast.success("Shift scheduled successfully");
      }

      setFormData(initialFormData);
      setEditingId(null);
      setIsDialogOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error saving shift:", error);
      toast.error("Failed to save shift");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (shift: Shift) => {
    setFormData({
      caregiver_id: shift.caregiver_id || "",
      client_id: shift.client_id || "",
      scheduled_date: shift.scheduled_date,
      start_time: shift.start_time,
      end_time: shift.end_time,
      service_type: shift.service_type,
      hourly_rate: shift.hourly_rate?.toString() || "",
      status: shift.status,
      notes: shift.notes || "",
      admin_notes: shift.admin_notes || "",
    });
    setEditingId(shift.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this shift?")) return;

    try {
      const { error } = await supabase.from("shifts").delete().eq("id", id);

      if (error) throw error;
      toast.success("Shift deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting shift:", error);
      toast.error("Failed to delete shift");
    }
  };

  const handleStatusChange = async (shiftId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("shifts")
        .update({ status: newStatus })
        .eq("id", shiftId);

      if (error) throw error;
      toast.success(`Shift status updated to ${newStatus}`);
      fetchData();
    } catch (error) {
      console.error("Error updating shift status:", error);
      toast.error("Failed to update shift status");
    }
  };

  const viewShiftLogs = async (shift: Shift) => {
    await fetchShiftLogs(shift.id);
    setIsLogsDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      assigned: "bg-blue-100 text-blue-800",
      checked_in: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      no_show: "bg-gray-100 text-gray-800",
    };
    return (
      statusColors[status as keyof typeof statusColors] ||
      "bg-gray-100 text-gray-800"
    );
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Shifts Management
              </h1>
              <p className="text-gray-600 mt-2">
                Schedule and manage caregiver shifts
              </p>
            </div>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setFormData(initialFormData);
                  setEditingId(null);
                  setIsDialogOpen(true); // Explicitly open the dialog
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Schedule Shift
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit Shift" : "Schedule New Shift"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Assignment */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Assignment</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="caregiver_id">Caregiver *</Label>
                      <Select
                        value={formData.caregiver_id}
                        onValueChange={(value) => {
                          setFormData({ ...formData, caregiver_id: value });
                          // Auto-fill hourly rate if caregiver is selected
                          const selectedCaregiver = caregivers.find(
                            (c) => c.id === value
                          );
                          if (
                            selectedCaregiver?.hourly_rate &&
                            !formData.hourly_rate
                          ) {
                            setFormData((prev) => ({
                              ...prev,
                              hourly_rate:
                                selectedCaregiver.hourly_rate!.toString(),
                            }));
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select caregiver" />
                        </SelectTrigger>
                        <SelectContent>
                          {caregivers.map((caregiver) => (
                            <SelectItem key={caregiver.id} value={caregiver.id}>
                              {caregiver.first_name} {caregiver.last_name}
                              {caregiver.hourly_rate && (
                                <span className="text-gray-500">
                                  {" "}
                                  - ${caregiver.hourly_rate}/hr
                                </span>
                              )}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="client_id">Client *</Label>
                      <Select
                        value={formData.client_id}
                        onValueChange={(value) =>
                          setFormData({ ...formData, client_id: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                        <SelectContent>
                          {clients.map((client) => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.first_name} {client.last_name}
                              <span className="text-gray-500">
                                {" "}
                                - {client.city}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Schedule */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Schedule</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="scheduled_date">Date *</Label>
                      <Input
                        id="scheduled_date"
                        type="date"
                        value={formData.scheduled_date}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            scheduled_date: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="start_time">Start Time *</Label>
                      <Input
                        id="start_time"
                        type="time"
                        value={formData.start_time}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            start_time: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="end_time">End Time *</Label>
                      <Input
                        id="end_time"
                        type="time"
                        value={formData.end_time}
                        onChange={(e) =>
                          setFormData({ ...formData, end_time: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Service Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="service_type">Service Type *</Label>
                      <Select
                        value={formData.service_type}
                        onValueChange={(value) =>
                          setFormData({ ...formData, service_type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceTypes.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="hourly_rate">Hourly Rate ($)</Label>
                      <Input
                        id="hourly_rate"
                        type="number"
                        step="0.01"
                        value={formData.hourly_rate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hourly_rate: e.target.value,
                          })
                        }
                        placeholder="Override default rate"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: any) =>
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="assigned">Assigned</SelectItem>
                        <SelectItem value="checked_in">Checked In</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="no_show">No Show</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Notes</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="notes">Shift Notes</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        rows={2}
                        placeholder="Notes for the caregiver..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="admin_notes">Admin Notes</Label>
                      <Textarea
                        id="admin_notes"
                        value={formData.admin_notes}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            admin_notes: e.target.value,
                          })
                        }
                        rows={2}
                        placeholder="Internal admin notes..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting
                      ? "Saving..."
                      : editingId
                      ? "Update"
                      : "Schedule"}{" "}
                    Shift
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search shifts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="checked_in">Checked In</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="no_show">No Show</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="this_week">This Week</SelectItem>
                  <SelectItem value="past">Past</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Shifts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Shifts ({filteredShifts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredShifts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No shifts found</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Caregiver</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredShifts.map((shift) => (
                    <TableRow key={shift.id}>
                      <TableCell>
                        <div>
                          <div className="flex items-center text-sm">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(shift.scheduled_date)}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatTime(shift.start_time)} -{" "}
                            {formatTime(shift.end_time)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className="text-blue-700 hover:underline cursor-pointer"
                          onClick={() => setViewShift(shift)}
                        >
                          {shift.caregiver
                            ? `${shift.caregiver.first_name} ${shift.caregiver.last_name}`
                            : shift.caregiver_id}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className="text-blue-700 hover:underline cursor-pointer"
                          onClick={() => setViewShift(shift)}
                        >
                          {shift.client
                            ? `${shift.client.first_name} ${shift.client.last_name}`
                            : shift.client_id}
                        </span>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{shift.service_type}</p>
                      </TableCell>
                      <TableCell>
                        <p>{shift.duration_hours}h</p>
                      </TableCell>
                      <TableCell>
                        {shift.total_cost ? (
                          <p className="font-medium">
                            ${shift.total_cost.toFixed(2)}
                          </p>
                        ) : (
                          <span className="text-gray-400">Not calculated</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={shift.status}
                          onValueChange={(value) =>
                            handleStatusChange(shift.id, value)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <Badge className={getStatusBadge(shift.status)}>
                              {shift.status.replace("_", " ")}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="assigned">Assigned</SelectItem>
                            <SelectItem value="checked_in">
                              Checked In
                            </SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                            <SelectItem value="no_show">No Show</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(shift)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewShiftLogs(shift)}
                          >
                            <History className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(shift.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Shift Logs Dialog */}
        <Dialog open={isLogsDialogOpen} onOpenChange={setIsLogsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Shift Activity Log</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {selectedShiftLogs.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No activity logs found
                </p>
              ) : (
                selectedShiftLogs.map((log) => (
                  <div
                    key={log.id}
                    className="border-l-2 border-blue-200 pl-4 pb-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{log.action}</h4>
                      <span className="text-sm text-gray-500">
                        {new Date(log.performed_at).toLocaleString()}
                      </span>
                    </div>
                    {log.old_status && log.new_status && (
                      <p className="text-sm text-gray-600">
                        Status changed from{" "}
                        <Badge variant="secondary">{log.old_status}</Badge> to{" "}
                        <Badge variant="secondary">{log.new_status}</Badge>
                      </p>
                    )}
                    {log.notes && (
                      <p className="text-sm text-gray-600 mt-1">{log.notes}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      Performed by: {log.performed_by}
                    </p>
                  </div>
                ))
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Shift Details Dialog */}
        <Dialog open={!!viewShift} onOpenChange={() => setViewShift(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {viewShift && (
              <>
                <DialogHeader>
                  <DialogTitle>Shift Details</DialogTitle>
                  <DialogDescription>
                    <div className="mb-2 text-sm text-gray-500">
                      ID: {viewShift.id}
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">Date:</span>{" "}
                    {viewShift.scheduled_date}
                  </div>
                  <div>
                    <span className="font-semibold">Start Time:</span>{" "}
                    {viewShift.start_time}
                  </div>
                  <div>
                    <span className="font-semibold">End Time:</span>{" "}
                    {viewShift.end_time}
                  </div>
                  <div>
                    <span className="font-semibold">Client:</span>{" "}
                    {viewShift.client
                      ? `${viewShift.client.first_name} ${viewShift.client.last_name}`
                      : viewShift.client_id}
                  </div>
                  <div>
                    <span className="font-semibold">Caregiver:</span>{" "}
                    {viewShift.caregiver
                      ? `${viewShift.caregiver.first_name} ${viewShift.caregiver.last_name}`
                      : viewShift.caregiver_id}
                  </div>
                  <div>
                    <span className="font-semibold">Service Type:</span>{" "}
                    {viewShift.service_type}
                  </div>
                  <div>
                    <span className="font-semibold">Hourly Rate:</span>{" "}
                    {viewShift.hourly_rate}
                  </div>
                  <div>
                    <span className="font-semibold">Status:</span>{" "}
                    {viewShift.status}
                  </div>
                  <div>
                    <span className="font-semibold">Notes:</span>
                    <br />{" "}
                    <span className="whitespace-pre-line">
                      {viewShift.notes || (
                        <span className="text-gray-400">None</span>
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Admin Notes:</span>
                    <br />{" "}
                    <span className="whitespace-pre-line">
                      {viewShift.admin_notes || (
                        <span className="text-gray-400">None</span>
                      )}
                    </span>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
