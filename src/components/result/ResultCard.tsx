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
    <div className="space-y-4">
      {/* Status header */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className={`w-2.5 h-2.5 rounded-full ${sc.dot} flex-shrink-0`} />
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Состояние крыши
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xl font-800 text-gray-900 leading-tight" style={{ fontWeight: 800 }}>
              {diagnosis.statusLabel}
            </p>
            <div className="flex gap-2 mt-2 flex-wrap">
              <Badge variant={sc.badge} size="md">
                Риск: {RISK_LABELS[diagnosis.riskLevel]}
              </Badge>
              <Badge variant={sc.badge} size="md">
                Срочность: {URGENCY_LABELS[diagnosis.urgency]}
              </Badge>
            </div>
          </div>
          <RiskIndicator level={diagnosis.riskLevel} percent={diagnosis.riskPercent} />
        </div>
      </div>

      {/* Probable cause */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Вероятная причина
        </p>
        <p className="text-base font-700 text-gray-900 mb-3" style={{ fontWeight: 700 }}>
          {diagnosis.probableCause}
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">{diagnosis.description}</p>
      </div>

      {/* Consequence */}
      <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
        <div className="flex gap-3">
          <span className="text-xl flex-shrink-0">⚠️</span>
          <div>
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1">
              Что будет, если отложить
            </p>
            <p className="text-sm text-amber-900 leading-relaxed">{diagnosis.consequence}</p>
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-brand-gradient rounded-2xl p-5 text-white">
        <div className="flex gap-3">
          <span className="text-xl flex-shrink-0">✅</span>
          <div>
            <p className="text-xs font-semibold text-white/70 uppercase tracking-wide mb-1">
              Рекомендуемый шаг
            </p>
            <p className="text-sm leading-relaxed">{diagnosis.recommendation}</p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 text-center px-2 leading-relaxed">
        Это предварительная оценка, а не окончательный диагноз. Точный вывод специалист сможет дать после просмотра фото или выезда на объект.
      </p>
    </div>
  );
}
