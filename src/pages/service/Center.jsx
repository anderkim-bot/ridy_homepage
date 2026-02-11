import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wrench,
    MapPin,
    Phone,
    Clock,
    ShieldCheck,
    Search,
    ChevronRight,
    MessageCircle,
    Building2,
    Settings,
    Tag,
    Info,
    X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { centerService } from '../../services/centerService';

const SouthKoreaMap = ({ centers }) => {
    const [hoveredCenter, setHoveredCenter] = useState(null);
    const [selectedCenter, setSelectedCenter] = useState(null);
    const svgRef = useRef(null);

    const handlePinClick = (center) => {
        setSelectedCenter(selectedCenter?.id === center.id ? null : center);
    };

    return (
        <div className="relative w-full aspect-3409/3635 bg-bg-light rounded-3xl overflow-hidden border border-border-subtle/20 shadow-inner group">

            <svg
                ref={svgRef}
                viewBox="0 0 3409.59 3635.76"
                className="w-full h-full"
                onClick={() => setSelectedCenter(null)}
            >
                <image
                    href="/src/components/svg/map.svg"
                    width="100%"
                    height="100%"
                    className="opacity-90"
                />

                {centers.map((center) => (
                    center.location && (
                        <g
                            key={center.id}
                            transform={`translate(${center.location.x}, ${center.location.y})`}
                            className="cursor-pointer group/pin"
                            onMouseEnter={() => setHoveredCenter(center)}
                            onMouseLeave={() => setHoveredCenter(null)}
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePinClick(center);
                            }}
                        >
                            <circle r="55" fill="rgba(79, 70, 229, 0.2)" className="animate-ping" />
                            <circle r="40" fill="#4f46e5" className="transition-transform group-hover/pin:scale-125" />
                            <circle r="16" fill="white" />

                            {/* Center Name Label */}
                            <foreignObject x="-400" y="-200" width="800" height="160" className="pointer-events-none overflow-visible">
                                <div className="flex justify-center">
                                    <span className="px-12 py-6 md:px-10 md:py-5 bg-white/95 backdrop-blur-md border-[3px] border-slate-200 rounded-full text-[66px] md:text-[56px] font-black text-slate-900 shadow-2xl whitespace-nowrap tracking-tight transition-all">
                                        {center.name}
                                    </span>
                                </div>
                            </foreignObject>

                        </g>
                    )
                ))}
            </svg>

            <AnimatePresence>
                {selectedCenter && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="absolute bottom-4 md:bottom-6 right-4 md:right-6 left-4 md:left-auto md:w-[380px] bg-white p-3 md:p-6 rounded-[24px] md:rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 z-20 max-h-[90vh] overflow-y-auto custom-scrollbar"
                    >
                        <button
                            onClick={() => setSelectedCenter(null)}
                            className="absolute top-2 md:top-4 right-2 md:right-4 w-7 h-7 md:w-10 md:h-10 bg-slate-50/90 backdrop-blur-sm flex items-center justify-center text-slate-400 rounded-full hover:text-slate-900 transition-colors z-30 shadow-sm"
                        >
                            <X size={16} />
                        </button>

                        <div className="flex flex-col gap-2 md:gap-6">
                            {/* Image Section */}
                            <div className="aspect-[3/1] md:aspect-16/10 rounded-xl md:rounded-3xl overflow-hidden bg-slate-50 relative group shrink-0">
                                {selectedCenter.image ? (
                                    <img src={selectedCenter.image} alt={selectedCenter.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-100">
                                        <Building2 className="text-slate-200" size={24} />
                                    </div>
                                )}
                                <div className="absolute top-2 left-2">
                                    <span className="px-2 py-0.5 bg-primary text-white text-[8px] md:text-[10px] font-black rounded-md uppercase tracking-tight shadow-lg shadow-primary/20">Service Center</span>
                                </div>
                            </div>

                            <div className="space-y-2 md:space-y-4 px-0.5">
                                <div>
                                    <h3 className="text-base md:text-3xl font-black text-slate-900 tracking-tight leading-tight">{selectedCenter.name}</h3>
                                    <div className="flex items-start gap-1 mt-1 text-slate-500">
                                        <MapPin size={10} className="shrink-0 mt-0.5" />
                                        <p className="text-[11px] md:text-sm font-bold leading-tight">{selectedCenter.address} {selectedCenter.detailAddress}</p>
                                    </div>
                                </div>

                                <div className="space-y-1 md:space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 md:w-8 md:h-8 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-600">
                                            <Phone size={10} />
                                        </div>
                                        <p className="text-[11px] md:text-sm font-black text-slate-700">{selectedCenter.phone}</p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 md:w-8 md:h-8 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-600">
                                            <Clock size={10} />
                                        </div>
                                        <p className="text-[11px] md:text-sm font-black text-slate-700">{selectedCenter.hours || '09:00 - 18:00'}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-1">
                                    {selectedCenter.services.map((s, i) => (
                                        <span key={i} className="px-1.5 py-0.5 bg-slate-50 text-slate-400 rounded-md text-[9px] font-bold border border-slate-50 uppercase">#{s}</span>
                                    ))}
                                </div>

                                <div className="flex gap-1.5 pt-1 md:pt-4">
                                    <a
                                        href={`tel:${selectedCenter.phone}`}
                                        className="flex-1 h-9 md:h-14 bg-slate-900 text-white rounded-lg md:rounded-2xl text-[12px] md:text-sm font-black flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
                                    >
                                        <Phone size={12} className="md:size-18" /> 전화하기
                                    </a>
                                    <a
                                        href={`https://map.naver.com/v5/search/${encodeURIComponent(selectedCenter.name)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-9 h-9 md:w-14 md:h-14 bg-slate-100 text-slate-600 rounded-lg md:rounded-2xl flex items-center justify-center hover:bg-slate-200 transition-all"
                                    >
                                        <MapPin size={14} className="md:size-20" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                )}
            </AnimatePresence>
        </div>
    );
};


const ServiceItem = ({ icon: Icon, title, description, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="card-halo bg-white group hover:border-primary/20"
    >
        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
            <Icon size={28} />
        </div>
        <h4 className="text-xl font-black text-foreground mb-3">{title}</h4>
        <p className="text-slate-500 font-medium text-sm leading-relaxed">{description}</p>
    </motion.div>
);

const LocationCard = ({ name, address, detailAddress, phone, isRecruiting = false, services = [], index }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`card-halo bg-white border border-slate-100 flex flex-col gap-6 ${isRecruiting ? 'border-dashed opacity-80' : ''}`}
    >
        <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
                <span className="text-[12px] font-black text-primary uppercase tracking-wider">서비스 지점</span>
                <h4 className="text-2xl font-black text-foreground">{name}</h4>
            </div>
            {isRecruiting && (
                <span className="badge-halo bg-amber-500/10! text-amber-600! text-[10px]!">인수자 모집중</span>
            )}
        </div>

        {!isRecruiting ? (
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-slate-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-600 font-bold leading-relaxed">{address} {detailAddress}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Phone size={18} className="text-slate-400 shrink-0" />
                    <span className="text-sm text-slate-600 font-black">{phone}</span>
                </div>
                {services.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                        {services.slice(0, 3).map((s, i) => (
                            <span key={i} className="px-2 py-0.5 bg-slate-50 text-slate-400 rounded-md text-[10px] font-black uppercase tracking-tighter">#{s}</span>
                        ))}
                    </div>
                )}
            </div>
        ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 py-4 italic text-sm font-medium">
                새로운 파트너를 기다리고 있습니다.
            </div>
        )}

        {!isRecruiting && (
            <a
                href={`https://map.naver.com/v5/search/${encodeURIComponent(name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto btn-halo btn-halo-outline py-3! text-sm! flex items-center gap-2 group"
            >
                지도 보기
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
        )}
    </motion.div>
);


const Center = () => {
    const [centers, setCenters] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCenters = async () => {
            const data = await centerService.getCenters();
            setCenters(data);
            setIsLoading(false);
        };
        fetchCenters();
    }, []);

    const filteredCenters = centers.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.address.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative pt-[120px] pb-[120px] md:pt-[160px] md:pb-[200px] bg-bg-white overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-bg-light rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />
                </div>

                <div className="container relative z-10">
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-[12px] font-bold uppercase tracking-widest"
                        >
                            RIDY Service Network
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="text-section-title"
                        >
                            믿고 맡기는 <br className="md:hidden" />
                            라이더 전용 <br className="hidden md:block" />
                            <span className="text-primary italic">정비 솔루션</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-body max-w-2xl"
                        >
                            정비, 점검, 소모품 교체까지 한 번에! <br className="hidden md:block" />
                            전문 정비 인프라와 숙련된 메카닉이 라이더님의 시간과 안전을 지켜드립니다.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col sm:flex-row gap-4 mt-4"
                        >
                            <Link to="/rental/inquiry" className="btn-ridy btn-ridy-primary h-[56px]! px-12! text-[18px]!">
                                정비 예약하기
                            </Link>
                            <a href="http://pf.kakao.com/_xgxoxexen/chat" target="_blank" rel="noopener noreferrer" className="btn-ridy btn-ridy-outline h-[56px]! px-12! text-[18px]! flex items-center bg-white">
                                <MessageCircle className="mr-2 w-6 h-6 text-[#FAE100]" fill="#FAE100" />
                                카톡 실시간 문의
                            </a>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Service Highlights */}
            <section className="bg-bg-light py-32">
                <div className="container">
                    <div className="text-center mb-20">
                        <h2 className="text-section-title mb-6">전문적인 정비 서비스</h2>
                        <p className="text-body max-w-2xl mx-auto font-bold">라이디 서비스 센터는 라이더가 최적의 컨디션으로 <br className="hidden md:block" /> 주행할 수 있도록 표준화된 정식 정비 가이드를 준수합니다.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <ServiceItem
                            icon={Wrench}
                            title="정기 점검 서비스"
                            description="주행 거리별 핵심 소모품 및 엔진 상태를 정밀하게 체크합니다."
                            index={0}
                        />
                        <ServiceItem
                            icon={Settings}
                            title="고출력 정비 장비"
                            description="라이더 전용 리프트와 진단 장비로 신속하고 정확하게 정비합니다."
                            index={1}
                        />
                        <ServiceItem
                            icon={ShieldCheck}
                            title="순정 부품 사용"
                            description="제조사가 인증한 100% 순정 부품만을 사용하여 내구성을 보장합니다."
                            index={2}
                        />
                        <ServiceItem
                            icon={Clock}
                            title="신속한 업무 처리"
                            description="배달 공백을 최소화할 수 있도록 예약 시 당일 정비를 원칙으로 합니다."
                            index={3}
                        />
                    </div>
                </div>
            </section>

            {/* Location Network Map Section */}
            <section className="bg-bg-white py-32">
                <div className="container">
                    <div className="flex flex-col gap-16">
                        <div className="flex flex-col items-center text-center gap-8">
                            <div className="flex flex-col gap-4">
                                <h2 className="text-section-title">전국 서비스 네트워크</h2>
                                <p className="text-body max-w-xl font-bold">
                                    전국 주요 거점에 위치한 라이디 서비스 센터에서 <br />
                                    차별화된 정비 솔루션을 경험하세요.
                                </p>
                            </div>

                            <div className="relative w-full max-w-lg group">
                                <input
                                    type="text"
                                    placeholder="지점명 또는 지역 검색"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-16 bg-bg-light border-none rounded-2xl px-14 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-text-disabled shadow-sm"
                                />
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-disabled group-focus-within:text-primary transition-colors" size={24} />
                            </div>
                        </div>

                        <div className="w-full max-w-5xl mx-auto">
                            <SouthKoreaMap centers={centers} />
                        </div>
                    </div>
                </div>
            </section>




            {/* Franchise Section */}
            <section className="bg-bg-dark py-32 overflow-hidden relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                    <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
                </div>

                <div className="container relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="flex-1 space-y-8">
                            <span className="inline-block px-4 py-2 bg-primary/20 text-primary border border-primary/20 rounded-pill text-[12px] font-bold uppercase tracking-widest">Partnership</span>
                            <h2 className="text-[40px] md:text-[56px] font-bold text-white leading-tight tracking-tight">
                                라이디와 함께 성장할 <br />
                                <span className="text-primary italic">서비스 센터 가맹점</span>을 모십니다.
                            </h2>
                            <p className="text-[18px] text-text-light font-medium leading-relaxed">
                                안정적인 정비 물량 확보고 전문적인 정비 관리 시스템 지원까지. <br className="hidden md:block" />
                                국내 No.1 라이더 플랫폼 라이디의 성공 파트너가 되어보세요.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/rental/inquiry" className="btn-ridy btn-ridy-primary h-[56px]! px-10! text-[16px]!">
                                    가맹점 창업 문의
                                </Link>
                                <button className="btn-ridy btn-ridy-outline h-[56px]! px-10! text-[16px]! text-white! border-white/20 hover:bg-white/5">
                                    사업 제휴 안내서
                                </button>
                            </div>

                        </div>
                        <div className="flex-1 w-full max-w-md">
                            <motion.div
                                initial={{ opacity: 0, rotate: 5 }}
                                whileInView={{ opacity: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-xl shadow-2xl space-y-8"
                            >
                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        { label: "누적 관리 대수", value: "5,000+", icon: Building2 },
                                        { label: "전국 지점망", value: "30+", icon: MapPin },
                                        { label: "정비 만족도", value: "98%", icon: ShieldCheck },
                                        { label: "평균 정비 시간", value: "-40%", icon: Wrench }
                                    ].map((stat, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex items-center gap-2 text-text-muted">
                                                <stat.icon size={14} />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">{stat.label}</span>
                                            </div>
                                            <div className="text-[24px] font-bold text-white">{stat.value}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="h-px bg-white/10 w-full" />
                                <p className="text-[12px] text-text-muted font-bold leading-relaxed">
                                    * 2024년 4분기 라이디 서비스 센터 네트워크 통계 기준입니다. <br />
                                    정비 수치는 기술 지원 조건에 따라 상이할 수 있습니다.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );

};

export default Center;

