import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { Campaign } from "@/models/campaign";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Check, Eye, X } from "lucide-react";
import moment from "moment";
import type { User } from "@/models/user";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:6543";

export const campaignRequestColumn: ColumnDef<Campaign>[] = [
  {
    accessorKey: "title",
    header: "Judul",
  },
  {
    accessorKey: "created_by",
    header: "Pengaju",
    cell: ({ row }) => (
      <p>{(row.getValue("created_by") as User).name || "-"}</p>
    ),
  },
  {
    accessorKey: "target_amount",
    header: "Target",
    cell: ({ row }) =>
      new Intl.NumberFormat("en-ID", {
        style: "currency",
        currency: "IDR",
      }).format(row.getValue("target_amount")),
  },
  {
    accessorKey: "created_at",
    header: "Diajukan pada",
    cell: ({ row }) =>
      moment(row.getValue("created_at")).format("MMM DD, yyyy"),
  },
  {
    accessorKey: "id",
    header: "Aksi",
    cell: ({ row }) => {
      const [loading, setLoading] = useState(false);
      const id = row.getValue("id");

      const updateStatus = async (status: string) => {
        setLoading(true);
        const {
          data: { session },
          error: authError,
        } = await supabase.auth.getSession();
        if (authError || !session) {
          throw new Error("Gagal mendapatkan sesi login");
        }
        const token = session.access_token;

        try {
          const res = await fetch(`${API_URL}/campaigns/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status }),
          });
          if (!res.ok) throw new Error("Update gagal");
          window.location.reload();
        } catch (error) {
          console.error("Update status gagal", error);
        } finally {
          setLoading(false);
        }
      };

      return (
        <div className="flex gap-x-2">
          <Link
            to={`/dashboard/pengajuan/${id}`}
            className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
          >
            <Eye className="w-4 h-4 mr-1" /> Review
          </Link>
          <AlertDialog>
            <AlertDialogTrigger
              disabled={loading}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <Check /> Approve
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Setujui Kampanye</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription>
                Apakah kamu yakin ingin menyetujui kampanye ini?
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Batalkan</AlertDialogCancel>
                <AlertDialogAction onClick={() => updateStatus("approved")}>
                  Setujui
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Reject Dialog */}
          <AlertDialog>
            <AlertDialogTrigger
              disabled={loading}
              className={cn(
                buttonVariants({ variant: "destructive", size: "sm" })
              )}
            >
              <X /> Tolak
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tolak Kampanye</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription>
                Apakah kamu yakin ingin menolak kampanye ini?
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Batalkan</AlertDialogCancel>
                <AlertDialogAction onClick={() => updateStatus("rejected")}>
                  Tolak
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
