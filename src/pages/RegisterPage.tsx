import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string; // misalnya http://localhost:8000

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function RegisterPage() {
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [prodi, setProdi] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError(null);

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      }
    );
    console.log(signUpData);
    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    if (signUpData.user && signUpData.user.identities.length === 0) {
      setError("Email Telah Terdaftar");
      return;
    }

    const userId = signUpData.user?.id;
    if (!userId) {
      setError("Gagal mendapatkan ID pengguna.");
      return;
    }

    const res = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
        name: nama,
        nik: nim,
        prodi,
        email,
        role: "user",
        total_donation: 0,
      }),
    });

    if (!res.ok) {
      setError("Gagal menyimpan data ke server.");
      return;
    }

    alert("Pendaftaran berhasil! Silakan login.");
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Daftar Akun
          </h2>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle>Gagal</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div>
              <Label>Nama</Label>
              <Input value={nama} onChange={(e) => setNama(e.target.value)} />
            </div>
            <div>
              <Label>NIM</Label>
              <Input value={nim} onChange={(e) => setNim(e.target.value)} />
            </div>
            <div>
              <Label>Prodi</Label>
              <Input value={prodi} onChange={(e) => setProdi(e.target.value)} />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Button className="w-full" onClick={handleRegister}>
            Daftar
          </Button>

          <p className="text-sm text-center text-gray-600">
            Sudah punya akun?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login di sini
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
