import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
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
    X,
    ArrowRight,
    CheckCircle2,
    Zap,
    AlertCircle,
    Toolbox
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { centerService } from '../../services/centerService';
import CenterLogo from '../../components/svg/Ridy_Service_center_logo.svg';
import serviceCenterHeroImage from '../../components/img/ridy_servicecenter_hero.jpg';

const SouthKoreaMap = ({ centers }) => {
    const [hoveredCenter, setHoveredCenter] = useState(null);
    const [selectedCenter, setSelectedCenter] = useState(null);
    const svgRef = useRef(null);

    const handlePinClick = (center) => {
        setSelectedCenter(selectedCenter?.id === center.id ? null : center);
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <div className="relative w-full aspect-[3/5] md:aspect-square bg-white rounded-xl md:rounded-[20px] overflow-hidden border border-slate-100 shadow-2xl group max-h-[90vh] md:max-h-[800px]">
                <svg
                    ref={svgRef}
                    viewBox="0 0 3409.59 3635.76"
                    className="w-full h-full scale-[1.5] translate-y-[5%] md:scale-100 md:translate-y-0 origin-center transition-transform"
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
                                <circle r="100" fill="rgba(64, 84, 231, 0.2)" className="animate-ping" />
                                <circle r="75" fill="#4054E7" className="transition-transform group-hover/pin:scale-125 shadow-lg shadow-primary/40" />
                                <circle r="30" fill="white" />

                                <foreignObject x="-500" y="-320" width="1000" height="250" className="pointer-events-none overflow-visible">
                                    <div className="flex justify-center">
                                        <span className="px-16 py-8 bg-white/95 backdrop-blur-md border-[4px] border-slate-100 rounded-full text-[100px] font-black text-slate-900 shadow-2xl whitespace-nowrap tracking-tight">
                                            {center.name}
                                        </span>
                                    </div>
                                </foreignObject>
                            </g>
                        )
                    ))}
                </svg>
            </div>

            <AnimatePresence>
                {selectedCenter && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-x-8 bottom-8 md:absolute md:inset-auto md:right-[-20px] md:bottom-20 w-[calc(100%-64px)] md:w-[380px] bg-white/95 backdrop-blur-2xl p-6 md:p-8 rounded-xl md:rounded-[20px] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-white/50 z-50 overflow-hidden mx-auto max-w-[340px] md:max-w-none"
                    >
                        <button
                            onClick={() => setSelectedCenter(null)}
                            className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 bg-slate-100/50 backdrop-blur-sm flex items-center justify-center text-slate-400 rounded-full hover:text-slate-900 transition-colors shadow-sm"
                        >
                            <X size={18} />
                        </button>

                        <div className="flex flex-col gap-4 md:gap-6">
                            <div className="aspect-16/9 md:aspect-16/10 rounded-2xl md:rounded-3xl overflow-hidden bg-slate-100 relative group">
                                {selectedCenter.image ? (
                                    <img src={selectedCenter.image} alt={selectedCenter.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Building2 className="text-slate-200" size={32} />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <h3 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">{selectedCenter.name}</h3>
                                    <div className="flex items-start gap-2 mt-1 md:mt-2 text-slate-500 font-bold">
                                        <MapPin size={14} className="shrink-0 mt-1" />
                                        <p className="text-xs md:text-sm leading-relaxed">{selectedCenter.address} {selectedCenter.detailAddress}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 md:gap-4">
                                    <div className="flex items-center gap-2 md:gap-3 bg-slate-50 p-2 md:p-3 rounded-xl md:rounded-2xl border border-slate-100">
                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                                            <Phone size={14} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[8px] md:text-[10px] text-slate-400 font-black uppercase">Phone</span>
                                            <p className="text-[10px] md:text-xs font-black text-slate-900">{selectedCenter.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 md:gap-3 bg-slate-50 p-2 md:p-3 rounded-xl md:rounded-2xl border border-slate-100">
                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white flex items-center justify-center text-emerald-500 shadow-sm">
                                            <Clock size={14} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[8px] md:text-[10px] text-slate-400 font-black uppercase">Hours</span>
                                            <p className="text-[10px] md:text-xs font-black text-slate-900">{selectedCenter.hours || '09:00 - 18:00'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 md:gap-3 pt-1 md:pt-2">
                                    <a
                                        href={`tel:${selectedCenter.phone}`}
                                        className="flex-3 h-12 md:h-16 bg-slate-900 text-white rounded-lg md:rounded-xl text-sm md:text-base font-black flex items-center justify-center gap-2 md:gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
                                    >
                                        <Phone size={16} /> 예약 전화
                                    </a>
                                    <a
                                        href={`https://map.naver.com/v5/search/${encodeURIComponent(selectedCenter.name)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 h-12 md:h-16 bg-slate-100 text-slate-600 rounded-lg md:rounded-xl flex items-center justify-center hover:bg-slate-200 transition-all border border-slate-200"
                                    >
                                        <MapPin size={20} />
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

const FeatureCard = ({ icon: Icon, title, description, benefits, color, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white/80 backdrop-blur-xl rounded-[20px] p-6 md:p-10 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden h-full"
    >
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/5 transition-colors" />

        <div className="flex flex-col gap-6 relative z-10">
            <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform"
                style={{ backgroundColor: `${color}10`, color: color }}
            >
                <Icon size={32} />
            </div>

            <div>
                <h3 className="text-[24px] font-black text-slate-900 mb-4 tracking-tight">{title}</h3>
                <p className="text-slate-500 font-bold leading-relaxed mb-8">
                    {description}
                </p>
            </div>

            <ul className="flex flex-col gap-4 mt-auto">
                {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                            <CheckCircle2 size={12} className="text-primary" />
                        </div>
                        <span className="text-[14px] font-black text-slate-800">{benefit}</span>
                    </li>
                ))}
            </ul>
        </div>
    </motion.div>
);

const Center = () => {
    const [centers, setCenters] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);

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
        <div className="bg-slate-50 min-h-screen">
            {/* Premium Hero Section */}
            <section className="relative pt-24 pb-16 md:pt-48 md:pb-40 bg-[#0F172A] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {/* Base Image Layer with Parallax */}
                    <motion.div
                        style={{ y: y1 }}
                        className="absolute inset-0 z-0"
                    >
                        <img
                            src={serviceCenterHeroImage}
                            alt="Ridy Service Center Hero"
                            className="w-full h-full object-cover opacity-40"
                        />
                        {/* Dark Overlay for Text Visibility */}
                        <div className="absolute inset-0 bg-linear-to-b from-[#0F172A]/80 via-[#0F172A]/60 to-[#0F172A]" />
                    </motion.div>

                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/10 blur-[180px] rounded-full" />

                    {/* Floating Gear-like Shapes for Maintenance Vibe */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[15%] right-[10%] opacity-[0.05]"
                        >
                            <Settings size={120} className="text-white" />
                        </motion.div>
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-[10%] left-[5%] opacity-[0.03]"
                        >
                            <Wrench size={180} className="text-white" />
                        </motion.div>
                    </div>

                    <div className="absolute inset-0 opacity-[0.05]"
                        style={{
                            backgroundImage: `linear-gradient(to right, #ffffff1a 1px, transparent 1px), linear-gradient(to bottom, #ffffff1a 1px, transparent 1px)`,
                            backgroundSize: '100px 100px'
                        }}
                    />
                </div>

                <div className="container relative z-10 px-6 text-center">
                    <div className="flex flex-col items-center max-w-5xl mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-12"
                        >
                            <img src={CenterLogo} alt="RIDY Service Center Logo" className="h-12 md:h-16 w-auto brightness-0 invert" />
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-hero text-white mb-10"
                        >
                            라이더의 안전을 지키는 <br />
                            <span className="bg-linear-to-r from-primary to-indigo-400 bg-clip-text text-transparent">최상의 정비 솔루션</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[15px] md:text-[18px] font-medium text-white/50 max-w-3xl leading-relaxed mb-16"
                        >
                            전국 최대 규모의 서비스 네트워크와 숙련된 전문가들이 <br className="hidden md:block" />
                            라이더님의 주행 환경을 가장 완벽하게 관리해 드립니다.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-5 md:gap-6"
                        >
                            <Link to="/rental/inquiry" className="h-[64px] md:h-[76px] px-10 md:px-14 bg-white text-slate-900 rounded-xl font-black text-lg md:text-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10 group">
                                정비 예약하기
                                <ArrowRight className="ml-3 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a href="http://pf.kakao.com/_xgxoxexen/chat" target="_blank" rel="noopener noreferrer" className="h-[64px] md:h-[76px] px-10 md:px-14 bg-[#FEE500] text-slate-900 rounded-xl font-black text-lg md:text-xl flex items-center justify-center hover:bg-[#FDD000] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-yellow-500/10">
                                <MessageCircle className="mr-2 w-6 h-6 fill-current" />
                                카톡 상담 연결
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* Network Map Section */}
            <section className="py-16 md:py-32 bg-white overflow-hidden">
                <div className="container px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                        <div className="lg:col-span-12">
                            <div className="mb-8 md:mb-12">
                                <h2 className="text-[28px] md:text-[48px] font-black text-slate-900 leading-[1.2] mb-4 md:mb-6">
                                    라이디 <span className="text-primary">서비스센터 찾기</span>
                                </h2>
                                <p className="text-slate-500 text-[15px] md:text-lg font-bold leading-relaxed">
                                    전국 주요 거점에 위치한 공식 센터가 항상 라이더님 곁에 있습니다.
                                </p>
                            </div>
                            <SouthKoreaMap centers={centers} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Narrative Section */}
            <section className="py-16 md:py-32 bg-white relative overflow-hidden">
                <div className="container px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        <div className="space-y-8 md:space-y-12">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-[28px] md:text-[52px] font-black text-slate-900 leading-[1.2] mb-6 md:mb-8">
                                    주행의 즐거움은 <br />
                                    <span className="text-slate-300">완벽한 정비로부터 시작됩니다.</span>
                                </h2>
                                <div className="w-16 md:w-20 h-1.5 md:h-2 bg-primary rounded-full mb-8 md:mb-12" />
                            </motion.div>

                            <div className="space-y-6 md:space-y-8 text-[16px] md:text-[22px] font-bold text-slate-500 leading-relaxed">
                                <p>
                                    배달 현장에서 바이크는 단순한 이동 수단 그 이상의 의미를 갖습니다.
                                    라이더의 <span className="text-slate-900 underline decoration-primary/30 underline-offset-8">'안전한 생계'</span>이자,
                                    가장 든든한 <span className="text-slate-900 underline decoration-primary/30 underline-offset-8">'성공 파트너'</span>이기 때문입니다.
                                </p>
                                <p>
                                    라이디 서비스 센터는 이 무거운 책임감을 잘 알고 있습니다.
                                    단순히 고장 난 곳을 고치는 것을 넘어, 라이더가 오직 주행에만 집중할 수 있도록
                                    가장 정교하고 투명한 관리 시스템을 제안합니다.
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
                            <div className="relative grid grid-cols-2 gap-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-slate-50 p-6 md:p-8 rounded-[16px] border border-slate-100 shadow-sm"
                                >
                                    <AlertCircle className="text-red-500 mb-5 md:mb-6" size={40} md:size={48} />
                                    <h4 className="text-slate-900 text-lg md:text-xl font-black mb-2">Before</h4>
                                    <p className="text-slate-500 text-xs md:text-sm font-bold">불투명한 정비 비용, <br />오래 걸리는 대기 시간</p>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: -40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="mt-8 md:mt-12 bg-primary p-6 md:p-8 rounded-[16px] shadow-2xl shadow-primary/20"
                                >
                                    <ShieldCheck className="text-white mb-5 md:mb-6" size={40} md:size={48} />
                                    <h4 className="text-white text-lg md:text-xl font-black mb-2">After</h4>
                                    <p className="text-white/80 text-xs md:text-sm font-bold">표준 정비 가이드, <br />신속한 부품 공급망</p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Services Section */}
            <section className="py-16 md:py-32 bg-slate-50">
                <div className="container px-6">
                    <div className="text-center max-w-4xl mx-auto mb-12 md:mb-24">
                        <span className="text-primary font-black uppercase tracking-widest text-[12px] md:text-sm mb-3 md:mb-4 block">Our Expertise</span>
                        <h2 className="text-[30px] md:text-[56px] font-black text-slate-900 leading-tight">
                            라이디가 제안하는 <br />
                            프리미엄 정비 가이드
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard
                            icon={Wrench}
                            title="정기 점검"
                            description="주행 거리별 소모품 상태를 정밀하게 체크하여 사고를 미연에 방지합니다."
                            benefits={["핵심 12개 항목 점검", "소모품 교체 주기 알림", "디지털 정비 이력 관리"]}
                            color="#4B5563"
                            index={0}
                        />
                        <FeatureCard
                            icon={Settings}
                            title="전문 장비"
                            description="라이더 전용 고성능 리프트와 진단 장비로 명확한 원인을 규명합니다."
                            benefits={["최신 스캔 장비", "라이더 전용 리프트", "고속 휠 벨런서"]}
                            color="#4F46E5"
                            index={1}
                        />
                        <FeatureCard
                            icon={ShieldCheck}
                            title="순정 부품"
                            description="제조사가 인증한 100% 순정 부품만을 사용하여 보장된 내구성을 제공합니다."
                            benefits={["혼다/야마하 순정품", "부품 보증제 실시", "거품 없는 정찰제"]}
                            color="#10B981"
                            index={2}
                        />
                        <FeatureCard
                            icon={Clock}
                            title="신속 대응"
                            description="배달 공백을 최소화하기 위해 당일 예약, 당일 정비를 원칙으로 합니다."
                            benefits={["우선 정비 예약제", "주요 부품 상시 보유", "빠른 입출고 서비스"]}
                            color="#F59E0B"
                            index={3}
                        />
                    </div>
                </div>
            </section>



            {/* Franchise Section */}
            <section className="py-16 md:py-32 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-primary to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-primary to-transparent" />
                </div>

                <div className="container px-6 relative z-10">
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-8 md:gap-12">
                        <div className="space-y-8 md:space-y-12">
                            <div className="inline-flex items-center px-4 py-2 bg-primary/20 border border-primary/30 rounded-full mx-auto">
                                <span className="text-primary font-black uppercase tracking-widest text-[11px] md:text-[12px]">Partnership</span>
                            </div>
                            <h2 className="text-[32px] md:text-[56px] font-black text-white leading-[1.1]">
                                라이디와 함께할 <br />
                                <span className="text-primary">정비 파트너</span>를 모십니다.
                            </h2>
                            <p className="text-white/40 text-[17px] md:text-xl font-bold leading-relaxed mx-auto max-w-2xl">
                                풍부한 정비 물량 확보고 표준화된 관리 시스템 지원까지. <br className="hidden md:block" />
                                국내 No.1 라이더 플랫폼의 핵심 정비 거점이 되어보세요.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-5 justify-center">
                                <Link to="/rental/inquiry" className="h-[64px] md:h-[72px] px-10 md:px-12 bg-primary text-white rounded-xl font-black text-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/30 group">
                                    가맹 문의하기
                                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-16 md:py-32 bg-white relative overflow-hidden">
                <div className="container relative z-10 px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <Toolbox className="mx-auto text-slate-200 mb-6 md:mb-8" size={64} md:size={80} />
                        <h2 className="text-slate-900 text-[30px] md:text-[60px] font-black mb-8 md:mb-10 leading-[1.1]">
                            더 안전한 주행의 시작, <br />
                            지금 라이디 정비를 예약하세요.
                        </h2>
                        <p className="text-slate-500 text-[16px] md:text-[22px] font-bold mb-12 md:mb-16 max-w-2xl mx-auto leading-relaxed">
                            전문가들이 제안하는 정밀한 정비와 투명한 서비스로 <br />
                            완벽한 주행 컨디션을 만들어 드립니다.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <Link to="/rental/inquiry" className="h-[64px] md:h-[76px] px-12 md:px-16 bg-primary text-white rounded-xl font-black text-lg md:text-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/20 group">
                                예약 페이지 이동
                                <ArrowRight className="ml-3 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a href="http://pf.kakao.com/_xgxoxexen/chat" target="_blank" rel="noopener noreferrer" className="h-[64px] md:h-[76px] px-12 md:px-16 bg-[#FEE500] text-slate-900 rounded-xl font-black text-lg md:text-xl flex items-center justify-center hover:bg-[#FDD000] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-yellow-500/10">
                                <MessageCircle className="mr-2 w-6 h-6 fill-current" />
                                카톡 상담 연결
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Center;
