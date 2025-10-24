import { Home, BadgeCheck, BarChart3, Utensils } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Overview", path: "/partner-dashboard" },
  { icon: BadgeCheck, label: "Certification", path: "/partner-certification" },
  { icon: BarChart3, label: "Audit", path: "/partner-audit-dashboard" },
  { icon: Utensils, label: "Menu", path: "/partner-menu" },
];

export const PartnerBottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border pb-safe">
      <div className="container mx-auto px-2 max-w-md">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 px-2 py-2 rounded-lg flex-1 max-w-[80px] transition-all",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive && "scale-110")} />
                <span className="text-[10px] font-medium leading-tight text-center">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
