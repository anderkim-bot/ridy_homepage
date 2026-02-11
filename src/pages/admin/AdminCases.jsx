import React, { useState, useEffect } from 'react';
import {
    Plus, Search, Trash2, Edit3, X, Loader2, Upload,
    MapPin, Link as LinkIcon, AlignLeft, Briefcase, ExternalLink, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminTabs from '../../components/admin/AdminTabs';
import { caseService } from '../../services/caseService';

const AdminCases = () => {
    const [cases, setCases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCase, setEditingCase] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        region: '',
        image: '',
        link: '',
        description: ''
    });

    useEffect(() => {
        fetchCases();
    }, []);

    const fetchCases = async () => {
        setIsLoading(true);
        try {
            const data = await caseService.getAllCases();
            setCases(data);
        } catch (err) {
            console.error('Error fetching cases:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (caseItem = null) => {
        if (caseItem) {
            setEditingCase(caseItem);
            setFormData(caseItem);
        } else {
            setEditingCase(null);
            setFormData({
                region: '',
                image: '',
                link: '',
                description: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const result = await caseService.uploadImage(file);
            setFormData(prev => ({ ...prev, image: result.url }));
        } catch (err) {
            alert('이미지 업로드에 실패했습니다.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await caseService.saveCase(formData);
            setIsModalOpen(false);
            fetchCases();
        } catch (err) {
            alert('저장에 실패했습니다.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                await caseService.deleteCase(id);
                fetchCases();
            } catch (err) {
                alert('삭제에 실패했습니다.');
            }
        }
    };

    const filteredCases = cases.filter(c =>
        c.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 lg:p-12 font-sans text-slate-900">
            <div className="max-w-full mx-auto">
                <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-8 mb-10 lg:mb-16">
                    <div className="space-y-3">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                                <Briefcase className="text-white w-6 h-6 lg:w-8 lg:h-8" />
                            </div>
                            <div className="shrink-0 flex flex-col whitespace-nowrap">
                                <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-slate-900 leading-none">출고 사례 관리</h1>
                                <p className="text-[10px] lg:text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Delivery Case Manager</p>
                            </div>
                        </div>
                        <div className="mt-8 w-full">
                            <AdminTabs />
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row w-full lg:w-auto gap-4">
                        <div className="relative w-full lg:w-80">
                            <input
                                type="text"
                                placeholder="출고 지역 또는 설명으로 검색"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white h-[56px]! pl-12! rounded-lg lg:rounded-xl shadow-sm border border-slate-200 outline-none focus:border-primary transition-all text-sm font-bold placeholder:text-slate-400"
                            />
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        </div>
                        <button
                            onClick={() => handleOpenModal()}
                            className="w-full lg:w-auto flex items-center justify-center gap-4 bg-slate-900 text-white px-8 py-4 lg:py-4.5 rounded-lg lg:rounded-xl font-black text-sm lg:text-base transition-all hover:bg-slate-800 hover:scale-[1.02] active:scale-95 shadow-xl shadow-slate-900/10 whitespace-nowrap shrink-0"
                        >
                            <Plus size={20} />
                            <span>새 출고 사례 등록</span>
                        </button>
                    </div>
                </header>

                {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 size={40} className="text-primary animate-spin" />
                        <p className="text-slate-400 font-bold">데이터를 불러오는 중...</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Desktop Table View */}
                        <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50 border-b border-slate-100">
                                    <tr className="text-slate-400 font-bold text-[11px] uppercase tracking-[0.2em]">
                                        <th className="px-8 py-6">Image & Region</th>
                                        <th className="px-8 py-6">Description</th>
                                        <th className="px-8 py-6">Link</th>
                                        <th className="px-8 py-6 text-right">Settings</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredCases.map((item) => (
                                        <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
                                                        {item.image ? (
                                                            <img src={item.image} alt={item.region} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                                <AlignLeft size={24} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-[10px] font-black uppercase tracking-widest inline-block w-fit mb-1">{item.region}</span>
                                                        <span className="text-xs font-bold text-slate-400">{new Date(item.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="text-sm font-bold text-slate-700 line-clamp-2 max-w-[400px]">
                                                    {item.description}
                                                </p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-xs font-black text-indigo-600 hover:gap-2 transition-all"
                                                >
                                                    카페 리포트 <ExternalLink size={12} />
                                                </a>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleOpenModal(item)}
                                                        className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:border-primary hover:text-primary transition-all shadow-sm active:scale-95"
                                                    >
                                                        <Edit3 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all shadow-sm active:scale-95"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="lg:hidden flex flex-col gap-4">
                            {filteredCases.map((item) => (
                                <div key={item.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.region} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                        <AlignLeft size={24} />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-[9px] font-black uppercase tracking-widest inline-block mb-1">{item.region}</span>
                                                <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{item.description}</h3>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleOpenModal(item)}
                                                className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center active:scale-90 transition-all"
                                            >
                                                <Edit3 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center active:scale-90 transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-slate-50">
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full h-11 bg-slate-50 text-slate-600 rounded-xl font-black text-xs flex items-center justify-center gap-2"
                                        >
                                            카페 리포트 확인 <ExternalLink size={14} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white w-full max-w-5xl h-[90vh] rounded-[32px] overflow-hidden shadow-2xl flex flex-col"
                        >
                            <div className="px-10 py-6 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-[14px] bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20">
                                        <Briefcase size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{editingCase ? '출고 사례 수정' : '신규 사례 등록'}</h2>
                                        <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Delivery Case Details</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all active:scale-90"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                                <form onSubmit={handleSubmit} className="space-y-10">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                        {/* Left Column: Info */}
                                        <div className="space-y-8">
                                            <div className="space-y-4">
                                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                                    <Info size={16} className="text-indigo-600" />
                                                    기본 정보
                                                </h3>
                                                <div className="space-y-4">
                                                    <div className="space-y-1.5">
                                                        <label className="text-[11px] font-black text-slate-400 ml-1">출고 지역</label>
                                                        <div className="relative">
                                                            <input
                                                                type="text"
                                                                required
                                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-3.5 text-sm font-bold focus:bg-white focus:border-indigo-600 outline-none transition-all"
                                                                value={formData.region}
                                                                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                                                                placeholder="예: 서울 강남구"
                                                            />
                                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-[11px] font-black text-slate-400 ml-1">카페 리포트 링크</label>
                                                        <div className="relative">
                                                            <input
                                                                type="url"
                                                                required
                                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-3.5 text-sm font-bold focus:bg-white focus:border-indigo-600 outline-none transition-all"
                                                                value={formData.link}
                                                                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                                                placeholder="https://cafe.naver.com/..."
                                                            />
                                                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                                    <AlignLeft size={16} className="text-indigo-600" />
                                                    상세 설명
                                                </h3>
                                                <textarea
                                                    required
                                                    rows={6}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 text-sm font-bold focus:bg-white focus:border-indigo-600 outline-none transition-all"
                                                    value={formData.description}
                                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                    placeholder="출고 기종, 특징 등 상세 내용을 입력해주세요."
                                                />
                                            </div>
                                        </div>

                                        {/* Right Column: Image */}
                                        <div className="space-y-8">
                                            <div className="space-y-4">
                                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                                    <Upload size={16} className="text-indigo-600" />
                                                    썸네일 이미지
                                                </h3>
                                                <div className="relative group aspect-video bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden cursor-pointer hover:border-indigo-600 transition-all">
                                                    {formData.image ? (
                                                        <>
                                                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                                                <label className="cursor-pointer bg-white text-slate-900 px-4 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-all flex items-center gap-2 shadow-lg">
                                                                    <Edit3 size={16} /> 변경
                                                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                                                                </label>
                                                                <button type="button" onClick={() => setFormData({ ...formData, image: '' })} className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-all flex items-center gap-2 shadow-lg">
                                                                    <Trash2 size={16} /> 삭제
                                                                </button>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <label className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center cursor-pointer">
                                                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 mb-4 group-hover:scale-110 transition-transform duration-500">
                                                                <Plus size={24} />
                                                            </div>
                                                            <p className="text-sm font-black text-slate-900">클릭하여 이미지 업로드</p>
                                                            <p className="text-[11px] font-bold text-slate-400 mt-1">추천 사이즈: 16:9 비율</p>
                                                            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                                                        </label>
                                                    )}
                                                </div>
                                                <div className="space-y-1.5 mt-4">
                                                    <label className="text-[11px] font-black text-slate-400 ml-1">직접 URL 입력 (선택)</label>
                                                    <input
                                                        type="text"
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-bold focus:bg-white focus:border-indigo-600 outline-none transition-all"
                                                        value={formData.image}
                                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                                        placeholder="https://..."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-10 border-t border-slate-100 flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="flex-1 lg:flex-none px-10 py-4.5 bg-slate-50 text-slate-400 rounded-2xl font-black text-base hover:bg-slate-100 transition-all active:scale-95"
                                        >
                                            취소
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 bg-indigo-600 text-white py-4.5 rounded-2xl font-black text-base hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-indigo-600/20"
                                        >
                                            {editingCase ? '수정 사항 저장' : '새 출고 사례 등록'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminCases;
