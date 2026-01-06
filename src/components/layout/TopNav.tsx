import { ChevronDown, FlaskConical } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface TopNavProps {
  selectedDisease: string;
  onDiseaseChange: (disease: string) => void;
  role: "researcher" | "clinician";
  onRoleChange: (role: "researcher" | "clinician") => void;
}

const TopNav = ({
  selectedDisease,
  onDiseaseChange,
  role,
  onRoleChange,
}: TopNavProps) => {
  return (
    <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-sm bg-primary flex items-center justify-center">
          <FlaskConical className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-foreground text-base leading-tight">
            ElaraX
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-6">
        {/* Disease Selector */}
        <div className="flex items-center gap-2">
          <Label className="text-sm text-muted-foreground whitespace-nowrap">
            Selected Disease
          </Label>
          <Select value={selectedDisease} onValueChange={onDiseaseChange}>
            <SelectTrigger className="w-[160px] bg-background">
              <SelectValue placeholder="Select disease" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dengue">Dengue</SelectItem>
              <SelectItem value="malaria">Malaria</SelectItem>
              <SelectItem value="zika">Zika Virus</SelectItem>
              <SelectItem value="chikungunya">Chikungunya</SelectItem>
              <SelectItem value="tuberculosis">Tuberculosis</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Role Toggle */}
        <div className="flex items-center gap-3 pl-6 border-l border-border">
          <span
            className={`text-sm transition-colors ${
              role === "researcher"
                ? "text-foreground font-medium"
                : "text-muted-foreground"
            }`}
          >
            Researcher
          </span>
          <Switch
            checked={role === "clinician"}
            onCheckedChange={(checked) =>
              onRoleChange(checked ? "clinician" : "researcher")
            }
          />
          <span
            className={`text-sm transition-colors ${
              role === "clinician"
                ? "text-foreground font-medium"
                : "text-muted-foreground"
            }`}
          >
            Clinician
          </span>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
