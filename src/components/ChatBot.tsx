import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, User, AlertCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  showContactForm?: boolean;
  error?: boolean;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

function ContactFallbackForm({ onSubmit, isSubmitting }: { onSubmit: (d: ContactFormData) => void; isSubmitting: boolean }) {
  const [form, setForm] = useState<ContactFormData>({ name: '', email: '', phone: '', message: '' });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    onSubmit(form);
  };
  return (
    <form onSubmit={handleSubmit} className="mt-3 bg-white border border-gray-200 rounded-2xl p-4 space-y-3">
      <input className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A699]/40" placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
      <input type="email" className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A699]/40" placeholder="Email address" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
      <input className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A699]/40" placeholder="Phone (optional)" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
      <textarea className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-[#00A699]/40" placeholder="How can we help?" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
      <button type="submit" disabled={isSubmitting || !form.name || !form.email || !form.message} className="w-full bg-[#00A699] text-white text-sm font-bold py-2.5 rounded-xl hover:bg-[#008f83] disabled:opacity-50 transition-colors">
        {isSubmitting ? 'Sending...' : 'Send Message →'}
      </button>
    </form>
  );
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm the MMD Assistant. I can answer questions about our medical delivery services, service areas, pricing, hours, and more. How can I help you?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
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
    if (!text || loading) return;
    setInput('');
    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })) }),
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json() as { success: boolean; reply?: string; showContactForm?: boolean; error?: string };
      if (!data.success) throw new Error(data.error || 'API error');
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || '', showContactForm: data.showContactForm }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please use the contact form below or email us at dispatch@midwestmedicaldelivery.com.",
        showContactForm: true,
        error: true,
      }]);
    } finally {
      setLoading(false);
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
      setMessages(prev => [...prev, { role: 'assistant', content: "✅ Thanks! We've received your message and will follow up shortly." }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, there was an error submitting your message. Please email dispatch@midwestmedicaldelivery.com directly.", error: true }]);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Viewport-aware positioning: account for navbar height (80px) at top
  const chatWindowStyle: React.CSSProperties = {
    height: '520px',
    maxHeight: 'calc(100vh - 104px)', // 80px navbar + 24px gap
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#00A699] text-white rounded-full shadow-lg hover:bg-[#008f83] transition-all duration-200 flex items-center justify-center hover:scale-105 active:scale-95"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          style={chatWindowStyle}
        >
          {/* Header */}
          <div className="bg-[#00A699] px-5 py-4 flex items-center gap-3 flex-shrink-0">
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
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[#00A699]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {msg.error ? <AlertCircle className="h-4 w-4 text-red-500" /> : <Bot className="h-4 w-4 text-[#00A699]" />}
                  </div>
                )}
                <div className="max-w-[80%]">
                  <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#00A699] text-white rounded-tr-sm'
                      : msg.error
                        ? 'bg-red-50 text-red-700 border border-red-200 rounded-tl-sm'
                        : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-tl-sm'
                  }`}>
                    {msg.content}
                  </div>
                  {msg.showContactForm && !formSubmitted && (
                    <ContactFallbackForm onSubmit={handleContactFormSubmit} isSubmitting={formSubmitting} />
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#00A699] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 justify-start">
                <div className="w-7 h-7 rounded-full bg-[#00A699]/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-[#00A699]" />
                </div>
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-[#00A699]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-gray-100 bg-white flex gap-2 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Ask a question..."
              className="flex-1 text-sm border border-gray-200 rounded-2xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#00A699]/30 focus:border-[#00A699]"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              aria-label="Send message"
              className="w-10 h-10 bg-[#00A699] text-white rounded-full flex items-center justify-center hover:bg-[#008f83] disabled:opacity-40 transition-colors flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
