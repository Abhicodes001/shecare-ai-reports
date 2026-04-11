interface RiskBadgeProps {
  level: "Low" | "Moderate" | "High";
}

const RiskBadge = ({ level }: RiskBadgeProps) => {
  const colorClass =
    level === "Low" ? "bg-risk-low/15 text-risk-low" :
    level === "Moderate" ? "bg-risk-moderate/15 text-risk-moderate" :
    "bg-risk-high/15 text-risk-high";

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${colorClass}`}>
      {level === "Low" && "●"} {level === "Moderate" && "▲"} {level === "High" && "■"} {level}
    </span>
  );
};

export default RiskBadge;
