import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import NavLinks from "@/components/Header/NavLinks";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
          <div className="relative w-full max-w-96">
            <Input
              type="search"
              placeholder="Search"
              className="w-full pl-8 text-base"
            />
            <Search
              className="absolute inset-y-0 left-3 my-auto text-gray-500"
              size={15}
            />
          </div>
        </div>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        <NavLinks />

        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-16 z-50 overflow-y-auto bg-white md:hidden">
            <NavLinks isMobile={true} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
