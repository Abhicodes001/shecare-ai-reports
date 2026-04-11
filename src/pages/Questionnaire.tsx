import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useHealth } from "@/contexts/HealthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StepIndicator from "@/components/StepIndicator";
import ScaleInput from "@/components/ScaleInput";
import OptionToggle from "@/components/OptionToggle";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { PCOSData, EndometriosisData, PostpartumData, PHQ9Data, MenopauseData, BehavioralData } from "@/contexts/HealthContext";

const STEPS = ["PCOS", "Endo", "EPDS", "PHQ-9", "Meno", "Behavioral"];

const Questionnaire = () => {
  const navigate = useNavigate();
  const { setPcosData, setEndometriosisData, setPostpartumData, setPhq9Data, setMenopauseData, setBehavioralData } = useHealth();
  const [step, setStep] = useState(0);

  // PCOS
  const [pcos, setPcos] = useState<PCOSData>({ cycleLength: 28, irregularPeriods: "never", acneSeverity: 0, hairThinning: false, excessHair: false, weightGain: false, fatigueLevel: 1 });
  // Endo
  const [endo, setEndo] = useState<EndometriosisData>({ pelvicPain: 0, menstrualPain: "none", heavyBleeding: false, painDuringIntercourse: false, digestiveDiscomfort: false, lowerBackPain: false });
  // Postpartum
  const [pp, setPp] = useState<PostpartumData>({ sadOrMiserable: 0, anxiousOrWorried: 0, troubleSleeping: 0, overwhelmed: 0, lostInterest: 0 });
  // PHQ9
  const [phq9, setPhq9] = useState<PHQ9Data>({ littleInterest: 0, feelingDown: 0, sleepTrouble: 0, feelingTired: 0, difficultyConcentrating: 0 });
  // Meno
  const [meno, setMeno] = useState<MenopauseData>({ hotFlashes: 0, nightSweats: 0, sleepProblems: 0, moodChanges: 0, jointDiscomfort: 0, fatigue: 0 });
  // Behavioral
  const [beh, setBeh] = useState<BehavioralData>({ sleepHours: 7, activityLevel: "medium", stressLevel: 5, lateScreenUsage: false });

  const next = () => {
    if (step === 0) setPcosData(pcos);
    else if (step === 1) setEndometriosisData(endo);
    else if (step === 2) setPostpartumData(pp);
    else if (step === 3) setPhq9Data(phq9);
    else if (step === 4) setMenopauseData(meno);
    else if (step === 5) {
      setBehavioralData(beh);
      navigate("/analysis");
      return;
    }
    setStep(step + 1);
  };

  const back = () => step > 0 ? setStep(step - 1) : navigate("/register");

  const boolToggle = (val: boolean) => val ? "yes" : "no";

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="gradient-hero text-primary-foreground px-4 pt-8 pb-6">
        <button onClick={back} className="flex items-center gap-1 text-primary-foreground/70 text-sm mb-3">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-xl font-heading font-bold">Health Assessment</h1>
      </div>

      <div className="px-4 max-w-md mx-auto -mt-2">
        <StepIndicator steps={STEPS} currentStep={step} />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="bg-card rounded-2xl p-5 shadow-card mt-4 space-y-5"
          >
            {step === 0 && (
              <>
                <h2 className="font-heading font-semibold text-lg text-foreground">PCOS / Gynecological Screening</h2>
                <div className="space-y-2">
                  <Label>Average menstrual cycle length (days)</Label>
                  <Input type="number" value={pcos.cycleLength} onChange={e => setPcos({ ...pcos, cycleLength: parseInt(e.target.value) || 0 })} />
                </div>
                <OptionToggle label="Irregular periods?" value={pcos.irregularPeriods} options={[{ value: "never", label: "Never" }, { value: "sometimes", label: "Sometimes" }, { value: "often", label: "Often" }]} onChange={v => setPcos({ ...pcos, irregularPeriods: v })} />
                <ScaleInput label="Acne severity" value={pcos.acneSeverity} onChange={v => setPcos({ ...pcos, acneSeverity: v })} max={5} labels={["None", "Severe"]} />
                <OptionToggle label="Hair thinning or hair loss?" value={boolToggle(pcos.hairThinning)} options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} onChange={v => setPcos({ ...pcos, hairThinning: v === "yes" })} />
                <OptionToggle label="Excess facial or body hair?" value={boolToggle(pcos.excessHair)} options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} onChange={v => setPcos({ ...pcos, excessHair: v === "yes" })} />
                <OptionToggle label="Unexplained weight gain?" value={boolToggle(pcos.weightGain)} options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} onChange={v => setPcos({ ...pcos, weightGain: v === "yes" })} />
                <ScaleInput label="Fatigue level" value={pcos.fatigueLevel} onChange={v => setPcos({ ...pcos, fatigueLevel: v })} min={1} max={5} labels={["Low", "High"]} />
              </>
            )}
            {step === 1 && (
              <>
                <h2 className="font-heading font-semibold text-lg text-foreground">Endometriosis Screening</h2>
                <ScaleInput label="Pelvic pain severity" value={endo.pelvicPain} onChange={v => setEndo({ ...endo, pelvicPain: v })} max={10} labels={["None", "Severe"]} />
                <OptionToggle label="Pain during menstruation" value={endo.menstrualPain} options={[{ value: "none", label: "None" }, { value: "mild", label: "Mild" }, { value: "moderate", label: "Moderate" }, { value: "severe", label: "Severe" }]} onChange={v => setEndo({ ...endo, menstrualPain: v })} />
                <OptionToggle label="Heavy menstrual bleeding?" value={boolToggle(endo.heavyBleeding)} options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} onChange={v => setEndo({ ...endo, heavyBleeding: v === "yes" })} />
                <OptionToggle label="Pain during intercourse?" value={boolToggle(endo.painDuringIntercourse)} options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} onChange={v => setEndo({ ...endo, painDuringIntercourse: v === "yes" })} />
                <OptionToggle label="Digestive discomfort during menstruation?" value={boolToggle(endo.digestiveDiscomfort)} options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} onChange={v => setEndo({ ...endo, digestiveDiscomfort: v === "yes" })} />
                <OptionToggle label="Lower back pain during periods?" value={boolToggle(endo.lowerBackPain)} options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} onChange={v => setEndo({ ...endo, lowerBackPain: v === "yes" })} />
              </>
            )}
            {step === 2 && (
              <>
                <h2 className="font-heading font-semibold text-lg text-foreground">Postpartum Mental Health (EPDS)</h2>
                <p className="text-xs text-muted-foreground">Rate each on a 0–3 scale (0 = Not at all, 3 = Most of the time)</p>
                <ScaleInput label="I have felt sad or miserable recently" value={pp.sadOrMiserable} onChange={v => setPp({ ...pp, sadOrMiserable: v })} max={3} labels={["Not at all", "Most of the time"]} />
                <ScaleInput label="I have felt anxious or worried" value={pp.anxiousOrWorried} onChange={v => setPp({ ...pp, anxiousOrWorried: v })} max={3} labels={["Not at all", "Most of the time"]} />
                <ScaleInput label="I have had trouble sleeping" value={pp.troubleSleeping} onChange={v => setPp({ ...pp, troubleSleeping: v })} max={3} labels={["Not at all", "Most of the time"]} />
                <ScaleInput label="I feel overwhelmed by responsibilities" value={pp.overwhelmed} onChange={v => setPp({ ...pp, overwhelmed: v })} max={3} labels={["Not at all", "Most of the time"]} />
                <ScaleInput label="I have lost interest in activities I used to enjoy" value={pp.lostInterest} onChange={v => setPp({ ...pp, lostInterest: v })} max={3} labels={["Not at all", "Most of the time"]} />
              </>
            )}
            {step === 3 && (
              <>
                <h2 className="font-heading font-semibold text-lg text-foreground">General Mental Health (PHQ-9)</h2>
                <p className="text-xs text-muted-foreground">0 = Not at all, 1 = Several days, 2 = More than half the days, 3 = Nearly every day</p>
                <ScaleInput label="Little interest or pleasure in doing things" value={phq9.littleInterest} onChange={v => setPhq9({ ...phq9, littleInterest: v })} max={3} labels={["Not at all", "Nearly every day"]} />
                <ScaleInput label="Feeling down or depressed" value={phq9.feelingDown} onChange={v => setPhq9({ ...phq9, feelingDown: v })} max={3} labels={["Not at all", "Nearly every day"]} />
                <ScaleInput label="Trouble sleeping or sleeping too much" value={phq9.sleepTrouble} onChange={v => setPhq9({ ...phq9, sleepTrouble: v })} max={3} labels={["Not at all", "Nearly every day"]} />
                <ScaleInput label="Feeling tired or having little energy" value={phq9.feelingTired} onChange={v => setPhq9({ ...phq9, feelingTired: v })} max={3} labels={["Not at all", "Nearly every day"]} />
                <ScaleInput label="Difficulty concentrating" value={phq9.difficultyConcentrating} onChange={v => setPhq9({ ...phq9, difficultyConcentrating: v })} max={3} labels={["Not at all", "Nearly every day"]} />
              </>
            )}
            {step === 4 && (
              <>
                <h2 className="font-heading font-semibold text-lg text-foreground">Menopause Monitoring (MRS)</h2>
                <p className="text-xs text-muted-foreground">Rate each: 0 = None, 4 = Very Severe</p>
                <ScaleInput label="Hot flashes" value={meno.hotFlashes} onChange={v => setMeno({ ...meno, hotFlashes: v })} max={4} labels={["None", "Very Severe"]} />
                <ScaleInput label="Night sweats" value={meno.nightSweats} onChange={v => setMeno({ ...meno, nightSweats: v })} max={4} labels={["None", "Very Severe"]} />
                <ScaleInput label="Sleep problems" value={meno.sleepProblems} onChange={v => setMeno({ ...meno, sleepProblems: v })} max={4} labels={["None", "Very Severe"]} />
                <ScaleInput label="Mood changes" value={meno.moodChanges} onChange={v => setMeno({ ...meno, moodChanges: v })} max={4} labels={["None", "Very Severe"]} />
                <ScaleInput label="Joint or muscle discomfort" value={meno.jointDiscomfort} onChange={v => setMeno({ ...meno, jointDiscomfort: v })} max={4} labels={["None", "Very Severe"]} />
                <ScaleInput label="Fatigue" value={meno.fatigue} onChange={v => setMeno({ ...meno, fatigue: v })} max={4} labels={["None", "Very Severe"]} />
              </>
            )}
            {step === 5 && (
              <>
                <h2 className="font-heading font-semibold text-lg text-foreground">Behavioral Health Indicators</h2>
                <div className="space-y-2">
                  <Label>Average sleep hours per night</Label>
                  <Input type="number" value={beh.sleepHours} onChange={e => setBeh({ ...beh, sleepHours: parseFloat(e.target.value) || 0 })} />
                </div>
                <OptionToggle label="Daily activity level" value={beh.activityLevel} options={[{ value: "low", label: "Low" }, { value: "medium", label: "Medium" }, { value: "high", label: "High" }]} onChange={v => setBeh({ ...beh, activityLevel: v })} />
                <ScaleInput label="Stress level" value={beh.stressLevel} onChange={v => setBeh({ ...beh, stressLevel: v })} min={1} max={10} labels={["Low", "Extreme"]} />
                <OptionToggle label="Screen usage after midnight?" value={boolToggle(beh.lateScreenUsage)} options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} onChange={v => setBeh({ ...beh, lateScreenUsage: v === "yes" })} />
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <Button onClick={next} className="w-full mt-5 gradient-primary text-primary-foreground font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
          {step === 5 ? "Analyze Results" : "Next"} <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Questionnaire;
