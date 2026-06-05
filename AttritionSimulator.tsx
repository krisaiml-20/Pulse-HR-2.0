import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

export default function AttritionSimulator() {
  const [salaryInc, setSalaryInc] = useState([0]);
  const [overtimeRed, setOvertimeRed] = useState([0]);
  const [training, setTraining] = useState([0]);

  const baseRate = 16.1;
  const reduction = (salaryInc[0] * 0.15) + (overtimeRed[0] * 0.05) + (training[0] * 0.2);
  const newRate = Math.max(5.0, baseRate - reduction).toFixed(1);
  const retained = Math.round(reduction * 14.7);
  const savings = (retained * 75000 * 1.5).toLocaleString();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border">
        <h1 className="text-2xl font-bold">Attrition Simulator</h1>
        <p className="text-sm text-muted-foreground">Model the impact of HR interventions before you spend a single dollar.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="bg-card border-card-border p-6">
            <h3 className="text-lg font-semibold mb-6">Intervention Levers</h3>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Company-wide Salary Increase (%)</label>
                  <span className="text-primary font-bold">{salaryInc[0]}%</span>
                </div>
                <Slider value={salaryInc} onValueChange={setSalaryInc} max={30} step={1} />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Overtime Reduction Target (%)</label>
                  <span className="text-primary font-bold">{overtimeRed[0]}%</span>
                </div>
                <Slider value={overtimeRed} onValueChange={setOvertimeRed} max={100} step={5} />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">New Training Programs Added</label>
                  <span className="text-primary font-bold">{training[0]}</span>
                </div>
                <Slider value={training} onValueChange={setTraining} max={10} step={1} />
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-card border-primary/50 shadow-[0_0_15px_rgba(14,165,233,0.1)] p-6 h-full flex flex-col justify-center">
            <h3 className="text-lg font-semibold mb-8 text-center text-muted-foreground">Live Simulation Results</h3>
            
            <div className="grid grid-cols-2 gap-6 text-center">
              <div className="space-y-2 border-r border-border">
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Projected Attrition</p>
                <div className="text-5xl font-bold text-primary">{newRate}%</div>
                <Badge variant="outline" className="text-green-400 border-green-900 bg-green-900/20">-{reduction.toFixed(1)}%</Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Employees Retained</p>
                <div className="text-5xl font-bold text-foreground">+{retained}</div>
                <Badge variant="outline" className="text-green-400 border-green-900 bg-green-900/20">Highly Skilled</Badge>
              </div>
            </div>

            <div className="mt-10 p-6 bg-primary/10 rounded-lg border border-primary/20 text-center">
              <p className="text-sm font-medium text-primary mb-1">Projected Annual Cost Savings</p>
              <div className="text-4xl font-bold tracking-tight text-white">${savings}</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
