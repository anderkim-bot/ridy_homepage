import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap, ShieldCheck, Globe, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

import heroImage from '../components/img/ridy_main_home_hero.jpg';

const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacityTransform = useTransform(scrollY, [0, 300], [1, 0]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section className="relative min-h-[80vh] md:min-h-[95vh] flex flex-col items-center justify-center text-center bg-[#0F172A] overflow-hidden py-16 md:py-32">
            {/* Premium Background Layer */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Base Image Layer with Parallax */}
                <motion.div
                    style={{ y: y1 }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={heroImage}
                        alt="Ridy Hero"
                        className="w-full h-full object-cover opacity-40"
                    />
                    {/* Dark Overlay for Text Visibility */}
                    <div className="absolute inset-0 bg-linear-to-b from-[#0F172A]/80 via-[#0F172A]/60 to-[#0F172A]" />
                </motion.div>
                {/* Dynamic Gradient Orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2],
                        x: [0, 50, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/30 blur-[150px] rounded-full"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.1, 0.2, 0.1],
                        x: [0, -40, 0],
                        y: [0, 60, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/20 blur-[180px] rounded-full"
                />

                {/* Animated Floating Shapes */}
                <div className="absolute inset-0 h-full w-full">
                    <motion.div
                        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute top-[20%] left-[15%] w-12 h-12 border border-white/10 rounded-xl"
                    />
                    <motion.div
                        animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
                        transition={{ duration: 7, repeat: Infinity }}
                        className="absolute bottom-[20%] right-[15%] w-16 h-16 border border-white/10 rounded-full"
                    />
                    <motion.div
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute top-[40%] right-[25%] w-1 h-24 bg-gradient-to-b from-primary/0 via-primary/40 to-primary/0"
                    />
                </div>

                {/* Animated Grid */}
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: `linear-gradient(to right, #ffffff1a 1px, transparent 1px), linear-gradient(to bottom, #ffffff1a 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            <div className="container relative z-10 px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center max-w-5xl mx-auto"
                >
                    {/* Badge */}
                    <motion.div variants={itemVariants} className="inline-flex items-center px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-10 shadow-xl shadow-black/20 scale-[0.6] origin-center">
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-3 animate-ping" />
                        <span className="text-[12px] md:text-[13px] font-bold text-white tracking-[0.2em] uppercase">
                            The New Standard for Riders
                        </span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-hero text-white mb-8"
                    >
                        <span className="text-primary">라이디(RIDY),</span> <br />
                        라이더의 가치를 <br />
                        <span className="bg-linear-to-r from-primary to-indigo-400 bg-clip-text text-transparent">증명하는 최고의 선택</span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        variants={itemVariants}
                        className="text-[15px] md:text-[18px] font-medium leading-relaxed text-white/50 max-w-3xl mx-auto mb-14 px-4"
                    >
                        단순한 렌탈을 넘어, 전국 최대 네트워크와 <br className="hidden md:block" />
                        투명한 데이터 정산으로 라이더의 수익과 성장을 책임집니다.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 mb-24">
                        <button
                            onClick={() => document.getElementById('service-dashboard')?.scrollIntoView({ behavior: 'smooth' })}
                            className="h-[56px] px-10 bg-white text-[#0F172A] rounded-xl font-bold text-base transition-all hover:bg-slate-100 hover:scale-[1.05] active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)] flex items-center justify-center group overflow-hidden relative whitespace-nowrap cursor-pointer"
                        >
                            <span className="relative z-10">서비스 시작하기</span>
                            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform relative z-10" />
                        </button>
                    </motion.div>


                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 text-white/30"
            >
                <p className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll Down</p>
                <div className="w-px h-12 bg-linear-to-b from-white/30 to-transparent" />
            </motion.div>

            {/* AI Disclaimer */}
            <div className="absolute bottom-4 right-6 z-10">
                <p className="text-[10px] text-white/20 font-medium">본 이미지는 AI로 생성된 이미지입니다.</p>
            </div>
        </section>
    );
};
export default Hero;
