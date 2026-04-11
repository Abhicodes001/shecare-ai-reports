import type { PCOSData, EndometriosisData, PostpartumData, PHQ9Data, MenopauseData, BehavioralData, RiskResult, HealthReport, UserProfile } from "@/contexts/HealthContext";

type RiskLevel = "Low" | "Moderate" | "High";

function toLevel(score: number, max: number): RiskLevel {
  const pct = score / max;
  if (pct >= 0.6) return "High";
  if (pct >= 0.35) return "Moderate";
  return "Low";
}

export function calculatePCOSRisk(d: PCOSData): number {
  let score = 0;
  if (d.cycleLength > 35 || d.cycleLength < 21) score += 3;
  else if (d.cycleLength > 30) score += 1;
  if (d.irregularPeriods === "often") score += 3;
  else if (d.irregularPeriods === "sometimes") score += 1;
  score += d.acneSeverity * 0.6;
  if (d.hairThinning) score += 2;
  if (d.excessHair) score += 3;
  if (d.weightGain) score += 2;
  score += d.fatigueLevel * 0.4;
  return Math.min(score, 18);
}

export function calculateEndoRisk(d: EndometriosisData): number {
  let score = d.pelvicPain * 0.5;
  if (d.menstrualPain === "severe") score += 4;
  else if (d.menstrualPain === "moderate") score += 2;
  else if (d.menstrualPain === "mild") score += 1;
  if (d.heavyBleeding) score += 2;
  if (d.painDuringIntercourse) score += 3;
  if (d.digestiveDiscomfort) score += 2;
  if (d.lowerBackPain) score += 2;
  return Math.min(score, 18);
}

export function calculatePostpartumRisk(d: PostpartumData): number {
  return d.sadOrMiserable + d.anxiousOrWorried + d.troubleSleeping + d.overwhelmed + d.lostInterest;
}

export function calculatePHQ9Risk(d: PHQ9Data): number {
  return d.littleInterest + d.feelingDown + d.sleepTrouble + d.feelingTired + d.difficultyConcentrating;
}

export function calculateMenopauseRisk(d: MenopauseData): number {
  return d.hotFlashes + d.nightSweats + d.sleepProblems + d.moodChanges + d.jointDiscomfort + d.fatigue;
}

export function computeRisks(
  pcos: PCOSData | null,
  endo: EndometriosisData | null,
  postpartum: PostpartumData | null,
  phq9: PHQ9Data | null,
  menopause: MenopauseData | null,
  behavioral: BehavioralData | null
): RiskResult {
  const pcosScore = pcos ? calculatePCOSRisk(pcos) : 0;
  const endoScore = endo ? calculateEndoRisk(endo) : 0;
  let ppScore = postpartum ? calculatePostpartumRisk(postpartum) : 0;
  const phq9Score = phq9 ? calculatePHQ9Risk(phq9) : 0;
  const menoScore = menopause ? calculateMenopauseRisk(menopause) : 0;

  // Behavioral adjustments
  if (behavioral) {
    if (behavioral.sleepHours < 5) { ppScore += 2; }
    if (behavioral.stressLevel >= 8) { ppScore += 1; }
  }

  // Combine postpartum + phq9 for mental health
  const mentalScore = ppScore + phq9Score;

  return {
    pcos: toLevel(pcosScore, 18),
    endometriosis: toLevel(endoScore, 18),
    postpartumDepression: toLevel(mentalScore, 30),
    menopause: toLevel(menoScore, 24),
    pcosScore: Math.round((pcosScore / 18) * 100),
    endometriosisScore: Math.round((endoScore / 18) * 100),
    postpartumScore: Math.round((mentalScore / 30) * 100),
    menopauseScore: Math.round((menoScore / 24) * 100),
  };
}

export function generateReport(profile: UserProfile, risk: RiskResult, pcos: PCOSData | null, endo: EndometriosisData | null): HealthReport {
  const symptoms: string[] = [];
  const conditions: string[] = [];
  const recs: string[] = [];

  if (pcos) {
    if (pcos.irregularPeriods !== "never") symptoms.push("Irregular menstrual periods");
    if (pcos.acneSeverity >= 3) symptoms.push("Moderate to severe acne");
    if (pcos.excessHair) symptoms.push("Excess facial/body hair (hirsutism)");
    if (pcos.hairThinning) symptoms.push("Hair thinning or hair loss");
    if (pcos.weightGain) symptoms.push("Unexplained weight gain");
  }
  if (endo) {
    if (endo.pelvicPain >= 5) symptoms.push("Significant pelvic pain");
    if (endo.menstrualPain === "severe" || endo.menstrualPain === "moderate") symptoms.push("Painful menstruation (dysmenorrhea)");
    if (endo.heavyBleeding) symptoms.push("Heavy menstrual bleeding");
    if (endo.painDuringIntercourse) symptoms.push("Dyspareunia (pain during intercourse)");
  }

  if (risk.pcos === "High") {
    conditions.push("Polycystic Ovary Syndrome (PCOS)");
    recs.push("Consultation with an endocrinologist or gynecologist for hormonal panel and ultrasound is strongly recommended.");
  }
  if (risk.endometriosis === "High" || risk.endometriosis === "Moderate") {
    conditions.push("Endometriosis");
    recs.push("Pelvic examination and potential laparoscopy should be considered.");
  }
  if (risk.postpartumDepression === "High" || risk.postpartumDepression === "Moderate") {
    conditions.push("Postpartum Depression / Major Depressive Disorder");
    recs.push("Referral to a mental health professional for comprehensive evaluation is advised.");
  }
  if (risk.menopause === "High" || risk.menopause === "Moderate") {
    conditions.push("Menopause-related complications");
    recs.push("Hormone replacement therapy (HRT) evaluation with a healthcare provider is recommended.");
  }

  if (conditions.length === 0) conditions.push("No significant risk factors identified at this time.");
  if (recs.length === 0) recs.push("Continue regular health checkups and maintain a healthy lifestyle.");

  const recommendation = recs.join(" ") + " Regular follow-up screenings are advised to monitor any changes in symptoms.";

  let overview = `Patient ${profile.name}, age ${profile.age}. `;
  if (profile.postpartumStatus) overview += "Currently in postpartum period. ";
  overview += `Menopause stage: ${profile.menopauseStage}. `;
  overview += `Assessment completed on ${new Date().toLocaleDateString()}.`;

  return {
    generatedAt: new Date().toISOString(),
    patientOverview: overview,
    symptomsRecorded: symptoms.length > 0 ? symptoms : ["No significant symptoms reported"],
    riskAssessment: risk,
    possibleConditions: conditions,
    recommendation,
  };
}
