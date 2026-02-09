import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bike, Wallet, Wrench, ChevronRight, Star, Gauge, Zap, Weight, Cpu, Thermometer, Info, Loader2 } from 'lucide-react';
import { bikeService } from '../services/bikeService';

const ServiceCard = ({ icon: Icon, title, description, color, href, index }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
    >
        <Link to={href} className="card-halo transition-all bg-white group block h-full">
            <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${color}15`, color: color }}
            >
                <Icon size={32} />
            </div>
            <h3 className="text-2xl font-black mb-4 text-foreground">{title}</h3>
            <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">
                {description}
            </p>
            <div className="mt-auto flex items-center text-sm transition-all duration-300 opacity-0 group-hover:opacity-100 text-slate-500 font-bold group-hover:text-primary group-hover:font-black">
                <span>자세히 보기</span>
                <ChevronRight size={18} className="ml-1" />
            </div>
        </Link>
    </motion.div>
);

const ModelCard = ({ name, brand, slug, image, index }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="card-halo !p-0 overflow-hidden bg-white border border-slate-50 group"
    >
        <Link to={`/product/detail/${slug}`} className="block">
            <div className="aspect-[4/3] bg-slate-50 relative overflow-hidden rounded-t-xl">
                {image ? (
                    <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <span className="text-4xl text-slate-200">🏍️</span>
                    </div>
                )}
            </div>
            <div className="p-4 md:p-6 flex flex-col gap-4">
                <div className="flex flex-col gap-1 px-1">
                    <span className="text-[13px] font-black text-slate-400 uppercase tracking-wider">
                        {(brand === 'HONDA' ? '혼다' :
                            brand === 'YAMAHA' ? '야마하' :
                                brand === 'ZONTES' ? '존테스' :
                                    brand === 'SUCCESSION' ? '리스 승계' : brand) || '기타'}
                    </span>
                    <h4 className="text-lg md:text-2xl font-black text-foreground line-clamp-1">{name}</h4>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-slate-50 mt-4">
                    <span className="text-slate-400 font-bold text-sm group-hover:text-primary transition-colors">상세보기</span>
                    <button className="btn-halo btn-halo-primary !py-2 !px-4 !text-xs">상담신청</button>
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
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="card-halo bg-white"
    >
        <div className="flex gap-1 text-yellow-400 mb-4">
            {[...Array(rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
        </div>
        <p className="text-slate-600 font-medium leading-relaxed mb-10 italic">"{content}"</p>
        <div className="flex items-center gap-3 mt-auto">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs">{name[0]}</div>
            <span className="text-foreground font-black text-sm">{name} 라이더님</span>
        </div>
    </motion.div>
);

const HomeContent = () => {
    const [displayModels, setDisplayModels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const services = [
        { icon: Bike, title: "RIDY Rental", description: "배달 입문부터 베테랑까지. 보험과 정비가 포함된 합리적인 오토바이 렌탈 서비스.", color: "#4A61ED", href: "/service/rental" },
        { icon: Wallet, title: "RIDY Payout", description: "복잡한 정산은 이제 그만. 라이디 앱 하나로 실시간 수익 관리와 즉시 출금을 시작하세요.", color: "#F59E0B", href: "/service/payout" },
        { icon: Wrench, title: "RIDY Service Center", description: "전국 최대 네트워크. 라이더 전용 장비와 전문 메카닉이 당신의 안전 주행을 지원합니다.", color: "#EF4444", href: "/service/center" }
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
            <section className="bg-white">
                <div className="container">
                    <div className="mb-20 text-center flex flex-col gap-6">
                        <h2 className="text-h2 text-foreground">라이디 핵심 서비스</h2>
                        <p className="text-p max-w-2xl mx-auto font-bold opacity-80">
                            배달 라이더와 운영자를 위한 라이디만의 <br className="hidden md:block" /> 차별화된 올인원 플랫폼 서비스를 만나보세요.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {services.map((service, index) => (
                            <ServiceCard key={index} {...service} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Models Section */}
            <section className="bg-[#F7F8FA]">
                <div className="container">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div className="flex flex-col gap-4">
                            <h2 className="text-h2 text-foreground">인기 렌탈 기종</h2>
                            <p className="text-p max-w-xl font-bold opacity-80">
                                가장 완벽한 주행 성능과 효율적인 연비. <br className="hidden md:block" /> 라이더가 선호하는 베스트 셀러 기종을 확인하세요.
                            </p>
                        </div>
                        <Link to="/product/honda" className="btn-halo btn-halo-outline bg-white !px-10 !py-5 font-bold flex items-center group">
                            전체 기종 보기
                            <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="py-20 flex flex-col items-center justify-center gap-4">
                            <Loader2 size={40} className="text-primary animate-spin" />
                            <p className="text-slate-400 font-bold">인기 모델을 불러오는 중...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
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
                                <div className="col-span-full py-20 text-center font-bold text-slate-400 bg-white rounded-xl">등록된 인기 기종이 없습니다.</div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Reviews Section */}
            <section className="bg-white">
                <div className="container">
                    <div className="text-center mb-20 flex flex-col gap-6">
                        <h2 className="text-h2 text-foreground">라이더 생생 후기</h2>
                        <p className="text-p max-w-2xl mx-auto font-bold opacity-80">라이디와 함께 성공적인 라이딩 파트너십을 이어가는 <br className="hidden md:block" /> 많은 전문가들의 이야기입니다.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
