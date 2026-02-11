
import React from 'react';
import { motion } from 'framer-motion';
import {
    Heart,
    ShieldCheck,
    Users,
    ArrowRight,
    Wallet,
    Bike,
    Wrench,
    ChevronRight,
    Search,
    Zap,
    CreditCard,
    Cpu,
    CheckCircle2,
    Calendar,
    AlertCircle,
    FileCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../../components/svg/Ridy_logo.svg';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const Intro = () => {
    return (
        <div className="w-full overflow-hidden bg-bg-white">
            {/* 1. Hero Section: Vision-Focused */}
            <section className="relative w-full h-screen min-h-[750px] flex flex-col items-center justify-center text-center px-space-lg bg-bg-white pb-32 md:pb-40">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,white_80%)] z-1" />
                </div>

                <div className="relative z-10 max-w-[900px] mx-auto space-y-8 -mt-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center mb-10"
                    >
                        <img src={Logo} alt="Ridy Logo" className="h-[36px] md:h-space-2xl w-auto" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h1 className="text-hero text-text-secondary leading-[1.2] mb-6">
                            라이더의 가치를 높이고,<br />
                            배달 생태계의 <span className="text-primary">기준을 바꿉니다.</span>
                        </h1>
                        <p className="text-body text-[18px] md:text-[24px] text-text-muted leading-relaxed max-w-3xl mx-auto font-medium">
                            라이디는 단순히 서비스를 제공하는 것을 넘어,<br className="hidden md:block" />
                            라이더가 사회적으로 존중받고 경제적으로 안정된 환경에서<br className="hidden md:block" />
                            오직 '운행'에만 전념할 수 있는 건강한 생태계를 구축합니다.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="pt-10"
                    >
                        <Link to="/rental/inquiry" className="btn-ridy btn-ridy-primary h-[56px]! px-10! text-lg! rounded-full">
                            Ridy와 함께 시작하기
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                >
                    <span className="text-[12px] text-text-light font-bold tracking-[0.2em] uppercase">Scroll</span>
                    <div className="w-px h-space-3xl bg-linear-to-b from-primary via-primary/30 to-transparent" />
                </motion.div>
            </section>

            {/* 2. Problem & Solution Section: Why Ridy? */}
            <section className="py-[100px] md:py-[160px] bg-bg-light relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-[0.03] text-primary rotate-12">
                    <Search size={400} />
                </div>

                <div className="container relative z-10">
                    <motion.div
                        className="mb-space-3xl"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <span className="text-primary font-bold tracking-widest uppercase mb-4 block">Problem & Solution</span>
                        <h2 className="text-section-title mb-6">우리가 해결하려는 문제</h2>
                        <p className="text-sub-title text-text-muted font-normal max-w-2xl">
                            라이더분들이 현장에서 겪는 불편함을 Ridy만의 혁신적인 기술과 인프라로 해결합니다.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-space-xl"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        {/* Issue 1 */}
                        <motion.div variants={fadeInUp} className="bg-white p-space-2xl rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
                            <h3 className="text-[22px] font-bold text-text-secondary mb-4">"정산이 너무 복잡하고 느려요"</h3>
                            <div className="w-8 h-px bg-slate-200 mb-6" />
                            <h4 className="text-primary font-bold mb-2 flex items-center gap-2">
                                <Zap size={16} /> Ridy Solution
                            </h4>
                            <p className="text-body text-text-primary font-medium leading-relaxed">
                                <span className="text-primary font-bold">자동화된 투명한 시스템</span>으로<br /> 혁신하고 누락 없는 빠른 정산을 보장합니다.
                            </p>
                        </motion.div>

                        {/* Issue 2 */}
                        <motion.div variants={fadeInUp} className="bg-white p-space-2xl rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
                            <h3 className="text-[22px] font-bold text-text-secondary mb-4">"바이크 구매 비용이 큰 부담이에요"</h3>
                            <div className="w-8 h-px bg-slate-200 mb-6" />
                            <h4 className="text-primary font-bold mb-2 flex items-center gap-2">
                                <Zap size={16} /> Ridy Solution
                            </h4>
                            <p className="text-body text-text-primary font-medium leading-relaxed">
                                <span className="text-primary font-bold">인수형/반납형 렌탈 프로그램</span>으로 초기 비용 부담을 최소화합니다.
                            </p>
                        </motion.div>

                        {/* Issue 3 */}
                        <motion.div variants={fadeInUp} className="bg-white p-space-2xl rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
                            <h3 className="text-[22px] font-bold text-text-secondary mb-4">"믿고 맡길 정비소가 부족해요"</h3>
                            <div className="w-8 h-px bg-slate-200 mb-6" />
                            <h4 className="text-primary font-bold mb-2 flex items-center gap-2">
                                <Zap size={16} /> Ridy Solution
                            </h4>
                            <p className="text-body text-text-primary font-medium leading-relaxed">
                                핵심 거점의 <span className="text-primary font-bold">자체 서비스 센터 네트워크</span>를 통해 신속하고 정확한 정비를 지원합니다.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 3. Three Pillars: Core Business Facts */}
            <section className="py-[120px] md:py-[180px] bg-bg-dark text-white relative">
                <div className="container relative z-10">
                    <motion.div
                        className="text-center mb-[100px]"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <span className="text-primary font-bold tracking-widest uppercase mb-4 block">Three Pillars</span>
                        <h2 className="text-section-title text-white mb-6">3대 핵심 비즈니스</h2>
                        <p className="text-[18px] md:text-[20px] text-white/60 max-w-2xl mx-auto">
                            Ridy의 전방위적 생태계는 라이더가 오직 운행에만<br className="hidden md:block" /> 전념할 수 있는 최고의 환경을 제공합니다.
                        </p>
                    </motion.div>

                    <div className="space-y-[120px] md:space-y-[180px]">
                        {/* Pillar 1: Payout */}
                        <motion.div
                            className="max-w-5xl mx-auto text-center space-y-10"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <span className="text-primary font-black tracking-[0.2em] text-[13px] md:text-[15px] uppercase block">Smart & Transparent</span>
                                    <h3 className="text-[42px] md:text-[72px] font-black text-white leading-[1.1] tracking-tight">
                                        Ridy Payout <br />
                                        <span className="text-primary">투명한 데이터 정산</span>
                                    </h3>
                                </div>
                                <div className="w-space-3xl h-[3px] bg-primary mx-auto rounded-full"></div>
                                <div className="max-w-3xl mx-auto space-y-6">
                                    <p className="text-white text-[20px] md:text-[26px] font-bold leading-snug">
                                        흩어진 데이터를 하나로.<br /> 라이더 수익의 투명한 기준을 만듭니다.
                                    </p>
                                    <p className="text-white/50 text-[16px] md:text-[18px] leading-relaxed font-medium">
                                        여러 플랫폼에 흩어진 배달 데이터를 하나로 통합하여,<br className="hidden md:block" />
                                        누락 없는 정확한 수익을 자동 계산하고 지사장과 라이더 모두가<br className="hidden md:block" />
                                        신뢰할 수 있는 데이터 정산 리포트를 제공합니다.
                                    </p>
                                </div>
                                <ul className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 pt-6">
                                    <li className="flex items-center gap-3 text-white/90 font-bold text-[17px]">
                                        <CheckCircle2 size={20} className="text-primary" /> 실시간 통합 정산 리포트
                                    </li>
                                    <li className="flex items-center gap-3 text-white/90 font-bold text-[17px]">
                                        <CheckCircle2 size={20} className="text-primary" /> 자동 오류 검출 시스템
                                    </li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Pillar 2: Rental */}
                        <motion.div
                            className="max-w-5xl mx-auto text-center space-y-10"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <span className="text-emerald-400 font-black tracking-[0.2em] text-[13px] md:text-[15px] uppercase block">Flexible & Reasonable</span>
                                    <h3 className="text-[42px] md:text-[72px] font-black text-white leading-[1.1] tracking-tight">
                                        Ridy Rental <br />
                                        <span className="text-emerald-400">맞춤형 바이크 라이프</span>
                                    </h3>
                                </div>
                                <div className="w-space-3xl h-[3px] bg-emerald-400 mx-auto rounded-full"></div>
                                <div className="max-w-3xl mx-auto space-y-6">
                                    <p className="text-white text-[20px] md:text-[26px] font-bold leading-snug">
                                        초기 비용 부담 없이,<br /> 라이더의 현재에 가장 알맞은 솔루션.
                                    </p>
                                    <p className="text-white/50 text-[16px] md:text-[18px] leading-relaxed font-medium">
                                        인수형/반납형 렌탈 프로그램부터 믿을 수 있는 품질의 중고 리스 승계까지,<br className="hidden md:block" />
                                        Ridy는 라이더의 경제적 여건과 주행 환경을 고려하여<br className="hidden md:block" />
                                        최적화된 바이크 마련 방안을 제안합니다.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-xl mx-auto pt-4">
                                    <div className="p-6 rounded-2xl bg-white/3 border border-white/10 hover:border-emerald-400/30 transition-colors group">
                                        <p className="text-emerald-400 font-black mb-1 text-[20px]">인수/반납형</p>
                                        <p className="text-[13px] text-white/40 font-medium">상황에 따라 선택 가능한 자유로운 옵션</p>
                                    </div>
                                    <div className="p-6 rounded-2xl bg-white/3 border border-white/10 hover:border-emerald-400/30 transition-colors group">
                                        <p className="text-emerald-400 font-black mb-1 text-[20px]">매물 리스 승계</p>
                                        <p className="text-[13px] text-white/40 font-medium">엄격한 검수를 마친 우수한 품질의 바이크</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Pillar 3: Service Center */}
                        <motion.div
                            className="max-w-5xl mx-auto text-center space-y-10"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <span className="text-amber-400 font-black tracking-[0.2em] text-[13px] md:text-[15px] uppercase block">Expert & Hardware</span>
                                    <h3 className="text-[42px] md:text-[72px] font-black text-white leading-[1.1] tracking-tight">
                                        Service Center <br />
                                        <span className="text-amber-400">독보적인 현장 인프라</span>
                                    </h3>
                                </div>
                                <div className="w-space-3xl h-[3px] bg-amber-400 mx-auto rounded-full"></div>
                                <div className="max-w-3xl mx-auto space-y-6">
                                    <p className="text-white text-[20px] md:text-[26px] font-bold leading-snug">
                                        운행에만 전념하도록.<br /> 전문 메카닉이 바이크를 케어합니다.
                                    </p>
                                    <p className="text-white/50 text-[16px] md:text-[18px] leading-relaxed font-medium">
                                        전국 핵심 거점에 위치한 서비스 센터망과 전문 메카닉 상주 시스템으로<br className="hidden md:block" />
                                        최상의 바이크 컨디션을 유지하며, 부품 및 소모품 관리까지<br className="hidden md:block" />
                                        통합된 사후 관리 인프라를 제공합니다.
                                    </p>
                                </div>
                                <ul className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 pt-6">
                                    <li className="flex items-center gap-3 text-white/90 font-bold text-[17px]">
                                        <CheckCircle2 size={20} className="text-amber-400" /> 전문 메카닉 상주 시스템
                                    </li>
                                    <li className="flex items-center gap-3 text-white/90 font-bold text-[17px]">
                                        <CheckCircle2 size={20} className="text-amber-400" /> 순정 부품 관리 연계 서비스
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 4. Trust & Safety Section: The Ridy Standard */}
            <section className="py-[120px] md:py-[180px] bg-bg-white overflow-hidden">
                <div className="container">
                    <motion.div
                        className="text-center mb-space-3xl"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <span className="text-primary font-bold tracking-widest uppercase mb-4 block">Trust & Safety</span>
                        <h2 className="text-section-title mb-6">신뢰할 수 있는 안전망</h2>
                        <p className="text-sub-title text-text-muted font-normal max-w-2xl mx-auto">
                            우리의 목표는 라이더가 어떠한 상황에서도 안전하게<br className="hidden md:block" /> 보호받으며 운행에 집중할 수 있도록 만드는 것입니다.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-2xl md:gap-space-3xl">
                        {/* Protection */}
                        <motion.div
                            className="flex gap-8 p-10 bg-bg-light rounded-3xl"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-[64px] h-[64px] rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary shrink-0">
                                <ShieldCheck size={32} />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-[24px] font-bold text-text-secondary">철저한 보험 및 사고 대응</h3>
                                <p className="text-body leading-relaxed text-[16px]">
                                    종합/책임보험에 대한 전문적인 가이드와 사고 발생 시<br />
                                    <span className="text-text-primary font-bold font-sans">대차 서비스 연계</span>를 통해 수리 기간에도<br /> 라이더의 수입 공백이 없도록 철저히 보호합니다.
                                </p>
                            </div>
                        </motion.div>

                        {/* Technology */}
                        <motion.div
                            className="flex gap-8 p-10 bg-bg-light rounded-3xl"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-[64px] h-[64px] rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary shrink-0">
                                <FileCheck size={32} />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-[24px] font-bold text-text-secondary">혁신적인 편리함</h3>
                                <p className="text-body leading-relaxed text-[16px]">
                                    <span className="text-text-primary font-bold font-sans">비대면 전자계약 시스템</span> 도입 등으로<br />
                                    불필요한 대기 시간을 획기적으로 줄여 라이더의 시간을<br /> 가장 소중하게 생각하는 라이딩 환경을 제공합니다.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        className="mt-space-3xl p-10 md:p-16 bg-primary rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-10"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="space-y-4 text-center md:text-left">
                            <h3 className="text-[28px] md:text-[36px] font-bold leading-tight">라이더의 권익을 대변하는<br /> 든든한 파트너가 되겠습니다.</h3>
                            <p className="text-white/70 font-medium">주식회사 LLNP Team Ridy</p>
                        </div>
                        <Link to="/rental/inquiry" className="bg-white text-primary px-10 h-[64px] flex items-center justify-center rounded-full font-bold text-[18px] hover:scale-105 transition-transform shadow-xl min-w-[200px]">
                            지금 문의하기 <ArrowRight size={20} className="ml-2" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Intro;
