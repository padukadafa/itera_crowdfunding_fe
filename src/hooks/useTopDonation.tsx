import type { User } from "@/models/user";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:6543";

export function useTopDonation() {
  const [topDonations, setTopDonations] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopDonation = async () => {
    try {
      setLoading(true);
      const res = await getTopDonation();
      setTopDonations(res);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const getTopDonation = async (): Promise<User[]> => {
    const res = await fetch(`${API_URL}/donations/top`);

    if (!res.ok) throw new Error("Failed to fetch top donations");
    const data = await res.json();
    console.log(data);
    return data;
  };

  useEffect(() => {
    fetchTopDonation();
  }, []);

  return {
    topDonations,
    error,
    loading,
  };
}
