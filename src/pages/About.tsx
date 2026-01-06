import { useState } from "react";
import {
  Shield,
  Lock,
  Users,
  Cpu,
  Cloud,
  CheckCircle2,
  ExternalLink,
  Server,
  Database,
  Brain,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const principles = [
  {
    icon: Shield,
    title: "No Patient Data Storage",
    description:
      "The platform processes only aggregated research data. No individual patient information is stored or transmitted.",
  },
  {
    icon: Lock,
    title: "Secure on Azure",
    description:
      "All data is encrypted at rest and in transit using Azure's enterprise-grade security infrastructure.",
  },
  {
    icon: Users,
    title: "Clinician-in-the-Loop",
    description:
      "Every AI hypothesis requires a domain expert contextual review before any downstream action can be taken.",
  },
  {
    icon: Cpu,
    title: "AI Assistive Only",
    description:
      "AI generates suggestions and confidence scores, but final decisions always rest with qualified researchers and clinicians.",
  },
];

const architectureSteps = [
  {
    step: 1,
    title: "Data Ingestion",
    description: "Literature and trial data aggregated from public sources",
    icon: Database,
    color: "bg-blue-500",
  },
  {
    step: 2,
    title: "AI Processing",
    description: "Azure OpenAI analyzes data for repurposing opportunities",
    icon: Brain,
    color: "bg-purple-500",
  },
  {
    step: 3,
    title: "Hypothesis Generation",
    description: "Azure ML ranks and scores potential drug candidates",
    icon: Server,
    color: "bg-indigo-500",
  },
  {
    step: 4,
    title: "Domain Expert Review",
    description: "Human experts perform contextual review of AI suggestions",
    icon: Users,
    color: "bg-teal-500",
  },
  {
    step: 5,
    title: "Insight Refinement",
    description: "Feedback loop improves future AI predictions",
    icon: Cpu,
    color: "bg-green-500",
  },
];

const About = () => {
  const [architectureOpen, setArchitectureOpen] = useState(false);

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-foreground">
          About ElaraX
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Learn about our platform architecture, security, and ethical AI
          principles
        </p>
      </div>

      {/* Mission Card */}
      <Card className="card-elevated transition-opacity duration-200 border-l-4 border-l-primary">
        <CardContent className="py-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
              <Cloud className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-lg text-foreground mb-2">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                ElaraX accelerates drug discovery for neglected tropical diseases by leveraging AI to identify potential drug repurposing candidates from existing approved medications. Our platform combines the power of Azure AI with rigorous domain expert review to ensure scientifically sound and ethically responsible research outcomes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Core Principles */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Core Principles
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {principles.map((principle, index) => (
            <Card
              key={principle.title}
              className="card-elevated transition-opacity duration-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="py-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                    <principle.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">
                      {principle.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Architecture Section */}
      <Card className="card-elevated animate-fade-in">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Platform Architecture
            </CardTitle>
            <Dialog open={architectureOpen} onOpenChange={setArchitectureOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  View Full Diagram
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>System Architecture</DialogTitle>
                  <DialogDescription>
                    End-to-end data flow and processing pipeline
                  </DialogDescription>
                </DialogHeader>
                <div className="py-6">
                  <div className="flex flex-col space-y-4">
                    {architectureSteps.map((step, index) => (
                      <div key={step.step} className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center shrink-0`}
                        >
                          <step.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-muted-foreground">
                              STEP {step.step}
                            </span>
                            <h4 className="font-medium text-foreground">
                              {step.title}
                            </h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                        {index < architectureSteps.length - 1 && (
                          <div className="w-8 h-0.5 bg-border" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-3">
            {architectureSteps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div
                    className={`w-10 h-10 rounded-lg ${step.color} flex items-center justify-center mb-3`}
                  >
                    <step.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground mb-1">
                    Step {step.step}
                  </span>
                  <h4 className="text-sm font-medium text-foreground">
                    {step.title}
                  </h4>
                </div>
                {index < architectureSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-1.5 w-3 h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance & Security */}
      <Card className="card-elevated animate-fade-in">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">
            Compliance & Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                Azure Security Features
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Azure Active Directory authentication
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  TLS 1.3 encryption for all data in transit
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Azure Key Vault for secrets management
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Comprehensive audit logging
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                Research Ethics Compliance
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  No individual patient data processing
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Transparent AI decision reasoning
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Mandatory human contextual review workflow
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Clear disclaimer on all outputs
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Azure Badge */}
      <div className="flex justify-center pt-4">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-azure-light border border-primary/20">
          <Cloud className="w-6 h-6 text-primary" />
          <div className="text-left">
            <p className="text-sm font-semibold text-primary">
              Built on Microsoft Azure
            </p>
            <p className="text-xs text-muted-foreground">
              Enterprise-grade cloud infrastructure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
