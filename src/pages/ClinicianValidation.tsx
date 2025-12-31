import { useState } from "react";
import { AlertTriangle, CheckCircle2, HelpCircle, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface ValidationQuestion {
  id: string;
  question: string;
  answer: "yes" | "no" | "unsure" | null;
}

const ClinicianValidation = () => {
  const [questions, setQuestions] = useState<ValidationQuestion[]>([
    {
      id: "q1",
      question:
        "Have you observed similar therapeutic outcomes with this drug in practice?",
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
    {
      id: "q5",
      question:
        "Is the suggested dosing regimen appropriate for the target indication?",
      answer: null,
    },
  ]);

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
  };

  const allAnswered = questions.every((q) => q.answer !== null);

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-2">
        <h1 className="text-2xl font-semibold text-foreground">
          Domain Expert Review
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Conduct contextual review of AI-generated drug repurposing hypotheses
        </p>
      </div>

      {/* Hypothesis Summary (Read-only) */}
      <Card className="card-elevated transition-opacity duration-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">
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
                  Chloroquine
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Target Disease
                </label>
                <p className="text-foreground font-medium mt-1">Dengue Fever</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Evidence Strength Score
                </label>
                <div className="flex items-center gap-3 mt-1">
                  <div className="progress-bar w-32">
                    <div
                      className="progress-bar-fill bg-success"
                      style={{ width: "78%" }}
                    />
                  </div>
                  <span className="font-semibold text-success">78%</span>
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
                  Inhibition of viral entry through endosomal pH modification
                  and interference with glycosylation of cellular receptors.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Questions */}
      <Card className="card-elevated transition-opacity duration-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">
            Contextual Review Questions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="space-y-3"
              style={{ animationDelay: `${index * 50}ms` }}
            >
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
                  <RadioGroupItem value="yes" id={`${question.id}-yes`} />
                  <Label
                    htmlFor={`${question.id}-yes`}
                    className="flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id={`${question.id}-no`} />
                  <Label
                    htmlFor={`${question.id}-no`}
                    className="flex items-center gap-1.5 cursor-pointer"
                  >
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    No
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unsure" id={`${question.id}-unsure`} />
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
                This contextual review is for research purposes only. It does not
                constitute medical advice, patient care recommendations, or
                prescriptions. All data is handled in compliance with research
                ethics guidelines.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicianValidation;
