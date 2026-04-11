import { motion } from "framer-motion";

interface RiskGaugeProps {
  label: string;
  score: number;
  level: "Low" | "Moderate" | "High";
}

const RiskGauge = ({ label, score, level }: RiskGaugeProps) => {
  const color =
    level === "Low" ? "hsl(var(--risk-low))" :
    level === "Moderate" ? "hsl(var(--risk-moderate))" :
    "hsl(var(--risk-high))";

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-xs font-bold" style={{ color }}>{level} ({score}%)</span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default RiskGauge;
