import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useHealth } from "@/contexts/HealthContext";
import { computeRisks, generateReport } from "@/lib/riskEngine";
import { Brain } from "lucide-react";

const messages = [
  "Analyzing symptom patterns...",
  "Evaluating hormonal indicators...",
  "Running mental health screening...",
  "Computing menopause risk factors...",
  "Generating medical report...",
];

const Analysis = () => {
  const navigate = useNavigate();
  const { userProfile, pcosData, endometriosisData, postpartumData, phq9Data, menopauseData, behavioralData, setRiskResult, setHealthReport } = useHealth();
  const [msgIdx, setMsgIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!userProfile) { navigate("/"); return; }

    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 2;
      });
      setMsgIdx(i => Math.min(i + 1, messages.length - 1));
    }, 120);

    const timeout = setTimeout(() => {
      const risk = computeRisks(pcosData, endometriosisData, postpartumData, phq9Data, menopauseData, behavioralData);
      setRiskResult(risk);
      const report = generateReport(userProfile!, risk, pcosData, endometriosisData);
      setHealthReport(report);
      navigate("/results");
    }, 3500);

    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, []);

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
      <motion.div
        className="text-center text-primary-foreground"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          className="w-20 h-20 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Brain className="w-10 h-10" />
        </motion.div>
        <h2 className="text-xl font-heading font-bold mb-2">AI Analysis in Progress</h2>
        <p className="text-primary-foreground/70 text-sm mb-8">{messages[msgIdx]}</p>
        <div className="w-64 h-2 bg-primary-foreground/20 rounded-full mx-auto overflow-hidden">
          <motion.div
            className="h-full bg-primary-foreground rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-primary-foreground/50 mt-3">{progress}%</p>
      </motion.div>
    </div>
  );
};

export default Analysis;
