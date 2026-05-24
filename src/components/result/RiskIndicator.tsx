import type { RiskLevel } from '@/types';

interface RiskIndicatorProps {
  level: RiskLevel;
  percent: number;
}

const CONFIG: Record<RiskLevel, { color: string; bg: string; label: string; ring: string }> = {
  low: {
    color: 'text-green-600',
    bg: 'bg-green-500',
    label: 'Низкий риск',
    ring: '#22C55E',
  },
  medium: {
    color: 'text-amber-600',
    bg: 'bg-amber-500',
    label: 'Средний риск',
    ring: '#F59E0B',
  },
  high: {
    color: 'text-red-600',
    bg: 'bg-red-500',
    label: 'Высокий риск',
    ring: '#EF4444',
  },
};

export function RiskIndicator({ level, percent }: RiskIndicatorProps) {
  const cfg = CONFIG[level];
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Track */}
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#F3F4F6" strokeWidth="10" />
          {/* Progress */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={cfg.ring}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-800 ${cfg.color}`} style={{ fontWeight: 800 }}>
            {percent}%
          </span>
        </div>
      </div>
      <span className={`text-sm font-semibold ${cfg.color}`}>{cfg.label}</span>
    </div>
  );
}
