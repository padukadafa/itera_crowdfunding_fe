import { useEffect, useState } from "react";
import type { Campaign } from "@/models/campaign";
import { supabase } from "@/lib/supabase";
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:6543";

export const useCampaignRequests = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPendingCampaigns = async () => {
    setLoading(true);
    try {
      const {
        data: { session },
        error: authError,
      } = await supabase.auth.getSession();
      if (authError || !session) {
        throw new Error("Gagal mendapatkan sesi login");
      }

      const token = session.access_token;

      const res = await fetch(`${API_URL}/campaign-request`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch campaign requests");
      const result = await res.json();
      setCampaigns(result);
    } catch (error) {
      console.error("Gagal fetch campaign requests", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingCampaigns();
  }, []);

  return { campaigns, loading };
};
