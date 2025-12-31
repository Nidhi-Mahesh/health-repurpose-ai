import { useState } from "react";
import {
  FlaskConical,
  Search,
  Filter,
  ChevronDown,
  ExternalLink,
  BookOpen,
  Beaker,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { exportToCsv } from "@/lib/utils";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Hypothesis {
  id: string;
  drugName: string;
  targetDisease: string;
  source: "literature" | "trial";
  confidence: number;
  status: "awaiting" | "supported" | "concerns";
  mechanism: string;
  paperCount: number;
}

const hypotheses: Hypothesis[] = [
  {
    id: "1",
    drugName: "Chloroquine",
    targetDisease: "Dengue Fever",
    source: "literature",
    confidence: 78,
    status: "supported",
    mechanism: "Endosomal pH modification inhibiting viral entry",
    paperCount: 12,
  },
  {
    id: "2",
    drugName: "Ivermectin",
    targetDisease: "Dengue Fever",
    source: "trial",
    confidence: 65,
    status: "awaiting",
    mechanism: "Nuclear transport inhibition of viral proteins",
    paperCount: 8,
  },
  {
    id: "3",
    drugName: "Ribavirin",
    targetDisease: "Zika Virus",
    source: "literature",
    confidence: 42,
    status: "concerns",
    mechanism: "RNA-dependent RNA polymerase inhibition",
    paperCount: 5,
  },
  {
    id: "4",
    drugName: "Favipiravir",
    targetDisease: "Dengue Fever",
    source: "trial",
    confidence: 71,
    status: "awaiting",
    mechanism: "Viral RNA replication inhibition",
    paperCount: 15,
  },
  {
    id: "5",
    drugName: "Sofosbuvir",
    targetDisease: "Zika Virus",
    source: "literature",
    confidence: 58,
    status: "supported",
    mechanism: "NS5B polymerase chain termination",
    paperCount: 9,
  },
  {
    id: "6",
    drugName: "Hydroxychloroquine",
    targetDisease: "Malaria",
    source: "trial",
    confidence: 82,
    status: "supported",
    mechanism: "Heme polymerase inhibition in parasites",
    paperCount: 24,
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

const getConfidenceColor = (confidence: number) => {
  if (confidence >= 70) return "text-success";
  if (confidence >= 50) return "text-warning";
  return "text-destructive";
};

const Hypotheses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  const filteredHypotheses = hypotheses.filter((h) => {
    const matchesSearch =
      h.drugName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.targetDisease.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter.length === 0 || statusFilter.includes(h.status);
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    const rows = filteredHypotheses.map((h) => ({
      ID: h.id,
      "Drug Name": h.drugName,
      "Target Disease": h.targetDisease,
      Source: h.source,
      "Evidence Strength": `${h.confidence}%`,
      "Evidence Status":
        h.status === "awaiting"
          ? "Context Pending"
          : h.status === "supported"
          ? "Evidence Aligned"
          : "Feasibility concerns",
      Mechanism: h.mechanism,
      "Paper Count": h.paperCount,
    }));

    if (rows.length === 0) {
      // show a simple notification
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
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-foreground">
          AI Hypotheses
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Browse and manage AI-suggested repurposing hypotheses
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by drug name or disease..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Status Filter
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuCheckboxItem
              checked={statusFilter.includes("awaiting")}
              onCheckedChange={(checked) =>
                setStatusFilter(
                  checked
                    ? [...statusFilter, "awaiting"]
                    : statusFilter.filter((s) => s !== "awaiting")
                )
              }
            >
              Context Pending
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusFilter.includes("supported")}
              onCheckedChange={(checked) =>
                setStatusFilter(
                  checked
                    ? [...statusFilter, "supported"]
                    : statusFilter.filter((s) => s !== "supported")
                )
              }
            >
              Evidence Aligned
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusFilter.includes("concerns")}
              onCheckedChange={(checked) =>
                setStatusFilter(
                  checked
                    ? [...statusFilter, "concerns"]
                    : statusFilter.filter((s) => s !== "concerns")
                )
              }
            >
              Feasibility Concerns
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" className="gap-2" onClick={handleExport}>
          <ExternalLink className="w-4 h-4" />
          Export dataset
        </Button>
      </div>

      {/* Hypothesis Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHypotheses.map((hypothesis, index) => (
          <Card
            key={hypothesis.id}
            className={`card-elevated-hover animate-fade-in cursor-pointer ${index % 2 === 0 ? 'pt-5' : 'pt-6'}`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">
                    {hypothesis.drugName}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {hypothesis.targetDisease}
                  </p>
                </div>
                <div
                  className={`text-2xl font-bold ${getConfidenceColor(
                    hypothesis.confidence
                  )}`}
                >
                  {hypothesis.confidence}%
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {hypothesis.mechanism}
              </p>

              <div className="flex items-center justify-between">
                <Badge
                  variant="secondary"
                  className="gap-1.5 font-normal text-xs"
                >
                  {hypothesis.source === "literature" ? (
                    <>
                      <BookOpen className="w-3 h-3" />
                      {hypothesis.paperCount} papers
                    </>
                  ) : (
                    <>
                      <Beaker className="w-3 h-3" />
                      Clinical Trial
                    </>
                  )}
                </Badge>
                {getStatusBadge(hypothesis.status)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHypotheses.length === 0 && (
        <div className="text-center py-12">
          <FlaskConical className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            No hypotheses match these filters
          </p>
        </div>
      )}

      {/* AI Attribution */}
      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-azure-light text-primary font-medium">
            ⚡ Powered by Azure
          </span>
          Generated using Azure OpenAI + Azure Machine Learning
        </p>
      </div>
    </div>
  );
};

export default Hypotheses;
