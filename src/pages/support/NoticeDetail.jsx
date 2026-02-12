import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, FileText, Share2, Printer } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const NoticeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [notice, setNotice] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                // In a real app, optimize this to fetch single item or use cache
                // For now assuming we can fetch all and find, or single fetch if API supports
                const response = await fetch(`http://localhost:5000/api/notices/${id}`);
                if (!response.ok) {
                    throw new Error('Notice not found');
                }
                const data = await response.json();
                setNotice(data);
            } catch (error) {
                console.error('Error fetching notice:', error);
                // Fallback: try finding in list if single fetch fails (mock scenario)
                try {
                    const listResponse = await fetch('http://localhost:5000/api/notices');
                    const listData = await listResponse.json();
                    const found = listData.find(n => String(n.id) === id);
                    if (found) setNotice(found);
                } catch (e) {
                    console.error('Fallback fetch failed', e);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotice();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!notice) {
        return (
            <div className="min-h-screen pt-32 text-center">
                <h2 className="text-2xl font-bold text-slate-800">공지사항을 찾을 수 없습니다.</h2>
                <button
                    onClick={() => navigate('/board/notice')}
                    className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                    목록으로 돌아가기
                </button>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{notice.title} | 라이디 비즈니스</title>
                <meta name="description" content={notice.content.substring(0, 100)} />
            </Helmet>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="min-h-screen bg-slate-50 pb-20"
            >
                {/* Header Background */}
                {notice.image ? (
                    <div className="absolute top-0 left-0 w-full h-[60vh] z-0">
                        <div className="absolute inset-0 bg-slate-900/40 z-10" />
                        <img src={notice.image} alt="" className="w-full h-full object-cover" />
                    </div>
                ) : (
                    <div className="h-64 bg-slate-900 absolute top-0 left-0 w-full z-0" />
                )}

                <div className="container relative z-10 pt-20 md:pt-32 px-6 max-w-4xl mx-auto">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/board/notice')}
                        className="flex items-center text-white/70 hover:text-white mb-8 transition-colors gap-2 font-bold"
                    >
                        <ArrowLeft size={20} />
                        목록으로
                    </button>

                    {/* Content Card */}
                    <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden">
                        <div className="p-8 md:p-12 border-b border-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                                <span className={`px-3 py-1 rounded-full text-xs font-black
                                    ${notice.category === '안내' ? 'bg-blue-50 text-blue-600' :
                                        notice.category === '점검' ? 'bg-orange-50 text-orange-600' :
                                            notice.category === '이벤트' ? 'bg-purple-50 text-purple-600' :
                                                'bg-slate-100 text-slate-600'}`}>
                                    {notice.category}
                                </span>
                                <span className="flex items-center text-slate-400 text-sm font-bold gap-1">
                                    <Calendar size={14} />
                                    {notice.date}
                                </span>
                            </div>

                            <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-4">
                                {notice.title}
                            </h1>
                        </div>

                        <div className="p-8 md:p-12 bg-white min-h-[300px]">
                            <div className="prose prose-lg max-w-none text-slate-600 font-medium leading-relaxed whitespace-pre-line">
                                {notice.content}
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="bg-slate-50 px-8 py-6 border-t border-slate-100 flex justify-between items-center">
                            <div className="flex gap-4">
                                {/* Next/Prev navigation could go here */}
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-slate-400 hover:text-primary transition-colors" title="공유하기">
                                    <Share2 size={20} />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-primary transition-colors" title="인쇄하기">
                                    <Printer size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default NoticeDetail;
