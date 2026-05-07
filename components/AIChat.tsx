import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, X, Eraser } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface AIChatProps {
  onClose?: () => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AIChat: React.FC<AIChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '¡Hola! Soy tu tutor de química orgánica. ¿Tienes dudas sobre nomenclatura, un grupo funcional o quieres practicar? ¡Pregúntame!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    // Prepare history for API
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    try {
      const response = await sendMessageToGemini(userMsg, history);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Lo siento, hubo un error de conexión. Intenta de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white md:rounded-3xl overflow-hidden shadow-2xl border border-slate-200 relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-science-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-organic-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none"></div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md p-4 flex justify-between items-center border-b border-slate-100 z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-science-400 to-science-600 flex items-center justify-center shadow-lg shadow-science-500/30">
                <Sparkles className="w-5 h-5 text-white" />
             </div>
             <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Tutor IA</h3>
            <p className="text-xs text-science-600 font-medium bg-science-50 px-2 py-0.5 rounded-full w-fit">En línea</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button 
             onClick={() => setMessages([{ role: 'model', text: '¡Hola! Soy tu tutor de química orgánica. ¿En qué puedo ayudarte hoy?' }])}
             className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
             title="Limpiar chat"
          >
            <Eraser className="w-5 h-5" />
          </button>
          {onClose && (
             <button onClick={onClose} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
               <X className="w-5 h-5" />
             </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 z-0 scroll-smooth">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
            {msg.role === 'model' && (
              <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm mt-1">
                <Bot className="w-5 h-5 text-science-600" />
              </div>
            )}
            
            <div className={`
              max-w-[85%] rounded-2xl p-4 text-[15px] leading-relaxed shadow-sm
              ${msg.role === 'user' 
                ? 'bg-science-600 text-white rounded-br-none shadow-science-500/20' 
                : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none shadow-slate-200/50'}
            `}>
              {msg.role === 'model' ? (
                <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0 prose-headings:text-slate-800 prose-strong:text-slate-900">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ) : (
                msg.text
              )}
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1">
                <User className="w-5 h-5 text-slate-400" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4 animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
              <Bot className="w-5 h-5 text-science-600" />
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-slate-100 flex items-center gap-3">
              <Loader2 className="w-4 h-4 text-science-500 animate-spin" />
              <span className="text-sm text-slate-400 font-medium">Analizando consulta...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-100 shrink-0 z-10">
        <div className="relative flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-science-500/20 focus-within:border-science-500 transition-all shadow-inner">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu pregunta aquí..."
            className="w-full pl-3 py-2.5 bg-transparent border-none focus:ring-0 resize-none text-sm text-slate-700 placeholder-slate-400"
            rows={1}
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-2.5 bg-science-600 text-white rounded-xl hover:bg-science-700 disabled:opacity-50 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-md shadow-science-500/30 hover:shadow-lg mb-0.5"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-3 font-medium">
          La IA puede cometer errores. Verifica la información.
        </p>
      </div>
    </div>
  );
};

export default AIChat;