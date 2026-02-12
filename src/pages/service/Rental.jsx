import React, { useState, useEffect } from 'react';
import { motion, useAnimationControls, AnimatePresence } from 'framer-motion';
import {
    CheckCircle2,
    ChevronRight,
    ChevronDown,
    ShieldCheck,
    Truck,
    HelpCircle,
    Lock,
    ArrowRight,
    Bike,
    Settings,
    FileText,
    Smartphone,
    CreditCard,
    UserCheck,
    MapPin,
    MessageCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { caseService } from '../../services/caseService';
import RentalLogo from '../../components/svg/Ridy_Rental_logo.svg';
import rentalHeroImage from '../../components/img/ridy_rental_hero.png';
import { useScroll, useTransform } from 'framer-motion';

const BenefitCard = ({ icon: Icon, title, content, subItems, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white p-6 md:p-8 rounded-[20px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
    >
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-5 md:mb-6 group-hover:scale-110 transition-transform">
            <Icon size={24} md:size={28} />
        </div>
        <h3 className="text-[22px] font-black text-slate-900 mb-4">{title}</h3>
        <p className="text-slate-500 font-bold text-[16px] leading-[1.6] mb-6 whitespace-pre-line">
            {content}
        </p>
        {subItems && (
            <div className="space-y-3 pt-6 border-t border-slate-50">
                {subItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                        <span className="text-[14px] font-bold text-slate-600 leading-tight">{item}</span>
                    </div>
                ))}
            </div>
        )}
    </motion.div>
);

const StepItem = ({ number, title, desc, icon: Icon, index }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="flex flex-col items-center text-center relative"
    >
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-lg flex items-center justify-center mb-4 md:mb-6 relative z-10">
            <Icon size={24} md:size={32} className="text-primary" />
            <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary text-white text-[10px] md:text-xs font-black flex items-center justify-center border-2 md:border-4 border-slate-50">
                {number}
            </div>
        </div>
        <h4 className="text-lg font-black text-slate-900 mb-2">{title}</h4>
        <p className="text-sm text-slate-500 font-bold">{desc}</p>

        {index < 4 && (
            <div className="hidden lg:block absolute top-10 left-[70%] w-full h-[2px] bg-slate-200 z-0" />
        )}
    </motion.div>
);

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-slate-100 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between text-left group"
            >
                <span className={`text-[17px] font-black transition-colors ${isOpen ? 'text-primary' : 'text-slate-800'}`}>
                    Q. {question}
                </span>
                <div className={`p-2 rounded-full bg-slate-50 group-hover:bg-primary/5 transition-all ${isOpen ? 'rotate-180 bg-primary/10 text-primary' : 'text-slate-400'}`}>
                    <ChevronDown size={20} />
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="pb-8 text-slate-500 font-bold text-[15px] leading-relaxed whitespace-pre-line pl-6 border-l-2 border-primary/20">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Rental = () => {
    const [cases, setCases] = useState([]);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);

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

    const benefits = [
        {
            icon: ShieldCheck,
            title: "맞춤형 다이렉트 보험",
            content: "고객님이 원하는 형태로 자유롭게 선택하는 스마트한 보험 시스템",
            subItems: [
                "종합보험: 대물 3천만원, 대인 무한",
                "책임보험: 대물 2천만원, 대인 1가입"
            ]
        },
        {
            icon: Truck,
            title: "전국 무료 탁송",
            content: "거리에 상관없이 전국 어디든 집 앞까지 무료로 안전하게 배송해 드립니다."
        },
        {
            icon: Bike,
            title: "무상 사고대차 서비스",
            content: "갑작스러운 사고에도 RIDY 서비스센터 입고 시 PCX125 기종으로 무상 대차를 지원합니다."
        },
        {
            icon: Lock,
            title: "숨은 비용 ZERO",
            content: "초기 면책금과 불필요한 인수대금이 전혀 없어 시작이 가볍습니다."
        },
        {
            icon: Settings,
            title: "완벽한 배달 세팅",
            content: "출고와 동시에 바로 현장 투입이 가능하도록 최적의 장비가 기본 장착됩니다.",
            subItems: [
                "배달통/탑박스 중 택 1 무료 장착",
                "스피드샵 1구 충전거치대 기본 장착",
                "옵션 추가 시 각종 저렴한 튜닝 지원"
            ]
        }
    ];

    const faqs = [
        {
            question: "보증금(인수대금)은 얼마인가요?",
            answer: "125cc 이하 차량은 30만원, 300cc 이상 400cc 미만 차량은 70만원, 400cc 이상 차량은 100만원입니다."
        },
        {
            question: "보증금은 돌려받을 수 있는 돈인가요?",
            answer: "반납형 렌탈의 경우 반납 시 바이크의 상태(외관 파손 및 소모품 차감 비용)를 정산 후 차액을 환급해 드리며, 인수형 리스는 계약 만기 시 전액 환급됩니다."
        },
        {
            question: "계약은 직접 방문을 해야 할까요?",
            answer: "아니요. 100% 비대면 계약이 가능합니다. 카카오톡이나 이메일을 통해 전자 계약서를 보내드리면 내용을 정독하신 후 간편하게 서명하실 수 있습니다."
        },
        {
            question: "계약 가능한 나이가 어떻게 되나요?",
            answer: "운전면허를 취득한 전연령(만 19세 이상)부터 가능합니다. 다만, 미성년자의 경우 부모님의 연대 보증 계약이 필수로 요구됩니다."
        },
        {
            question: "계약에 필요한 서류는 무엇인가요?",
            answer: "운전면허증 앞/뒷면 사진과 주민등록초본(과거 이력 포함)을 준비해 주시면 됩니다. 나머지 계약서와 인수증은 당사에서 가이드를 드립니다."
        },
        {
            question: "신용 점수가 낮은데 계약이 가능한가요?",
            answer: "네, 가능합니다. 당사는 별도의 신용 점수 조회를 하지 않습니다. 필수 서류 준비와 보증금/선납금 결제만 완료되면 즉시 출고가 가능합니다."
        },
        {
            question: "면허증은 어떤 타입이 필요한가요?",
            answer: "125cc 이하 기종은 2종 보통 면허(자동차 면허)만으로 가능하며, 125cc 초과 기종은 반드시 2종 소형 면허를 취득하셔야 합니다."
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <section className="bg-slate-900 pt-24 pb-16 md:pt-48 md:pb-36 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {/* Base Image Layer with Parallax */}
                    <motion.div
                        style={{ y: y1 }}
                        className="absolute inset-0 z-0"
                    >
                        <img
                            src={rentalHeroImage}
                            alt="Ridy Rental Hero"
                            className="w-full h-full object-cover opacity-40"
                        />
                        {/* Dark Overlay for Text Visibility */}
                        <div className="absolute inset-0 bg-linear-to-b from-[#0F172A]/80 via-[#0F172A]/60 to-[#0F172A]" />
                    </motion.div>

                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/10 blur-[180px] rounded-full" />

                    {/* Animated Speed Lines for Dynamics */}
                    <div className="absolute inset-0 opacity-[0.15]">
                        <motion.div
                            animate={{ x: [-500, 1500] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0 }}
                            className="absolute top-[20%] left-0 w-[400px] h-[1px] bg-linear-to-r from-transparent via-primary to-transparent"
                        />
                        <motion.div
                            animate={{ x: [-800, 1200] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
                            className="absolute top-[50%] left-0 w-[600px] h-[1px] bg-linear-to-r from-transparent via-indigo-400 to-transparent"
                        />
                        <motion.div
                            animate={{ x: [-600, 1400] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 2 }}
                            className="absolute top-[80%] left-0 w-[500px] h-[1px] bg-linear-to-r from-transparent via-primary to-transparent"
                        />
                    </div>
                </div>

                <div className="container relative z-10 px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto mb-20 px-4"
                    >
                        <div className="mb-10 flex justify-center">
                            <img
                                src={RentalLogo}
                                alt="RIDY RENTAL"
                                className="h-10 md:h-12 w-auto brightness-0 invert opacity-80"
                            />
                        </div>
                        <h1 className="text-hero text-white mb-8">
                            무심사·비대면 <br className="md:hidden" />
                            <span className="text-white/40">라이디 렌탈</span>
                        </h1>
                        <p className="text-white/50 text-[15px] md:text-[18px] font-medium leading-relaxed max-w-2xl mx-auto">
                            까다로운 심사 없이, <br className="hidden md:block" />
                            계약 다음 날 당신의 집 앞으로 배달됩니다.
                        </p>
                    </motion.div>

                    {/* Integrated Marquee in Hero - Full Width with reduced roundness */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative w-screen left-1/2 right-1/2 -ml-[50vw] +mr-[50vw]"
                    >
                        <div className="mb-6 flex items-center justify-center gap-4">
                            <div className="h-px w-12 bg-white/10" />
                            <span className="text-primary font-black uppercase text-[12px] tracking-widest">Real-time Delivery</span>
                            <div className="h-px w-12 bg-white/10" />
                        </div>

                        <div className="bg-white/5 backdrop-blur-xl py-6 border-y border-white/10 overflow-hidden">
                            <motion.div
                                className="flex whitespace-nowrap"
                                animate={{ x: [0, -2000] }}
                                transition={{
                                    x: { repeat: Infinity, repeatType: "loop", duration: 40, ease: "linear" }
                                }}
                            >
                                {[...cases, ...cases, ...cases].map((item, idx) => (
                                    <div key={idx} className="inline-block mx-4 min-w-[300px] p-4 bg-white/5 rounded-lg border border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-10 bg-white/10 rounded-md overflow-hidden shrink-0">
                                                {item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}
                                            </div>
                                            <div className="text-left">
                                                <p className="text-[13px] font-black text-white line-clamp-1">{item.region} 출고 완료</p>
                                                <p className="text-[11px] text-white/40 font-bold">{item.description.substring(0, 20)}...</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* AI Disclaimer */}
                <div className="absolute bottom-4 right-6 z-10">
                    <p className="text-[10px] text-white/20 font-bold">본 이미지는 AI로 생성된 이미지입니다.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 md:py-32">
                <div className="container px-6">
                    <div className="text-center mb-12 md:mb-20">
                        <h2 className="text-[32px] md:text-[56px] font-black text-slate-900 mb-4 md:mb-6">라이디 렌탈만의 혜택</h2>
                        <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, idx) => (
                            <BenefitCard key={idx} {...benefit} index={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Contract Procedure */}
            <section className="py-16 md:py-32 bg-slate-900 text-white overflow-hidden">
                <div className="container px-6">
                    <div className="text-center mb-12 md:mb-20">
                        <span className="text-primary font-black tracking-widest text-[12px] md:text-sm uppercase block mb-3 md:mb-4">Process</span>
                        <h2 className="text-[32px] md:text-[52px] font-black leading-tight mb-6 md:mb-8">무심사 비대면 계약 절차</h2>
                        <p className="text-white/50 text-[15px] md:text-lg font-bold">100% 무심사로 진행되며, 계약 후 익일 즉시 출고됩니다.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8">
                        {[
                            { icon: Smartphone, title: "신청 문의", desc: "문의 및 서류 제출" },
                            { icon: UserCheck, title: "상담/확인", desc: "상담 및 일정 체크" },
                            { icon: CreditCard, title: "보증금 입금", desc: "미배정 차량 예약" },
                            { icon: FileText, title: "전자계약서", desc: "서명 및 계약 완료" },
                            { icon: MapPin, title: "차량 수령", desc: "집 앞 무료 탁송" }
                        ].map((step, idx) => (
                            <StepItem key={idx} number={idx + 1} {...step} index={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 md:py-32 bg-white">
                <div className="container max-w-4xl px-6">
                    <div className="flex items-center gap-5 md:gap-6 mb-12 md:mb-16">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary flex items-center justify-center text-white shrink-0">
                            <HelpCircle size={28} md:size={32} />
                        </div>
                        <div>
                            <h2 className="text-[28px] md:text-[42px] font-black text-slate-900">자주 묻는 질문</h2>
                            <p className="text-slate-400 text-sm md:text-base font-bold">렌탈 시작 전 궁금한 점을 확인하세요.</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {faqs.map((faq, idx) => (
                            <FAQItem key={idx} {...faq} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-16 md:py-32 relative overflow-hidden bg-slate-900">
                {/* Visual Interest Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full" />
                    <div className="absolute top-0 right-0 w-1/4 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />

                    {/* Abstract Speed Lines */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-1/4 left-0 w-full h-px bg-linear-to-r from-transparent via-primary to-transparent" />
                        <div className="absolute top-2/4 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/50 to-transparent translate-x-1/4" />
                        <div className="absolute top-3/4 left-0 w-full h-px bg-linear-to-r from-transparent via-primary to-transparent -translate-x-1/4" />
                    </div>
                </div>

                <div className="container relative z-10 px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-black text-xs tracking-widest uppercase mb-8">
                            Join the Network
                        </span>

                        <h2 className="text-white text-[36px] md:text-[56px] font-black leading-[1.1] tracking-tight mb-8">
                            고민하는 사이에도 <br />
                            <span className="text-primary italic">누군가는 달리고 있습니다.</span>
                        </h2>

                        <p className="text-white/50 text-[18px] md:text-[22px] font-bold mb-12 max-w-2xl mx-auto">
                            기다림 없는 빠른 시작, <br className="md:hidden" />
                            지금 바로 라이디와 함께 성공의 길로 달리세요.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <Link to="/rental/inquiry" className="h-[72px] px-12 bg-primary text-white rounded-xl font-black text-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/20 group">
                                렌탈 신청하기
                                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a href="http://pf.kakao.com/_xgxoxexen/chat" target="_blank" rel="noopener noreferrer" className="h-[72px] px-12 bg-[#FEE500] text-slate-900 rounded-xl font-black text-xl flex items-center justify-center hover:bg-[#FDD000] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-yellow-500/10">
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

export default Rental;


