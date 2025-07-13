"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Link from "next/link";
import { supabase, type FamilyMember, type Client } from "@/lib/supabase";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";

interface FamilyMemberFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  is_primary_contact: boolean;
  client_id: string;
  notes: string;
}

const initialFormData: FamilyMemberFormData = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  is_primary_contact: false,
  client_id: "",
  notes: "",
};

function generateRandomPassword(length = 12) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export default function FamilyMembersPage() {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredFamilyMembers, setFilteredFamilyMembers] = useState<
    FamilyMember[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [clientFilter, setClientFilter] = useState("");
  const [formData, setFormData] =
    useState<FamilyMemberFormData>(initialFormData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [viewFamilyMember, setViewFamilyMember] = useState<FamilyMember | null>(
    null
  );

  useEffect(() => {
    fetchFamilyMembersAndClients();
  }, []);

  useEffect(() => {
    filterFamilyMembers();
  }, [familyMembers, searchTerm, clientFilter]);

  const fetchFamilyMembersAndClients = async () => {
    setLoading(true);
    try {
      const { data: familyData, error: familyError } = await supabase
        .from("family_members")
        .select("*")
        .order("created_at", { ascending: false });
      if (familyError) throw familyError;
      setFamilyMembers(familyData || []);
      const { data: clientsData, error: clientsError } = await supabase
        .from("clients")
        .select("id, first_name, last_name")
        .order("first_name");
      if (clientsError) throw clientsError;
      setClients(clientsData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load family members or clients");
    } finally {
      setLoading(false);
    }
  };

  const filterFamilyMembers = () => {
    let filtered = familyMembers;
    if (searchTerm) {
      filtered = filtered.filter(
        (fm) =>
          fm.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          fm.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (fm.email &&
            fm.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          fm.phone.includes(searchTerm)
      );
    }
    if (clientFilter) {
      filtered = filtered.filter((fm) => fm.client_id === clientFilter);
    }
    setFilteredFamilyMembers(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const memberData = { ...formData };
      if (editingId) {
        const { error } = await supabase
          .from("family_members")
          .update(memberData)
          .eq("id", editingId);
        if (error) throw error;
        toast.success("Family member updated successfully");
      } else {
        const password = generateRandomPassword();
        const memberDataWithPassword = {
          ...memberData,
          initial_password: password,
        };
        const { error } = await supabase
          .from("family_members")
          .insert([memberDataWithPassword]);
        if (error) throw error;
        // Create Supabase Auth user for the family member
        const serviceRoleKey =
          process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
        if (!serviceRoleKey) {
          toast.error(
            "Service role key not set. Please add NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY to your .env.local file."
          );
        } else {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/admin/users`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                apikey: serviceRoleKey,
                Authorization: `Bearer ${serviceRoleKey}`,
              },
              body: JSON.stringify({
                email: memberData.email,
                password,
                email_confirm: true,
              }),
            }
          );
          if (res.ok) {
            toast.success(
              `Family member added and account created. Password saved in database.`
            );
          } else {
            toast.error(
              "Family member added, but failed to create account in Auth."
            );
          }
        }
      }
      setFormData(initialFormData);
      setEditingId(null);
      setIsDialogOpen(false);
      fetchFamilyMembersAndClients();
    } catch (error) {
      console.error("Error saving family member:", error);
      toast.error("Failed to save family member");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (fm: FamilyMember) => {
    setFormData({
      first_name: fm.first_name,
      last_name: fm.last_name,
      email: fm.email || "",
      phone: fm.phone || "",
      is_primary_contact: fm.is_primary_contact || false,
      client_id: fm.client_id || "",
      notes: fm.notes || "",
    });
    setEditingId(fm.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this family member?")) return;
    try {
      const { error } = await supabase
        .from("family_members")
        .delete()
        .eq("id", id);
      if (error) throw error;
      toast.success("Family member deleted successfully");
      fetchFamilyMembersAndClients();
    } catch (error) {
      console.error("Error deleting family member:", error);
      toast.error("Failed to delete family member");
    }
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
    <>
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
                  Family Members Management
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage family members and their association with clients
                </p>
              </div>
            </div>
            <Button
              onClick={() => {
                setFormData(initialFormData);
                setEditingId(null);
                setIsDialogOpen(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Family Member
            </Button>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit Family Member" : "Add New Family Member"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name">First Name *</Label>
                    <Input
                      id="first_name"
                      value={formData.first_name}
                      onChange={(e) =>
                        setFormData({ ...formData, first_name: e.target.value })
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
                        setFormData({ ...formData, last_name: e.target.value })
                      }
                      required
                    />
                  </div>
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
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-2 flex items-center gap-2 mt-2">
                    <Checkbox
                      id="is_primary_contact"
                      checked={formData.is_primary_contact}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          is_primary_contact: !!checked,
                        })
                      }
                    />
                    <Label htmlFor="is_primary_contact">Primary Contact</Label>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="client_id">Linked Client *</Label>
                    <select
                      id="client_id"
                      value={formData.client_id}
                      onChange={(e) =>
                        setFormData({ ...formData, client_id: e.target.value })
                      }
                      required
                      className="w-full border rounded px-2 py-2"
                    >
                      <option value="">Select client</option>
                      {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.first_name} {client.last_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      rows={3}
                      placeholder="Any additional information about this family member..."
                    />
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
                    {submitting ? "Saving..." : editingId ? "Update" : "Add"}{" "}
                    Family Member
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Input
                    placeholder="Search family members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                value={clientFilter}
                onChange={(e) => setClientFilter(e.target.value)}
                className="w-64 border rounded px-2 py-2"
              >
                <option value="">All Clients</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.first_name} {client.last_name}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              Family Members ({filteredFamilyMembers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredFamilyMembers.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No family members found</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Primary?</TableHead>
                    <TableHead>Linked Client</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFamilyMembers.map((fm) => (
                    <TableRow key={fm.id}>
                      <TableCell>
                        <div>
                          <p
                            className="font-medium text-blue-700 hover:underline cursor-pointer"
                            onClick={() => setViewFamilyMember(fm)}
                          >
                            {fm.first_name} {fm.last_name}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{fm.email}</TableCell>
                      <TableCell>{fm.phone}</TableCell>
                      <TableCell>
                        {fm.is_primary_contact ? "Yes" : "No"}
                      </TableCell>
                      <TableCell>
                        {clients.find((c) => c.id === fm.client_id)
                          ?.first_name || ""}{" "}
                        {clients.find((c) => c.id === fm.client_id)
                          ?.last_name || ""}
                      </TableCell>
                      <TableCell>{fm.notes}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(fm)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(fm.id)}
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
      {/* Family Member Details Dialog */}
      <Dialog
        open={!!viewFamilyMember}
        onOpenChange={() => setViewFamilyMember(null)}
      >
        <DialogContent>
          {viewFamilyMember && (
            <>
              <DialogHeader>
                <DialogTitle>Family Member Details</DialogTitle>
                <DialogDescription>
                  <div className="mb-2 text-sm text-gray-500">
                    ID: {viewFamilyMember.id}
                  </div>
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Name:</span>{" "}
                  {viewFamilyMember.first_name} {viewFamilyMember.last_name}
                </div>
                <div>
                  <span className="font-semibold">Email:</span>{" "}
                  {viewFamilyMember.email}
                </div>
                <div>
                  <span className="font-semibold">Phone:</span>{" "}
                  {viewFamilyMember.phone}
                </div>
                <div>
                  <span className="font-semibold">Primary Contact:</span>{" "}
                  {viewFamilyMember.is_primary_contact ? "Yes" : "No"}
                </div>
                <div>
                  <span className="font-semibold">Client:</span>{" "}
                  {clients.find((c) => c.id === viewFamilyMember.client_id)
                    ?.first_name || ""}{" "}
                  {clients.find((c) => c.id === viewFamilyMember.client_id)
                    ?.last_name || ""}
                </div>
                <div>
                  <span className="font-semibold">Notes:</span>
                  <br />{" "}
                  <span className="whitespace-pre-line">
                    {viewFamilyMember.notes || (
                      <span className="text-gray-400">None</span>
                    )}
                  </span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
