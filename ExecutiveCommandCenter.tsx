import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { MONTHLY_TREND, RADAR_DATA, DEPARTMENT_SUMMARIES } from "@/data/hrData";

export default function ExecutiveCommandCenter() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-cyan-300 bg-clip-text text-transparent">Retention Intelligence Platform</h1>
        <p className="text-muted-foreground mt-1 text-sm">Last updated: Today at 09:42 AM</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Total Employees", value: "1,470", trend: "+12 this month" },
          { label: "Overall Attrition", value: "16.1%", badge: "ABOVE BENCHMARK" },
          { label: "High Risk Employees", value: "237", trend: "+14 since last run" },
          { label: "Avg Risk Score", value: "43.2", trend: "-1.2 pts" },
          { label: "Workforce Health", value: "68.4", badge: "AMBER" },
          { label: "Projected Loss", value: "$8.2M", trend: "+$200k" },
        ].map((kpi, i) => (
          <Card key={i} className="bg-card border-card-border shadow-md">
            <CardContent className="p-4 space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{kpi.label}</p>
              <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
              {kpi.badge ? (
                <Badge variant={kpi.badge === "AMBER" ? "outline" : "destructive"} className="text-[10px]">
                  {kpi.badge}
                </Badge>
              ) : (
                <p className="text-xs text-muted-foreground">{kpi.trend}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3 bg-card border-card-border p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">12-Month Attrition Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }} />
                <Line type="monotone" dataKey="actual" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="predicted" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-2 bg-card border-card-border p-6 shadow-md flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Department Risk Profile</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={RADAR_DATA}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: "#888", fontSize: 11 }} />
                <Radar name="Score" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-card-border p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">Department Attrition Rates</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DEPARTMENT_SUMMARIES} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#888" fontSize={12} />
                <YAxis dataKey="department" type="category" stroke="#888" fontSize={12} width={100} />
                <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }} cursor={{fill: '#222'}} />
                <Bar dataKey="attritionRate" fill="#ef4444" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-card border-card-border p-6 shadow-md flex flex-col justify-center items-center">
          <h3 className="text-lg font-semibold mb-6 w-full text-left">Workforce Stability Score</h3>
          <div className="relative w-48 h-48 rounded-full border-[12px] border-border flex items-center justify-center">
            <div className="absolute inset-[-12px] rounded-full border-[12px] border-primary border-t-transparent border-l-transparent transform rotate-45"></div>
            <div className="text-center">
              <span className="text-4xl font-bold text-foreground">71.3%</span>
              <p className="text-xs text-muted-foreground mt-1">Highly Stable</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
