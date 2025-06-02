import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const DonationDetailPage = () => {
  const { id } = useParams();
  const [donation, setDonation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/donations/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDonation(data);
        console.log(data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto py-12 px-4">
        {loading ? (
          <Skeleton className="h-64 w-full rounded-xl" />
        ) : donation ? (
          <Card className="shadow-md">
            <CardContent className="p-6 space-y-4">
              <h1 className="text-2xl font-bold">Detail Donasi</h1>
              <Separator />
              <p>
                <strong>Kampanye :</strong> {donation.campaign.title}
              </p>
              <p>
                <strong>Donatur:</strong> {donation.donor.name}
              </p>
              <p>
                <strong>Jumlah:</strong> Rp{" "}
                {donation.amount.toLocaleString("id-ID")}
              </p>
              <p>
                <strong>Status:</strong> {donation.status}
              </p>
              <p>
                <strong>Pesan:</strong> {donation.message || "-"}
              </p>
              <Button onClick={() => history.back()}>Kembali</Button>
            </CardContent>
          </Card>
        ) : (
          <p>Donasi tidak ditemukan.</p>
        )}
      </div>
      <Footer />
    </>
  );
};
