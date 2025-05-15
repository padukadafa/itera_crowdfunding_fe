import { DataTable } from "@/components/DataTable";
import { donationColumns } from "./columns/DonasiColumn";
import { useDonations } from "@/hooks/useDonations";

const DaftarDonasiPage = () => {
  const { donations } = useDonations();

  return (
    <DataTable
      title="Daftar Donasi"
      columns={donationColumns}
      data={donations}
      searchKey="donor.name"
    />
  );
};

export default DaftarDonasiPage;
