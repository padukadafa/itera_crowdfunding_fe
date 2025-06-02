import Footer from "@/components/Footer";
import KampanyeItem from "@/components/KampanyeItem";
import KampanyeLoadingItem from "@/components/KampanyeLoadingItem";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCampaigns } from "@/hooks/useCampaigns";
import { Search } from "lucide-react";
import { useState } from "react";

const KampanyePage = () => {
  const { campaigns, loading, types } = useCampaigns();
  const [search, setSearch] = useState("");
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-y-24 px-72 mb-24">
        <div className="flex flex-col gap-y-8 mt-24">
          <h1 className="text-4xl font-bold text-center">
            Bersama Kita Bisa: Dukung Proyek & Inisiatif Mahasiswa ITERA
          </h1>
          <p className="text-slate-600 text-xl text-center">
            Mari jadi bagian dari perubahan. Donasikan atau ajukan kampanye
            untuk proyek yang berdampak.
          </p>
        </div>
        <div className="flex items-center gap-2 mx-auto">
          <Input
            type="text"
            placeholder="Cari..."
            onChange={(event) => {
              event.preventDefault();
              setSearch(event.currentTarget.value);
            }}
            className="w-96 h-14"
          />
          <Button variant="outline" className="w-14 h-14">
            <Search className="h-14 w-14" />
          </Button>
        </div>
        <Tabs defaultValue="semua">
          <TabsList className="w-full grid grid-cols-5 mb-12">
            {loading ? (
              <></>
            ) : (
              <>
                <TabsTrigger
                  value="semua"
                  className="w-full text-lg rounded border"
                >
                  Semua
                </TabsTrigger>
                {types.map((value) => {
                  return (
                    <TabsTrigger
                      value={value.name}
                      className="w-full text-lg rounded border"
                    >
                      {value.name}
                    </TabsTrigger>
                  );
                })}
              </>
            )}
          </TabsList>
          <TabsContent value="semua">
            <div className="grid grid-cols-3 gap-8">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <KampanyeLoadingItem key={i} />
                  ))
                : campaigns
                    .filter((value) =>
                      value.title?.toLocaleLowerCase().startsWith(search)
                    )
                    .map((item) => {
                      return <KampanyeItem campaign={item} key={item.id} />;
                    })}
            </div>
          </TabsContent>
          {types.map((value) => {
            return (
              <TabsContent value={value.name}>
                <div className="grid grid-cols-3 gap-8">
                  {loading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <KampanyeLoadingItem key={i} />
                      ))
                    : campaigns
                        .filter((val) => val.type_id === value.id)
                        .map((item) => {
                          return <KampanyeItem campaign={item} key={item.id} />;
                        })}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </main>
      <Footer />
    </>
  );
};

export default KampanyePage;
