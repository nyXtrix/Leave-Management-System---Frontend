import { ChevronDown, LogIn, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { HOME_NAV_LINKS } from "@/constant";
import IconButton from "@/components/ui/IconButton";

const HomeNavbar = () => {
  return (
    <Navbar className="py-2 h-20">
      <div className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
        {HOME_NAV_LINKS.map((menu) => (
          <DropdownMenu key={menu.label}>
            <DropdownMenuTrigger asChild>
              <IconButton
                noScale
                variant="ghost"
                icon={ChevronDown}
                iconPosition="right"
                className="group flex items-center gap-1.5 px-4 text-sm font-bold tracking-widest text-slate-500 hover:text-primary-500 hover:bg-slate-50 data-[state=open]:text-primary-500 data-[state=open]:bg-primary-50/50 transition-all rounded-xl focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
                iconClassName="group-data-[state=open]:rotate-180 transition-transform duration-300"
              >
                {menu.label}
              </IconButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-64 p-2 mt-2 glass rounded-2xl shadow-premium animate-reveal focus:outline-none"
            >
              {menu.items.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  asChild
                  className="focus:bg-transparent focus:text-inherit"
                >
                  <a
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-primary-50 group/item transition-colors focus:outline-none"
                  >
                    <div className="p-1 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 group-hover/item:border-primary-100 group-hover/item:bg-white transition-all">
                      <item.icon className="h-4 w-4 text-slate-400 group-hover/item:text-primary-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700 group-hover/item:text-primary-500">
                        {item.label}
                      </span>
                    </div>
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>

      <div className="flex items-center gap-3 pr-4 sm:pr-8 min-w-[200px] justify-end">
        <Link to="/login" className="hidden sm:block shadow-none outline-none">
          <IconButton
            variant="default"
            className="rounded-xl px-1 sm:px-6 h-11 text-xs font-semibold tracking-widest focus:outline-none focus:ring-0 focus-visible:ring-0"
            icon={LogIn}
            iconPosition="right"
          >
            Login
          </IconButton>
        </Link>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 rounded-xl text-slate-500 hover:bg-slate-100 focus:outline-none focus-visible:ring-0"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:max-w-md p-0 flex flex-col glass border-l border-primary-100 focus:outline-none"
            >
              <SheetHeader className="p-8 border-b border-primary-50">
                <SheetTitle className="text-2xl font-black tracking-tighter text-left text-primary-500">
                  Cloud LMS OS
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                {HOME_NAV_LINKS.map((section) => (
                  <div key={section.label} className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                      {section.label}
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {section.items.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="flex items-center gap-4 p-4 rounded-2xl hover:bg-primary-50 group transition-all focus:outline-none"
                        >
                          <div className="h-11 w-11 rounded-xl bg-white border border-primary-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                            <item.icon className="h-5 w-5 text-primary-500" />
                          </div>
                          <span className="text-sm font-bold text-slate-700">
                            {item.label}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-8 border-t border-primary-50 bg-slate-50/50 space-y-4">
                <Link to="/login" className="w-full shadow-none outline-none">
                  <IconButton
                    variant="default"
                    icon={LogIn}
                    iconPosition="right"
                    className="w-full h-14 rounded-2xl text-[13px] font-black uppercase tracking-widest flex items-center justify-center gap-2 focus:outline-none focus:ring-0"
                  >
                    Login
                  </IconButton>
                </Link>
                <p className="text-[10px] font-black text-slate-400 text-center uppercase tracking-widest">
                  © 2026 LEAVR CORE SYSTEMS
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </Navbar>
  );
};

export default HomeNavbar;
