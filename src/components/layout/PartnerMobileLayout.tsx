import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PartnerHeader } from "@/components/layout/PartnerHeader";
import { PartnerBottomNav } from "@/components/layout/PartnerBottomNav";
import { useUser } from "@/contexts/UserContext";

export default function PartnerMobileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { currentUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;
    if (currentUser.role !== "partner") {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen pb-20">
      <PartnerHeader />
      <main className="container mx-auto max-w-3xl px-4 py-4">{children}</main>
      <PartnerBottomNav />
    </div>
  );
}
