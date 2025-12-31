import { useOutletContext } from "react-router-dom";
import DiseaseContextCard from "@/components/dashboard/DiseaseContextCard";
import HypothesesTable from "@/components/dashboard/HypothesesTable";
import ValidationRequestPanel from "@/components/dashboard/ValidationRequestPanel";
import ComparisonPanel from "@/components/dashboard/ComparisonPanel";
import ClinicianDashboard from "@/components/dashboard/ClinicianDashboard";

interface DashboardContext {
  selectedDisease: string;
  role: "researcher" | "clinician";
}

const Dashboard = () => {
  const { selectedDisease, role } = useOutletContext<DashboardContext>();

  // Show clinician-specific dashboard
  if (role === "clinician") {
    return <ClinicianDashboard selectedDisease={selectedDisease} />;
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-foreground">
          Research Dashboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          AI-powered drug repurposing hypothesis generation and domain expert review
        </p>
      </div>

      {/* Section A: Disease Context */}
      <DiseaseContextCard disease={selectedDisease} />

      {/* Section B: AI Hypotheses */}
      <HypothesesTable />

      {/* Sections C & D: Side by side on larger screens */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Section C: Validation Request */}
        <ValidationRequestPanel />

        {/* Section D: Before/After Comparison */}
        <div className="mt-2">
          <ComparisonPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
