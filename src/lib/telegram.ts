import type { TelegramUser } from '@/types';

// ─── Telegram WebApp type declarations ──────────────────────────────────────

declare global {
  interface Window {
    Telegram?: { WebApp: TelegramWebApp };
  }
}

interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  close: () => void;
  sendData: (data: string) => void;
  onEvent: (eventType: string, handler: () => void) => void;
  offEvent: (eventType: string, handler: () => void) => void;
  initData: string;
  initDataUnsafe: {
    user?: TelegramUser;
    query_id?: string;
    auth_date?: number;
    hash?: string;
  };
  version: string;
  colorScheme: 'light' | 'dark';
  themeParams: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    secondary_bg_color?: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
    showProgress: (leaveActive?: boolean) => void;
    hideProgress: () => void;
  };
  BackButton: {
    isVisible: boolean;
    show: () => void;
    hide: () => void;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
  };
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
    selectionChanged: () => void;
  };
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function tg(): TelegramWebApp | null {
  return window.Telegram?.WebApp ?? null;
}

// ─── Core ───────────────────────────────────────────────────────────────────

export function isTelegramWebApp(): boolean {
  const app = window.Telegram?.WebApp;
  if (!app) return false;
  // initData is a non-empty query-string only when opened inside Telegram.
  // In a regular browser the script loads but initData stays empty.
  return typeof app.initData === 'string' && app.initData.length > 0;
}

export function initTelegram(): void {
  // Apply theme immediately (before Telegram SDK, for browser fallback)
  applyTheme();

  const app = tg();
  if (app) {
    app.ready();
    app.expand();
    app.onEvent('viewportChanged', syncViewportHeight);
    app.onEvent('themeChanged', applyTheme);
  } else {
    // In browser: react to system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
  }

  syncViewportHeight();
}

export function expandApp(): void {
  tg()?.expand();
}

export function closeApp(): void {
  tg()?.close();
}

export function getTelegramUser(): TelegramUser | null {
  return tg()?.initDataUnsafe?.user ?? null;
}

export function getInitData(): string {
  return tg()?.initData ?? '';
}

// ─── Theme ──────────────────────────────────────────────────────────────────

const LIGHT_DEFAULTS = {
  bg_color: '#ffffff',
  secondary_bg_color: '#f4f4f8',
  text_color: '#111827',
  hint_color: '#6b7280',
  button_color: '#121193',
  button_text_color: '#ffffff',
};

const DARK_DEFAULTS = {
  bg_color: '#1c1c1e',
  secondary_bg_color: '#2c2c2e',
  text_color: '#f2f2f7',
  hint_color: '#8e8e93',
  button_color: '#ca61c9',
  button_text_color: '#ffffff',
};

export function applyTheme(): void {
  const app = tg();
  const root = document.documentElement;

  // Determine color scheme: Telegram → browser preference → light
  const scheme: 'light' | 'dark' =
    app?.colorScheme ??
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  // Set data-theme so Tailwind dark: variants activate
  root.dataset.theme = scheme;

  const fallback = scheme === 'dark' ? DARK_DEFAULTS : LIGHT_DEFAULTS;
  const params = app?.themeParams ?? {};

  root.style.setProperty('--tg-theme-bg-color', params.bg_color ?? fallback.bg_color);
  root.style.setProperty('--tg-theme-secondary-bg-color', params.secondary_bg_color ?? fallback.secondary_bg_color);
  root.style.setProperty('--tg-theme-text-color', params.text_color ?? fallback.text_color);
  root.style.setProperty('--tg-theme-hint-color', params.hint_color ?? fallback.hint_color);
  root.style.setProperty('--tg-theme-button-color', params.button_color ?? fallback.button_color);
  root.style.setProperty('--tg-theme-button-text-color', params.button_text_color ?? fallback.button_text_color);
}

function syncViewportHeight(): void {
  const app = tg();
  const height = app?.viewportStableHeight ?? app?.viewportHeight ?? window.innerHeight;
  document.documentElement.style.setProperty('--tg-viewport-height', `${height}px`);
}

// ─── MainButton (singleton callback management) ──────────────────────────────

let _mainCb: (() => void) | null = null;

export function setupMainButton(text: string, callback: () => void): void {
  const app = tg();
  if (!app) return;

  if (_mainCb) app.MainButton.offClick(_mainCb);
  _mainCb = callback;

  app.MainButton.text = text;
  app.MainButton.color = '#121193';
  app.MainButton.textColor = '#FFFFFF';
  app.MainButton.enable();
  app.MainButton.onClick(_mainCb);
  app.MainButton.show();
}

export function hideMainButton(): void {
  const app = tg();
  if (!app) return;
  if (_mainCb) {
    app.MainButton.offClick(_mainCb);
    _mainCb = null;
  }
  app.MainButton.hide();
}

export function enableMainButton(): void {
  tg()?.MainButton.enable();
}

export function disableMainButton(): void {
  tg()?.MainButton.disable();
}

export function showMainButtonProgress(): void {
  tg()?.MainButton.showProgress(false);
}

export function hideMainButtonProgress(): void {
  tg()?.MainButton.hideProgress();
}

// ─── BackButton (singleton callback management) ──────────────────────────────

let _backCb: (() => void) | null = null;

export function showBackButton(callback: () => void): void {
  const app = tg();
  if (!app) return;
  if (_backCb) app.BackButton.offClick(_backCb);
  _backCb = callback;
  app.BackButton.onClick(_backCb);
  app.BackButton.show();
}

export function hideBackButton(): void {
  const app = tg();
  if (!app) return;
  if (_backCb) {
    app.BackButton.offClick(_backCb);
    _backCb = null;
  }
  app.BackButton.hide();
}

// ─── Haptic feedback ─────────────────────────────────────────────────────────

export type HapticType =
  | 'selection'
  | 'impact_light'
  | 'impact_medium'
  | 'success'
  | 'error'
  | 'warning';

export function hapticFeedback(type: HapticType): void {
  const hap = tg()?.HapticFeedback;
  if (!hap) return;

  if (type === 'selection') hap.selectionChanged();
  else if (type === 'impact_light') hap.impactOccurred('light');
  else if (type === 'impact_medium') hap.impactOccurred('medium');
  else if (type === 'success') hap.notificationOccurred('success');
  else if (type === 'error') hap.notificationOccurred('error');
  else if (type === 'warning') hap.notificationOccurred('warning');
}
