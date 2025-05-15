import type { Campaign } from "@/models/campaign";
import type { CampaignType } from "@/models/CampaignType";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:6543";

export function useCampaigns(id?: number) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [campaign, setCampaign] = useState<Campaign | undefined>();
  const [types, setTypes] = useState<CampaignType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      if (id) {
        const res = await getCampaignById(id);
        setCampaign(res);
        return;
      }
      fetchCampaignType();

      const res = await fetch(`${API_URL}/campaigns`);
      if (!res.ok) throw new Error("Failed to fetch campaigns");
      const data = await res.json();
      setCampaigns(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCampaignById = async (id: number): Promise<Campaign> => {
    const res = await fetch(`${API_URL}/campaigns/${id}`);
    if (!res.ok) throw new Error("Failed to fetch campaign");
    return await res.json();
  };
  const getCampaignDonation = async (): Promise<Campaign> => {
    const res = await fetch(`${API_URL}/campaigns/${id}/donations`);
    if (!res.ok) throw new Error("Failed to fetch campaign donations");
    return await res.json();
  };
  const fetchCampaignType = async (): Promise<CampaignType[]> => {
    const res = await fetch(`${API_URL}/types/campaign`);
    if (!res.ok) throw new Error("Failed to fetch campaign types");
    const result = await res.json();
    setTypes(result);
    return result;
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return {
    campaigns,
    types,
    campaign,
    loading,
    error,
    getCampaignDonation,
  };
}
