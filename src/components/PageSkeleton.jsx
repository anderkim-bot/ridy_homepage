import React from 'react';

const PageSkeleton = ({ title, description }) => {
    return (
        <div className="pt-[60px] pb-32 min-h-[60vh]">
            <div className="container">
                <div className="badge-halo mb-6">준비 중인 페이지</div>
                <h1 className="text-h1 mb-8">{title}</h1>
                <p className="text-p max-w-2xl font-bold opacity-80 mb-12">
                    {description || "라이디 웹사이트 리뉴얼 프로젝트가 진행 중입니다. 곧 세련된 디자인과 유익한 정보로 찾아뵙겠습니다."}
                </p>
                <div className="w-full h-96 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center border-dashed">
                    <span className="text-slate-300 font-bold">Content Skeleton Area</span>
                </div>
            </div>
        </div>
    );
};

export default PageSkeleton;
