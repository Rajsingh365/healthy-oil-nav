import PartnerMobileLayout from "@/components/layout/PartnerMobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BadgeCheck,
  Upload,
  FileDown,
  Image as ImageIcon,
  Plus,
  CheckCircle,
  Clock,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface ApprovedCert {
  id: number;
  outlet: string;
  city: string;
  approvedOn: string;
  certificateId: string;
}

interface PendingApp {
  id: number;
  outlet: string;
  applicationDate: string;
  nextAudit: string;
}

const initialApproved: ApprovedCert[] = [
  {
    id: 1,
    outlet: "Hotel Shanti Vihar",
    city: "Jaipur",
    approvedOn: "2025-11-12",
    certificateId: "0x93f2a7b45bc",
  },
  {
    id: 2,
    outlet: "Green Bite Diner",
    city: "Kota",
    approvedOn: "2026-01-15",
    certificateId: "0xa7d34f0b91c",
  },
];

const initialPending: PendingApp[] = [
  {
    id: 1,
    outlet: "Healthy Spoon Cafe",
    applicationDate: "2025-10-15",
    nextAudit: "2025-12-03",
  },
];

export default function PartnerCertification() {
  const [approved, setApproved] = useState<ApprovedCert[]>(initialApproved);
  const [pending, setPending] = useState<PendingApp[]>(initialPending);
  const [modalOpen, setModalOpen] = useState(false);
  const [devMode, setDevMode] = useState(false);

  // Form state
  const [outletName, setOutletName] = useState("");
  const [oilUsage, setOilUsage] = useState<number[]>([20]);
  const [oilType, setOilType] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [acceptStandards, setAcceptStandards] = useState(false);

  const { toast } = useToast();

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    setPhotos(selected);
  };

  const handleSubmitApplication = () => {
    if (!outletName.trim()) {
      toast({
        title: "Outlet name required",
        description: "Please enter your outlet name.",
        variant: "destructive",
      });
      return;
    }

    const newApp: PendingApp = {
      id: Date.now(),
      outlet: outletName,
      applicationDate: new Date().toISOString().split("T")[0],
      nextAudit: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    };

    setPending([...pending, newApp]);
    toast({
      title: "Certification application submitted successfully!",
      description: `Application for ${outletName} has been submitted.`,
    });

    // Reset form
    setOutletName("");
    setOilUsage([20]);
    setOilType("");
    setPhotos([]);
    setAcceptStandards(false);
    setModalOpen(false);
  };

  const simulateApprove = (pendingId: number) => {
    const app = pending.find((p) => p.id === pendingId);
    if (!app) return;

    const certId = "0x" + Math.random().toString(16).substring(2, 10);
    const newApproved: ApprovedCert = {
      id: Date.now(),
      outlet: app.outlet,
      city: "City", // Default city
      approvedOn: new Date().toISOString().split("T")[0],
      certificateId: certId,
    };

    setApproved([...approved, newApproved]);
    setPending(pending.filter((p) => p.id !== pendingId));

    toast({
      title: "Application Approved!",
      description: `${app.outlet} has been certified.`,
    });
  };

  const downloadCertificate = (cert: ApprovedCert) => {
    const content = `Low-Oil Certification Certificate\n\nOutlet: ${cert.outlet}\nLocation: ${cert.city}\nApproved On: ${cert.approvedOn}\nCertificate ID: ${cert.certificateId}\n\nThis certificate is valid and verified on blockchain.`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${cert.outlet}-certificate.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PartnerMobileLayout>
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">
            Low-Oil Certification Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Track your certification applications and view approved
            certificates.
          </p>
        </div>

        {/* Apply Button & Dev Toggle */}
        <div className="flex items-center gap-2">
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
              <Button className="flex-1">
                <Plus className="h-4 w-4 mr-2" /> Apply for New Certification
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Apply for New Certification</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="outlet">Outlet Name</Label>
                  <Input
                    id="outlet"
                    placeholder="e.g., Hotel Shanti Vihar"
                    value={outletName}
                    onChange={(e) => setOutletName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Average Daily Oil Usage (ml)</Label>
                  <div className="flex items-center gap-3">
                    <Slider
                      value={oilUsage}
                      onValueChange={setOilUsage}
                      min={0}
                      max={100}
                      step={5}
                      className="flex-1"
                    />
                    <div className="w-14 text-right text-sm tabular-nums">
                      {oilUsage[0]} ml
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="oilType">Oil Type Used</Label>
                  <Select value={oilType} onValueChange={setOilType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select oil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mustard">Mustard Oil</SelectItem>
                      <SelectItem value="groundnut">Groundnut Oil</SelectItem>
                      <SelectItem value="olive">Olive Oil</SelectItem>
                      <SelectItem value="sunflower">Sunflower Oil</SelectItem>
                      <SelectItem value="coconut">Coconut Oil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kitchenImages">Upload Kitchen Images</Label>
                  <Input
                    id="kitchenImages"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={onUpload}
                  />
                  {photos.length > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {photos.length} file(s) selected
                    </p>
                  )}
                </div>

                <label className="flex items-center gap-3 text-sm">
                  <Checkbox
                    checked={acceptStandards}
                    onCheckedChange={(v) => setAcceptStandards(Boolean(v))}
                  />
                  <span>We follow low-oil cooking standards.</span>
                </label>

                <Button onClick={handleSubmitApplication} className="w-full">
                  Submit Application
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setDevMode(!devMode)}
            title="Developer Mode"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        {/* Tabs: Approved / Pending */}
        <Tabs defaultValue="approved" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger
              value="approved"
              className="text-xs sm:text-sm px-2 py-2 whitespace-normal leading-tight"
            >
              Approved ({approved.length})
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="text-xs sm:text-sm px-2 py-2 whitespace-normal leading-tight"
            >
              Pending ({pending.length})
            </TabsTrigger>
          </TabsList>

          {/* Approved Certifications */}
          <TabsContent value="approved" className="space-y-3">
            {approved.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No approved certifications yet.
                </CardContent>
              </Card>
            ) : (
              approved.map((cert) => (
                <Card key={cert.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-base">
                          {cert.outlet}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {cert.city}
                        </p>
                      </div>
                      <Badge variant="default" className="shrink-0">
                        <CheckCircle className="h-3 w-3 mr-1" /> Approved
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm">
                      <div className="text-muted-foreground">
                        Certificate ID
                      </div>
                      <div className="font-mono text-xs">
                        {cert.certificateId}
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="text-muted-foreground">Approval Date</div>
                      <div>{cert.approvedOn}</div>
                    </div>
                    <Button
                      onClick={() => downloadCertificate(cert)}
                      className="w-full"
                      size="sm"
                    >
                      <FileDown className="h-4 w-4 mr-2" /> Download Certificate
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Pending Applications */}
          <TabsContent value="pending" className="space-y-3">
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
                        <CardTitle className="text-base">
                          {app.outlet}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                          Applied on: {app.applicationDate}
                        </p>
                      </div>
                      <Badge variant="secondary" className="shrink-0">
                        <Clock className="h-3 w-3 mr-1" /> Pending Review
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm">
                      <div className="text-muted-foreground">
                        Next Audit Date
                      </div>
                      <div>{app.nextAudit}</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-muted-foreground">
                        Certificate ID
                      </div>
                      <div className="text-muted-foreground">—</div>
                    </div>
                    <div className="flex gap-2">
                      <Button disabled className="flex-1" size="sm">
                        <FileDown className="h-4 w-4 mr-2" /> Download
                      </Button>
                      {devMode && (
                        <Button
                          onClick={() => simulateApprove(app.id)}
                          variant="outline"
                          size="sm"
                        >
                          ✅ Approve
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PartnerMobileLayout>
  );
}
