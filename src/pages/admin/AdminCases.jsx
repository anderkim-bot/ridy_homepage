import React, { useState, useEffect } from 'react';
import {
    Plus, Search, Trash2, Edit3, X, Loader2, Upload,
    MapPin, Link as LinkIcon, AlignLeft
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
        <div className="min-h-screen bg-slate-50 pt-[100px] pb-20">
            <div className="container max-w-7xl">
                <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-8 border-b border-slate-100">
                        <AdminTabs activeTab="cases" />
                    </div>

                    <div className="p-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                            <div>
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight">출고 사례 관리</h1>
                                <p className="text-slate-500 font-bold mt-1">홈페이지의 출고 사례 섹션을 관리합니다.</p>
                            </div>
                            <button
                                onClick={() => handleOpenModal()}
                                className="h-14 px-8 bg-slate-900 text-white rounded-2xl font-black flex items-center gap-2 hover:bg-slate-800 transition-all active:scale-95"
                            >
                                <Plus size={20} /> 새 출고 사례 등록
                            </button>
                        </div>

                        <div className="relative mb-8">
                            <input
                                type="text"
                                placeholder="출고 지역 또는 설명으로 검색"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-14 bg-slate-50 border-none rounded-2xl px-12 text-sm font-bold focus:ring-2 focus:ring-slate-900/10 transition-all"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        </div>

                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <Loader2 className="animate-spin text-slate-400" size={40} />
                                <p className="text-slate-400 font-bold">출고 사례를 불러오고 있습니다...</p>
                            </div>
                        ) : filteredCases.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredCases.map((item) => (
                                    <div key={item.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden group hover:shadow-xl transition-all">
                                        <div className="aspect-video bg-slate-100 relative overflow-hidden">
                                            {item.image ? (
                                                <img src={item.image} alt={item.region} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                    <AlignLeft size={40} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest">{item.region}</span>
                                                    <p className="text-slate-700 font-bold text-sm mt-3 line-clamp-2">{item.description}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 mt-6">
                                                <button
                                                    onClick={() => handleOpenModal(item)}
                                                    className="flex-1 h-12 bg-slate-100 text-slate-600 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
                                                >
                                                    <Edit3 size={16} /> 수정
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-100 transition-all"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200">
                                <p className="text-slate-400 font-bold text-lg">등록된 출고 사례가 없습니다.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl relative z-10 overflow-hidden"
                        >
                            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                                <h2 className="text-2xl font-black text-slate-900">{editingCase ? '출고 사례 수정' : '새 출고 사례 등록'}</h2>
                                <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">출고 지역</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                required
                                                value={formData.region}
                                                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                                                placeholder="예: 서울 강남구"
                                                className="w-full h-14 bg-slate-50 border-none rounded-2xl px-12 text-sm font-bold focus:ring-2 focus:ring-slate-900/10 transition-all"
                                            />
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        </div>
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">카페 리포트 링크</label>
                                        <div className="relative">
                                            <input
                                                type="url"
                                                required
                                                value={formData.link}
                                                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                                placeholder="https://cafe.naver.com/..."
                                                className="w-full h-14 bg-slate-50 border-none rounded-2xl px-12 text-sm font-bold focus:ring-2 focus:ring-slate-900/10 transition-all"
                                            />
                                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        </div>
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">썸네일 이미지</label>
                                        <div className="flex gap-4">
                                            <div className="flex-1 relative">
                                                <input
                                                    type="text"
                                                    value={formData.image}
                                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                                    placeholder="이미지 URL"
                                                    className="w-full h-14 bg-slate-50 border-none rounded-2xl px-12 text-sm font-bold focus:ring-2 focus:ring-slate-900/10 transition-all"
                                                />
                                                <Upload className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                            </div>
                                            <label className="h-14 px-6 bg-slate-100 text-slate-600 rounded-2xl font-black text-sm flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-all">
                                                파일 선택
                                                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">상세 설명</label>
                                        <textarea
                                            required
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="출고와 관련된 설명을 입력해주세요."
                                            rows={4}
                                            className="w-full bg-slate-50 border-none rounded-2xl p-6 text-sm font-bold focus:ring-2 focus:ring-slate-900/10 transition-all"
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="w-full h-16 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all active:scale-[0.98] mt-4 shadow-xl shadow-slate-900/10">
                                    {editingCase ? '수정 내용 저장' : '출고 사례 등록'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminCases;
