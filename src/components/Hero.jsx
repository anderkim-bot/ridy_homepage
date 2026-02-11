import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center bg-primary overflow-hidden py-24 md:py-32">
            {/* Background elements for depth */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#3242B5]/40 blur-[100px] rounded-full" />

                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="container relative z-10 px-6">
                <div className="flex flex-col items-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8"
                    >
                        <span className="text-[12px] md:text-[13px] font-bold text-white tracking-widest uppercase">
                            Premium Rider Solution
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[40px] md:text-[64px] font-extrabold leading-[1.2] md:leading-[1.15] tracking-[-0.04em] text-white mb-8"
                    >
                        당신의 모든 순간을 <br />
                        <span className="text-white opacity-90">책임지는 파트너, 라이디</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[18px] md:text-[20px] font-medium leading-[1.6] text-white/80 max-w-3xl mx-auto mb-12"
                    >
                        전국 최대 네트워크로 라이더님의 앞길을 책임집니다. <br className="hidden md:block" />
                        합리적인 렌탈부터 정산까지, 성공을 위한 가장 신뢰할 수 있는 선택.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col sm:flex-row gap-5"
                    >
                        <Link to="/product/honda" className="h-[64px] px-12 bg-white text-primary rounded-full font-black text-lg transition-all hover:bg-slate-50 hover:scale-[1.02] active:scale-95 shadow-2xl shadow-black/10 flex items-center justify-center group">
                            렌탈 기종 보기
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
