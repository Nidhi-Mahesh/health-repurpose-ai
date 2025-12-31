import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ComparisonMetric {
  label: string;
  before: number | string;
  after: number | string;
  improved: boolean;
  unit?: string;
}

const comparisonData: ComparisonMetric[] = [
  {
    label: "Evidence Strength",
    before: 65,
    after: 82,
    improved: true,
    unit: "%",
  },
  {
    label: "Priority Rank",
    before: 4,
    after: 2,
    improved: true,
  },
  {
    label: "Feasibility Risk",
    before: "High",
    after: "Medium",
    improved: true,
  },
  {
    label: "Evidence Quality",
    before: "Moderate",
    after: "Strong",
    improved: true,
  },
];

const ComparisonPanel = () => {
  return (
    <Card className="card-elevated transition-opacity duration-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          Impact of Additional Context
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[
            "Evidence clarity ↑",
            "Uncertainty ↓",
            "Risk visibility ↑",
          ].map((text, index) => (
            <div
              key={text}
              className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <p className="font-medium text-foreground">{text}</p>
            </div>
          ))}
        </div>

        {/* Sub-caption */}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">Updated after contextual review</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComparisonPanel;
