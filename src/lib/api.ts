import type { Lead } from '@/types';
import { getInitData } from './telegram';
import { saveLeadToStorage } from './storage';

const API_URL = import.meta.env.VITE_API_URL as string | undefined;

export async function submitLead(lead: Lead): Promise<void> {
  if (API_URL) {
    await submitToBackend(lead);
  } else {
    // Dev fallback — save to localStorage
    saveLeadToStorage(lead.answers, lead.diagnosis, lead);
  }
}

async function submitToBackend(lead: Lead): Promise<void> {
  const res = await fetch(`${API_URL}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      lead,
      initData: getInitData(),
    }),
  });

  if (!res.ok) {
    throw new Error(`Submit failed: ${res.status}`);
  }
}
