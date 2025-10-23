import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Droplet, TrendingDown, Target } from "lucide-react";

const Home = () => {
  return (
    <MobileLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Welcome Asha 👋</h1>
          <p className="text-muted-foreground">
            Track your healthy oil usage and earn rewards!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-3xl font-bold text-primary">2.5L</p>
                <p className="text-xs text-muted-foreground">Oil used</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Droplet className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-4 w-4 text-success" />
                <p className="text-xs text-muted-foreground">Reduced</p>
              </div>
              <p className="text-2xl font-bold">15%</p>
              <p className="text-xs text-muted-foreground">vs last month</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-secondary" />
                <p className="text-xs text-muted-foreground">Goal</p>
              </div>
              <p className="text-2xl font-bold">3L</p>
              <p className="text-xs text-muted-foreground">monthly target</p>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 text-center cursor-pointer hover:bg-accent transition-colors">
              <p className="font-medium">Log Usage</p>
            </Card>
            <Card className="p-4 text-center cursor-pointer hover:bg-accent transition-colors">
              <p className="font-medium">View Tips</p>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <Card className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Cooking Oil</p>
                  <p className="text-xs text-muted-foreground">Today, 7:30 AM</p>
                </div>
                <p className="font-semibold text-primary">50ml</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Cooking Oil</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 8:15 PM</p>
                </div>
                <p className="font-semibold text-primary">75ml</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Home;
