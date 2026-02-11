import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
    ArrowRight,
    MessageCircle,
    Target,
    ZapOff,
    Coins,
    RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PayoutLogo from '../../components/svg/Ridy_Payout_logo.svg';

const FeatureCard = ({ icon: Icon, title, description, benefits, color, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white/80 backdrop-blur-xl rounded-[32px] p-8 md:p-10 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden h-full"
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

const Payout = () => {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0.8]);

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Premium Hero Section */}
            <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 bg-[#0A0F1D] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[180px] rounded-full animate-pulse" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[150px] rounded-full" />

                    {/* Animated Grid Lines */}
                    <div className="absolute inset-0 opacity-[0.05]"
                        style={{
                            backgroundImage: `linear-gradient(to right, #ffffff1a 1px, transparent 1px), linear-gradient(to bottom, #ffffff1a 1px, transparent 1px)`,
                            backgroundSize: '100px 100px'
                        }}
                    />
                </div>

                <div className="container relative z-10 px-6">
                    <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-10"
                        >
                            <img src={PayoutLogo} alt="RIDY Payout Logo" className="h-10 md:h-14 w-auto brightness-0 invert" />
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[42px] md:text-[84px] font-black text-white leading-[1.05] tracking-tight mb-10"
                        >
                            복잡한 정산 관리, <br />
                            <span className="bg-linear-to-r from-primary to-indigo-400 bg-clip-text text-transparent">
                                라이디 페이아웃
                            </span>이 도와드리겠습니다.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[18px] md:text-[24px] font-bold text-white/50 max-w-3xl leading-relaxed mb-16"
                        >
                            관리자도 라이더도 편리한 정산 계산 서비스. <br className="hidden md:block" />
                            이제 정산의 스트레스에서 벗어나 비즈니스 성장에만 집중하세요.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-6 mb-20"
                        >
                            <Link to="/service/info" className="h-[76px] px-14 bg-primary text-white rounded-2xl font-black text-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/30 group">
                                서비스 상세 소개 보러 가기
                                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>

                        {/* Hero Visual Mockup */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="w-full max-w-6xl mx-auto relative group"
                        >
                            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="relative bg-slate-900/50 backdrop-blur-2xl rounded-[40px] border border-white/10 p-4 md:p-8 shadow-3xl overflow-hidden aspect-21/9 flex items-center justify-center">
                                {/* Abstract Dashboard Element */}
                                <div className="grid grid-cols-12 gap-6 w-full h-full opacity-60">
                                    <div className="col-span-3 h-full bg-white/5 rounded-2xl" />
                                    <div className="col-span-9 flex flex-col gap-6">
                                        <div className="h-1/3 w-full bg-white/5 rounded-2xl p-6 flex items-center justify-between">
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 bg-primary/20 rounded-xl" />
                                                <div className="space-y-2">
                                                    <div className="w-24 h-2.5 bg-white/10 rounded-full" />
                                                    <div className="w-16 h-2 bg-white/5 rounded-full" />
                                                </div>
                                            </div>
                                            <div className="w-32 h-8 bg-white/5 rounded-lg" />
                                        </div>
                                        <div className="flex-1 w-full bg-white/5 rounded-2xl" />
                                    </div>
                                </div>
                                {/* Center Float Highlight */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-2xl shadow-2xl animate-bounce">
                                        자동 정산 완료
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Narrative Storytelling Section */}
            <section className="py-40 bg-white relative overflow-hidden">
                <div className="container px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-12">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-[32px] md:text-[52px] font-black text-slate-900 leading-[1.2] mb-8">
                                    배달은 빨라졌는데, <br />
                                    <span className="text-slate-300">정산은 왜 아직 그대로일까요?</span>
                                </h2>
                                <div className="w-20 h-2 bg-primary rounded-full mb-12" />
                            </motion.div>

                            <div className="space-y-8 text-[18px] md:text-[22px] font-bold text-slate-500 leading-relaxed">
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    배달 시장은 커졌지만, 정산 시스템은 그 속도를 따라가지 못했습니다.
                                    라이더에게는 <span className="text-slate-900 underline decoration-primary/30 underline-offset-8">'즉시 확인할 수 있는 투명한 정산 내역'</span>이 필요했고,
                                    관리자에게는 <span className="text-slate-900 underline decoration-primary/30 underline-offset-8">'반복되는 수기 업무의 자동화'</span>가 절실했습니다.
                                </motion.p>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 }}
                                >
                                    우리는 이 당연하게 여겨졌던 불편함에 물음표를 던졌습니다.
                                    땀 흘린 만큼 투명하게 확인할 수 있는 권리,
                                    복잡한 수기 관리에서 벗어나 성장에 집중할 수 있는 자유.
                                </motion.p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 relative">
                            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="mt-12 bg-slate-900 p-8 rounded-[40px] shadow-2xl relative z-10"
                            >
                                <ZapOff className="text-primary mb-6" size={48} />
                                <h4 className="text-white text-xl font-black mb-2">Legacy</h4>
                                <p className="text-white/40 text-sm font-bold">복잡한 수기 정산, <br />지연되는 입금 주기</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: -40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="bg-primary p-8 rounded-[40px] shadow-2xl shadow-primary/20 relative z-10"
                            >
                                <RefreshCw className="text-white mb-6 animate-spin-slow" size={48} />
                                <h4 className="text-white text-xl font-black mb-2">RIDY Payout</h4>
                                <p className="text-white/80 text-sm font-bold">실시간 데이터 정산, <br />익일 출금 서비스</p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Solutions Section */}
            <section className="py-40 bg-slate-50">
                <div className="container px-6">
                    <div className="text-center max-w-4xl mx-auto mb-24">
                        <span className="text-primary font-black uppercase tracking-widest text-sm mb-4 block">Our Solutions</span>
                        <h2 className="text-[36px] md:text-[56px] font-black text-slate-900 leading-tight">
                            가장 투명하고 간편한 <br />
                            정산 관리 솔루션
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={UploadCloud}
                            title="정산 프로세스 자동화"
                            description="정산 파일을 업로드하는 것만으로 모든 계산이 완료됩니다. 휴먼 에러를 방지하고 관리 시간을 90% 이상 단축하세요."
                            benefits={["원클릭 정산 업로드", "실시간 정산 내역 생성", "오류 자동 검증 기능"]}
                            color="#4F46E5"
                            index={0}
                        />
                        <FeatureCard
                            icon={Coins}
                            title="자유로운 익일 출금"
                            description="라이더가 원할 때 언제든 익일 출금을 신청할 수 있습니다. 자금 흐름에 여유를 더하고 라이더 만족도를 높이세요."
                            benefits={["영업일 기준 익일 입금", "자동 반복 출금 설정", "투명한 수수료 관리"]}
                            color="#F59E0B"
                            index={1}
                        />
                        <FeatureCard
                            icon={BarChart3}
                            title="실시간 통계 및 분석"
                            description="지점별, 라이더별 실시간 정산 현황을 대시보드로 확인하세요. 데이터를 기반으로 지점 운영 전략을 수립할 수 있습니다."
                            benefits={["커스텀 프로모션 반영", "부가세 리포트 자동 생성", "기간별 정산 데이터 분석"]}
                            color="#10B981"
                            index={2}
                        />
                    </div>
                </div>
            </section>

            {/* Trust Standard Section */}
            <section className="py-32 bg-slate-900 relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-30" />
                <div className="container px-6 relative z-10 text-center">
                    <div className="max-w-4xl mx-auto">
                        <ShieldCheck className="mx-auto text-primary mb-10" size={64} />
                        <h2 className="text-white text-[32px] md:text-[42px] font-black mb-8 leading-tight">
                            서로에게 신뢰를 주는 <br />
                            <span className="text-primary">새로운 정산의 기준</span>을 제안합니다.
                        </h2>
                        <p className="text-white/40 text-[18px] md:text-[20px] font-bold max-w-2xl mx-auto">
                            땀 흘린 만큼 정당하게 보상받고, 관리자는 복잡한 수기 작업에서 벗어나 성장에만 집중할 수 있는 환경을 만듭니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-40 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 -skew-y-3" />
                <div className="container relative z-10 px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <Coins className="mx-auto text-slate-200 mb-8" size={80} />
                        <h2 className="text-slate-900 text-[36px] md:text-[60px] font-black mb-10 leading-[1.1]">
                            똑똑한 정산의 시작, <br />
                            지금 라이디 페이아웃을 만나보세요.
                        </h2>
                        <p className="text-slate-500 text-[18px] md:text-[22px] font-bold mb-16 max-w-2xl mx-auto leading-relaxed">
                            복잡한 계산은 시스템에 맡기고, 당신은 더 중요한 일에 집중하세요.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <Link to="/rental/inquiry" className="h-[76px] px-16 bg-primary text-white rounded-[24px] font-black text-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/20 group">
                                도입 상담 신청하기
                                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a href="http://pf.kakao.com/_xgxoxexen/chat" target="_blank" rel="noopener noreferrer" className="h-[76px] px-16 bg-[#FEE500] text-slate-900 rounded-[24px] font-black text-xl flex items-center justify-center hover:bg-[#FDD000] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-yellow-500/10">
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

export default Payout;
