import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative pt-[80px] pb-[100px] md:pt-[120px] md:pb-[160px] overflow-hidden bg-bg-white">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
                <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-primary to-transparent" />

            </div>

            <div className="container relative z-10">
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[14px] font-bold text-primary tracking-widest uppercase mb-6"
                    >
                        배달 라이더를 위한 솔루션
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="text-hero mb-8"
                    >
                        당신의 첫 라이딩을 <br />
                        <span className="text-primary">책임지는 곳, 라이디(Ridy)</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-body mb-12 max-w-2xl mx-auto"
                    >
                        국내 최장 업력과 전국 최대 네트워크로 라이더님의 앞길을 책임집니다. <br className="hidden md:block" />
                        합리적인 렌탈부터 실시간 정산까지, 라이디가 라이더의 성공을 함께합니다.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col md:flex-row gap-4"
                    >
                        <button className="btn-ridy btn-ridy-primary h-[56px]! px-[40px]! text-[16px]! rounded-[34px]!">
                            렌탈 기종 보기
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                        <button className="btn-ridy btn-ridy-outline h-[56px]! px-[40px]! text-[16px]! rounded-[34px]!">
                            렌탈 신청하기
                        </button>

                    </motion.div>
                </div>
            </div>
        </section>
    );
};


export default Hero;
