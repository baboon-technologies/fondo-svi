import { useEffect, useState } from 'react';

const STORAGE_KEY = 'svi_cookie_consent';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setShow(true);
    } catch {
      // localStorage blocked — show banner anyway
      setShow(true);
    }
  }, []);

  if (!show) return null;

  const accept = () => {
    try { localStorage.setItem(STORAGE_KEY, 'granted'); } catch {}
    window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    setShow(false);
  };

  const reject = () => {
    try { localStorage.setItem(STORAGE_KEY, 'denied'); } catch {}
    setShow(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-4 sm:bottom-4 sm:max-w-xs bg-white border border-gray-200 shadow-lg rounded-lg p-3 text-xs z-50"
    >
      <p className="text-gray-700 leading-snug mb-2">
        Usamos cookies para analítica anónima.{' '}
        <a
          href="https://policies.google.com/technologies/cookies"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:no-underline"
        >
          Más info
        </a>
      </p>
      <div className="flex gap-2 justify-end">
        <button
          onClick={reject}
          className="px-2 py-1 text-gray-600 hover:text-gray-900 transition-colors"
        >
          Rechazar
        </button>
        <button
          onClick={accept}
          className="px-3 py-1 bg-blue-900 text-white rounded hover:bg-blue-800 transition-colors"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
