import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, ChevronRight } from 'lucide-react';

const NoticeBanner = () => {
    const [notice, setNotice] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLatestNotice = async () => {
            try {
                // Assuming typical API port 5000 based on other files
                const response = await fetch('http://localhost:5000/api/notices');
                const data = await response.json();
                if (data && data.length > 0) {
                    // Sort by date descending
                    const sorted = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    setNotice(sorted[0]);
                }
            } catch (error) {
                console.error('Failed to fetch notices for banner', error);
            }
        };
        fetchLatestNotice();
    }, []);

    if (!notice) return null;

    return (
        <div
            onClick={() => navigate(`/board/notice/${notice.id}`)}
            className="w-full bg-slate-900 border-b border-white/10 h-10 overflow-hidden cursor-pointer group relative z-40"
        >
            <div className="container h-full flex items-center px-4 md:px-6 mx-auto max-w-7xl">
                {/* Label */}
                <div className="flex items-center gap-2 text-primary font-black text-[10px] md:text-xs uppercase tracking-widest shrink-0 z-10 bg-slate-900 py-1 pr-6 shadow-[10px_0_20px_rgba(15,23,42,1)]">
                    <Bell size={14} className="animate-pulse" />
                    <span>Notice</span>
                </div>

                {/* ticker container */}
                <div className="flex-1 overflow-hidden relative h-full flex items-center">
                    <motion.div
                        className="whitespace-nowrap flex items-center text-xs md:text-sm font-medium text-white/90"
                        animate={{ x: ["50%", "-100%"] }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop"
                        }}
                    >
                        <span className="inline-flex px-2 py-0.5 rounded bg-white/10 text-[10px] text-white/70 mr-3 border border-white/5">
                            {notice.category}
                        </span>
                        <span className="mr-8">{notice.title}</span>

                        {/* Repeat for seamless look (simple mock, better with duplicated content logic but this ensures one pass is long enough) */}
                        <span className="inline-flex px-2 py-0.5 rounded bg-white/10 text-[10px] text-white/70 mr-3 border border-white/5 opacity-50">
                            {notice.category}
                        </span>
                        <span>{notice.title}</span>
                    </motion.div>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center text-white/30 text-xs font-bold gap-1 shrink-0 z-10 bg-slate-900 pl-6 shadow-[-10px_0_20px_rgba(15,23,42,1)] group-hover:text-primary transition-colors">
                    상세보기 <ChevronRight size={12} />
                </div>
            </div>
        </div>
    );
};

export default NoticeBanner;
