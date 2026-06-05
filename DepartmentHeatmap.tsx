import React from "react";
import { DEPT_HEATMAP_DATA, DEPARTMENT_SUMMARIES } from "@/data/hrData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DepartmentHeatmap() {
  const factors = ["Overtime Load", "Job Sat.", "Salary Index", "Tenure Mix", "Mgr Score", "Engagement", "Training", "Work-Life"];
  const depts = Object.keys(DEPT_HEATMAP_DATA);

  const getColor = (val: number) => {
    if (val >= 80) return "bg-red-900/80 text-red-100 border-red-500/50";
    if (val >= 60) return "bg-amber-900/80 text-amber-100 border-amber-500/50";
    return "bg-green-900/40 text-green-100 border-green-500/30";
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border">
        <h1 className="text-2xl font-bold">Department Heatmap</h1>
        <p className="text-sm text-muted-foreground">Identify systemic organizational issues across departments.</p>
      </div>

      <Card className="bg-card border-card-border overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[800px] p-4">
            <div className="grid grid-cols-[150px_repeat(8,1fr)] gap-2 mb-2">
              <div className="font-semibold text-muted-foreground text-sm flex items-end pb-2">Department</div>
              {factors.map(f => (
                <div key={f} className="text-xs font-medium text-muted-foreground text-center flex items-end justify-center pb-2">
                  <span className="-rotate-45 origin-bottom-left block w-full truncate">{f}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              {depts.map(dept => {
                const vals = DEPT_HEATMAP_DATA[dept as keyof typeof DEPT_HEATMAP_DATA];
                return (
                  <div key={dept} className="grid grid-cols-[150px_repeat(8,1fr)] gap-2 items-center">
                    <div className="text-sm font-medium">{dept}</div>
                    {vals.map((v, i) => (
                      <div key={i} className={`h-10 flex items-center justify-center text-xs font-bold rounded-sm border ${getColor(v)} transition-all hover:scale-105 cursor-pointer`} title={`${factors[i]}: ${v}`}>
                        {v}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {DEPARTMENT_SUMMARIES.slice(0, 3).map(dept => (
          <Card key={dept.department} className="bg-card border-destructive/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                {dept.department}
                <Badge variant="destructive">Critical Risk</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Headcount:</span> <span className="font-bold">{dept.headcount}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Attrition Rate:</span> <span className="font-bold text-destructive">{dept.attritionRate}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Primary Issue:</span> <span className="font-bold">{dept.topRiskFactor}</span></div>
              <div className="mt-4 p-3 bg-muted/50 rounded text-xs text-muted-foreground border border-border">
                <strong>Action needed:</strong> Target {dept.topRiskFactor.toLowerCase()} interventions immediately to prevent forecasted losses.
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
