import { MobileLayout } from "@/components/layout/MobileLayout";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, TrendingDown, Users, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const PolicyDashboard = () => {
  const stateData = [
    {
      state: "Maharashtra",
      consumption: 45,
      population: 12.5,
      trend: "up",
      change: 2.3,
    },
    {
      state: "Tamil Nadu",
      consumption: 38,
      population: 7.8,
      trend: "down",
      change: -1.2,
    },
    {
      state: "Gujarat",
      consumption: 42,
      population: 6.3,
      trend: "up",
      change: 0.8,
    },
    {
      state: "Karnataka",
      consumption: 35,
      population: 6.7,
      trend: "down",
      change: -2.1,
    },
  ];

  const pieData = [
    { name: "Maharashtra", value: 45, color: "#8884d8" },
    { name: "Tamil Nadu", value: 38, color: "#82ca9d" },
    { name: "Gujarat", value: 42, color: "#ffc658" },
    { name: "Karnataka", value: 35, color: "#ff7c7c" },
  ];

  const timeSeriesData = [
    { month: "Jan", consumption: 42 },
    { month: "Feb", consumption: 38 },
    { month: "Mar", consumption: 45 },
    { month: "Apr", consumption: 41 },
    { month: "May", consumption: 39 },
    { month: "Jun", consumption: 36 },
  ];

  return (
    <MobileLayout>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">📊 Policy Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time oil consumption analytics across Indian states
          </p>
        </div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-4"
        >
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">40.2ml</div>
            <p className="text-sm text-muted-foreground">National Average</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">-3.2%</div>
            <p className="text-sm text-muted-foreground">YoY Reduction</p>
          </Card>
        </motion.div>

        {/* State-wise Consumption Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">
              Oil Consumption by State
            </h3>
            <div className="h-64 w-full overflow-x-auto">
              <ResponsiveContainer width="100%" height="100%" minWidth={300}>
                <BarChart data={stateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="state" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="consumption" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Distribution Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">
              Consumption Distribution
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}ml`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* State Details Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">State-wise Details</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2">State</th>
                    <th className="text-right py-2">Consumption (ml)</th>
                    <th className="text-right py-2">Population (Cr)</th>
                    <th className="text-center py-2">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {stateData.map((state, idx) => (
                    <motion.tr
                      key={state.state}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + idx * 0.1 }}
                      className="border-b border-border/50"
                    >
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {state.state}
                        </div>
                      </td>
                      <td className="text-right py-3 font-medium">
                        {state.consumption}ml
                      </td>
                      <td className="text-right py-3 text-muted-foreground">
                        {state.population}Cr
                      </td>
                      <td className="text-center py-3">
                        <div className="flex items-center justify-center gap-1">
                          {state.trend === "up" ? (
                            <TrendingUp className="h-4 w-4 text-red-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-green-500" />
                          )}
                          <span
                            className={`text-xs ${
                              state.trend === "up"
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {state.change > 0 ? "+" : ""}
                            {state.change}%
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Time Series Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Monthly Trend</h3>
            <div className="h-48 w-full overflow-x-auto">
              <ResponsiveContainer width="100%" height="100%" minWidth={400}>
                <BarChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="consumption" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-300">
              📈 Key Insights
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p>
                  Tamil Nadu shows the lowest consumption at 38ml per person
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p>Karnataka leads in reduction with -2.1% YoY change</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <p>
                  Maharashtra needs attention with highest consumption (45ml)
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </MobileLayout>
  );
};

export default PolicyDashboard;
