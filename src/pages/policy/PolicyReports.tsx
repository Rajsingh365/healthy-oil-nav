import { PolicyMobileLayout } from "@/components/layout/PolicyMobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

const PolicyReports = () => {
  const reports = [
    {
      id: 1,
      title: "Monthly Oil Consumption Report",
      date: "October 2025",
      type: "Monthly",
      status: "Ready",
      size: "2.4 MB",
      insights: "15% reduction in average consumption",
    },
    {
      id: 2,
      title: "Quarterly Performance Analysis",
      date: "Q3 2025",
      type: "Quarterly",
      status: "Ready",
      size: "5.1 MB",
      insights: "18% increase in user adoption",
    },
    {
      id: 3,
      title: "State-wise Consumption Trends",
      date: "September 2025",
      type: "Regional",
      status: "Ready",
      size: "3.8 MB",
      insights: "South India shows highest reduction",
    },
    {
      id: 4,
      title: "Health Impact Assessment",
      date: "August 2025",
      type: "Impact",
      status: "Ready",
      size: "4.2 MB",
      insights: "Significant improvement in health metrics",
    },
    {
      id: 5,
      title: "User Behavior Analysis",
      date: "July 2025",
      type: "Behavioral",
      status: "Ready",
      size: "3.1 MB",
      insights: "Peak engagement during meal prep times",
    },
  ];

  const getStatusColor = (status: string) => {
    if (status === "Ready")
      return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
    return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
  };

  return (
    <PolicyMobileLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Reports</h1>
          <p className="text-muted-foreground text-sm">
            Download and review detailed reports
          </p>
        </div>

        {/* Summary Card */}
        <Card className="p-5 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Total Reports
              </p>
              <p className="text-3xl font-bold">{reports.length}</p>
            </div>
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">
            All reports are generated automatically and updated monthly
          </p>
        </Card>

        {/* Reports List */}
        <div className="space-y-3">
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{report.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {report.date}
                      </span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(report.status)}>
                    {report.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline">{report.type}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {report.size}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3 p-2 bg-muted/50 rounded-md">
                  <TrendingDown className="h-4 w-4 text-green-600" />
                  <p className="text-xs text-muted-foreground">
                    {report.insights}
                  </p>
                </div>

                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Generate New Report */}
        <Card className="p-5 border-dashed">
          <div className="text-center">
            <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Generate Custom Report</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create a custom report with specific parameters
            </p>
            <Button>Generate Report</Button>
          </div>
        </Card>
      </div>
    </PolicyMobileLayout>
  );
};

export default PolicyReports;
