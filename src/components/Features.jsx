import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Search, Lock } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className="glass p-8 hover:bg-white/[0.05] transition-all group border-white/5"
    >
        <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all">
            <Icon size={28} />
        </div>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-text-muted leading-relaxed">
            {description}
        </p>
    </motion.div>
);

const Features = () => {
    const features = [
        {
            icon: Users,
            title: "5인 체제 세트 시스템",
            description: "마음 맞는 라이더 5명이 모여 하나의 세트를 구성합니다. 복잡한 지사 구조 없이 자율적으로 운영되는 새로운 작업 단위입니다.",
            delay: 0.1
        },
        {
            icon: Search,
            title: "투명한 정산 내역",
            description: "배달비부터 관리비 분배까지, 모든 자금의 흐름을 투명하게 공개합니다. 중간 관리자 없이 번 돈 그대로의 가치를 확인하세요.",
            delay: 0.2
        },
        {
            icon: TrendingUp,
            title: "기여도 기반 보너스",
            description: "콜 수행량뿐만 아니라 세트 운영에 기여한 활동을 수치화하여 보상받습니다. 열심히 일한 만큼 더 가져가는 공정한 구조입니다.",
            delay: 0.3
        },
        {
            icon: Lock,
            title: "시스템 중심의 신뢰",
            description: "사람이 아닌 시스템이 정산 로직을 처리합니다. 오차 없는 자동 계산과 블록체인급 투명성이 라이디의 자부심입니다.",
            delay: 0.4
        }
    ];

    return (
        <section id="features" className="py-24 bg-black">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">라이더를 위한, <br />라이더에 의한 시스템</h2>
                    <p className="text-lg text-text-muted">
                        기존 배달 대행업의 불투명한 관행을 깨고, <br />
                        기술로 증명하는 새로운 수익 구조를 제안합니다.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
