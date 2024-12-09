import NavButton from "./NavButton";
import LoginSVG from "@/assets/svg/login.svg";
import NetworkSparkle from "@/assets/svg/network-sparkle.svg";
import UserProfileCircle from "@/assets/svg/user-profile-circle.svg";
import ToiletSignPeople from "@/assets/svg/toilet-sign-people.svg";
import ChatBubble from "@/assets/svg/chat-bubble.svg";
import Home from "@/assets/svg/home.svg";
import { useNavigate } from "@tanstack/react-router";

import { useAuth } from "@/hooks/useAuth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const NavLinks = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  return isAuthenticated ? (
    <div className="fixed inset-x-0 bottom-0 flex w-full justify-around gap-0 border-t bg-gray-lighter p-4 md:relative md:inset-x-auto md:bottom-auto md:w-auto md:gap-8 md:border-0 md:p-0">
      <NavButton imgSrc={Home} navRoute="/feeds" navText="Home" />
      <NavButton imgSrc={ChatBubble} navRoute="/chat" navText="Messages" />
      <NavButton
        imgSrc={ToiletSignPeople}
        navRoute="/connect"
        navText="Connect"
      />
      <NavButton imgSrc={NetworkSparkle} navRoute="/browse" navText="Browse" />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex flex-col items-center gap-1">
            <img
              src={UserProfileCircle}
              alt={"Profile Icon"}
              className="max-h-6"
            />
            <span className="text-xs text-blue-primary">Profile</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => navigate({ to: "/profile" })}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <span className="text-red">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <div className="fixed inset-x-0 bottom-0 z-40 flex w-full justify-around border-t bg-gray-lighter p-4 md:relative md:inset-x-auto md:bottom-auto md:w-auto md:gap-8 md:border-0 md:p-0">
      <NavButton imgSrc={NetworkSparkle} navRoute="/browse" navText="Browse" />
      <NavButton imgSrc={LoginSVG} navRoute="/login" navText="Login" />
    </div>
  );
};

export default NavLinks;
