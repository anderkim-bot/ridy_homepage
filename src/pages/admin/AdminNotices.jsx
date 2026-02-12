import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Trash2,
    Edit3,
    X,
    Bell,
    Calendar,
    Info,
    AlertCircle,
    PartyPopper,
    Loader2,
    Check,
    ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminTabs from '../../components/admin/AdminTabs';

const CATEGORIES = ['안내', '점검', '이벤트'];

const API_BAR_URL = 'http://localhost:5000/api/notices';

const AdminNotices = () => {
    const [notices, setNotices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingNotice, setEditingNotice] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [noticeToDelete, setNoticeToDelete] = useState(null);

    // Form states
    const [formData, setFormData] = useState({
        title: '',
        category: '안내',
        content: '',
        date: new Date().toISOString().split('T')[0]
    });

    const fetchNotices = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(API_BAR_URL);
            const data = await response.json();
            setNotices(data);
        } catch (error) {
            console.error('Error fetching notices:', error);
            alert('공지사항을 불러오는 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    const handleOpenModal = (notice = null) => {
        if (notice) {
            setEditingNotice(notice);
            setFormData({
                title: notice.title,
                category: notice.category,
                content: notice.content,
                date: notice.date
            });
        } else {
            setEditingNotice(null);
            setFormData({
                title: '',
                category: '안내',
                content: '',
                date: new Date().toISOString().split('T')[0]
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingNotice(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.content) {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }

        setIsSubmitting(true);
        try {
            const body = editingNotice
                ? { ...formData, id: editingNotice.id }
                : formData;

            const response = await fetch(API_BAR_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                alert(editingNotice ? '공지사항이 수정되었습니다.' : '공지사항이 등록되었습니다.');
                fetchNotices();
                handleCloseModal();
            } else {
                throw new Error('Failed to save');
            }
        } catch (error) {
            console.error('Error saving notice:', error);
            alert('공지사항 저장 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteClick = (notice) => {
        setNoticeToDelete(notice);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!noticeToDelete) return;

        try {
            const response = await fetch(`${API_BAR_URL}/${noticeToDelete.id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('공지사항이 삭제되었습니다.');
                fetchNotices();
                setIsDeleteModalOpen(false);
                setNoticeToDelete(null);
            } else {
                throw new Error('Delete failed');
            }
        } catch (error) {
            console.error('Error deleting notice:', error);
            alert('삭제 중 오류가 발생했습니다.');
        }
    };

    const filteredNotices = notices.filter(n =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.content.toLowerCase().includes(searchQuery.toLowerCase())
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
                                <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-slate-900 leading-none">공지사항 관리</h1>
                                <p className="text-[10px] lg:text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Notice Management</p>
                            </div>
                        </div>
                        <div className="mt-8">
                            <AdminTabs />
                        </div>
                    </div>


                    <div className="flex flex-col lg:flex-row w-full lg:w-auto gap-4">
                        <div className="relative w-full lg:w-80">
                            <input
                                type="text"
                                placeholder="공지사항 검색"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white form-input-ridy h-[56px]! pl-12! rounded-lg lg:rounded-xl shadow-sm border border-slate-200 outline-none focus:border-primary transition-all text-sm font-bold placeholder:text-slate-400"
                            />
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        </div>
                        <button
                            onClick={() => handleOpenModal()}
                            className="w-full lg:w-auto flex items-center justify-center gap-4 bg-slate-900 text-white px-8 py-4 lg:py-4.5 rounded-lg lg:rounded-xl font-black text-sm lg:text-base transition-all hover:bg-slate-800 hover:scale-[1.02] active:scale-95 shadow-xl shadow-slate-900/10 whitespace-nowrap shrink-0"
                        >
                            <Plus size={20} />
                            <span>신규 공지사항 추가</span>
                        </button>
                    </div>

                </header>


                {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 size={40} className="text-primary animate-spin" />
                        <p className="text-slate-400 font-bold">데이터를 불러오는 중...</p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50 border-b border-slate-100">
                                    <tr className="text-slate-400 font-bold text-[11px] uppercase tracking-[0.2em]">
                                        <th className="px-8 py-6">Notice Info</th>
                                        <th className="px-8 py-6">Category</th>
                                        <th className="px-8 py-6 text-right">Settings</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredNotices.map((notice) => (
                                        <tr key={notice.id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-base font-black text-slate-900">{notice.title}</span>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Calendar size={12} className="text-slate-400" />
                                                        <span className="text-[11px] font-bold text-slate-400">{notice.date}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black tracking-tight ${notice.category === '안내' ? 'bg-blue-50 text-blue-600' :
                                                    notice.category === '점검' ? 'bg-orange-50 text-orange-600' :
                                                        'bg-purple-50 text-purple-600'
                                                    }`}>
                                                    {notice.category}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => handleOpenModal(notice)} className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:border-primary hover:text-primary transition-all shadow-sm active:scale-95"><Edit3 size={16} /></button>
                                                    <button onClick={() => handleDeleteClick(notice)} className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all shadow-sm active:scale-95"><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>


                        {/* Mobile Cards */}
                        <div className="lg:hidden space-y-3">
                            {filteredNotices.map((notice) => (
                                <div key={notice.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                                    <div className="flex items-center justify-between">

                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black tracking-tight ${notice.category === '안내' ? 'bg-blue-50 text-blue-600' :
                                            notice.category === '점검' ? 'bg-orange-50 text-orange-600' :
                                                'bg-purple-50 text-purple-600'
                                            }`}>
                                            {notice.category}
                                        </span>
                                        <span className="text-[11px] font-bold text-slate-400">{notice.date}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-900 text-lg leading-tight line-clamp-2">{notice.title}</h3>
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <button
                                            onClick={() => handleOpenModal(notice)}
                                            className="flex-1 bg-slate-50 text-slate-600 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:bg-indigo-50 active:text-indigo-600 transition-colors"
                                        >
                                            <Edit3 size={16} />
                                            수정
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(notice)}
                                            className="flex-1 bg-red-50 text-red-500 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:bg-red-100 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                            삭제
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {filteredNotices.length === 0 && (
                                <div className="bg-white p-20 rounded-3xl border border-slate-200 text-center">
                                    <p className="text-slate-400 font-bold">등록된 공지사항이 없습니다.</p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-100 flex items-end md:items-center justify-center p-0 md:p-4 lg:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModal}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: "100%" }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: "100%" }}
                            className="relative bg-white w-full max-w-2xl h-[90vh] md:h-auto rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col"
                        >
                            <div className="px-6 md:px-10 py-5 md:py-6 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-[12px] bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20">
                                        <Bell size={22} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-none">{editingNotice ? '공지사항 수정' : '신규 공지사항 추가'}</h2>
                                        <p className="text-[10px] md:text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{editingNotice ? 'Edit' : 'New'} Entry</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="w-10 h-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                                <form id="notice-form" onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">카테고리</label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                className="w-full bg-slate-50 border-none rounded-xl px-5 py-3.5 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                                            >
                                                {CATEGORIES.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">게시일</label>
                                            <input
                                                type="date"
                                                name="date"
                                                value={formData.date}
                                                onChange={handleInputChange}
                                                className="w-full bg-slate-50 border-none rounded-xl px-5 py-3.5 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">공지 제목</label>
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="공지사항 제목을 입력하세요"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="w-full bg-slate-50 border-none rounded-xl px-5 py-3.5 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">상세 내용</label>
                                        <textarea
                                            name="content"
                                            placeholder="상세 내용을 입력하세요"
                                            value={formData.content}
                                            onChange={handleInputChange}
                                            className="w-full bg-slate-50 border-none rounded-xl px-5 py-4 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600 transition-all min-h-[200px] resize-none"
                                        />
                                    </div>
                                </form>
                            </div>

                            <div className="px-6 md:px-10 py-5 border-t border-slate-100 bg-white flex flex-col md:flex-row justify-end gap-3 shrink-0">
                                <button type="button" onClick={handleCloseModal} disabled={isSubmitting} className="order-2 md:order-1 px-8 py-3.5 rounded-lg text-slate-400 font-black text-sm hover:bg-slate-50 transition-all flex items-center justify-center disabled:opacity-50">취소</button>
                                <button form="notice-form" type="submit" disabled={isSubmitting} className="order-1 md:order-2 bg-slate-900 text-white px-10 py-3.5 rounded-lg font-black text-sm transition-all hover:bg-slate-800 active:scale-95 shadow-xl shadow-slate-900/10 uppercase tracking-wider flex items-center justify-center gap-3 disabled:bg-slate-700">
                                    {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> <span>저장 중...</span></> : <span>{editingNotice ? '수정 완료' : '등록 완료'}</span>}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}

                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white w-full max-w-sm rounded-xl overflow-hidden shadow-2xl p-8 text-center"
                        >
                            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">

                                <AlertCircle size={40} className="text-red-500" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 mb-2">정말 삭제할까요?</h2>
                            <p className="text-slate-500 font-bold text-sm mb-8 leading-relaxed">
                                선택하신 공지사항이 영구히 삭제되며,<br />
                                이 작업은 되돌릴 수 없습니다.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="flex-1 bg-slate-50 text-slate-500 py-4 rounded-2xl font-black text-sm hover:bg-slate-100 transition-all"
                                >
                                    취소
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="flex-1 bg-red-500 text-white py-4 rounded-2xl font-black text-sm hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
                                >
                                    삭제하기
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminNotices;
