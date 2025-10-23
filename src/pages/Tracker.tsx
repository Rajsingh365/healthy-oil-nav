import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar } from "lucide-react";

const Tracker = () => {
  const weekData = [
    { day: "Mon", amount: 350 },
    { day: "Tue", amount: 420 },
    { day: "Wed", amount: 380 },
    { day: "Thu", amount: 290 },
    { day: "Fri", amount: 460 },
    { day: "Sat", amount: 310 },
    { day: "Sun", amount: 340 },
  ];

  const maxAmount = Math.max(...weekData.map(d => d.amount));

  return (
    <MobileLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Oil Usage Tracker</h1>
          <Button size="icon" className="rounded-full">
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold">This Week</h2>
            <Button variant="ghost" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="flex items-end justify-between gap-2 h-40">
            {weekData.map((data) => (
              <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-primary/20 rounded-t-lg hover:bg-primary/30 transition-colors relative"
                  style={{ height: `${(data.amount / maxAmount) * 100}%` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium">
                    {data.amount}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-medium">{data.day}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Usage History</h2>
          <div className="space-y-3">
            {[
              { user: "Asha", amount: "50ml", time: "Today, 7:30 AM", type: "Cooking" },
              { user: "Rohan", amount: "75ml", time: "Yesterday, 8:15 PM", type: "Frying" },
              { user: "Meena", amount: "40ml", time: "Yesterday, 1:20 PM", type: "Cooking" },
              { user: "Asha", amount: "60ml", time: "2 days ago, 7:00 AM", type: "Cooking" },
            ].map((entry, idx) => (
              <Card key={idx} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{entry.user} - {entry.type}</p>
                    <p className="text-xs text-muted-foreground">{entry.time}</p>
                  </div>
                  <p className="font-semibold text-primary">{entry.amount}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Tracker;
