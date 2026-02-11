import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bikeService } from '../../services/bikeService';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

import ProductTabs from '../../components/ProductTabs';

const Honda = () => {
    const [hondaBikes, setHondaBikes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadBikes = async () => {
            try {
                const data = await bikeService.getBikes();
                setHondaBikes(data.filter(b => b.brand === 'HONDA' && b.items?.some(item => item.image)));
            } catch (error) {
                console.error('Error loading Honda bikes:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadBikes();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header section with gradient background */}
            <div className="bg-white pt-32 pb-16">
                <div className="container px-6">
                    <div className="flex flex-col gap-4 max-w-4xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[12px] font-black text-primary uppercase tracking-[0.2em] italic"
                        >
                            World Class Quality
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[40px] md:text-[64px] font-black text-slate-900 leading-tight"
                        >
                            HONDA
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-[16px] md:text-[20px] font-bold text-slate-500 leading-relaxed"
                        >
                            기술의 혼다, 전국 라이디 지점에서 가장 신뢰받는 인기 모델들을 지금 렌탈로 만나보세요.
                        </motion.p>
                    </div>
                </div>
            </div>

            <ProductTabs activeBrand="HONDA" />

            <div className="container pb-32">
                {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 size={40} className="text-primary animate-spin" />
                        <p className="text-slate-400 font-bold">모델 정보를 불러오는 중...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {hondaBikes.length > 0 ? (
                            hondaBikes.map((bike, idx) => (
                                <motion.div
                                    key={bike.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    viewport={{ once: true }}
                                >
                                    <Link
                                        to={`/product/detail/${bike.slug}`}
                                        className="group flex flex-col h-full bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 overflow-hidden"
                                    >
                                        <div className="aspect-4/3 bg-slate-50/50 relative overflow-hidden flex items-center justify-center p-4">
                                            <div className="absolute inset-0 bg-linear-to-b from-transparent to-slate-100/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <img
                                                src={bike.items?.[0]?.image}
                                                alt={bike.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 relative z-10"
                                            />
                                        </div>
                                        <div className="flex flex-col p-5 gap-4 flex-1">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {(bike.name === 'PCX125' || bike.salesType?.includes('rental')) && (
                                                        <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md uppercase">반납형 렌탈</span>
                                                    )}
                                                    <span className="text-[10px] font-black bg-slate-50 text-slate-400 px-2 py-0.5 rounded-md uppercase">인수형 리스</span>
                                                </div>
                                                <div className="pt-2">
                                                    <span className="block text-[11px] font-black text-slate-300 uppercase tracking-widest mb-1">HONDA</span>
                                                    <h3 className="text-[16px] md:text-[18px] font-black text-slate-900 group-hover:text-primary line-clamp-2 leading-snug transition-colors">{bike.name}</h3>
                                                </div>
                                            </div>

                                            <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
                                                <span className="text-[12px] font-black text-primary underline underline-offset-4 decoration-primary/30">자세히 보기</span>
                                                <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-300 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center font-bold text-slate-400 bg-white rounded-xl border border-slate-100">등록된 HONDA 모델이 없습니다.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Honda;
