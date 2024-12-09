import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import NavLinks from "@/components/Header/NavLinks";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({
        to: "/browse",
        search: () => ({
          query: searchQuery,
        }),
      });
    }
  };

  return (
    <header className="relative bg-gray-lighter shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <img
            src="/favicon.ico"
            alt="Company Logo"
            className="size-10 rounded-lg"
          />
          <form onSubmit={handleSubmit} className="relative w-full max-w-96">
            <Input
              type="search"
              placeholder="Search"
              className="w-full pl-8 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              className="absolute inset-y-0 left-3 my-auto text-gray-500"
              size={15}
            />
          </form>
        </div>

        <NavLinks />
      </div>
    </header>
  );
};

export default Header;
