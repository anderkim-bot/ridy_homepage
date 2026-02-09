import React from 'react';
import { motion } from 'framer-motion';
import {
    Heart,
    Shield,
    Zap,
    Users,
    TrendingUp,
    Globe,
    ChevronRight,
    Wallet,
    Bike,
    Wrench,
    ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ValueCard = ({ icon: Icon, title, description, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="card-halo bg-white border border-slate-100 p-10 flex flex-col gap-6 group hover:border-primary/20 transition-all"
    >
        <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
            <Icon size={32} />
        </div>
        <div className="space-y-4">
            <h4 className="text-2xl font-black text-foreground">{title}</h4>
            <p className="text-slate-500 font-medium leading-relaxed">{description}</p>
        </div>
    </motion.div>
);

const ServiceLink = ({ icon: Icon, title, description, href, color, index }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
    >
        <Link to={href} className="card-halo bg-white p-8 flex flex-col gap-6 group hover:translate-y-[-8px] transition-all duration-500">
            <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${color}15`, color: color }}
            >
                <Icon size={28} />
            </div>
            <div className="space-y-2">
                <h4 className="text-xl font-black text-foreground">{title}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{description}</p>
            </div>
            <div className="flex items-center text-sm font-black text-primary mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                상세보기
                <ChevronRight size={16} className="ml-1 translate-x-0 group-hover:translate-x-1 transition-transform" />
            </div>
        </Link>
    </motion.div>
);

const Intro = () => {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative pt-[100px] pb-[120px] md:pt-[180px] md:pb-[240px] bg-white overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-primary/5 rounded-[50%] blur-[120px] -translate-y-1/2" />
                </div>

                <div className="container relative z-10">
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-10">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="badge-halo !bg-primary/10 !text-primary px-6 py-2"
                        >
                            About RIDY
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="text-h1 text-foreground leading-[1.1]"
                        >
                            라이더의 일상을 <br />
                            <span className="text-primary italic">더 간편하게</span> 만들어 드립니다.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-2xl text-slate-500 font-medium leading-relaxed max-w-3xl"
                        >
                            라이디는 단순히 이동을 돕는 기술을 넘어, <br className="hidden md:block" />
                            라이더 한 분 한 분이 도시의 동력으로서 자부심을 가지고 <br className="hidden md:block" />
                            성장할 수 있는 건강한 생태계를 만듭니다.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="bg-slate-50 py-32">
                <div className="container">
                    <div className="flex flex-col items-center text-center mb-20 gap-4">
                        <span className="text-primary font-black uppercase tracking-[0.2em] text-sm">Core Values</span>
                        <h2 className="text-h2 text-foreground">진짜 중심은 사람입니다.</h2>
                        <p className="text-p max-w-2xl font-bold opacity-80">기술은 도구일 뿐, 라이디는 도시 곳곳에서 땀 흘리는 <br className="hidden md:block" /> 사람들의 가치에 집중합니다.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ValueCard
                            icon={Heart}
                            title="사람 중심 (People First)"
                            description="기술의 혜택이 특정 소수에 머물지 않고, 현장의 라이더분들에게 직접 닿을 수 있도록 설계합니다."
                            index={0}
                        />
                        <ValueCard
                            icon={Shield}
                            title="신뢰와 투명성 (Trust)"
                            description="데이터를 기반으로 한 공정한 정산과 투명한 계약으로 라이더와 파트너사의 신뢰를 쌓아갑니다."
                            index={1}
                        />
                        <ValueCard
                            icon={TrendingUp}
                            title="상생의 성장 (Growth)"
                            description="단순 노동을 넘어 전문성을 인정받고, 정당한 보상과 교육의 기회가 균등하게 제공되는 환경을 지향합니다."
                            index={2}
                        />
                    </div>
                </div>
            </section>

            {/* Vision & Brand Identity */}
            <section className="bg-white py-32 overflow-hidden">
                <div className="container">
                    <div className="flex flex-col lg:flex-row items-center gap-24">
                        <div className="flex-1 space-y-10">
                            <div className="space-y-4">
                                <span className="badge-halo">Brand Identity</span>
                                <h2 className="text-h2">우리는 라이더의 <br className="hidden md:block" /> 든든한 파트너입니다.</h2>
                            </div>

                            <div className="space-y-12">
                                {[
                                    { title: "Payout으로 공정하게", desc: "복잡한 정산 업무를 자동화하여 누락 없는 정확한 수익을 보장합니다." },
                                    { title: "Rental로 자유롭게", desc: "부담 없는 렌탈 조건으로 원하는 시기에 언제든 배달을 시작할 수 있습니다." },
                                    { title: "Service 로 든든하게", desc: "전국 정비 네트워크를 통해 라이더의 안전과 바이크 컨디션을 책임집니다." }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex gap-6 items-start"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0 mt-1">
                                            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-xl font-black text-foreground">{item.title}</h4>
                                            <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 relative">
                            <div className="relative w-full aspect-square max-w-lg mx-auto">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    className="w-full h-full bg-slate-900 rounded-[60px] flex items-center justify-center p-20 shadow-2xl relative z-10 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent" />
                                    <div className="text-white text-center space-y-4 relative z-20">
                                        <div className="text-8xl font-black italic tracking-tighter text-primary">LLNP</div>
                                        <p className="text-xl font-bold tracking-widest opacity-60 uppercase">Live Life Next Phase</p>
                                    </div>
                                </motion.div>
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-[60px]" />
                                <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-500/10 rounded-full blur-[80px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Ecosystem Section */}
            <section className="bg-slate-900 py-32 text-white">
                <div className="container">
                    <div className="flex flex-col items-center text-center mb-20 gap-6">
                        <span className="badge-halo !bg-white/10 !text-white border border-white/20">Service Ecosystem</span>
                        <h2 className="text-4xl md:text-5xl font-black leading-tight">라이디가 제안하는 <br /> 라이더 라이프 사이클</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <ServiceLink
                            icon={Wallet}
                            title="라이디 페이아웃"
                            description="정산 업무의 자동화로 라이더와 운영자 모두에게 투명함을 제공합니다."
                            href="/service/payout"
                            color="#4A61ED"
                            index={0}
                        />
                        <ServiceLink
                            icon={Bike}
                            title="라이디 렌탈"
                            description="원하는 바이크를 합리적인 비용으로 렌탈하고 부담 없이 시작하세요."
                            href="/service/rental"
                            color="#10B981"
                            index={1}
                        />
                        <ServiceLink
                            icon={Wrench}
                            title="라이디 서비스 센터"
                            description="전국 오프라인 정비 거점에서 최고의 정비 인프라를 지원합니다."
                            href="/service/center"
                            color="#F59E0B"
                            index={2}
                        />
                    </div>
                </div>
            </section>

            {/* Vision Quote Section */}
            <section className="bg-white py-40">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center space-y-12">
                        <div className="w-12 h-px bg-primary mx-auto" />
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-foreground leading-[1.3]"
                        >
                            "라이더가 단순한 '노동자'가 아닌, <br className="hidden md:block" />
                            도시의 역동성을 불어넣는 <span className="text-primary italic">동력</span>으로 <br />
                            인정받는 세상을 꿈꿉니다."
                        </motion.h2>
                        <div className="space-y-2">
                            <p className="text-xl font-black text-slate-800">주식회사 LLNP</p>
                            <p className="text-slate-400 font-bold tracking-widest text-sm">TEAM RIDY</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-primary py-24">
                <div className="container">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-white/10 backdrop-blur-xl rounded-[40px] p-10 md:p-20 border border-white/10">
                        <div className="space-y-4 text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-black text-white">라이디와 함께 <br className="md:hidden" /> 새로운 도약을 시작하세요.</h2>
                            <p className="text-lg text-white/70 font-medium">지금 라이디 서비스에 대해 더 자세히 알아보거나 도입을 문의하세요.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <Link to="/rental/inquiry" className="btn-halo bg-white text-primary !px-12 !py-5 !text-lg !font-black text-center">
                                도입 문의하기
                            </Link>
                            <a href="http://pf.kakao.com/_xgxoxexen/chat" target="_blank" rel="noopener noreferrer" className="btn-halo bg-primary-dark text-white !px-12 !py-5 !text-lg !font-bold flex items-center justify-center gap-2">
                                <Users size={20} />
                                협력 제안하기
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Intro;

