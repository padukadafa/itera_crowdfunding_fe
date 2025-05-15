import { DataTable } from "@/components/DataTable";
import { useCampaignRequests } from "@/hooks/useCampaignRequests";
import { campaignRequestColumn } from "./columns/PengajuanKampanyeColumn";

const PengajuanKampanyePage = () => {
  const { campaigns, loading } = useCampaignRequests();

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable
          columns={campaignRequestColumn}
          data={campaigns}
          searchKey="title"
          title={"Daftar Pengajuan Kampanye"}
        />
      )}
    </div>
  );
};

export default PengajuanKampanyePage;
