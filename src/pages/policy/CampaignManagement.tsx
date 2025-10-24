import { PolicyMobileLayout } from "@/components/layout/PolicyMobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
} from "recharts";
import {
  Plus,
  Edit,
  TrendingUp,
  Calendar,
  Users,
  Target,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

type CampaignStatus = "Active" | "Completed" | "Scheduled" | "Paused";

type Campaign = {
  id: number;
  name: string;
  targetAudience: string;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
  reach: number;
  description: string;
};

type CampaignFormData = {
  name: string;
  targetAudience: string;
  startDate: string;
  endDate: string;
  description: string;
};

type AnalyticsData = {
  week: string;
  engagement: number;
  reach: number;
};

const CampaignManagement = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: 1,
      name: "Swasth Bharat Oil Initiative",
      targetAudience: "Urban Families (25-45 years)",
      startDate: "2025-09-01",
      endDate: "2025-11-30",
      status: "Active",
      reach: 78,
      description: "Promoting healthy oil consumption habits in urban areas",
    },
    {
      id: 2,
      name: "Gramin Tel Jagrukta Abhiyan",
      targetAudience: "Rural Communities",
      startDate: "2025-08-15",
      endDate: "2025-10-15",
      status: "Completed",
      reach: 92,
      description: "Rural awareness campaign for oil reduction",
    },
    {
      id: 3,
      name: "Youth Health Revolution",
      targetAudience: "Students & Young Adults (18-30)",
      startDate: "2025-10-20",
      endDate: "2025-12-20",
      status: "Active",
      reach: 45,
      description: "Engaging youth in healthy cooking practices",
    },
    {
      id: 4,
      name: "Mahila Swasthya Sankalp",
      targetAudience: "Women & Homemakers",
      startDate: "2025-11-01",
      endDate: "2026-01-31",
      status: "Scheduled",
      reach: 0,
      description: "Empowering women with healthy cooking knowledge",
    },
    {
      id: 5,
      name: "Corporate Wellness Drive",
      targetAudience: "Working Professionals",
      startDate: "2025-07-01",
      endDate: "2025-09-30",
      status: "Completed",
      reach: 88,
      description: "Workplace health and nutrition program",
    },
  ]);

  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );
  const [formData, setFormData] = useState<CampaignFormData>({
    name: "",
    targetAudience: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const analyticsData: AnalyticsData[] = [
    { week: "Week 1", engagement: 1200, reach: 5000 },
    { week: "Week 2", engagement: 2400, reach: 8500 },
    { week: "Week 3", engagement: 3100, reach: 12000 },
    { week: "Week 4", engagement: 4200, reach: 15500 },
    { week: "Week 5", engagement: 5800, reach: 19200 },
    { week: "Week 6", engagement: 7200, reach: 23000 },
  ];

  const getStatusColor = (status: CampaignStatus): string => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "Completed":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      case "Scheduled":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
      case "Paused":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getReachColor = (reach: number): string => {
    if (reach >= 75) return "text-green-600 dark:text-green-400";
    if (reach >= 50) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getCampaignCardColor = (reach: number): string => {
    if (reach >= 75)
      return "from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800";
    if (reach >= 50)
      return "from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 border-yellow-200 dark:border-yellow-800";
    return "from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950 border-red-200 dark:border-red-800";
  };

  const handleLaunchCampaign = () => {
    const newCampaign: Campaign = {
      id: campaigns.length + 1,
      name: formData.name,
      targetAudience: formData.targetAudience,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: "Scheduled",
      reach: 0,
      description: formData.description,
    };
    setCampaigns([...campaigns, newCampaign]);
    setIsLaunchModalOpen(false);
    resetForm();
  };

  const handleEditCampaign = () => {
    if (selectedCampaign) {
      setCampaigns(
        campaigns.map((c) =>
          c.id === selectedCampaign.id
            ? {
                ...c,
                name: formData.name,
                targetAudience: formData.targetAudience,
                startDate: formData.startDate,
                endDate: formData.endDate,
                description: formData.description,
              }
            : c
        )
      );
      setIsEditModalOpen(false);
      setSelectedCampaign(null);
      resetForm();
    }
  };

  const openEditModal = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setFormData({
      name: campaign.name,
      targetAudience: campaign.targetAudience,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      description: campaign.description,
    });
    setIsEditModalOpen(true);
  };

  const openAnalyticsModal = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsAnalyticsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      targetAudience: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  const activeCampaigns = campaigns.filter((c) => c.status === "Active").length;
  const completedCampaigns = campaigns.filter(
    (c) => c.status === "Completed"
  ).length;
  const avgReach =
    campaigns.reduce((sum, c) => sum + c.reach, 0) / campaigns.length;

  return (
    <PolicyMobileLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Campaign Management</h1>
            <p className="text-muted-foreground text-sm">
              Launch and track health campaigns
            </p>
          </div>
          <Button onClick={() => setIsLaunchModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Launch
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card
              className={`p-4 bg-gradient-to-br ${getCampaignCardColor(
                avgReach
              )}`}
            >
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="h-6 w-6 mb-2 text-green-600 dark:text-green-400" />
                <p className="text-2xl font-bold">{activeCampaigns}</p>
                <p className="text-xs text-muted-foreground">Active</p>
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
                <Target className="h-6 w-6 mb-2 text-blue-600 dark:text-blue-400" />
                <p className="text-2xl font-bold">{completedCampaigns}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card
              className={`p-4 bg-gradient-to-br ${getCampaignCardColor(
                avgReach
              )}`}
            >
              <div className="flex flex-col items-center text-center">
                <TrendingUp className="h-6 w-6 mb-2 text-primary" />
                <p className="text-2xl font-bold">{avgReach.toFixed(0)}%</p>
                <p className="text-xs text-muted-foreground">Avg Reach</p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Campaigns Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Campaign Name</TableHead>
                  <TableHead>Target Audience</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reach</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign, index) => (
                  <motion.tr
                    key={campaign.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b"
                  >
                    <TableCell className="font-medium">
                      {campaign.name}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {campaign.targetAudience}
                    </TableCell>
                    <TableCell className="text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {new Date(campaign.startDate).toLocaleDateString(
                          "en-IN"
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {new Date(campaign.endDate).toLocaleDateString("en-IN")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-semibold ${getReachColor(
                          campaign.reach
                        )}`}
                      >
                        {campaign.reach}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditModal(campaign)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openAnalyticsModal(campaign)}
                        >
                          <TrendingUp className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Launch Campaign Modal */}
        <Dialog open={isLaunchModalOpen} onOpenChange={setIsLaunchModalOpen}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Launch New Campaign
              </DialogTitle>
              <DialogDescription>
                Create a new health awareness campaign
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Swasth Bharat Initiative"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target">Target Audience</Label>
                <Input
                  id="target"
                  placeholder="e.g., Urban Families (25-45 years)"
                  value={formData.targetAudience}
                  onChange={(e) =>
                    setFormData({ ...formData, targetAudience: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Campaign objectives and key messages..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsLaunchModalOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleLaunchCampaign}>Launch Campaign</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Campaign Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5 text-primary" />
                Edit Campaign
              </DialogTitle>
              <DialogDescription>
                Update campaign details and settings
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Campaign Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-target">Target Audience</Label>
                <Input
                  id="edit-target"
                  value={formData.targetAudience}
                  onChange={(e) =>
                    setFormData({ ...formData, targetAudience: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="edit-startDate">Start Date</Label>
                  <Input
                    id="edit-startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-endDate">End Date</Label>
                  <Input
                    id="edit-endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedCampaign(null);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleEditCampaign}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Analytics Modal */}
        <Dialog
          open={isAnalyticsModalOpen}
          onOpenChange={setIsAnalyticsModalOpen}
        >
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Campaign Analytics
              </DialogTitle>
              <DialogDescription>{selectedCampaign?.name}</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Campaign Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Target Audience</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {selectedCampaign?.targetAudience}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Current Reach</span>
                  </div>
                  <span
                    className={`text-sm font-bold ${getReachColor(
                      selectedCampaign?.reach || 0
                    )}`}
                  >
                    {selectedCampaign?.reach}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Status</span>
                  </div>
                  <Badge
                    className={getStatusColor(
                      selectedCampaign?.status || "Scheduled"
                    )}
                  >
                    {selectedCampaign?.status}
                  </Badge>
                </div>
              </div>

              {/* Engagement Chart */}
              <div>
                <h4 className="font-semibold mb-3">Weekly Engagement</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="engagement" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Reach Chart */}
              <div>
                <h4 className="font-semibold mb-3">Reach Growth</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="reach"
                      stroke="#10b981"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Performance Indicators */}
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
                  <p className="text-xs text-muted-foreground mb-1">
                    Total Engagement
                  </p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                    23.9K
                  </p>
                </Card>
                <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
                  <p className="text-xs text-muted-foreground mb-1">
                    Conversion Rate
                  </p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                    12.5%
                  </p>
                </Card>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAnalyticsModalOpen(false);
                  setSelectedCampaign(null);
                }}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PolicyMobileLayout>
  );
};

export default CampaignManagement;
