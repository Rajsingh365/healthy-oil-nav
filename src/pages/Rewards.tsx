import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Gift, Zap, Award, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { usePoints } from "@/contexts/PointsContext";
import { useUser } from "@/contexts/UserContext";
import { Link } from "react-router-dom";

const Rewards = () => {
  const { totalPoints, addPoints } = usePoints();
  const { userProfile } = useUser();
  const firstName = userProfile.name.split(" ")[0];
  const [claimedReward, setClaimedReward] = useState(false);
  const [showRewardCard, setShowRewardCard] = useState(true);

  const handleClaimReward = () => {
    setClaimedReward(true);
    addPoints(50);
    setTimeout(() => {
      setClaimedReward(false);
      setShowRewardCard(false);
    }, 2000);
  };

  return (
    <MobileLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Rewards & Progress</h1>
          <Link to="/leaderboard">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Leaderboard
            </Button>
          </Link>
        </div>

        {/* Monthly Goal Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Monthly Goal</h2>
                <span className="text-sm text-muted-foreground">
                  70% Complete
                </span>
              </div>
              <Progress value={70} className="h-3" />
              <p className="text-sm text-muted-foreground">
                Keep going! You're on track to meet your monthly target.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Points Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-6 bg-gradient-to-br from-secondary/20 to-secondary/5 border-secondary/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Points</p>
                <p className="text-4xl font-bold text-secondary">
                  {totalPoints.toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-secondary/20 rounded-full">
                <Trophy className="h-8 w-8 text-secondary" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Achievement Card */}
        {showRewardCard && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-full">
                  <Gift className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-green-700 dark:text-green-400">
                    🎁 You earned 50 points for staying under target!
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Great job maintaining healthy oil usage this week!
                  </p>
                </div>
              </div>
              <Button
                onClick={handleClaimReward}
                disabled={claimedReward}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
              >
                {claimedReward ? "✓ Reward Claimed!" : "Claim Reward"}
              </Button>
            </Card>
          </motion.div>
        )}

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-3"
        >
          <h2 className="text-lg font-semibold">Achievements</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: Star,
                title: "First Week",
                desc: "Complete 7 days",
                unlocked: true,
              },
              {
                icon: Zap,
                title: "Efficiency",
                desc: "15% reduction",
                unlocked: true,
              },
              {
                icon: Gift,
                title: "Monthly Goal",
                desc: "Meet target",
                unlocked: false,
              },
              {
                icon: Trophy,
                title: "Champion",
                desc: "3 months streak",
                unlocked: false,
              },
            ].map((achievement, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + idx * 0.1 }}
              >
                <Card
                  className={`p-4 ${
                    achievement.unlocked
                      ? "bg-primary/5 border-primary/20"
                      : "opacity-50"
                  }`}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div
                      className={`p-3 rounded-full ${
                        achievement.unlocked ? "bg-primary/10" : "bg-muted"
                      }`}
                    >
                      <achievement.icon
                        className={`h-5 w-5 ${
                          achievement.unlocked
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {achievement.desc}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-3"
        >
          <h2 className="text-lg font-semibold">Weekly Challenges</h2>
          <div className="space-y-3">
            {[
              { task: "Log usage 5 days", current: 3, total: 5, points: 50 },
              { task: "Reduce by 10%", current: 7, total: 10, points: 100 },
              { task: "Share a tip", current: 0, total: 1, points: 25 },
            ].map((challenge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
              >
                <Card className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium">{challenge.task}</p>
                        <p className="text-xs text-muted-foreground">
                          {challenge.current}/{challenge.total} completed
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-secondary">
                          +{challenge.points}
                        </p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                    </div>
                    <Progress
                      value={(challenge.current / challenge.total) * 100}
                      className="h-2"
                    />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </MobileLayout>
  );
};

export default Rewards;
