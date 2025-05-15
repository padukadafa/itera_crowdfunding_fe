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
import { Button, buttonVariants } from "@/components/ui/button";
import { Droplet, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import moment from "moment";
export const campaignColumn: ColumnDef<Campaign>[] = [
  {
    accessorKey: "title",
    header: "Judul",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "target_amount",
    header: "Target",
    cell: ({ row }) => {
      return (
        <p>
          {new Intl.NumberFormat("en-ID", {
            style: "currency",
            currency: "IDR",
          }).format(row.getValue("target_amount"))}
        </p>
      );
    },
  },
  {
    accessorKey: "current_amount",
    header: "Dana Dikumpulkan",
    cell: ({ row }) => {
      return (
        <p>
          {new Intl.NumberFormat("en-ID", {
            style: "currency",
            currency: "IDR",
          }).format(row.getValue("current_amount"))}
        </p>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Dibuat pada",
    cell: ({ row }) => {
      return <p>{moment(row.getValue("created_at")).format("MMM DD, yyyy")}</p>;
    },
  },
  {
    accessorKey: "id",
    header: "Aksi",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2">
          <Link
            to={`/dashboard/kampanye/${row.getValue("id")}/donasi`}
            className={cn(buttonVariants({ variant: "secondary" }))}
          >
            Lihat Donasi
          </Link>
          <Link
            to={`/dashboard/kampanye/${row.getValue("id")}`}
            className={cn(buttonVariants())}
          >
            Edit
          </Link>

          <AlertDialog>
            <AlertDialogTrigger
              className={cn(
                buttonVariants({ variant: "outline" }),
                "cursor-pointer"
              )}
            >
              <Droplet /> Turunkan
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Turunkan Kampanye</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription>
                Setelah diturunkan, kampanye tidak akan terlihat di daftar
                kampanye
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Batalkan</AlertDialogCancel>
                <AlertDialogAction>Turunkan</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
