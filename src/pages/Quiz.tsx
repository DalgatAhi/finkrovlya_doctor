import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '@/app/store';
import { QUIZ_STEPS, TOTAL_STEPS } from '@/data/questions';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { OptionCard } from '@/components/quiz/OptionCard';
import { PhotoUpload } from '@/components/quiz/PhotoUpload';
import { ContactsForm } from '@/components/quiz/ContactsForm';
import { buildDiagnosis } from '@/lib/diagnosis';
import { submitLead } from '@/lib/api';
import { useTelegramMainButton } from '@/hooks/useTelegramButton';
import { showBackButton, hideBackButton, hapticFeedback } from '@/lib/telegram';
import { generateId } from '@/lib/utils';

type Step = 0 | 1 | 2 | 3 | 4 | 5;

const STEP_TITLES: Record<number, string> = {
  4: 'Загрузите фото проблемы',
  5: 'Контактные данные',
};

const FIELD_KEYS = ['concern', 'location', 'timing', 'roofType'] as const;

function getCtaLabel(step: Step, hasPhotos: boolean): string {
  if (step === 5) return 'Получить предварительный разбор';
  if (step === 4) return hasPhotos ? 'Продолжить' : 'Пропустить';
  return 'Далее';
}

export function Quiz() {
  const navigate = useNavigate();
  const { answers, telegramUser, setAnswer } = useQuizStore();
  const [step, setStep] = useState<Step>(0);
  const [contactErrors, setContactErrors] = useState<{ name?: string; phone?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const isQuestionStep = step < 4;
  const currentQuestion = isQuestionStep ? QUIZ_STEPS[step] : null;
  const currentFieldKey = isQuestionStep ? FIELD_KEYS[step as 0 | 1 | 2 | 3] : null;
  const currentAnswer = currentFieldKey ? answers[currentFieldKey] : '';

  const canProceed =
    (isQuestionStep && !!currentAnswer) ||
    step === 4 ||
    (step === 5 && !!answers.name && !!answers.phone);

  const ctaLabel = getCtaLabel(step, answers.photos.length > 0);

  const goBack = useCallback(() => {
    if (step === 0) { navigate('/'); return; }
    hapticFeedback('impact_light');
    setStep((s) => (s - 1) as Step);
  }, [step, navigate]);

  useEffect(() => {
    if (step > 0) {
      showBackButton(goBack);
    } else {
      hideBackButton();
    }
    return () => hideBackButton();
  }, [step, goBack]);

  function validateContacts(): boolean {
    const errs: { name?: string; phone?: string } = {};
    if (!answers.name.trim()) errs.name = 'Введите имя';
    if (!answers.phone.trim()) errs.phone = 'Введите номер телефона';
    else if (!/^[+7\d][\d\s\-()\d]{6,}$/.test(answers.phone.replace(/\s/g, '')))
      errs.phone = 'Проверьте формат номера';
    setContactErrors(errs);
    if (Object.keys(errs).length > 0) { hapticFeedback('error'); return false; }
    return true;
  }

  const handleNext = useCallback(async () => {
    if (submitting) return;
    if (step === 5) {
      if (!validateContacts()) return;
      setSubmitting(true);
      hapticFeedback('impact_medium');
      try {
        const diagnosis = buildDiagnosis(answers);
        await submitLead({
          id: generateId(),
          createdAt: new Date().toISOString(),
          telegramUser: telegramUser ?? undefined,
          answers,
          diagnosis,
        });
        hapticFeedback('success');
        navigate('/result', { state: { diagnosis } });
      } catch {
        hapticFeedback('error');
        setSubmitting(false);
      }
      return;
    }
    hapticFeedback('impact_light');
    setStep((s) => (s + 1) as Step);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, submitting, answers, telegramUser, navigate]);

  const isTg = useTelegramMainButton(ctaLabel, handleNext, {
    enabled: canProceed,
    loading: submitting,
  });

  return (
    <div className="tg-page bg-[var(--tg-theme-secondary-bg-color,#f4f4f8)] dark:bg-[#1c1c1e]">
      {/* Header */}
      <header className="bg-[var(--tg-theme-bg-color,#fff)] dark:bg-[#1c1c1e] border-b border-gray-100 dark:border-white/[0.08] px-4 pt-safe pt-3 pb-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          {!isTg && (
            <button
              onClick={goBack}
              className="w-8 h-8 rounded-xl border border-gray-200 dark:border-white/15 flex items-center justify-center flex-shrink-0 active:bg-gray-100 dark:active:bg-white/10 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  className="text-gray-600 dark:text-gray-300" />
              </svg>
            </button>
          )}
          <div className="flex-1">
            <ProgressBar current={step + 1} total={TOTAL_STEPS} />
          </div>
        </div>
      </header>

      {/* Scrollable content */}
      <div className="tg-scroll px-4 pt-5 pb-4">
        <div className="mb-5">
          <h2 className="text-[19px] text-gray-900 dark:text-white leading-snug" style={{ fontWeight: 800 }}>
            {currentQuestion?.title ?? STEP_TITLES[step]}
          </h2>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-1">
            {currentQuestion?.subtitle ??
              (step === 4 ? 'Необязательно, но очень помогает при анализе' : 'Специалист свяжется, чтобы уточнить детали')}
          </p>
        </div>

        {isQuestionStep && currentQuestion && currentFieldKey && (
          <div className="space-y-2">
            {currentQuestion.options.map((opt) => (
              <OptionCard
                key={opt.label}
                label={opt.label}
                icon={opt.icon}
                selected={currentAnswer === opt.label}
                onClick={() => {
                  hapticFeedback('selection');
                  setAnswer(currentFieldKey, opt.label);
                }}
              />
            ))}
          </div>
        )}

        {step === 4 && (
          <PhotoUpload photos={answers.photos} onChange={(p) => setAnswer('photos', p)} />
        )}

        {step === 5 && (
          <ContactsForm
            value={{ name: answers.name, phone: answers.phone, comment: answers.comment }}
            onChange={(d) => { setAnswer('name', d.name); setAnswer('phone', d.phone); setAnswer('comment', d.comment); }}
            errors={contactErrors}
          />
        )}
      </div>

      {/* Browser-only sticky CTA */}
      {!isTg && (
        <footer className="flex-shrink-0 px-4 pb-safe pb-5 pt-3 bg-[var(--tg-theme-bg-color,#fff)] dark:bg-[#1c1c1e] border-t border-gray-100 dark:border-white/[0.08]">
          {step === 4 && answers.photos.length === 0 && (
            <p className="text-[11px] text-center text-gray-400 dark:text-gray-500 mb-2">
              Можно пропустить — фото загрузите позже
            </p>
          )}
          <Button fullWidth size="lg" onClick={handleNext} loading={submitting} disabled={!canProceed}>
            {ctaLabel}
          </Button>
        </footer>
      )}
    </div>
  );
}
