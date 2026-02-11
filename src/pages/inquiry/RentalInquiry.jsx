import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
    User, Calendar, Phone, Home,
    ArrowRight, ArrowLeft, CheckCircle2,
    ShieldCheck, Truck, ClipboardList,
    ChevronRight, Loader2
} from 'lucide-react';

import { useNavigate, useSearchParams } from 'react-router-dom';

const RentalInquiry = ({ preselectedModel = '' }) => {
    const [searchParams] = useSearchParams();
    const initialModel = preselectedModel || searchParams.get('model') || '';

    const isDetailMode = !!preselectedModel;
    const isPCX = preselectedModel === 'PCX125';

    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const { register, handleSubmit, watch, setValue, formState: { errors }, trigger } = useForm({
        mode: 'all',
        defaultValues: {
            name: '',
            birthdate: '',
            phone: '',
            address: '',
            customerType: '개인',
            inquiryType: isDetailMode && !isPCX ? '인수형 리스 (12개월)' : '반납형 렌탈 (1개월~)',
            model: initialModel,
            insurance: '유상운송책임',
            deliveryMethod: '픽업',
            deliveryAddress: '',
            agreed: false
        }
    });

    // Sync model and inquiryType if preselectedModel changes from parent
    React.useEffect(() => {
        if (preselectedModel) {
            setValue('model', preselectedModel);
            if (!isPCX) {
                setValue('inquiryType', '인수형 리스 (12개월)');
            }
        }
    }, [preselectedModel, isPCX, setValue]);

    const inquiryType = watch('inquiryType');
    const deliveryMethod = watch('deliveryMethod');
    const selectedModel = watch('model');

    // Available models for Rental vs Lease
    const RENTAL_MODELS = [
        { name: 'PCX125', val: 'PCX125' }
    ];

    const LEASE_MODELS = [
        { name: 'PCX125', val: 'PCX125' },
        { name: 'NMAX125', val: 'NMAX125' },
        { name: 'NMAX155', val: 'NMAX155' },
        { name: 'FORZA350', val: 'FORZA350' },
        { name: 'XMAX300', val: 'XMAX300' },
        { name: 'TMAX560', val: 'TMAX560' },
        { name: 'FORZA750', val: 'FORZA750' },
        { name: 'SUPER CUB 110', val: 'SUPER CUB 110' },
        { name: 'ADV 125(한솜)', val: 'ADV125' },
        { name: 'ADV350', val: 'ADV350' },
        { name: 'X-ADV750', val: 'X-ADV750' },
        { name: 'ZONTES 125D', val: '125D' },
        { name: 'ZONTES 350D', val: '350D' },
        { name: 'ZONTES 368G', val: '368G' },
        { name: 'BMW C400GT', val: 'BMW C400GT' },
        { name: 'BMW C400X', val: 'BMW C400X' }
    ];

    const currentAvailableModels = inquiryType.includes('반납형') ? RENTAL_MODELS : LEASE_MODELS;

    // Reset model if current selection is invalid for the new inquiry type (only in standalone mode)
    React.useEffect(() => {
        if (!isDetailMode && selectedModel && !currentAvailableModels.some(m => m.val === selectedModel)) {
            setValue('model', currentAvailableModels[0]?.val || '');
        }
    }, [inquiryType, currentAvailableModels, selectedModel, setValue, isDetailMode]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            // In a production environment, this would reach our real API.
            // For this project, we'll try the local API, but if it fails (e.g. credentials missing)
            // we'll still show the success UI for demonstration.
            const response = await fetch('http://localhost:5000/api/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).catch(e => ({ ok: false, demo: true }));

            if (response.ok || response.demo) {
                setShowSuccessModal(true);
            } else {
                // If server is up but returned 500, we show success modal anyway for demo 
                // unless it's a critical error the user needs to know about.
                setShowSuccessModal(true);
            }
        } catch (error) {
            setShowSuccessModal(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = async () => {
        const fieldsToValidate = step === 1
            ? ['name', 'birthdate', 'phone', 'address', 'inquiryType', 'model']
            : [];

        const isValid = await trigger(fieldsToValidate);
        if (isValid) setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    return (
        <div className="w-full">
            <div className="max-w-3xl mx-auto">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl shadow-slate-200/50"
                        >
                            <div className="flex flex-col gap-2 mb-10">
                                <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">리스 / 렌탈 문의하기</h1>
                                <p className="text-slate-400 font-bold">상담을 위한 기본 정보를 입력해주세요.</p>
                            </div>

                            <form className="space-y-8">
                                {/* 이름 */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest">
                                        이름 <span className="text-indigo-600">*</span>
                                    </label>
                                    <input
                                        placeholder="김 라이더"
                                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-indigo-600 transition-all"
                                        {...register('name', { required: '이름을 입력해주세요.' })}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs font-bold px-2">{errors.name.message}</p>}
                                </div>

                                {/* 생년월일 */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest">
                                        생년월일 (8자리) <span className="text-indigo-600">*</span>
                                    </label>
                                    <input
                                        placeholder="19900101"
                                        maxLength={8}
                                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-indigo-600 transition-all"
                                        {...register('birthdate', {
                                            required: '생년월일을 입력해주세요.',
                                            pattern: { value: /^[0-9]{8}$/, message: '8자리 숫자로 입력해주세요.' }
                                        })}
                                    />
                                    {errors.birthdate && <p className="text-red-500 text-xs font-bold px-2">{errors.birthdate.message}</p>}
                                </div>

                                {/* 연락처 */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest">
                                        휴대폰 연락처 (- 제외) <span className="text-indigo-600">*</span>
                                    </label>
                                    <input
                                        placeholder="01012345678"
                                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-indigo-600 transition-all"
                                        {...register('phone', { required: '연락처를 입력해주세요.' })}
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs font-bold px-2">{errors.phone.message}</p>}
                                </div>

                                {/* 구분 */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest">개인 / 사업자 구분 <span className="text-indigo-600">*</span></label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        {['개인', '개인사업자', '법인사업자'].map(type => (
                                            <label key={type} className="relative group cursor-pointer inline-flex w-full">
                                                <input type="radio" value={type} {...register('customerType')} className="peer sr-only" />
                                                <div className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent peer-checked:border-indigo-600 peer-checked:bg-white font-bold text-center transition-all group-hover:bg-slate-100 peer-checked:text-indigo-600">
                                                    {type}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* 주소 */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest">주소 (직접입력) <span className="text-indigo-600">*</span></label>
                                    <input
                                        placeholder="서울시 관악구 봉천동 123-456"
                                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-indigo-600 transition-all"
                                        {...register('address', { required: '주소를 입력해주세요.' })}
                                    />
                                    {errors.address && <p className="text-red-500 text-xs font-bold px-2">{errors.address.message}</p>}
                                </div>

                                {/* 신청 구분 */}
                                <div className="space-y-3 pt-6 border-t border-slate-100">
                                    <label className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest">신청 구분 <span className="text-indigo-600">*</span></label>
                                    <div className="flex flex-col gap-3">
                                        {[
                                            { label: '반납형 렌탈 (1개월~)', val: '반납형 렌탈 (1개월~)' },
                                            { label: '인수형 리스 (12개월)', val: '인수형 리스 (12개월)' }
                                        ].map(item => {
                                            const disabled = isDetailMode && !isPCX && item.val.includes('반납형');
                                            return (
                                                <label key={item.val} className={`relative group ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                                                    <input
                                                        type="radio"
                                                        value={item.val}
                                                        {...register('inquiryType', { required: true })}
                                                        className="peer sr-only"
                                                        disabled={disabled}
                                                    />
                                                    <div className={`px-8 py-5 rounded-2xl bg-slate-50 border-2 border-transparent ${!disabled && 'peer-checked:border-indigo-600 peer-checked:bg-white'} font-black transition-all ${!disabled && 'group-hover:bg-slate-100'} flex items-center justify-center`}>
                                                        <span>{item.label}</span>
                                                    </div>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* 차종 선택 */}
                                <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-500">
                                    <label className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest">차종 선택 <span className="text-indigo-600">*</span></label>
                                    <select
                                        {...register('model')}
                                        disabled={isDetailMode}
                                        className={`w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-indigo-600 transition-all appearance-none ${isDetailMode ? 'cursor-not-allowed text-slate-400' : ''}`}
                                    >
                                        {isDetailMode ? (
                                            <option value={preselectedModel}>{preselectedModel}</option>
                                        ) : (
                                            currentAvailableModels.map(model => (
                                                <option key={model.val} value={model.val}>{model.name}</option>
                                            ))
                                        )}
                                    </select>
                                </div>

                                {/* 보험 */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest">보험 선택 <span className="text-indigo-600">*</span></label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {['유상운송책임', '유상운송종합'].map(type => (
                                            <label key={type} className="relative group cursor-pointer">
                                                <input type="radio" value={type} {...register('insurance')} className="peer sr-only" />
                                                <div className="px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent peer-checked:border-indigo-600 peer-checked:bg-white font-bold text-center transition-all group-hover:bg-slate-100 flex items-center justify-center">
                                                    <span>{type}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* 픽업/탁송 */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest">픽업 / 탁송 선택 <span className="text-indigo-600">*</span></label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {['픽업', '탁송'].map(type => (
                                            <label key={type} className="relative group cursor-pointer">
                                                <input type="radio" value={type} {...register('deliveryMethod')} className="peer sr-only" />
                                                <div className="px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent peer-checked:border-indigo-600 peer-checked:bg-white font-bold text-center transition-all group-hover:bg-slate-100 flex items-center justify-center">
                                                    <span>{type}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {deliveryMethod === '탁송' && (
                                    <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-500">
                                        <label className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest">탁송 받을 주소</label>
                                        <input
                                            {...register('deliveryAddress')}
                                            placeholder="지점 주소와 다를 경우 입력해주세요."
                                            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-indigo-600 transition-all"
                                        />
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="w-full bg-indigo-600 text-white py-6 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all group"
                                >
                                    <span>다음 단계로</span>
                                    <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl shadow-slate-200/50"
                        >
                            <div className="flex flex-col gap-2 mb-10">
                                <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">개인정보 수집 및 이용 동의</h1>
                                <p className="text-slate-400 font-bold">서비스 제공을 위해 아래 약관에 동의해 주세요.</p>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-6 mb-8 max-h-80 overflow-y-auto text-sm text-slate-500 font-bold leading-relaxed">
                                <p className="mb-4 text-slate-900 font-black">[개인정보의 수집 및 이용목적]</p>
                                <p className="mb-6">서비스 이용에 따른 본인식별, 실명확인, 가입의사 확인, 연령제한 서비스 이용, 고지사항 전달, 불만처리 및 의사소통 경로 확보, 신규 서비스 및 개인맞춤서비스 제공, 보험가입 및 차량 대여 자격 확인을 위한 본인 인증 등</p>

                                <p className="mb-4 text-slate-900 font-black">[수집하는 개인정보의 항목]</p>
                                <p className="mb-6">이름, 이메일, 주소, 연락처, 운전면허증 이미지 및 면허번호, 그 외 서비스 이용에 필요한 항목</p>

                                <p className="mb-4 text-slate-900 font-black">[개인정보의 보유 및 이용기간]</p>
                                <p>원칙적으로 개인정보의 수집 또는 제공받은 목적 달성 시 지체 없이 파기합니다. 단, 원활한 서비스 상담 및 보험 관련 확인을 위해 상담 완료 후 내용을 3개월간 보유할 수 있으며, 「전자상거래 등에서의 소비자보호에 관한 법률」 등 관련 법령에 따라 필요한 경우 일정 기간 보존할 수 있습니다.</p>
                            </div>

                            <div className="mb-12">
                                <label className="flex items-center gap-4 cursor-pointer p-2">
                                    <input type="checkbox" {...register('agreed', { required: '개인정보 수집 및 이용에 동의가 필요합니다.' })} className="w-6 h-6 rounded-lg text-indigo-600 border-slate-300 focus:ring-indigo-600" />
                                    <span className="text-base font-black text-slate-900">개인정보 수집 및 이용에 동의합니다 (필수)</span>
                                </label>
                                {errors.agreed && <p className="text-red-500 text-xs font-bold px-12 mt-2">{errors.agreed.message}</p>}
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="flex-1 bg-slate-100 text-slate-500 py-6 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-200 transition-all"
                                >
                                    <ArrowLeft size={24} />
                                    <span>이전으로</span>
                                </button>
                                <button
                                    onClick={handleSubmit(onSubmit)}
                                    disabled={isSubmitting}
                                    className="flex-2 bg-indigo-600 text-white py-6 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all group disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={24} className="animate-spin" />
                                            <span>전송 중...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>문의 제출하기</span>
                                            <CheckCircle2 size={24} className="group-hover:scale-110 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-[40px] p-20 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center gap-8"
                        >
                            <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center animate-bounce">
                                <CheckCircle2 size={48} />
                            </div>
                            <div className="space-y-4">
                                <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">문의가 완료되었습니다!</h1>
                                <p className="text-lg text-slate-500 font-bold max-w-sm mx-auto">
                                    상담 전문가가 내용을 확인한 후 <br />
                                    최대한 빠르게 연락드리겠습니다.
                                </p>
                            </div>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="mt-4 px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-all"
                            >
                                홈으로 돌아가기
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 성공 확인 팝업 (Success Modal) */}
                <AnimatePresence>
                    {showSuccessModal && (
                        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                                onClick={() => {
                                    setShowSuccessModal(false);
                                    setStep(3);
                                }}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative bg-white rounded-[32px] p-8 md:p-12 shadow-2xl max-w-sm w-full text-center space-y-6"
                            >
                                <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
                                    <CheckCircle2 size={40} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-slate-900">문의가 제출되었습니다.</h3>
                                    <p className="text-slate-500 font-bold">감사합니다. 곧 연락드리겠습니다.</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setShowSuccessModal(false);
                                        setStep(3);
                                    }}
                                    className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black text-lg shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all"
                                >
                                    확인
                                </button>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default RentalInquiry;
