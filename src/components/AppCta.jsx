import React from 'react';

const AppCta = () => {
    return (
        <section className="py-32 bg-bg-white relative overflow-hidden text-center">
            <div className="container relative z-10 flex flex-col items-center">
                <div className="text-[14px] font-bold text-primary tracking-widest uppercase mb-6">RIDY PAYOUT APP</div>
                <h2 className="text-section-title mb-8">
                    대한민국 필수 <br className="md:hidden" /> 라이더 정산 앱, 라이디
                </h2>
                <p className="text-body mb-12 max-w-2xl mx-auto">
                    렌탈료 자동 정산부터 실시간 수익금 출금까지. <br className="hidden md:block" />
                    전국 라이더들이 신뢰하는 라이디 앱을 지금 바로 만나보세요.
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <button className="btn-ridy btn-ridy-outline h-[56px]! px-[40px]! text-[16px]! rounded-[34px]! border-[#E0E0E0]!">
                        App Store
                    </button>
                    <button className="btn-ridy btn-ridy-outline h-[56px]! px-[40px]! text-[16px]! rounded-[34px]! border-[#E0E0E0]!">
                        Google Play
                    </button>

                </div>
            </div>

            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
};


export default AppCta;
