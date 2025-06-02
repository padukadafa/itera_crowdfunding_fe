import { supabase } from "@/lib/supabase";
import type { Donation } from "@/models/donation";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:6543";

export function useDonations(id?: number) {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [donation, setDonation] = useState<Donation | undefined>();
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
      if (id) {
        const res = await getDonationById(id);
        setDonation(res);
        return;
      }

      const res = await fetch(`${API_URL}/donations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch Donation");
      const data = await res.json();
      setDonations(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchAllDonation = async () => {
    const res = await fetch(`${API_URL}/donations/all`);
    if (!res.ok) throw new Error("Failed to fetch donation");
    return await res.json();
  };

  const getDonationById = async (id: number): Promise<Donation> => {
    const res = await fetch(`${API_URL}/donations/${id}`);
    if (!res.ok) throw new Error("Failed to fetch donation");
    return await res.json();
  };

  useEffect(() => {
    fetchDonation();
  }, []);

  return {
    donations,
    donation,
    loading,
    error,
    fetchAllDonation,
  };
}
