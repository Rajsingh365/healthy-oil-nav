import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import {
  Menu,
  X,
  Moon,
  Sun,
  Users,
  Trophy,
  Search,
  BookOpen,
  Settings,
  Info,
  HelpCircle,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useUser();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const MenuItem = ({
    to,
    icon: Icon,
    label,
  }: {
    to: string;
    icon: any;
    label: string;
  }) => (
    <Link
      to={to}
      onClick={() => setMenuOpen(false)}
      className={`flex items-center gap-3 px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors ${
        location.pathname === to ? "bg-accent text-accent-foreground" : ""
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-3xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            aria-label="Toggle Menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="p-2 rounded-md hover:bg-accent"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold">EatWise</span>
            <span className="text-xs text-muted-foreground">User Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle Theme"
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-accent"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t bg-background/95">
          <div className="container mx-auto max-w-3xl p-3 grid gap-1">
            <MenuItem to="/community" icon={Users} label="Community" />
            <MenuItem to="/leaderboard" icon={Trophy} label="Leaderboard" />
            <MenuItem
              to="/find-restaurants"
              icon={Search}
              label="Find Restaurants"
            />
            <MenuItem to="/learn" icon={BookOpen} label="Learn" />

            <div className="my-2 border-t" />

            <MenuItem to="/about" icon={Info} label="About" />
            <MenuItem to="/help" icon={HelpCircle} label="Help" />
            <MenuItem to="/settings" icon={Settings} label="Settings" />

            <button
              onClick={handleLogout}
              className="mt-1 flex items-center gap-3 px-4 py-2 rounded-md hover:bg-accent text-left"
            >
              <X className="h-5 w-5" />
              <span>Logout</span>
            </button>

            {currentUser && (
              <div className="mt-2 px-4 text-xs text-muted-foreground">
                Signed in as{" "}
                <span className="font-medium">
                  {currentUser.name || currentUser.email}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
