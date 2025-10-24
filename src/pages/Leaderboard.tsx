import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Trophy, Award, Medal, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from "@/contexts/UserContext";
import { usePoints } from "@/contexts/PointsContext";

const Leaderboard = () => {
  const { userProfile } = useUser();
  const { totalPoints } = usePoints();
  const firstName = userProfile.name.split(" ")[0];

  const leaderboardData = [
    {
      name: firstName,
      score: totalPoints,
      rank: 1,
      isCurrentUser: true,
      streak: 12,
    },
    { name: "Rohan", score: 1620, rank: 2, isCurrentUser: false, streak: 8 },
    { name: "Meena", score: 1450, rank: 3, isCurrentUser: false, streak: 6 },
    { name: "Arjun", score: 1280, rank: 4, isCurrentUser: false, streak: 4 },
    { name: "Priya", score: 1120, rank: 5, isCurrentUser: false, streak: 3 },
    { name: "Vikram", score: 980, rank: 6, isCurrentUser: false, streak: 2 },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-orange-500" />;
      default:
        return <Trophy className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-500 text-white";
      case 2:
        return "bg-gray-400 text-white";
      case 3:
        return "bg-orange-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <MobileLayout>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">🏆 Leaderboard</h1>
          <p className="text-muted-foreground">
            See how you rank among healthy oil users!
          </p>
        </div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="flex items-end justify-center gap-2 h-32">
            {/* 2nd Place */}
            {leaderboardData[1] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="bg-gray-100 dark:bg-gray-800 rounded-t-lg p-4 w-20 h-20 flex flex-col items-center justify-center">
                  <div className="text-2xl">🥈</div>
                  <div className="text-xs font-bold">2nd</div>
                </div>
                <div className="text-center mt-2">
                  <p className="font-semibold text-sm">
                    {leaderboardData[1].name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {leaderboardData[1].score} pts
                  </p>
                </div>
              </motion.div>
            )}

            {/* 1st Place */}
            {leaderboardData[0] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="bg-yellow-100 dark:bg-yellow-900/20 rounded-t-lg p-4 w-24 h-24 flex flex-col items-center justify-center border-2 border-yellow-300">
                  <div className="text-3xl">👑</div>
                  <div className="text-xs font-bold">1st</div>
                </div>
                <div className="text-center mt-2">
                  <p className="font-bold text-sm text-yellow-600 dark:text-yellow-400">
                    {leaderboardData[0].name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {leaderboardData[0].score} pts
                  </p>
                </div>
              </motion.div>
            )}

            {/* 3rd Place */}
            {leaderboardData[2] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col items-center"
              >
                <div className="bg-orange-100 dark:bg-orange-900/20 rounded-t-lg p-4 w-20 h-20 flex flex-col items-center justify-center">
                  <div className="text-2xl">🥉</div>
                  <div className="text-xs font-bold">3rd</div>
                </div>
                <div className="text-center mt-2">
                  <p className="font-semibold text-sm">
                    {leaderboardData[2].name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {leaderboardData[2].score} pts
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-3"
        >
          <h2 className="text-lg font-semibold">Full Rankings</h2>
          <div className="space-y-2">
            {leaderboardData.map((user, idx) => (
              <motion.div
                key={user.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
              >
                <Card
                  className={`p-4 ${
                    user.isCurrentUser
                      ? "bg-primary/10 border-primary/30 ring-2 ring-primary/20"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRankColor(
                          user.rank
                        )}`}
                      >
                        {user.rank}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p
                            className={`font-medium ${
                              user.isCurrentUser ? "text-primary" : ""
                            }`}
                          >
                            {user.name} {user.isCurrentUser && "(You)"}
                          </p>
                          {user.rank <= 3 && getRankIcon(user.rank)}
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                          <p className="text-sm text-muted-foreground">
                            {user.score} points
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {user.streak} day streak
                          </p>
                        </div>
                      </div>
                    </div>
                    {user.isCurrentUser && (
                      <div className="p-2 bg-primary/20 rounded-full">
                        <Trophy className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-2 gap-4"
        >
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">1st</div>
            <p className="text-sm text-muted-foreground">Your Rank</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary">1,850</div>
            <p className="text-sm text-muted-foreground">Total Points</p>
          </Card>
        </motion.div>
      </div>
    </MobileLayout>
  );
};

export default Leaderboard;
