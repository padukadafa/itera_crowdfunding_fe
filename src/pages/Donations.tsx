import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export const DonationListPage = () => {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const getUserDonation = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session === null) {
      navigate("/login");
      return;
    }
    setLoading(true);
    fetch(
      `${import.meta.env.VITE_API_BASE_URL}/user-donations/${
        data.session?.user.id
      }`,
      {
        headers: {
          Authorization: `Bearer ${data.session?.access_token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setDonations(data))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    getUserDonation();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Daftar Donasi</h1>
        <div className="space-y-6">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))
          ) : donations.length > 0 ? (
            donations.map((donation) => (
              <Card
                key={donation.id}
                onClick={() => navigate(`/donations/${donation.id}`)}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold">
                    Kampanye : {donation.campaign.title}
                  </h2>
                  <p className="text-gray-600">
                    Jumlah: Rp {donation.amount.toLocaleString("id-ID")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Status: {donation.status || "pending"}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>Tidak ada data donasi.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
