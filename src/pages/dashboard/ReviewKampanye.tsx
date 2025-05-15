import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useCampaigns } from "@/hooks/useCampaigns";
import { MailIcon } from "lucide-react";

const ReviewKampanyePage = () => {
  const { id } = useParams();
  const { campaign, loading } = useCampaigns(Number(id));

  if (loading) {
    return (
      <div className="space-y-4 max-w-2xl mx-auto">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  if (!campaign) {
    return (
      <p className="text-center text-red-500">Kampanye tidak ditemukan.</p>
    );
  }
  const contactEmail = campaign.created_by?.email;

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{campaign.title}</CardTitle>
          <CardDescription>{campaign.created_by?.name}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {campaign.image_url && (
            <img
              src={campaign.image_url}
              alt={campaign.title}
              className="w-full h-72 object-cover rounded-lg"
            />
          )}

          <div className="text-sm text-muted-foreground whitespace-pre-line">
            {campaign.description || "Tidak ada deskripsi."}
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Target</span>
              <span>Rp{campaign.target_amount.toLocaleString("id-ID")}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Terkumpul</span>
              <span>Rp{campaign.current_amount.toLocaleString("id-ID")}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Status</span>
              <Badge variant="outline" className="capitalize">
                {campaign.status}
              </Badge>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Dibuat pada</span>
              <span>
                {new Date(campaign.created_at).toLocaleDateString("id-ID")}
              </span>
            </div>
          </div>
          <Separator />
          {contactEmail && (
            <Button variant="outline" size="sm" asChild>
              <a href={`mailto:${contactEmail}`}>
                <MailIcon className="w-4 h-4 mr-2" />
                Hubungi via Email
              </a>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewKampanyePage;
