import PartnerMobileLayout from "@/components/layout/PartnerMobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, CheckCircle2, Timer, TrendingUp } from "lucide-react";

const stores = [
  {
    name: "Hotel Shanti Vihar",
    city: "Jaipur",
    status: "Compliant",
    nextAudit: "2025-11-12",
  },
  {
    name: "Healthy Spoon Cafe",
    city: "Udaipur",
    status: "Pending Review",
    nextAudit: "2025-12-03",
  },
  {
    name: "Green Bite Diner",
    city: "Kota",
    status: "Compliant",
    nextAudit: "2026-01-15",
  },
];

export default function PartnerOverview() {
  return (
    <PartnerMobileLayout>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardHeader className="p-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Building2 className="h-4 w-4" /> Total Outlets
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-2xl font-semibold">
              {stores.length}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Compliant
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-2xl font-semibold">2</CardContent>
          </Card>
          <Card>
            <CardHeader className="p-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Timer className="h-4 w-4" /> Pending
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-2xl font-semibold">1</CardContent>
          </Card>
          <Card>
            <CardHeader className="p-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-2xl font-semibold">
              66.67%
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Outlets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {stores.map((s) => (
              <div
                key={s.name}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{s.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {s.city} • Next audit: {s.nextAudit}
                  </div>
                </div>
                <Badge
                  variant={s.status === "Compliant" ? "default" : "secondary"}
                  className="shrink-0"
                >
                  {s.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Button asChild>
            <a href="/partner-certification">Apply Certification</a>
          </Button>
          <Button variant="secondary" asChild>
            <a href="/partner-self-audit">Start Self-Audit</a>
          </Button>
        </div>
      </div>
    </PartnerMobileLayout>
  );
}
