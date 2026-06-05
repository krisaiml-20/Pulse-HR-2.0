import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DEPARTMENT_SUMMARIES } from "@/data/hrData";

export default function BudgetOptimizer() {
  const [budget, setBudget] = useState([1000000]);
  const formattedBudget = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(budget[0]);

  // Calculate allocation based on risk scores (simplified mock logic)
  const totalRiskScore = DEPARTMENT_SUMMARIES.reduce((acc, curr) => acc + curr.avgRiskScore, 0);
  
  const allocations = DEPARTMENT_SUMMARIES.map(dept => {
    const share = dept.avgRiskScore / totalRiskScore;
    const allocated = budget[0] * share;
    const retained = Math.round((allocated / 10000) * (dept.avgRiskScore / 50));
    return {
      department: dept.department,
      allocation: allocated,
      retained,
      roi: Math.round((retained * 112500 - allocated) / allocated * 100) || 0,
      priority: dept.avgRiskScore > 60 ? "High" : dept.avgRiskScore > 40 ? "Medium" : "Low"
    };
  }).sort((a, b) => b.allocation - a.allocation);

  const chartData = allocations.map(a => ({
    name: a.department,
    Allocation: Math.round(a.allocation)
  }));

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border">
        <h1 className="text-2xl font-bold">Budget Optimizer</h1>
        <p className="text-sm text-muted-foreground">Maximize retention ROI with AI-optimized budget allocation.</p>
      </div>

      <Card className="bg-card border-card-border p-8 mb-6 text-center">
        <h3 className="text-lg font-medium text-muted-foreground mb-4">Total Retention Budget</h3>
        <div className="text-5xl font-bold text-primary mb-8">{formattedBudget}</div>
        <div className="max-w-3xl mx-auto">
          <Slider 
            value={budget} 
            onValueChange={setBudget} 
            min={0} max={5000000} step={50000} 
            className="my-4"
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card border-card-border overflow-hidden">
            <CardHeader>
              <CardTitle>AI Allocation Recommendations</CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 border-y border-border">
                  <tr>
                    <th className="px-4 py-3 font-medium">Department</th>
                    <th className="px-4 py-3 font-medium">Recommended ($)</th>
                    <th className="px-4 py-3 font-medium">Retained</th>
                    <th className="px-4 py-3 font-medium">Est. ROI</th>
                    <th className="px-4 py-3 font-medium">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {allocations.map(a => (
                    <tr key={a.department} className="hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium">{a.department}</td>
                      <td className="px-4 py-3 text-primary font-bold">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(a.allocation)}
                      </td>
                      <td className="px-4 py-3">+{a.retained}</td>
                      <td className="px-4 py-3 text-green-400">+{a.roi}%</td>
                      <td className="px-4 py-3">
                        <Badge variant={a.priority === 'High' ? 'destructive' : a.priority === 'Medium' ? 'secondary' : 'outline'}>
                          {a.priority}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-card border-card-border p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Allocation Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={true} vertical={false} />
                  <XAxis type="number" stroke="#888" fontSize={12} tickFormatter={(v) => `$${v/1000}k`} />
                  <YAxis dataKey="name" type="category" stroke="#888" fontSize={12} width={80} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }} 
                    formatter={(val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)}
                  />
                  <Bar dataKey="Allocation" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="bg-card border-card-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-md">Strategy Brief</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-muted/30 border border-border rounded text-sm">
                <span className="font-semibold block mb-1">1. Focus on High-Risk Hubs</span>
                <span className="text-muted-foreground text-xs">Direct 60%+ of budget to Sales & Manufacturing to mitigate immediate flight risk.</span>
              </div>
              <div className="p-3 bg-muted/30 border border-border rounded text-sm">
                <span className="font-semibold block mb-1">2. Cost-Effective Interventions</span>
                <span className="text-muted-foreground text-xs">Overtime reduction in Sales yields 3x better ROI than flat salary increases.</span>
              </div>
              <div className="p-3 bg-muted/30 border border-border rounded text-sm">
                <span className="font-semibold block mb-1">3. Monitor & Iterate</span>
                <span className="text-muted-foreground text-xs">Review stability scores monthly and re-allocate from stable to volatile teams.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
