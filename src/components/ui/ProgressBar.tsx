interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
          Шаг {current} из {total}
        </span>
        <span className="text-xs font-semibold text-brand-blue dark:text-brand-purple">{percent}%</span>
      </div>
      <div className="h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-gradient rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
