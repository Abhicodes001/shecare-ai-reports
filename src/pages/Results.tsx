import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useHealth } from "@/contexts/HealthContext";
import RiskGauge from "@/components/RiskGauge";
import RiskBadge from "@/components/RiskBadge";
import { Button } from "@/components/ui/button";
import { FileText, Stethoscope, LayoutDashboard } from "lucide-react";

const Results = () => {
  const navigate = useNavigate();
  const { riskResult, userProfile } = useHealth();

  if (!riskResult || !userProfile) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="gradient-hero text-primary-foreground px-4 pt-10 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-heading font-bold">Risk Assessment</h1>
          <p className="text-primary-foreground/70 text-sm mt-1">Results for {userProfile.name}</p>
        </motion.div>
      </div>

      <div className="px-4 max-w-md mx-auto -mt-6 space-y-4">
        <motion.div className="bg-card rounded-2xl p-5 shadow-card space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-heading font-semibold text-foreground">Risk Overview</h2>
          <div className="grid grid-cols-2 gap-3">
            {([
              { label: "PCOS", level: riskResult.pcos },
              { label: "Endometriosis", level: riskResult.endometriosis },
              { label: "Depression", level: riskResult.postpartumDepression },
              { label: "Menopause", level: riskResult.menopause },
            ] as const).map(r => (
              <div key={r.label} className="bg-muted rounded-xl p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">{r.label}</p>
                <RiskBadge level={r.level} />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="bg-card rounded-2xl p-5 shadow-card space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="font-heading font-semibold text-foreground">Detailed Scores</h2>
          <RiskGauge label="PCOS" score={riskResult.pcosScore} level={riskResult.pcos} />
          <RiskGauge label="Endometriosis" score={riskResult.endometriosisScore} level={riskResult.endometriosis} />
          <RiskGauge label="Postpartum / Depression" score={riskResult.postpartumScore} level={riskResult.postpartumDepression} />
          <RiskGauge label="Menopause" score={riskResult.menopauseScore} level={riskResult.menopause} />
        </motion.div>

        <div className="grid grid-cols-3 gap-3">
          <Button onClick={() => navigate("/report")} variant="outline" className="flex flex-col items-center gap-1 py-4 h-auto rounded-xl">
            <FileText className="w-5 h-5 text-primary" />
            <span className="text-xs">Report</span>
          </Button>
          <Button onClick={() => navigate("/doctors")} variant="outline" className="flex flex-col items-center gap-1 py-4 h-auto rounded-xl">
            <Stethoscope className="w-5 h-5 text-teal" />
            <span className="text-xs">Consult</span>
          </Button>
          <Button onClick={() => navigate("/dashboard")} variant="outline" className="flex flex-col items-center gap-1 py-4 h-auto rounded-xl">
            <LayoutDashboard className="w-5 h-5 text-primary" />
            <span className="text-xs">Dashboard</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
