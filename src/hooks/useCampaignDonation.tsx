import type { Donation } from "@/models/donation";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:6543";

export function useCampaignDonation(id?: number) {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDonation = async () => {
    try {
      setLoading(true);
      const res = await getCampaignDonation();
      setDonations(res);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const getCampaignDonation = async (): Promise<Donation[]> => {
    const res = await fetch(`${API_URL}/campaigns/${id}/donations`);
    if (!res.ok) throw new Error("Failed to fetch campaign donations");
    return await res.json();
  };

  useEffect(() => {
    fetchDonation();
  }, []);

  return {
    donations,
    error,
    loading,
  };
}
