import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { DEPARTMENT_SUMMARIES } from "@/data/hrData";

export default function CostCalculator() {
  const [salary, setSalary] = useState(75000);
  const [multiplier, setMultiplier] = useState([1.5]);
  const [productivityDays, setProductivityDays] = useState(90);

  const dailyRate = salary / 260;
  const directReplacementCost = salary * multiplier[0];
  const productivityLoss = dailyRate * productivityDays;
  const totalCostPerEmployee = directReplacementCost + productivityLoss;
  
  const highRiskEmployees = 237;
  const totalPortfolioRisk = totalCostPerEmployee * highRiskEmployees;
  const annualLossIfHalfLeave = totalPortfolioRisk * 0.5;

  const pieData = [
    { name: "Recruitment", value: 35 },
    { name: "Training", value: 25 },
    { name: "Productivity Loss", value: 30 },
    { name: "Knowledge Transfer", value: 10 },
  ];
  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border">
        <h1 className="text-2xl font-bold">Cost Intelligence</h1>
        <p className="text-sm text-muted-foreground">The true cost of losing your people — quantified.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-card border-card-border p-6 shadow-md col-span-1">
          <h3 className="text-lg font-semibold mb-6">Cost Parameters</h3>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Average Annual Salary ($)</label>
              <Input 
                type="number" 
                value={salary} 
                onChange={(e) => setSalary(Number(e.target.value))} 
                className="bg-background"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">Replacement Cost Multiplier</label>
                <span className="text-primary font-bold">{multiplier[0]}x</span>
              </div>
              <Slider 
                value={multiplier} 
                onValueChange={setMultiplier} 
                min={0.5} max={3.0} step={0.1} 
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Productivity Loss Days</label>
              <Input 
                type="number" 
                value={productivityDays} 
                onChange={(e) => setProductivityDays(Number(e.target.value))} 
                className="bg-background"
              />
            </div>
            <div className="p-3 bg-muted/30 rounded border border-border">
              <span className="text-sm text-muted-foreground">Implied Daily Rate:</span>
              <span className="float-right font-medium">${dailyRate.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        <div className="col-span-1 lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-card border-card-border p-4 flex flex-col justify-center">
              <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider">Total Portfolio Exposure</p>
              <div className="text-3xl font-bold text-destructive">${(totalPortfolioRisk / 1000000).toFixed(2)}M</div>
              <p className="text-xs text-muted-foreground mt-1">For {highRiskEmployees} critical employees</p>
            </Card>
            <Card className="bg-card border-card-border p-4 flex flex-col justify-center">
              <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider">Annual Loss (50% departure)</p>
              <div className="text-3xl font-bold text-orange-500">${(annualLossIfHalfLeave / 1000000).toFixed(2)}M</div>
              <p className="text-xs text-muted-foreground mt-1">Baseline scenario</p>
            </Card>
          </div>

          <Card className="bg-card border-card-border p-6 shadow-md flex items-center">
            <div className="w-1/2">
              <h3 className="text-lg font-semibold mb-2">Cost Breakdown</h3>
              <ul className="space-y-3 mt-4">
                <li className="flex justify-between border-b border-border pb-2">
                  <span className="text-sm text-muted-foreground">Direct Replacement</span>
                  <span className="font-medium">${directReplacementCost.toLocaleString()}</span>
                </li>
                <li className="flex justify-between border-b border-border pb-2">
                  <span className="text-sm text-muted-foreground">Productivity Loss</span>
                  <span className="font-medium">${Math.round(productivityLoss).toLocaleString()}</span>
                </li>
                <li className="flex justify-between pt-1">
                  <span className="text-sm font-semibold">Total per Employee</span>
                  <span className="font-bold text-primary">${Math.round(totalCostPerEmployee).toLocaleString()}</span>
                </li>
              </ul>
            </div>
            <div className="w-1/2 h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      <Card className="bg-card border-card-border overflow-hidden">
        <CardHeader>
          <CardTitle>Department Exposure</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 border-y border-border">
              <tr>
                <th className="px-6 py-3 font-medium">Department</th>
                <th className="px-6 py-3 font-medium">High-Risk Count</th>
                <th className="px-6 py-3 font-medium">Avg Salary Est.</th>
                <th className="px-6 py-3 font-medium">Risk Exposure</th>
                <th className="px-6 py-3 font-medium">Projected Loss (50%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {DEPARTMENT_SUMMARIES.map(dept => {
                const exposure = dept.highRiskCount * totalCostPerEmployee;
                return (
                  <tr key={dept.department} className="hover:bg-muted/30">
                    <td className="px-6 py-4 font-medium">{dept.department}</td>
                    <td className="px-6 py-4 text-destructive">{dept.highRiskCount}</td>
                    <td className="px-6 py-4">${salary.toLocaleString()}</td>
                    <td className="px-6 py-4 font-bold text-primary">${Math.round(exposure).toLocaleString()}</td>
                    <td className="px-6 py-4 text-orange-500">${Math.round(exposure * 0.5).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
