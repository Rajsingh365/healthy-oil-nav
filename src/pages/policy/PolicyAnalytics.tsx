import { PolicyMobileLayout } from "@/components/layout/PolicyMobileLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { TrendingUp, TrendingDown, Users, Activity } from "lucide-react";
import { motion } from "framer-motion";

const PolicyAnalytics = () => {
  const trendData = [
    { month: "Jan", consumption: 42, users: 1200 },
    { month: "Feb", consumption: 40, users: 1450 },
    { month: "Mar", consumption: 38, users: 1800 },
    { month: "Apr", consumption: 36, users: 2100 },
    { month: "May", consumption: 35, users: 2500 },
    { month: "Jun", consumption: 33, users: 2800 },
  ];

  const regionData = [
    { region: "North", reduction: 15, users: 5200 },
    { region: "South", reduction: 18, users: 4800 },
    { region: "East", reduction: 12, users: 3900 },
    { region: "West", reduction: 16, users: 5600 },
  ];

  const ageGroupData = [
    { age: "18-25", adoption: 65 },
    { age: "26-35", adoption: 72 },
    { age: "36-45", adoption: 58 },
    { age: "46-55", adoption: 45 },
    { age: "56+", adoption: 38 },
  ];

  return (
    <PolicyMobileLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Analytics Overview</h1>
          <p className="text-muted-foreground text-sm">
            Detailed insights and trends
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
              <div className="flex items-center justify-between mb-2">
                <TrendingDown className="h-5 w-5 text-green-600 dark:text-green-400" />
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                >
                  -18%
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Avg Reduction</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                18%
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                >
                  +45%
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                19.5K
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Consumption Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Consumption Trend (6 Months)
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="consumption"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* User Growth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              User Growth
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#10b981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Regional Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-5">
            <h3 className="font-semibold mb-4">Regional Performance</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={regionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="reduction" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Age Group Adoption */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-5">
            <h3 className="font-semibold mb-4">Adoption by Age Group</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={ageGroupData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="age" type="category" />
                <Tooltip />
                <Bar dataKey="adoption" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>
    </PolicyMobileLayout>
  );
};

export default PolicyAnalytics;
