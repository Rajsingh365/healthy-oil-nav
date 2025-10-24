import PartnerMobileLayout from "@/components/layout/PartnerMobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const checklist = [
  "Uses oils with low trans-fat",
  "Maintains fryer oil change schedule",
  "Proper storage of cooking oil",
  "Labels and tracking in place",
  "Staff trained on healthy oil policy",
];

export default function PartnerSelfAudit() {
  const [checked, setChecked] = useState<boolean[]>(
    Array(checklist.length).fill(false)
  );
  const { toast } = useToast();

  const toggle = (i: number) => {
    const next = [...checked];
    next[i] = !next[i];
    setChecked(next);
  };

  const submit = () => {
    const completed = checked.filter(Boolean).length;
    toast({
      title: "Self-Audit Submitted",
      description: `${completed}/${checklist.length} checks completed.`,
    });
  };

  return (
    <PartnerMobileLayout>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Self-Audit Checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {checklist.map((item, i) => (
              <label key={i} className="flex items-center gap-3">
                <Checkbox
                  checked={checked[i]}
                  onCheckedChange={() => toggle(i)}
                />
                <span>{item}</span>
              </label>
            ))}
            <Button onClick={submit} className="w-full mt-2">
              Submit Audit
            </Button>
          </CardContent>
        </Card>
      </div>
    </PartnerMobileLayout>
  );
}
