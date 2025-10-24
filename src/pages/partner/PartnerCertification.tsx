import PartnerMobileLayout from "@/components/layout/PartnerMobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  BadgeCheck,
  Upload,
  FileText,
  ShieldCheck,
  Fingerprint,
  FileDown,
  Image as ImageIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function PartnerCertification() {
  const [brand, setBrand] = useState("");
  const [oilPerDish, setOilPerDish] = useState<number[]>([20]);
  const [useDomestic, setUseDomestic] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [status, setStatus] = useState<"Pending" | "Approved" | "Rejected">(
    "Pending"
  );
  const { toast } = useToast();

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    setPhotos(selected);
  };

  const previews = useMemo(
    () =>
      photos
        .filter((f) => f.type.startsWith("image/"))
        .slice(0, 6)
        .map((f) => ({ name: f.name, url: URL.createObjectURL(f) })),
    [photos]
  );

  const onSubmit = () => {
    // Basic validation (demo)
    if (!brand.trim()) {
      toast({
        title: "Brand name required",
        description: "Please enter your restaurant/brand name.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Application submitted",
      description: `${photos.length} photo(s), avg oil ${
        oilPerDish[0]
      } ml/dish, domestic oils: ${useDomestic ? "Yes" : "No"}.`,
    });
    setStatus("Pending");
  };

  const downloadCertificate = () => {
    const content = `Low-Oil Certificate\n\nBrand: ${
      brand || "Demo Brand"
    }\nStatus: ${status}\nCertificate ID: 0x94f1…b7a3\nVerified on-chain: VALID`;
    const blob = new Blob([content], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "low-oil-certificate.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PartnerMobileLayout>
      <div className="space-y-4">
        {/* Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" /> Low-Oil Certification
              </span>
              <Badge
                variant={
                  status === "Approved"
                    ? "default"
                    : status === "Rejected"
                    ? "destructive"
                    : "secondary"
                }
              >
                {status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="mb-1 text-sm text-muted-foreground">
                Application Progress
              </div>
              <Progress
                value={
                  status === "Approved" ? 100 : status === "Rejected" ? 100 : 60
                }
              />
            </div>
            <div className="text-xs text-muted-foreground">
              Tip: For demo, submitting the form keeps status as Pending.
            </div>
          </CardContent>
        </Card>

        {/* Application Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BadgeCheck className="h-5 w-5" /> Apply for Certification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="brand">Restaurant/Brand name</Label>
              <Input
                id="brand"
                placeholder="e.g., Healthy Spoon Cafe"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Average oil usage per dish (ml)</Label>
              <div className="flex items-center gap-3">
                <Slider
                  value={oilPerDish}
                  onValueChange={setOilPerDish}
                  min={0}
                  max={100}
                  step={5}
                  className="flex-1"
                />
                <div className="w-14 text-right text-sm tabular-nums">
                  {oilPerDish[0]} ml
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="photos">Photos of kitchen practices</Label>
              <Input
                id="photos"
                type="file"
                accept="image/*"
                multiple
                onChange={onUpload}
              />
              {photos.length > 0 ? (
                <div className="mt-1 grid grid-cols-4 gap-2">
                  {previews.map((p) => (
                    <div
                      key={p.name}
                      className="aspect-square overflow-hidden rounded-md border"
                    >
                      <img
                        src={p.url}
                        alt={p.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ImageIcon className="h-4 w-4" /> No photos selected
                </div>
              )}
            </div>

            <label className="flex items-center gap-3 text-sm">
              <Checkbox
                checked={useDomestic}
                onCheckedChange={(v) => setUseDomestic(Boolean(v))}
              />
              <span>I use domestic oils (e.g., mustard, groundnut)</span>
            </label>

            <Button onClick={onSubmit} className="w-full">
              <Upload className="h-4 w-4 mr-2" /> Submit Application
            </Button>
          </CardContent>
        </Card>

        {/* Blockchain Verification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fingerprint className="h-5 w-5" /> Blockchain Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="text-xs text-muted-foreground">
                Certificate ID
              </div>
              <div className="font-mono text-sm p-2 rounded-md bg-muted/60 border">
                0x94f1d8a2c3e74b5a9f12cd88a01b7a3
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="h-4 w-4 text-green-600" /> Verification
              Status: <span className="font-medium">Valid</span>
            </div>
            <div className="flex gap-2">
              <Button onClick={downloadCertificate} className="flex-1">
                <FileDown className="h-4 w-4 mr-2" /> Download Certificate
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" /> Status Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>• Application created</div>
            <div>• Photos uploaded</div>
            <div className="text-muted-foreground">• Under initial review</div>
          </CardContent>
        </Card>
      </div>
    </PartnerMobileLayout>
  );
}
