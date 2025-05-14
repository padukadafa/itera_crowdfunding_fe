import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/dashboard/Dashboard";
import { PrivateRoute } from "./pages/PrivateRoute";
import KampanyePage from "./pages/Kampanye";
import KampanyeDetailPage from "./pages/KampanyeDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/kampanye" element={<KampanyePage />} />
      <Route path="/kampanye/:id" element={<KampanyeDetailPage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
