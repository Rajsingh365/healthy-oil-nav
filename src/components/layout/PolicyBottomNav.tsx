import { BarChart3, TrendingUp, FileText, Users, Target } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: BarChart3, label: "Dashboard", path: "/policy-dashboard" },
  { icon: TrendingUp, label: "Analytics", path: "/policy-analytics" },
  { icon: FileText, label: "Reports", path: "/policy-reports" },
  { icon: Users, label: "Insights", path: "/policy-insights" },
  { icon: Target, label: "Campaigns", path: "/policy-campaigns" },
];

export const PolicyBottomNav = () => {
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
                  "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg min-w-[60px] transition-all",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive && "scale-110")} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
