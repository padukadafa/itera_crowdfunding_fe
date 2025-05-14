import { Navigate } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";
import { createClient } from "@supabase/supabase-js";
import type { Session } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!session) return <Navigate to="/login" replace />;

  return children;
}
