import { useContext, useEffect } from "react";
import { UserDataContext } from "@/contexts/UserDataContext";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import reactLogo from "@/assets/react.svg";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { userData } = useContext(UserDataContext);
  const isAuthenticated = Boolean(userData);

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
      navigate({ to: "/login" });
    }
  }, [isAuthenticated, navigate]);

  return (
    <header className="flex items-center justify-between bg-slate-100 px-20 py-2 shadow">
      <div className="flex items-center gap-3">
        <img src={reactLogo} alt="Company Logo" />
        <span className="text-xl font-bold">LinkinPurry</span>
      </div>
      <div>
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex cursor-pointer items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={userData?.profile_photo_path || "/vite.png"}
                  alt="Avatar"
                />
                <AvatarFallback>
                  {userData?.username?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">
                {userData?.username || "Username"}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
              <DropdownMenuItem
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onSelect={() => navigate({ to: "/" })}
              >
                Connection Request
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onSelect={() => navigate({ to: "/" })}
              >
                List of Connections
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onSelect={() => navigate({ to: "/" })}
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer px-4 py-2 text-red-500 hover:bg-red-100"
                onSelect={handleLogout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate({ to: "/register" })}
            >
              Register
            </Button>
            <Button onClick={() => navigate({ to: "/login" })}>Login</Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
