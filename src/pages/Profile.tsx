import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin, Edit } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Profile = () => {
  return (
    <MobileLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Profile</h1>
          <Button variant="ghost" size="icon">
            <Edit className="h-5 w-5" />
          </Button>
        </div>

        {/* Profile Header */}
        <Card className="p-6">
          <div className="flex flex-col items-center text-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">A</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">Asha Sharma</h2>
              <p className="text-sm text-muted-foreground">Member since Jan 2025</p>
            </div>
          </div>
        </Card>

        {/* Personal Info */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Personal Information</h2>
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-full">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium">asha.sharma@email.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-full">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-full">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-medium">Mumbai, Maharashtra</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Stats */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Your Stats</h2>
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">45</p>
              <p className="text-xs text-muted-foreground mt-1">Days Active</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-secondary">1,250</p>
              <p className="text-xs text-muted-foreground mt-1">Points</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-success">18%</p>
              <p className="text-xs text-muted-foreground mt-1">Reduced</p>
            </Card>
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Preferences</h2>
          <Card className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Daily Reminders</p>
                  <p className="text-xs text-muted-foreground">Get notified to log usage</p>
                </div>
                <div className="w-10 h-6 bg-primary rounded-full"></div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Weekly Reports</p>
                  <p className="text-xs text-muted-foreground">Receive progress summary</p>
                </div>
                <div className="w-10 h-6 bg-primary rounded-full"></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Profile;
