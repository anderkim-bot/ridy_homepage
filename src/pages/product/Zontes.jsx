import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bikeService } from '../../services/bikeService';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Zontes = () => {
    const [zontesBikes, setZontesBikes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadBikes = async () => {
            try {
                const data = await bikeService.getBikes();
                setZontesBikes(data.filter(b => b.brand === 'ZONTES' && b.items?.some(item => item.image)));
            } catch (error) {
                console.error('Error loading Zontes bikes:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadBikes();
    }, []);

    return (
        <div className="min-h-screen bg-bg-light pb-20">
            <div className="container pt-20 pb-12">
                <div className="flex flex-col gap-4 mb-16">
                    <span className="text-[12px] font-bold text-primary italic uppercase tracking-widest">Next-Gen Innovation</span>
                    <h1 className="text-display-title">ZONTES</h1>
                    <p className="text-body font-bold text-text-muted max-w-2xl">차세대 강자 존테스, 스마트한 기술력과 독보적인 가성비의 최신 기종들을 경험해보세요.</p>
                </div>

                {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 size={40} className="text-primary animate-spin" />
                        <p className="text-text-muted font-bold">모델 정보를 불러오는 중...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {zontesBikes.length > 0 ? (
                            zontesBikes.map((bike, idx) => (
                                <motion.div
                                    key={bike.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Link to={`/product/detail/${bike.slug}`} className="group flex flex-col gap-4 p-4 bg-white rounded-xl border border-border-subtle shadow-sm hover:shadow-xl transition-all duration-500">
                                        <div className="aspect-4/3 rounded-lg overflow-hidden bg-white relative">
                                            <img
                                                src={bike.items[0]?.image}
                                                alt={bike.name}
                                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex flex-wrap gap-2 mb-1">
                                                    {bike.salesType?.includes('rental') && (
                                                        <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md uppercase tracking-tighter">반납형 렌탈</span>
                                                    )}
                                                    <span className="text-[10px] font-bold bg-bg-gray text-text-muted px-2 py-0.5 rounded-md uppercase tracking-tighter">인수형 리스</span>
                                                </div>
                                                <span className="text-[12px] font-bold text-text-muted uppercase tracking-widest">존테스</span>
                                                <h3 className="text-[20px] font-bold text-text-primary group-hover:text-primary line-clamp-2 break-all leading-tight transition-colors">{bike.name}</h3>
                                            </div>
                                            <div className="w-10 h-10 shrink-0 rounded-full bg-bg-light text-text-light flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>

                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center font-bold text-text-muted">등록된 ZONTES 모델이 없습니다.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Zontes;
