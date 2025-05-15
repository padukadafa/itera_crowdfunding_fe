import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/dashboard/Dashboard";
import { PrivateRoute } from "./pages/PrivateRoute";
import KampanyePage from "./pages/Kampanye";
import KampanyeDetailPage from "./pages/KampanyeDetail";
import DaftarKampanyePage from "./pages/dashboard/DaftarKampanye";
import DashboardLayout from "./pages/dashboard/Layout";
import EditKampanyePage from "./pages/dashboard/EditKampanye";
import PengajuanKampanyePage from "./pages/dashboard/PengajuanKampanye";
import ReviewKampanyePage from "./pages/dashboard/ReviewKampanye";
import DaftarDonasiPage from "./pages/dashboard/DaftarDonasi";
import DetailDonasiPage from "./pages/dashboard/DetailDonasi";
import DonasiKampanyePage from "./pages/dashboard/DonasiKampanyePage";
import DaftarWithdrawPage from "./pages/dashboard/DaftarWithdraw";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="kampanye" element={<KampanyePage />} />
      <Route path="kampanye/:id" element={<KampanyeDetailPage />} />
      <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="kampanye" element={<DaftarKampanyePage />} />
        <Route path="kampanye/:id" element={<EditKampanyePage />} />
        <Route path="kampanye/:id/donasi" element={<DonasiKampanyePage />} />
        <Route path="pengajuan" element={<PengajuanKampanyePage />} />
        <Route path="pengajuan/:id" element={<ReviewKampanyePage />} />
        <Route path="donasi" element={<DaftarDonasiPage />} />
        <Route path="donasi/:id" element={<DetailDonasiPage />} />
        <Route path="pencairan" element={<DaftarWithdrawPage />} />
      </Route>
    </Routes>
  );
}

export default App;
