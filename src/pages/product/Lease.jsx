import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bikeService } from '../../services/bikeService';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

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
        <div className="min-h-screen bg-[#F7F8FA] pb-20">
            <div className="container pt-20 pb-12">
                <div className="flex flex-col gap-4 mb-16">
                    <span className="badge-halo !text-xs italic uppercase">Smart Mobility Choice</span>
                    <h1 className="text-6xl font-black text-slate-900 tracking-tight">리스 승계</h1>
                    <p className="text-xl text-slate-500 font-bold max-w-2xl">가장 합리적인 가격으로 시작하는 방법. 라이디가 보증하는 투명한 리스 승계 매물을 확인하세요.</p>
                </div>

                {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 size={40} className="text-primary animate-spin" />
                        <p className="text-slate-400 font-bold">매물을 불러오는 중...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                        {leaseBikes.length > 0 ? (
                            leaseBikes.map((bike, idx) => (
                                <motion.div
                                    key={bike.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    viewport={{ once: true }}
                                >
                                    <Link to={`/product/detail/${bike.slug}`} className="group flex flex-col gap-4 p-3 bg-white border border-black/5 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
                                        <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-50 relative group">
                                            <img
                                                src={bike.successionImages?.[0] || ''}
                                                alt={bike.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                            />
                                            {/* Status Badge from Screenshot */}
                                            {bike.maintenanceStatus && (
                                                <div className="absolute top-5 left-5 bg-indigo-600 backdrop-blur-md px-4 py-1.5 rounded-xl border border-white/20 shadow-xl flex items-center gap-2">
                                                    <span className="text-[10px] font-bold text-indigo-100 uppercase tracking-widest opacity-80">제품 상태</span>
                                                    <span className="text-[13px] font-black text-white">{bike.maintenanceStatus}</span>
                                                </div>
                                            )}

                                            {bike.isCompleted && (
                                                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center">
                                                    <div className="px-8 py-3 bg-white rounded-full shadow-2xl">
                                                        <span className="text-xl font-black text-slate-900">승계 완료</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-5 px-1 pb-2">
                                            <div className="flex flex-col gap-1 px-2">
                                                <span className="text-[13px] font-black text-slate-400 uppercase tracking-wider">
                                                    {(bike.originalBrand === 'HONDA' ? '혼다' :
                                                        bike.originalBrand === 'YAMAHA' ? '야마하' :
                                                            bike.originalBrand === 'ZONTES' ? '존테스' : bike.originalBrand) || '기타'}
                                                </span>
                                                <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight line-clamp-2 break-all">
                                                    {bike.name}
                                                </h3>
                                            </div>

                                            <div className="h-px bg-slate-100 w-full" />

                                            <div className="grid grid-cols-1 gap-4">
                                                <div className="flex items-center justify-between text-slate-400 font-bold">
                                                    <span className="text-sm">연식</span>
                                                    <span className="text-slate-600">{bike.year || '-'}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-slate-400 font-bold">
                                                    <span className="text-sm">주행거리</span>
                                                    <span className="text-slate-600">
                                                        {bike.mileage ? (bike.mileage.toString().includes('km') ? bike.mileage : `${bike.mileage}km`) : '-'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-2 w-full bg-indigo-600 py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 group-hover:bg-indigo-700 transition-colors">
                                                <span className="text-[11px] md:text-sm font-bold text-indigo-200 uppercase tracking-widest">잔여</span>
                                                <span className="text-base md:text-xl font-black text-white">
                                                    {bike.remainingPeriod ? (bike.remainingPeriod.toString().includes('일') ? bike.remainingPeriod : `${bike.remainingPeriod}일`) : '-'}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-white rounded-xl border border-slate-100 shadow-sm">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
                                    <span className="text-4xl">🏍️</span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-2">등록된 승계 매물이 없습니다.</h3>
                                <p className="text-slate-500 font-bold">관리자 콘솔에서 새로운 매물을 등록해주세요.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Lease;
