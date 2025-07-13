"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!data?.user) {
        window.location.href = "/";
        return;
      }
      // Role check: Only allow specific admin email
      if (data.user.email !== "jaydee.tarpeh@gmail.com") {
        window.location.href = "/";
        return;
      }
      setUser(data.user);
      setLoading(false);
    };
    getUser();
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      toast.success("Logged in successfully");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-6"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Logging in..." : "Login"}
          </Button>
        </form>
        <Toaster />
        <SonnerToaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {children}
      <Button
        onClick={async () => {
          await supabase.auth.signOut();
          window.location.reload();
        }}
        className="absolute top-4 right-4"
      >
        Logout
      </Button>
      <Toaster />
      <SonnerToaster />
    </div>
  );
}
