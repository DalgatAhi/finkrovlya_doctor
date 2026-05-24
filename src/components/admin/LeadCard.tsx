import type { Lead, RiskLevel } from '@/types';
import { URGENCY_LABELS, RISK_LABELS } from '@/lib/diagnosis';

interface LeadCardProps {
  lead: Lead;
}

const RISK_STYLES: Record<RiskLevel, string> = {
  low: 'bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400',
  medium: 'bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300',
  high: 'bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400',
};

export function LeadCard({ lead }: LeadCardProps) {
  const date = new Date(lead.createdAt).toLocaleString('ru-RU', {
    day: '2-digit', month: '2-digit', year: '2-digit',
    hour: '2-digit', minute: '2-digit',
  });
  const tgUser = lead.telegramUser;

  return (
    <div className="bg-white dark:bg-white/[0.07] rounded-2xl border border-gray-100 dark:border-white/[0.08] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-gray-50 dark:bg-white/[0.05] border-b border-gray-100 dark:border-white/[0.08]">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="font-bold text-gray-900 dark:text-white text-[15px]">
              {lead.answers.name || '—'}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">{lead.answers.phone || '—'}</span>
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0">{date}</span>
        </div>
        {tgUser && (
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-xs bg-[#2481cc]/10 text-[#2481cc] dark:bg-[#3a9bd5]/20 dark:text-[#5bb8f5] rounded-full px-2 py-0.5 font-medium">
              Telegram
            </span>
            {tgUser.username && <span className="text-xs text-gray-500 dark:text-gray-400">@{tgUser.username}</span>}
            <span className="text-xs text-gray-400 dark:text-gray-500">ID: {tgUser.id}</span>
            {tgUser.language_code && (
              <span className="text-xs text-gray-400 dark:text-gray-500">· {tgUser.language_code.toUpperCase()}</span>
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
              <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wide">{label}</p>
              <p className="text-[13px] text-gray-800 dark:text-gray-200 font-medium mt-0.5 leading-snug">{value || '—'}</p>
            </div>
          ))}
        </div>

        <div>
          <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wide mb-1">Вероятная причина</p>
          <p className="text-sm text-gray-800 dark:text-gray-200">{lead.diagnosis.probableCause}</p>
        </div>

        {lead.answers.comment && (
          <div>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wide mb-1">Комментарий</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 italic">"{lead.answers.comment}"</p>
          </div>
        )}

        <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${RISK_STYLES[lead.diagnosis.riskLevel]}`}>
          Риск {RISK_LABELS[lead.diagnosis.riskLevel]} · {lead.diagnosis.riskPercent}%
        </span>

        {lead.answers.photos.length > 0 && (
          <div>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wide mb-2">
              Фото ({lead.answers.photos.length})
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {lead.answers.photos.map((src, i) => (
                <img key={i} src={src} alt={`Фото ${i + 1}`}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-gray-100 dark:border-white/10"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
