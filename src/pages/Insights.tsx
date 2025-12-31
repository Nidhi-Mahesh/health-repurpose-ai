import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Clock, TrendingUp, AlertTriangle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const improvementData = [
  { month: "Jan", before: 52, after: 71 },
  { month: "Feb", before: 58, after: 78 },
  { month: "Mar", before: 61, after: 82 },
  { month: "Apr", before: 55, after: 76 },
  { month: "May", before: 64, after: 85 },
  { month: "Jun", before: 59, after: 81 },
];

const feasibilityIssues = [
  { name: "Drug Interactions", value: 35, color: "#ef4444" },
  { name: "Dosing Concerns", value: 25, color: "#f97316" },
  { name: "Availability", value: 20, color: "#eab308" },
  { name: "Toxicity Risk", value: 15, color: "#f43f5e" },
  { name: "Other", value: 5, color: "#6b7280" },
];

const turnaroundData = [
  { week: "W1", days: 4.2 },
  { week: "W2", days: 3.8 },
  { week: "W3", days: 3.5 },
  { week: "W4", days: 3.1 },
  { week: "W5", days: 2.9 },
  { week: "W6", days: 2.7 },
];

const Insights = () => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-foreground">Insights</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Analytics and performance metrics for contextual review
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="card-elevated transition-opacity duration-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-accent flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">+26%</p>
                <p className="text-sm text-muted-foreground">
                  Avg Evidence Strength Improvement
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated transition-opacity duration-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-success/10 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">142</p>
                <p className="text-sm text-muted-foreground">
                  Hypotheses Reviewed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated transition-opacity duration-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-warning/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2.7 days</p>
                <p className="text-sm text-muted-foreground">
                  Avg Turnaround Time
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated transition-opacity duration-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">23%</p>
                <p className="text-sm text-muted-foreground">
                  Flagged for Concerns
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Confidence Improvement Chart */}
        <Card className="card-elevated transition-opacity duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">
              Confidence Score Improvement
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Before vs after contextual review
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={improvementData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="before"
                    fill="hsl(var(--muted-foreground))"
                    radius={[4, 4, 0, 0]}
                    name="Before Contextual Review"
                  />
                  <Bar
                    dataKey="after"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                    name="After Contextual Review"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Feasibility Issues Pie Chart */}
        <Card className="card-elevated transition-opacity duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">
              Most Common Feasibility Issues
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Distribution of domain-expert flagged concerns
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center">
              <div className="w-1/2">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={feasibilityIssues}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {feasibilityIssues.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2 space-y-2">
                {feasibilityIssues.map((issue) => (
                  <div key={issue.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: issue.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {issue.name}
                    </span>
                    <span className="text-sm font-medium text-foreground ml-auto">
                      {issue.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Turnaround Time Chart */}
      <Card className="card-elevated animate-fade-in">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">
            Average Turnaround Time Trend
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Days from contextual review request to completion
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={turnaroundData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="week"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <YAxis
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                  domain={[0, 5]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="days"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                  name="Days"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Insights;
