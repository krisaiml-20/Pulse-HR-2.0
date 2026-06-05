import React, { useState } from "react";
import { EMPLOYEES } from "@/data/hrData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

export default function EmployeeRisk() {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("all");
  const [selectedEmp, setSelectedEmp] = useState<any>(null);

  const filtered = EMPLOYEES.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.id.toLowerCase().includes(search.toLowerCase());
    const matchesDept = dept === "all" || e.department === dept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold">Employee Risk Intel</h1>
          <p className="text-sm text-muted-foreground">Monitor and mitigate flight risks at the individual level.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Input 
            placeholder="Search by name or ID..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="w-full md:w-64 bg-card"
          />
          <Select value={dept} onValueChange={setDept}>
            <SelectTrigger className="w-[180px] bg-card">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Manufacturing">Manufacturing</SelectItem>
              <SelectItem value="R&D">R&D</SelectItem>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border border-border overflow-hidden bg-card">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Department</th>
              <th className="px-4 py-3 font-medium">Risk Score</th>
              <th className="px-4 py-3 font-medium">Risk Level</th>
              <th className="px-4 py-3 font-medium">Key Factor</th>
              <th className="px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map(emp => (
              <tr key={emp.id} className="hover:bg-muted/30">
                <td className="px-4 py-3 text-muted-foreground">{emp.id}</td>
                <td className="px-4 py-3 font-medium">{emp.name}</td>
                <td className="px-4 py-3">{emp.department}</td>
                <td className="px-4 py-3 font-bold">{emp.riskScore}</td>
                <td className="px-4 py-3">
                  <Badge variant={emp.riskLevel === 'Critical' ? 'destructive' : emp.riskLevel === 'High' ? 'secondary' : 'outline'}>
                    {emp.riskLevel}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{emp.keyRiskFactor}</td>
                <td className="px-4 py-3">
                  <Button size="sm" variant="secondary" onClick={() => setSelectedEmp(emp)}>
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-muted-foreground">No employees found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Sheet open={!!selectedEmp} onOpenChange={(o) => !o && setSelectedEmp(null)}>
        <SheetContent className="bg-card border-l-border w-full sm:max-w-md overflow-y-auto">
          {selectedEmp && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl">{selectedEmp.name}</SheetTitle>
                <SheetDescription>
                  {selectedEmp.jobRole} • {selectedEmp.department}
                </SheetDescription>
              </SheetHeader>
              
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center p-6 border border-border rounded-lg bg-background">
                  <div className="text-5xl font-bold text-destructive mb-2">{selectedEmp.riskScore}</div>
                  <Badge variant="destructive" className="uppercase">{selectedEmp.riskLevel} RISK</Badge>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Key Drivers</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Primary Risk Factor</span>
                      <span className="font-medium text-destructive">{selectedEmp.keyRiskFactor}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Tenure</span>
                      <span className="font-medium">{selectedEmp.yearsAtCompany} years</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Overtime</span>
                      <span className="font-medium">{selectedEmp.overtime ? "High" : "Normal"}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">AI Recommendations</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted/30 border border-border rounded-md text-sm">
                      <strong className="block mb-1 text-primary">Intervention 1: Adjust Workload</strong>
                      Reduce overtime hours. Risk model suggests 15% reduction in flight risk if normal hours restored.
                    </div>
                    <div className="p-3 bg-muted/30 border border-border rounded-md text-sm">
                      <strong className="block mb-1 text-primary">Intervention 2: Compensation Review</strong>
                      Current salary is 12% below market median for tenure and role.
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
