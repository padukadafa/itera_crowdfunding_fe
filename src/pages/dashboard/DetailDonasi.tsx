import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useDonations } from "@/hooks/useDonations";

const DetailDonasiPage = () => {
  const { id } = useParams();
  const { donation, loading } = useDonations(Number(id));

  if (loading) {
    return (
      <div className="max-w-xl mx-auto mt-10">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-4 w-full mt-4" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    );
  }

  if (!donation) {
    return <p className="text-center text-red-500">Donasi tidak ditemukan.</p>;
  }

  const {
    donor,
    amount,
    is_anonymous,
    message,
    status,
    created_at,
    payment_id,
  } = donation;

  return (
    <div className="max-w-xl mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Detail Donasi</CardTitle>
          <CardDescription>ID Donasi: {donation.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span>Nama Donatur</span>
            <span>{is_anonymous ? "Anonim" : donor.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Jumlah</span>
            <span>Rp{amount.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between">
            <span>Status</span>
            <Badge variant="outline" className="capitalize">
              {status}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Tanggal</span>
            <span>{new Date(created_at).toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between">
            <span>ID Pembayaran</span>
            <span>{payment_id}</span>
          </div>
          {message && (
            <div className="pt-4">
              <span className="font-medium">Pesan:</span>
              <p className="text-muted-foreground mt-1">{message}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailDonasiPage;
