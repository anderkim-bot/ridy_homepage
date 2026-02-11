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
        <div className="min-h-screen bg-bg-light pb-20">
            <div className="container pt-20 pb-12">
                <div className="flex flex-col gap-4 mb-16">
                    <span className="text-[12px] font-bold text-primary italic uppercase tracking-widest">Smart Mobility Choice</span>
                    <h1 className="text-display-title">리스 승계</h1>
                    <p className="text-body font-bold text-text-muted max-w-2xl">가장 합리적인 가격으로 시작하는 방법. 라이디가 보증하는 투명한 리스 승계 매물을 확인하세요.</p>
                </div>

                {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 size={40} className="text-primary animate-spin" />
                        <p className="text-text-muted font-bold">매물을 불러오는 중...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {leaseBikes.length > 0 ? (
                            leaseBikes.map((bike, idx) => (
                                <motion.div
                                    key={bike.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    viewport={{ once: true }}
                                >
                                    <Link to={`/product/detail/${bike.slug}`} className="group flex flex-col gap-4 p-4 bg-white rounded-xl border border-border-subtle shadow-sm hover:shadow-xl transition-all duration-500">
                                        <div className="aspect-4/3 rounded-lg overflow-hidden bg-white relative">
                                            <img
                                                src={bike.successionImages?.[0] || ''}
                                                alt={bike.name}
                                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000"
                                            />
                                            {/* Status Badge */}
                                            {bike.maintenanceStatus && (
                                                <div className="absolute top-4 left-4 bg-primary px-3 py-1.5 rounded-md shadow-lg flex items-center gap-2">
                                                    <span className="text-[10px] font-bold text-white uppercase tracking-widest opacity-80">제품 상태</span>
                                                    <span className="text-[12px] font-bold text-white">{bike.maintenanceStatus}</span>
                                                </div>
                                            )}

                                            {bike.isCompleted && (
                                                <div className="absolute inset-0 bg-bg-dark/60 backdrop-blur-sm flex items-center justify-center">
                                                    <div className="px-8 py-3 bg-white rounded-xl shadow-2xl">
                                                        <span className="text-[20px] font-bold text-bg-dark">승계 완료</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-5">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[12px] font-bold text-text-muted uppercase tracking-widest">
                                                    {(bike.originalBrand === 'HONDA' ? '혼다' :
                                                        bike.originalBrand === 'YAMAHA' ? '야마하' :
                                                            bike.originalBrand === 'ZONTES' ? '존테스' : bike.originalBrand) || '기타'}
                                                </span>
                                                <h3 className="text-[20px] font-bold text-text-primary leading-tight line-clamp-2 break-all group-hover:text-primary transition-colors">
                                                    {bike.name}
                                                </h3>
                                            </div>

                                            <div className="h-px bg-bg-gray w-full" />

                                            <div className="grid grid-cols-1 gap-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[12px] font-bold text-text-muted uppercase tracking-widest">연식</span>
                                                    <span className="text-[14px] font-bold text-text-secondary">{bike.year || '-'}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[12px] font-bold text-text-muted uppercase tracking-widest">주행거리</span>
                                                    <span className="text-[14px] font-bold text-text-secondary">
                                                        {bike.mileage ? (bike.mileage.toString().includes('km') ? bike.mileage : `${bike.mileage}km`) : '-'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-2 w-full bg-primary py-3 rounded-md flex items-center justify-center gap-2 shadow-lg shadow-primary/20 group-hover:translate-y-[-2px] transition-all">
                                                <span className="text-[12px] font-bold text-white/70 uppercase tracking-widest">잔여</span>
                                                <span className="text-[18px] font-bold text-white">
                                                    {bike.remainingPeriod ? (bike.remainingPeriod.toString().includes('일') ? bike.remainingPeriod : `${bike.remainingPeriod}일`) : '-'}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>

                            ))
                        ) : (
                            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-white rounded-lg border border-border-subtle shadow-sm">
                                <div className="w-20 h-20 bg-bg-light rounded-full flex items-center justify-center text-3xl mb-6">
                                    🏍️
                                </div>
                                <h3 className="text-sub-title mb-2">등록된 승계 매물이 없습니다.</h3>
                                <p className="text-text-muted font-bold">관리자 콘솔에서 새로운 매물을 등록해주세요.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

};

export default Lease;
