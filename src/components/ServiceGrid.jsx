import React from 'react';
import { motion } from 'framer-motion';
import { Bike, Repeat, Wallet, Wrench, Info, ArrowRight, ShieldCheck } from 'lucide-react';

const Card = ({ icon: Icon, title, description, color, href, delay }) => (
    <motion.a
        href={href}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay * 0.1 }}
        whileHover={{ y: -8 }}
        className="glass-card p-6 md:p-8 flex flex-col items-start min-h-[260px] group"
    >
        <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 transition-all shadow-sm group-hover:scale-110 group-hover:shadow-lg" style={{ backgroundColor: `${color}15`, color: color }}>
            <Icon size={28} />
        </div>
        <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
            {description}
        </p>
        <div className="mt-auto flex items-center text-sm font-bold text-primary opacity-80 group-hover:opacity-100 transition-all">
            <span>자세히 보기</span>
            <ArrowRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
        </div>
    </motion.a>
);

const ServiceGrid = () => {
    const services = [
        {
            icon: Bike,
            title: "Ridy 렌탈",
            description: "합리적인 월 렌탈료로 라이더 전용 바이크를 만나보세요. 보험부터 등록까지 리디가 책임집니다.",
            color: "#00A3FF",
            href: "#rental"
        },
        {
            icon: Bike,
            title: "렌탈 기종 보기",
            description: "PCX, NMAX부터 전기 바이크까지. 다양한 라인업의 상세 스펙과 실시간 재고를 확인하세요.",
            color: "#0077BB",
            href: "#models"
        },
        {
            icon: Repeat,
            title: "리스 승계 보기",
            description: "부담 없는 리스 조건을 그대로 승계받거나, 내 리스 차량을 안전하게 넘겨보세요.",
            color: "#00E676",
            href: "#lease"
        },
        {
            icon: Wallet,
            title: "Ridy Payout",
            description: "번 돈을 기다리지 않고 즉시! 투명하고 정확한 실시간 정산 시스템으로 수익 관리를 시작하세요.",
            color: "#F59E0B",
            href: "#payout"
        },
        {
            icon: Wrench,
            title: "Ridy Service Center",
            description: "라이더의 안전이 최우선입니다. 전국 리디 정비망에서 신속하고 전문적인 케어를 받으세요.",
            color: "#EF4444",
            href: "#service"
        },
        {
            icon: Info,
            title: "Ridy 소개",
            description: "라이더와 함께 성장하는 파트너, 리디가 꿈꾸는 새로운 배달 생태계 이야기를 들려드립니다.",
            color: "#64748B",
            href: "#about"
        }
    ];

    return (
        <section className="py-16 md:py-24 bg-[#F1F5F9]/50">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-xl">
                        <div className="flex items-center space-x-2 text-primary font-bold text-sm mb-4">
                            <ShieldCheck size={18} />
                            <span>신뢰기반 라이더 솔루션</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">라이더가 필요로 하는 <br />모든 서비스를 한 곳에서</h2>
                    </div>
                    <p className="text-slate-500 font-medium md:text-right md:max-w-xs">
                        리디는 라이더의 생산성 향상을 위해 투명하고 공정한 서비스를 제공합니다.
                    </p>
                </div>

                <div className="grid-responsive">
                    {services.map((service, index) => (
                        <Card key={index} {...service} delay={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceGrid;
