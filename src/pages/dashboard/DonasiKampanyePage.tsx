import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Donation } from "@/models/donation";
import { DataTable } from "@/components/DataTable";
import { Skeleton } from "@/components/ui/skeleton";
import { donationColumns } from "./columns/DonasiColumn";
import { useCampaigns } from "@/hooks/useCampaigns";

const DonasiKampanyePage = () => {
  const { id } = useParams(); // campaign_id
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const { campaign } = useCampaigns(Number(id));

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch(`/campaigns/${id}/donations`);
        const data = await res.json();
        setDonations(data.donations);
      } catch (err) {
        console.error("Gagal memuat donasi kampanye", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, [id]);

  return loading ? (
    <div className="space-y-4 max-w-2xl mx-auto">
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
    </div>
  ) : (
    <DataTable
      title={`Donasi untuk: ${campaign?.title || "Kampanye"}`}
      columns={donationColumns}
      data={donations}
      searchKey="donor.name"
    />
  );
};

export default DonasiKampanyePage;
