import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, MessageCircle, ArrowRight, Bike, ShieldCheck, Wrench, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const RentalOption = ({ title, subtitle, description, items, color, href, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="card-halo bg-white h-full flex flex-col"
    >
        <div className="mb-8">
            <span className="badge-halo mb-4" style={{ backgroundColor: `${color}15`, color: color }}>
                {subtitle}
            </span>
            <h3 className="text-3xl font-black text-foreground">{title}</h3>
        </div>
        
        <p className="text-slate-500 font-medium mb-8">
            {description}
        </p>

        <ul className="flex flex-col gap-4 mb-12">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-primary mt-1 shrink-0" />
                    <span className="text-slate-700 font-bold">{item}</span>
                </li>
            ))}
        </ul>

        <Link to={href} className="mt-auto btn-halo btn-halo-primary !w-full flex items-center gap-2 group">
            {title} 보기
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
    </motion.div>
);

const CaseCard = ({ region, model, detail, blogUrl, index }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
        className="card-halo !p-6 bg-white flex flex-col gap-4 group"
    >
        <div className="flex flex-col gap-1">
            <span className="text-[12px] font-black text-primary uppercase tracking-wider">{region}</span>
            <h4 className="text-xl font-black text-foreground line-clamp-1">{model}</h4>
            <p className="text-sm text-slate-400 font-medium">{detail}</p>
        </div>
        <a 
            href={blogUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-sm font-black text-slate-400 group-hover:text-primary transition-colors mt-4"
        >
            상세보기
            <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </a>
    </motion.div>
);

const Rental = () => {
    const rentalOptions = [
        {
            title: "반납형 중고 렌탈",
            subtitle: "배달 입문자를 위한 실속형",
            description: "30일부터 자유롭게 이용하고 반납하세요. 정비와 보험이 모두 포함되어 있어 부담이 없습니다.",
            items: [
                "최소 이용 기간 30일",
                "만 21세 이상 누구나 가능",
                "소모품 무상 교체 지원",
                "즉시 출고 가능 기종 다수 보유"
            ],
            color: "#4A61ED",
            href: "/product/honda"
        },
        {
            title: "인수형 신차리스",
            subtitle: "전문 라이더를 위한 프리미엄",
            description: "원하는 신차를 리스로 이용하고 계약 종료 후 내 차로 만드세요. 합리적인 월 리스료가 강점입니다.",
            items: [
                "취등록세/보험료 포함 가능",
                "계약 종료 후 소유권 이전",
                "신차 무상 보증 서비스",
                "개인별 맞춤 견적 설계"
            ],
            color: "#F59E0B",
            href: "/product/honda"
        }
    ];

    const cases = [
        { region: "남양주", model: "PCX125", detail: "펄 블랙 색상 출고", blogUrl: "https://blog.naver.com/ridyservice/224161171227" },
        { region: "수원", model: "PCX125", detail: "펄화이트 색상 출고", blogUrl: "https://blog.naver.com/ridyservice/224159958667" },
        { region: "서울", model: "X-ADV750", detail: "머드그레이 색상 출고", blogUrl: "https://blog.naver.com/ridyservice/224154619831" },
        { region: "영등포", model: "PCX125", detail: "맷블랙 색상 출고", blogUrl: "https://blog.naver.com/ridyservice/224153576249" },
        { region: "경기도", model: "FORZA350", detail: "펄블랙 색상 출고", blogUrl: "https://blog.naver.com/ridyservice/224148584115" },
        { region: "부산", model: "NMAX125", detail: "아이콘 블랙 색상 출고", blogUrl: "https://blog.naver.com/ridyservice/224147576450" },
        { region: "강북", model: "PCX125", detail: "블랙 색상 출고", blogUrl: "https://blog.naver.com/ridyservice/224145999610" },
        { region: "천안", model: "TMAX560", detail: "세라믹 그레이 색상 출고", blogUrl: "https://blog.naver.com/ridyservice/224144826439" }
    ];

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative pt-[60px] pb-[100px] md:pt-[120px] md:pb-[180px] bg-slate-900 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent z-10" />
                    <img 
                        src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=2000" 
                        alt="Rider" 
                        className="w-full h-full object-cover opacity-40"
                    />
                </div>
                
                <div className="container relative z-20">
                    <div className="max-w-3xl flex flex-col gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md px-4 py-2 rounded-pill w-fit"
                        >
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-primary text-sm font-black uppercase tracking-widest">RIDY Rental Service</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="text-h1 text-white"
                        >
                            배달 시작, 바이크는 <br />
                            <span className="text-primary italic">RIDY Rental</span>에서 <br />
                            챙기면 끝!
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-xl text-slate-300 font-medium leading-relaxed max-w-2xl"
                        >
                            바이크 렌탈, 시작부터 관리까지 한 곳에서. <br className="hidden md:block" />
                            라이디가 제공하는 합리적인 솔루션으로 지금 바로 배달을 시작하세요.
                        </motion.p>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col sm:flex-row gap-4 mt-8"
                        >
                            <Link to="/rental/inquiry" className="btn-halo btn-halo-primary !px-10 !py-5 !text-lg !font-bold">
                                렌탈 신청하기
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            <a href="https://pf.kakao.com/_Ridy" target="_blank" rel="noopener noreferrer" className="btn-halo btn-halo-outline !px-10 !py-5 !text-lg !font-bold bg-white/10 hover:bg-white/20 border-white/20 !text-white backdrop-blur-sm">
                                <MessageCircle className="mr-2 w-5 h-5 text-[#FAE100]" fill="#FAE100" />
                                카톡 실시간 상담
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Service Features */}
            <section className="bg-white py-24">
                <div className="container">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                        {[
                            { icon: ShieldCheck, title: "종합보험 가입", desc: "사고 시 부담 없는 렌탈 전용 보험" },
                            { icon: Wrench, title: "토탈 메인터넌스", desc: "소모품 교체 및 고장 완벽 대응" },
                            { icon: Clock, title: "30일 단위 갱신", desc: "부담 없는 한 달 단위 이용 가능" },
                            { icon: Bike, title: "다양한 신차 보유", desc: "혼다, 야마하 등 최신 기종 보유" }
                        ].map((feature, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col gap-4"
                            >
                                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-primary">
                                    <feature.icon size={28} />
                                </div>
                                <h4 className="text-lg font-black text-foreground">{feature.title}</h4>
                                <p className="text-slate-500 font-medium text-sm leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Rental Options */}
            <section className="bg-slate-50 py-32">
                <div className="container">
                    <div className="text-center mb-20">
                        <h2 className="text-h2 text-foreground mb-6">나에게 맞는 렌탈 플랜</h2>
                        <p className="text-p max-w-2xl mx-auto font-bold opacity-80">배달 입문부터 베테랑 라이더까지, 상황에 맞는 <br className="hidden md:block" /> 최적의 렌탈 및 리스 플랜을 선택하세요.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {rentalOptions.map((option, index) => (
                            <RentalOption key={index} {...option} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Delivery Cases */}
            <section className="bg-white py-32">
                <div className="container">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div className="flex flex-col gap-4">
                            <h2 className="text-h2 text-foreground">최신 출고 사례</h2>
                            <p className="text-p max-w-xl font-bold opacity-80">
                                매일 전국 곳곳의 라이더분들이 <br className="hidden md:block" /> 라이디와 함께 새로운 시작을 하고 있습니다.
                            </p>
                        </div>
                        <a href="https://blog.naver.com/ridyservice" target="_blank" rel="noopener noreferrer" className="btn-halo btn-halo-outline !px-8 !py-4 font-bold flex items-center group">
                            블로그에서 더보기
                            <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                        {cases.map((item, index) => (
                            <CaseCard key={index} {...item} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* App CTA */}
            <section className="bg-white pb-32">
                <div className="container">
                    <div className="bg-primary rounded-[40px] p-8 md:p-20 overflow-hidden relative">
                        <div className="relative z-10 max-w-2xl flex flex-col gap-8">
                            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                                고민하는 사이에도 <br /> 누군가는 달리고 있습니다.
                            </h2>
                            <p className="text-lg text-white/80 font-medium">
                                지금 라이디에서 오토바이를 렌탈하고 첫 배달 수익을 만들어보세요. <br className="hidden md:block" />
                                전문 상담사가 라이더님께 가장 유리한 조건을 찾아드립니다.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/rental/inquiry" className="btn-halo bg-white text-primary !px-10 !py-5 !text-lg !font-black hover:scale-[1.02] transition-transform">
                                    상담 신청하기
                                </Link>
                                <a href="tel:070-0000-0000" className="btn-halo bg-primary-dark text-white !px-10 !py-5 !text-lg !font-bold border border-white/10">
                                    전화 문의: 1544-0000
                                </a>
                            </div>
                        </div>
                        
                        {/* Abstract decoration */}
                        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-primary-dark/20 rounded-full blur-3xl" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Rental;

