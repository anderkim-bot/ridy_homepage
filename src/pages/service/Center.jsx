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
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Link } from 'react-router-dom';
import { centerService } from '../../services/centerService';
import CenterLogo from '../../components/svg/Ridy_Service_center_logo.svg';
import serviceCenterHeroImage from '../../components/img/ridy_servicecenter_hero.jpg';

const SouthKoreaMap = ({ centers }) => {
    const [hoveredCenter, setHoveredCenter] = useState(null);
    const [selectedCenter, setSelectedCenter] = useState(null);
    const mapRef = useRef(null);

    const handlePinClick = (center) => {
        setSelectedCenter(selectedCenter?.id === center.id ? null : center);
    };

    return (
        <div className="relative w-full overflow-hidden bg-white">
            {/* Map Container - Vertical Focus */}
            <div className="relative w-full max-w-[1000px] h-[600px] md:h-[800px] bg-white overflow-hidden group mx-auto z-0 border border-slate-200 shadow-sm">
                <TransformWrapper
                    initialScale={1}
                    minScale={1}
                    maxScale={8}
                    centerOnInit={true}
                    wheel={{ step: 0.1 }}
                    onTransformed={(ref, state) => {
                        if (mapRef.current) {
                            mapRef.current.style.setProperty('--map-scale', state.scale);
                        }
                    }}
                >
                    {() => (
                        <TransformComponent
                            wrapperStyle={{ width: "100%", height: "100%" }}
                            contentStyle={{ width: "100%", height: "100%" }}
                        >
                            <div ref={mapRef} className="w-full h-full">
                                <svg
                                    viewBox="0 0 3409.59 3635.76"
                                    className="w-full h-full block"
                                    preserveAspectRatio="xMidYMid slice"
                                    onClick={(e) => {
                                        // Allow clearing selection if clicking on the background (not pins)
                                        if (e.target.tagName === 'svg' || e.target.tagName === 'image') {
                                            setSelectedCenter(null);
                                        }
                                    }}
                                >
                                    <image
                                        href="/src/components/svg/map.svg"
                                        width="100%"
                                        height="100%"
                                        className="opacity-90"
                                        preserveAspectRatio="xMidYMid slice"
                                    />

                                    {[...centers].sort((a, b) => {
                                        if (hoveredCenter?.id === a.id) return 1;
                                        if (hoveredCenter?.id === b.id) return -1;
                                        return 0;
                                    }).map((center) => (
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
                                                style={{ isolation: 'isolate' }}
                                            >
                                                {/* Counter-scaling group */}
                                                <g
                                                    className="md:scale-[0.6]"
                                                    style={{
                                                        transformBox: 'fill-box',
                                                        transformOrigin: 'center',
                                                        transform: 'scale(calc(1 / var(--map-scale, 1)))',
                                                        transition: 'transform 0.1s linear'
                                                    }}
                                                >
                                                    <circle r="100" fill="rgba(64, 84, 231, 0.2)" className="animate-ping" />
                                                    <circle r="75" fill="#4054E7" className="transition-transform group-hover/pin:scale-125 shadow-lg shadow-primary/40" />
                                                    <circle r="30" fill="white" />

                                                    <foreignObject x="-500" y="-320" width="1000" height="250" className="pointer-events-none overflow-visible">
                                                        <div className="flex justify-center">
                                                            <span className={`px-16 py-8 bg-white/95 backdrop-blur-md border-[4px] border-slate-100 rounded-full text-[100px] font-black text-slate-900 shadow-2xl whitespace-nowrap tracking-tight transition-all ${hoveredCenter?.id === center.id ? 'scale-110 border-primary shadow-primary/20' : ''}`}>
                                                                {center.name}
                                                            </span>
                                                        </div>
                                                    </foreignObject>
                                                </g>
                                            </g>
                                        )
                                    ))}
                                </svg>
                            </div>
                        </TransformComponent>
                    )}
                </TransformWrapper>
            </div>

            {/* Bottom-Up Modal (Drawer) */}
            <AnimatePresence>
                {selectedCenter && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCenter(null)}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
                        />

                        {/* Drawer Content (Desktop) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: "-50%", x: "-50%" }}
                            animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
                            exit={{ opacity: 0, scale: 0.95, y: "-50%", x: "-50%" }}
                            style={{
                                left: "50%",
                                top: "50%",
                            }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed hidden md:flex flex-col bg-white rounded-[20px] shadow-2xl z-50 w-full max-w-[500px] overflow-hidden border border-slate-100 max-h-[90vh]"
                        >
                            {/* Image Header */}
                            <div className="relative w-full h-64 bg-slate-100 group shrink-0">
                                {selectedCenter.image ? (
                                    <img src={selectedCenter.image} alt={selectedCenter.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Building2 className="text-slate-200" size={60} />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />

                                <button
                                    onClick={() => setSelectedCenter(null)}
                                    className="absolute top-4 right-4 w-8 h-8 bg-black/20 backdrop-blur-md flex items-center justify-center text-white rounded-full hover:bg-black/40 transition-all border border-white/10"
                                >
                                    <X size={18} />
                                </button>

                                <div className="absolute bottom-6 left-8 right-8">
                                    <span className="inline-block px-2.5 py-1 bg-primary text-white text-[10px] font-black rounded-md mb-2 uppercase tracking-widest leading-none">Official Center</span>
                                    <h3 className="text-2xl font-black text-white tracking-tight leading-tight">
                                        {selectedCenter.name}
                                    </h3>
                                </div>
                            </div>

                            {/* Content Body */}
                            <div className="p-8 overflow-y-auto">
                                <div className="flex items-start gap-4 mb-8">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-primary shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Address</h4>
                                        <p className="text-slate-700 font-bold text-base leading-relaxed">
                                            {selectedCenter.address} <br />
                                            <span className="text-slate-500 text-sm font-medium">{selectedCenter.detailAddress}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Phone size={18} className="text-primary" />
                                            <span className="text-xs text-slate-400 font-bold uppercase">Inquiry</span>
                                        </div>
                                        <p className="text-lg font-black text-slate-900 tracking-tight">{selectedCenter.phone}</p>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Clock size={18} className="text-emerald-500" />
                                            <span className="text-xs text-slate-400 font-bold uppercase">Hours</span>
                                        </div>
                                        <p className="text-lg font-black text-slate-900 tracking-tight">{selectedCenter.hours || `${selectedCenter.openTime} - ${selectedCenter.closeTime}` || '09:00 - 18:00'}</p>
                                    </div>
                                </div>

                                {/* Services Tags */}
                                {selectedCenter.services && selectedCenter.services.length > 0 && (
                                    <div className="mb-8">
                                        <h4 className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-3">Provided Services</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedCenter.services.map((service, idx) => (
                                                <span key={idx} className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-black">
                                                    #{service}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <a
                                        href={`https://map.naver.com/v5/search/${encodeURIComponent(selectedCenter.name)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 h-12 bg-slate-900 text-white rounded-xl text-base font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                                    >
                                        <MapPin size={18} /> 지도보기
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Mobile Drawer Content */}
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed md:hidden inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-[0_-20px_40px_rgba(0,0,0,0.1)] z-50 max-h-[90vh] overflow-hidden"
                        >
                            <div className="w-full flex justify-center pt-4 pb-2">
                                <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
                            </div>
                            <div className="px-6 pb-10 overflow-y-auto max-h-[calc(90vh-40px)]">
                                <div className="max-w-2xl mx-auto">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">{selectedCenter.name}</h3>
                                            <div className="flex items-start gap-2 mt-2 text-slate-500 font-bold">
                                                <MapPin size={16} className="shrink-0 mt-1" />
                                                <p className="text-sm leading-relaxed">{selectedCenter.address} {selectedCenter.detailAddress}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => setSelectedCenter(null)} className="w-10 h-10 bg-slate-100 flex items-center justify-center text-slate-400 rounded-full">
                                            <X size={20} />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6 mb-8">
                                        <div className="aspect-16/9 rounded-2xl overflow-hidden bg-slate-100">
                                            {selectedCenter.image ? <img src={selectedCenter.image} alt={selectedCenter.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><Building2 size={48} className="text-slate-200" /></div>}
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm border border-slate-100"><Phone size={20} /></div>
                                                <div className="flex flex-col"><span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Phone</span><p className="text-base font-black text-slate-900">{selectedCenter.phone}</p></div>
                                            </div>
                                            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-emerald-500 shadow-sm border border-slate-100"><Clock size={20} /></div>
                                                <div className="flex flex-col"><span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Operating Hours</span><p className="text-base font-black text-slate-900">{selectedCenter.hours || `${selectedCenter.openTime} - ${selectedCenter.closeTime}` || '09:00 - 18:00'}</p></div>
                                            </div>
                                            {selectedCenter.services && selectedCenter.services.length > 0 && (
                                                <div className="space-y-3">
                                                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider ml-1">Provided Services</span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedCenter.services.map((service, idx) => (
                                                            <span key={idx} className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-black">
                                                                #{service}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <a href={`tel:${selectedCenter.phone}`} className="flex-1 h-16 bg-slate-900 text-white rounded-xl text-lg font-black flex items-center justify-center gap-3"><Phone size={18} /> 예약 전화</a>
                                        <a href={`https://map.naver.com/v5/search/${encodeURIComponent(selectedCenter.name)}`} target="_blank" rel="noopener noreferrer" className="h-16 px-6 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center border border-slate-200"><MapPin size={24} /></a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
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
        <div className="bg-white min-h-screen">
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
                            className="text-[15px] md:text-[18px] font-medium text-white/50 max-w-3xl leading-relaxed"
                        >
                            전국 최대 규모의 서비스 네트워크와 숙련된 전문가들이 <br className="hidden md:block" />
                            라이더님의 주행 환경을 가장 완벽하게 관리해 드립니다.
                        </motion.p>
                    </div>
                </div>
            </section>


            {/* Network Map Section */}
            <section className="py-24 md:py-48 bg-white overflow-hidden">
                <div className="w-full">
                    <div className="container px-6 mb-8 md:mb-12">
                        <h2 className="text-[28px] md:text-[48px] font-black text-slate-900 leading-[1.2] mb-4 md:mb-6">
                            라이디 <span className="text-primary">서비스센터 찾기</span>
                        </h2>
                        <p className="text-slate-500 text-[15px] md:text-lg font-bold leading-relaxed">
                            전국 주요 거점에 위치한 공식 센터가 항상 라이더님 곁에 있습니다.
                        </p>
                    </div>
                    <SouthKoreaMap centers={filteredCenters} />
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



            import PartnerInquiryForm from '../../components/PartnerInquiryForm';

            // ... (중략)

            {/* Franchise Section */}
            <section className="py-16 md:py-32 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-primary to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-primary to-transparent" />
                </div>

                <div className="container px-6 relative z-10 text-center">
                    <div className="max-w-4xl mx-auto mb-16 md:mb-24">
                        <div className="inline-flex items-center px-4 py-2 bg-primary/20 border border-primary/30 rounded-full mb-8">
                            <span className="text-primary font-black uppercase tracking-widest text-[11px] md:text-[12px]">Partnership</span>
                        </div>
                        <h2 className="text-[32px] md:text-[56px] font-black text-white leading-[1.1] mb-8">
                            라이디와 함께할 <br />
                            <span className="text-primary">정비 파트너</span>를 모십니다.
                        </h2>
                        <p className="text-white/40 text-[17px] md:text-xl font-bold leading-relaxed max-w-2xl mx-auto">
                            풍부한 정비 물량 확보부터 표준화된 관리 시스템 지원까지. <br className="hidden md:block" />
                            국내 No.1 라이더 플랫폼의 핵심 정비 거점이 되어보세요.
                        </p>
                    </div>

                    <PartnerInquiryForm />
                </div>
            </section>

        </div>
    );
};

export default Center;
