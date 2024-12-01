import { UserDataContext } from "@/contexts/UserDataContext";
import { useNavigate } from "@tanstack/react-router";
import { useContext, useEffect } from "react";
import { toast } from "sonner";
import NavButton from "./NavButton";

import LoginSVG from "@/assets/svg/login.svg";
import NetworkSparkle from "@/assets/svg/network-sparkle.svg";
import UserProfileCircle from "@/assets/svg/user-profile-circle.svg";
import ToiletSignPeople from "@/assets/svg/toilet-sign-people.svg";
import ChatBubble from "@/assets/svg/chat-bubble.svg";
import Home from "@/assets/svg/home.svg";

const NavLinks = ({ isMobile = false }) => {
  const navigate = useNavigate();
  const { userData } = useContext(UserDataContext);
  const isAuthenticated = !!userData;
  const linkClasses = isMobile
    ? "flex items-center gap-4 py-3 border-b hover:bg-gray-100 px-4"
    : "hidden md:inline-flex items-end gap-10";

  useEffect(() => {
    if (!isAuthenticated) {
      toast.info("Logged in as a Guest.");
    }
  }, [isAuthenticated, navigate]);
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
        navRoute="/"
        navText="Browse"
        className={isMobile ? "w-full" : ""}
      />
      <NavButton
        imgSrc={UserProfileCircle}
        navRoute="/profile"
        navText="Profile"
        className={isMobile ? "w-full" : ""}
      />
    </div>
  ) : (
    <div className={linkClasses}>
      <NavButton
        imgSrc={NetworkSparkle}
        navRoute="/"
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
