import { create } from 'zustand';
import type { QuizAnswers, TelegramUser } from '@/types';
import { getTelegramUser } from '@/lib/telegram';

const EMPTY_ANSWERS: QuizAnswers = {
  concern: '',
  location: '',
  timing: '',
  roofType: '',
  photos: [],
  name: '',
  phone: '',
  comment: '',
};

function buildInitialAnswers(): QuizAnswers {
  const user = getTelegramUser();
  if (!user) return { ...EMPTY_ANSWERS };
  return {
    ...EMPTY_ANSWERS,
    name: [user.first_name, user.last_name].filter(Boolean).join(' '),
  };
}

interface QuizStore {
  answers: QuizAnswers;
  telegramUser: TelegramUser | null;
  setAnswer: <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => void;
  resetAnswers: () => void;
  initFromTelegram: () => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  answers: { ...EMPTY_ANSWERS },
  telegramUser: null,

  setAnswer: (key, value) =>
    set((s) => ({ answers: { ...s.answers, [key]: value } })),

  resetAnswers: () =>
    set({ answers: buildInitialAnswers() }),

  initFromTelegram: () => {
    const user = getTelegramUser();
    set({
      telegramUser: user,
      answers: buildInitialAnswers(),
    });
  },
}));
