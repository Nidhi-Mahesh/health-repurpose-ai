import { ExternalLink, FlaskConical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { exportToCsv } from "@/lib/utils";
import { toast } from "sonner";

interface Hypothesis {
  id: string;
  drugName: string;
  source: "literature" | "trial";
  confidence: number;
  status: "awaiting" | "supported" | "concerns";
}

const mockHypotheses: Hypothesis[] = [
  {
    id: "1",
    drugName: "Chloroquine",
    source: "literature",
    confidence: 78,
    status: "supported",
  },
  {
    id: "2",
    drugName: "Ivermectin",
    source: "trial",
    confidence: 65,
    status: "awaiting",
  },
  {
    id: "3",
    drugName: "Ribavirin",
    source: "literature",
    confidence: 42,
    status: "concerns",
  },
  {
    id: "4",
    drugName: "Favipiravir",
    source: "trial",
    confidence: 71,
    status: "awaiting",
  },
  {
    id: "5",
    drugName: "Sofosbuvir",
    source: "literature",
    confidence: 58,
    status: "supported",
  },
];

const getStatusBadge = (status: Hypothesis["status"]) => {
  switch (status) {
    case "awaiting":
      return <span className="badge-awaiting">Context Pending</span>;
    case "supported":
      return <span className="badge-supported">Evidence Aligned</span>;
    case "concerns":
      return <span className="badge-concerns">Feasibility concerns</span>;
  }
};

const ConfidenceBar = ({ confidence }: { confidence: number }) => {
  const getColor = () => {
    if (confidence >= 70) return "bg-success";
    if (confidence >= 50) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div className="flex items-center gap-3">
      <div className="progress-bar w-24">
        <div
          className={`progress-bar-fill ${getColor()}`}
          style={{ width: `${confidence}%` }}
        />
      </div>
      <span className="text-sm font-medium text-foreground w-8">
        {confidence}
      </span>
    </div>
  );
};

const HypothesesTable = () => {
  const handleExport = () => {
    const rows = mockHypotheses.map((h) => ({
      ID: h.id,
      "Drug Name": h.drugName,
      Source: h.source,
      "Evidence Strength": `${h.confidence}%`,
      "Evidence Status":
        h.status === "awaiting"
          ? "Context Pending"
          : h.status === "supported"
          ? "Evidence Aligned"
          : "Feasibility concerns",
    }));

    if (rows.length === 0) {
      toast("No hypotheses to export");
      return;
    }

    exportToCsv(
      "ai-generated_repurposing_hypotheses.csv",
      rows,
      "AI-Generated Repurposing Hypotheses"
    );
    toast.success("Export started — check your downloads folder");
  };

  return (
    <Card className="card-elevated transition-opacity duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <FlaskConical className="w-4 h-4 text-primary" />
            </div>
            AI-Generated Repurposing Hypotheses
          </CardTitle>
          <Button variant="outline" size="sm" className="gap-2" onClick={handleExport}>
            <ExternalLink className="w-4 h-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Drug Name
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Source of Evidence
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Evidence Strength
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Evidence Status
                </th>
              </tr>
            </thead>
            <tbody>
              {mockHypotheses.map((hypothesis, index) => (
                <tr
                  key={hypothesis.id}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="py-4 px-4">
                    <span className="font-medium text-foreground">
                      {hypothesis.drugName}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <Badge
                      variant="secondary"
                      className="capitalize font-normal"
                    >
                      {hypothesis.source === "literature"
                        ? "📚 Literature"
                        : "🔬 Clinical Trial"}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <ConfidenceBar confidence={hypothesis.confidence} />
                  </td>
                  <td className="py-4 px-4">
                    {getStatusBadge(hypothesis.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI Attribution */}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-azure-light text-primary font-medium">
              ⚡ Powered by Azure
            </span>
            Generated using Azure OpenAI + Azure Machine Learning
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HypothesesTable;
