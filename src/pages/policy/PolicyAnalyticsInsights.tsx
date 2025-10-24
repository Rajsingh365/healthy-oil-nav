import { useState } from "react";
import { PolicyMobileLayout } from "@/components/layout/PolicyMobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Users,
  TrendingUp,
  TrendingDown,
  Award,
  Activity,
  Clock,
  MapPin,
  BarChart3,
  Droplet,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const PolicyAnalyticsInsights = () => {
  const [achievementsOpen, setAchievementsOpen] = useState(false);

  // Dummy Data - Overview Tab
  const consumptionTrendData = [
    { month: "Apr", consumption: 42 },
    { month: "May", consumption: 38 },
    { month: "Jun", consumption: 35 },
    { month: "Jul", consumption: 32 },
    { month: "Aug", consumption: 28 },
    { month: "Sep", consumption: 25 },
  ];

  const userGrowthData = [
    { month: "Apr", users: 12500 },
    { month: "May", users: 14200 },
    { month: "Jun", users: 16800 },
    { month: "Jul", users: 17500 },
    { month: "Aug", users: 18900 },
    { month: "Sep", users: 19500 },
  ];

  const regionalPerformanceData = [
    { city: "Mumbai", users: 3200, reduction: 18 },
    { city: "Delhi", users: 2800, reduction: 15 },
    { city: "Bangalore", users: 2500, reduction: 20 },
    { city: "Chennai", users: 2200, reduction: 17 },
    { city: "Pune", users: 1900, reduction: 16 },
  ];

  // Dummy Data - Demographics Tab
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
    if (trend === "down")
      return <TrendingDown className="h-4 w-4 text-red-600" />;
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
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold mb-2">Analytics & Insights</h1>
          <p className="text-muted-foreground text-sm">
            Comprehensive view of trends, demographics, and user behavior
          </p>
        </div>

        {/* Tabbed Interface */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger
              value="overview"
              className="text-xs sm:text-sm px-2 py-2 whitespace-normal leading-tight"
            >
              <BarChart3 className="h-4 w-4 mr-1" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="demographics"
              className="text-xs sm:text-sm px-2 py-2 whitespace-normal leading-tight"
            >
              <Users className="h-4 w-4 mr-1" />
              Demographics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 mt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Key Metrics Cards */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplet className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <p className="text-xs text-muted-foreground">
                      Avg Reduction
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                    40%
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingDown className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600 font-medium">
                      -8ml avg
                    </span>
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <p className="text-xs text-muted-foreground">
                      Active Users
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                    19.5K
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-blue-600" />
                    <span className="text-xs text-blue-600 font-medium">
                      +45%
                    </span>
                  </div>
                </Card>
              </div>

              {/* Consumption Trend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary" />
                    Oil Consumption Trend
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    6-month average per user
                  </p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={consumptionTrendData}>
                      <defs>
                        <linearGradient
                          id="colorConsumption"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="hsl(var(--primary))"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="hsl(var(--primary))"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12 }}
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        stroke="hsl(var(--muted-foreground))"
                        label={{
                          value: "ml/day",
                          angle: -90,
                          position: "insideLeft",
                          style: { fontSize: 12 },
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="consumption"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fill="url(#colorConsumption)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* User Growth Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    User Growth Trend
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Total active users over 6 months
                  </p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12 }}
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        stroke="hsl(var(--muted-foreground))"
                        label={{
                          value: "Users",
                          angle: -90,
                          position: "insideLeft",
                          style: { fontSize: 12 },
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="users"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{ r: 4, fill: "hsl(var(--primary))" }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Regional Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Regional Performance
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Top cities by users and reduction rate
                  </p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={regionalPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis
                        dataKey="city"
                        tick={{ fontSize: 11 }}
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis
                        yAxisId="left"
                        tick={{ fontSize: 11 }}
                        stroke="hsl(var(--muted-foreground))"
                        label={{
                          value: "Users",
                          angle: -90,
                          position: "insideLeft",
                          style: { fontSize: 11 },
                        }}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        tick={{ fontSize: 11 }}
                        stroke="hsl(var(--muted-foreground))"
                        label={{
                          value: "Reduction %",
                          angle: 90,
                          position: "insideRight",
                          style: { fontSize: 11 },
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend
                        wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
                      />
                      <Bar
                        yAxisId="left"
                        dataKey="users"
                        fill="hsl(var(--primary))"
                        name="Users"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="reduction"
                        fill="hsl(142, 71%, 45%)"
                        name="Reduction %"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Demographics & Patterns Tab */}
          <TabsContent value="demographics" className="space-y-4 mt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Total Users Card */}
              <Card className="p-5 bg-gradient-to-br from-primary/10 to-primary/5 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Total Users
                    </p>
                    <p className="text-3xl font-bold">19,500</p>
                  </div>
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">
                    +45%
                  </span>
                  <span className="text-sm text-muted-foreground">
                    vs last month
                  </span>
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
                          <Badge
                            className={getEngagementColor(segment.engagement)}
                          >
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

              {/* Behavior Patterns */}
              <div className="mt-6">
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

              {/* Achievements - Collapsible */}
              <div className="mt-6">
                <Collapsible
                  open={achievementsOpen}
                  onOpenChange={setAchievementsOpen}
                >
                  <Card className="p-5 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-yellow-200 dark:border-yellow-800">
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Award className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                          <div className="text-left">
                            <h3 className="font-semibold">User Achievements</h3>
                            <p className="text-sm text-muted-foreground">
                              Total milestones reached
                            </p>
                          </div>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${
                            achievementsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-yellow-200 dark:border-yellow-800"
                      >
                        <div className="text-center">
                          <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
                            12.5K
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Badges Earned
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
                            8.2K
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Goals Achieved
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
                            156
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Avg Streak
                          </p>
                        </div>
                      </motion.div>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </PolicyMobileLayout>
  );
};

export default PolicyAnalyticsInsights;
