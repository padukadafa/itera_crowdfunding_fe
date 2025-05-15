import { DataTable } from "@/components/DataTable";
import { campaignColumn } from "./columns/KampanyeColumn";
import { useCampaigns } from "@/hooks/useCampaigns";

const DaftarKampanyePage = () => {
  const { campaigns } = useCampaigns();
  return (
    <>
      <DataTable
        columns={campaignColumn}
        title="Daftar Kampanye"
        searchKey="title"
        data={campaigns}
      />
    </>
  );
};

export default DaftarKampanyePage;
