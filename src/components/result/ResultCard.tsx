import type { DiagnosisResult, RiskLevel } from '@/types';
import { RiskIndicator } from './RiskIndicator';
import { Badge } from '@/components/ui/Badge';
import { URGENCY_LABELS, RISK_LABELS } from '@/lib/diagnosis';

interface ResultCardProps {
  diagnosis: DiagnosisResult;
}

const STATUS_COLORS: Record<RiskLevel, { dot: string; badge: 'success' | 'warning' | 'danger' }> = {
  low: { dot: 'bg-green-500', badge: 'success' },
  medium: { dot: 'bg-amber-500', badge: 'warning' },
  high: { dot: 'bg-red-500', badge: 'danger' },
};

export function ResultCard({ diagnosis }: ResultCardProps) {
  const sc = STATUS_COLORS[diagnosis.riskLevel];

  return (
    <div className="space-y-3">
      {/* Status + risk */}
      <div className="bg-white dark:bg-white/[0.07] rounded-2xl p-5 border border-gray-100 dark:border-white/[0.08] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className={`w-2.5 h-2.5 rounded-full ${sc.dot} flex-shrink-0`} />
          <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
            Состояние крыши
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xl text-gray-900 dark:text-white leading-tight" style={{ fontWeight: 800 }}>
              {diagnosis.statusLabel}
            </p>
            <div className="flex gap-2 mt-2 flex-wrap">
              <Badge variant={sc.badge} size="md">Риск: {RISK_LABELS[diagnosis.riskLevel]}</Badge>
              <Badge variant={sc.badge} size="md">Срочность: {URGENCY_LABELS[diagnosis.urgency]}</Badge>
            </div>
          </div>
          <RiskIndicator level={diagnosis.riskLevel} percent={diagnosis.riskPercent} />
        </div>
      </div>

      {/* Probable cause */}
      <div className="bg-white dark:bg-white/[0.07] rounded-2xl p-5 border border-gray-100 dark:border-white/[0.08] shadow-sm">
        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
          Вероятная причина
        </p>
        <p className="text-base text-gray-900 dark:text-white mb-2.5" style={{ fontWeight: 700 }}>
          {diagnosis.probableCause}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{diagnosis.description}</p>
      </div>

      {/* Consequence */}
      <div className="bg-amber-50 dark:bg-amber-500/10 rounded-2xl p-4 border border-amber-100 dark:border-amber-500/20">
        <div className="flex gap-3">
          <span className="text-lg flex-shrink-0 mt-0.5">⚠️</span>
          <div>
            <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-1">
              Что будет, если отложить
            </p>
            <p className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">{diagnosis.consequence}</p>
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-brand-gradient rounded-2xl p-4 text-white">
        <div className="flex gap-3">
          <span className="text-lg flex-shrink-0 mt-0.5">✅</span>
          <div>
            <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1">
              Рекомендуемый шаг
            </p>
            <p className="text-sm leading-relaxed">{diagnosis.recommendation}</p>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-gray-400 dark:text-gray-500 text-center px-2 leading-relaxed pb-1">
        Это предварительная оценка. Точный вывод специалист даст после просмотра фото или выезда на объект.
      </p>
    </div>
  );
}
