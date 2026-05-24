import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { Home } from '@/pages/Home';
import { Quiz } from '@/pages/Quiz';
import { Result } from '@/pages/Result';
import { AdminLeads } from '@/pages/AdminLeads';
import { initTelegram, applyTheme } from '@/lib/telegram';
import { useQuizStore } from './store';

export function App() {
  const { initFromTelegram } = useQuizStore();

  useEffect(() => {
    // Apply brand fallback theme immediately, then override with Telegram theme
    applyTheme();
    initTelegram();
    initFromTelegram();
  }, []);

  return (
    <BrowserRouter>
      {/*
        Full-width on mobile (Telegram feel).
        On desktop: narrow centered column to simulate a phone.
      */}
      <div className="w-full sm:max-w-[430px] sm:mx-auto sm:min-h-screen sm:shadow-2xl font-sans bg-[var(--tg-theme-bg-color,#fff)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/admin-leads" element={<AdminLeads />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
