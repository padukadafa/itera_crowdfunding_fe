import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import type { Campaign } from "@/models/campaign";

type CampaignType = {
  id: number;
  name: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EditKampanyePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [campaignTypes, setCampaignTypes] = useState<CampaignType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Fetch campaign and campaign types
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campaignRes, typesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/campaigns/${id}`),
          fetch(`${API_BASE_URL}/types/campaign`),
        ]);
        const campaignData = await campaignRes.json();
        const typesData = await typesRes.json();
        setCampaign(campaignData);
        setCampaignTypes(typesData);
      } catch (error) {
        toast.error("Gagal memuat data kampanye.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!campaign) return;
    setCampaign({ ...campaign, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaign) return;
    setSubmitting(true);

    try {
      const {
        data: { session },
        error: authError,
      } = await supabase.auth.getSession();
      if (authError || !session) {
        throw new Error("Gagal mendapatkan sesi login");
      }

      const token = session.access_token;

      let imageUrl = campaign.image_url;

      // Optional: Upload image if selected
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const res = await fetch(`${API_BASE_URL}/upload/image`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Gagal mengunggah gambar.");
        const data = await res.json();
        imageUrl = data.url;
      }

      const res = await fetch(`${API_BASE_URL}/campaigns/${campaign.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ← penting
        },
        body: JSON.stringify({
          ...campaign,
          image_url: imageUrl,
          created_by: campaign.created_by.id,
        }),
      });

      if (!res.ok) throw new Error("Gagal memperbarui kampanye");

      toast.success("Kampanye berhasil diperbarui");
      navigate("/dashboard/kampanye");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <Loader2 className="mx-auto animate-spin w-6 h-6" />
        Memuat data kampanye...
      </div>
    );
  }

  if (!campaign) {
    return <div className="p-8 text-center">Kampanye tidak ditemukan</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">Edit Kampanye</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Judul Kampanye</Label>
          <Input
            name="title"
            value={campaign.title ?? ""}
            onChange={handleChange}
            placeholder="Judul Kampanye"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type_id">Kategori</Label>
          <Select
            value={String(campaign.type_id ?? "")}
            onValueChange={(value) =>
              setCampaign({ ...campaign, type_id: parseInt(value) })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih Kategori" />
            </SelectTrigger>
            <SelectContent>
              {campaignTypes.map((type) => (
                <SelectItem key={type.id} value={String(type.id)}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2 space-y-2">
          <Label htmlFor="description">Deskripsi</Label>
          <Textarea
            name="description"
            value={campaign.description ?? ""}
            onChange={handleChange}
            rows={6}
            placeholder="Deskripsi kampanye"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="target_amount">Target Donasi</Label>
          <Input
            name="target_amount"
            type="number"
            value={campaign.target_amount}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={campaign.status}
            onValueChange={(value) =>
              setCampaign({ ...campaign, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih Status" />
            </SelectTrigger>
            <SelectContent>
              {["pending", "approved", "completed", "rejected", "disabled"].map(
                (status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="is_urgent">Mendesak?</Label>
          <Switch
            checked={campaign.is_urgent}
            onCheckedChange={(val) =>
              setCampaign({ ...campaign, is_urgent: val })
            }
          />
        </div>
        <div className="col-span-2 space-y-2">
          <Label htmlFor="image_url">Ganti Gambar</Label>
          <Input type="file" accept="image/*" onChange={handleFileChange} />
          {campaign.image_url && (
            <img
              src={campaign.image_url}
              alt="Preview"
              className="w-40 h-40 object-cover rounded"
            />
          )}
        </div>
        <div className="col-span-2">
          <Button type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="animate-spin mr-2 w-4 h-4" />
                Menyimpan...
              </>
            ) : (
              "Simpan Perubahan"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditKampanyePage;
