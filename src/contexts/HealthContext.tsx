import React, { createContext, useContext, useState, ReactNode } from "react";

export interface UserProfile {
  name: string;
  age: number;
  email: string;
  postpartumStatus: boolean;
  menopauseStage: "pre" | "peri" | "post";
}

export interface PCOSData {
  cycleLength: number;
  irregularPeriods: "never" | "sometimes" | "often";
  acneSeverity: number;
  hairThinning: boolean;
  excessHair: boolean;
  weightGain: boolean;
  fatigueLevel: number;
}

export interface EndometriosisData {
  pelvicPain: number;
  menstrualPain: "none" | "mild" | "moderate" | "severe";
  heavyBleeding: boolean;
  painDuringIntercourse: boolean;
  digestiveDiscomfort: boolean;
  lowerBackPain: boolean;
}

export interface PostpartumData {
  sadOrMiserable: number;
  anxiousOrWorried: number;
  troubleSleeping: number;
  overwhelmed: number;
  lostInterest: number;
}

export interface PHQ9Data {
  littleInterest: number;
  feelingDown: number;
  sleepTrouble: number;
  feelingTired: number;
  difficultyConcentrating: number;
}

export interface MenopauseData {
  hotFlashes: number;
  nightSweats: number;
  sleepProblems: number;
  moodChanges: number;
  jointDiscomfort: number;
  fatigue: number;
}

export interface BehavioralData {
  sleepHours: number;
  activityLevel: "low" | "medium" | "high";
  stressLevel: number;
  lateScreenUsage: boolean;
}

export interface RiskResult {
  pcos: "Low" | "Moderate" | "High";
  endometriosis: "Low" | "Moderate" | "High";
  postpartumDepression: "Low" | "Moderate" | "High";
  menopause: "Low" | "Moderate" | "High";
  pcosScore: number;
  endometriosisScore: number;
  postpartumScore: number;
  menopauseScore: number;
}

export interface HealthReport {
  generatedAt: string;
  patientOverview: string;
  symptomsRecorded: string[];
  riskAssessment: RiskResult;
  possibleConditions: string[];
  recommendation: string;
}

interface HealthContextType {
  userProfile: UserProfile | null;
  setUserProfile: (p: UserProfile) => void;
  pcosData: PCOSData | null;
  setPcosData: (d: PCOSData) => void;
  endometriosisData: EndometriosisData | null;
  setEndometriosisData: (d: EndometriosisData) => void;
  postpartumData: PostpartumData | null;
  setPostpartumData: (d: PostpartumData) => void;
  phq9Data: PHQ9Data | null;
  setPhq9Data: (d: PHQ9Data) => void;
  menopauseData: MenopauseData | null;
  setMenopauseData: (d: MenopauseData) => void;
  behavioralData: BehavioralData | null;
  setBehavioralData: (d: BehavioralData) => void;
  riskResult: RiskResult | null;
  setRiskResult: (r: RiskResult) => void;
  healthReport: HealthReport | null;
  setHealthReport: (r: HealthReport) => void;
  currentStep: number;
  setCurrentStep: (s: number) => void;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const HealthProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [pcosData, setPcosData] = useState<PCOSData | null>(null);
  const [endometriosisData, setEndometriosisData] = useState<EndometriosisData | null>(null);
  const [postpartumData, setPostpartumData] = useState<PostpartumData | null>(null);
  const [phq9Data, setPhq9Data] = useState<PHQ9Data | null>(null);
  const [menopauseData, setMenopauseData] = useState<MenopauseData | null>(null);
  const [behavioralData, setBehavioralData] = useState<BehavioralData | null>(null);
  const [riskResult, setRiskResult] = useState<RiskResult | null>(null);
  const [healthReport, setHealthReport] = useState<HealthReport | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <HealthContext.Provider value={{
      userProfile, setUserProfile,
      pcosData, setPcosData,
      endometriosisData, setEndometriosisData,
      postpartumData, setPostpartumData,
      phq9Data, setPhq9Data,
      menopauseData, setMenopauseData,
      behavioralData, setBehavioralData,
      riskResult, setRiskResult,
      healthReport, setHealthReport,
      currentStep, setCurrentStep,
    }}>
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  const ctx = useContext(HealthContext);
  if (!ctx) throw new Error("useHealth must be used within HealthProvider");
  return ctx;
};
