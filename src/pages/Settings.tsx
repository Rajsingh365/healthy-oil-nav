import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { ChevronRight, Bell, Lock, Globe, Palette, Database } from "lucide-react";
import { Link } from "react-router-dom";

const Settings = () => {
  const settingsGroups = [
    {
      title: "Preferences",
      items: [
        { icon: Bell, label: "Notifications", value: "Enabled" },
        { icon: Globe, label: "Language", value: "English" },
        { icon: Palette, label: "Appearance", value: "Auto" },
      ],
    },
    {
      title: "Account",
      items: [
        { icon: Lock, label: "Privacy & Security", value: "" },
        { icon: Database, label: "Data Management", value: "" },
      ],
    },
  ];

  return (
    <MobileLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            ←
          </Link>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        {settingsGroups.map((group, idx) => (
          <div key={idx} className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase">
              {group.title}
            </h2>
            <Card>
              {group.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className={`p-4 flex items-center justify-between cursor-pointer hover:bg-accent transition-colors ${
                    itemIdx < group.items.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-full">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.value && (
                      <span className="text-sm text-muted-foreground">{item.value}</span>
                    )}
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </Card>
          </div>
        ))}

        <Card className="p-4">
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Version</span>
              <span>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span>Build</span>
              <span>2025.01.15</span>
            </div>
          </div>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default Settings;
