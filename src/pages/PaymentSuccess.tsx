import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-green-50 flex items-center justify-center px-6">
        <Card className="max-w-lg w-full p-10 text-center shadow-2xl rounded-3xl">
          <CardContent className="flex flex-col items-center gap-6">
            <div className="rounded-full bg-green-100 p-6 animate-pulse">
              <CheckCircle2 className="h-20 w-20 text-green-600" />
            </div>
            <h1 className="text-4xl font-extrabold text-green-700 drop-shadow-md">
              Pembayaran Berhasil!
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed max-w-md">
              Terima kasih atas donasi Anda. Konfirmasi pembayaran telah
              diterima dan kami sangat menghargainya.
              <br />
              Semoga hari Anda menyenangkan!
            </p>
            <Button
              onClick={() => navigate("/")}
              className="bg-green-600 hover:bg-green-700 focus:ring-green-300"
            >
              Kembali ke Beranda
            </Button>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default PaymentSuccessPage;
