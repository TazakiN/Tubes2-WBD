import { useEffect } from "react";
import { toast } from "sonner";
import NavButton from "./NavButton";

import LoginSVG from "@/assets/svg/login.svg";
import NetworkSparkle from "@/assets/svg/network-sparkle.svg";
import UserProfileCircle from "@/assets/svg/user-profile-circle.svg";
import ToiletSignPeople from "@/assets/svg/toilet-sign-people.svg";
import ChatBubble from "@/assets/svg/chat-bubble.svg";
import Home from "@/assets/svg/home.svg";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useNavigate } from "@tanstack/react-router";

const NavLinks = ({ isMobile = false }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const linkClasses = isMobile
    ? "flex items-center gap-4 py-3 border-b hover:bg-gray-100 px-4"
    : "hidden md:inline-flex items-end gap-10";

  useEffect(() => {
    if (!isAuthenticated) {
      toast.info("Logged in as a Guest.");
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate({ to: "/login" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return isAuthenticated ? (
    <div className={linkClasses}>
      <NavButton
        imgSrc={Home}
        navRoute="/"
        navText="Home"
        className={isMobile ? "w-full" : ""}
      />
      <NavButton
        imgSrc={ChatBubble}
        navRoute="/chat"
        navText="Messages"
        className={isMobile ? "w-full" : ""}
      />
      <NavButton
        imgSrc={ToiletSignPeople}
        navRoute="/connect"
        navText="Connect"
        className={isMobile ? "w-full" : ""}
      />
      <NavButton
        imgSrc={NetworkSparkle}
        navRoute="/browse"
        navText="Browse"
        className={isMobile ? "w-full" : ""}
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className={`flex flex-col items-center gap-1 ${isMobile}`}>
            <img
              src={UserProfileCircle}
              alt={"Profile Icon"}
              className="max-h-6"
            />
            <span className="text-xs text-blue-primary">Profile</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <span className="text-red">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <div className={linkClasses}>
      <NavButton
        imgSrc={NetworkSparkle}
        navRoute="/browse"
        navText="Browse"
        className={isMobile ? "w-full" : ""}
      />
      <NavButton
        imgSrc={LoginSVG}
        navRoute="/login"
        navText="Login"
        className={isMobile ? "w-full" : ""}
      />
    </div>
  );
};

export default NavLinks;
