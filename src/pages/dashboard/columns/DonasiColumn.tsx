import type { ColumnDef } from "@tanstack/react-table";
import type { Donation } from "@/models/donation";
import moment from "moment";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const donationColumns: ColumnDef<Donation>[] = [
  {
    accessorKey: "donor.name",
    header: "Donatur",
    cell: ({ row }) => {
      return row.original.is_anonymous ? "Anonim" : row.original.donor.name;
    },
  },
  {
    accessorKey: "amount",
    header: "Jumlah",
    cell: ({ row }) => {
      return (
        <span>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(row.original.amount)}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className="capitalize">{row.original.status}</span>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Waktu",
    cell: ({ row }) =>
      moment(row.original.created_at).format("DD MMM YYYY, HH:mm"),
  },
  {
    accessorKey: "id",
    header: "Aksi",
    cell: ({ row }) => (
      <Link
        to={`/dashboard/donasi/${row.original.id}`}
        className={cn(buttonVariants())}
      >
        Lihat Detail
      </Link>
    ),
  },
];
