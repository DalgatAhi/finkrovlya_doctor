import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLeadsFromStorage, clearLeadsFromStorage } from '@/lib/storage';
import { LeadCard } from '@/components/admin/LeadCard';
import type { Lead } from '@/types';
import { Button } from '@/components/ui/Button';

export function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => { setLeads(getLeadsFromStorage()); }, []);

  function handleClear() {
    if (confirmClear) {
      clearLeadsFromStorage();
      setLeads([]);
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--tg-theme-secondary-bg-color,#f4f4f8)] dark:bg-[#1c1c1e]">
      {/* Header */}
      <header className="bg-[var(--tg-theme-bg-color,#fff)] dark:bg-[#1c1c1e] border-b border-gray-100 dark:border-white/[0.08] px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/" className="text-brand-blue dark:text-brand-purple hover:underline text-sm font-medium">
              ← На главную
            </Link>
            <h1 className="text-xl text-gray-900 dark:text-white mt-1" style={{ fontWeight: 800 }}>
              Заявки
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {leads.length === 0 ? 'Нет заявок' : `${leads.length} ${pluralLeads(leads.length)}`}
            </p>
          </div>
          {leads.length > 0 && (
            <Button variant={confirmClear ? 'danger' : 'ghost'} size="sm" onClick={handleClear}>
              {confirmClear ? 'Подтвердить' : 'Очистить'}
            </Button>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="px-5 py-5">
        {leads.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Заявок пока нет</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Пройдите диагностику, чтобы появилась первая заявка
            </p>
            <div className="mt-6">
              <Link to="/quiz"><Button size="md">Начать диагностику</Button></Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {leads.map((lead) => <LeadCard key={lead.id} lead={lead} />)}
          </div>
        )}
      </main>

      <div className="px-5 pb-8">
        <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl px-4 py-3">
          <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
            ⚙️ Dev-режим — данные из localStorage. В продакшн добавьте бэкенд и авторизацию.
          </p>
        </div>
      </div>
    </div>
  );
}

function pluralLeads(n: number): string {
  if (n % 10 === 1 && n % 100 !== 11) return 'заявка';
  if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return 'заявки';
  return 'заявок';
}
