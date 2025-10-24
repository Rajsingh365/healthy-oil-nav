import { PolicyMobileLayout } from "@/components/layout/PolicyMobileLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  TrendingUp,
  Award,
  Activity,
  Clock,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";

const PolicyInsights = () => {
  const userSegments = [
    {
      segment: "Health Conscious",
      percentage: 35,
      count: 6825,
      trend: "up",
      engagement: "High",
    },
    {
      segment: "Budget Focused",
      percentage: 28,
      count: 5460,
      trend: "stable",
      engagement: "Medium",
    },
    {
      segment: "Early Adopters",
      percentage: 22,
      count: 4290,
      trend: "up",
      engagement: "High",
    },
    {
      segment: "Casual Users",
      percentage: 15,
      count: 2925,
      trend: "down",
      engagement: "Low",
    },
  ];

  const topCities = [
    { city: "Mumbai", users: 3200, reduction: 18 },
    { city: "Delhi", users: 2800, reduction: 15 },
    { city: "Bangalore", users: 2500, reduction: 20 },
    { city: "Chennai", users: 2200, reduction: 17 },
    { city: "Pune", users: 1900, reduction: 16 },
  ];

  const behaviorPatterns = [
    {
      pattern: "Morning Tracking",
      percentage: 65,
      description: "Users track consumption during breakfast prep",
    },
    {
      pattern: "Weekly Review",
      percentage: 48,
      description: "Users review their weekly oil consumption",
    },
    {
      pattern: "Goal Setting",
      percentage: 72,
      description: "Users actively set reduction goals",
    },
    {
      pattern: "Community Engagement",
      percentage: 38,
      description: "Users participate in community discussions",
    },
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === "up")
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    return <Activity className="h-4 w-4 text-muted-foreground" />;
  };

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case "High":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
    }
  };

  return (
    <PolicyMobileLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">User Insights</h1>
          <p className="text-muted-foreground text-sm">
            Behavioral patterns and demographics
          </p>
        </div>

        {/* Total Users */}
        <Card className="p-5 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Users</p>
              <p className="text-3xl font-bold">19,500</p>
            </div>
            <Users className="h-10 w-10 text-primary" />
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">+45%</span>
            <span className="text-sm text-muted-foreground">vs last month</span>
          </div>
        </Card>

        {/* User Segments */}
        <div>
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            User Segments
          </h2>
          <div className="space-y-3">
            {userSegments.map((segment, index) => (
              <motion.div
                key={segment.segment}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{segment.segment}</h3>
                      {getTrendIcon(segment.trend)}
                    </div>
                    <Badge className={getEngagementColor(segment.engagement)}>
                      {segment.engagement}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      {segment.count.toLocaleString()} users
                    </span>
                    <span className="text-sm font-medium">
                      {segment.percentage}%
                    </span>
                  </div>
                  <Progress value={segment.percentage} className="h-2" />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Top Cities */}
        <div>
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Top Cities by Users
          </h2>
          <div className="space-y-2">
            {topCities.map((city, index) => (
              <motion.div
                key={city.city}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold">{city.city}</p>
                        <p className="text-xs text-muted-foreground">
                          {city.users.toLocaleString()} users
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      >
                        -{city.reduction}%
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        reduction
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Behavior Patterns */}
        <div>
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Behavior Patterns
          </h2>
          <div className="space-y-3">
            {behaviorPatterns.map((pattern, index) => (
              <motion.div
                key={pattern.pattern}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{pattern.pattern}</h3>
                    <span className="text-sm font-medium text-primary">
                      {pattern.percentage}%
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {pattern.description}
                  </p>
                  <Progress value={pattern.percentage} className="h-2" />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <Card className="p-5 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center gap-3 mb-3">
            <Award className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            <div>
              <h3 className="font-semibold">User Achievements</h3>
              <p className="text-sm text-muted-foreground">
                Total milestones reached
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
                12.5K
              </p>
              <p className="text-xs text-muted-foreground">Badges Earned</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
                8.2K
              </p>
              <p className="text-xs text-muted-foreground">Goals Achieved</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
                156
              </p>
              <p className="text-xs text-muted-foreground">Avg Streak</p>
            </div>
          </div>
        </Card>
      </div>
    </PolicyMobileLayout>
  );
};

export default PolicyInsights;
