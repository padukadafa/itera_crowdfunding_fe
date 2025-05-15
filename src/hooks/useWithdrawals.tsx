import { supabase } from "@/lib/supabase";
import type { Withdrawal } from "@/models/withdrawal";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:6543";

export function useWithdrawals() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDonation = async () => {
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();
    if (authError || !session) {
      throw new Error("Gagal mendapatkan sesi login");
    }

    const token = session.access_token;

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/withdrawals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch Donation");
      const data = await res.json();
      setWithdrawals(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonation();
  }, []);

  return {
    withdrawals,
    loading,
    error,
  };
}
