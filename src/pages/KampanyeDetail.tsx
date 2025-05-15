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
import { useCampaigns } from "@/hooks/useCampaigns";
import type { User } from "@/models/user";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { useCampaignDonation } from "@/hooks/useCampaignDonation";
const KampanyeDetailPage = () => {
  const { id } = useParams();
  const { campaign, loading } = useCampaigns(Number(id));
  const { donations, loading: donationLoading } = useCampaignDonation(
    Number(id)
  );
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
                  className="w-full object-cover"
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
                <AvatarImage src="https://clarity-tailwind.preview.uideck.com/images/user-01.png" />
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
                        <AvatarImage src="https://clarity-tailwind.preview.uideck.com/images/user-02.png" />
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
                  <div className="flex gap-x-4 items-center">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src="https://clarity-tailwind.preview.uideck.com/images/blog-small-01.png" />
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
          <Button className="w-full h-12">Donasi</Button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default KampanyeDetailPage;
