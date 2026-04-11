interface OptionToggleProps<T extends string> {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}

function OptionToggle<T extends string>({ label, value, options, onChange }: OptionToggleProps<T>) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="flex gap-2 flex-wrap">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              value === opt.value
                ? "gradient-primary text-primary-foreground shadow-soft"
                : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default OptionToggle;
