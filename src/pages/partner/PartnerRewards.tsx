import PartnerMobileLayout from "@/components/layout/PartnerMobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gift, Star, Award } from "lucide-react";

const rewards = [
  { id: 1, name: "Free Oil Quality Test", points: 500 },
  { id: 2, name: "Staff Training Session", points: 800 },
  { id: 3, name: "Premium Badge on Directory", points: 1200 },
];

export default function PartnerRewards() {
  return (
    <PartnerMobileLayout>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" /> Your Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,420</div>
            <div className="text-sm text-muted-foreground">
              Keep up the great work!
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" /> Available Rewards
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {rewards.map((r) => (
              <div key={r.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <Gift className="h-3.5 w-3.5" /> {r.points} pts
                  </div>
                </div>
                <Button size="sm">Redeem</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary">Partner</Badge>
          <span>
            Earn points by maintaining compliance and completing audits.
          </span>
        </div>
      </div>
    </PartnerMobileLayout>
  );
}
