import { useContext, useEffect } from "react";
import { UserDataContext } from "@/contexts/UserDataContext";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { userData } = useContext(UserDataContext);
  const isAuthenticated = !!userData;

  const handleLogout = async () => {
    try {
      await logout();
      navigate({ to: "/login" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      toast.info("Logged in as a Guest.");
    }
  }, [isAuthenticated, navigate]);

  return (
    <header className="flex items-center justify-between bg-slate-100 px-20 py-2 shadow">
      <div className="flex items-center gap-3">
        <img src="/favicon.ico" alt="Company Logo" />
        <span className="text-xl font-bold">LinkinPurry</span>
      </div>
      <div></div>
    </header>
  );
};

export default Header;
