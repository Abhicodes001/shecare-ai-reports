import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useHealth } from "@/contexts/HealthContext";
import RiskBadge from "@/components/RiskBadge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Stethoscope } from "lucide-react";

const Report = () => {
  const navigate = useNavigate();
  const { healthReport, userProfile } = useHealth();

  if (!healthReport || !userProfile) { navigate("/"); return null; }

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="gradient-hero text-primary-foreground px-4 pt-8 pb-6">
        <button onClick={() => navigate("/results")} className="flex items-center gap-1 text-primary-foreground/70 text-sm mb-3">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-xl font-heading font-bold">Medical Report</h1>
        <p className="text-primary-foreground/70 text-xs mt-1">Generated {new Date(healthReport.generatedAt).toLocaleDateString()}</p>
      </div>

      <div className="px-4 max-w-md mx-auto -mt-3 space-y-4">
        <motion.div className="bg-card rounded-2xl p-5 shadow-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="border-b border-border pb-3 mb-4">
            <h2 className="font-heading font-bold text-primary text-sm">SHECARE AI — HEALTH ASSESSMENT REPORT</h2>
          </div>

          <section className="mb-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Patient Overview</h3>
            <p className="text-sm text-foreground">{healthReport.patientOverview}</p>
          </section>

          <section className="mb-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Symptoms Recorded</h3>
            <ul className="space-y-1">
              {healthReport.symptomsRecorded.map((s, i) => (
                <li key={i} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">•</span> {s}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">AI Risk Assessment</h3>
            <div className="grid grid-cols-2 gap-2">
              {([
                { label: "PCOS", level: healthReport.riskAssessment.pcos },
                { label: "Endometriosis", level: healthReport.riskAssessment.endometriosis },
                { label: "Depression", level: healthReport.riskAssessment.postpartumDepression },
                { label: "Menopause", level: healthReport.riskAssessment.menopause },
              ] as const).map(r => (
                <div key={r.label} className="flex items-center gap-2 bg-muted rounded-lg p-2">
                  <span className="text-xs text-foreground">{r.label}:</span>
                  <RiskBadge level={r.level} />
                </div>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Possible Conditions</h3>
            <ul className="space-y-1">
              {healthReport.possibleConditions.map((c, i) => (
                <li key={i} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-risk-moderate mt-1">▲</span> {c}
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-accent/50 rounded-xl p-4">
            <h3 className="text-xs font-bold text-accent-foreground uppercase tracking-wider mb-2">Recommendation</h3>
            <p className="text-sm text-foreground leading-relaxed">{healthReport.recommendation}</p>
          </section>
        </motion.div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="rounded-xl flex items-center gap-2">
            <Download className="w-4 h-4" /> Download
          </Button>
          <Button onClick={() => navigate("/doctors")} className="rounded-xl gradient-primary text-primary-foreground flex items-center gap-2">
            <Stethoscope className="w-4 h-4" /> Consult Doctor
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Report;
