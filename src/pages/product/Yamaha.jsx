import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bikeService } from '../../services/bikeService';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Yamaha = () => {
    const [yamahaBikes, setYamahaBikes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadBikes = async () => {
            try {
                const data = await bikeService.getBikes();
                setYamahaBikes(data.filter(b => b.brand === 'YAMAHA' && b.items?.some(item => item.image)));
            } catch (error) {
                console.error('Error loading Yamaha bikes:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadBikes();
    }, []);

    return (
        <div className="min-h-screen bg-[#F7F8FA] pb-20">
            <div className="container pt-20 pb-12">
                <div className="flex flex-col gap-4 mb-16">
                    <span className="badge-halo !text-xs italic uppercase">Kando (Emotion) & Performance</span>
                    <h1 className="text-6xl font-black text-slate-900 tracking-tight">YAMAHA</h1>
                    <p className="text-xl text-slate-500 font-bold max-w-2xl">감동의 야마하, 감각적인 디자인과 탁월한 엔진 성능을 자랑하는 렌탈 라인업을 확인하세요.</p>
                </div>

                {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 size={40} className="text-primary animate-spin" />
                        <p className="text-slate-400 font-bold">모델 정보를 불러오는 중...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                        {yamahaBikes.length > 0 ? (
                            yamahaBikes.map((bike, idx) => (
                                <motion.div
                                    key={bike.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Link to={`/product/detail/${bike.slug}`} className="group flex flex-col gap-4 p-3 bg-white border border-black/5 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
                                        <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-50">
                                            <img
                                                src={bike.items[0]?.image}
                                                alt={bike.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-4 px-1 pb-2">
                                            <div className="flex flex-col gap-1 px-2">
                                                <div className="flex flex-wrap gap-2 mb-1">
                                                    {bike.salesType?.includes('rental') && (
                                                        <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md uppercase tracking-tighter">반납형 렌탈</span>
                                                    )}
                                                    <span className="text-[10px] font-black bg-slate-50 text-slate-500 px-2 py-0.5 rounded-md uppercase tracking-tighter">인수형 리스</span>
                                                </div>
                                                <span className="text-[13px] font-black text-slate-400 uppercase tracking-wider">야마하</span>
                                                <h3 className="text-xl md:text-2xl font-black text-slate-900 line-clamp-2 break-all leading-tight">{bike.name}</h3>
                                            </div>
                                            <div className="w-10 h-10 shrink-0 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all mt-1">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center font-bold text-slate-400">등록된 YAMAHA 모델이 없습니다.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Yamaha;
