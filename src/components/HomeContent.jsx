import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bike, Wallet, Wrench, ChevronRight, Star, Loader2 } from 'lucide-react';
import { bikeService } from '../services/bikeService';

const ServiceCard = ({ icon: Icon, title, description, href, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="h-full"
    >
        <Link to={href} className="flex flex-col h-full bg-white p-10 rounded-[24px] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-primary/20 hover:-translate-y-2 transition-all duration-500 group">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 border border-slate-100 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Icon size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-[24px] font-black tracking-tight text-slate-900 mb-4">{title}</h3>
            <p className="text-[16px] leading-[1.6] text-slate-500 font-medium mb-10">
                {description}
            </p>
            <div className="mt-auto flex items-center text-[15px] font-black text-primary">
                <span className="relative">
                    자세히 보기
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </span>
                <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
        </Link>
    </motion.div>
);

const ModelCard = ({ name, brand, slug, image, index }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="group h-full"
    >
        <Link to={`/product/detail/${slug}`} className="flex flex-col h-full bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-500">
            <div className="aspect-[4/3] bg-slate-50 relative overflow-hidden flex items-center justify-center p-8">
                {image ? (
                    <img src={image} alt={name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-200">
                        <Bike size={48} strokeWidth={1} />
                    </div>
                )}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-lg text-[11px] font-black text-slate-400 uppercase tracking-wider">{brand}</span>
                </div>
            </div>
            <div className="p-8 flex flex-col items-center text-center">
                <h4 className="text-[18px] font-black text-slate-900 mb-6 group-hover:text-primary transition-colors">{name}</h4>
                <div className="w-full py-3.5 border-2 border-slate-100 rounded-xl text-[14px] font-black text-slate-400 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                    상세 사양 보기
                </div>
            </div>
        </Link>
    </motion.div>
);

const ReviewCard = ({ name, content, rating, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#FBFBFC] p-10 rounded-[32px] border border-slate-100 flex flex-col h-full"
    >
        <div className="flex gap-1 text-primary mb-6">
            {[...Array(rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
        </div>
        <p className="text-[17px] font-semibold text-slate-600 leading-[1.8] mb-10 italic">"{content}"</p>
        <div className="flex items-center gap-4 mt-auto">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary font-black text-sm border border-slate-50">{name[0]}</div>
            <div className="flex flex-col">
                <span className="text-slate-900 font-black text-sm">{name} 라이더님</span>
                <span className="text-slate-400 font-bold text-[12px]">실사용 인증 고객</span>
            </div>
        </div>
    </motion.div>
);

const HomeContent = () => {
    const [displayModels, setDisplayModels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const services = [
        { icon: Bike, title: "RIDY Rental", description: "배달 입문부터 베테랑까지. 보험과 정비가 포함된 합리적인 오토바이 렌탈 서비스.", href: "/service/rental" },
        { icon: Wallet, title: "RIDY Payout", description: "복잡한 정산은 이제 그만. 라이디 앱 하나로 실시간 수익 관리와 즉시 출금을 시작하세요.", href: "/service/payout" },
        { icon: Wrench, title: "RIDY Service Center", description: "전국 최대 네트워크. 라이더 전용 장비와 전문 메카닉이 당신의 안전 주행을 지원합니다.", href: "/service/center" }
    ];

    useEffect(() => {
        const loadModels = async () => {
            try {
                const data = await bikeService.getBikes();
                const allBikes = data.filter(b => b.brand !== 'SUCCESSION' && b.items?.some(item => item.image));
                const popularModels = allBikes.filter(b => b.isPopular).slice(0, 4);
                setDisplayModels(popularModels.length > 0 ? popularModels : allBikes.slice(0, 4));
            } catch (error) {
                console.error('Error loading home models:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadModels();
    }, []);

    const reviews = [
        { name: "김*한", content: "렌탈부터 정비까지 라이디 하나로 해결되니 배달에만 집중할 수 있어 너무 편합니다.", rating: 5 },
        { name: "이*민", content: "급하게 당일 출고가 필요했는데 상담부터 배송까지 하루 만에 끝내주셨어요. 최고입니다.", rating: 5 },
        { name: "박*우", content: "페이아웃 앱 덕분에 정산 관리가 정말 쉬워졌어요. 실시간으로 수익 보는 재미가 있네요.", rating: 5 }
    ];

    return (
        <div className="flex flex-col">
            {/* Core Services Section */}
            <section className="bg-white py-32 md:py-48">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center mb-24 flex flex-col gap-6">
                        <div className="text-primary font-black text-[14px] tracking-[0.2em] uppercase">Core Business</div>
                        <h2 className="text-[36px] md:text-[52px] font-black tracking-tight text-slate-900 leading-tight">라이디 핵심 서비스</h2>
                        <p className="text-[18px] text-slate-500 font-bold leading-relaxed">
                            배달 라이더와 운영자를 위한 라이디만의 <br className="hidden md:block" /> 차별화된 올인원 플랫폼 서비스를 만나보세요.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <ServiceCard key={index} {...service} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Models Section */}
            <section className="bg-[#F8F9FD] py-32 md:py-48 border-y border-slate-100">
                <div className="container">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                        <div className="flex flex-col gap-4">
                            <div className="text-primary font-black text-[14px] tracking-[0.2em] uppercase">Our Marketplace</div>
                            <h2 className="text-[36px] md:text-[52px] font-black tracking-tight text-slate-900">렌탈 기종 보기</h2>
                        </div>
                        <Link to="/product/honda" className="inline-flex items-center text-primary font-black text-[16px] group">
                            전체 기종 페이지로 이동
                            <ChevronRight size={20} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="py-20 flex flex-col items-center justify-center gap-4">
                            <Loader2 size={40} className="text-primary animate-spin" />
                            <p className="text-slate-400 font-bold">기종 정보를 불러오는 중...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                            {displayModels.length > 0 ? (
                                displayModels.map((bike, index) => (
                                    <ModelCard
                                        key={bike.id || index}
                                        name={bike.name}
                                        brand={bike.brand}
                                        slug={bike.slug}
                                        image={bike.items?.[0]?.image}
                                        index={index}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center font-bold text-slate-400 bg-white rounded-3xl border border-slate-100">등록된 인기 기종이 없습니다.</div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Reviews Section */}
            <section className="bg-white py-32 md:py-48">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center mb-20 flex flex-col gap-6">
                        <div className="text-primary font-black text-[14px] tracking-[0.2em] uppercase">Testimonials</div>
                        <h2 className="text-[36px] md:text-[52px] font-black tracking-tight text-slate-900 leading-tight">라이더 생생 후기</h2>
                        <p className="text-[18px] text-slate-500 font-bold leading-relaxed">라이디와 함께 성공적인 라이딩 파트너십을 이어가는 <br className="hidden md:block" /> 많은 전문가들의 이야기입니다.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {reviews.map((review, index) => (
                            <ReviewCard key={index} {...review} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeContent;
