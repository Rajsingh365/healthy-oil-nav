import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { ReactNode } from "react";

interface MobileLayoutProps {
  children: ReactNode;
}

export const MobileLayout = ({ children }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-14 pb-20 min-h-screen">
        <div className="container mx-auto px-4 py-6 max-w-md">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};
