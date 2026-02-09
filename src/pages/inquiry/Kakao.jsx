import React, { useEffect } from 'react';
import PageSkeleton from '../../components/PageSkeleton';

const KakaoInquiry = () => {
    useEffect(() => {
        // Logic to redirect or open KakaoTalk could go here
        console.log("Redirecting to KakaoTalk...");
    }, []);

    return (
        <PageSkeleton
            title="카카오톡 상담"
            description="라이디 플러스친구를 추가하시면 실시간으로 상담원과 대화하실 수 있습니다."
        />
    );
};

export default KakaoInquiry;
