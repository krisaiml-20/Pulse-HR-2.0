import React from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, Users, Grid3x3, SlidersHorizontal, 
  DollarSign, TrendingUp, PieChart, MessageSquare 
} from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Executive Command Center", icon: LayoutDashboard },
    { href: "/employees", label: "Employee Risk Intel", icon: Users },
    { href: "/heatmap", label: "Department Heatmap", icon: Grid3x3 },
    { href: "/simulator", label: "Attrition Simulator", icon: SlidersHorizontal },
    { href: "/costs", label: "Cost Intelligence", icon: DollarSign },
    { href: "/forecast", label: "Workforce Forecast", icon: TrendingUp },
    { href: "/budget", label: "Budget Optimizer", icon: PieChart },
    { href: "/copilot", label: "AI Copilot", icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-[220px] flex-shrink-0 border-r border-border bg-sidebar flex flex-col">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <h1 className="font-bold text-lg tracking-wider text-sidebar-foreground">PULSE HR</h1>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'}`}>
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border space-y-2">
          <div className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded w-fit">Gradient Boosting AUC 0.795</div>
          <div className="text-xs text-muted-foreground">1,470 employees analyzed</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
