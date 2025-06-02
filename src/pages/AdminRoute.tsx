import { Navigate } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export function AdminRoute({ children }: { children: JSX.Element }) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session) {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/users/${data.session?.user.id}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if (data.role === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        }
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!isAdmin && isAdmin == false) return <Navigate to="/" replace />;

  return children;
}
