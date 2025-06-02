import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

const formSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  target_amount: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Nominal harus lebih dari 0",
    }),
  type_id: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Nominal harus lebih dari 0",
  }),
  image_url: z.string().optional(),
  is_urgent: z.boolean().default(false),
  status: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const PengajuanKampanyePage = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      target_amount: "",
      image_url: "",
      is_urgent: false,
      type_id: "9",
      status: "pending",
    },
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/upload/image`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!res.ok) throw new Error("Gagal mengunggah gambar.");
      const data = await res.json();
      setImagePreview(data.url);
      form.setValue("image_url", data.url);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const user = await supabase.auth.getSession();
      console.log({
        ...data,
        target_amount: parseInt(data.target_amount),
        type_id: parseInt(data.type_id),
        created_by: user.data.session?.user.id,
        is_urgent: data.is_urgent ? "mendesak" : "normal",
      });
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/campaigns`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.data.session?.access_token}`,
          },
          body: JSON.stringify({
            ...data,
            target_amount: parseInt(data.target_amount),
            type_id: parseInt(data.type_id),
            created_by: user.data.session?.user.id,
            is_urgent: data.is_urgent ? "mendesak" : "normal",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal mengajukan kampanye");
      }

      const result = await response.json();
      console.log(result[0]);
      navigate(`/dashboard/kampanye/${result[0].id}`);
    } catch (error) {
      alert("Terjadi kesalahan saat mengirim data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow mt-10">
        <h2 className="text-2xl font-semibold mb-6">Ajukan Kampanye</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul Kampanye</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Contoh: Bantu Biaya Pendidikan"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ceritakan tujuan kampanye ini..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Gambar Kampanye</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleImageUpload(file);
                  }
                }}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className=" h-[250px] mt-2 rounded-md"
                />
              )}
            </FormItem>

            <FormField
              control={form.control}
              name="target_amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Dana (Rp)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1000000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_urgent"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Jadikan kampanye prioritas</FormLabel>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Mengirim..." : "Ajukan Kampanye"}
            </Button>
          </form>
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default PengajuanKampanyePage;
