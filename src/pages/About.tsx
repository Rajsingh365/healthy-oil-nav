import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Droplet, Target, Users, TrendingUp, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <MobileLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">About EatWise</h1>
        </div>

        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary/20 rounded-full">
              <Droplet className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">EatWise</h2>
              <p className="text-sm text-muted-foreground">Version 1.0.0</p>
            </div>
          </div>
          <p className="text-muted-foreground">
            Your companion for tracking and reducing cooking oil consumption for
            a healthier lifestyle.
          </p>
        </Card>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Our Mission</h2>
          <Card className="p-5">
            <p className="text-muted-foreground leading-relaxed">
              EatWise helps Indian families monitor their cooking oil usage,
              promote healthier eating habits, and reduce excessive oil
              consumption through smart tracking and personalized insights.
            </p>
          </Card>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Features</h2>
          <div className="grid gap-3">
            {[
              {
                icon: Target,
                title: "Smart Tracking",
                desc: "Log and monitor your daily oil usage with ease",
              },
              {
                icon: TrendingUp,
                title: "Progress Insights",
                desc: "View trends and patterns in your consumption",
              },
              {
                icon: Users,
                title: "Family Support",
                desc: "Track usage for entire household members",
              },
            ].map((feature, idx) => (
              <Card key={idx} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-5">
          <h3 className="font-semibold mb-2">Contact Us</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Email: support@eatwise.app</p>
            <p>Website: www.eatwise.app</p>
          </div>
        </Card>

        <div className="text-center text-sm text-muted-foreground pb-4">
          <p>Made with ❤️ for healthier living</p>
          <p className="mt-1">© 2025 EatWise. All rights reserved.</p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default About;
