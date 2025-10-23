import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Gift, Zap } from "lucide-react";

const Rewards = () => {
  return (
    <MobileLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Rewards & Progress</h1>

        {/* Points Card */}
        <Card className="p-6 bg-gradient-to-br from-secondary/20 to-secondary/5 border-secondary/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Points</p>
              <p className="text-4xl font-bold text-secondary">1,250</p>
            </div>
            <div className="p-4 bg-secondary/20 rounded-full">
              <Trophy className="h-8 w-8 text-secondary" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Level 3</span>
              <span className="text-muted-foreground">Next: 1,500 pts</span>
            </div>
            <Progress value={83} className="h-2" />
          </div>
        </Card>

        {/* Achievements */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Achievements</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Star, title: "First Week", desc: "Complete 7 days", unlocked: true },
              { icon: Zap, title: "Efficiency", desc: "15% reduction", unlocked: true },
              { icon: Gift, title: "Monthly Goal", desc: "Meet target", unlocked: false },
              { icon: Trophy, title: "Champion", desc: "3 months streak", unlocked: false },
            ].map((achievement, idx) => (
              <Card 
                key={idx} 
                className={`p-4 ${achievement.unlocked ? 'bg-primary/5 border-primary/20' : 'opacity-50'}`}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div className={`p-3 rounded-full ${achievement.unlocked ? 'bg-primary/10' : 'bg-muted'}`}>
                    <achievement.icon className={`h-5 w-5 ${achievement.unlocked ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{achievement.title}</p>
                    <p className="text-xs text-muted-foreground">{achievement.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Weekly Challenges */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Weekly Challenges</h2>
          <div className="space-y-3">
            {[
              { task: "Log usage 5 days", current: 3, total: 5, points: 50 },
              { task: "Reduce by 10%", current: 7, total: 10, points: 100 },
              { task: "Share a tip", current: 0, total: 1, points: 25 },
            ].map((challenge, idx) => (
              <Card key={idx} className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium">{challenge.task}</p>
                      <p className="text-xs text-muted-foreground">
                        {challenge.current}/{challenge.total} completed
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-secondary">+{challenge.points}</p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                  <Progress value={(challenge.current / challenge.total) * 100} className="h-2" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Rewards;
