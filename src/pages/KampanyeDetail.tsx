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
import { Link } from "react-router-dom";

const KampanyeDetailPage = () => {
  return (
    <>
      <Navbar />
      <main className="grid grid-cols-4 gap-8 px-72 mb-24">
        <div className="col-span-3 flex flex-col gap-y-12 ">
          <Carousel>
            <CarouselContent>
              {Array.from({ length: 5 }, (_, i) => i + 1).map((value) => {
                return (
                  <CarouselItem>
                    <img
                      src="https://clarity-tailwind.preview.uideck.com/images/blog-single-03.png"
                      alt=""
                      className="w-full object-cover"
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
          </Carousel>
          <div className="pb-12 border-b-2 flex flex-col gap-y-8">
            <h1 className="text-2xl font-bold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              natus dignissimos velit.
            </h1>
            <div className="flex gap-x-8 items-center">
              <Avatar>
                <AvatarImage src="https://clarity-tailwind.preview.uideck.com/images/user-01.png" />
                <AvatarFallback>Avatar</AvatarFallback>
              </Avatar>
              <p className="text-xl font-bold">Adrio Devid</p>
              <p className="text-slate-600 font-medium text-lg">
                Teknik Informatika
              </p>
              <p className="text-slate-600">12 Sep, 2025</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold">Tentang Donasi</h2>
          <p className="text-lg text-slate-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
            mollitia ad quibusdam nam possimus officiis eligendi accusantium
            voluptas? Quibusdam, maxime sunt doloribus cumque beatae sit illo
            consequuntur provident ratione sed voluptatem id alias nisi fuga
            mollitia officia a iure dolor! Nihil molestiae officia perspiciatis
            autem. Debitis tempore molestias quos culpa modi molestiae,
            provident aperiam qui maxime recusandae cupiditate saepe impedit?
            Fugit accusantium magni quidem omnis amet aperiam, natus commodi
            vero vel, iure dolor delectus ex illo provident facilis tenetur
            officiis eligendi fugiat ipsam ullam laboriosam? Suscipit, itaque.
            Perferendis, veniam pariatur voluptatibus porro iste quo sint rerum
            excepturi recusandae assumenda autem. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Quas ipsam nostrum neque nesciunt
            magni quae! Eius itaque, pariatur amet similique tempore quod
            facilis maiores aut libero aliquid eum suscipit reprehenderit magnam
            ab voluptas harum! Qui, voluptates quae voluptatum nihil quasi
            accusantium numquam corrupti? Deleniti, quibusdam dignissimos
            perferendis, at eaque hic nihil facilis et ipsum temporibus, aperiam
            illo soluta harum placeat nobis assumenda veniam ipsam unde repellat
            amet. Suscipit eligendi, voluptas est doloribus, at ad sequi, earum
            nobis illo velit hic illum eaque aperiam fuga officia quaerat eos.
            Quisquam, magnam adipisci doloribus vitae omnis itaque accusantium
            sapiente quae saepe facilis illo.
          </p>
          <div className=" border-t-2 pt-12">
            <div className="flex justify-between mb-12">
              <h2 className="font-bold text-2xl ">Donasi Terbaru</h2>
              <Link to={"#"} className={buttonVariants()}>
                Semua Donasi
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {Array.from({ length: 6 }, (_, i) => i + 1).map((value) => {
                return (
                  <div className="flex items-center justify-between">
                    <div className="flex gap-x-8 mb-6">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src="https://clarity-tailwind.preview.uideck.com/images/user-02.png" />
                        <AvatarFallback>Avatar</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col justify-between">
                        <p className="text-xl font-bold">Dini Ramd****</p>
                        <p className="font-medium">Teknik Fisika</p>
                        <p>Semoga Berkah</p>
                      </div>
                    </div>
                    <p className="font-bold text-lg">Rp. 12.000</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-y-8">
          <div className="p-4 rounded-xl border flex flex-col gap-y-3">
            <p className="font-bold text-lg">Target</p>
            <p>Rp. 12.000.000</p>
            <p className="font-bold text-lg">Terkumpul</p>
            <p>Rp. 6.500.000</p>
            <p className="text-end font-bold">59%</p>
            <Progress value={59} />
          </div>
          <div className="p-4 rounded-xl border flex flex-col gap-y-3">
            <p className="font-bold text-xl">Top Donatur</p>
            {Array.from({ length: 4 }, (_, i) => i + 1).map((_) => {
              return (
                <div className="flex gap-x-4 items-center">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="https://clarity-tailwind.preview.uideck.com/images/blog-small-01.png" />
                    <AvatarFallback>Avatar</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col justify-between">
                    <p className="font-bold text-lg">Daniel Cristiano</p>
                    <p>Teknik Fisika * Rp. 1.200.000</p>
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
