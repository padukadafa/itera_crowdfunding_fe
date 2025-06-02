import { DollarSign, Flag, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCampaigns } from "@/hooks/useCampaigns";
import { useDonations } from "@/hooks/useDonations";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const { campaigns, loading } = useCampaigns();
  const { fetchAllDonation, donations } = useDonations();
  const [totalDonation, setTotalDonation] = useState(0);
  const [donatur, setDonatur] = useState();
  useEffect(() => {
    const fetchDonatur = async () => {
      const res = await fetchAllDonation();

      setDonatur(res);
    };
    fetchDonatur();
  }, []);
  useEffect(() => {
    setTotalDonation(
      donations.reduce((acc, curr) => {
        return acc + curr.amount;
      }, 0)
    );
  }, [donations]);
  return (
    <>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 w-full">
        <div className="p-6 flex flex-col gap-y-6 w-full rounded-xl border shadow">
          <div className="flex items-center justify-between">
            <p className="font-medium text-lg">Total Donasi</p>
            <DollarSign />
          </div>
          <p className="font-bold text-2xl">
            {new Intl.NumberFormat("en-ID", {
              style: "currency",
              currency: "IDR",
            }).format(totalDonation)}
          </p>
        </div>
        <div className="p-6 flex flex-col gap-y-6 w-full rounded-xl border shadow">
          <div className="flex items-center justify-between">
            <p className="font-medium text-lg">Total Donatur</p>
            <User />
          </div>
          <p className="font-bold text-2xl">{donatur?.length}</p>
        </div>
        <div className="p-6 flex flex-col gap-y-6 w-full rounded-xl border shadow">
          <div className="flex items-center justify-between">
            <p className="font-medium text-lg">Total Kampanye</p>
            <Flag />
          </div>
          <p className="font-bold text-2xl">
            {!loading ? campaigns.length : "Loading"}
          </p>
        </div>
      </div>
      <div className=" gap-12 mt-12">
        <div className="rounded-xl cshadow border p-6 h-min">
          <h2 className="text-xl font-bold">Donasi Terbaru</h2>
          <p className="text-slate-600">Total donasi bulan ini 127 donasi</p>
          <div className="flex flex-col gap-y-6 mt-12">
            {donations.slice(0, 5).map((value) => {
              return (
                <div className="flex justify-between">
                  <div className="flex gap-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={
                          value.donor.photo_url ??
                          "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpgs"
                        }
                      />
                      <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-lg font-medium">{value.donor.name}</p>
                      <p className="text-slate-600">{value.donor.prodi}</p>
                    </div>
                  </div>
                  <p className="text-lg font-medium">
                    {new Intl.NumberFormat("en-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(value.amount)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
