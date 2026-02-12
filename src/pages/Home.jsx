import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import HomeContent from '../components/HomeContent';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>라이디 (RIDY) | 라이더의 가치를 증명하는 최고의 선택</title>
                <meta name="description" content="라이디(RIDY)는 라이더를 위한 토탈 솔루션 플랫폼입니다. 오토바이 렌탈, 스마트 정산 Payout, 전국 정비 네트워크 등을 통해 라이더의 수익과 성장을 지원합니다." />
                <meta name="keywords" content="라이디, RIDY, 오토바이 렌탈, 배달 대행, 바이크 렌탈, 라이더 정산, 배달 라이더, 오토바이 정비" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://ridy.co.kr/" />
                <meta property="og:title" content="라이디 (RIDY) - 라이더의 가치를 증명하는 최고의 선택" />
                <meta property="og:description" content="라이디(RIDY)는 렌탈부터 정산까지 라이더를 위한 모든 서비스를 제공하는 올인원 플랫폼입니다." />
                <meta property="og:image" content="/og-image.jpg" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="라이디 (RIDY) - 라이더의 가치를 증명하는 최고의 선택" />
                <meta property="twitter:description" content="라이더 수익 극대화와 안전 주행을 위한 라이디의 혁신적인 서비스를 만나보세요." />
            </Helmet>
            <Hero />
            <HomeContent />
        </>
    );
};

export default Home;
