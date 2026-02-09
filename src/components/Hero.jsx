import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative pt-[60px] pb-[80px] md:pt-[100px] md:pb-[140px] overflow-hidden bg-white">
            {/* Background decorations - High quality rider image placeholder feeling */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary to-transparent" />
            </div>

            <div className="container relative z-10">
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="badge-halo mb-8"
                    >
                        배달라이더와 운영자를 위한 올인원 플랫폼
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="text-h1 mb-8 text-foreground"
                    >
                        당신의 첫 라이딩을 <br />
                        <span className="text-primary italic">책임지는 곳, 라이디(Ridy)</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-p mb-12 max-w-3xl leading-relaxed mx-auto"
                    >
                        국내 최장 업력과 전국 최대 네트워크로 라이더님의 앞길을 책임집니다. <br className="hidden md:block" />
                        합리적인 렌탈부터 실시간 정산까지, 라이디가 라이더의 성공을 함께합니다.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col md:flex-row gap-4 w-full md:w-auto px-6 md:px-0"
                    >
                        <button className="btn-halo btn-halo-primary !px-12 !py-6 !text-xl !font-bold shadow-xl">
                            렌탈 문의하기
                            <ArrowRight className="ml-2 w-6 h-6" />
                        </button>
                        <button className="btn-halo btn-halo-outline !px-12 !py-6 !text-xl !font-bold bg-white flex items-center">
                            <MessageCircle className="mr-2 w-6 h-6 text-[#FAE100]" fill="#FAE100" />
                            카톡 상담하기
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
