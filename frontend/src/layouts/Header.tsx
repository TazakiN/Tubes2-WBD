import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import reactLogo from "@/assets/react.svg";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-white px-20 py-2 shadow">
      <div className="flex items-center gap-3">
        <img src={reactLogo} alt="Company Logo" />
        <span className="text-xl font-bold">LinkinPurry</span>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex cursor-pointer items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/vite.png" alt="Avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span className="font-medium">Username</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
            <DropdownMenuItem
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onSelect={() => {
                /* Navigate to ConnectionRequest page */
              }}
            >
              Connection Request
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onSelect={() => {
                /* Navigate to List of Connection page */
              }}
            >
              List of Connections
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onSelect={() => {
                /* Navigate to Profile page */
              }}
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer px-4 py-2 text-red-500 hover:bg-red-100"
              onSelect={() => {
                /* Logout function */
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
