import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Lightbulb, Droplet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const oilTypes = [
  "Mustard Oil",
  "Sunflower Oil",
  "Olive Oil",
  "Coconut Oil",
  "Groundnut Oil",
  "Rice Bran Oil",
];

const healthTips = [
  "Try grilling instead of deep frying 🔥",
  "Reduce oil by 10% for better heart health ❤️",
  "Use an oil spray bottle for even coating 💧",
  "Steam vegetables instead of sautéing them 🥦",
  "Air fryers can reduce oil usage by 80% ✨",
  "Measure oil with a spoon, not by pouring 📏",
];

const Tracker = () => {
  const { toast } = useToast();
  const [entries, setEntries] = useState([
    { id: 1, user: "Asha", oilType: "Mustard Oil", amount: 50, date: "2025-10-23", time: "7:30 AM" },
    { id: 2, user: "Rohan", oilType: "Sunflower Oil", amount: 75, date: "2025-10-22", time: "8:15 PM" },
    { id: 3, user: "Meena", oilType: "Olive Oil", amount: 40, date: "2025-10-22", time: "1:20 PM" },
  ]);

  const [formData, setFormData] = useState({
    oilType: "",
    quantity: "",
    date: new Date().toISOString().split('T')[0],
  });

  const weekData = [
    { day: "Mon", amount: 30 },
    { day: "Tue", amount: 20 },
    { day: "Wed", amount: 40 },
    { day: "Thu", amount: 25 },
    { day: "Fri", amount: 50 },
    { day: "Sat", amount: 35 },
    { day: "Sun", amount: 45 },
  ];

  const randomTip = healthTips[Math.floor(Math.random() * healthTips.length)];

  const handleSaveEntry = () => {
    if (!formData.oilType || !formData.quantity) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before saving.",
        variant: "destructive",
      });
      return;
    }

    const newEntry = {
      id: entries.length + 1,
      user: "Asha",
      oilType: formData.oilType,
      amount: parseInt(formData.quantity),
      date: formData.date,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };

    setEntries([newEntry, ...entries]);
    setFormData({
      oilType: "",
      quantity: "",
      date: new Date().toISOString().split('T')[0],
    });

    toast({
      title: "Entry Saved! ✓",
      description: `${formData.quantity}ml of ${formData.oilType} logged successfully.`,
    });
  };

  return (
    <MobileLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Oil Usage Tracker</h1>
          <p className="text-sm text-muted-foreground">Track and manage your daily oil consumption</p>
        </div>

        {/* AI Tip Card */}
        <Card className="bg-gradient-to-br from-secondary/20 to-secondary/5 border-secondary/30">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-secondary" />
              <CardTitle className="text-lg">AI Health Tip</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-foreground font-medium">{randomTip}</p>
          </CardContent>
        </Card>

        {/* Oil Usage Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplet className="h-5 w-5 text-primary" />
              Log Oil Usage
            </CardTitle>
            <CardDescription>Record your oil consumption</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="oilType">Oil Type</Label>
              <Select value={formData.oilType} onValueChange={(value) => setFormData({ ...formData, oilType: value })}>
                <SelectTrigger id="oilType">
                  <SelectValue placeholder="Select oil type" />
                </SelectTrigger>
                <SelectContent>
                  {oilTypes.map((oil) => (
                    <SelectItem key={oil} value={oil}>
                      {oil}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity (ml)</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                min="1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <Button onClick={handleSaveEntry} className="w-full">
              Save Entry
            </Button>
          </CardContent>
        </Card>

        {/* Oil Usage Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Usage Chart</CardTitle>
            <CardDescription>Your oil consumption over the past 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weekData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))"
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Usage History */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Usage History</h2>
          <div className="space-y-3">
            {entries.map((entry) => (
              <Card key={entry.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{entry.user} - {entry.oilType}</p>
                      <p className="text-xs text-muted-foreground">{entry.date} at {entry.time}</p>
                    </div>
                    <p className="font-semibold text-primary text-lg">{entry.amount}ml</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Tracker;
