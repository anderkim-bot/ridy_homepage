import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bike, CheckCircle2, ChevronRight, ExternalLink, Loader2, CreditCard, Zap, Wrench, Search, ShieldCheck, FileCheck, ArrowRight, Heart, Users, Cpu } from 'lucide-react';
import { bikeService } from '../services/bikeService';
import { caseService } from '../services/caseService';

// Import Custom Brand Logos
import RidyRentalLogo from './svg/Ridy_Rental_logo.svg';
import RidyPayoutLogo from './svg/Ridy_Payout_logo.svg';
import RidyServiceCenterLogo from './svg/Ridy_Service_center_logo.svg';
import RidyLogo from './svg/Ridy_logo.svg';
import ProblemBg from './img/ridy_main_home_rs1.jpg';
import LlnpLogo from './img/llnp_logo.png';

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

const ServiceCard = ({ iconSrc, title, description, href, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="h-full"
    >
        <Link to={href} className="flex flex-col h-full bg-white p-10 rounded-xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-primary/20 hover:-translate-y-2 transition-all duration-500 group">
            <div className="h-16 w-fit px-6 rounded-lg bg-slate-50 flex items-center justify-center mb-8 border border-slate-100 transition-all duration-300 group-hover:bg-primary group-hover:border-primary">
                <img
                    src={iconSrc}
                    alt={title}
                    className="h-8 w-auto object-contain group-hover:invert group-hover:brightness-[100] transition-all duration-300"
                />
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
        <Link to={`/product/detail/${slug}`} className="flex flex-col h-full bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-500">
            <div className="aspect-[4/3] bg-slate-50 relative overflow-hidden flex items-center justify-center">
                {image ? (
                    <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
                <div className="w-full py-3.5 border-2 border-slate-100 rounded-lg text-[14px] font-black text-slate-400 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                    상세 사양 보기
                </div>
            </div>
        </Link>
    </motion.div>
);

const CaseCard = ({ region, description, image, link, created_at, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="group h-full"
    >
        <a href={link} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-500">
            <div className="aspect-[16/9] bg-slate-50 relative overflow-hidden">
                {image ? (
                    <img src={image} alt={description} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-200">
                        <CheckCircle2 size={48} strokeWidth={1} />
                    </div>
                )}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-lg text-[11px] font-black text-slate-500 uppercase tracking-wider">{region}</span>
                </div>
            </div>
            <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-4 text-[12px] font-bold text-slate-400">
                    <span>{new Date(created_at).toLocaleDateString()} 출고</span>
                </div>
                <h4 className="text-[18px] font-black text-slate-900 leading-snug mb-6 group-hover:text-primary transition-colors line-clamp-2">{description}</h4>
                <div className="mt-auto flex items-center text-[14px] font-black text-slate-400 group-hover:text-primary transition-colors">
                    <span className="relative">
                        출고 리포트 보기
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    </span>
                    <ExternalLink size={16} className="ml-1.5" />
                </div>
            </div>
        </a>
    </motion.div>
);

const HomeContent = () => {
    const [displayModels, setDisplayModels] = useState([]);
    const [recentCases, setRecentCases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const services = [
        { iconSrc: RidyRentalLogo, title: "RIDY Rental", description: "배달 입문부터 베테랑까지. 보험과 정비가 포함된 합리적인 오토바이 렌탈 서비스.", href: "/service/rental" },
        { iconSrc: RidyPayoutLogo, title: "RIDY Payout", description: "복잡한 정산은 이제 그만. 라이디 앱 하나로 실시간 수익 관리와 즉시 출금을 시작하세요.", href: "/service/payout" },
        { iconSrc: RidyServiceCenterLogo, title: "RIDY Service Center", description: "전국 최대 네트워크. 라이더 전용 장비와 전문 메카닉이 당신의 안전 주행을 지원합니다.", href: "/service/center" }
    ];

    useEffect(() => {
        const loadData = async () => {
            try {
                const [bikesData, casesData] = await Promise.all([
                    bikeService.getBikes(),
                    caseService.getAllCases()
                ]);

                // Filter out SUCCESSION bikes and ensure they have images
                const allRentalBikes = bikesData.filter(b => b.brand !== 'SUCCESSION' && b.items?.some(item => item.image));
                // Use all rental bikes for marquee
                setDisplayModels(allRentalBikes);

                // Sort cases by date and take top 10 for marquee
                const sortedCases = casesData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setRecentCases(sortedCases.slice(0, 10));
            } catch (error) {
                console.error('Error loading home data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);


    return (
        <div className="flex flex-col">
            {/* 1. Brand Vision Section (Merged from Intro) */}
            <section className="bg-white py-16 md:py-32 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                    <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px]" />
                </div>

                <div className="container relative z-10 text-center px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="max-w-4xl mx-auto space-y-8"
                    >
                        <div className="flex justify-center mb-6 opacity-20">
                            <img src={RidyLogo} alt="Ridy Logo icon" className="h-10 w-auto grayscale" />
                        </div>
                        <h2 className="text-section-title text-slate-900 mb-6 leading-[1.2]">
                            라이더의 가치를 높이고,<br />
                            배달 생태계의 <span className="text-primary">기준을 바꿉니다.</span>
                        </h2>
                        <div className="w-12 h-1 bg-primary mx-auto rounded-full mb-8" />
                        <p className="text-[15px] md:text-[20px] text-slate-500 leading-relaxed font-medium max-w-3xl mx-auto">
                            라이디는 단순히 서비스를 제공하는 것을 넘어,<br className="hidden md:block" />
                            라이더가 사회적으로 존중받고 경제적으로 안정된 환경에서<br className="hidden md:block" />
                            오직 '운행'에만 전념할 수 있는 건강한 생태계를 구축합니다.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. Problem & Solution Section (Merged from Intro) */}
            <section className="py-16 md:py-32 bg-slate-50 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img src={ProblemBg} alt="" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-slate-50/90" />
                </div>

                <div className="container relative z-10">
                    <motion.div
                        className="mb-12 text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <span className="text-primary font-black tracking-widest uppercase mb-3 block text-[12px]">Problem & Solution</span>
                        <h2 className="text-section-title text-slate-900 mb-4 font-black">우리가 해결하려는 문제</h2>
                        <p className="text-[15px] md:text-[19px] text-slate-500 font-bold max-w-2xl mx-auto leading-relaxed">
                            라이더분들이 현장에서 겪는 불편함을 <br className="hidden md:block" /> Ridy만의 혁신적인 기술과 인프라로 해결합니다.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        {/* Issue 1 */}
                        <motion.div variants={fadeInUp} className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 group">
                            <h3 className="text-[20px] md:text-[22px] font-black text-slate-900 mb-6 group-hover:text-primary transition-colors">"정산이 너무 복잡하고 느려요"</h3>
                            <div className="w-8 h-[2px] bg-slate-100 mb-8 group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
                            <h4 className="text-primary font-black mb-3 flex items-center gap-2 text-sm uppercase">
                                <Zap size={16} /> Ridy Solution
                            </h4>
                            <p className="text-[15px] text-slate-500 font-bold leading-relaxed">
                                <span className="text-slate-900 font-black">자동화된 투명한 시스템</span>으로 누락 없는 빠른 정산을 보장합니다.
                            </p>
                        </motion.div>

                        {/* Issue 2 */}
                        <motion.div variants={fadeInUp} className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 group">
                            <h3 className="text-[20px] md:text-[22px] font-black text-slate-900 mb-6 group-hover:text-primary transition-colors">"바이크 구매 비용이 큰 부담이에요"</h3>
                            <div className="w-8 h-[2px] bg-slate-100 mb-8 group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
                            <h4 className="text-primary font-black mb-3 flex items-center gap-2 text-sm uppercase">
                                <Zap size={16} /> Ridy Solution
                            </h4>
                            <p className="text-[15px] text-slate-500 font-bold leading-relaxed">
                                <span className="text-slate-900 font-black">인수형/반납형 렌탈 프로그램</span>으로 초기 비용 부담을 최소화합니다.
                            </p>
                        </motion.div>

                        {/* Issue 3 */}
                        <motion.div variants={fadeInUp} className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 group">
                            <h3 className="text-[20px] md:text-[22px] font-black text-slate-900 mb-6 group-hover:text-primary transition-colors">"믿고 맡길 정비소가 부족해요"</h3>
                            <div className="w-8 h-[2px] bg-slate-100 mb-8 group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
                            <h4 className="text-primary font-black mb-3 flex items-center gap-2 text-sm uppercase">
                                <Zap size={16} /> Ridy Solution
                            </h4>
                            <p className="text-[15px] text-slate-500 font-bold leading-relaxed">
                                전국 핵심 거점의 <span className="text-slate-900 font-black">공식 서비스 센터 네트워크</span>를 통해 확실한 사후 관리를 지원합니다.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* AI Disclaimer */}
                <div className="absolute bottom-4 right-6 z-10 w-full text-right px-6 md:px-0 md:w-auto">
                    <p className="text-[10px] text-slate-400 font-bold">본 이미지는 AI로 생성된 이미지입니다.</p>
                </div>
            </section>
            {/* Quick Service Dashboard Section */}
            <section id="service-dashboard" className="bg-white py-16 md:py-32 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 translate-x-1/2 -z-10" />

                <div className="container relative z-10">
                    <div className="flex flex-col lg:flex-row items-end justify-between mb-12 gap-8 px-4">
                        <div className="max-w-2xl flex flex-col gap-4 text-left">
                            <div className="text-primary font-black text-[13px] tracking-[0.2em] uppercase">Service Hub</div>
                            <h2 className="text-section-title text-slate-900">
                                퀵 서비스 대시보드
                            </h2>
                            <p className="text-[14px] md:text-[18px] text-slate-500 font-bold leading-relaxed max-w-xl">
                                라이더의 일상을 바꾸는 라이디의 핵심 기능을 <br className="hidden md:block" /> 한눈에 확인하고 바로 이용해 보세요.
                            </p>
                        </div>
                        <div className="hidden lg:flex items-center gap-4 text-slate-300 font-black text-[14px]">
                            <span className="text-slate-900">Platform Overview</span>
                            <div className="w-12 h-px bg-slate-200" />
                            <span>Efficiency Driven</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Payout */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <Link to="/service/payout" className="group block bg-white border border-slate-100 p-8 rounded-2xl h-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-primary/20 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-5 transition-opacity">
                                    <img src={RidyPayoutLogo} alt="" className="h-20 w-auto" />
                                </div>
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-10 group-hover:bg-primary transition-colors">
                                        <CreditCard className="text-slate-400 group-hover:text-white transition-colors" size={24} />
                                    </div>
                                    <div className="mt-auto">
                                        <div className="text-primary font-black text-[12px] uppercase tracking-wider mb-2">정산</div>
                                        <h3 className="text-slate-900 text-[22px] font-black mb-3">라이디 페이아웃</h3>
                                        <p className="text-slate-500 text-[15px] font-bold leading-relaxed mb-8">
                                            오늘 수익, <br />내일 바로 출금
                                        </p>
                                        <div className="flex items-center text-primary text-[14px] font-black">
                                            이용하기 <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Rental */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Link to="/service/rental" className="group block bg-white border border-slate-100 p-8 rounded-2xl h-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-primary/20 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-5 transition-opacity">
                                    <img src={RidyRentalLogo} alt="" className="h-20 w-auto" />
                                </div>
                                <div className="flex flex-col h-full relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-10 group-hover:bg-primary transition-all">
                                        <Bike className="text-slate-400 group-hover:text-white transition-colors" size={24} />
                                    </div>
                                    <div className="mt-auto">
                                        <div className="text-primary font-black text-[12px] uppercase tracking-wider mb-2">렌탈</div>
                                        <h3 className="text-slate-900 text-[22px] font-black mb-3">라이디 렌탈</h3>
                                        <p className="text-slate-500 text-[15px] font-bold leading-relaxed mb-8">
                                            다양한 차종 <br />즉시 출고 가능
                                        </p>
                                        <div className="flex items-center text-primary text-[14px] font-black">
                                            기종 보기 <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Lease Succession */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <Link to="/product/lease" className="group block bg-white border border-slate-100 p-8 rounded-2xl h-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-primary/20 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-5 transition-opacity">
                                    <img src={RidyRentalLogo} alt="" className="h-20 w-auto" />
                                </div>
                                <div className="flex flex-col h-full relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-10 group-hover:bg-primary transition-all">
                                        <Zap className="text-slate-400 group-hover:text-white transition-colors" size={24} />
                                    </div>
                                    <div className="mt-auto">
                                        <div className="text-primary font-black text-[12px] uppercase tracking-wider mb-2">승계</div>
                                        <h3 className="text-slate-900 text-[22px] font-black mb-3">리스 승계</h3>
                                        <p className="text-slate-500 text-[15px] font-bold leading-relaxed mb-8">
                                            저렴한 가격의 <br />리스 승계 매물 보기
                                        </p>
                                        <div className="flex items-center text-primary text-[14px] font-black">
                                            매물 확인 <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Service Center */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <Link to="/service/center" className="group block bg-white border border-slate-100 p-8 rounded-2xl h-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-primary/20 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-5 transition-opacity">
                                    <img src={RidyServiceCenterLogo} alt="" className="h-20 w-auto" />
                                </div>
                                <div className="flex flex-col h-full relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-10 group-hover:bg-primary transition-all">
                                        <Wrench className="text-slate-400 group-hover:text-white transition-colors" size={24} />
                                    </div>
                                    <div className="mt-auto">
                                        <div className="text-primary font-black text-[12px] uppercase tracking-wider mb-2">정비</div>
                                        <h3 className="text-slate-900 text-[22px] font-black mb-3">라이디 서비스센터</h3>
                                        <p className="text-slate-500 text-[15px] font-bold leading-relaxed mb-8">
                                            가장 가까운 <br />라이디 서비스센터 찾기
                                        </p>
                                        <div className="flex items-center text-primary text-[14px] font-black">
                                            지점 찾기 <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Popular Models Section */}
            <section className="bg-[#F8F9FD] py-16 md:py-32 border-y border-slate-100">
                <div className="container">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                        <div className="flex flex-col gap-3">
                            <div className="text-primary font-black text-[13px] tracking-[0.2em] uppercase">Our Marketplace</div>
                            <h2 className="text-section-title text-slate-900">렌탈 기종 보기</h2>
                        </div>
                        <Link to="/product/honda" className="inline-flex items-center text-primary font-black text-[15px] group">
                            전체 기종 페이지로 이동
                            <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 size={40} className="text-primary animate-spin" />
                        <p className="text-slate-400 font-bold">기종 정보를 불러오는 중...</p>
                    </div>
                ) : (
                    <div className="relative w-full overflow-hidden">
                        {/* Gradient Masks for Fade Effect */}
                        <div className="hidden md:block absolute top-0 left-0 w-16 md:w-32 h-full bg-linear-to-r from-[#F8F9FD] to-transparent z-10 pointer-events-none" />
                        <div className="hidden md:block absolute top-0 right-0 w-16 md:w-32 h-full bg-linear-to-l from-[#F8F9FD] to-transparent z-10 pointer-events-none" />

                        <div className="w-full inline-flex flex-nowrap overflow-hidden py-10">
                            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-marquee hover:[animation-play-state:paused]">
                                {/* Render the list twice for seamless infinite scroll */}
                                {[...displayModels, ...displayModels].map((bike, index) => (
                                    <li key={`${bike.id}-${index}`} className="w-[300px] shrink-0">
                                        <ModelCard
                                            name={bike.name}
                                            brand={bike.brand}
                                            slug={bike.slug}
                                            image={bike.items?.[0]?.image}
                                            index={index}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </section>

            {/* 3. Trust & Safety Section (Merged from Intro) */}
            <section className="py-16 md:py-32 bg-white overflow-hidden">
                <div className="container px-6">
                    <motion.div
                        className="text-center mb-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <span className="text-primary font-black tracking-widest uppercase mb-3 block text-[12px]">Trust & Safety</span>
                        <h2 className="text-section-title text-slate-900 mb-4">신뢰할 수 있는 안전망</h2>
                        <p className="text-[15px] md:text-[19px] text-slate-500 font-bold max-w-2xl mx-auto leading-relaxed">
                            우리의 목표는 라이더가 어떠한 상황에서도 안전하게<br className="hidden md:block" /> 보호받으며 운행에 집중할 수 있도록 만드는 것입니다.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Protection */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-8 p-10 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-xl transition-all duration-500"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary shrink-0">
                                <ShieldCheck size={32} />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-[22px] font-black text-slate-900">철저한 보험 및 사고 대응</h3>
                                <p className="text-[15px] font-bold leading-relaxed text-slate-500">
                                    종합/책임보험에 대한 전문적인 가이드와 사고 발생 시<br />
                                    <span className="text-slate-900 font-black italic">대차 서비스 연계</span>를 통해 수리 기간에도<br /> 라이더의 수입 공백이 없도록 철저히 보호합니다.
                                </p>
                            </div>
                        </motion.div>

                        {/* Technology */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-8 p-10 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-xl transition-all duration-500"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary shrink-0">
                                <FileCheck size={32} />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-[22px] font-black text-slate-900">혁신적인 편리함</h3>
                                <p className="text-[15px] font-bold leading-relaxed text-slate-500">
                                    <span className="text-slate-900 font-black italic">비대면 전자계약 시스템</span> 도입 등으로<br />
                                    불필요한 대기 시간을 획기적으로 줄여 라이더의 시간을<br /> 가장 소중하게 생각하는 라이딩 환경을 제공합니다.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Latest Cases Section */}
            <section className="bg-slate-50 py-16 md:py-32">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center mb-12 flex flex-col gap-4">
                        <div className="text-primary font-black text-[13px] tracking-[0.2em] uppercase">Release Cases</div>
                        <h2 className="text-section-title text-slate-900 leading-tight">최신 출고 사례</h2>
                        <p className="text-[16px] text-slate-500 font-bold leading-relaxed">전국 각지에서 라이디와 함께 새로운 시작을 알린 <br className="hidden md:block" /> 라이더님들의 생생한 출고 현장입니다.</p>
                    </div>
                </div>

                {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 size={40} className="text-primary animate-spin" />
                        <p className="text-slate-400 font-bold">출고 사례를 불러오는 중...</p>
                    </div>
                ) : (
                    <div className="relative w-full overflow-hidden">
                        {/* Gradient Masks for Fade Effect */}
                        <div className="hidden md:block absolute top-0 left-0 w-16 md:w-32 h-full bg-linear-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
                        <div className="hidden md:block absolute top-0 right-0 w-16 md:w-32 h-full bg-linear-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

                        <div className="w-full inline-flex flex-nowrap overflow-hidden py-10">
                            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-marquee hover:[animation-play-state:paused]">
                                {/* Render the list twice for seamless infinite scroll */}
                                {[...recentCases, ...recentCases].map((item, index) => (
                                    <li key={`${item.id}-${index}`} className="w-[350px] shrink-0">
                                        <CaseCard {...item} index={index} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </section>

            {/* 4. Brand Identity Footer (Merged from Intro) */}
            <section className="py-16 md:py-32 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(64,84,231,0.1)_0%,transparent_70%)]" />
                </div>

                <div className="container relative z-10 px-6 text-center">
                    <motion.div
                        className="inline-flex flex-col items-center justify-center p-10 md:p-14 bg-white/5 backdrop-blur-3xl rounded-[30px] border border-white/10 gap-8"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-[20px] md:text-[32px] font-black text-white leading-tight">
                            라이더의 권익을 대변하는<br className="md:hidden" /> <span className="text-primary">든든한 파트너</span>가 되겠습니다.
                        </h3>
                        <div className="opacity-50 hover:opacity-100 transition-opacity">
                            <img src={LlnpLogo} alt="LLNP" className="h-6 md:h-8 w-auto brightness-0 invert" />
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default HomeContent;
