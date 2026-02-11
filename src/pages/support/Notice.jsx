import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Calendar,
    ChevronRight,
    Bell,
    Info,
    AlertCircle,
    PartyPopper,
    Filter,
    ArrowRight,
    Loader2
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const CATEGORIES = ['전체', '안내', '점검', '이벤트'];
const API_URL = 'http://localhost:5000/api/notices';

const CategoryBadge = ({ category }) => {
    const config = {
        '안내': { bg: 'bg-blue-50', text: 'text-blue-600', icon: Info },
        '점검': { bg: 'bg-orange-50', text: 'text-orange-600', icon: AlertCircle },
        '이벤트': { bg: 'bg-purple-50', text: 'text-purple-600', icon: PartyPopper }
    };

    const style = config[category] || { bg: 'bg-slate-50', text: 'text-slate-600', icon: Bell };
    const Icon = style.icon;

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black ${style.bg} ${style.text}`}>
            <Icon size={12} />
            {category}
        </span>
    );
};

const NoticeCard = ({ notice, index }) => {
    // Check if notice is within the last 3 days
    const isRecentlyAdded = useMemo(() => {
        try {
            const createdDate = new Date(notice.created_at);
            const now = new Date();
            const diffTime = Math.abs(now - createdDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 3;
        } catch (e) {
            return false;
        }
    }, [notice.created_at]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white rounded-xl p-6 md:p-8 border border-slate-100 transition-all hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 cursor-pointer"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                        <CategoryBadge category={notice.category} />
                        {isRecentlyAdded && (
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        )}
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {notice.title}
                    </h3>
                    <p className="text-slate-500 font-bold text-sm md:text-base line-clamp-2 leading-relaxed whitespace-pre-line">
                        {notice.content}
                    </p>
                </div>
                <div className="flex items-center justify-between md:flex-col md:items-end gap-2 shrink-0">
                    <span className="flex items-center gap-2 text-slate-400 font-bold text-sm">
                        <Calendar size={14} />
                        {notice.date}
                    </span>
                    <div className="p-2 rounded-full bg-slate-50 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <ChevronRight size={20} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Notice = () => {
    const [notices, setNotices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('전체');

    const fetchNotices = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setNotices(data);
        } catch (error) {
            console.error('Error fetching notices:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    const filteredNotices = useMemo(() => {
        return notices.filter(notice => {
            const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                notice.content.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === '전체' || notice.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [notices, searchQuery, activeCategory]);

    return (
        <>
            <Helmet>
                <title>공지사항 | 라이디 (Ridy)</title>
                <meta name="description" content="라이디의 새로운 소식과 긴급 안내 사항을 전해드립니다." />
            </Helmet>

            <div className="min-h-screen bg-[#F8FAFC] pb-32">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-50/50 to-transparent -z-10" />
                    <div className="max-w-7xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center space-y-4"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-black uppercase tracking-widest">
                                <Bell size={16} /> Notification
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
                                공지사항
                            </h1>
                            <p className="text-lg md:text-xl text-slate-500 font-bold max-w-2xl mx-auto">
                                라이디의 최신 소식과 서비스 이용에 필요한 <br className="hidden md:block" />
                                중요한 안내 사항을 가장 빠르게 전달해 드립니다.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Filters & Search */}
                <section className="sticky top-20 z-40 bg-[#F8FAFC]/80 backdrop-blur-xl border-y border-slate-200/50 py-4 mb-12">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            {/* Categories */}
                            <div className="flex p-1 bg-slate-200/50 rounded-lg w-full md:w-auto overflow-x-auto no-scrollbar">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-6 py-2.5 rounded-md text-sm font-black transition-all whitespace-nowrap ${activeCategory === cat
                                            ? 'bg-white text-indigo-600 shadow-sm'
                                            : 'text-slate-500 hover:text-slate-900'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Search */}
                            <div className="relative flex-1 w-full">
                                <input
                                    type="text"
                                    placeholder="공지사항 검색"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-lg px-12 py-3.5 font-bold focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Notice List */}
                <section className="max-w-5xl mx-auto px-6">
                    <div className="space-y-6">
                        {isLoading ? (
                            <div className="py-20 flex flex-col items-center justify-center gap-4">
                                <Loader2 className="animate-spin text-indigo-600" size={40} />
                                <p className="text-slate-400 font-bold">공지사항을 불러오는 중...</p>
                            </div>
                        ) : (
                            <AnimatePresence mode="popLayout">
                                {filteredNotices.length > 0 ? (
                                    filteredNotices.map((notice, index) => (
                                        <NoticeCard key={String(notice.id)} notice={notice} index={index} />
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="py-32 text-center space-y-4"
                                    >
                                        <div className="w-16 h-16 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Search size={32} />
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900">검색 결과가 없습니다.</h3>
                                        <p className="text-slate-500 font-bold">다른 키워드로 검색하거나 카테고리를 변경해 보세요.</p>
                                        <button
                                            onClick={() => { setSearchQuery(''); setActiveCategory('전체'); }}
                                            className="inline-flex items-center gap-2 text-indigo-600 font-black hover:gap-3 transition-all"
                                        >
                                            초기화하기 <ArrowRight size={18} />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
};

export default Notice;
