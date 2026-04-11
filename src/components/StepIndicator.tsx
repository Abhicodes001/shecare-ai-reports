import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-1 px-4 py-3">
      {steps.map((label, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                i < currentStep
                  ? "bg-primary text-primary-foreground"
                  : i === currentStep
                  ? "gradient-primary text-primary-foreground shadow-soft"
                  : "bg-muted text-muted-foreground"
              }`}
              animate={i === currentStep ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
            </motion.div>
            <span className="text-[10px] mt-1 text-muted-foreground max-w-[60px] text-center leading-tight hidden sm:block">
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-6 sm:w-10 h-0.5 mx-1 rounded-full transition-colors ${i < currentStep ? "bg-primary" : "bg-muted"}`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
