import { useLocation, useNavigate } from 'react-router-dom';
import { useQuizStore } from '@/app/store';
import type { DiagnosisResult } from '@/types';
import { ResultCard } from '@/components/result/ResultCard';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { useTelegramMainButton } from '@/hooks/useTelegramButton';
import { closeApp, hapticFeedback } from '@/lib/telegram';

export function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetAnswers } = useQuizStore();

  const diagnosis = location.state?.diagnosis as DiagnosisResult | undefined;

  if (!diagnosis) {
    navigate('/');
    return null;
  }

  const d = diagnosis;

  function handleClose() {
    hapticFeedback('success');
    closeApp();
    // Fallback for browser
    navigate('/');
  }

  function handleRestart() {
    resetAnswers();
    navigate('/quiz');
  }

  function handleSaveReport() {
    const text = [
      'Кровельный Доктор — ФИН КРОВЛЯ',
      'Предварительный разбор',
      '',
      `Состояние: ${d.statusLabel}`,
      `Риск: ${d.riskPercent}%`,
      `Вероятная причина: ${d.probableCause}`,
      `Срочность: ${d.urgency === 'high' ? 'Высокая' : d.urgency === 'medium' ? 'Средняя' : 'Низкая'}`,
      '',
      `Рекомендация: ${d.recommendation}`,
    ].join('\n');

    if (navigator.share) {
      navigator.share({ title: 'Разбор кровли — ФИН КРОВЛЯ', text });
    } else {
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'roof-diagnosis.txt';
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  // MainButton: close / return to Telegram after seeing result
  const isTg = useTelegramMainButton('Закрыть', handleClose);

  return (
    <div className="tg-page">
      {/* Header */}
      <header className="bg-[var(--tg-theme-bg-color,#fff)] border-b border-gray-100 px-4 pt-safe pt-3 pb-3 flex-shrink-0">
        <Logo />
      </header>

      {/* Success banner */}
      <div className="bg-brand-gradient px-4 py-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 9l4 4 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="font-800 text-white text-[15px]" style={{ fontWeight: 800 }}>
              Предварительный разбор готов
            </p>
            <p className="text-white/65 text-[11px]">На основе ваших ответов</p>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="tg-scroll px-4 py-4">
        <ResultCard diagnosis={d} />
      </div>

      {/* Browser-only actions */}
      {!isTg && (
        <footer className="flex-shrink-0 px-4 pb-safe pb-5 pt-3 bg-[var(--tg-theme-bg-color,#fff)] border-t border-gray-100 space-y-2.5">
          <Button fullWidth size="lg" onClick={handleClose}>
            Отправить заявку специалисту
          </Button>
          <div className="flex gap-2.5">
            <Button variant="secondary" size="md" fullWidth onClick={handleSaveReport}>
              Сохранить отчёт
            </Button>
            <Button variant="ghost" size="md" fullWidth onClick={handleRestart}>
              Пройти заново
            </Button>
          </div>
        </footer>
      )}

      {/* Telegram: extra actions below MainButton */}
      {isTg && (
        <footer className="flex-shrink-0 px-4 pb-safe pb-4 pt-2 flex gap-2.5">
          <Button variant="secondary" size="sm" fullWidth onClick={handleSaveReport}>
            Сохранить отчёт
          </Button>
          <Button variant="ghost" size="sm" fullWidth onClick={handleRestart}>
            Пройти заново
          </Button>
        </footer>
      )}
    </div>
  );
}
