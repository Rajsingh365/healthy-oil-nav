import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { PointsProvider } from "./contexts/PointsContext";
import { UserProvider } from "./contexts/UserContext";
import Home from "./pages/user/Home";
import Tracker from "./pages/user/Tracker";
import Rewards from "./pages/user/Rewards";
import Leaderboard from "./pages/user/Leaderboard";
import Profile from "./pages/user/Profile";
import Streaks from "./pages/user/Streaks";
import Learn from "./pages/user/Learn";
import Settings from "./pages/user/Settings";
import FindRestaurants from "./pages/user/FindRestaurants";
import PolicyDashboard from "./pages/PolicyDashboard";
import PolicyAnalytics from "./pages/policy/PolicyAnalytics";
import PolicyReports from "./pages/policy/PolicyReports";
import PolicyInsights from "./pages/policy/PolicyInsights";
import PolicyAnalyticsInsights from "./pages/policy/PolicyAnalyticsInsights";
import PolicyCertificationReview from "./pages/policy/PolicyCertificationReview";
import CampaignManagement from "./pages/policy/CampaignManagement";
import ImpactReports from "./pages/policy/ImpactReports";
import PartnerOverview from "./pages/partner/PartnerOverview";
import PartnerCertification from "./pages/partner/PartnerCertification";
import PartnerRewards from "./pages/partner/PartnerRewards";
import PartnerMenuLabeling from "./pages/partner/PartnerMenuLabeling";
import PartnerSelfAuditDashboard from "./pages/partner/PartnerSelfAuditDashboard";
import AIAnalyzer from "./pages/user/AIAnalyzer";
import Coach from "./pages/user/Coach";
import Community from "./pages/user/Community";
import About from "./pages/About";
import Help from "./pages/user/Help";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";

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
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tracker"
                  element={
                    <ProtectedRoute>
                      <Tracker />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/rewards"
                  element={
                    <ProtectedRoute>
                      <Rewards />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/leaderboard"
                  element={
                    <ProtectedRoute>
                      <Leaderboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/coach"
                  element={
                    <ProtectedRoute>
                      <Coach />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/community"
                  element={
                    <ProtectedRoute>
                      <Community />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/streaks"
                  element={
                    <ProtectedRoute>
                      <Streaks />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/learn"
                  element={
                    <ProtectedRoute>
                      <Learn />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/find-restaurants"
                  element={
                    <ProtectedRoute>
                      <FindRestaurants />
                    </ProtectedRoute>
                  }
                />
                {/* Backward compatibility for old path */}
                <Route
                  path="/partnerships"
                  element={
                    <ProtectedRoute>
                      <FindRestaurants />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/policy-dashboard"
                  element={
                    <ProtectedRoute>
                      <PolicyDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/policy-analytics"
                  element={
                    <ProtectedRoute>
                      <PolicyAnalytics />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/policy-reports"
                  element={
                    <ProtectedRoute>
                      <PolicyReports />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/policy-insights"
                  element={
                    <ProtectedRoute>
                      <PolicyInsights />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/policy-analytics-insights"
                  element={
                    <ProtectedRoute>
                      <PolicyAnalyticsInsights />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/policy-campaigns"
                  element={
                    <ProtectedRoute>
                      <CampaignManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/policy-certifications"
                  element={
                    <ProtectedRoute>
                      <PolicyCertificationReview />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/policy-impact"
                  element={
                    <ProtectedRoute>
                      <ImpactReports />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/partner-dashboard"
                  element={
                    <ProtectedRoute>
                      <PartnerOverview />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/partner-certification"
                  element={
                    <ProtectedRoute>
                      <PartnerCertification />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/partner-rewards"
                  element={
                    <ProtectedRoute>
                      <PartnerRewards />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/partner-menu"
                  element={
                    <ProtectedRoute>
                      <PartnerMenuLabeling />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/partner-audit-dashboard"
                  element={
                    <ProtectedRoute>
                      <PartnerSelfAuditDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ai-analyzer"
                  element={
                    <ProtectedRoute>
                      <AIAnalyzer />
                    </ProtectedRoute>
                  }
                />
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
