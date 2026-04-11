import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HealthProvider } from "@/contexts/HealthContext";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Questionnaire from "./pages/Questionnaire";
import Analysis from "./pages/Analysis";
import Results from "./pages/Results";
import Report from "./pages/Report";
import Doctors from "./pages/Doctors";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HealthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/results" element={<Results />} />
            <Route path="/report" element={<Report />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </HealthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
