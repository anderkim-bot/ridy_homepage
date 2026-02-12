import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ChevronLeft, Share2, Star, Calendar, MessageSquare, AlertCircle,
    Copy, CheckCircle2, Loader2, Gauge, Zap, Settings2, Shield, MapPin,
    Clock, BadgeCheck, ExternalLink, ArrowRight, Weight, Cpu, Thermometer
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
            <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="text-slate-400 font-bold animate-pulse">상세 정보를 불러오는 중...</p>
            </div>
        );
    }

    if (!bike) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 px-4 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-10 h-10 text-slate-300" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-[24px] font-black text-slate-900">모델을 찾을 수 없습니다.</h2>
                    <p className="text-slate-500 font-bold">판매가 완료되었거나 잘못된 경로입니다.</p>
                </div>
                <Link to="/product/honda" className="px-8 py-3 bg-primary text-white rounded-xl font-black shadow-lg shadow-primary/20 hover:scale-105 transition-transform">목록으로 이동</Link>
            </div>
        );
    }

    const isSuccession = bike.brand === 'SUCCESSION' || !!bike.plateNumber;
    const images = isSuccession
        ? (bike.successionImages?.length > 0 ? bike.successionImages : bike.items?.map(item => item.image).filter(Boolean)) || []
        : bike.items?.map(item => item.image).filter(Boolean) || [];
    const currentImage = images[activeIdx] || bike.image;

    const brandName = isSuccession ? bike.originalBrand : bike.brand;

    const specs = isSuccession ? [
        { icon: Calendar, label: '연식', val: bike.year },
        { icon: Gauge, label: '주행거리', val: bike.mileage ? (bike.mileage.toString().includes('km') ? bike.mileage : `${bike.mileage}km`) : '-' },
        { icon: Clock, label: '잔여 기간', val: bike.remainingPeriod ? (bike.remainingPeriod.toString().includes('일') ? bike.remainingPeriod : `${bike.remainingPeriod}일`) : '-' },
        { icon: Zap, label: '렌탈료', val: bike.rentalFee },
        { icon: MapPin, label: '지역', val: bike.location || '전국' },
    ] : [
        { icon: Calendar, label: '연식', val: bike.year || '25년식' },
        { icon: Weight, label: '중량 (KG)', val: bike.weight ? `${bike.weight}kg` : '-' },
        { icon: Cpu, label: '엔진', val: bike.engine || '-' },
        { icon: Gauge, label: '배기량', val: bike.displacement ? (bike.displacement.toString().includes('cc') ? bike.displacement : `${bike.displacement}cc`) : '-' },
        { icon: Thermometer, label: '냉각방식', val: bike.cooling || '-' },
        { icon: Zap, label: '최고출력', val: bike.maxPower || '-' },
        { icon: BadgeCheck, label: '카테고리', val: bike.category || '스쿠터' },
        { icon: Shield, label: '보증', val: '라이디 케어' },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Top Navigation Bar */}
            <div className="sticky top-space-3xl md:top-[80px] z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="container px-4 py-4 flex items-center justify-between">
                    <Link
                        to={isSuccession ? "/product/succession" : `/product/${bike.brand?.toLowerCase() || 'honda'}`}
                        className="group flex items-center gap-2 text-slate-400 hover:text-primary transition-all font-black text-sm"
                    >
                        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span>{isSuccession ? "리스 승계" : `${brandName} 신차`}</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                            <Share2 size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="container px-4 py-6 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* Left side: Hero Images & Gallery */}
                    <div className="lg:col-span-7 flex flex-col gap-8">
                        {/* Main Stage */}
                        <div className="relative aspect-4/3 rounded-2xl md:rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/50">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeIdx}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    src={currentImage}
                                    className="w-full h-full object-cover"
                                    alt={bike.name}
                                />
                            </AnimatePresence>

                            {/* Luxury Overlay Tags */}
                            <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                                {isSuccession ? (
                                    <div className="px-4 py-2 bg-slate-900/90 backdrop-blur-md rounded-xl text-white shadow-xl">
                                        <span className="text-[12px] font-black uppercase tracking-widest leading-none">PRE-OWNED</span>
                                    </div>
                                ) : (
                                    bike.isPopular && (
                                        <div className="px-4 py-2 bg-red-600/90 backdrop-blur-md rounded-xl text-white shadow-xl">
                                            <span className="text-[12px] font-black uppercase tracking-widest leading-none">인기상품</span>
                                        </div>
                                    )
                                )}
                            </div>

                            {bike.isCompleted && (
                                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-lg flex items-center justify-center z-20">
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="px-12 py-5 bg-white rounded-2xl shadow-2xl"
                                    >
                                        <span className="text-[28px] font-black text-slate-900">승계 완료</span>
                                    </motion.div>
                                </div>
                            )}
                        </div>

                        {/* Gallery Thumbnails */}
                        {images.length > 1 && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-8 h-px bg-primary"></span>
                                    <span className="text-[11px] font-black text-primary uppercase tracking-widest">Gallery Preview</span>
                                </div>
                                <div className="flex gap-4 overflow-x-auto py-2 no-scrollbar scroll-smooth">
                                    {images.map((img, idx) => (
                                        <motion.button
                                            key={idx}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setActiveIdx(idx)}
                                            className={`relative shrink-0 w-24 md:w-32 aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-500 ${activeIdx === idx ? 'border-primary shadow-xl shadow-primary/10' : 'border-slate-100 opacity-60 hover:opacity-100'}`}
                                        >
                                            <img src={img} className="w-full h-full object-cover" alt="" />
                                            {activeIdx === idx && (
                                                <div className="absolute inset-0 bg-primary/5 ring-4 ring-inset ring-primary/20"></div>
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right side: Detailed Information */}
                    <div className="lg:col-span-5 flex flex-col gap-10">
                        {/* Title Section */}
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2"
                            >
                                <span className="text-[16px] font-black text-primary italic uppercase tracking-wider">{brandName}</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                                <span className="text-[14px] font-bold text-slate-400 capitalize">{bike.category || 'Series'}</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-[32px] md:text-[56px] font-black text-slate-900 leading-[1.1] tracking-tight"
                            >
                                {bike.name}
                            </motion.h1>

                            {isSuccession && bike.plateNumber && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="pt-4"
                                >
                                    <div className="inline-flex flex-col px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl">
                                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Plate Number</span>
                                        <span className="text-xl font-black text-slate-900 tracking-wider">
                                            {bike.plateNumber}
                                        </span>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Color Selection (Regular Models Only) */}
                        {!isSuccession && bike.items?.length > 1 && (
                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none">Choose Your Style</span>
                                        <span className="text-[16px] font-black text-slate-900">{bike.items[activeIdx]?.colorName}</span>
                                    </div>
                                    <Star className="text-yellow-400 fill-yellow-400" size={20} />
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    {bike.items?.filter(item => item.image).map((item, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveIdx(idx)}
                                            className={`group relative w-12 h-12 rounded-2xl transition-all duration-300 p-1 flex items-center justify-center ${activeIdx === idx ? 'bg-white shadow-xl shadow-slate-200 scale-110' : 'hover:scale-105 opacity-60 hover:opacity-100'}`}
                                            title={item.colorName}
                                        >
                                            <div
                                                className="w-full h-full rounded-xl border border-black/5 shadow-inner"
                                                style={{ backgroundColor: item.colorHex || '#FFFFFF' }}
                                            />
                                            {activeIdx === idx && (
                                                <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Specifications Grid */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <h3 className="text-lg font-black text-slate-900">상세 스펙</h3>
                                <div className="flex items-center gap-1.5 text-primary">
                                    <Shield size={16} />
                                    <span className="text-xs font-black uppercase">라이디 검증 매물</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {specs.map((spec, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-5 bg-white border border-slate-100 rounded-2xl flex flex-col gap-1 group hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all"
                                    >
                                        <div className="flex items-center gap-2 text-slate-400 group-hover:text-primary transition-colors">
                                            <spec.icon size={16} />
                                            <span className="text-[11px] font-black uppercase tracking-widest">{spec.label}</span>
                                        </div>
                                        <span className="text-[15px] font-bold md:text-[18px] md:font-black text-slate-900 truncate">
                                            {spec.val}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Quick CTA */}
                        <div className="pt-4">
                            <button
                                onClick={() => {
                                    document.getElementById('inquiry-section')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="w-full py-5 bg-primary text-white rounded-2xl font-black text-[18px] shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 group hover:scale-[1.02] transition-transform active:scale-95"
                            >
                                <MessageSquare size={22} />
                                <span>지금 상담 신청하기</span>
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <p className="mt-4 text-center text-xs font-bold text-slate-400">상담 신청 후 담당자가 24시간 내에 연락드립니다.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Immersive Inquiry Section */}
            <div id="inquiry-section" className="bg-slate-50 py-16 md:py-32 mt-12 md:mt-16 overflow-hidden relative">
                {/* Background Decoration */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

                <div className="container px-0 md:px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center space-y-4 md:space-y-6 mb-12 md:mb-20 px-4 md:px-0">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="inline-flex p-2 md:p-3 bg-primary/10 rounded-2xl text-primary"
                            >
                                <Calendar size={24} md:size={32} />
                            </motion.div>
                            <div className="space-y-3 md:space-y-4">
                                <h2 className="text-[28px] md:text-[48px] font-black text-slate-900 leading-tight">상담 신청하기</h2>
                                <p className="text-[15px] md:text-[18px] font-bold text-slate-500 max-w-xl mx-auto">
                                    {bike.name}에 대한 궁금한 점이 있으신가요? <br className="hidden md:block" />
                                    전문 상담원이 친절하고 상세하게 안내해 드립니다.
                                </p>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-none md:rounded-[40px] p-6 md:p-16 shadow-xl md:shadow-2xl shadow-slate-200/60 border-y md:border border-slate-100"
                        >
                            {isSuccession ? (
                                <SuccessionInquiry prefilledPlateNumber={bike.plateNumber} key={bike.id} />
                            ) : (
                                <RentalInquiry preselectedModel={bike.name} key={bike.id} />
                            )}
                        </motion.div>

                        {/* Summary Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                            {[
                                { title: '실시간 상담', desc: '카카오톡을 통한 빠른 답변', icon: MessageSquare },
                                { title: '전국 배송', desc: '어디에서나 만나보는 라이디', icon: ExternalLink },
                                { title: '정밀 검진', desc: '모든 매물 72가지 항목 체크', icon: Shield },
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center gap-3 p-4">
                                    <div className="text-slate-900"><item.icon size={24} /></div>
                                    <div className="space-y-1">
                                        <h4 className="font-black text-slate-900">{item.title}</h4>
                                        <p className="text-sm font-bold text-slate-400">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModelDetail;
