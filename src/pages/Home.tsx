import Footer from "@/components/Footer";
import KampanyeItem from "@/components/KampanyeItem";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <main className="px-72 flex flex-col gap-y-24 mb-24">
        <section className="mt-16">
          <div className="grid grid-cols-2 gap-8">
            <img
              src="https://clarity-tailwind.preview.uideck.com/images/hero-01.png"
              alt="image"
              className="w-full aspect-auto rounded"
            />
            <div className="flex flex-col gap-y-6 justify-center">
              <h1 className="font-bold text-3xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                quas perspiciatis sit.
              </h1>
              <p className="text-slate-600 text-lg">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint,
                aperiam repellendus animi libero similique aspernatur vel maxime
                ex cupiditate dolore.
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
            {Array.from({ length: 9 }, (_, i) => i + 1).map((item) => {
              return <KampanyeItem />;
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
            <Link to={"/donatur/top"}>Semua Donatur</Link>
          </div>
          <div className="flex items-center gap-x-12">
            {Array.from({ length: 4 }, (_, i) => i + 1).map((_) => {
              return (
                <div className="flex gap-x-8 p-6 rounded-3xl border">
                  <Avatar>
                    <AvatarImage src="https://clarity-tailwind.preview.uideck.com/images/user-01.png" />
                    <AvatarFallback>Avatar</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col justify-between">
                    <p className="text-xl font-bold">Adrio Devid</p>
                    <p className="text-slate-600 font-medium text-lg">
                      Teknik Informatika
                    </p>
                    <p className="text-slate-600">Total Donasi Rp.12.560.000</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
