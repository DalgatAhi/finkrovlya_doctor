import { useNavigate } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { useTelegramMainButton } from '@/hooks/useTelegramButton';

export function Home() {
  const navigate = useNavigate();

  const go = () => navigate('/quiz');

  // In Telegram: MainButton handles CTA. In browser: inline button.
  const isTg = useTelegramMainButton('Начать диагностику', go);

  return (
    <div className="tg-page">
      {/* Compact header */}
      <header className="flex items-center justify-between px-4 pt-safe pt-3 pb-3 bg-[var(--tg-theme-bg-color,#fff)]">
        <Logo />
        <span className="text-xs font-semibold text-brand-purple bg-brand-gradient-soft border border-brand-purple/20 rounded-full px-3 py-1">
          Фирменная диагностика
        </span>
      </header>

      {/* Scrollable body */}
      <div className="tg-scroll px-4 pb-2">

        {/* Hero — gradient card */}
        <div className="bg-brand-gradient rounded-3xl p-5 mb-4 shadow-lg shadow-brand-blue/20 relative overflow-hidden">
          <HeroPattern />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 text-[11px] font-semibold text-white mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Доступно прямо сейчас
            </span>
            <h1 className="text-xl leading-tight text-white mb-1.5" style={{ fontWeight: 800 }}>
              Кровельный Доктор<br />от ФИН КРОВЛЯ
            </h1>
            <p className="text-[13px] text-white/75 leading-relaxed mb-4">
              Проверьте крышу за 2 минуты. Ответьте на вопросы, загрузите фото — получите предварительный разбор.
            </p>

            {/* Inline CTA — visible only outside Telegram */}
            {!isTg && (
              <Button
                onClick={go}
                fullWidth
                className="bg-white !text-brand-blue hover:bg-white/95 shadow-md"
              >
                Начать диагностику →
              </Button>
            )}

            {isTg && (
              <p className="text-xs text-white/50 text-center">
                Нажмите кнопку внизу, чтобы начать
              </p>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-[11px] text-[var(--tg-theme-hint-color,#6b7280)] mb-4">
          Это бесплатно. Точный вывод специалист даст после просмотра фото или осмотра объекта.
        </p>

        {/* Feature rows */}
        <div className="space-y-2 mb-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex items-center gap-3 bg-[var(--tg-theme-bg-color,#fff)] rounded-2xl px-4 py-3 border border-gray-100">
              <span className="text-2xl w-9 text-center flex-shrink-0">{f.icon}</span>
              <div className="min-w-0">
                <p className="text-sm text-[var(--tg-theme-text-color,#111)] font-semibold leading-snug">
                  {f.title}
                </p>
                <p className="text-xs text-[var(--tg-theme-hint-color,#6b7280)] mt-0.5 leading-snug">
                  {f.desc}
                </p>
              </div>
              <span className="ml-auto text-brand-purple flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          ))}
        </div>

        {/* Steps */}
        <div className="bg-[var(--tg-theme-secondary-bg-color,#f4f4f8)] rounded-2xl px-4 py-4 mb-4">
          <p className="text-[10px] font-bold text-[var(--tg-theme-hint-color,#6b7280)] uppercase tracking-widest mb-3">
            Как это работает
          </p>
          <div className="space-y-2.5">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-brand-gradient text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-[13px] text-[var(--tg-theme-text-color,#111)] leading-snug">{s}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-[11px] text-[var(--tg-theme-hint-color,#6b7280)] pb-4 leading-relaxed">
          ФИН КРОВЛЯ сначала находит причину, потом предлагает решение.
        </p>
      </div>
    </div>
  );
}

const FEATURES = [
  { icon: '🔍', title: 'Найдём возможную причину', desc: 'Анализ ваших ответов выявит вероятный источник проблемы' },
  { icon: '⏱️', title: 'Оценим срочность', desc: 'Поймёте: действовать сейчас или можно подождать' },
  { icon: '📋', title: 'Подскажем следующий шаг', desc: 'Конкретная рекомендация, что делать дальше' },
];

const STEPS = [
  'Ответьте на 4 вопроса о проблеме',
  'Загрузите фото — необязательно, но помогает',
  'Получите предварительный разбор',
  'Специалист свяжется и уточнит детали',
];

function HeroPattern() {
  return (
    <svg className="absolute right-0 top-0 w-40 h-40 opacity-10" viewBox="0 0 120 120" fill="none">
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <path
            key={`${row}-${col}`}
            d={`M${col * 40 + 0} ${row * 40 + 20} L${col * 40 + 20} ${row * 40} L${col * 40 + 40} ${row * 40 + 20}`}
            stroke="white"
            strokeWidth="1.5"
          />
        ))
      )}
    </svg>
  );
}
