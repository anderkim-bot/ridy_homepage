
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
    ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Animation variants for consistent usage
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const Intro = () => {
    return (
        <div className="w-full overflow-hidden bg-bg-white">
            {/* 1. Hero Section */}
            <section className="relative w-full h-screen min-h-[700px] flex flex-col items-center justify-center text-center px-[20px] bg-bg-white">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 max-w-[800px] mx-auto space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-wider uppercase mb-4"
                    >
                        About Ridy
                    </motion.div>

                    <motion.h1
                        className="text-hero text-text-secondary leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        라이디가 더 간편하게<br />만들어 드립니다.
                    </motion.h1>

                    <motion.p
                        className="text-body text-[18px] md:text-[22px] text-text-muted leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        라이더의 일상, Ridy가 함께합니다.<br />
                        우리는 도시 곳곳에서 땀 흘리며 움직이는<br className="md:hidden" /> 사람들을 위해 존재합니다.
                    </motion.p>
                </div>

                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <div className="w-[1px] h-[60px] bg-gradient-to-b from-transparent via-text-muted/30 to-transparent" />
                </motion.div>
            </section>

            {/* 2. Core Values Section */}
            <section className="relative py-[100px] md:py-[150px] bg-bg-light">
                <div className="container">
                    <motion.div
                        className="text-center mb-[80px]"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 className="text-section-title mb-4">Core Values</h2>
                        <p className="text-sub-title text-text-muted font-normal max-w-2xl mx-auto">
                            Ridy는 단순히 이동을 돕는 서비스가 아닙니다.<br />
                            우리는 라이더가 더 나은 삶을 만들어갈 수 있도록 돕습니다.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-[30px]"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        {/* Value 1: Pride */}
                        <motion.div variants={fadeInUp} className="bg-white p-[40px] rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
                            <div className="w-[60px] h-[60px] rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <Heart size={32} />
                            </div>
                            <h3 className="text-[24px] font-bold text-text-secondary mb-4">Pride</h3>
                            <p className="text-body leading-relaxed">
                                우리는 라이더가 자신의 일에<br />
                                <span className="text-text-primary font-medium">자부심</span>을 느끼도록 돕습니다.
                            </p>
                        </motion.div>

                        {/* Value 2: Fairness */}
                        <motion.div variants={fadeInUp} className="bg-white p-[40px] rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
                            <div className="w-[60px] h-[60px] rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="text-[24px] font-bold text-text-secondary mb-4">Fairness</h3>
                            <p className="text-body leading-relaxed">
                                <span className="text-text-primary font-medium">투명하고 공정한</span> 구조 속에서<br />
                                더 나은 삶을 만들어갑니다.
                            </p>
                        </motion.div>

                        {/* Value 3: Human-centric */}
                        <motion.div variants={fadeInUp} className="bg-white p-[40px] rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
                            <div className="w-[60px] h-[60px] rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <Users size={32} />
                            </div>
                            <h3 className="text-[24px] font-bold text-text-secondary mb-4">Human-centric</h3>
                            <p className="text-body leading-relaxed">
                                기술은 도구일 뿐,<br />
                                <span className="text-text-primary font-medium">진짜 중심은 사람</span>입니다.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 3. Vision & Mission Statement */}
            <section className="relative py-[120px] bg-white overflow-hidden">
                <div className="container relative z-10">
                    <motion.div
                        className="max-w-4xl mx-auto text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 className="text-[32px] md:text-[48px] font-bold text-text-secondary leading-snug mb-8">
                            "지역 사회의 일자리와<br className="hidden md:block" /> 교육의 기회를 확장하고,<br />
                            라이더가 단순한 '노동자'가 아닌<br />
                            <span className="text-primary">도시의 동력</span>으로 인정받는 세상을 만듭니다."
                        </h2>
                        <div className="w-[60px] h-[4px] bg-primary mx-auto mb-8 rounded-full opacity-50"></div>
                        <p className="text-[20px] font-medium text-text-muted">
                            Ridy는 사람과 사회의 성장을 지향합니다.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 4. Brand Identity / Services */}
            <section className="py-[100px] bg-bg-dark text-white">
                <div className="container">
                    <motion.div
                        className="text-center mb-[80px]"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <span className="text-primary font-bold tracking-widest uppercase mb-2 block">Brand Identity</span>
                        <h2 className="text-section-title text-white mb-6">Our Services</h2>
                        <p className="text-body text-white/70 text-[18px]">
                            우리의 모든 서비스는 라이더가 더 나은 일상을 살아가도록<br /> 설계된 하나의 여정입니다.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
                        {/* Payout */}
                        <motion.div
                            className="bg-bg-dark-card p-[40px] rounded-xl border border-white/5 hover:border-primary/50 transition-colors group relative overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-primary/10 rounded-full blur-[40px] translate-x-1/2 translate-y-[-50%] group-hover:bg-primary/20 transition-all" />
                            <Wallet className="text-primary w-12 h-12 mb-6" />
                            <h3 className="text-sub-title text-white mb-4">Ridy Payout</h3>
                            <p className="text-body text-white/60 mb-8 min-h-[60px]">
                                배달 플랫폼 정산을 자동화해주는 서비스.<br />
                                라이더와 지사장의 정산 업무를 간편하게 처리합니다.
                            </p>
                            <Link to="/service/payout" className="inline-flex items-center text-primary font-bold hover:text-white transition-colors">
                                자세히 보기 <ArrowRight size={16} className="ml-2" />
                            </Link>
                        </motion.div>

                        {/* Rental */}
                        <motion.div
                            className="bg-bg-dark-card p-[40px] rounded-xl border border-white/5 hover:border-primary/50 transition-colors group relative overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-emerald-500/10 rounded-full blur-[40px] translate-x-1/2 translate-y-[-50%] group-hover:bg-emerald-500/20 transition-all" />
                            <Bike className="text-emerald-400 w-12 h-12 mb-6" />
                            <h3 className="text-sub-title text-white mb-4">Ridy Rental</h3>
                            <p className="text-body text-white/60 mb-8 min-h-[60px]">
                                배달용 바이크 렌탈 서비스.<br />
                                신차/중고 선택, 유지관리 포함.
                            </p>
                            <Link to="/rental" className="inline-flex items-center text-emerald-400 font-bold hover:text-white transition-colors">
                                자세히 보기 <ArrowRight size={16} className="ml-2" />
                            </Link>
                        </motion.div>

                        {/* Service Center */}
                        <motion.div
                            className="bg-bg-dark-card p-[40px] rounded-xl border border-white/5 hover:border-primary/50 transition-colors group relative overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-amber-500/10 rounded-full blur-[40px] translate-x-1/2 translate-y-[-50%] group-hover:bg-amber-500/20 transition-all" />
                            <Wrench className="text-amber-400 w-12 h-12 mb-6" />
                            <h3 className="text-sub-title text-white mb-4">Ridy Service Center</h3>
                            <p className="text-body text-white/60 mb-8 min-h-[60px]">
                                라이더 전용 장비 서비스.<br />
                                장비, 점검, 소모품 교체를 전문으로 제공합니다.
                            </p>
                            <Link to="/service/center" className="inline-flex items-center text-amber-400 font-bold hover:text-white transition-colors">
                                자세히 보기 <ArrowRight size={16} className="ml-2" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 5. Footer CTA */}
            <section className="bg-primary py-[100px] md:py-[140px] text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none"></div>
                <div className="container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-[36px] md:text-[56px] font-bold mb-[20px] leading-tight">
                            당신의 첫 라이딩을<br />책임지는 곳
                        </h2>
                        <p className="text-[18px] text-white/80 mb-[60px]">
                            지금 바로 시작하세요. 라이디가 함께합니다.
                        </p>

                        <div className="flex flex-col md:flex-row gap-[16px] justify-center items-center">
                            <Link to="/inquiry#rental" className="bg-white text-primary px-[32px] h-[56px] flex items-center justify-center rounded-full font-bold text-[18px] hover:bg-opacity-90 transition-all min-w-[200px] shadow-lg hover:translate-y-[-2px]">
                                리스/렌탈 문의하기
                            </Link>
                            <Link to="/inquiry#app" className="bg-transparent border-[2px] border-white text-white px-[32px] h-[56px] flex items-center justify-center rounded-full font-bold text-[18px] hover:bg-white hover:text-primary transition-all min-w-[200px] hover:translate-y-[-2px]">
                                정산앱 문의하기
                            </Link>
                            <Link to="/inquiry#franchise" className="bg-transparent border-[2px] border-white/30 text-white px-[32px] h-[56px] flex items-center justify-center rounded-full font-bold text-[18px] hover:bg-white hover:text-primary transition-all min-w-[200px] hover:translate-y-[-2px]">
                                가맹점 창업 문의하기
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Intro;
