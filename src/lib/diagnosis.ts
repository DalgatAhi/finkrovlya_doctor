import type { QuizAnswers, DiagnosisResult, RiskLevel, Urgency } from '@/types';

interface RuleMatch {
  riskLevel: RiskLevel;
  riskPercent: number;
  urgency: Urgency;
  probableCause: string;
  description: string;
  consequence: string;
  recommendation: string;
}

function matchRules(answers: QuizAnswers): RuleMatch {
  const { concern, location, timing } = answers;

  const isLeak = concern === 'Протекает потолок' || concern === 'Проблема после дождя';
  const isJunctionZone =
    location === 'Дымоход / труба' || location === 'Стык крыши со стеной';
  const isAfterRain = timing === 'После последнего дождя' || timing === 'Сегодня';

  // Протечка у примыкания — критично
  if (isLeak && isJunctionZone) {
    return {
      riskLevel: 'high',
      riskPercent: 84,
      urgency: 'high',
      probableCause: 'Нарушение герметичности примыкания',
      description:
        'По ответам видно, что проблема, скорее всего, связана с нарушением герметичности примыкания кровли к трубе или стене. Такие участки часто дают протечку после дождя.',
      consequence:
        'Если отложить — вода продолжит поступать внутрь конструкции, что может привести к намоканию утеплителя, гниению стропил и разрушению отделки.',
      recommendation:
        'Необходим выезд специалиста для проверки и восстановления гидроизоляции узлов примыкания до следующего дождя.',
    };
  }

  // Протечка после дождя — общая
  if (isLeak && isAfterRain) {
    return {
      riskLevel: 'high',
      riskPercent: 76,
      urgency: 'high',
      probableCause: 'Нарушение кровельного покрытия или гидроизоляции',
      description:
        'Протечки, появляющиеся после дождя, чаще всего говорят о повреждении покрытия, нарушении нахлёстов или проблемах с гидроизоляцией.',
      consequence:
        'Затягивание с ремонтом может привести к намоканию утеплителя и деревянных конструкций, что многократно увеличивает стоимость восстановления.',
      recommendation:
        'Рекомендуем выезд специалиста для осмотра покрытия и выявления места протечки.',
    };
  }

  // Снег и лёд
  if (concern === 'Снег или лёд на крыше') {
    const isHighRisk = location === 'Водосток' || location === 'Мансарда';
    return {
      riskLevel: isHighRisk ? 'high' : 'medium',
      riskPercent: isHighRisk ? 72 : 55,
      urgency: isHighRisk ? 'high' : 'medium',
      probableCause: 'Проблемы с водостоком, снегозадержанием или теплоизоляцией',
      description:
        'Ледяные наросты и скопление снега на крыше указывают на возможные нарушения теплоизоляции или засорение водостоков.',
      consequence:
        'Без вмешательства лёд может повредить кровельное покрытие и водостоки, а оттаивание приведёт к протечкам.',
      recommendation:
        'Проверить состояние водостоков, снегозадержателей и качество утепления подкровельного пространства.',
    };
  }

  // Шумит кровля
  if (concern === 'Шумит кровля') {
    return {
      riskLevel: 'medium',
      riskPercent: 42,
      urgency: 'medium',
      probableCause: 'Ослабление крепежа или ошибка монтажа',
      description:
        'Посторонние звуки чаще всего появляются при ослаблении крепёжных элементов или деформации покрытия от температурных перепадов.',
      consequence:
        'Без проверки крепёж может окончательно ослабнуть, что в шторм приведёт к смещению или повреждению листов.',
      recommendation:
        'Проверить крепёж и состояние кровельного покрытия, подтянуть или заменить саморезы.',
    };
  }

  // Плесень и сырость
  if (concern === 'Появилась плесень или сырость') {
    return {
      riskLevel: 'medium',
      riskPercent: 58,
      urgency: 'medium',
      probableCause: 'Конденсат или скрытая протечка с нарушением вентиляции',
      description:
        'Плесень и постоянная сырость часто возникают при недостаточной вентиляции подкровельного пространства или скрытой протечке.',
      consequence:
        'При длительном воздействии влага разрушает деревянные конструкции и портит отделку, создавая угрозу для здоровья жильцов.',
      recommendation:
        'Необходима диагностика вентиляции и проверка гидроизоляционного слоя.',
    };
  }

  // Проверка перед покупкой
  if (concern === 'Хочу проверить крышу перед покупкой дома') {
    return {
      riskLevel: 'low',
      riskPercent: 28,
      urgency: 'low',
      probableCause: 'Профилактическая проверка перед сделкой',
      description:
        'Хорошее решение — проверить состояние кровли до покупки. По фото и описанию можно предварительно оценить видимые дефекты.',
      consequence:
        'Скрытые дефекты кровли могут обойтись значительно дороже после покупки, чем стоимость выезда специалиста.',
      recommendation:
        'Рекомендуем визуальный осмотр специалистом перед подписанием договора.',
    };
  }

  // Нужна новая крыша
  if (concern === 'Нужна новая крыша') {
    return {
      riskLevel: 'high',
      riskPercent: 88,
      urgency: 'medium',
      probableCause: 'Износ кровельного покрытия или конструкции',
      description:
        'Полная замена кровли — это серьёзный проект, который требует точного расчёта материалов, оценки состояния стропильной системы и правильного выбора покрытия.',
      consequence:
        'Затягивание с заменой изношенной кровли увеличивает риск протечек и повреждения конструкций.',
      recommendation:
        'Выезд специалиста для обследования и составления коммерческого предложения.',
    };
  }

  // Default — общая протечка
  return {
    riskLevel: 'medium',
    riskPercent: 48,
    urgency: 'medium',
    probableCause: 'Требуется осмотр для точного определения причины',
    description:
      'По указанным признакам есть основания проверить состояние кровли. Более точную причину специалист определит после осмотра или анализа фото.',
    consequence:
      'Большинство кровельных проблем при своевременном вмешательстве устраняются значительно дешевле.',
    recommendation:
      'Загрузите фото и отправьте заявку — специалист свяжется с вами и уточнит детали.',
  };
}

export function buildDiagnosis(answers: QuizAnswers): DiagnosisResult {
  const match = matchRules(answers);

  const statusLabel: Record<RiskLevel, string> = {
    low: 'Стабильное состояние',
    medium: 'Требует внимания',
    high: 'Требует срочной проверки',
  };

  // Add nuance for unknown roof type
  let description = match.description;
  if (answers.roofType === 'Не знаю') {
    description += ' Точный тип кровли специалист определит по фото или на осмотре.';
  }

  return {
    ...match,
    description,
    statusLabel: statusLabel[match.riskLevel],
  };
}

export const URGENCY_LABELS: Record<Urgency, string> = {
  low: 'Низкая',
  medium: 'Средняя',
  high: 'Высокая',
};

export const RISK_LABELS: Record<RiskLevel, string> = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
};
