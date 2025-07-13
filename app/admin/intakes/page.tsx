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
  Calendar,
  ArrowLeft,
} from "lucide-react";
import { supabase, type Intake, type Caregiver } from "@/lib/supabase";
import { toast } from "sonner";
import Link from "next/link";

// Add import for useRouter to refresh after conversion
import { useRouter } from "next/navigation";

interface IntakeFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
  date_of_birth: string;
  gender: string;
  medical_conditions: string;
  medications: string;
  allergies: string;
  mobility_level: string;
  care_requirements: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relationship: string;
  insurance_provider: string;
  insurance_number: string;
  preferred_start_date: string;
  preferred_schedule: string;
  additional_notes: string;
  status: "pending" | "approved" | "rejected" | "assigned";
  assigned_caregiver_id: string;
  admin_notes: string;
  source: "booking" | "admin";
}

const initialFormData: IntakeFormData = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postal_code: "",
  date_of_birth: "",
  gender: "not_specified",
  medical_conditions: "",
  medications: "",
  allergies: "",
  mobility_level: "not_specified",
  care_requirements: "",
  emergency_contact_name: "",
  emergency_contact_phone: "",
  emergency_contact_relationship: "",
  insurance_provider: "",
  insurance_number: "",
  preferred_start_date: "",
  preferred_schedule: "not_specified",
  additional_notes: "",
  status: "pending",
  assigned_caregiver_id: "unassigned",
  admin_notes: "",
  source: "admin",
};

const mobilityLevels = [
  { value: "not_specified", label: "Not Specified" },
  { value: "Independent", label: "Independent" },
  { value: "Needs Assistance", label: "Needs Assistance" },
  { value: "Wheelchair", label: "Wheelchair" },
  { value: "Bedridden", label: "Bedridden" },
];

const genderOptions = [
  { value: "not_specified", label: "Not Specified" },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
  { value: "Prefer not to say", label: "Prefer not to say" },
];

const preferredScheduleOptions = [
  { value: "not_specified", label: "Not Specified" },
  { value: "Morning", label: "Morning" },
  { value: "Afternoon", label: "Afternoon" },
  { value: "Evening", label: "Evening" },
  { value: "Night", label: "Night" },
  { value: "Weekdays", label: "Weekdays" },
  { value: "Weekends", label: "Weekends" },
  { value: "Flexible", label: "Flexible" },
];

// Utility to calculate age from date_of_birth
function getAge(dateString?: string) {
  if (!dateString) return null;
  const today = new Date();
  const dob = new Date(dateString);
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

export default function BookingsPage() {
  const [intakes, setIntakes] = useState<Intake[]>([]);
  const [filteredIntakes, setFilteredIntakes] = useState<Intake[]>([]);
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [formData, setFormData] = useState<IntakeFormData>({
    ...initialFormData,
    source: "admin",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [viewIntake, setViewIntake] = useState<Intake | null>(null);

  const router = useRouter();

  useEffect(() => {
    fetchIntakesAndCaregivers();
  }, []);

  useEffect(() => {
    filterIntakes();
  }, [intakes, searchTerm, statusFilter]);

  const fetchIntakesAndCaregivers = async () => {
    try {
      const { data: intakesData, error: intakesError } = await supabase
        .from("intakes")
        .select(
          `
          *,
          assigned_caregiver:caregivers(id, first_name, last_name)
        `
        )
        .order("created_at", { ascending: false });

      if (intakesError) throw intakesError;

      // In fetchIntakesAndCaregivers, ensure caregivers have all required fields
      const { data: caregiversData, error: caregiversError } = await supabase
        .from("caregivers")
        .select("id, first_name, last_name, status")
        .eq("status", "active")
        .order("first_name");

      if (caregiversError) throw caregiversError;

      setIntakes(intakesData || []);
      setCaregivers(
        (caregiversData || []).map((c) => ({
          id: c.id,
          first_name: c.first_name,
          last_name: c.last_name,
          status: c.status || "active",
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const filterIntakes = () => {
    let filtered = intakes;

    if (searchTerm) {
      filtered = filtered.filter(
        (intake) =>
          intake.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          intake.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (intake.email &&
            intake.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          intake.phone.includes(searchTerm) ||
          intake.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((intake) => intake.status === statusFilter);
    }

    setFilteredIntakes(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const intakeData = {
        ...formData,
        date_of_birth: formData.date_of_birth || null,
        preferred_start_date: formData.preferred_start_date || null,
        assigned_caregiver_id:
          formData.assigned_caregiver_id === "unassigned"
            ? null
            : formData.assigned_caregiver_id,
        email: formData.email || null,
        gender: formData.gender === "not_specified" ? null : formData.gender,
        mobility_level:
          formData.mobility_level === "not_specified"
            ? null
            : formData.mobility_level,
        preferred_schedule:
          formData.preferred_schedule === "not_specified"
            ? null
            : formData.preferred_schedule,
        source: editingId ? formData.source : "admin",
      };

      if (editingId) {
        const { error } = await supabase
          .from("intakes")
          .update(intakeData)
          .eq("id", editingId);

        if (error) throw error;
        toast.success("Intake updated successfully");
      } else {
        const { error } = await supabase.from("intakes").insert([intakeData]);

        if (error) throw error;
        toast.success("New intake added successfully");
      }

      setFormData(initialFormData);
      setEditingId(null);
      setIsDialogOpen(false);
      fetchIntakesAndCaregivers();
    } catch (error) {
      console.error("Error saving intake:", error);
      toast.error("Failed to save intake");
    } finally {
      setSubmitting(false);
    }
  };

  // In handleEdit, ensure all fields are set with fallback values
  const handleEdit = (intake: Intake) => {
    setFormData({
      first_name: intake.first_name || "",
      last_name: intake.last_name || "",
      email: intake.email || "",
      phone: intake.phone || "",
      address: intake.address || "",
      city: intake.city || "",
      postal_code: intake.postal_code || "",
      date_of_birth: intake.date_of_birth || "",
      gender: intake.gender || "not_specified",
      medical_conditions: intake.medical_conditions || "",
      medications: intake.medications || "",
      allergies: intake.allergies || "",
      mobility_level: intake.mobility_level || "not_specified",
      care_requirements: intake.care_requirements || "",
      emergency_contact_name: intake.emergency_contact_name || "",
      emergency_contact_phone: intake.emergency_contact_phone || "",
      emergency_contact_relationship:
        intake.emergency_contact_relationship || "",
      insurance_provider: intake.insurance_provider || "",
      insurance_number: intake.insurance_number || "",
      preferred_start_date: intake.preferred_start_date || "",
      preferred_schedule: intake.preferred_schedule || "not_specified",
      additional_notes: intake.additional_notes || "",
      admin_notes: intake.admin_notes || "",
      assigned_caregiver_id: intake.assigned_caregiver_id || "unassigned",
      status: intake.status || "pending",
      source: intake.source === "booking" ? "booking" : "admin",
    });
    setEditingId(intake.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this intake?")) return;

    try {
      const { error } = await supabase.from("intakes").delete().eq("id", id);

      if (error) throw error;
      toast.success("Intake deleted successfully");
      fetchIntakesAndCaregivers();
    } catch (error) {
      console.error("Error deleting intake:", error);
      toast.error("Failed to delete intake");
    }
  };

  // Add convertToClient handler
  const handleConvertToClient = async (intake: Intake) => {
    try {
      // Prepare client data from intake (only fields in clients table)
      const clientData = {
        first_name: intake.first_name,
        last_name: intake.last_name,
        date_of_birth: intake.date_of_birth || null,
        phone: intake.phone || null,
        email: intake.email && intake.email.trim() !== "" ? intake.email : null,
        address: intake.address || null,
        status: "active",
        notes:
          [intake.admin_notes, intake.additional_notes]
            .filter(Boolean)
            .join("\n") || null,
      };
      // Insert client
      const { data: client, error: clientError } = await supabase
        .from("clients")
        .insert([clientData])
        .select()
        .single();
      if (clientError) throw clientError;
      // Update intake to record conversion (if schema supports it)
      let updateObj: any = { status: "assigned" };
      if ("client_id" in intake) {
        updateObj.client_id = client.id;
      }
      const { error: intakeError } = await supabase
        .from("intakes")
        .update(updateObj)
        .eq("id", intake.id);
      if (intakeError) throw intakeError;
      toast.success("Intake converted to client successfully!");
      fetchIntakesAndCaregivers();
      router.refresh();
    } catch (error: any) {
      console.error("Error converting intake:", error);
      toast.error("Failed to convert intake: " + (error.message || error));
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      assigned: "bg-blue-100 text-blue-800",
    };
    return (
      statusColors[status as keyof typeof statusColors] ||
      "bg-gray-100 text-gray-800"
    );
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
                Booking Requests
              </h1>
              <p className="text-gray-600 mt-2">
                Manage incoming care requests from clients
              </p>
            </div>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setFormData(initialFormData);
                  setEditingId(null);
                  setIsDialogOpen(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Intake
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit Intake Request" : "Add New Intake Request"}
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

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
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
                    <div>
                      <Label htmlFor="date_of_birth">Date of Birth</Label>
                      <Input
                        id="date_of_birth"
                        type="date"
                        value={formData.date_of_birth}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            date_of_birth: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) =>
                        setFormData({ ...formData, gender: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {genderOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Address Information
                  </h3>
                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postal_code">Postal Code *</Label>
                      <Input
                        id="postal_code"
                        value={formData.postal_code}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            postal_code: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Medical Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="medical_conditions">
                        Medical Conditions
                      </Label>
                      <Textarea
                        id="medical_conditions"
                        value={formData.medical_conditions}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            medical_conditions: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="medications">Current Medications</Label>
                      <Textarea
                        id="medications"
                        value={formData.medications}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            medications: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor="allergies">Allergies</Label>
                      <Textarea
                        id="allergies"
                        value={formData.allergies}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            allergies: e.target.value,
                          })
                        }
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="mobility_level">Mobility Level</Label>
                      <Select
                        value={formData.mobility_level}
                        onValueChange={(value) =>
                          setFormData({ ...formData, mobility_level: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select mobility level" />
                        </SelectTrigger>
                        <SelectContent>
                          {mobilityLevels.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="care_requirements">Care Requirements</Label>
                    <Textarea
                      id="care_requirements"
                      value={formData.care_requirements}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          care_requirements: e.target.value,
                        })
                      }
                      rows={3}
                      placeholder="Describe specific care needs and requirements..."
                    />
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Emergency Contact
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="emergency_contact_name">
                        Contact Name
                      </Label>
                      <Input
                        id="emergency_contact_name"
                        value={formData.emergency_contact_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            emergency_contact_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergency_contact_phone">
                        Contact Phone
                      </Label>
                      <Input
                        id="emergency_contact_phone"
                        value={formData.emergency_contact_phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            emergency_contact_phone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergency_contact_relationship">
                        Relationship
                      </Label>
                      <Input
                        id="emergency_contact_relationship"
                        value={formData.emergency_contact_relationship}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            emergency_contact_relationship: e.target.value,
                          })
                        }
                        placeholder="e.g., Spouse, Child, Sibling"
                      />
                    </div>
                  </div>
                </div>

                {/* Insurance & Schedule */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Insurance & Schedule
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="insurance_provider">
                        Insurance Provider
                      </Label>
                      <Input
                        id="insurance_provider"
                        value={formData.insurance_provider}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            insurance_provider: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="insurance_number">Insurance Number</Label>
                      <Input
                        id="insurance_number"
                        value={formData.insurance_number}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            insurance_number: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="preferred_start_date">
                        Preferred Start Date
                      </Label>
                      <Input
                        id="preferred_start_date"
                        type="date"
                        value={formData.preferred_start_date}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            preferred_start_date: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="preferred_schedule">
                      Preferred Schedule
                    </Label>
                    <Select
                      value={formData.preferred_schedule}
                      onValueChange={(value) =>
                        setFormData({ ...formData, preferred_schedule: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred schedule" />
                      </SelectTrigger>
                      <SelectContent>
                        {preferredScheduleOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Admin & Status */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Admin & Status</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(
                          value:
                            | "pending"
                            | "approved"
                            | "rejected"
                            | "assigned"
                        ) => setFormData({ ...formData, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                          <SelectItem value="assigned">Assigned</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="assigned_caregiver_id">
                        Assign Caregiver
                      </Label>
                      <Select
                        value={formData.assigned_caregiver_id}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            assigned_caregiver_id: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select caregiver" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unassigned">Unassigned</SelectItem>
                          {caregivers.map((caregiver) => (
                            <SelectItem key={caregiver.id} value={caregiver.id}>
                              {caregiver.first_name} {caregiver.last_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="mt-4">
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
                      rows={3}
                      placeholder="Internal notes for this intake..."
                    />
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <Label htmlFor="additional_notes">
                    Additional Notes (from client)
                  </Label>
                  <Textarea
                    id="additional_notes"
                    value={formData.additional_notes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        additional_notes: e.target.value,
                      })
                    }
                    rows={3}
                    placeholder="Any additional information provided by the client..."
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
                    Intake
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
                    placeholder="Search intakes..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Intakes Table */}
        <Card>
          <CardHeader>
            <CardTitle>Intake Requests ({filteredIntakes.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredIntakes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No intake requests found</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Care Needs</TableHead>
                    <TableHead>Preferred Start</TableHead>
                    <TableHead>Assigned Caregiver</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIntakes.map((intake) => (
                    <TableRow key={intake.id}>
                      <TableCell>
                        <div>
                          <p
                            className="font-medium text-blue-700 hover:underline cursor-pointer"
                            onClick={() => setViewIntake(intake)}
                          >
                            {intake.first_name} {intake.last_name}
                          </p>
                          {intake.date_of_birth && (
                            <p className="text-sm text-gray-500">
                              DOB: {intake.date_of_birth}{" "}
                              {getAge(intake.date_of_birth)
                                ? `(Age: ${getAge(intake.date_of_birth)})`
                                : ""}
                              {intake.date_of_birth.endsWith("-07-01") && (
                                <span className="text-xs text-yellow-600 ml-1">
                                  (Approximate)
                                </span>
                              )}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {intake.email && (
                            <div className="flex items-center text-sm">
                              <Mail className="h-3 w-3 mr-1" />
                              {intake.email}
                            </div>
                          )}
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-1" />
                            {String(intake.phone || "-")}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start text-sm">
                          <MapPin className="h-3 w-3 mr-1 mt-0.5" />
                          <div>
                            <p>{String(intake.address || "-")}</p>
                            <p className="text-gray-500">
                              {String(intake.city || "")}{" "}
                              {String(intake.postal_code || "")}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm max-w-xs">
                          {intake.care_requirements ? (
                            <p
                              className="truncate"
                              title={intake.care_requirements}
                            >
                              {intake.care_requirements}
                            </p>
                          ) : (
                            <span className="text-gray-400">Not specified</span>
                          )}
                          {intake.mobility_level &&
                            intake.mobility_level !== "not_specified" && (
                              <p className="text-gray-600">
                                <strong>Mobility:</strong>{" "}
                                {intake.mobility_level}
                              </p>
                            )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {intake.preferred_start_date ? (
                          <div className="flex items-center text-sm">
                            <Calendar className="h-3 w-3 mr-1" />
                            {intake.preferred_start_date}
                          </div>
                        ) : (
                          <span className="text-gray-400">Not specified</span>
                        )}
                        {intake.preferred_schedule &&
                          intake.preferred_schedule !== "not_specified" && (
                            <p className="text-sm text-gray-500">
                              {intake.preferred_schedule}
                            </p>
                          )}
                      </TableCell>
                      <TableCell>
                        {intake.assigned_caregiver_id ? (
                          caregivers.find(
                            (c) => c.id === intake.assigned_caregiver_id
                          )?.first_name +
                          " " +
                          caregivers.find(
                            (c) => c.id === intake.assigned_caregiver_id
                          )?.last_name
                        ) : (
                          <span className="text-gray-400">Unassigned</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(intake.status)}>
                          {intake.status}
                        </Badge>
                        {intake.source === "booking" && (
                          <span className="ml-2 px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-semibold">
                            Public
                          </span>
                        )}
                        {intake.source === "admin" && (
                          <span className="ml-2 px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-xs font-semibold">
                            Admin
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(intake)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(intake.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                          {/* Convert to Client button for approved intakes */}
                          {intake.status === "approved" && (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleConvertToClient(intake)}
                            >
                              Convert to Client
                            </Button>
                          )}
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

      {/* Intake Details Dialog */}
      <Dialog open={!!viewIntake} onOpenChange={() => setViewIntake(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {viewIntake && (
            <>
              <DialogHeader>
                <DialogTitle>Intake Details</DialogTitle>
                <DialogDescription>
                  <div className="mb-2 text-sm text-gray-500">
                    ID: {viewIntake.id}
                  </div>
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Name:</span>{" "}
                  {viewIntake.first_name} {viewIntake.last_name}
                </div>
                <div>
                  <span className="font-semibold">Email:</span>{" "}
                  {viewIntake.email}
                </div>
                <div>
                  <span className="font-semibold">Phone:</span>{" "}
                  {viewIntake.phone}
                </div>
                <div>
                  <span className="font-semibold">Status:</span>{" "}
                  {viewIntake.status}
                </div>
                <div>
                  <span className="font-semibold">City:</span> {viewIntake.city}
                </div>
                <div>
                  <span className="font-semibold">Date of Birth:</span>{" "}
                  {viewIntake.date_of_birth}
                </div>
                <div>
                  <span className="font-semibold">Address:</span>{" "}
                  {viewIntake.address}
                </div>
                <div>
                  <span className="font-semibold">Postal Code:</span>{" "}
                  {viewIntake.postal_code}
                </div>
                <div>
                  <span className="font-semibold">Gender:</span>{" "}
                  {viewIntake.gender}
                </div>
                <div>
                  <span className="font-semibold">Medical Conditions:</span>{" "}
                  {viewIntake.medical_conditions}
                </div>
                <div>
                  <span className="font-semibold">Medications:</span>{" "}
                  {viewIntake.medications}
                </div>
                <div>
                  <span className="font-semibold">Allergies:</span>{" "}
                  {viewIntake.allergies}
                </div>
                <div>
                  <span className="font-semibold">Mobility Level:</span>{" "}
                  {viewIntake.mobility_level}
                </div>
                <div>
                  <span className="font-semibold">Care Requirements:</span>{" "}
                  {viewIntake.care_requirements}
                </div>
                <div>
                  <span className="font-semibold">Emergency Contact:</span>{" "}
                  {viewIntake.emergency_contact_name} (
                  {viewIntake.emergency_contact_relationship}) -{" "}
                  {viewIntake.emergency_contact_phone}
                </div>
                <div>
                  <span className="font-semibold">Insurance Provider:</span>{" "}
                  {viewIntake.insurance_provider}
                </div>
                <div>
                  <span className="font-semibold">Insurance Number:</span>{" "}
                  {viewIntake.insurance_number}
                </div>
                <div>
                  <span className="font-semibold">Preferred Start Date:</span>{" "}
                  {viewIntake.preferred_start_date}
                </div>
                <div>
                  <span className="font-semibold">Preferred Schedule:</span>{" "}
                  {viewIntake.preferred_schedule}
                </div>
                <div>
                  <span className="font-semibold">Additional Notes:</span>
                  <br />{" "}
                  <span className="whitespace-pre-line">
                    {viewIntake.additional_notes || (
                      <span className="text-gray-400">None</span>
                    )}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Admin Notes:</span>
                  <br />{" "}
                  <span className="whitespace-pre-line">
                    {viewIntake.admin_notes || (
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
