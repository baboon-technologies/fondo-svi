import { useState } from 'react';
import { Mail, Send } from 'lucide-react';

export default function ContactForm() {
  const [email, setEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const payload: Record<string, string> = { email };
      if (userMessage.trim()) payload.message = userMessage.trim();

      const response = await fetch('https://formspree.io/f/mjgpzjjr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: '¡Gracias! Te contactaremos pronto.' });
        setEmail('');
        setUserMessage('');
      } else {
        setMessage({ type: 'error', text: 'Ha ocurrido un error. Por favor, inténtalo de nuevo.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Ha ocurrido un error. Por favor, inténtalo de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-br from-[#1a4a9e] to-[#3068cc]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white/10 rounded-2xl mb-4 sm:mb-6">
            <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            ¿Quieres saber más?
          </h2>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
            Déjanos tu correo electrónico y nos pondremos en contacto contigo en breve para resolver todas tus dudas.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-3 sm:space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base text-[#012878] placeholder-gray-400 border-2 border-transparent focus:border-white focus:outline-none transition-all"
            disabled={loading}
          />

          <textarea
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="¿Quieres enviarnos un mensaje? (opcional)"
            rows={3}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base text-[#012878] placeholder-gray-400 border-2 border-transparent focus:border-white focus:outline-none transition-all resize-none"
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 sm:py-4 bg-white text-[#012878] rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              'Enviando...'
            ) : (
              <>
                Enviar
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </>
            )}
          </button>

          {message && (
            <div className={`p-3 sm:p-4 rounded-lg text-sm sm:text-base ${
              message.type === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {message.text}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
