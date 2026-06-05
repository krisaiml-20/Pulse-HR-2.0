import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import ExecutiveCommandCenter from "@/pages/ExecutiveCommandCenter";
import EmployeeRisk from "@/pages/EmployeeRisk";
import DepartmentHeatmap from "@/pages/DepartmentHeatmap";
import AttritionSimulator from "@/pages/AttritionSimulator";
import CostCalculator from "@/pages/CostCalculator";
import WorkforceForecast from "@/pages/WorkforceForecast";
import BudgetOptimizer from "@/pages/BudgetOptimizer";
import AICopilot from "@/pages/AICopilot";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={ExecutiveCommandCenter} />
        <Route path="/employees" component={EmployeeRisk} />
        <Route path="/heatmap" component={DepartmentHeatmap} />
        <Route path="/simulator" component={AttritionSimulator} />
        <Route path="/costs" component={CostCalculator} />
        <Route path="/forecast" component={WorkforceForecast} />
        <Route path="/budget" component={BudgetOptimizer} />
        <Route path="/copilot" component={AICopilot} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
