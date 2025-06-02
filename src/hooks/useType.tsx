import { supabase } from "@/lib/supabase";
import type { CampaignType } from "@/models/CampaignType";
import type { Donation } from "@/models/donation";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:6543";

export function useType() {
  const [types, setTypes] = useState<CampaignType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchType = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/types/campaign`, {});
      if (!res.ok) throw new Error("Failed to fetch Donation");
      const data = await res.json();
      setTypes(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchType();
  }, []);

  return {
    types,
    loading,
    error,
  };
}
