export const EMPLOYEES = [
  { id: "EMP001", name: "Sarah Jenkins", department: "Sales", jobLevel: "Senior", riskScore: 85, riskLevel: "Critical", keyRiskFactor: "Overtime Load", overtime: true, yearsAtCompany: 4, monthlyIncome: 8500, jobSatisfaction: 2, workLifeBalance: 1, distanceFromHome: 15, yearsWithManager: 2, jobRole: "Account Exec", age: 34 },
  { id: "EMP002", name: "David Chen", department: "Manufacturing", jobLevel: "Mid", riskScore: 78, riskLevel: "High", keyRiskFactor: "Compensation", overtime: true, yearsAtCompany: 2, monthlyIncome: 4500, jobSatisfaction: 3, workLifeBalance: 2, distanceFromHome: 5, yearsWithManager: 1, jobRole: "Technician", age: 28 },
  { id: "EMP003", name: "Elena Rodriguez", department: "R&D", jobLevel: "Lead", riskScore: 45, riskLevel: "Medium", keyRiskFactor: "Growth", overtime: false, yearsAtCompany: 5, monthlyIncome: 11000, jobSatisfaction: 4, workLifeBalance: 3, distanceFromHome: 10, yearsWithManager: 4, jobRole: "Data Scientist", age: 31 },
  { id: "EMP004", name: "Michael Chang", department: "IT", jobLevel: "Junior", riskScore: 22, riskLevel: "Low", keyRiskFactor: "None", overtime: false, yearsAtCompany: 1, monthlyIncome: 5500, jobSatisfaction: 5, workLifeBalance: 4, distanceFromHome: 8, yearsWithManager: 1, jobRole: "Support Tech", age: 24 },
  { id: "EMP005", name: "Jessica Patel", department: "Finance", jobLevel: "Director", riskScore: 15, riskLevel: "Low", keyRiskFactor: "None", overtime: false, yearsAtCompany: 8, monthlyIncome: 14500, jobSatisfaction: 4, workLifeBalance: 4, distanceFromHome: 12, yearsWithManager: 3, jobRole: "Controller", age: 41 },
];

export const DEPARTMENT_SUMMARIES = [
  { department: "Sales", headcount: 340, attritionRate: 23.1, avgRiskScore: 68.4, topRiskFactor: "Overtime Load", trend: "up", highRiskCount: 82 },
  { department: "Manufacturing", headcount: 410, attritionRate: 19.5, avgRiskScore: 62.1, topRiskFactor: "Compensation", trend: "up", highRiskCount: 75 },
  { department: "R&D", headcount: 150, attritionRate: 15.3, avgRiskScore: 48.7, topRiskFactor: "Growth", trend: "stable", highRiskCount: 25 },
  { department: "Support", headcount: 220, attritionRate: 16.8, avgRiskScore: 51.2, topRiskFactor: "Manager Quality", trend: "down", highRiskCount: 30 },
  { department: "Marketing", headcount: 95, attritionRate: 14.1, avgRiskScore: 42.5, topRiskFactor: "Work-Life", trend: "stable", highRiskCount: 12 },
  { department: "Finance", headcount: 65, attritionRate: 9.8, avgRiskScore: 31.4, topRiskFactor: "Compensation", trend: "stable", highRiskCount: 5 },
  { department: "IT", headcount: 110, attritionRate: 11.2, avgRiskScore: 35.8, topRiskFactor: "Growth", trend: "stable", highRiskCount: 6 },
  { department: "HR", headcount: 45, attritionRate: 12.2, avgRiskScore: 28.5, topRiskFactor: "Work-Life", trend: "down", highRiskCount: 2 },
  { department: "Legal", headcount: 35, attritionRate: 8.5, avgRiskScore: 25.1, topRiskFactor: "None", trend: "stable", highRiskCount: 0 },
];

export const MONTHLY_TREND = [
  { month: "Jan", actual: 14.2, predicted: 14.5 },
  { month: "Feb", actual: 14.8, predicted: 15.0 },
  { month: "Mar", actual: 15.1, predicted: 15.2 },
  { month: "Apr", actual: 15.9, predicted: 15.6 },
  { month: "May", actual: 16.4, predicted: 16.1 },
  { month: "Jun", actual: 17.2, predicted: 16.8 },
  { month: "Jul", actual: 16.8, predicted: 17.0 },
  { month: "Aug", actual: 17.5, predicted: 17.3 },
  { month: "Sep", actual: 18.1, predicted: 17.8 },
  { month: "Oct", actual: 18.5, predicted: 18.2 },
  { month: "Nov", actual: 17.9, predicted: 18.4 },
  { month: "Dec", actual: 16.1, predicted: 18.5 },
];

export const RADAR_DATA = [
  { dimension: "Engagement", score: 68 },
  { dimension: "Compensation", score: 55 },
  { dimension: "Growth", score: 72 },
  { dimension: "Work-Life", score: 45 },
  { dimension: "Manager Quality", score: 62 },
  { dimension: "Stability", score: 58 },
];

export const DEPT_HEATMAP_DATA = {
  "Sales": [85, 42, 65, 55, 60, 58, 70, 35],
  "Manufacturing": [75, 48, 45, 60, 55, 52, 40, 42],
  "R&D": [55, 75, 82, 70, 68, 78, 85, 65],
  "Support": [65, 55, 58, 62, 45, 60, 55, 50],
  "Marketing": [60, 68, 72, 65, 75, 70, 78, 62],
  "Finance": [45, 72, 85, 75, 80, 75, 82, 70],
  "IT": [50, 65, 78, 68, 72, 68, 80, 65],
  "HR": [40, 78, 75, 80, 85, 82, 85, 75],
  "Legal": [45, 80, 88, 85, 82, 85, 90, 72],
};

export const FORECAST_DATA = [
  { month: "Jan", Sales: 23, RD: 15, HR: 12, Marketing: 14, Finance: 10, Support: 16 },
  { month: "Feb", Sales: 24, RD: 15, HR: 12, Marketing: 14, Finance: 10, Support: 17 },
  { month: "Mar", Sales: 25, RD: 16, HR: 11, Marketing: 15, Finance: 9, Support: 17 },
  { month: "Apr", Sales: 24, RD: 16, HR: 11, Marketing: 15, Finance: 9, Support: 18 },
  { month: "May", Sales: 26, RD: 15, HR: 12, Marketing: 14, Finance: 10, Support: 18 },
  { month: "Jun", Sales: 27, RD: 17, HR: 12, Marketing: 16, Finance: 10, Support: 19 },
];

export const FEATURE_IMPORTANCE = [
  { factor: "Overtime Load", impact: 85, description: "Consistent >50hr weeks" },
  { factor: "Compensation", impact: 75, description: "Below market median" },
  { factor: "Manager Score", impact: 65, description: "Low feedback ratings" },
  { factor: "Job Satisfaction", impact: 55, description: "Self-reported surveys" },
  { factor: "Tenure Mix", impact: 45, description: "Flight risk at 2yr mark" },
  { factor: "Growth Access", impact: 35, description: "Lack of promotions" },
  { factor: "Work-Life", impact: 25, description: "Commute & flexibility" },
  { factor: "Engagement", impact: 15, description: "System activity" },
];
