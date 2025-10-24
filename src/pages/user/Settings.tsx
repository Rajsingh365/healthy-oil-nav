import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, Globe, Palette, Info, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { useState } from "react";
import {
  useLanguage,
  LANGUAGE_NAMES,
  type Language,
} from "@/contexts/LanguageContext";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);

  return (
    <MobileLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        {/* Preferences */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase">
            Preferences
          </h2>
          <Card>
            {/* Notifications Toggle */}
            <div className="p-4 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-full">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-xs text-muted-foreground">
                    Receive reminders and tips
                  </p>
                </div>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
            {/* Daily Reminders */}
            <div className="p-4 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-full">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Daily Reminders</p>
                  <p className="text-xs text-muted-foreground">
                    Get notified to log usage
                  </p>
                </div>
              </div>
              <Switch
                checked={notificationsEnabled && dailyReminders}
                onCheckedChange={setDailyReminders}
              />
            </div>

            {/* Weekly Reports */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-full">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Weekly Reports</p>
                  <p className="text-xs text-muted-foreground">
                    Receive progress summary
                  </p>
                </div>
              </div>
              <Switch
                checked={notificationsEnabled && weeklyReports}
                onCheckedChange={setWeeklyReports}
              />
            </div>

            {/* Theme Toggle */}
            <div className="p-4 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-full">
                  <Palette className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">App Theme</p>
                  <p className="text-xs text-muted-foreground">
                    Light or Dark mode
                  </p>
                </div>
              </div>
              <Select
                value={theme as string}
                onValueChange={(v) => setTheme(v)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Language */}
            <div className="p-4 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-full">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Language</p>
                  <p className="text-xs text-muted-foreground">
                    Choose your language
                  </p>
                </div>
              </div>
              <Select
                value={language}
                onValueChange={(v) => setLanguage(v as Language)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(LANGUAGE_NAMES).map(([code, name]) => (
                    <SelectItem key={code} value={code}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>
        </div>
        {/* About */}
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-muted rounded-full">
              <Info className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">EatWise</p>
              <p className="text-xs text-muted-foreground">Version 1.0.0</p>
              <p className="text-sm text-muted-foreground">
                Our mission is to help Indian households reduce excessive oil
                consumption with simple, friendly guidance and actionable tips.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default Settings;
