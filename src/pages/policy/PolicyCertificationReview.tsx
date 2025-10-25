import { PolicyMobileLayout } from "@/components/layout/PolicyMobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  CheckCircle2,
  XCircle,
  FileText,
  Image as ImageIcon,
  Droplets,
} from "lucide-react";
import { useState } from "react";

type PendingApp = {
  id: number;
  outlet: string;
  applicationDate: string;
  nextAudit: string;
  oilUsage: number;
  oilType: string;
  photoNames: string[];
  acceptStandards: boolean;
};

const initialPending: PendingApp[] = [
  // {
  //   id: 101,
  //   outlet: "Hotel Shanti Vihar",
  //   applicationDate: "2025-10-15",
  //   nextAudit: "2025-12-01",
  //   oilUsage: 35,
  //   oilType: "mustard",
  //   photoNames: ["kitchen-1.jpg", "oil-storage.png"],
  //   acceptStandards: true,
  // },
  // {
  //   id: 102,
  //   outlet: "Green Bite Diner",
  //   applicationDate: "2025-10-18",
  //   nextAudit: "2025-12-05",
  //   oilUsage: 28,
  //   oilType: "sunflower",
  //   photoNames: [],
  //   acceptStandards: true,
  // },
  // {
  //   id: 103,
  //   outlet: "Healthy Spoon Cafe",
  //   applicationDate: "2025-10-20",
  //   nextAudit: "2025-12-10",
  //   oilUsage: 50,
  //   oilType: "groundnut",
  //   photoNames: ["prep-area.jpg"],
  //   acceptStandards: false,
  // },
   {
    id: 104,
    outlet: "Samudra Hotel",
    applicationDate: "2025-10-20",
    nextAudit: "2025-12-10",
    oilUsage: 20,
    oilType: "olive",
    photoNames: ["prep-area.jpg"],
    acceptStandards: false,
  },
];

export default function PolicyCertificationReview() {
  const [pending, setPending] = useState<PendingApp[]>(initialPending);
  const { toast } = useToast();

  const onApprove = (id: number, outlet: string) => {
    setPending((prev) => prev.filter((p) => p.id !== id));
    toast({
      title: "Application approved",
      description: `${outlet} has been certified.`,
    });
  };

  const onReject = (id: number, outlet: string) => {
    setPending((prev) => prev.filter((p) => p.id !== id));
    toast({
      title: "Application rejected",
      description: `${outlet}'s application was rejected.`,
    });
  };

  return (
    <PolicyMobileLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold">Certification Applications</h1>
          <p className="text-sm text-muted-foreground">
            Review partner submissions and approve or reject.
          </p>
        </div>

        {pending.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No pending applications.
            </CardContent>
          </Card>
        ) : (
          pending.map((app) => (
            <Card key={app.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-base">{app.outlet}</CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Applied on: {app.applicationDate}
                    </p>
                  </div>
                  <Badge variant="secondary">Pending Review</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-muted-foreground">Next Audit</div>
                    <div>{app.nextAudit}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-muted-foreground">
                        Avg. Oil Usage
                      </div>
                      <div>{app.oilUsage} ml</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Oil Type</div>
                    <div className="capitalize">{app.oilType || "—"}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-muted-foreground">
                        Uploaded Images
                      </div>
                      <div>{app.photoNames.length} file(s)</div>
                    </div>
                  </div>
                </div>

                {app.photoNames.length > 0 && (
                  <div>
                    <div className="text-muted-foreground mb-1">Files</div>
                    <ul className="list-disc pl-5 text-xs space-y-0.5">
                      {app.photoNames.map((n, i) => (
                        <li key={i} className="break-all">
                          {n}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between p-3 rounded-md bg-muted/40">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Low-oil standards accepted</span>
                  </div>
                  <Badge
                    variant={app.acceptStandards ? "default" : "secondary"}
                  >
                    {app.acceptStandards ? "Yes" : "No"}
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    size="sm"
                    onClick={() => onApprove(app.id, app.outlet)}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" /> Approve
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    size="sm"
                    onClick={() => onReject(app.id, app.outlet)}
                  >
                    <XCircle className="h-4 w-4 mr-2" /> Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </PolicyMobileLayout>
  );
}
