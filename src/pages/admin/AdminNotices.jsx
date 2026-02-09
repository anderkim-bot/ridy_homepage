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
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 lg:p-12">
            <div className="max-w-6xl mx-auto">
                <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-8 mb-10 lg:mb-16">
                    <div className="space-y-3">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-indigo-600 rounded-[20px] flex items-center justify-center shadow-lg shadow-indigo-600/20">
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
                                className="w-full bg-white border border-slate-200 rounded-[16px] md:rounded-[20px] px-12 py-4 md:py-4.5 text-sm md:text-base font-bold focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 outline-none transition-all shadow-sm"
                            />
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        </div>
                        <button
                            onClick={() => handleOpenModal()}
                            className="w-full lg:w-auto flex items-center justify-center gap-4 bg-slate-900 text-white px-8 py-4 lg:py-4.5 rounded-[16px] lg:rounded-[20px] font-black text-sm lg:text-base transition-all hover:bg-slate-800 hover:scale-[1.02] active:scale-95 shadow-xl shadow-slate-900/10 whitespace-nowrap shrink-0"
                        >
                            <Plus size={20} />
                            <span>신규 공지사항 추가</span>
                        </button>
                    </div>
                </header>

                {isLoading ? (
                    <div className="py-32 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="animate-spin text-indigo-600" size={48} />
                        <p className="text-slate-400 font-bold">공지사항을 불러오는 중...</p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden lg:block bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                    <tr className="text-slate-400 font-black text-[11px] uppercase tracking-widest">
                                        <th className="px-8 py-5 w-[140px]">상태/카테고리</th>
                                        <th className="px-8 py-5">제목</th>
                                        <th className="px-8 py-5 w-[180px]">등록일</th>
                                        <th className="px-8 py-5 w-[120px] text-right">관리</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredNotices.map((notice) => (
                                        <tr key={notice.id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-8 py-5">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black tracking-tight ${notice.category === '안내' ? 'bg-blue-50 text-blue-600' :
                                                    notice.category === '점검' ? 'bg-orange-50 text-orange-600' :
                                                        'bg-purple-50 text-purple-600'
                                                    }`}>
                                                    {notice.category}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <p className="font-bold text-slate-900 line-clamp-1">{notice.title}</p>
                                            </td>
                                            <td className="px-8 py-5">
                                                <p className="text-sm font-bold text-slate-400">{notice.date}</p>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleOpenModal(notice)}
                                                        className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                                                    >
                                                        <Edit3 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(notice)}
                                                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredNotices.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-8 py-20 text-center">
                                                <p className="text-slate-400 font-bold">등록된 공지사항이 없습니다.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="lg:hidden space-y-3">
                            {filteredNotices.map((notice) => (
                                <div key={notice.id} className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm space-y-4">
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
                                <div className="bg-white p-20 rounded-[24px] border border-slate-200 text-center">
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
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModal}
                            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <form onSubmit={handleSubmit}>
                                <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                                    <h2 className="text-xl font-black text-slate-900">
                                        {editingNotice ? '공지사항 수정' : '신규 공지사항 등록'}
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="w-10 h-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="p-8 space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
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
                                </div>

                                <div className="px-8 py-6 bg-slate-50 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="px-6 py-3 text-slate-400 font-bold hover:text-slate-600 transition-colors"
                                    >
                                        취소
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-slate-900 text-white px-10 py-3 rounded-xl font-black text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:bg-slate-700 flex items-center gap-3"
                                    >
                                        {isSubmitting ? (
                                            <><Loader2 size={18} className="animate-spin" /> <span>저장 중...</span></>
                                        ) : (
                                            editingNotice ? '수정 완료' : '등록 완료'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
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
                            className="relative bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl p-8 text-center"
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
