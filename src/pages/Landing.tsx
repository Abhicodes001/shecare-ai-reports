import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart, Shield, Brain, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Heart, title: "PCOS Detection", desc: "Hormonal imbalance screening" },
  { icon: Shield, title: "Endometriosis", desc: "Symptom-based risk analysis" },
  { icon: Brain, title: "Mental Health", desc: "PHQ-9 & EPDS screening" },
  { icon: Activity, title: "Menopause", desc: "MRS-based monitoring" },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <div className="gradient-hero text-primary-foreground px-4 pt-16 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary-foreground/20"
              style={{
                width: `${60 + i * 40}px`, height: `${60 + i * 40}px`,
                top: `${10 + i * 15}%`, left: `${5 + i * 18}%`,
              }}
            />
          ))}
        </div>
        <motion.div
          className="relative z-10 max-w-md mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold font-heading mb-3 leading-tight">
            SheCare AI
          </h1>
          <p className="text-primary-foreground/80 text-sm leading-relaxed mb-8">
            AI-powered early detection for women's health. Clinically validated questionnaires with intelligent risk analysis.
          </p>
          <Button
            onClick={() => navigate("/register")}
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8 py-3 rounded-xl text-base shadow-elevated"
          >
            Get Started
          </Button>
        </motion.div>
      </div>

      {/* Features */}
      <div className="px-4 -mt-10 max-w-md mx-auto w-full">
        <div className="grid grid-cols-2 gap-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="bg-card rounded-xl p-4 shadow-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-3">
                <f.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="font-heading font-semibold text-sm text-foreground">{f.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 py-12 max-w-md mx-auto w-full text-center">
        <p className="text-xs text-muted-foreground">
          This tool is for educational purposes and does not replace professional medical advice.
        </p>
      </div>
    </div>
  );
};

export default Landing;
