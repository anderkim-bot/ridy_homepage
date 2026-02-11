import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bikeService } from '../../services/bikeService';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

import ProductTabs from '../../components/ProductTabs';

const Lease = () => {
    const [leaseBikes, setLeaseBikes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadLeaseBikes = async () => {
            try {
                const data = await bikeService.getBikes();
                setLeaseBikes(data.filter(b => b.brand === 'SUCCESSION'));
            } catch (error) {
                console.error('Error loading lease bikes:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadLeaseBikes();
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
                            Smart Mobility Choice
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[40px] md:text-[64px] font-black text-slate-900 leading-tight"
                        >
                            리스 승계
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-[16px] md:text-[20px] font-bold text-slate-500 leading-relaxed"
                        >
                            가장 합리적인 가격으로 시작하는 방법. 라이디가 보증하는 투명한 리스 승계 매물을 확인하세요.
                        </motion.p>
                    </div>
                </div>
            </div>

            <ProductTabs activeBrand="SUCCESSION" />

            <div className="container pb-32">
                {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 size={40} className="text-primary animate-spin" />
                        <p className="text-slate-400 font-bold">매물을 불러오는 중...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {leaseBikes.length > 0 ? (
                            leaseBikes.map((bike, idx) => (
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
                                                src={bike.successionImages?.[0] || ''}
                                                alt={bike.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 relative z-10"
                                            />
                                            {/* Status Badge */}
                                            {bike.maintenanceStatus && (
                                                <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-md px-3 py-1.5 rounded-md shadow-lg flex items-center gap-2 z-20">
                                                    <span className="text-[10px] font-black text-white/70 uppercase">상태</span>
                                                    <span className="text-[12px] font-black text-white">{bike.maintenanceStatus}</span>
                                                </div>
                                            )}

                                            {bike.isCompleted && (
                                                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-30">
                                                    <div className="px-6 py-2 bg-white rounded-lg shadow-2xl scale-110">
                                                        <span className="text-[16px] font-black text-slate-900">승계 완료</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col p-5 gap-4 flex-1">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">
                                                        {(bike.originalBrand === 'HONDA' ? '혼다' :
                                                            bike.originalBrand === 'YAMAHA' ? '야마하' :
                                                                bike.originalBrand === 'ZONTES' ? '존테스' : bike.originalBrand) || '기타'}
                                                    </span>
                                                    <h3 className="text-[16px] md:text-[18px] font-black text-slate-900 group-hover:text-primary line-clamp-2 leading-snug transition-colors">
                                                        {bike.name}
                                                    </h3>
                                                </div>

                                                <div className="grid grid-cols-2 gap-2 pt-2">
                                                    <div className="bg-slate-50 rounded-lg p-2 flex flex-col items-center justify-center">
                                                        <span className="text-[10px] font-black text-slate-300 uppercase">연식</span>
                                                        <span className="text-[13px] font-black text-slate-600">{bike.year || '-'}</span>
                                                    </div>
                                                    <div className="bg-slate-50 rounded-lg p-2 flex flex-col items-center justify-center">
                                                        <span className="text-[10px] font-black text-slate-300 uppercase">주행</span>
                                                        <span className="text-[13px] font-black text-slate-600">
                                                            {bike.mileage ? (bike.mileage.toString().includes('km') ? bike.mileage : `${bike.mileage}km`) : '-'}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="mt-2 w-full bg-primary/5 py-3 rounded-lg flex items-center justify-center gap-2 border border-primary/10 transition-colors group-hover:bg-primary/10">
                                                    <span className="text-[11px] font-black text-primary/60 uppercase tracking-widest">잔여</span>
                                                    <span className="text-[18px] font-bold text-primary">
                                                        {bike.remainingPeriod ? (bike.remainingPeriod.toString().includes('일') ? bike.remainingPeriod : `${bike.remainingPeriod}일`) : '-'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
                                                <span className="text-[12px] font-black text-primary underline underline-offset-4 decoration-primary/30">매물 보기</span>
                                                <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-300 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center font-bold text-slate-400 bg-white rounded-xl border border-slate-100">등록된 승계 매물이 없습니다.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Lease;
