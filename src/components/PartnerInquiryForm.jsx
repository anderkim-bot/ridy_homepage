import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
    User, Phone, MapPin, Building2, Calendar, ClipboardList,
    Search, Users, Advertise, MessageSquare,
    CheckCircle2, ChevronRight, Loader2, X
} from 'lucide-react';

const PartnerInquiryForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: 'all',
        defaultValues: {
            name: '',
            phone: '',
            isOperating: '',
            centerName: '',
            centerLocation: '',
            experience: '',
            desiredRegion: '',
            deliveryBranchOperating: '',
            rentalBusinessDesired: '',
            discoveryPath: ''
        }
    });

    const isOperating = watch('isOperating');

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            // Demo API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setShowSuccessModal(true);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 font-bold text-white focus:ring-2 focus:ring-primary focus:bg-white/10 transition-all outline-none placeholder:text-white/20";
    const labelClasses = "flex items-center gap-2 text-sm font-black text-white/60 uppercase tracking-widest mb-3";

    return (
        <div className="w-full max-w-3xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-xl rounded-[32px] p-8 md:p-12 border border-white/10 shadow-2xl"
            >
                <div className="flex flex-col gap-2 mb-10 text-left">
                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">서비스센터 가맹점 창업 문의하기</h2>
                    <p className="text-white/40 font-bold">파트너십을 위한 기본 정보를 입력해주세요.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 text-left">
                    {/* 이름 */}
                    <div className="space-y-1">
                        <label className={labelClasses}>이름 <span className="text-primary">*</span></label>
                        <input
                            placeholder="김 라이더"
                            className={inputClasses}
                            {...register('name', { required: '이름을 입력해주세요.' })}
                        />
                        {errors.name && <p className="text-red-400 text-xs font-bold px-2 mt-1">{errors.name.message}</p>}
                    </div>

                    {/* 연락처 */}
                    <div className="space-y-1">
                        <label className={labelClasses}>전화번호 <span className="text-primary">*</span></label>
                        <input
                            placeholder="01012345678"
                            className={inputClasses}
                            {...register('phone', { required: '전화번호를 입력해주세요.' })}
                        />
                        {errors.phone && <p className="text-red-400 text-xs font-bold px-2 mt-1">{errors.phone.message}</p>}
                    </div>

                    {/* 현재 오토바이센터 사업 운영 여부 */}
                    <div className="space-y-4">
                        <label className={labelClasses}>현재 오토바이센터 사업 운영 여부 <span className="text-primary">*</span></label>
                        <div className="grid grid-cols-2 gap-3">
                            {['네', '아니오'].map(val => (
                                <label key={val} className="relative group cursor-pointer inline-flex w-full">
                                    <input type="radio" value={val} {...register('isOperating', { required: true })} className="peer sr-only" />
                                    <div className="w-full px-6 py-4 rounded-xl bg-white/5 border-2 border-transparent peer-checked:border-primary peer-checked:bg-primary/20 font-bold text-center text-white transition-all group-hover:bg-white/10">
                                        {val}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Conditional Fields based on Operating Status */}
                    <AnimatePresence mode="wait">
                        {isOperating === '네' ? (
                            <motion.div
                                key="operating-fields"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-8 overflow-hidden"
                            >
                                <div className="space-y-1">
                                    <label className={labelClasses}>오토바이 센터 이름 <span className="text-primary">*</span></label>
                                    <input placeholder="운영중인 센터 이름을 입력하세요" className={inputClasses} {...register('centerName', { required: isOperating === '네' })} />
                                </div>
                                <div className="space-y-1">
                                    <label className={labelClasses}>오토바이 센터 위치 <span className="text-primary">*</span></label>
                                    <input placeholder="상세 주소를 입력하세요" className={inputClasses} {...register('centerLocation', { required: isOperating === '네' })} />
                                </div>
                                <div className="space-y-1">
                                    <label className={labelClasses}>오토바이 센터 업력(몇년차) <span className="text-primary">*</span></label>
                                    <input placeholder="10년" className={inputClasses} {...register('experience', { required: isOperating === '네' })} />
                                </div>
                            </motion.div>
                        ) : isOperating === '아니오' ? (
                            <motion.div
                                key="not-operating-fields"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-1 overflow-hidden"
                            >
                                <label className={labelClasses}>희망 창업 개설 지역 <span className="text-primary">*</span></label>
                                <input placeholder="ex) 서울시 강남구, 부산 해운대구" className={inputClasses} {...register('desiredRegion', { required: isOperating === '아니오' })} />
                            </motion.div>
                        ) : null}
                    </AnimatePresence>

                    {/* 배달대행(플러스) 지사 운영 여부 */}
                    <div className="space-y-4">
                        <label className={labelClasses}>배달대행(플러스) 지사 운영 여부 <span className="text-primary">*</span></label>
                        <div className="grid grid-cols-2 gap-3">
                            {['네', '아니오'].map(val => (
                                <label key={val} className="relative group cursor-pointer inline-flex w-full">
                                    <input type="radio" value={val} {...register('deliveryBranchOperating', { required: true })} className="peer sr-only" />
                                    <div className="w-full px-6 py-4 rounded-xl bg-white/5 border-2 border-transparent peer-checked:border-primary peer-checked:bg-primary/20 font-bold text-center text-white transition-all group-hover:bg-white/10">
                                        {val}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 렌탈사업 희망 여부 */}
                    <div className="space-y-4">
                        <label className={labelClasses}>렌탈사업 희망 여부 <span className="text-primary">*</span></label>
                        <div className="grid grid-cols-2 gap-3">
                            {['네', '아니오'].map(val => (
                                <label key={val} className="relative group cursor-pointer inline-flex w-full">
                                    <input type="radio" value={val} {...register('rentalBusinessDesired', { required: true })} className="peer sr-only" />
                                    <div className="w-full px-6 py-4 rounded-xl bg-white/5 border-2 border-transparent peer-checked:border-primary peer-checked:bg-primary/20 font-bold text-center text-white transition-all group-hover:bg-white/10">
                                        {val}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 문의하게 된 경로 */}
                    <div className="space-y-4">
                        <label className={labelClasses}>문의하게 된 경로 <span className="text-primary">*</span></label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {['검색', 'SNS', '광고', '지인소개'].map(val => (
                                <label key={val} className="relative group cursor-pointer inline-flex w-full">
                                    <input type="radio" value={val} {...register('discoveryPath', { required: true })} className="peer sr-only" />
                                    <div className="w-full px-4 py-4 rounded-xl bg-white/5 border-2 border-transparent peer-checked:border-primary peer-checked:bg-primary/20 font-bold text-center text-white text-sm transition-all group-hover:bg-white/10">
                                        {val}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-white py-6 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all group disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={24} className="animate-spin" />
                                <span>전송 중...</span>
                            </>
                        ) : (
                            <>
                                <span>신청하기</span>
                                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            </motion.div>

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccessModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                            onClick={() => setShowSuccessModal(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white rounded-[32px] p-8 md:p-12 shadow-2xl max-w-sm w-full text-center space-y-6"
                        >
                            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle2 size={40} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-slate-900">문의가 제출되었습니다.</h3>
                                <p className="text-slate-500 font-bold">내용 확인 후 곧 연락드리겠습니다.</p>
                            </div>
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="w-full bg-primary text-white py-4 rounded-xl font-black text-lg shadow-xl shadow-primary/20 hover:opacity-90 transition-all"
                            >
                                확인
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PartnerInquiryForm;
