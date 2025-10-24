import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { PointsProvider } from "./contexts/PointsContext";
import { UserProvider } from "./contexts/UserContext";
import Home from "./pages/Home";
import Tracker from "./pages/Tracker";
import Rewards from "./pages/Rewards";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Streaks from "./pages/Streaks";
import Learn from "./pages/Learn";
import Settings from "./pages/Settings";
import Partnerships from "./pages/Partnerships";
import PolicyDashboard from "./pages/PolicyDashboard";
import AIAnalyzer from "./pages/AIAnalyzer";
import Coach from "./pages/Coach";
import Community from "./pages/Community";
import About from "./pages/About";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <UserProvider>
        <PointsProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tracker" element={<Tracker />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/coach" element={<Coach />} />
                <Route path="/community" element={<Community />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/streaks" element={<Streaks />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/partnerships" element={<Partnerships />} />
                <Route path="/policy-dashboard" element={<PolicyDashboard />} />
                <Route path="/ai-analyzer" element={<AIAnalyzer />} />
                <Route path="/about" element={<About />} />
                <Route path="/help" element={<Help />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </PointsProvider>
      </UserProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
