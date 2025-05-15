import { DataTable } from "@/components/DataTable";
import { withdrawalColumns } from "./columns/WithdrawColumn";
import { useWithdrawals } from "@/hooks/useWithdrawals";

const DaftarWithdrawPage = () => {
  const { withdrawals } = useWithdrawals();

  return (
    <DataTable
      title="Daftar Pengajuan Withdraw"
      columns={withdrawalColumns}
      data={withdrawals}
      searchKey="created_by"
    />
  );
};

export default DaftarWithdrawPage;
