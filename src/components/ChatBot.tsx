import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, User, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  showContactForm?: boolean;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi! 👋 I'm the MMD assistant. I can answer questions about our medical delivery services in Northwest Indiana. How can I help you today?",
};

function ContactFallbackForm({ onSubmit, isSubmitting }: { onSubmit: (data: ContactFormData) => void; isSubmitting: boolean }) {
  const [form, setForm] = useState<ContactFormData>({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 bg-white border border-gray-200 rounded-2xl p-4 space-y-3">
      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Send us a message</p>
      <input
        value={form.name}
        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        placeholder="Your name"
        required
        className="w-full text-sm px-3 py-2 bg-gray-50 rounded-xl border-0 outline-none focus:ring-2 focus:ring-[#00A699]"
      />
      <input
        value={form.email}
        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        placeholder="Email address"
        type="email"
        required
        className="w-full text-sm px-3 py-2 bg-gray-50 rounded-xl border-0 outline-none focus:ring-2 focus:ring-[#00A699]"
      />
      <input
        value={form.phone}
        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
        placeholder="Phone (optional)"
        className="w-full text-sm px-3 py-2 bg-gray-50 rounded-xl border-0 outline-none focus:ring-2 focus:ring-[#00A699]"
      />
      <textarea
        value={form.message}
        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
        placeholder="How can we help?"
        required
        rows={3}
        className="w-full text-sm px-3 py-2 bg-gray-50 rounded-xl border-0 outline-none focus:ring-2 focus:ring-[#00A699] resize-none"
      />
      <button
        type="submit"
        disabled={isSubmitting || !form.name || !form.email || !form.message}
        className="w-full bg-[#00A699] text-white text-sm font-bold py-2.5 rounded-xl disabled:opacity-50 hover:bg-[#008f83] transition-colors"
      >
        {isSubmitting ? 'Sending...' : 'Send Message →'}
      </button>
    </form>
  );
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg]
            .filter(m => m.role !== 'system')
            .map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const json = await res.json() as { success: boolean; data?: { reply: string; showContactForm?: boolean } };

      if (json.success && json.data) {
        setMessages(prev => [...prev, {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: json.data!.reply,
          showContactForm: json.data!.showContactForm,
        }]);
      } else {
        throw new Error('API error');
      }
    } catch {
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please use the contact form below or email us at dispatch@midwestmedicaldelivery.com.",
        showContactForm: true,
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactFormSubmit = async (data: ContactFormData) => {
    setFormSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, contactType: 'general', source: 'chatbot' }),
      });
      setFormSubmitted(true);
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `Thanks ${data.name}! ✅ Your message has been received. Someone from our team will get back to you shortly.`,
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Sorry, there was an issue submitting your message. Please email us directly at dispatch@midwestmedicaldelivery.com.',
      }]);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(o => !o)}
        aria-label={isOpen ? 'Close chat' : 'Open chat assistant'}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#00A699] text-white rounded-full shadow-lg hover:bg-[#008f83] transition-all duration-200 flex items-center justify-center hover:scale-105 active:scale-95"
      >
        {isOpen
          ? <X className="h-6 w-6" />
          : <MessageCircle className="h-6 w-6" />
        }
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          style={{ height: '520px' }}
        >
          {/* Header */}
          <div className="bg-[#00A699] px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-white text-sm">MMD Assistant</p>
              <p className="text-white/75 text-xs">Midwest Medical Delivery</p>
            </div>
            <div className="w-2 h-2 bg-green-300 rounded-full" title="Online" />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 bg-[#00A699] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
                <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#00A699] text-white rounded-tr-sm'
                      : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm shadow-sm'
                  }`}>
                    {msg.content}
                  </div>
                  {msg.showContactForm && !formSubmitted && (
                    <ContactFallbackForm onSubmit={handleContactFormSubmit} isSubmitting={formSubmitting} />
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <User className="h-3.5 w-3.5 text-gray-500" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 bg-[#00A699] rounded-full flex items-center justify-center shrink-0">
                  <Bot className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                  <div className="flex gap-1 items-center h-4">
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 bg-white border-t border-gray-100 flex gap-2 items-center">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question..."
              disabled={isLoading}
              className="flex-1 text-sm px-4 py-2.5 bg-gray-50 rounded-xl border-0 outline-none focus:ring-2 focus:ring-[#00A699] disabled:opacity-50"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 bg-[#00A699] text-white rounded-xl flex items-center justify-center disabled:opacity-40 hover:bg-[#008f83] transition-colors shrink-0"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
