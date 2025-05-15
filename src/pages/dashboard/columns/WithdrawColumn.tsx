import type { ColumnDef } from "@tanstack/react-table";
import type { Withdrawal } from "@/models/withdrawal";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import type { User } from "@/models/user";

export const withdrawalColumns: ColumnDef<Withdrawal>[] = [
  {
    accessorKey: "created_by",
    header: "Diajukan Oleh",
    cell: ({ row }) => {
      return <p>{(row.getValue("created_by") as User).name}</p>;
    },
  },
  {
    accessorKey: "amount",
    header: "Jumlah",
    cell: ({ row }) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(row.original.amount);
    },
  },
  {
    accessorKey: "withdrawal_date",
    header: "Tanggal Withdraw",
    cell: ({ row }) =>
      moment(row.original.withdrawal_date).format("DD MMM YYYY"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge variant="outline">{row.original.status}</Badge>,
  },
  {
    accessorKey: "id",
    header: "Aksi",
    cell: ({ row }) => <StatusButton withdrawal={row.original} />,
  },
];

const StatusButton = ({ withdrawal }: { withdrawal: Withdrawal }) => {
  const [status, setStatus] = useState<string>(withdrawal.status);
  const [open, setOpen] = useState(false);

  const handleChange = async (newStatus: string) => {
    try {
      const res = await fetch(`/withdrawals/${withdrawal.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Gagal update status");

      setStatus(newStatus);
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Gagal mengubah status");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          Ubah Status
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ubah Status Withdraw</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="my-4">
          <Select value={status} onValueChange={handleChange}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Batal
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
