import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FORECAST_DATA, DEPARTMENT_SUMMARIES } from "@/data/hrData";

export default function WorkforceForecast() {
  const depts = ["Sales", "RD", "HR", "Marketing", "Finance", "Support"];
  const colors = [
    'hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 
    'hsl(var(--chart-4))', 'hsl(var(--chart-5))', '#10b981'
  ];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border">
        <h1 className="text-2xl font-bold">Workforce Forecast</h1>
        <p className="text-sm text-muted-foreground">Predictive models for headcount and organizational stability.</p>
      </div>

      <Card className="bg-card border-card-border p-6 shadow-md">
        <h3 className="text-lg font-semibold mb-6">12-Month Projected Attrition by Department</h3>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={FORECAST_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }} />
              <Legend />
              {depts.map((dept, i) => (
                <Line key={dept} type="monotone" dataKey={dept} stroke={colors[i]} strokeWidth={2} dot={{ r: 3 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {depts.map((deptCode, i) => {
          const deptInfo = DEPARTMENT_SUMMARIES.find(d => 
            d.department.toLowerCase().replace('&', '') === deptCode.toLowerCase() || 
            (deptCode === 'RD' && d.department === 'R&D')
          ) || DEPARTMENT_SUMMARIES[0];
          
          return (
            <Card key={deptCode} className="bg-card border-card-border">
              <CardContent className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-lg">{deptInfo.department}</h4>
                  <Badge variant={deptInfo.trend === 'up' ? 'destructive' : 'outline'}>
                    {deptInfo.trend === 'up' ? 'Worsening' : 'Stable'}
                  </Badge>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-sm">
                  <div className="bg-muted/30 p-2 rounded">
                    <div className="text-xs text-muted-foreground mb-1">Q1</div>
                    <div className="font-medium text-destructive">16%</div>
                  </div>
                  <div className="bg-muted/30 p-2 rounded">
                    <div className="text-xs text-muted-foreground mb-1">Q2</div>
                    <div className="font-medium text-destructive">18%</div>
                  </div>
                  <div className="bg-muted/30 p-2 rounded">
                    <div className="text-xs text-muted-foreground mb-1">Q3</div>
                    <div className="font-medium text-orange-500">15%</div>
                  </div>
                  <div className="bg-muted/30 p-2 rounded">
                    <div className="text-xs text-muted-foreground mb-1">Q4</div>
                    <div className="font-medium text-primary">12%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="p-4 border border-green-900/50 bg-green-900/10 rounded-lg flex items-start gap-4">
          <div className="w-2 h-full bg-green-500 rounded-full"></div>
          <div>
            <h4 className="text-green-400 font-semibold mb-1">Stable Departments</h4>
            <p className="text-sm text-muted-foreground">Legal, HR, and IT show strong retention forecasts for the next 12 months with negligible critical risk exposure.</p>
          </div>
        </div>
        <div className="p-4 border border-red-900/50 bg-red-900/10 rounded-lg flex items-start gap-4">
          <div className="w-2 h-full bg-red-500 rounded-full"></div>
          <div>
            <h4 className="text-red-400 font-semibold mb-1">Critical Departments</h4>
            <p className="text-sm text-muted-foreground">Sales and Manufacturing are projected to see attrition spikes in Q2. Immediate intervention required.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
