import { useContext, useEffect } from "react";
import { UserDataContext } from "@/contexts/UserDataContext";
import { useNavigate } from "@tanstack/react-router";
// import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import NavButton from "@/components/Header/NavButton";
import { Search } from "lucide-react";

import LoginSVG from "@/assets/svg/login.svg";
import NetworkSparkle from "@/assets/svg/network-sparkle.svg";
import UserProfileCircle from "@/assets/svg/user-profile-circle.svg";
import ToiletSignPeople from "@/assets/svg/toilet-sign-people.svg";
import ChatBubble from "@/assets/svg/chat-bubble.svg";
import Home from "@/assets/svg/home.svg";

const Header = () => {
  const navigate = useNavigate();
  // const { logout } = useAuth();
  const { userData } = useContext(UserDataContext);
  const isAuthenticated = !!userData;

  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //     navigate({ to: "/login" });
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //   }
  // };

  useEffect(() => {
    if (!isAuthenticated) {
      toast.info("Logged in as a Guest.");
    }
  }, [isAuthenticated, navigate]);

  return (
    <header className="flex items-center justify-between bg-gray-lighter px-64 py-2 shadow">
      <div className="flex items-center justify-center gap-4">
        <img
          src="/favicon.ico"
          alt="Company Logo"
          className="size-10 rounded-lg"
        />
        <div className="relative w-96">
          <Input
            type="search"
            placeholder="Search"
            className="pl-8 text-base"
          />
          <Search
            className="absolute inset-y-0 left-3 my-auto text-gray-500"
            size={15}
          />
        </div>
      </div>
      <div className="inline-block">
        {isAuthenticated ? (
          <div className="inline-flex items-end gap-10">
            <NavButton imgSrc={Home} navRoute="/" navText="Home" />
            <NavButton
              imgSrc={ChatBubble}
              navRoute="/chat"
              navText="Messages"
            />
            <NavButton
              imgSrc={ToiletSignPeople}
              navRoute="/connect"
              navText="Connect"
            />
            <NavButton imgSrc={NetworkSparkle} navRoute="/" navText="Browse" />
            <NavButton
              imgSrc={UserProfileCircle}
              navRoute="/profile"
              navText="Profile"
            />
          </div>
        ) : (
          <div className="inline-flex gap-10">
            <NavButton imgSrc={NetworkSparkle} navRoute="/" navText="Browse" />
            <NavButton imgSrc={LoginSVG} navRoute="/login" navText="Login" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
