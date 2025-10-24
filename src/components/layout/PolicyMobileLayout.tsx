import { PolicyHeader } from "./PolicyHeader";
import { PolicyBottomNav } from "./PolicyBottomNav";
import { ReactNode } from "react";

interface PolicyMobileLayoutProps {
  children: ReactNode;
}

export const PolicyMobileLayout = ({ children }: PolicyMobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <PolicyHeader />
      <main className="pt-14 pb-20 min-h-screen">
        <div className="container mx-auto px-4 py-6 max-w-md">{children}</div>
      </main>
      <PolicyBottomNav />
    </div>
  );
};
