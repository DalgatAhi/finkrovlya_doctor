import type { Lead, RiskLevel } from '@/types';
import { URGENCY_LABELS, RISK_LABELS } from '@/lib/diagnosis';

interface LeadCardProps {
  lead: Lead;
}

const RISK_STYLES: Record<RiskLevel, string> = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-red-100 text-red-700',
};

export function LeadCard({ lead }: LeadCardProps) {
  const date = new Date(lead.createdAt).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  const tg = lead.telegramUser;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="font-700 text-gray-900 text-[15px]" style={{ fontWeight: 700 }}>
              {lead.answers.name || '—'}
            </span>
            <span className="text-sm text-gray-500 ml-2">{lead.answers.phone || '—'}</span>
          </div>
          <span className="text-xs text-gray-400 flex-shrink-0">{date}</span>
        </div>

        {/* Telegram user info */}
        {tg && (
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-xs bg-[#2481cc]/10 text-[#2481cc] rounded-full px-2 py-0.5 font-medium">
              Telegram
            </span>
            {tg.username && (
              <span className="text-xs text-gray-500">@{tg.username}</span>
            )}
            <span className="text-xs text-gray-400">ID: {tg.id}</span>
            {tg.language_code && (
              <span className="text-xs text-gray-400">· {tg.language_code.toUpperCase()}</span>
            )}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          {[
            ['Проблема', lead.answers.concern],
            ['Зона', lead.answers.location],
            ['Когда', lead.answers.timing],
            ['Тип крыши', lead.answers.roofType],
            ['Срочность', URGENCY_LABELS[lead.diagnosis.urgency]],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">{label}</p>
              <p className="text-[13px] text-gray-800 font-medium mt-0.5 leading-snug">{value || '—'}</p>
            </div>
          ))}
        </div>

        <div>
          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide mb-1">Вероятная причина</p>
          <p className="text-sm text-gray-800">{lead.diagnosis.probableCause}</p>
        </div>

        {lead.answers.comment && (
          <div>
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide mb-1">Комментарий</p>
            <p className="text-sm text-gray-700 italic">"{lead.answers.comment}"</p>
          </div>
        )}

        {/* Risk */}
        <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${RISK_STYLES[lead.diagnosis.riskLevel]}`}>
          Риск {RISK_LABELS[lead.diagnosis.riskLevel]} · {lead.diagnosis.riskPercent}%
        </span>

        {/* Photos */}
        {lead.answers.photos.length > 0 && (
          <div>
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide mb-2">
              Фото ({lead.answers.photos.length})
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {lead.answers.photos.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Фото ${i + 1}`}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-gray-100"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
