'use client';

import { useState, FormEvent } from 'react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export function ContactSection() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch('https://formspree.io/f/mjgpzjjr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });
      if (response.ok) {
        setStatus('success');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      className="rounded-xl shadow-lg px-6 py-12 sm:px-12 text-white"
      style={{ background: 'linear-gradient(135deg, #1a4a9e, #3068cc)' }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: 'white' }}>
          ¿Quieres saber más?
        </h2>
        <p className="text-sm sm:text-base mb-8 text-white/90">
          Déjanos tu correo electrónico y nos pondremos en contacto contigo en breve para resolver todas tus dudas.
        </p>

        {status === 'success' ? (
          <p className="text-base font-semibold bg-white/15 rounded-lg px-6 py-4">
            ¡Gracias! Hemos recibido tu mensaje y te contactaremos en breve.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo electrónico"
              className="w-full rounded-lg px-4 py-3 text-sm text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/70"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tu mensaje (opcional)"
              rows={4}
              className="w-full rounded-lg px-4 py-3 text-sm text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/70"
            />
            <div className="text-center">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-block bg-white font-semibold rounded-lg px-8 py-3 text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ color: 'var(--svi-primary)' }}
              >
                {status === 'sending' ? 'Enviando…' : 'Enviar'}
              </button>
            </div>
            {status === 'error' && (
              <p className="text-sm text-center bg-red-500/30 rounded-lg px-4 py-3">
                Ha ocurrido un error al enviar el mensaje. Por favor, inténtalo de nuevo o escríbenos a info@svinvesting.com.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
