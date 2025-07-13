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
  Phone,
  Mail,
  MapPin,
  ArrowLeft,
} from "lucide-react";
import { supabase, type Caregiver } from "@/lib/supabase";
import { toast } from "sonner";
import Link from "next/link";

interface CaregiverFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "on_leave";
  certifications: string[];
  notes: string;
}

const initialFormData: CaregiverFormData = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  status: "active",
  certifications: [],
  notes: "",
};

const availabilityOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const specializationOptions = [
  "Personal Care",
  "Medication Management",
  "Nursing Care",
  "Wound Care",
  "Companionship",
  "Light Housekeeping",
  "Physical Therapy",
  "Mobility Assistance",
  "Dementia Care",
  "Post-Surgery Care",
];

export default function CaregiversPage() {
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [filteredCaregivers, setFilteredCaregivers] = useState<Caregiver[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [formData, setFormData] = useState<CaregiverFormData>(initialFormData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [viewCaregiver, setViewCaregiver] = useState<Caregiver | null>(null);

  useEffect(() => {
    fetchCaregivers();
  }, []);

  useEffect(() => {
    filterCaregivers();
  }, [caregivers, searchTerm, statusFilter]);

  const fetchCaregivers = async () => {
    try {
      const { data, error } = await supabase
        .from("caregivers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCaregivers(data || []);
    } catch (error) {
      console.error("Error fetching caregivers:", error);
      toast.error("Failed to load caregivers");
    } finally {
      setLoading(false);
    }
  };

  const filterCaregivers = () => {
    let filtered = caregivers;

    if (searchTerm) {
      filtered = filtered.filter(
        (caregiver) =>
          caregiver.first_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          caregiver.last_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          caregiver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          caregiver.phone.includes(searchTerm)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (caregiver) => caregiver.status === statusFilter
      );
    }

    setFilteredCaregivers(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const caregiverData = {
        ...formData,
        certifications: formData.certifications || [],
      };

      if (editingId) {
        const { error } = await supabase
          .from("caregivers")
          .update(caregiverData)
          .eq("id", editingId);

        if (error) throw error;
        toast.success("Caregiver updated successfully");
      } else {
        const { error } = await supabase
          .from("caregivers")
          .insert([caregiverData]);

        if (error) throw error;
        toast.success("Caregiver added successfully");
      }

      setFormData(initialFormData);
      setEditingId(null);
      setIsDialogOpen(false);
      fetchCaregivers();
    } catch (error) {
      console.error("Error saving caregiver:", error);
      toast.error("Failed to save caregiver");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (caregiver: Caregiver) => {
    setFormData({
      first_name: caregiver.first_name,
      last_name: caregiver.last_name,
      email: caregiver.email,
      phone: caregiver.phone,
      status: caregiver.status,
      certifications: caregiver.certifications || [],
      notes: caregiver.notes || "",
    });
    setEditingId(caregiver.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this caregiver?")) return;

    try {
      const { error } = await supabase.from("caregivers").delete().eq("id", id);

      if (error) throw error;
      toast.success("Caregiver deleted successfully");
      fetchCaregivers();
    } catch (error) {
      console.error("Error deleting caregiver:", error);
      toast.error("Failed to delete caregiver");
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      on_leave: "bg-yellow-100 text-yellow-800",
    };
    return (
      statusColors[status as keyof typeof statusColors] ||
      "bg-gray-100 text-gray-800"
    );
  };

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item)
      ? array.filter((i) => i !== item)
      : [...array, item];
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
                Caregivers Management
              </h1>
              <p className="text-gray-600 mt-2">Manage your caregiver team</p>
            </div>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setFormData(initialFormData);
                  setEditingId(null);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Caregiver
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit Caregiver" : "Add New Caregiver"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first_name">First Name *</Label>
                      <Input
                        id="first_name"
                        value={formData.first_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            first_name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="last_name">Last Name *</Label>
                      <Input
                        id="last_name"
                        value={formData.last_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            last_name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(
                        value: "active" | "inactive" | "on_leave"
                      ) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="on_leave">On Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Professional Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="certifications">Certifications</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {specializationOptions.map((cert) => (
                          <label
                            key={cert}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              checked={formData.certifications.includes(cert)}
                              onChange={() =>
                                setFormData({
                                  ...formData,
                                  certifications: toggleArrayItem(
                                    formData.certifications,
                                    cert
                                  ),
                                })
                              }
                            />
                            <span className="text-sm">{cert}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    rows={3}
                  />
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
                    {submitting ? "Saving..." : editingId ? "Update" : "Add"}{" "}
                    Caregiver
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
                    placeholder="Search caregivers..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="on_leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Caregivers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Caregivers ({filteredCaregivers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredCaregivers.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No caregivers found</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Certifications</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCaregivers.map((caregiver) => (
                    <TableRow key={caregiver.id}>
                      <TableCell>
                        <div>
                          <p
                            className="font-medium text-blue-700 hover:underline cursor-pointer"
                            onClick={() => setViewCaregiver(caregiver)}
                          >
                            {caregiver.first_name} {caregiver.last_name}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1" />
                            {caregiver.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-1" />
                            {caregiver.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(caregiver.status)}>
                          {caregiver.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {caregiver.certifications?.slice(0, 2).map((cert) => (
                            <Badge
                              key={cert}
                              variant="secondary"
                              className="text-xs"
                            >
                              {cert}
                            </Badge>
                          ))}
                          {(caregiver.certifications?.length || 0) > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{(caregiver.certifications?.length || 0) - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {caregiver.notes ? (
                          <p className="text-sm text-gray-700">
                            {caregiver.notes}
                          </p>
                        ) : (
                          <span className="text-gray-400">No notes</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(caregiver)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(caregiver.id)}
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
      </div>

      {/* Caregiver Details Dialog */}
      <Dialog
        open={!!viewCaregiver}
        onOpenChange={() => setViewCaregiver(null)}
      >
        <DialogContent>
          {viewCaregiver && (
            <>
              <DialogHeader>
                <DialogTitle>Caregiver Details</DialogTitle>
                <DialogDescription>
                  <div className="mb-2 text-sm text-gray-500">
                    ID: {viewCaregiver.id}
                  </div>
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Name:</span>{" "}
                  {viewCaregiver.first_name} {viewCaregiver.last_name}
                </div>
                <div>
                  <span className="font-semibold">Email:</span>{" "}
                  {viewCaregiver.email}
                </div>
                <div>
                  <span className="font-semibold">Phone:</span>{" "}
                  {viewCaregiver.phone}
                </div>
                <div>
                  <span className="font-semibold">Status:</span>{" "}
                  {viewCaregiver.status.replace("_", " ")}
                </div>
                <div>
                  <span className="font-semibold">Certifications:</span>{" "}
                  {viewCaregiver.certifications?.length ? (
                    viewCaregiver.certifications.join(", ")
                  ) : (
                    <span className="text-gray-400">None</span>
                  )}
                </div>
                <div>
                  <span className="font-semibold">Notes:</span>
                  <br />{" "}
                  <span className="whitespace-pre-line">
                    {viewCaregiver.notes || (
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
  );
}
