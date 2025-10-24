import { PolicyMobileLayout } from "@/components/layout/PolicyMobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Download,
  FileText,
  TrendingDown,
  Heart,
  DollarSign,
  Lightbulb,
  Calendar,
  MapPin,
  Filter,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

type FilterState = {
  startDate: string;
  endDate: string;
  state: string;
  district: string;
  campaignType: string;
};

type ConsumptionData = {
  month: string;
  actual: number;
  predicted: number;
};

type HealthMetric = {
  metric: string;
  baseline: number;
  current: number;
  improvement: number;
};

type EconomicImpact = {
  category: string;
  savings: number;
};

type AIRecommendation = {
  id: number;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
};

const ImpactReports = () => {
  const [filters, setFilters] = useState<FilterState>({
    startDate: "2025-01-01",
    endDate: "2025-10-31",
    state: "all",
    district: "all",
    campaignType: "all",
  });

  const [showFilters, setShowFilters] = useState(false);

  // AI-Predicted Consumption Reduction Data
  const consumptionData: ConsumptionData[] = [
    { month: "Jan", actual: 42, predicted: 45 },
    { month: "Feb", actual: 40, predicted: 43 },
    { month: "Mar", actual: 38, predicted: 41 },
    { month: "Apr", actual: 36, predicted: 39 },
    { month: "May", actual: 35, predicted: 37 },
    { month: "Jun", actual: 33, predicted: 35 },
    { month: "Jul", actual: 32, predicted: 34 },
    { month: "Aug", actual: 30, predicted: 32 },
    { month: "Sep", actual: 29, predicted: 31 },
    { month: "Oct", actual: 28, predicted: 29 },
  ];

  // Health Outcomes Data
  const healthMetrics: HealthMetric[] = [
    { metric: "Average BMI", baseline: 26.8, current: 25.2, improvement: 6.0 },
    {
      metric: "Diabetes Risk (%)",
      baseline: 34.5,
      current: 28.3,
      improvement: 18.0,
    },
    {
      metric: "Cholesterol (mg/dL)",
      baseline: 215,
      current: 195,
      improvement: 9.3,
    },
    {
      metric: "Blood Pressure (mmHg)",
      baseline: 135,
      current: 125,
      improvement: 7.4,
    },
  ];

  // Economic Impact Data
  const economicData: EconomicImpact[] = [
    { category: "Diabetes Treatment", savings: 1250000 },
    { category: "Cardiovascular Care", savings: 980000 },
    { category: "Obesity Management", savings: 720000 },
    { category: "Preventive Care", savings: 450000 },
    { category: "Medication Costs", savings: 580000 },
  ];

  const totalSavings = economicData.reduce(
    (sum, item) => sum + item.savings,
    0
  );

  // Distribution Data for Pie Chart
  const distributionData = [
    { name: "Urban", value: 55, color: "#3b82f6" },
    { name: "Rural", value: 30, color: "#10b981" },
    { name: "Semi-Urban", value: 15, color: "#f59e0b" },
  ];

  // AI-Generated Recommendations
  const aiRecommendations: AIRecommendation[] = [
    {
      id: 1,
      title: "Intensify Rural Outreach Programs",
      description:
        "AI analysis shows 23% lower engagement in rural areas. Focus on vernacular content and community health workers to improve reach by projected 35%.",
      priority: "High",
    },
    {
      id: 2,
      title: "Target 35-50 Age Group",
      description:
        "Data indicates this demographic has highest potential for health improvement (18% reduction in diabetes risk). Customize campaigns for working professionals.",
      priority: "High",
    },
    {
      id: 3,
      title: "Expand School Nutrition Programs",
      description:
        "Youth engagement shows 42% improvement in family consumption habits. Scale up school-based initiatives for multiplier effect across households.",
      priority: "Medium",
    },
  ];

  const handleExport = (format: "pdf" | "csv") => {
    // Dummy export functionality
    const filename = `impact_report_${filters.startDate}_${filters.endDate}.${format}`;
    alert(`Exporting report as ${format.toUpperCase()}: ${filename}`);
    // In real implementation, this would trigger actual file download
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
      case "Low":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const avgReduction =
    ((consumptionData[0].actual -
      consumptionData[consumptionData.length - 1].actual) /
      consumptionData[0].actual) *
    100;

  return (
    <PolicyMobileLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Impact Reports</h1>
            <p className="text-muted-foreground text-sm">
              AI-powered impact analysis and insights
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Filters Section */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter Options
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={filters.startDate}
                    onChange={(e) =>
                      setFilters({ ...filters, startDate: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={filters.endDate}
                    onChange={(e) =>
                      setFilters({ ...filters, endDate: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select
                    value={filters.state}
                    onValueChange={(value) =>
                      setFilters({ ...filters, state: value })
                    }
                  >
                    <SelectTrigger id="state">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All States</SelectItem>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="karnataka">Karnataka</SelectItem>
                      <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                      <SelectItem value="gujarat">Gujarat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Select
                    value={filters.district}
                    onValueChange={(value) =>
                      setFilters({ ...filters, district: value })
                    }
                  >
                    <SelectTrigger id="district">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Districts</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="pune">Pune</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="chennai">Chennai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="campaignType">Campaign Type</Label>
                  <Select
                    value={filters.campaignType}
                    onValueChange={(value) =>
                      setFilters({ ...filters, campaignType: value })
                    }
                  >
                    <SelectTrigger id="campaignType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Campaigns</SelectItem>
                      <SelectItem value="awareness">Awareness</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="community">Community</SelectItem>
                      <SelectItem value="youth">Youth Focused</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setFilters({
                      startDate: "2025-01-01",
                      endDate: "2025-10-31",
                      state: "all",
                      district: "all",
                      campaignType: "all",
                    })
                  }
                >
                  Reset
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Export Options */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Export Report</h3>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport("pdf")}
              >
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport("csv")}
              >
                <Download className="h-4 w-4 mr-2" />
                CSV
              </Button>
            </div>
          </div>
        </Card>

        {/* Key Metrics Summary */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
              <div className="flex flex-col items-center text-center">
                <TrendingDown className="h-6 w-6 mb-2 text-green-600 dark:text-green-400" />
                <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                  {avgReduction.toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground">Consumption ↓</p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800">
              <div className="flex flex-col items-center text-center">
                <Heart className="h-6 w-6 mb-2 text-blue-600 dark:text-blue-400" />
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                  18%
                </p>
                <p className="text-xs text-muted-foreground">Health ↑</p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 border-yellow-200 dark:border-yellow-800">
              <div className="flex flex-col items-center text-center">
                <DollarSign className="h-6 w-6 mb-2 text-yellow-600 dark:text-yellow-400" />
                <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
                  ₹{(totalSavings / 100000).toFixed(1)}L
                </p>
                <p className="text-xs text-muted-foreground">Savings</p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* AI-Predicted Consumption Reduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">
                AI-Predicted Consumption Reduction
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={consumptionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Actual"
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="AI Predicted"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-4 mt-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-green-600"></div>
                <span>Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-blue-600 border-dashed"></div>
                <span>AI Predicted</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Health Outcomes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Health Outcomes</h3>
            </div>
            <div className="space-y-4">
              {healthMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric.metric}</span>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    >
                      ↓ {metric.improvement.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">Baseline</span>
                        <span className="font-medium">{metric.baseline}</span>
                      </div>
                      <div className="h-2 bg-red-200 dark:bg-red-900 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">Current</span>
                        <span className="font-medium text-green-600 dark:text-green-400">
                          {metric.current}
                        </span>
                      </div>
                      <div className="h-2 bg-green-200 dark:bg-green-900 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Economic Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Economic Impact</h3>
            </div>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Total Healthcare Savings
              </p>
              <p className="text-3xl font-bold text-primary">
                ₹{(totalSavings / 100000).toFixed(2)}L
              </p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={economicData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="category" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="savings" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Impact Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Impact Distribution</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name} ${entry.value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {distributionData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h3 className="font-semibold">AI-Generated Recommendations</h3>
              <Badge variant="secondary" className="ml-auto">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Insights
              </Badge>
            </div>
            <div className="space-y-3">
              {aiRecommendations.map((recommendation, index) => (
                <motion.div
                  key={recommendation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <Card className="p-4 bg-white dark:bg-gray-900">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">
                        {recommendation.title}
                      </h4>
                      <Badge
                        className={getPriorityColor(recommendation.priority)}
                      >
                        {recommendation.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {recommendation.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Report Metadata */}
        <Card className="p-4 bg-muted/50">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                Report Period:{" "}
                {new Date(filters.startDate).toLocaleDateString("en-IN")} -{" "}
                {new Date(filters.endDate).toLocaleDateString("en-IN")}
              </span>
            </div>
            <span>Generated: {new Date().toLocaleDateString("en-IN")}</span>
          </div>
        </Card>
      </div>
    </PolicyMobileLayout>
  );
};

export default ImpactReports;
