import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useHealth } from "@/contexts/HealthContext";
import RiskGauge from "@/components/RiskGauge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, RefreshCw, Stethoscope } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const { riskResult, userProfile, healthReport } = useHealth();

  if (!riskResult || !userProfile) { navigate("/"); return null; }

  const chartData = [
    { name: "PCOS", value: riskResult.pcosScore, color: "hsl(267, 56%, 53%)" },
    { name: "Endometriosis", value: riskResult.endometriosisScore, color: "hsl(174, 62%, 47%)" },
    { name: "Depression", value: riskResult.postpartumScore, color: "hsl(38, 92%, 50%)" },
    { name: "Menopause", value: riskResult.menopauseScore, color: "hsl(0, 72%, 51%)" },
  ];

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="gradient-hero text-primary-foreground px-4 pt-8 pb-12">
        <button onClick={() => navigate("/results")} className="flex items-center gap-1 text-primary-foreground/70 text-sm mb-3">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-xl font-heading font-bold">Health Dashboard</h1>
        <p className="text-primary-foreground/70 text-sm mt-1">Welcome, {userProfile.name}</p>
      </div>

      <div className="px-4 max-w-md mx-auto -mt-6 space-y-4">
        {/* Chart Card */}
        <motion.div className="bg-card rounded-2xl p-5 shadow-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-heading font-semibold text-foreground mb-4">Risk Distribution</h2>
          <div className="flex items-center gap-4">
            <div className="w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={30} outerRadius={55} dataKey="value" stroke="none">
                    {chartData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {chartData.map(d => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-xs text-foreground">{d.name}</span>
                  <span className="text-xs text-muted-foreground">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Gauges */}
        <motion.div className="bg-card rounded-2xl p-5 shadow-card space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="font-heading font-semibold text-foreground">Detailed Scores</h2>
          <RiskGauge label="PCOS" score={riskResult.pcosScore} level={riskResult.pcos} />
          <RiskGauge label="Endometriosis" score={riskResult.endometriosisScore} level={riskResult.endometriosis} />
          <RiskGauge label="Depression" score={riskResult.postpartumScore} level={riskResult.postpartumDepression} />
          <RiskGauge label="Menopause" score={riskResult.menopauseScore} level={riskResult.menopause} />
        </motion.div>

        {/* Reports */}
        {healthReport && (
          <motion.div className="bg-card rounded-2xl p-5 shadow-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="font-heading font-semibold text-foreground mb-3">Previous Reports</h2>
            <div className="bg-muted rounded-xl p-3 flex items-center gap-3">
              <FileText className="w-8 h-8 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Health Assessment Report</p>
                <p className="text-xs text-muted-foreground">{new Date(healthReport.generatedAt).toLocaleDateString()}</p>
              </div>
              <Button size="sm" variant="ghost" onClick={() => navigate("/report")}>View</Button>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button onClick={() => navigate("/questionnaire")} variant="outline" className="rounded-xl flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> New Assessment
          </Button>
          <Button onClick={() => navigate("/doctors")} className="rounded-xl gradient-primary text-primary-foreground flex items-center gap-2">
            <Stethoscope className="w-4 h-4" /> Find Doctor
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
