import Footer from "@/components/Footer";
import KampanyeItem from "@/components/KampanyeItem";
import KampanyeLoadingItem from "@/components/KampanyeLoadingItem";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useCampaigns } from "@/hooks/useCampaigns";
import { useTopDonation } from "@/hooks/useTopDonation";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { campaigns, loading } = useCampaigns();
  const { topDonations, loading: topDonationLoading } = useTopDonation();
  return (
    <>
      <Navbar />
      <main className="px-72 flex flex-col gap-y-24 mb-24">
        <section className="mt-16">
          <div className="grid grid-cols-2 gap-8">
            <img
              src="http://if.itera.ac.id/wp-content/uploads/2020/10/Photoshoot-_ITERA2020-34-min-scaled.jpg"
              alt="image"
              className="w-full aspect-auto rounded"
            />
            <div className="flex flex-col gap-y-6 justify-center">
              <h1 className="font-bold text-3xl">
                Bersama Kita Bisa: Dukung Proyek & Inisiatif Mahasiswa ITERA
              </h1>
              <p className="text-slate-600 text-lg">
                Mari jadi bagian dari perubahan. Donasikan atau ajukan kampanye
                untuk proyek yang berdampak.
              </p>
              <Button className="w-min" size={"lg"}>
                Donasi Sekarang
              </Button>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-y-8">
          <h1 className="text-4xl font-bold text-center">Eksplor Kampanye</h1>
          <p className="text-center text-lg text-slate-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad, nihil.
          </p>
          <div className="grid grid-cols-3 w-full gap-8">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <KampanyeLoadingItem key={i} />
                ))
              : campaigns.slice(0, 9).map((item) => {
                  return <KampanyeItem campaign={item} key={item.id} />;
                })}
          </div>
          <Link to={"/kampanye"} className="mx-auto">
            <Button
              className="text-lg font-bold px-8 py-8 w-min "
              variant={"outline"}
            >
              Lihat semua Kampanye
            </Button>
          </Link>
        </section>
        <section className="flex flex-col gap-y-8">
          <div className="flex items-center justify-between border-b-2 pb-8">
            <h1 className="text-3xl font-bold">Top Donatur</h1>
          </div>
          <div className="flex items-center gap-x-12">
            {topDonationLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex gap-x-8 p-6 rounded-3xl border animate-pulse w-full max-w-xs"
                  >
                    <div className="w-16 h-16 bg-slate-200 rounded-full" />
                    <div className="flex flex-col gap-y-2 w-full">
                      <div className="w-1/2 h-4 bg-slate-200 rounded" />
                      <div className="w-2/3 h-4 bg-slate-200 rounded" />
                      <div className="w-1/3 h-4 bg-slate-200 rounded" />
                    </div>
                  </div>
                ))
              : topDonations.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-x-8 p-6 rounded-3xl border"
                  >
                    <Avatar>
                      <AvatarImage
                        src={
                          item.photo_url ??
                          "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpgs"
                        }
                      />
                      <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-between">
                      <p className="text-xl font-bold">{item.name}</p>
                      <p className="text-slate-600 font-medium text-lg">
                        {item.prodi}
                      </p>
                      <p className="text-slate-600">
                        Total Donasi{" "}
                        {new Intl.NumberFormat("en-ID", {
                          style: "currency",

                          currency: "IDR",
                        }).format(item.total_donation)}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
