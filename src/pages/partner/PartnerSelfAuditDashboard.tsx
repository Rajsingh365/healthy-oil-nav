import PartnerMobileLayout from "@/components/layout/PartnerMobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingDown,
  Utensils,
  CheckCircle2,
  Lightbulb,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Dummy data for daily oil usage
const dailyOilData = [
  { date: "Mon", avgOil: 28 },
  { date: "Tue", avgOil: 26 },
  { date: "Wed", avgOil: 24 },
  { date: "Thu", avgOil: 22 },
  { date: "Fri", avgOil: 20 },
  { date: "Sat", avgOil: 19 },
  { date: "Sun", avgOil: 18 },
];

// Dummy data for top 5 oil-heavy dishes
const heavyDishesData = [
  { name: "Chole Bhature", oilMl: 40 },
  { name: "Aloo Paratha", oilMl: 28 },
  { name: "Paneer Butter Masala", oilMl: 26 },
  { name: "Paneer Tikka", oilMl: 25 },
  { name: "Masala Dosa", oilMl: 20 },
];

// AI recommendations
const aiRecommendations = [
  "Try switching to air-frying for 2 dishes.",
  "Reduce oil in Paneer Butter Masala by 10%.",
  "Consider using olive oil spray for Dosa preparation.",
  "Replace deep-frying with shallow pan-frying for Pakoras.",
];

export default function PartnerSelfAuditDashboard() {
  return (
    <PartnerMobileLayout>
      <div className="space-y-4">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold">Self-Audit Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Track your oil usage and optimization progress
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-3 sm:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Oil per Dish
              </CardTitle>
              <Utensils className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">21 ml</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingDown className="h-3 w-3 text-green-600" />
                <span className="text-green-600">-25%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Dishes Reviewed
              </CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground mt-1">
                Out of 24 total dishes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Oil Reduction
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Progress towards 50% goal
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Daily Oil Usage Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Daily Average Oil Usage</CardTitle>
            <p className="text-xs text-muted-foreground">
              Oil consumption trend over the past week
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={dailyOilData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis
                  className="text-xs"
                  label={{ value: "ml", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="avgOil"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Avg Oil (ml)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top 5 Oil-Heavy Dishes Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top 5 Oil-Heavy Dishes</CardTitle>
            <p className="text-xs text-muted-foreground">
              Dishes with highest oil content per serving
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={heavyDishesData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  type="number"
                  className="text-xs"
                  label={{ value: "ml", position: "insideBottom", offset: -5 }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  className="text-xs"
                  width={130}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="oilMl"
                  fill="hsl(var(--primary))"
                  name="Oil (ml)"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-5 w-5" /> Monthly Comparison
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Before vs After Oil Optimization
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Before (Last Month)
                </div>
                <div className="text-2xl font-bold">28 ml</div>
                <Badge variant="secondary">Avg per dish</Badge>
              </div>
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  After (This Month)
                </div>
                <div className="text-2xl font-bold text-green-600">21 ml</div>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">
                  Avg per dish
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-muted/60 p-3">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium">25% Reduction</div>
                  <div className="text-xs text-muted-foreground">
                    7 ml saved per dish
                  </div>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" /> AI
              Recommendations
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Smart suggestions to reduce oil usage
            </p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {aiRecommendations.map((rec, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 border"
                >
                  <div className="mt-0.5 flex-shrink-0 h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                    <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
                      {i + 1}
                    </span>
                  </div>
                  <div className="text-sm">{rec}</div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </PartnerMobileLayout>
  );
}
