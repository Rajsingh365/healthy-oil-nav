import {
  Menu,
  Moon,
  Sun,
  Users,
  Trophy,
  Handshake,
  BarChart3,
  BookOpen,
  Settings,
  Info,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border h-14">
      <div className="container mx-auto px-4 h-full flex items-center justify-between max-w-md">
        <h1 className="text-lg font-bold text-primary">HealthyOil</h1>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                <Link
                  to="/community"
                  className="text-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  Community
                </Link>
                <Link
                  to="/leaderboard"
                  className="text-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
                >
                  <Trophy className="h-4 w-4" />
                  Leaderboard
                </Link>
                <Link
                  to="/partnerships"
                  className="text-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
                >
                  <Handshake className="h-4 w-4" />
                  Partnerships
                </Link>
                {/* <Link
                  to="/policy-dashboard"
                  className="text-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
                >
                  <BarChart3 className="h-4 w-4" />
                  Policy Dashboard
                </Link> */}
                <Link
                  to="/learn"
                  className="text-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
                >
                  <BookOpen className="h-4 w-4" />
                  Learn
                </Link>
                <Link
                  to="/settings"
                  className="text-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
                <Link
                  to="/about"
                  className="text-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
                >
                  <Info className="h-4 w-4" />
                  About
                </Link>
                <Link
                  to="/help"
                  className="text-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
                >
                  <HelpCircle className="h-4 w-4" />
                  Help
                </Link>
                <div className="border-t border-border my-2"></div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-foreground hover:text-primary transition-colors py-2 flex items-center gap-2 cursor-pointer bg-transparent border-none"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
