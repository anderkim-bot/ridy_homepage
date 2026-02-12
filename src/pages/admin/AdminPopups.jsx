import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Trash2,
    Edit3,
    X,
    Bell,
    Calendar,
    Check,
    AlertCircle,
    Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminTabs from '../../components/admin/AdminTabs';
import ImageCropper from '../../components/admin/ImageCropper';

const API_POPUPS_URL = 'http://localhost:5000/api/popups';

const AdminPopups = () => {
    const [popups, setPopups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingPopup, setEditingPopup] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [popupToDelete, setPopupToDelete] = useState(null);

    // Image Cropper State
    const [cropImage, setCropImage] = useState(null);
    const [isCropping, setIsCropping] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        title: '', // Internal name for admin
        image: '',
        startDate: '',
        endDate: '',
        isActive: true
    });

    const fetchPopups = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(API_POPUPS_URL);
            const data = await response.json();
            setPopups(data);
        } catch (error) {
            console.error('Error fetching popups:', error);
            alert('팝업 데이터를 불러오는 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPopups();
    }, []);

    const handleOpenModal = (popup = null) => {
        if (popup) {
            setEditingPopup(popup);
            setFormData({
                title: popup.title || '',
                image: popup.image || '',
                startDate: popup.startDate || '',
                endDate: popup.endDate || '',
                isActive: popup.isActive
            });
        } else {
            setEditingPopup(null);
            const today = new Date().toISOString().split('T')[0];
            setFormData({
                title: '',
                image: '',
                startDate: today,
                endDate: today,
                isActive: true
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingPopup(null);
        setCropImage(null);
        setIsCropping(false);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCropImage(reader.result);
                setIsCropping(true);
            };
            reader.readAsDataURL(file);
        }
        // Reset input
        e.target.value = null;
    };

    const handleCropComplete = (croppedDataUrl) => {
        setFormData(prev => ({ ...prev, image: croppedDataUrl }));
        setIsCropping(false);
        setCropImage(null);
    };

    const handleCropCancel = () => {
        setIsCropping(false);
        setCropImage(null);
    }

    const validateActivePopups = (currentId, isActive, startDate, endDate) => {
        if (!isActive) return true;

        // Check how many OTHER popups are active in overlapping period
        // For simplicity, just check "isActive" flag broadly or overlap check?
        // User requirement: "Active max 2 simultaneous"
        // Since dates differ, "simultaneous" depends on date range overlap.
        // Let's implement a strict check:
        // Filter active popups (excluding current).
        // Check finding period overlap with new popup.
        // If overlap count >= 2, return false.

        const newStart = new Date(startDate).getTime();
        const newEnd = new Date(endDate).getTime();

        const activeOverlapping = popups.filter(p => {
            if (p.id === currentId) return false; // skip self
            if (!p.isActive) return false;

            const pStart = new Date(p.startDate).getTime();
            const pEnd = new Date(p.endDate).getTime();

            // Check overlap
            // Overlap if (StartA <= EndB) and (EndA >= StartB)
            return (newStart <= pEnd && newEnd >= pStart);
        });

        if (activeOverlapping.length >= 2) {
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.image) {
            alert('팝업 이미지를 등록해주세요.');
            return;
        }

        // Validation Limit 2
        const currentId = editingPopup ? editingPopup.id : null;
        if (!validateActivePopups(currentId, formData.isActive, formData.startDate, formData.endDate)) {
            alert('동일 기간에 게시 중인 팝업이 이미 2개가 있습니다.\n기존 팝업의 기간을 수정하거나 비활성화해주세요.');
            return;
        }

        setIsSubmitting(true);
        try {
            const body = editingPopup
                ? { ...formData, id: editingPopup.id }
                : formData;

            const response = await fetch(API_POPUPS_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                alert(editingPopup ? '팝업이 수정되었습니다.' : '팝업이 등록되었습니다.');
                fetchPopups();
                handleCloseModal();
            } else {
                throw new Error('Failed to save');
            }
        } catch (error) {
            console.error('Error saving popup:', error);
            alert('팝업 저장 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteClick = (popup) => {
        setPopupToDelete(popup);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!popupToDelete) return;

        try {
            const response = await fetch(`${API_POPUPS_URL}/${popupToDelete.id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('팝업이 삭제되었습니다.');
                fetchPopups();
                setIsDeleteModalOpen(false);
                setPopupToDelete(null);
            } else {
                throw new Error('Delete failed');
            }
        } catch (error) {
            console.error('Error deleting popup:', error);
            alert('삭제 중 오류가 발생했습니다.');
        }
    };

    const filteredPopups = popups.filter(p =>
        (p.title || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 lg:p-12 font-sans text-slate-900 overflow-x-hidden">
            <div className="max-w-[1500px] mx-auto">
                <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-8 mb-10 lg:mb-16">
                    <div className="space-y-3">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                                <Bell className="text-white w-6 h-6 lg:w-8 lg:h-8" />
                            </div>
                            <div className="shrink-0 flex flex-col whitespace-nowrap">
                                <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-slate-900 leading-none">팝업 관리</h1>
                                <p className="text-[10px] lg:text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Popup Management</p>
                            </div>
                        </div>
                        <div className="mt-8">
                            <AdminTabs />
                        </div>
                    </div>


                    <div className="flex flex-col lg:flex-row w-full lg:w-auto gap-4">
                        <button
                            onClick={() => handleOpenModal()}
                            className="w-full lg:w-auto flex items-center justify-center gap-4 bg-slate-900 text-white px-8 py-4 lg:py-4.5 rounded-lg lg:rounded-xl font-black text-sm lg:text-base transition-all hover:bg-slate-800 hover:scale-[1.02] active:scale-95 shadow-xl shadow-slate-900/10 whitespace-nowrap shrink-0"
                        >
                            <Plus size={20} />
                            <span>신규 팝업 등록</span>
                        </button>
                    </div>
                </header>

                {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 size={40} className="text-primary animate-spin" />
                    </div>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50 border-b border-slate-100">
                                    <tr className="text-slate-400 font-bold text-[11px] uppercase tracking-[0.2em]">
                                        <th className="px-8 py-6">Popup Info</th>
                                        <th className="px-8 py-6">Duration</th>
                                        <th className="px-8 py-6">Status</th>
                                        <th className="px-8 py-6 text-right">Settings</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredPopups.map((popup) => (
                                        <tr key={popup.id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden border border-slate-100 shrink-0">
                                                        {popup.image ? <img src={popup.image} className="w-full h-full object-cover" /> : null}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-black text-slate-900">{popup.title || '제목 없음'}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-slate-500 font-bold text-xs">
                                                    <Calendar size={14} />
                                                    {popup.startDate} ~ {popup.endDate}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black tracking-tight ${popup.isActive ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'
                                                    }`}>
                                                    {popup.isActive ? '게시 중' : '비활성'}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => handleOpenModal(popup)} className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:border-primary hover:text-primary transition-all shadow-sm active:scale-95"><Edit3 size={16} /></button>
                                                    <button onClick={() => handleDeleteClick(popup)} className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all shadow-sm active:scale-95"><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards - Simplified for brevity */}
                        <div className="lg:hidden space-y-3">
                            {filteredPopups.map((popup) => (
                                <div key={popup.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
                                    <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden border border-slate-100 shrink-0">
                                        {popup.image ? <img src={popup.image} className="w-full h-full object-cover" /> : null}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-black text-slate-900 line-clamp-1">{popup.title || 'No Title'}</span>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${popup.isActive ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                                                {popup.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-400 font-bold flex items-center gap-1">
                                            <Calendar size={12} /> {popup.startDate} ~ {popup.endDate}
                                        </p>
                                        <div className="flex gap-2 pt-2">
                                            <button onClick={() => handleOpenModal(popup)} className="flex-1 py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg hover:bg-indigo-50 hover:text-indigo-600">수정</button>
                                            <button onClick={() => handleDeleteClick(popup)} className="flex-1 py-2 bg-slate-50 text-red-500 text-xs font-bold rounded-lg hover:bg-red-50">삭제</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-100 flex items-end md:items-center justify-center p-0 md:p-4 lg:p-8">
                        <div onClick={handleCloseModal} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: "100%" }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: "100%" }}
                            className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col"
                        >
                            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
                                <h2 className="text-xl font-black text-slate-900">{editingPopup ? '팝업 수정' : '신규 팝업 등록'}</h2>
                                <button onClick={handleCloseModal} className="p-2 bg-slate-50 rounded-full hover:bg-slate-100"><X size={20} className="text-slate-400" /></button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                                <form id="popup-form" onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">팝업 이름 (관리용)</label>
                                        <input
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="관리용 팝업 이름을 입력하세요"
                                            className="w-full bg-slate-50 border-none rounded-xl px-5 py-3.5 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">게시 시작일</label>
                                            <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="w-full bg-slate-50 rounded-xl px-5 py-3.5 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">게시 종료일</label>
                                            <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className="w-full bg-slate-50 rounded-xl px-5 py-3.5 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600" required />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">팝업 이미지 (1:1 권장)</label>
                                        <div className="flex flex-col gap-4">
                                            {formData.image && (
                                                <div className="w-40 h-40 rounded-xl overflow-hidden border border-slate-200 relative group">
                                                    <img src={formData.image} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <label className="cursor-pointer text-white text-xs font-bold underline">
                                                            변경하기
                                                            <input type="file" className="hidden" accept="image/*" onChange={handleFileSelect} />
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                            {!formData.image && (
                                                <label className="w-full h-40 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/30 transition-all">
                                                    <Plus className="text-slate-400 mb-2" />
                                                    <span className="text-sm font-bold text-slate-400">이미지 업로드</span>
                                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileSelect} />
                                                </label>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                                        <input
                                            type="checkbox"
                                            id="isActive"
                                            name="isActive"
                                            checked={formData.isActive}
                                            onChange={handleInputChange}
                                            className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="isActive" className="text-sm font-bold text-slate-700 cursor-pointer select-none">
                                            팝업 게시 (활성화)
                                        </label>
                                    </div>
                                </form>
                            </div>

                            <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
                                <button onClick={handleCloseModal} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50">취소</button>
                                <button form="popup-form" type="submit" disabled={isSubmitting} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50">
                                    {isSubmitting ? '저장 중...' : '저장하기'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Cropper Modal */}
            {isCropping && cropImage && (
                <ImageCropper
                    imageSrc={cropImage}
                    onCropComplete={handleCropComplete}
                    onCancel={handleCropCancel}
                />
            )}

            {/* Delete Modal (Simplified) */}
            <AnimatePresence>
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
                        <div onClick={() => setIsDeleteModalOpen(false)} className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative bg-white w-full max-w-sm rounded-xl p-8 text-center shadow-2xl">
                            <h2 className="text-xl font-black mb-2">삭제하시겠습니까?</h2>
                            <div className="flex gap-3 mt-6">
                                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold">취소</button>
                                <button onClick={confirmDelete} className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold">삭제</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminPopups;
