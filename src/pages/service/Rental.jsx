import React, { useState, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { CheckCircle2, ChevronRight, Phone, MapPin, ShieldCheck, Wrench, Clock, Bike, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { caseService } from '../../services/caseService';

const RentalOption = ({ title, subtitle, description, items, color, href, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="card-ridy p-8! border border-[#E0E0E0] h-full flex flex-col"
    >
        <div className="mb-8">
            <span className="text-[12px] font-bold tracking-widest uppercase mb-4 block" style={{ color: color }}>
                {subtitle}
            </span>
            <h3 className="text-sub-title">{title}</h3>
        </div>

        <p className="text-body mb-8">
            {description}
        </p>

        <ul className="flex flex-col gap-4 mb-12">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-primary mt-1 shrink-0" />
                    <span className="text-[15px] font-bold text-text-secondary">{item}</span>
                </li>
            ))}
        </ul>

        <Link to={href} className="mt-auto btn-ridy btn-ridy-primary w-full! flex items-center gap-2 group h-[48px]! rounded-[10px]!">
            {title} 보기
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
    </motion.div>
);

const CaseCard = ({ region, image, link, description }) => (
    <div className="flex-shrink-0 w-[300px] md:w-[400px] bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 mx-4">
        <div className="aspect-video relative overflow-hidden">
            {image ? (
                <img src={image} alt={region} className="w-full h-full object-cover" />
            ) : (
                <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-300">
                    <Bike size={48} />
                </div>
            )}
            <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-slate-900 shadow-sm uppercase tracking-widest">
                    {region}
                </span>
            </div>
        </div>
        <div className="p-6 flex flex-col gap-4">
            <p className="text-[14px] md:text-[15px] font-bold text-slate-600 line-clamp-2 leading-relaxed h-[44px]">
                {description}
            </p>
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-[13px] font-black text-primary hover:gap-2 transition-all mt-2"
            >
                카페 리포트 확인 <ExternalLink size={14} className="ml-1" />
            </a>
        </div>
    </div>
);

const Rental = () => {
    const [cases, setCases] = useState([]);
    const controls = useAnimationControls();

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const data = await caseService.getAllCases();
                setCases(data);
            } catch (err) {
                console.error('Error fetching cases:', err);
            }
        };
        fetchCases();
    }, []);

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

    // Double the list for seamless loop
    const loopedCases = [...cases, ...cases, ...cases];

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="bg-primary w-full min-h-[60vh] md:min-h-[80vh] flex flex-col items-center justify-center text-center color-white py-[80px] px-[20px]">
                <div className="container relative z-20 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-8"
                    >
                        <div className="text-white text-[24px] font-extrabold tracking-widest border-2 border-white px-6 py-2 rounded-sm inline-block">
                            RIDY RENTAL
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[36px] md:text-[48px] font-extrabold text-white leading-[1.6] tracking-[-0.04em] mb-6"
                    >
                        배달 시작, 바이크는 <br />
                        RIDY Rental에서 챙기면 끝!
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[16px] md:text-[18px] text-white/70 font-normal leading-[1.6] max-w-2xl mb-12"
                    >
                        바이크 렌탈, 시작부터 관리까지 한 곳에서. <br className="hidden md:block" />
                        라이디가 제공하는 합리적인 솔루션으로 지금 바로 배달을 시작하세요.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link to="/product/honda" className="btn-ridy btn-ridy-outline border-white! text-white! rounded-pill! h-[42px]! hover:bg-white! hover:text-primary!">
                            렌탈 기종 보기
                        </Link>
                        <Link to="/rental/inquiry" className="btn-ridy btn-ridy-outline border-white! text-white! rounded-pill! h-[42px]! hover:bg-white! hover:text-primary!">
                            렌탈 신청하기
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Feature Icons Section */}
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

            {/* Content Section: Rental Options */}
            <section className="bg-slate-50 py-32">
                <div className="container">
                    <div className="text-center mb-20">
                        <h2 className="text-h2 text-foreground mb-6 font-black!">나에게 맞는 렌탈 플랜</h2>
                        <p className="text-p max-w-2xl mx-auto font-bold opacity-80">배달 입문부터 베테랑 라이더까지, 상황에 맞는 <br className="hidden md:block" /> 최적의 렌탈 및 리스 플랜을 선택하세요.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {rentalOptions.map((option, index) => (
                            <RentalOption key={index} {...option} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Continuous Scrolling Cases Section */}
            <section className="bg-white py-32 overflow-hidden">
                <div className="container mb-20">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-8">
                        <div>
                            <span className="text-primary font-black uppercase tracking-widest text-[12px] mb-3 block">Real Cases</span>
                            <h2 className="text-h2 text-slate-900 font-black!">최신 출고 사례</h2>
                            <p className="text-slate-500 font-bold mt-4">매일 전국 곳곳의 라이더분들이 라이디와 함께 새로운 시작을 하고 있습니다.</p>
                        </div>
                    </div>
                </div>

                <div className="relative flex whitespace-nowrap">
                    {cases.length > 0 ? (
                        <motion.div
                            className="flex"
                            animate={{
                                x: [0, -1 * (cases.length * (400 + 32))] // 400 width + 32 margin (mx-4 = 16+16=32)
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: cases.length * 10,
                                    ease: "linear",
                                },
                            }}
                        >
                            {loopedCases.map((item, index) => (
                                <CaseCard key={index} {...item} />
                            ))}
                        </motion.div>
                    ) : (
                        <div className="w-full text-center py-20 text-slate-300 font-bold">출고 사례를 불러오고 있습니다...</div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-slate-900 py-32 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 skew-x-12 translate-x-1/2" />
                <div className="container relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                    <div>
                        <h2 className="text-[32px] md:text-[40px] font-black text-white leading-tight mb-4">
                            고민하는 사이에도 <br />
                            <span className="text-primary">누군가는 달리고 있습니다.</span>
                        </h2>
                        <p className="text-slate-400 font-bold text-lg">지금 바로 전문가와 상담하고 라이더의 길을 시작하세요.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <Link to="/rental/inquiry" className="h-14 md:h-20 px-10 md:px-14 bg-white text-slate-900 rounded-2xl font-black text-lg flex items-center justify-center hover:bg-slate-50 transition-all shadow-xl shadow-white/5 active:scale-95">
                            리스 문의하기
                        </Link>
                        <Link to="/rental/inquiry" className="h-14 md:h-20 px-10 md:px-14 bg-primary text-white rounded-2xl font-black text-lg flex items-center justify-center hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 active:scale-95">
                            렌탈 문의하기
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Rental;


