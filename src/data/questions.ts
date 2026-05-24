import type { QuizStep } from '@/types';

export const QUIZ_STEPS: QuizStep[] = [
  {
    id: 'concern',
    title: 'Что беспокоит?',
    subtitle: 'Выберите основную проблему',
    options: [
      { label: 'Протекает потолок', icon: '💧' },
      { label: 'Проблема после дождя', icon: '🌧️' },
      { label: 'Снег или лёд на крыше', icon: '❄️' },
      { label: 'Шумит кровля', icon: '🔊' },
      { label: 'Появилась плесень или сырость', icon: '🍄' },
      { label: 'Хочу проверить крышу перед покупкой дома', icon: '🏠' },
      { label: 'Нужна новая крыша', icon: '🔨' },
    ],
  },
  {
    id: 'location',
    title: 'Где заметили проблему?',
    subtitle: 'Укажите зону',
    options: [
      { label: 'Потолок', icon: '⬆️' },
      { label: 'Мансарда', icon: '🏚️' },
      { label: 'Водосток', icon: '🌊' },
      { label: 'Дымоход / труба', icon: '🏭' },
      { label: 'Стык крыши со стеной', icon: '📐' },
      { label: 'Кровельное покрытие', icon: '🏗️' },
      { label: 'Не знаю', icon: '❓' },
    ],
  },
  {
    id: 'timing',
    title: 'Когда появилась проблема?',
    subtitle: 'Это поможет оценить срочность',
    options: [
      { label: 'Сегодня', icon: '⚡' },
      { label: 'После последнего дождя', icon: '🌧️' },
      { label: 'Больше недели назад', icon: '📅' },
      { label: 'Проблема повторяется каждый сезон', icon: '🔄' },
      { label: 'Заметил недавно, но не уверен', icon: '🤔' },
    ],
  },
  {
    id: 'roofType',
    title: 'Какой тип крыши?',
    subtitle: 'Если не знаете — ничего страшного',
    options: [
      { label: 'Металлочерепица', icon: '🔩' },
      { label: 'Профнастил', icon: '🏗️' },
      { label: 'Мягкая кровля', icon: '🟫' },
      { label: 'Фальцевая кровля', icon: '⚙️' },
      { label: 'Плоская кровля', icon: '▬' },
      { label: 'Не знаю', icon: '❓' },
    ],
  },
];

export const TOTAL_STEPS = 6;
