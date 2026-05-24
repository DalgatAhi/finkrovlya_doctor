export type RiskLevel = 'low' | 'medium' | 'high';
export type Urgency = 'low' | 'medium' | 'high';

export interface QuizAnswers {
  concern: string;
  location: string;
  timing: string;
  roofType: string;
  photos: string[];
  name: string;
  phone: string;
  comment: string;
}

export interface DiagnosisResult {
  riskLevel: RiskLevel;
  riskPercent: number;
  urgency: Urgency;
  probableCause: string;
  description: string;
  consequence: string;
  recommendation: string;
  statusLabel: string;
}

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export interface Lead {
  id: string;
  createdAt: string;
  telegramUser?: TelegramUser;
  answers: QuizAnswers;
  diagnosis: DiagnosisResult;
}

export interface QuizStep {
  id: string;
  title: string;
  subtitle?: string;
  options: QuizOption[];
}

export interface QuizOption {
  label: string;
  icon?: string;
}

export type QuizStepId = 'concern' | 'location' | 'timing' | 'roofType' | 'photos' | 'contacts';
