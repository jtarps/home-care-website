"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  UserCheck,
  Calendar,
  ClipboardList,
  Plus,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import {
  supabase,
  type Client,
  type FamilyMember,
  type Caregiver,
  type Shift,
  type Intake,
} from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function AdminDashboard() {
  const [totalClients, setTotalClients] = useState(0);
  const [totalFamilyMembers, setTotalFamilyMembers] = useState(0);
  const [totalCaregivers, setTotalCaregivers] = useState(0);
  const [pendingCaregivers, setPendingCaregivers] = useState(0);
  const [pendingIntakes, setPendingIntakes] = useState(0);
  const [upcomingShifts, setUpcomingShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [shiftFilters, setShiftFilters] = useState({
    status: "assigned",
    date: "",
    client: "",
    caregiver: "",
  });
  const [contactInquiries, setContactInquiries] = useState([]);
  const [openInquiry, setOpenInquiry] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch clients
      const { data: clients, error: clientsError } = await supabase
        .from("clients")
        .select("*");
      if (clientsError) throw clientsError;
      setTotalClients(clients?.length || 0);

      // Fetch family members
      const { data: familyMembers, error: familyError } = await supabase
        .from("family_members")
        .select("*");
      if (familyError) throw familyError;
      setTotalFamilyMembers(familyMembers?.length || 0);

      // Fetch caregivers
      const { data: caregivers, error: caregiversError } = await supabase
        .from("caregivers")
        .select("*");
      if (caregiversError) throw caregiversError;
      setTotalCaregivers(caregivers?.length || 0);
      setPendingCaregivers(
        caregivers?.filter((c: Caregiver) => c.status === "pending").length || 0
      );

      // Fetch intakes
      const { data: intakes, error: intakesError } = await supabase
        .from("intakes")
        .select("*");
      if (intakesError) throw intakesError;
      setPendingIntakes(
        intakes?.filter((i: Intake) => i.status === "pending").length || 0
      );

      // Fetch upcoming shifts
      const today = new Date().toISOString();
      const { data: shifts, error: shiftsError } = await supabase
        .from("shifts")
        .select(
          `*, client:clients(id, first_name, last_name), caregiver:caregivers(id, first_name, last_name)`
        );
      if (shiftsError) throw shiftsError;
      const upcoming = (shifts || []).filter(
        (shift: any) =>
          shift.status === "assigned" && shift.scheduled_at > today
      );
      setUpcomingShifts(upcoming);

      // Fetch contact inquiries
      const { data: inquiries, error: inquiriesError } = await supabase
        .from("contact_inquiries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);
      if (inquiriesError) throw inquiriesError;
      setContactInquiries(inquiries || []);
    } catch (error) {
      // Optionally handle error
    } finally {
      setLoading(false);
    }
  };

  // Quick filter for shifts (by status/date/client/caregiver)
  const filteredShifts = upcomingShifts.filter((shift) => {
    const statusMatch =
      !shiftFilters.status || shift.status === shiftFilters.status;
    const dateMatch =
      !shiftFilters.date || shift.scheduled_at.startsWith(shiftFilters.date);
    const clientMatch =
      !shiftFilters.client || shift.client_id === shiftFilters.client;
    const caregiverMatch =
      !shiftFilters.caregiver || shift.caregiver_id === shiftFilters.caregiver;
    return statusMatch && dateMatch && clientMatch && caregiverMatch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your home care operations
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/admin/intakes">
              <Button variant="outline">
                <ClipboardList className="h-4 w-4 mr-2" />
                View Intakes
              </Button>
            </Link>
            <Link href="/admin/family-members">
              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                View Family Members
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/admin/clients" className="group">
            <Card className="cursor-pointer group-hover:shadow-lg transition">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Clients
                </CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalClients}</div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/family-members" className="group">
            <Card className="cursor-pointer group-hover:shadow-lg transition">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Family Members
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalFamilyMembers}</div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/caregivers" className="group">
            <Card className="cursor-pointer group-hover:shadow-lg transition">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Caregivers
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCaregivers}</div>
                <p className="text-xs text-muted-foreground">
                  {pendingCaregivers} pending
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/intakes" className="group">
            <Card className="cursor-pointer group-hover:shadow-lg transition">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Intakes
                </CardTitle>
                <ClipboardList className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {pendingIntakes}
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 mb-8">
          <Link href="/admin/clients">
            <Button variant="default">
              <Plus className="h-4 w-4 mr-2" /> Add New Client
            </Button>
          </Link>
          <Link href="/admin/caregivers">
            <Button variant="default">
              <Plus className="h-4 w-4 mr-2" /> Add New Caregiver
            </Button>
          </Link>
          <Link href="/admin/shifts">
            <Button variant="default">
              <Plus className="h-4 w-4 mr-2" /> Schedule New Shift
            </Button>
          </Link>
          <Link href="/admin/family-members">
            <Button variant="default">
              <Plus className="h-4 w-4 mr-2" /> Add Family Member
            </Button>
          </Link>
        </div>

        {/* Upcoming Shifts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Shifts</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredShifts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No upcoming shifts found</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date/Time</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Caregiver</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredShifts.map((shift) => (
                    <TableRow key={shift.id}>
                      <TableCell>
                        {new Date(shift.scheduled_at).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {shift.client
                          ? `${shift.client.first_name} ${shift.client.last_name}`
                          : shift.client_id}
                      </TableCell>
                      <TableCell>
                        {shift.caregiver
                          ? `${shift.caregiver.first_name} ${shift.caregiver.last_name}`
                          : shift.caregiver_id}
                      </TableCell>
                      <TableCell>{shift.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Contact Inquiries Table */}
        <Card className="mt-10">
          <CardHeader className="flex flex-row items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-500" />
            <CardTitle>Recent Contact Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            {contactInquiries.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No contact inquiries found</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contactInquiries.map((inq) => (
                    <TableRow key={inq.id}>
                      <TableCell>
                        {new Date(inq.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell>{inq.name}</TableCell>
                      <TableCell>
                        <a
                          href={`mailto:${inq.email}`}
                          className="text-blue-600 underline"
                        >
                          {inq.email}
                        </a>
                      </TableCell>
                      <TableCell>{inq.phone}</TableCell>
                      <TableCell>{inq.department}</TableCell>
                      <TableCell>{inq.urgency}</TableCell>
                      <TableCell
                        className="max-w-xs truncate cursor-pointer text-blue-700 hover:underline"
                        title={inq.message}
                        onClick={() => setOpenInquiry(inq)}
                      >
                        {inq.message}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        {/* Inquiry Dialog */}
        <Dialog open={!!openInquiry} onOpenChange={() => setOpenInquiry(null)}>
          <DialogContent>
            {openInquiry && (
              <>
                <DialogHeader>
                  <DialogTitle>Contact Inquiry</DialogTitle>
                  <DialogDescription>
                    <div className="mb-2 text-sm text-gray-500">
                      {new Date(openInquiry.created_at).toLocaleString()}
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">Name:</span>{" "}
                    {openInquiry.name}
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span>{" "}
                    <a
                      href={`mailto:${openInquiry.email}`}
                      className="text-blue-600 underline"
                    >
                      {openInquiry.email}
                    </a>
                  </div>
                  <div>
                    <span className="font-semibold">Phone:</span>{" "}
                    {openInquiry.phone}
                  </div>
                  <div>
                    <span className="font-semibold">Department:</span>{" "}
                    {openInquiry.department}
                  </div>
                  <div>
                    <span className="font-semibold">Urgency:</span>{" "}
                    {openInquiry.urgency}
                  </div>
                  <div>
                    <span className="font-semibold">Message:</span>
                    <br />{" "}
                    <span className="whitespace-pre-line">
                      {openInquiry.message}
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
