import { cn } from "@/lib/utils";
import React from "react";
import Logo from "@/../public/Logo.png";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  className?: string;
  children?: React.ReactNode;
}

const Navbar = ({ className, children }: NavbarProps) => {
  const router = useNavigate();

  const handleLogoClick = () => {
    router("/");
  };
  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60 flex items-center justify-between py-1 select-none",
        className,
      )}
    >
      <div className="flex items-center md:gap-3 gap-1 md:pl-4 pl-2">
          <img
            src={Logo}
            alt="Logo"
          className="h-8 cursor-pointer"
          onClick={handleLogoClick}
          />
        <p className="text-xl tracking-widest mt-1 text-slate-800 font-bold">FLOW OFF</p>
        </div>
      
      {children}
    </nav>
  );
};

Navbar.displayName = "Navbar";

export default Navbar;
