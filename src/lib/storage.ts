import type { Lead, QuizAnswers, DiagnosisResult } from '@/types';
import { generateId } from './utils';

const STORAGE_KEY = 'finkrovlya_leads';

// Called in dev fallback path — builds a Lead and persists it
export function saveLeadToStorage(
  answers: QuizAnswers,
  diagnosis: DiagnosisResult,
  existing?: Lead
): Lead {
  const lead: Lead = existing ?? {
    id: generateId(),
    createdAt: new Date().toISOString(),
    answers,
    diagnosis,
    telegramUser: undefined,
  };

  const all = getLeadsFromStorage();
  all.unshift(lead);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return lead;
}

export function getLeadsFromStorage(): Lead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Lead[];
  } catch {
    return [];
  }
}

export function clearLeadsFromStorage(): void {
  localStorage.removeItem(STORAGE_KEY);
}

