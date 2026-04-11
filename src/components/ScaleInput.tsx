interface ScaleInputProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  labels?: string[];
}

const ScaleInput = ({ label, value, onChange, min = 0, max = 5, labels }: ScaleInputProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: max - min + 1 }, (_, i) => i + min).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
              value === v
                ? "gradient-primary text-primary-foreground shadow-soft scale-110"
                : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
      {labels && (
        <div className="flex justify-between text-[10px] text-muted-foreground px-1">
          <span>{labels[0]}</span>
          <span>{labels[labels.length - 1]}</span>
        </div>
      )}
    </div>
  );
};

export default ScaleInput;
