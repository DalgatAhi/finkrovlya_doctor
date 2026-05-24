import { useEffect, useRef } from 'react';
import {
  isTelegramWebApp,
  setupMainButton,
  hideMainButton,
  enableMainButton,
  disableMainButton,
  showMainButtonProgress,
  hideMainButtonProgress,
} from '@/lib/telegram';

/**
 * Manages the Telegram native MainButton lifecycle.
 * Uses a ref for the callback so it stays stable without re-registering
 * the button when business logic changes.
 */
export function useTelegramMainButton(
  text: string,
  onClick: () => void,
  options?: { enabled?: boolean; loading?: boolean }
): boolean {
  const isTg = isTelegramWebApp();
  const cbRef = useRef(onClick);
  cbRef.current = onClick;

  // Register / re-register when text changes
  useEffect(() => {
    if (!isTg) return;
    const stable = () => cbRef.current();
    setupMainButton(text, stable);
    return () => { hideMainButton(); };
  }, [text, isTg]);

  // Sync enabled state
  useEffect(() => {
    if (!isTg) return;
    if (options?.enabled === false) {
      disableMainButton();
    } else {
      enableMainButton();
    }
  }, [options?.enabled, isTg]);

  // Sync loading state
  useEffect(() => {
    if (!isTg) return;
    if (options?.loading) {
      showMainButtonProgress();
    } else {
      hideMainButtonProgress();
    }
  }, [options?.loading, isTg]);

  return isTg;
}
