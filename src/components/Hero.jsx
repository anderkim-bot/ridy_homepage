import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap, ShieldCheck, Globe, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

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
        <section className="relative min-h-[95vh] flex flex-col items-center justify-center text-center bg-[#0F172A] overflow-hidden py-24 md:py-32">
            {/* Premium Background Layer */}
            <div className="absolute inset-0 z-0">


                {/* Dynamic Gradient Orbs */}
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/10 blur-[180px] rounded-full" />

                {/* Animated Grid */}
                <div className="absolute inset-0 opacity-[0.1]"
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
                    <motion.div variants={itemVariants} className="inline-flex items-center px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-10 shadow-xl shadow-black/20">
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-3 animate-ping" />
                        <span className="text-[12px] md:text-[13px] font-bold text-white tracking-[0.2em] uppercase">
                            The New Standard for Riders
                        </span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-[40px] md:text-[64px] lg:text-[76px] font-extrabold leading-[1.1] tracking-tight text-white mb-8"
                    >
                        <span className="text-primary">라이디(RIDY),</span> 라이더의 가치를<br />
                        <span className="bg-linear-to-r from-primary to-indigo-400 bg-clip-text text-transparent">증명하는 최고의 선택</span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        variants={itemVariants}
                        className="text-[16px] md:text-[19px] font-medium leading-relaxed text-white/50 max-w-3xl mx-auto mb-14"
                    >
                        단순한 렌탈을 넘어, 전국 최대 네트워크와 <br className="hidden md:block" />
                        투명한 데이터 정산으로 라이더의 수익과 성장을 책임집니다.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 mb-24">
                        <Link to="/brand/intro" className="h-[64px] px-12 bg-white text-[#0F172A] rounded-xl font-bold text-lg transition-all hover:bg-slate-100 hover:scale-[1.05] active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)] flex items-center justify-center group overflow-hidden relative">
                            <span className="relative z-10">서비스 시작하기</span>
                            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform relative z-10" />
                        </Link>
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
        </section>
    );
};
export default Hero;
