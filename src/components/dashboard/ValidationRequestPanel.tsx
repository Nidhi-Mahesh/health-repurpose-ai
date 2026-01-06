import { useState } from "react";
import { Users, Send, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const clinicians = [
  { id: "1", name: "Dr. Sarah Chen", specialty: "Infectious Disease" },
  { id: "2", name: "Dr. James Okonkwo", specialty: "Tropical Medicine" },
  { id: "3", name: "Dr. Maria Santos", specialty: "Clinical Pharmacology" },
  { id: "4", name: "Dr. Raj Patel", specialty: "Internal Medicine" },
];

const validationQuestions = [
  { id: "q1", text: "Have you observed similar therapeutic outcomes in practice?" },
  { id: "q2", text: "Is the proposed dosage feasible for this indication?" },
  { id: "q3", text: "Are there known contraindications we should consider?" },
  { id: "q4", text: "Would you recommend further preclinical investigation?" },
];

const ValidationRequestPanel = () => {
  const [open, setOpen] = useState(false);
  const [selectedClinician, setSelectedClinician] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleQuestionToggle = (questionId: string) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      toast.success("Contextual review request sent successfully", {
        description: `Request sent to ${
          clinicians.find((c) => c.id === selectedClinician)?.name
        }`,
      });
      setOpen(false);
      setSubmitted(false);
      setSelectedClinician("");
      setSelectedQuestions([]);
    }, 1500);
  };

  return (
    <Card className="card-elevated transition-opacity duration-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Users className="w-4 h-4 text-primary" />
          </div>
          Domain Expert Review
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground text-sm max-w-sm">
              Request a domain expert contextual review to improve hypothesis accuracy
              and feasibility assessment.
            </p>
            <p className="text-xs text-muted-foreground">
              Collaborative AI-human workflow
            </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="azure" className="gap-2">
                <Users className="w-4 h-4" />
                Request Contextual Review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Request Contextual Review</DialogTitle>
                <DialogDescription>
                  Select a domain expert and contextual review questions to send your
                  request.
                </DialogDescription>
              </DialogHeader> 

              {!submitted ? (
                <div className="space-y-6 py-4">
                  {/* Clinician Selection */}
                  <div className="space-y-2">
                    <Label>Select Clinician</Label>
                    <Select
                      value={selectedClinician}
                      onValueChange={setSelectedClinician}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a clinician..." />
                      </SelectTrigger>
                      <SelectContent>
                        {clinicians.map((clinician) => (
                          <SelectItem key={clinician.id} value={clinician.id}>
                            <span className="font-medium">{clinician.name}</span>
                            <span className="text-muted-foreground ml-2 text-xs">
                              — {clinician.specialty}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Questions Selection */}
                  <div className="space-y-3">
                    <Label>Contextual Review Questions</Label>
                    <div className="space-y-2">
                      {validationQuestions.map((question) => (
                        <div
                          key={question.id}
                          className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                        >
                          <Checkbox
                            id={question.id}
                            checked={selectedQuestions.includes(question.id)}
                            onCheckedChange={() =>
                              handleQuestionToggle(question.id)
                            }
                          />
                          <Label
                            htmlFor={question.id}
                            className="text-sm font-normal cursor-pointer leading-relaxed"
                          >
                            {question.text}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  </div>
                  <p className="text-sm font-medium">Sending request...</p>
                </div>
              )}

              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="azure"
                  onClick={handleSubmit}
                  disabled={
                    !selectedClinician ||
                    selectedQuestions.length === 0 ||
                    submitted
                  }
                  className="gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Request
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default ValidationRequestPanel;
