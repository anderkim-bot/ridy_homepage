import React from 'react';
import { ChevronRight } from 'lucide-react';

const AppCta = () => {
    return (
        <section className="py-32 md:py-48 bg-bg-dark relative overflow-hidden">
            {/* Ambient Background Light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[160px] rounded-full pointer-events-none" />

            <div className="container relative z-10">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    <div className="text-primary font-black text-[14px] tracking-[0.2em] uppercase mb-8">RIDY PAYOUT</div>
                    <h2 className="text-[36px] md:text-[56px] font-black tracking-tight text-white mb-8 leading-tight">
                        복잡한 정산 관리, <br className="hidden md:block" /> 라이디 페이아웃(RIDY Payout)이 도와드리겠습니다.
                    </h2>
                    <p className="text-[18px] md:text-[20px] font-medium text-white/60 mb-16 max-w-2xl leading-relaxed">
                        복잡한 계산은 시스템에 맡기고, 당신은 더 중요한 일에 집중하세요. <br className="hidden md:block" />
                        서로에게 신뢰를 주는 새로운 정산의 기준을 제안합니다.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-5 w-full sm:w-auto">
                        <a href="/service/payout" className="h-[64px] px-12 bg-white text-slate-900 rounded-2xl font-black text-lg transition-all hover:bg-slate-100 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-white/10">
                            <span>서비스 상세 보러 가기</span>
                            <ChevronRight className="w-5 h-5" />
                        </a>
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
