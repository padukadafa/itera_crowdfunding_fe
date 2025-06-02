import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import type { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="bg-white border-b shadow-sm px-6 md:px-20 py-4 flex justify-between items-center">
      <Link to={"/"}>
        <div className="text-2xl font-bold text-slate-600">
          ITERA Crowdfunding
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-x-8 items-center">
        <div className="flex items-center gap-x-8 text-lg font-bold text-slate-600">
          <Link to={"/kampanye"} className="hover:text-slate-400 duration-300">
            Daftar Kampanye
          </Link>
          <Link
            to={"/kampanye/pengajuan"}
            className="hover:text-slate-400 duration-300"
          >
            Pengajuan Donasi
          </Link>
        </div>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{user.email}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => (window.location.href = "/donations")}
              >
                Donasiku
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={handleLogin} size={"lg"}>
            Login
          </Button>
        )}
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <div className="flex flex-col gap-4 mt-6">
              <Link to={"/kampanye"} className="font-semibold text-slate-700">
                Daftar Kampanye
              </Link>
              <Link
                to={"/kampanye/pengajuan"}
                className="font-semibold text-slate-700"
              >
                Pengajuan Donasi
              </Link>
              <hr />
              {user ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => (window.location.href = "/donations")}
                  >
                    Donasiku
                  </Button>
                  <Button variant="destructive" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <Button onClick={handleLogin}>Login</Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
