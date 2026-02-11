import React from 'react';
import { Apple, Play } from 'lucide-react';

const AppCta = () => {
    return (
        <section className="py-32 md:py-48 bg-bg-dark relative overflow-hidden">
            {/* Ambient Background Light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[160px] rounded-full pointer-events-none" />

            <div className="container relative z-10">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    <div className="text-primary font-black text-[14px] tracking-[0.2em] uppercase mb-8">RIDY PAYOUT ECOSYSTEM</div>
                    <h2 className="text-[36px] md:text-[56px] font-black tracking-tight text-white mb-8 leading-tight">
                        대한민국 필수 라이더 정산 앱, <br className="hidden md:block" /> 라이디(Ridy)를 지금 만나보세요.
                    </h2>
                    <p className="text-[18px] md:text-[20px] font-medium text-white/60 mb-16 max-w-2xl">
                        렌탈료 자동 정산부터 실시간 수익금 출금까지. <br className="hidden md:block" />
                        전국 라이더들이 신뢰하는 올인원 플랫폼 라이디가 함께합니다.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-5 w-full sm:w-auto">
                        <button className="h-[64px] px-10 bg-white text-slate-900 rounded-2xl font-black text-lg transition-all hover:bg-slate-100 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
                            <Apple className="w-6 h-6" fill="currentColor" />
                            <span>App Store</span>
                        </button>
                        <button className="h-[64px] px-10 bg-slate-800 text-white rounded-2xl font-black text-lg transition-all hover:bg-slate-700 hover:scale-[1.02] active:scale-95 border border-slate-700 flex items-center justify-center gap-3">
                            <Play className="w-6 h-6 fill-current" />
                            <span>Google Play</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Subtle brand mark in background */}
            <div className="absolute -bottom-24 -right-24 text-white/[0.02] font-black text-[300px] leading-none select-none pointer-events-none">
                RIDY
            </div>
        </section>
    );
};

export default AppCta;
