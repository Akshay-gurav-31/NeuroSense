
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, UserAccount, UserRole } from '../types';
import { dataService } from '../services/supabase.service';
import { Icons } from './Icons';

interface ChatSystemProps {
    currentUser: UserAccount;
    otherUser: UserAccount;
    onClose?: () => void;
    darkMode: boolean;
}

const ChatSystem: React.FC<ChatSystemProps> = ({ currentUser, otherUser, onClose, darkMode }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await dataService.getMessages(currentUser.id, otherUser.id);
                setMessages(data);
            } catch (err) {
                console.error('Failed to fetch messages:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 3000); // Polling for real-time feel
        return () => clearInterval(interval);
    }, [currentUser.id, otherUser.id]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const content = newMessage.trim();
        setNewMessage('');

        try {
            await dataService.sendMessage(currentUser.id, otherUser.id, content);
            const data = await dataService.getMessages(currentUser.id, otherUser.id);
            setMessages(data);
        } catch (err) {
            console.error('Failed to send message:', err);
        }
    };

    const isDoctor = currentUser.role === UserRole.DOCTOR;
    const accentColor = isDoctor ? '#10b981' : '#48c1cf';

    return (
        <div className={`flex flex-col h-full rounded-[2.5rem] border-2 shadow-2xl overflow-hidden transition-all duration-300 ${darkMode ? 'bg-[#050505] border-white/10' : 'bg-white border-slate-100'
            }`}>
            {/* Chat Header */}
            <div className={`p-6 border-b flex items-center justify-between ${darkMode ? 'border-white/5 bg-white/5' : 'border-slate-50 bg-slate-50'
                }`}>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg relative overflow-hidden"
                        style={{ backgroundColor: isDoctor ? '#48c1cf' : '#10b981' }}>
                        {otherUser.avatarUrl ? (
                            <img src={otherUser.avatarUrl} alt={otherUser.name} className="w-full h-full object-cover" />
                        ) : (
                            otherUser.name.charAt(0)
                        )}
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-[#050505] rounded-full"></div>
                    </div>
                    <div>
                        <h3 className="font-black text-lg tracking-tight leading-none text-[#1a365d] dark:text-white">{otherUser.name}</h3>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">
                            {otherUser.role === UserRole.DOCTOR ? 'Verified Physician' : 'Clinical Patient'}
                        </p>
                    </div>
                </div>
                {onClose && (
                    <button onClick={onClose} className="p-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors text-slate-400">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12" /></svg>
                    </button>
                )}
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar">
                {loading ? (
                    <div className="h-full flex items-center justify-center">
                        <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center px-10">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-3xl flex items-center justify-center text-slate-300 mb-4">
                            <Icons.Mic size={32} />
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-loose">
                            Start a secure conversation.<br />Clinical data is encrypted.
                        </p>
                    </div>
                ) : (
                    messages.map((m, idx) => {
                        const isMe = m.senderId === currentUser.id;
                        return (
                            <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                                <div className={`max-w-[80%] p-4 rounded-3xl text-sm font-medium shadow-md ${isMe
                                        ? `bg-[${accentColor}] text-white rounded-br-none shadow-[${accentColor}]/20`
                                        : `${darkMode ? 'bg-white/10 text-white' : 'bg-slate-100 text-[#1a365d]'} rounded-bl-none`
                                    }`}
                                    style={isMe ? { backgroundColor: accentColor } : {}}>
                                    {m.content}
                                    <div className={`text-[8px] font-bold uppercase tracking-tighter mt-1 opacity-50 ${isMe ? 'text-right' : 'text-left'}`}>
                                        {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Input Area */}
            <div className={`p-6 border-t ${darkMode ? 'border-white/5' : 'border-slate-50'}`}>
                <form onSubmit={handleSend} className="flex items-center gap-3">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className={`flex-grow px-6 py-4 rounded-2xl text-sm font-medium transition-all outline-none border-2 ${darkMode
                                ? 'bg-white/5 border-white/5 focus:border-[#48c1cf]/30 text-white'
                                : 'bg-slate-50 border-slate-50 focus:border-[#48c1cf]/30 text-[#1a365d]'
                            }`}
                    />
                    <button
                        type="submit"
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg active:scale-90 transition-all shimmer"
                        style={{ backgroundColor: accentColor }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="rotate-45 -translate-x-0.5 translate-y-0.5"><path d="m22 2-7 20-4-9-9-4 20-7z" /><path d="M22 2 11 13" /></svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatSystem;
