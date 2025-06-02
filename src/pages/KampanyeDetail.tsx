import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCampaigns } from "@/hooks/useCampaigns";
import type { User } from "@/models/user";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { useCampaignDonation } from "@/hooks/useCampaignDonation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const KampanyeDetailPage = () => {
  const { id } = useParams();
  const { campaign, loading } = useCampaigns(Number(id));
  const { donations, loading: donationLoading } = useCampaignDonation(
    Number(id)
  );
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<number | "">("");
  const [message, setMessage] = useState("");
  const [loadingDonate, setLoadingDonate] = useState(false);
  const navigate = useNavigate();

  // Load Midtrans Snap script dynamically
  useEffect(() => {
    const scriptId = "midtrans-snap-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      script.setAttribute(
        "data-client-key",
        import.meta.env.VITE_MIDTRANS_CLIENT_KEY
      );
      script.id = scriptId;
      document.body.appendChild(script);
    }
  }, []);

  const handleDonasi = async () => {
    if (!amount || amount <= 0) {
      alert("Masukkan jumlah donasi yang valid lebih dari 0");
      return;
    }

    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    const userId = data.session?.user.id;

    if (!token) {
      alert("Silakan login terlebih dahulu untuk melakukan donasi");
      navigate("/login");
      return;
    }

    setLoadingDonate(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/donation/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            campaign_id: Number(id),
            amount,
            message,
            donor_id: userId,
          }),
        }
      );

      const data = await res.json();

      if (res.ok && data.snap_token) {
        // Jalankan popup Midtrans Snap
        // @ts-ignore
        window.snap.pay(data.snap_token, {
          onSuccess: async (result: any) => {
            const response = await fetch(
              `${import.meta.env.VITE_API_BASE_URL}/webhook/midtrans`,
              {
                method: "post",
                body: JSON.stringify({
                  order_id: result.order_id,
                  transaction_status: result.transaction_status,
                  transaction_time: result.transaction_time,
                  settlement_time: result.settlement_time,
                }),
              }
            );
            if (response.ok) {
              navigate(`/payment-success?orderId=${data.order_id}`);
            }
          },
          onPending: function (result: any) {
            alert("Pembayaran masih pending. Silakan cek kembali nanti.");
          },
          onError: function (result: any) {
            alert("Terjadi kesalahan pembayaran. Silakan coba lagi.");
            console.error(result);
          },
          onClose: function () {
            alert("Anda menutup popup pembayaran tanpa menyelesaikan.");
          },
        });
      } else if (data.redirect_url) {
        // Fallback jika backend hanya kasih redirect_url (tidak pakai snap_token)
        window.location.href = data.redirect_url;
      } else {
        alert(data.error || "Gagal membuat donasi");
      }
    } catch (error) {
      console.error("Gagal donasi:", error);
      alert("Terjadi kesalahan saat melakukan donasi. Silakan coba lagi.");
    } finally {
      setLoadingDonate(false);
      setOpen(false); // tutup dialog donasi setelah proses
      setAmount("");
      setMessage("");
    }
  };

  return (
    <>
      <Navbar />
      <main className="grid grid-cols-4 gap-8 px-72 mb-24 mt-12">
        <div className="col-span-3 flex flex-col gap-y-12 ">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <img
                  src={
                    campaign?.image_url ??
                    "https://dummyimage.com/600x400/f7f7f7/454545.png&text=Campaign+Image"
                  }
                  alt=""
                  className="w-full object-cover h-[450px]"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
          </Carousel>
          <div className="pb-12 border-b-2 flex flex-col gap-y-8">
            <h1 className="text-2xl font-bold">{campaign?.title}</h1>
            <div className="flex gap-x-8 items-center">
              <Avatar>
                <AvatarImage
                  src={
                    campaign?.created_by.photo_url ??
                    "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpgs"
                  }
                />
                <AvatarFallback>Avatar</AvatarFallback>
              </Avatar>
              <p className="text-xl font-bold">
                {(campaign?.created_by as User)?.name}
              </p>
              <p className="text-slate-600 font-medium text-lg">
                {(campaign?.created_by as User)?.prodi}
              </p>
              <p className="text-slate-600">
                {moment(campaign?.created_at).format("DD MMM, yyyy")}
              </p>
            </div>
          </div>
          <h2 className="text-2xl font-bold">Tentang Donasi</h2>
          <p className="text-lg text-slate-600">{campaign?.description}</p>
          <div className=" border-t-2 pt-12">
            <div className="flex justify-between mb-12">
              <h2 className="font-bold text-2xl ">Donasi Terbaru</h2>
              <Link to={"#"} className={buttonVariants()}>
                Semua Donasi
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {donations.slice(0, 6).map((value) => {
                return (
                  <div
                    className="flex items-center justify-between"
                    key={value.id}
                  >
                    <div className="flex gap-x-8 mb-6">
                      <Avatar className="w-24 h-24">
                        <AvatarImage
                          src={
                            value.donor.photo_url ??
                            "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpgs"
                          }
                        />
                        <AvatarFallback>Avatar</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col justify-between">
                        <p className="text-xl font-bold">{value.donor.name}</p>
                        <p className="font-medium">{value.donor.prodi}</p>
                        <p>{value.message}</p>
                      </div>
                    </div>
                    <p className="font-bold text-lg">
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
        <div className="col-span-1 flex flex-col gap-y-8">
          <div className="p-4 rounded-xl border flex flex-col gap-y-3">
            <p className="font-bold text-lg">Target</p>
            <p>
              {new Intl.NumberFormat("en-ID", {
                style: "currency",
                currency: "IDR",
              }).format(campaign?.target_amount ?? 0)}
            </p>
            <p className="font-bold text-lg">Terkumpul</p>
            <p>
              {new Intl.NumberFormat("en-ID", {
                style: "currency",
                currency: "IDR",
              }).format(campaign?.current_amount ?? 0)}
            </p>
            <p className="text-end font-bold">
              {Math.floor(
                ((campaign?.current_amount ?? 0) /
                  (campaign?.target_amount ?? 0)) *
                  100
              )}
              %
            </p>
            <Progress
              value={
                ((campaign?.current_amount ?? 0) /
                  (campaign?.target_amount ?? 0)) *
                100
              }
            />
          </div>
          <div className="p-4 rounded-xl border flex flex-col gap-y-3">
            <p className="font-bold text-xl">Top Donatur</p>
            {donations
              .sort((a, b) => b.amount - a.amount)
              .slice(0, 4)
              .map((value) => {
                return (
                  <div className="flex gap-x-4 items-center" key={value.id}>
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={
                          value.donor.photo_url ??
                          "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpgs"
                        }
                      />
                      <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-between">
                      <p className="font-bold text-lg">{value.donor.name}</p>
                      <p>
                        {value.donor.prodi} •{" "}
                        {new Intl.NumberFormat("en-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(value.amount)}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="w-full h-12" disabled={loadingDonate}>
                {loadingDonate ? "Memproses..." : "Donasi"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Donasi ke Kampanye</DialogTitle>
                <DialogDescription>
                  Masukkan jumlah donasi dan pesan opsional sebelum melanjutkan
                  ke pembayaran.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-y-4">
                <Label htmlFor="amount">Jumlah (IDR)</Label>
                <Input
                  type="number"
                  id="amount"
                  min={1}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
                <Label htmlFor="message">Pesan (Opsional)</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button onClick={handleDonasi} disabled={loadingDonate}>
                  {loadingDonate ? "Memproses..." : "Lanjut ke Pembayaran"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default KampanyeDetailPage;
