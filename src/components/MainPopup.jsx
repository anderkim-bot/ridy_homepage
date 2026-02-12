import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MainPopup = () => {
    const [popups, setPopups] = useState([]);
    const [hiddenPopups, setHiddenPopups] = useState([]);

    useEffect(() => {
        const fetchPopups = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/popups');
                const data = await response.json();

                // Use local date string for comparison to avoid timezone issues
                // Note: This relies on the browser's local time, which matches the user's context
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const todayStr = `${year}-${month}-${day}`;

                const active = data.filter(p => {
                    if (!p.isActive) return false;

                    // String comparison works for YYYY-MM-DD
                    return todayStr >= p.startDate && todayStr <= p.endDate;
                });

                // Check localStorage
                const visible = active.filter(p => {
                    const hideKey = `popup_hide_${p.id}_${todayStr}`;
                    return !localStorage.getItem(hideKey);
                });

                setPopups(visible);
            } catch (error) {
                console.error('Failed to load popups', error);
            }
        };

        fetchPopups();
    }, []);

    const handleClose = (id, hideForToday = false) => {
        if (hideForToday) {
            const todayStr = new Date().toISOString().split('T')[0];
            localStorage.setItem(`popup_hide_${id}_${todayStr}`, 'true');
        }
        setHiddenPopups(prev => [...prev, id]);
    };

    const visiblePopups = popups.filter(p => !hiddenPopups.includes(p.id));

    if (visiblePopups.length === 0) return null;

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center sm:items-center sm:justify-center">
            {/* 
               We use pointer-events-none for the container so it doesn't block clicks on the rest of the site if empty areas.
               But the popups themselves must be pointer-events-auto.
            */}

            {/* Background Dim - Optional. Often main popups have a dim. 
                If we have multiple popups, a single dim is cleaner. 
            */}
            <div className="absolute inset-0 bg-black/40 pointer-events-auto" onClick={() => hiddenPopups.length === 0 && visiblePopups.forEach(p => handleClose(p.id))} />

            <div className="relative z-10 flex flex-col md:flex-row gap-4 p-4 pointer-events-none items-center justify-center w-full max-w-5xl">
                {visiblePopups.map((popup) => (
                    <motion.div
                        key={popup.id}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="pointer-events-auto w-[300px] md:w-[600px] bg-white overflow-hidden shadow-2xl flex flex-col"
                    >
                        {/* Image Area */}
                        <div className="relative aspect-square bg-slate-100">
                            {popup.image ? (
                                <img src={popup.image} alt={popup.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300">No Image</div>
                            )}
                        </div>

                        {/* Footer Controls */}
                        <div className="flex bg-slate-900 text-white">
                            <button
                                onClick={() => handleClose(popup.id, true)}
                                className="flex-1 py-3 text-xs md:text-sm font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border-r border-slate-700"
                            >
                                오늘 하루 그만 보기
                            </button>
                            <button
                                onClick={() => handleClose(popup.id, false)}
                                className="flex-1 py-3 text-xs md:text-sm font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                            >
                                닫기
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default MainPopup;
