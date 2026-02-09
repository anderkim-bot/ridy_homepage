import React from 'react';

const AppCta = () => {
    return (
        <section className="py-32 bg-white relative overflow-hidden text-center">
            <div className="container relative z-10">
                <div className="badge-halo mb-8">RIDY PAYOUT APP</div>
                <h2 className="text-h2 text-foreground mb-8">
                    대한민국 필수 <br className="md:hidden" /> 라이더 정산 앱, 라이디
                </h2>
                <p className="text-p mb-12 max-w-2xl mx-auto font-bold opacity-80 leading-relaxed">
                    렌탈료 자동 정산부터 실시간 수익금 출금까지. <br className="hidden md:block" />
                    전국 라이더들이 신뢰하는 라이디 앱을 지금 바로 만나보세요.
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-6 px-6 md:px-0">
                    <button className="btn-halo btn-halo-primary !px-16 !py-6 !text-xl shadow-2xl">
                        App Store
                    </button>
                    <button className="btn-halo btn-halo-primary !px-16 !py-6 !text-xl shadow-2xl !bg-[#1A1A1A]">
                        Google Play
                    </button>
                </div>
            </div>

            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 blur-[160px] rounded-full pointer-events-none" />
        </section>
    );
};

export default AppCta;
