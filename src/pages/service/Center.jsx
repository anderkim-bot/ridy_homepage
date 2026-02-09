import React from 'react';
import { motion } from 'framer-motion';
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
    Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';

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

const LocationCard = ({ region, name, address, phone, isRecruiting = false, index }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`card-halo bg-white border border-slate-100 flex flex-col gap-6 ${isRecruiting ? 'border-dashed opacity-80' : ''}`}
    >
        <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
                <span className="text-[12px] font-black text-primary uppercase tracking-wider">{region}</span>
                <h4 className="text-2xl font-black text-foreground">{name}</h4>
            </div>
            {isRecruiting && (
                <span className="badge-halo !bg-amber-500/10 !text-amber-600 !text-[10px]">인수자 모집중</span>
            )}
        </div>

        {!isRecruiting ? (
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-slate-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-600 font-bold leading-relaxed">{address}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Phone size={18} className="text-slate-400 shrink-0" />
                    <span className="text-sm text-slate-600 font-black">{phone}</span>
                </div>
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
                className="mt-auto btn-halo btn-halo-outline !py-3 !text-sm flex items-center gap-2 group"
            >
                지도 보기
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
        )}
    </motion.div>
);

const Center = () => {
    const locations = [
        { region: "서울시 강동구", name: "라이디 서비스 센터 강동점", address: "서울 강동구 풍성로 147-5 1층(강동역 4번 출구에서 720m)", phone: "0507-1437-3439" },
        { region: "서울시 강남구", name: "강남 서비스 센터", isRecruiting: true },
        { region: "서울시 강북구", name: "강북 서비스 센터", isRecruiting: true },
        { region: "서울시 동대문구", name: "동대문 서비스 센터", isRecruiting: true },
        { region: "경기도 남양주", name: "남양주 서비스 센터", isRecruiting: true },
        { region: "인천시 부평구", name: "부평 서비스 센터", isRecruiting: true }
    ];

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative pt-[60px] pb-[100px] md:pt-[120px] md:pb-[180px] bg-white overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-50 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />
                </div>

                <div className="container relative z-10">
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="badge-halo"
                        >
                            RIDY Service Network
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="text-h1 text-foreground"
                        >
                            믿고 맡기는 <br className="md:hidden" />
                            라이더 전용 <br className="hidden md:block" />
                            <span className="text-primary italic">정비 솔루션</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl"
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
                            <Link to="/rental/inquiry" className="btn-halo btn-halo-primary !px-12 !py-6 !text-lg !font-black">
                                정비 예약하기
                            </Link>
                            <a href="http://pf.kakao.com/_xgxoxexen/chat" target="_blank" rel="noopener noreferrer" className="btn-halo btn-halo-outline !px-12 !py-6 !text-lg !font-bold flex items-center bg-white">
                                <MessageCircle className="mr-2 w-6 h-6 text-[#FAE100]" fill="#FAE100" />
                                카톡 실시간 문의
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Service Highlights */}
            <section className="bg-slate-50 py-32">
                <div className="container">
                    <div className="text-center mb-20">
                        <h2 className="text-h2 text-foreground mb-6">전문적인 정비 서비스</h2>
                        <p className="text-p max-w-2xl mx-auto font-bold opacity-80">라이디 서비스 센터는 라이더가 최적의 컨디션으로 <br className="hidden md:block" /> 주행할 수 있도록 표준화된 정식 정비 가이드를 준수합니다.</p>
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

            {/* Location Network */}
            <section className="bg-white py-32">
                <div className="container">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div className="flex flex-col gap-4">
                            <h2 className="text-h2 text-foreground">서비스 센터 안내</h2>
                            <p className="text-p max-w-xl font-bold opacity-80">
                                전국 주요 거점에 위치한 라이디 서비스 센터에서 <br className="hidden md:block" />
                                차별화된 정비 솔루션을 경험하세요.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-100">
                            <input
                                type="text"
                                placeholder="지점명 또는 지역 검색"
                                className="bg-transparent border-none outline-none px-4 py-2 text-sm font-bold w-48 md:w-64 placeholder:text-slate-300"
                            />
                            <button className="p-2 bg-primary text-white rounded-xl">
                                <Search size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {locations.map((loc, index) => (
                            <LocationCard key={index} {...loc} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Franchise Section */}
            <section className="bg-slate-900 py-32 overflow-hidden relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
                    <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay" />
                    <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
                </div>

                <div className="container relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="flex-1 space-y-8">
                            <span className="inline-block px-4 py-2 bg-primary/20 text-primary border border-primary/20 rounded-pill text-xs font-black uppercase tracking-widest">Partnership</span>
                            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                                라이디와 함께 성장할 <br />
                                <span className="text-primary italic">서비스 센터 가맹점</span>을 모십니다.
                            </h2>
                            <p className="text-lg text-slate-400 font-medium leading-relaxed">
                                안정적인 정비 물량 확보고 전문적인 정비 관리 시스템 지원까지. <br className="hidden md:block" />
                                국내 No.1 라이더 플랫폼 라이디의 성공 파트너가 되어보세요.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/rental/inquiry" className="btn-halo btn-halo-primary !px-10 !py-5 !text-lg !font-black">
                                    가맹점 창업 문의
                                </Link>
                                <button className="btn-halo !border !border-white/10 !text-white hover:bg-white/5 !px-10 !py-5 !text-lg !font-bold">
                                    사업 제휴 안내서
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 w-full max-w-md">
                            <motion.div
                                initial={{ opacity: 0, rotate: 5 }}
                                whileInView={{ opacity: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[40px] shadow-2xl space-y-8"
                            >
                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        { label: "누적 관리 대수", value: "5,000+", icon: Building2 },
                                        { label: "전국 지점망", value: "30+", icon: MapPin },
                                        { label: "정비 만족도", value: "98%", icon: ShieldCheck },
                                        { label: "평균 정비 시간", value: "-40%", icon: Wrench }
                                    ].map((stat, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex items-center gap-2 text-slate-500">
                                                <stat.icon size={14} />
                                                <span className="text-[10px] font-black uppercase tracking-wider">{stat.label}</span>
                                            </div>
                                            <div className="text-2xl font-black text-white">{stat.value}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="h-px bg-white/10 w-full" />
                                <p className="text-xs text-slate-500 font-bold leading-relaxed">
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

