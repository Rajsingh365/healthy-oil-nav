import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Flame, Zap, Trophy, Target, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { usePoints } from "@/contexts/PointsContext";

const Streaks = () => {
  const { totalPoints } = usePoints();
  const [currentStreak, setCurrentStreak] = useState(14);
  const [goBackTickets, setGoBackTickets] = useState(2);
  const [heatmapData, setHeatmapData] = useState<{ [key: string]: number }>({});
  const [weeklyChallenges, setWeeklyChallenges] = useState([
    {
      id: 1,
      title: "Use < 40ml oil for 5 days",
      icon: "🥗",
      progress: 3,
      target: 5,
      color: "green",
    },
    {
      id: 2,
      title: "Add 30 minutes of walk daily",
      icon: "🚶‍♂️",
      progress: 2,
      target: 7,
      color: "blue",
    },
    {
      id: 3,
      title: "Log meals for 7 consecutive days",
      icon: "📝",
      progress: 5,
      target: 7,
      color: "purple",
    },
  ]);

  // Generate dummy heatmap data for the last 3 months
  useEffect(() => {
    const data: { [key: string]: number } = {};
    const today = new Date();

    for (let i = 0; i < 90; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];

      // Generate random activity levels (0-4)
      const level = Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0;
      data[dateStr] = level;
    }

    setHeatmapData(data);
  }, []);

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-gray-200 dark:bg-gray-800";
      case 1:
        return "bg-green-200 dark:bg-green-900";
      case 2:
        return "bg-green-300 dark:bg-green-800";
      case 3:
        return "bg-green-400 dark:bg-green-700";
      case 4:
        return "bg-green-500 dark:bg-green-600";
      default:
        return "bg-gray-200 dark:bg-gray-800";
    }
  };

  // Build monthly matrices (3 recent months), each as weeks x days (Mon-Sun)
  const monthMatrices = useMemo(() => {
    const results: Array<{
      monthLabel: string;
      weeks: Array<Array<string | null>>;
    }> = [];
    const today = new Date();
    for (let mOffset = 0; mOffset < 3; mOffset++) {
      const ref = new Date(today.getFullYear(), today.getMonth() - mOffset, 1);
      const year = ref.getFullYear();
      const month = ref.getMonth();
      const monthStart = new Date(year, month, 1);
      const monthEnd = new Date(year, month + 1, 0);

      const start = new Date(monthStart);
      const startDay = start.getDay(); // 0 Sun .. 6 Sat
      const mondayIndex = (startDay + 6) % 7; // Mon=0 .. Sun=6
      start.setDate(start.getDate() - mondayIndex);

      const end = new Date(monthEnd);
      const endDay = end.getDay();
      const sundayPad = (7 - ((endDay + 1) % 7)) % 7; // to Sunday
      end.setDate(end.getDate() + sundayPad);

      const weeks: Array<Array<string | null>> = [];
      let cursor = new Date(start);
      while (cursor <= end) {
        const week: Array<string | null> = [];
        for (let i = 0; i < 7; i++) {
          const inMonth = cursor >= monthStart && cursor <= monthEnd;
          const iso = cursor.toISOString().split("T")[0];
          week.push(inMonth ? iso : null);
          cursor.setDate(cursor.getDate() + 1);
        }
        weeks.push(week);
      }

      results.push({
        monthLabel: ref.toLocaleString(undefined, {
          month: "long",
          year: "numeric",
        }),
        weeks,
      });
    }
    return results;
  }, [heatmapData]);

  const [monthIndex, setMonthIndex] = useState(0); // 0 = current month
  const activeMonth = monthMatrices[monthIndex] || {
    monthLabel: "",
    weeks: [],
  };

  const useGoBackTicket = () => {
    if (goBackTickets > 0) {
      setGoBackTickets((prev) => prev - 1);
      setCurrentStreak((prev) => prev + 1);
    }
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return "text-red-500";
    if (streak >= 14) return "text-orange-500";
    if (streak >= 7) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <MobileLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Streaks</h1>
          </div>
        </div>

        {/* Current Streak */}
        <Card className="p-4 max-w-sm mx-auto bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                <Flame className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p
                  className={`text-3xl font-bold ${getStreakColor(
                    currentStreak
                  )}`}
                >
                  {currentStreak}-Day Streak
                </p>
              </div>
            </div>
            {goBackTickets > 0 && (
              <Button
                onClick={useGoBackTicket}
                variant="outline"
                size="sm"
                className="bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100"
              >
                <Zap className="h-4 w-4 mr-1" />
                Go-Back Ticket ({goBackTickets})
              </Button>
            )}
          </div>
        </Card>

        {/* Stats */}
        <Card className="p-4 max-w-sm mx-auto ">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Your Stats</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">45</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Days Active
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary">
                  {totalPoints.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Points</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">18%</p>
                <p className="text-xs text-muted-foreground mt-1">Reduced</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Heatmap Calendar (Monthly view) */}
        <Card className="p-4 max-w-sm mx-auto">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Consistency Heatmap</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`w-3 h-3 rounded ${getHeatmapColor(level)}`}
                    />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center mb-2">
                <p className="text-sm font-medium">
                  {monthMatrices[monthIndex]?.monthLabel || ""}
                </p>
              </div>
              <div className="flex justify-center">
                {/* Active month weeks */}
                <div className="grid grid-flow-col auto-cols-max gap-1">
                  {(monthMatrices[monthIndex]?.weeks || []).map(
                    (week, wIdx) => (
                      <div key={wIdx} className="grid grid-rows-7 gap-1">
                        {week.map((day, dIdx) => (
                          <motion.div
                            key={`${wIdx}-${dIdx}-${day ?? "x"}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.15 }}
                            className={`w-4 h-4 rounded ${
                              day
                                ? getHeatmapColor(heatmapData[day] ?? 0)
                                : "bg-transparent"
                            }`}
                            title={
                              day
                                ? `${day}: Level ${heatmapData[day] ?? 0}`
                                : ""
                            }
                          />
                        ))}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Navigation buttons at bottom right */}
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setMonthIndex((i) =>
                      Math.min(i + 1, monthMatrices.length - 1)
                    )
                  }
                  disabled={monthIndex >= monthMatrices.length - 1}
                >
                  ← Prev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMonthIndex((i) => Math.max(i - 1, 0))}
                  disabled={monthIndex <= 0}
                >
                  Next →
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Weekly Challenges */}
        <Card className="p-4 max-w-sm mx-auto">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Weekly Challenges</h3>
            </div>

            <div className="space-y-3">
              {weeklyChallenges.map((challenge) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: challenge.id * 0.1 }}
                  className="p-3 rounded-lg border border-border/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{challenge.icon}</span>
                      <span className="text-sm font-medium">
                        {challenge.title}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {challenge.progress}/{challenge.target}
                    </Badge>
                  </div>
                  <Progress
                    value={(challenge.progress / challenge.target) * 100}
                    className="h-2"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default Streaks;
