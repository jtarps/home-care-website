"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function TestEnvPage() {
  const router = useRouter();
  const [envStatus, setEnvStatus] = useState<any>({});
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    supabase.auth.getUser().then(({ data }) => {
      if (!data?.user) {
        router.replace("/");
      } else {
        setLoading(false);
      }
    });

    // Check environment variables
    setEnvStatus({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? "Set" : "Missing",
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        ? "Set"
        : "Missing",
    });

    // Test Supabase connection
    async function testConnection() {
      try {
        console.log("Testing Supabase connection in browser...");

        const { data, error } = await supabase
          .from("intakes")
          .select("count")
          .limit(1);

        if (error) {
          setTestResult({ success: false, error });
        } else {
          setTestResult({ success: true, data });
        }
      } catch (err) {
        setTestResult({ success: false, error: err });
      }
    }

    testConnection();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Test</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Environment Variables:</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(envStatus, null, 2)}
        </pre>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Supabase Connection Test:
        </h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(testResult, null, 2)}
        </pre>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Browser Console:</h2>
        <p className="text-sm text-gray-600">
          Check the browser console (F12) for detailed logs
        </p>
      </div>
    </div>
  );
}
