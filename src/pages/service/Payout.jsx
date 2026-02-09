import React from 'react';
import { motion } from 'framer-motion';
import {
    Wallet,
    BarChart3,
    UploadCloud,
    Zap,
    ShieldCheck,
    ChevronRight,
    Smartphone,
    LayoutDashboard,
    FileText,
    Clock,
    CheckCircle2,
    ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, description, benefits, color, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="card-halo bg-white h-full"
    >
        <div className="flex items-center gap-4 mb-6">
            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${color}15`, color: color }}
            >
                <Icon size={24} />
            </div>
            <h3 className="text-xl font-black text-foreground">{title}</h3>
        </div>
        <p className="text-slate-500 font-medium mb-8 text-sm leading-relaxed">
            {description}
        </p>
        <ul className="flex flex-col gap-3">
            {benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-slate-700 font-bold text-sm">{benefit}</span>
                </li>
            ))}
        </ul>
    </motion.div>
);

const SectionHeader = ({ badge, title, description, align = 'center' }) => (
    <div className={`mb-16 flex flex-col gap-4 ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
        <span className="badge-halo">{badge}</span>
        <h2 className="text-h2 text-foreground">{title}</h2>
        <p className="text-p max-w-2xl font-bold opacity-80">{description}</p>
    </div>
);

const Payout = () => {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative pt-[60px] pb-[100px] md:pt-[120px] md:pb-[180px] bg-[#0F172A] overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-l from-primary/30 to-transparent" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px]" />
                </div>

                <div className="container relative z-20">
                    <div className="max-w-3xl flex flex-col gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="badge-halo !bg-white/10 !text-white border border-white/10 backdrop-blur-md w-fit"
                        >
                            RIDY Payout: 스마트 정산 솔루션
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="text-h1 text-white"
                        >
                            복잡한 정산 관리, <br />
                            <span className="text-primary">RIDY Payout</span>이 <br />
                            도와드리겠습니다.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-xl text-slate-400 font-medium leading-relaxed max-w-2xl"
                        >
                            관리자에게는 투명한 운영을, 라이더에게는 빠른 수익 창출을. <br className="hidden md:block" />
                            라이디 페이아웃으로 정산의 모든 과정을 자동화하고 효율을 높이세요.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col sm:flex-row gap-4 mt-8"
                        >
                            <a href="https://docs.ridy.co.kr" target="_blank" rel="noopener noreferrer" className="btn-halo btn-halo-primary !px-10 !py-5 !text-lg !font-bold">
                                메뉴얼 확인하기
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </a>
                            <Link to="/rental/inquiry" className="btn-halo btn-halo-outline !px-10 !py-5 !text-lg !font-bold !text-white border-white/20 hover:bg-white/5 backdrop-blur-sm">
                                도입 문의하기
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Admin Section */}
            <section className="bg-white py-32 overflow-hidden">
                <div className="container">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="flex-1">
                            <SectionHeader
                                align="left"
                                badge="PAYOUT Admin"
                                title={<>익일 출금 & <br />정산 현황 관리</>}
                                description="라이더의 익일 출금 요청부터 정산 현황 관리까지, 관리자 페이지에서 한 번에 처리할 수 있습니다."
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FeatureCard
                                    icon={UploadCloud}
                                    title="자동 정산 계산"
                                    description="정산 파일을 업로드하면 시스템이 자동으로 금액을 계산합니다."
                                    benefits={["정산 파일 업로드 자동화", "오류 없는 정확한 계산"]}
                                    color="#4A61ED"
                                    index={0}
                                />
                                <FeatureCard
                                    icon={BarChart3}
                                    title="프로모션 자동 반영"
                                    description="지사별 프로모션 설정 시 정산 내역에 즉시 반영됩니다."
                                    benefits={["맞춤형 프로모션 설정", "실시간 정산 내역 업데이트"]}
                                    color="#10B981"
                                    index={1}
                                />
                            </div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="flex-1 relative"
                        >
                            <div className="aspect-square bg-slate-50 rounded-[40px] flex items-center justify-center p-12 border border-slate-100 shadow-2xl overflow-hidden group">
                                <LayoutDashboard className="w-full h-full text-primary/10 group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-50 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-10 h-10 rounded-full bg-primary/10" />
                                            <div className="space-y-2">
                                                <div className="w-32 h-2 bg-slate-100 rounded-full" />
                                                <div className="w-20 h-2 bg-slate-50 rounded-full" />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="w-full h-4 bg-slate-50 rounded-lg" />
                                            <div className="w-full h-4 bg-slate-50 rounded-lg" />
                                            <div className="w-2/3 h-4 bg-primary/10 rounded-lg" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Rider Section */}
            <section className="bg-slate-50 py-32">
                <div className="container">
                    <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
                        <div className="flex-1">
                            <SectionHeader
                                align="left"
                                badge="PAYOUT Rider"
                                title={<>내 정산 내역이 <br />한눈에 쏙</>}
                                description="관리자와 연락하지 않아도 앱을 통해 간편하게 익일 출금을 신청하고 내역을 확인할 수 있습니다."
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FeatureCard
                                    icon={Zap}
                                    title="간편 익일 출금"
                                    description="터치 한 번으로 익일 출금 신청이 가능하며 자동 반복 기능을 지원합니다."
                                    benefits={["24시간 신청 가능", "자동 반복 입금 설정"]}
                                    color="#F59E0B"
                                    index={2}
                                />
                                <FeatureCard
                                    icon={FileText}
                                    title="투명한 정산 확인"
                                    description="실시간으로 나의 수익 현황과 상세 내역을 확인할 수 있습니다."
                                    benefits={["상세 정산 리포트", "부가세 자동 관리"]}
                                    color="#8B5CF6"
                                    index={3}
                                />
                            </div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1"
                        >
                            <div className="relative mx-auto w-[280px] h-[580px] bg-slate-900 rounded-[50px] border-[8px] border-slate-800 shadow-2xl p-4 overflow-hidden">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl" />
                                <div className="mt-12 space-y-6">
                                    <div className="bg-primary/10 rounded-2xl p-4 border border-primary/20">
                                        <p className="text-[10px] font-black text-primary uppercase mb-1">Available Balance</p>
                                        <p className="text-2xl font-black text-slate-800">₩ 1,240,000</p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border border-slate-50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-green-50 text-green-500 rounded-lg flex items-center justify-center"><Zap size={16} /></div>
                                                <div className="text-[12px] font-bold">익일 출금 신청</div>
                                            </div>
                                            <span className="text-[10px] text-slate-400">오후 2:30</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border border-slate-50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center"><FileText size={16} /></div>
                                                <div className="text-[12px] font-bold">정산 리포트</div>
                                            </div>
                                            <span className="text-[10px] text-slate-400">어제</span>
                                        </div>
                                    </div>
                                    <button className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-primary/20">익일 출금 신청하기</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Key Features List */}
            <section className="bg-white py-32">
                <div className="container">
                    <SectionHeader
                        badge="Key Features"
                        title="정산관리 필수 기능"
                        description="라이디 페이아웃이 제공하는 차별화된 관리 도구를 만나보세요."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: ShieldCheck, title: "안전한 데이터 관리", desc: "모든 정산 정보는 암호화되어 안전하게 관리됩니다." },
                            { icon: Clock, title: "실시간 히스토리", desc: "과거 모든 정산 이력을 언제든 조회가 가능합니다." },
                            { icon: Smartphone, title: "멀티 플랫폼 지원", desc: "웹과 앱 어디서든 동일한 환경을 제공합니다." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-3xl border border-slate-100 hover:border-primary/20 transition-all flex flex-col gap-4 text-center items-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-primary mb-2">
                                    <item.icon size={32} />
                                </div>
                                <h4 className="text-xl font-black text-foreground">{item.title}</h4>
                                <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-primary/5 py-32">
                <div className="container">
                    <div className="bg-white rounded-[60px] p-8 md:p-24 shadow-2xl shadow-primary/5 text-center flex flex-col items-center gap-10">
                        <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-4 rotate-3">
                            <Wallet size={48} />
                        </div>
                        <h2 className="text-h2">똑똑한 정산의 시작, <br className="md:hidden" /> 라이디 페이아웃</h2>
                        <p className="text-p max-w-2xl font-bold opacity-80">
                            이미 많은 지사와 라이더들이 페이아웃을 통해 <br className="hidden md:block" />
                            복잡한 정산 업무에서 해방되었습니다. 지금 바로 시작하세요.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                            <Link to="/rental/inquiry" className="btn-halo btn-halo-primary !px-16 !py-6 !text-xl !font-black">
                                도입 상담 신청
                            </Link>
                            <a href="https://docs.ridy.co.kr" target="_blank" rel="noopener noreferrer" className="btn-halo btn-halo-outline !px-16 !py-6 !text-xl !font-black !bg-white">
                                서비스 둘러보기
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Payout;

