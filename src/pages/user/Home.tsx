import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, TrendingDown, Target, Camera } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

const awarenessMessages = [
  "Cut down oil, lift up health 💪",
  "Try mustard oil instead of palm oil 🌿",
  "Small changes, big health benefits 🌟",
  "Your heart thanks you for less oil ❤️",
];

const Home = () => {
  const { userProfile } = useUser();
  const firstName = userProfile?.name?.split(" ")[0] || "User";

  return (
    <MobileLayout>
      <div className="space-y-6">
        {/* Awareness Carousel */}
        <div className="relative px-2">
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {awarenessMessages.map((message, index) => (
                <CarouselItem key={index}>
                  <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30 p-6 text-center">
                    <p className="text-lg font-semibold text-foreground">
                      {message}
                    </p>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>

        {/* Daily Summary */}
        <Card className="bg-gradient-to-br from-secondary/20 to-secondary/5 border-secondary/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Today's Summary
              </p>
              <p className="text-3xl font-bold text-foreground">20ml</p>
              <p className="text-sm text-muted-foreground mt-1">
                Oil used so far
              </p>
            </div>
            <div className="text-5xl">🥗</div>
          </div>
        </Card>

        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Welcome {firstName} 👋</h1>
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
            <Link to="/tracker">
              <Card className="p-4 text-center cursor-pointer hover:bg-accent transition-colors">
                <p className="font-medium">Log Usage</p>
              </Card>
            </Link>
            <Link to="/learn">
              <Card className="p-4 text-center cursor-pointer hover:bg-accent transition-colors">
                <p className="font-medium">View Tips</p>
              </Card>
            </Link>
          </div>

          <div className="">
            {/* Capture Meal Button */}
            <Link to="/ai-analyzer">
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 text-lg">
                <Camera className="h-5 w-5 mr-2" />
                Capture Meal
              </Button>
            </Link>
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
                  <p className="text-xs text-muted-foreground">
                    Today, 7:30 AM
                  </p>
                </div>
                <p className="font-semibold text-primary">50ml</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Cooking Oil</p>
                  <p className="text-xs text-muted-foreground">
                    Yesterday, 8:15 PM
                  </p>
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
