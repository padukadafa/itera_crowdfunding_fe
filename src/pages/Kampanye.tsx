import Footer from "@/components/Footer";
import KampanyeItem from "@/components/KampanyeItem";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

const KampanyePage = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-y-24 px-72 mb-24">
        <div className="flex flex-col gap-y-8 mt-24">
          <h1 className="text-4xl font-bold text-center">
            Lorem ipsum dolor sit.
          </h1>
          <p className="text-slate-600 text-xl text-center">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus
            similique at quam?
          </p>
        </div>
        <div className="flex items-center gap-2 mx-auto">
          <Input type="text" placeholder="Search..." className="w-96 h-14" />
          <Button variant="outline" className="w-14 h-14">
            <Search className="h-14 w-14" />
          </Button>
        </div>
        <Tabs defaultValue="semua">
          <TabsList className="w-full grid grid-cols-5 mb-12">
            <TabsTrigger
              value="semua"
              className="w-full text-lg rounded border"
            >
              Semua
            </TabsTrigger>
            <TabsTrigger
              value="bantuan"
              className="w-full text-lg rounded border"
            >
              Bantuan
            </TabsTrigger>
            <TabsTrigger
              value="kesehatan"
              className="w-full text-lg rounded border"
            >
              Kesehatan
            </TabsTrigger>
            <TabsTrigger
              value="bencana"
              className="w-full text-lg rounded border"
            >
              Bencana
            </TabsTrigger>
            <TabsTrigger
              value="kemanusiaan"
              className="w-full text-lg rounded border"
            >
              Kemanusiaan
            </TabsTrigger>
          </TabsList>
          <TabsContent value="semua">
            <div className="grid grid-cols-3 gap-8">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((value) => {
                return <KampanyeItem />;
              })}
            </div>
          </TabsContent>
          <TabsContent value="bantuan">
            <div className="grid grid-cols-3 gap-8">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((value) => {
                return <KampanyeItem />;
              })}
            </div>
          </TabsContent>
          <TabsContent value="kesehatan">
            <div className="grid grid-cols-3 gap-8">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((value) => {
                return <KampanyeItem />;
              })}
            </div>
          </TabsContent>
          <TabsContent value="bencana">
            <div className="grid grid-cols-3 gap-8">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((value) => {
                return <KampanyeItem />;
              })}
            </div>
          </TabsContent>
          <TabsContent value="kemanusiaan">
            <div className="grid grid-cols-3 gap-8">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((value) => {
                return <KampanyeItem />;
              })}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </>
  );
};

export default KampanyePage;
