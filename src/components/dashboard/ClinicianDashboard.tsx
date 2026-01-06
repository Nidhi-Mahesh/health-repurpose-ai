import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Send,
  Clock,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ClinicianDashboardProps {
  selectedDisease: string;
}

interface ValidationRequest {
  id: string;
  drug: string;
  disease: string;
  confidence: number;
  requestedBy: string;
  requestedAt: string;
  status: "pending" | "completed";
}

interface ValidationQuestion {
  id: string;
  question: string;
  answer: "yes" | "no" | "unsure" | null;
}

const pendingValidations: ValidationRequest[] = [
  {
    id: "1",
    drug: "Chloroquine",
    disease: "Dengue",
    confidence: 78,
    requestedBy: "Dr. Sarah Chen",
    requestedAt: "2 hours ago",
    status: "pending",
  },
  {
    id: "2",
    drug: "Metformin",
    disease: "Dengue",
    confidence: 72,
    requestedBy: "Dr. Michael Ross",
    requestedAt: "5 hours ago",
    status: "pending",
  },
  {
    id: "3",
    drug: "Ivermectin",
    disease: "Zika",
    confidence: 65,
    requestedBy: "Dr. Sarah Chen",
    requestedAt: "1 day ago",
    status: "pending",
  },
];

const defaultQuestions: ValidationQuestion[] = [
  {
    id: "q1",
    question:
      "Have you observed similar therapeutic outcomes with this drug in clinical practice?",
    answer: null,
  },
  {
    id: "q2",
    question:
      "Is the proposed mechanism of action consistent with known pharmacology?",
    answer: null,
  },
  {
    id: "q3",
    question:
      "Are there known drug interactions that would limit feasibility?",
    answer: null,
  },
  {
    id: "q4",
    question:
      "Would you recommend this hypothesis for further preclinical investigation?",
    answer: null,
  },
];

const ClinicianDashboard = ({ selectedDisease }: ClinicianDashboardProps) => {
  const [selectedRequest, setSelectedRequest] =
    useState<ValidationRequest | null>(null);
  const [questions, setQuestions] =
    useState<ValidationQuestion[]>(defaultQuestions);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (
    questionId: string,
    answer: "yes" | "no" | "unsure"
  ) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, answer } : q))
    );
  };

  const handleSubmit = () => {
    setSubmitted(true);
    toast.success("Contextual review submitted successfully", {
      description: "Your domain expert feedback has been recorded.",
    });
    setTimeout(() => {
      setSelectedRequest(null);
      setQuestions(defaultQuestions);
      setComment("");
      setSubmitted(false);
    }, 2000);
  };

  const handleSelectRequest = (request: ValidationRequest) => {
    setSelectedRequest(request);
    setQuestions(defaultQuestions);
    setComment("");
    setSubmitted(false);
  };

  const allAnswered = questions.every((q) => q.answer !== null);

  const filteredValidations = pendingValidations.filter(
    (v) =>
      selectedDisease === "all" ||
      v.disease.toLowerCase() === selectedDisease.toLowerCase()
  );

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-foreground">
          Domain Expert Dashboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Conduct contextual review of AI-generated drug repurposing hypotheses
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pending Validations List */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="card-elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-azure" />
                Pending Contextual Reviews
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredValidations.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-4">
                  No pending contextual reviews for this disease.
                </p>
              ) : (
                filteredValidations.map((request) => (
                  <button
                    key={request.id}
                    onClick={() => handleSelectRequest(request)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      selectedRequest?.id === request.id
                        ? "border-azure bg-azure/5"
                        : "border-border hover:border-azure/50 hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-foreground">
                          {request.drug}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          for {request.disease}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-700 border-amber-200"
                      >
                        {request.confidence}%
                      </Badge>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      <span>Requested by {request.requestedBy}</span>
                      <span className="mx-1">•</span>
                      <span>{request.requestedAt}</span>
                    </div>
                  </button>
                ))
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="card-elevated">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-azure">
                    {filteredValidations.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">12</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Validation Form */}
        <div className="lg:col-span-2 space-y-4">
          {selectedRequest ? (
            <>
              {/* Hypothesis Summary */}
              <Card className="card-elevated animate-fade-in">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-azure" />
                    Hypothesis Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Drug Candidate
                        </label>
                        <p className="text-foreground font-semibold text-lg mt-1">
                          {selectedRequest.drug}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Target Disease
                        </label>
                        <p className="text-foreground font-medium mt-1">
                          {selectedRequest.disease}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Evidence Strength Score
                        </label>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="progress-bar w-32">
                            <div
                              className="progress-bar-fill bg-success"
                              style={{
                                width: `${selectedRequest.confidence}%`,
                              }}
                            />
                          </div>
                          <span className="font-semibold text-success">
                            {selectedRequest.confidence}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Source of Evidence
                        </label>
                        <p className="text-foreground font-medium mt-1">
                          Literature Review (12 papers)
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Proposed Mechanism
                        </label>
                        <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                          Inhibition of viral entry through endosomal pH
                          modification and interference with glycosylation of
                          cellular receptors.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Validation Questions */}
              <Card className="card-elevated animate-fade-in">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold">
                    Contextual Review Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {questions.map((question, index) => (
                    <div key={question.id} className="space-y-3">
                      <p className="text-foreground font-medium">
                        {index + 1}. {question.question}
                      </p>
                      <RadioGroup
                        value={question.answer || ""}
                        onValueChange={(value) =>
                          handleAnswerChange(
                            question.id,
                            value as "yes" | "no" | "unsure"
                          )
                        }
                        className="flex gap-6"
                        disabled={submitted}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="yes"
                            id={`${question.id}-yes`}
                          />
                          <Label
                            htmlFor={`${question.id}-yes`}
                            className="flex items-center gap-1.5 cursor-pointer"
                          >
                            <CheckCircle2 className="w-4 h-4 text-success" />
                            Yes
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="no"
                            id={`${question.id}-no`}
                          />
                          <Label
                            htmlFor={`${question.id}-no`}
                            className="flex items-center gap-1.5 cursor-pointer"
                          >
                            <AlertTriangle className="w-4 h-4 text-destructive" />
                            No
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="unsure"
                            id={`${question.id}-unsure`}
                          />
                          <Label
                            htmlFor={`${question.id}-unsure`}
                            className="flex items-center gap-1.5 cursor-pointer"
                          >
                            <HelpCircle className="w-4 h-4 text-muted-foreground" />
                            Unsure
                          </Label>
                        </div>
                      </RadioGroup>
                      {index < questions.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}

                  {/* Optional Comment */}
                  <div className="pt-4 space-y-2">
                    <Label htmlFor="comment" className="font-medium">
                      Additional Comments (Optional)
                    </Label>
                    <Textarea
                      id="comment"
                      placeholder="Provide any additional domain expert insights or concerns..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="min-h-[100px] resize-none"
                      disabled={submitted}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      variant="azure"
                      size="lg"
                      className="w-full gap-2"
                      disabled={!allAnswered || submitted}
                      onClick={handleSubmit}
                    >
                      {submitted ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          Contextual Review Submitted
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Submit Contextual Review
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Disclaimer */}
              <Card className="border-amber-200 bg-amber-50/50">
                <CardContent className="py-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">
                        Research Contextual Review Disclaimer
                      </p>
                      <p className="text-sm text-amber-700 mt-1">
                        This contextual review is for research purposes only. It does
                        not constitute medical advice, patient care
                        recommendations, or prescriptions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="card-elevated">
              <CardContent className="py-16 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Select a Contextual Review Request
                </h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  Choose a pending contextual review from the list on the left to examine the hypothesis and provide your domain expert feedback.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicianDashboard;
