import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ChevronLeft, Share2, Star, Calendar, MessageSquare, AlertCircle, Copy, CheckCircle2, Loader2
} from 'lucide-react';
import RentalInquiry from '../inquiry/RentalInquiry';
import SuccessionInquiry from '../inquiry/SuccessionInquiry';
import { motion, AnimatePresence } from 'framer-motion';
import { bikeService } from '../../services/bikeService';

const ModelDetail = () => {
    const { slug } = useParams();
    const [bike, setBike] = useState(null);
    const [activeIdx, setActiveIdx] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBike = async () => {
            try {
                const data = await bikeService.getBikeBySlug(slug);
                setBike(data);
                // Set initial active index to 0 for images
                setActiveIdx(0);
            } catch (error) {
                console.error('Error fetching bike detail:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBike();
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            </div>
        );
    }

    if (!bike) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6">
                <AlertCircle className="w-16 h-16 text-slate-200" />
                <h2 className="text-2xl font-black text-slate-900">바이크를 찾을 수 없습니다.</h2>
                <Link to="/bikes" className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-black">홈으로 이동</Link>
            </div>
        );
    }

    const isSuccession = bike.brand === 'SUCCESSION' || !!bike.plateNumber;
    const images = isSuccession
        ? (bike.successionImages?.length > 0 ? bike.successionImages : bike.items?.map(item => item.image).filter(Boolean)) || []
        : bike.items?.map(item => item.image).filter(Boolean) || [];
    const currentImage = images[activeIdx] || bike.image;

    return (
        <div className="bg-white min-h-screen pt-24 pb-32">
            {/* Header */}
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-12 flex items-center justify-between">
                <Link
                    to={isSuccession ? "/product/succession" : `/product/${bike.brand?.toLowerCase() || 'rental'}`}
                    className="group flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors"
                >
                    <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:border-slate-900 transition-all">
                        <ChevronLeft size={20} />
                    </div>
                    <span className="font-black tracking-tight">{isSuccession ? "리스 승계" : "신차 장기 리스"}</span>
                </Link>
                <div className="flex items-center gap-4">
                    <button className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-all">
                        <Share2 size={18} className="text-slate-600" />
                    </button>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
                {/* Left: Image Gallery */}
                <div className="flex flex-col gap-10">
                    <div className="relative aspect-[4/3] rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shadow-sm">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeIdx}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                src={currentImage}
                                className="w-full h-full object-cover"
                                alt={bike.name}
                            />
                        </AnimatePresence>

                        {bike.isCompleted && (
                            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center">
                                <div className="px-10 py-4 bg-white rounded-full shadow-2xl">
                                    <span className="text-2xl font-black text-slate-900">승계 완료</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {images.length > 1 && (
                        <div className="flex flex-col gap-6 px-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Photo Gallery</span>
                                <h3 className="text-xl font-black text-slate-900">{isSuccession ? "상세 실물 사진" : "컬러 라인업"}</h3>
                            </div>
                            <div className="flex gap-4 overflow-x-auto py-4 px-2 -mx-2 no-scrollbar">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveIdx(idx)}
                                        className={`relative shrink-0 w-24 md:w-32 aspect-square rounded-[20px] overflow-hidden border-2 transition-all duration-300 ${activeIdx === idx ? 'border-indigo-600 outline outline-offset-4 outline-indigo-600/20 scale-105 z-10' : 'border-slate-100 hover:border-slate-300'}`}
                                    >
                                        <img src={img} className="w-full h-full object-cover" alt="" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Specs & Action */}
                <div className="flex flex-col gap-10 md:gap-12">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                                <span className="text-slate-400 mr-2 font-bold">{isSuccession ? bike.originalBrand : bike.brand}</span>
                                {bike.name}
                            </h1>
                        </div>

                        {isSuccession && bike.plateNumber && (
                            <div className="flex items-center gap-3">
                                <div className="px-5 py-2.5 bg-slate-900 rounded-xl">
                                    <span className="text-white text-lg font-black tracking-wider font-pretendard">
                                        {bike.plateNumber}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Color Picker (Regular Models Only) */}
                    {!isSuccession && bike.items?.length > 1 && (
                        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
                            <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Select Color</h4>
                                <span className="text-sm font-black text-indigo-600 uppercase tracking-tight">{bike.items[activeIdx]?.colorName}</span>
                            </div>
                            <div className="flex flex-wrap gap-3.5">
                                {bike.items?.filter(item => item.image).map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveIdx(idx)}
                                        className={`group relative w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-all p-0.5 ${activeIdx === idx ? 'border-indigo-600 scale-110 shadow-lg shadow-indigo-600/10' : 'border-slate-100 hover:border-slate-300'}`}
                                        title={item.colorName}
                                    >
                                        <div
                                            className="w-full h-full rounded-full border border-black/5 shadow-inner"
                                            style={{ backgroundColor: item.colorHex || '#FFFFFF' }}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Specs List */}
                    <div className="flex flex-col gap-6 md:gap-7 border-t border-slate-100 pt-10">
                        {isSuccession ? (
                            [
                                { label: '연식', val: bike.year },
                                { label: '주행거리', val: bike.mileage ? (bike.mileage.toString().includes('km') ? bike.mileage : `${bike.mileage}km`) : '-' },
                                { label: '잔여 계약 기간', val: bike.remainingPeriod ? (bike.remainingPeriod.toString().includes('일') ? bike.remainingPeriod : `${bike.remainingPeriod}일`) : '-' },
                                { label: '일/월 렌탈료', val: bike.rentalFee },
                                { label: '인수 가능한 지역', val: bike.location },
                            ].map((spec, i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{spec.label}</span>
                                    <span className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{spec.val}</span>
                                </div>
                            ))
                        ) : (
                            [
                                { label: '연식', val: bike.year || '25년식' },
                                { label: '카테고리', val: bike.category },
                                { label: '브랜드', val: bike.brand },
                                { label: '유료 옵션', val: '선택 가능' },
                            ].map((spec, i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{spec.label}</span>
                                    <span className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors font-pretendard">{spec.val}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Inquiry Form Section */}
            <div id="inquiry-section" className="max-w-[1440px] mx-auto px-6 md:px-12 mt-32">
                <div className="max-w-4xl mx-auto space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">상담 신청하기</h2>
                        <p className="text-slate-500 font-bold">내용을 남겨주시면 담당자가 빠른 시일 내에 연락드리겠습니다.</p>
                    </div>
                    {isSuccession ? (
                        <SuccessionInquiry prefilledPlateNumber={bike.plateNumber} key={bike.id} />
                    ) : (
                        <RentalInquiry preselectedModel={bike.name} key={bike.id} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModelDetail;
