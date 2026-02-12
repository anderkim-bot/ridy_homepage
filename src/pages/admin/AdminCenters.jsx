import React, { useState, useEffect, useRef } from 'react';
import {
    Plus, Search, Trash2, Edit3, X, Building2,
    MapPin, Phone, Clock, Loader2, Info, Upload,
    Tag, Map as MapIcon, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminTabs from '../../components/admin/AdminTabs';
import { centerService } from '../../services/centerService';

const SouthKoreaMap = ({ onSelect, selectedLocation, isEditable = true }) => {
    const svgRef = useRef(null);
    const [viewBox, setViewBox] = useState({ width: 3409.59, height: 3635.76 });

    const handleMapClick = (e) => {
        if (!isEditable) return;
        const svg = svgRef.current;
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const cursorpt = pt.matrixTransform(svg.getScreenCTM().inverse());
        onSelect({ x: Math.round(cursorpt.x), y: Math.round(cursorpt.y) });
    };

    return (
        <div className="relative w-full aspect-3409/3635 bg-slate-50 rounded-xl overflow-hidden border border-slate-200 cursor-crosshair group">

            <svg
                ref={svgRef}
                viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
                onClick={handleMapClick}
                className="w-full h-full"
            >
                {/* Simplified Map Background - Using the actual paths would be ideal but for UI we use a placeholder or the provided SVG structure */}
                <rect width="100%" height="100%" fill="#f1f5f9" />

                {/* Embed the map SVG content here or use an image if easier, but for interaction SVG is best */}
                {/* For now, I'll include a placeholder text and rely on the user to provide the SVG paths if they want the full map background */}
                <image
                    href="/src/components/svg/map.svg"
                    width="100%"
                    height="100%"
                    style={{ opacity: 0.8 }}
                />

                {selectedLocation && (
                    <g transform={`translate(${selectedLocation.x}, ${selectedLocation.y})`}>
                        <circle r="40" fill="#4f46e5" className="animate-pulse" />
                        <circle r="20" fill="white" />
                        <MapPin
                            x="-30" y="-70" width="60" height="60"
                            className="text-indigo-600 drop-shadow-md"
                        />
                    </g>
                )}
            </svg>
            {isEditable && (
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm pointer-events-none">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">지도 클릭하여 위치 지정</p>
                </div>
            )}
        </div>
    );
};

const AdminCenters = () => {
    const [centers, setCenters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCenter, setEditingCenter] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        detailAddress: '',
        phone: '',
        openTime: '09:00',
        closeTime: '18:00',
        services: [],
        image: '',
        location: null
    });
    const [newService, setNewService] = useState('');

    useEffect(() => {
        fetchCenters();
    }, []);

    const fetchCenters = async () => {
        setIsLoading(true);
        const data = await centerService.getCenters();
        setCenters(data);
        setIsLoading(false);
    };

    const handleOpenModal = (center = null) => {
        if (center) {
            setFormData({
                ...center,
                openTime: center.hours?.split(' - ')[0] || '09:00',
                closeTime: center.hours?.split(' - ')[1] || '18:00'
            });
        } else {
            setEditingCenter(null);
            setFormData({
                name: '',
                address: '',
                detailAddress: '',
                phone: '',
                openTime: '09:00',
                closeTime: '18:00',
                services: [],
                image: '',
                location: null
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCenter(null);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const url = await centerService.uploadImage(file);
            setFormData(prev => ({ ...prev, image: url }));
        } catch (error) {
            alert('이미지 업로드에 실패했습니다.');
        }
    };

    const handleAddService = () => {
        if (!newService.trim()) return;
        setFormData(prev => ({
            ...prev,
            services: [...prev.services, newService.trim()]
        }));
        setNewService('');
    };

    const handleRemoveService = (index) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const finalData = {
                ...formData,
                hours: `${formData.openTime} - ${formData.closeTime}`
            };
            await centerService.saveCenter(finalData);
            fetchCenters();
            handleCloseModal();
        } catch (error) {
            alert('저장에 실패했습니다.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            await centerService.deleteCenter(id);
            fetchCenters();
        }
    };

    const filteredCenters = centers.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 lg:p-12 font-sans text-slate-900 overflow-x-hidden">
            <div className="max-w-[1500px] mx-auto">

                <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-8 mb-10 lg:mb-16">
                    <div className="space-y-3">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                                <Building2 className="text-white w-6 h-6 lg:w-8 lg:h-8" />
                            </div>
                            <div className="shrink-0 flex flex-col whitespace-nowrap">
                                <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-slate-900 leading-none">서비스센터 관리</h1>
                                <p className="text-[10px] lg:text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Service Center Manager</p>
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
                                placeholder="센터명 검색"
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
                            <span>신규 센터 추가</span>
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
                                        <th className="px-8 py-6">Center Hub & Location</th>
                                        <th className="px-8 py-6">Services</th>
                                        <th className="px-8 py-6">Contact Info</th>
                                        <th className="px-8 py-6 text-right">Settings</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredCenters.map((center) => (
                                        <tr key={center.id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
                                                        {center.image ? (
                                                            <img src={center.image} alt={center.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                                <Building2 size={24} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-base font-black text-slate-900">{center.name}</span>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <MapPin size={12} className="text-slate-400" />
                                                            <span className="text-[11px] font-bold text-slate-400 truncate max-w-[200px]">{center.address} {center.detailAddress}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-wrap gap-1">
                                                    {center.services.map((s, i) => (
                                                        <span key={i} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-[10px] font-black uppercase tracking-tighter">#{s}</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <Phone size={12} className="text-indigo-600" />
                                                        <span className="text-[13px] font-bold text-slate-700">{center.phone}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock size={12} className="text-slate-400" />
                                                        <span className="text-[11px] font-medium text-slate-500">{center.hours}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleOpenModal(center)}
                                                        className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:border-primary hover:text-primary transition-all shadow-sm active:scale-95"
                                                    >
                                                        <Edit3 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(center.id)}
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
                            {filteredCenters.map((center) => (
                                <div key={center.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
                                                {center.image ? (
                                                    <img src={center.image} alt={center.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                        <Building2 size={24} />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black text-slate-900">{center.name}</h3>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <MapPin size={12} className="text-slate-400" />
                                                    <span className="text-[11px] font-bold text-slate-400 truncate max-w-[200px]">{center.address}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleOpenModal(center)}
                                                className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center active:scale-90 transition-all"
                                            >
                                                <Edit3 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(center.id)}
                                                className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center active:scale-90 transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5">
                                        {center.services.map((s, i) => (
                                            <span key={i} className="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-tight">#{s}</span>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contact</p>
                                            <div className="flex items-center gap-2">
                                                <Phone size={12} className="text-indigo-600" />
                                                <span className="text-xs font-bold text-slate-700">{center.phone}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hours</p>
                                            <div className="flex items-center gap-2">
                                                <Clock size={12} className="text-slate-400" />
                                                <span className="text-xs font-medium text-slate-500">{center.hours}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                )}

                {/* Modal */}
                <AnimatePresence>
                    {isModalOpen && (
                        <div className="fixed inset-0 z-100 flex items-end md:items-center justify-center p-0 md:p-6 lg:p-10">
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
                                className="relative bg-white w-full max-w-5xl h-[95vh] md:h-auto rounded-t-3xl md:rounded-[32px] overflow-hidden shadow-2xl flex flex-col"
                            >
                                <div className="px-6 md:px-10 py-5 md:py-6 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-11 h-11 md:w-12 md:h-12 rounded-[14px] bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20">
                                            <Building2 size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-fluid-xl font-black text-slate-900 tracking-tight leading-none">{editingCenter ? '센터 정보 수정' : '신규 센터 등록'}</h2>
                                            <p className="text-fluid-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Service Center Details</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleCloseModal}
                                        className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all active:scale-90"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                                    <form id="center-form" onSubmit={handleSubmit} className="space-y-10">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                            {/* Left Column: Basic Info */}
                                            <div className="space-y-8">
                                                <div className="space-y-4">
                                                    <h3 className="text-fluid-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                                        <Info size={16} className="text-indigo-600" />
                                                        기본 정보
                                                    </h3>
                                                    <div className="grid grid-cols-1 gap-4">
                                                        <div className="space-y-1.5">
                                                            <label className="text-fluid-xs font-black text-slate-400 ml-1">센터명</label>
                                                            <input
                                                                type="text"
                                                                required
                                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-fluid-sm font-bold focus:bg-white focus:border-indigo-600 outline-none transition-all"
                                                                value={formData.name}
                                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                                placeholder="강동점"
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className="text-fluid-xs font-black text-slate-400 ml-1">주소</label>
                                                            <input
                                                                type="text"
                                                                required
                                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-fluid-sm font-bold focus:bg-white focus:border-indigo-600 outline-none transition-all"
                                                                value={formData.address}
                                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                                placeholder="서울 강동구 풍성로 147-5"
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className="text-fluid-xs font-black text-slate-400 ml-1">상세주소 (선택)</label>
                                                            <input
                                                                type="text"
                                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-fluid-sm font-bold focus:bg-white focus:border-indigo-600 outline-none transition-all"
                                                                value={formData.detailAddress}
                                                                onChange={(e) => setFormData({ ...formData, detailAddress: e.target.value })}
                                                                placeholder="1층"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <h3 className="text-fluid-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                                        <Phone size={16} className="text-indigo-600" />
                                                        연락처 및 운영시간
                                                    </h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-1.5">
                                                            <label className="text-fluid-xs font-black text-slate-400 ml-1">전화번호</label>
                                                            <input
                                                                type="text"
                                                                required
                                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-fluid-sm font-bold focus:bg-white focus:border-indigo-600 outline-none transition-all"
                                                                value={formData.phone}
                                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                                placeholder="02-1234-5678"
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className="text-fluid-xs font-black text-slate-400 ml-1">운영시간</label>
                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                    type="time"
                                                                    required
                                                                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-fluid-sm font-bold focus:bg-white focus:border-indigo-600 outline-none transition-all"
                                                                    value={formData.openTime}
                                                                    onChange={(e) => setFormData({ ...formData, openTime: e.target.value })}
                                                                />
                                                                <span className="text-slate-400 font-bold">~</span>
                                                                <input
                                                                    type="time"
                                                                    required
                                                                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-fluid-sm font-bold focus:bg-white focus:border-indigo-600 outline-none transition-all"
                                                                    value={formData.closeTime}
                                                                    onChange={(e) => setFormData({ ...formData, closeTime: e.target.value })}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                                        <Tag size={16} className="text-indigo-600" />
                                                        제공 서비스 태그
                                                    </h3>
                                                    <div className="space-y-3">
                                                        <div className="flex gap-2">
                                                            <input
                                                                type="text"
                                                                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:border-indigo-600 outline-none transition-all"
                                                                value={newService}
                                                                onChange={(e) => setNewService(e.target.value)}
                                                                placeholder="예: 화장실, 와이파이"
                                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddService())}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={handleAddService}
                                                                className="px-6 bg-slate-900 text-white rounded-xl font-bold text-fluid-sm hover:bg-slate-800 transition-all"
                                                            >
                                                                추가
                                                            </button>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {formData.services.map((s, i) => (
                                                                <span key={i} className="group px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-black flex items-center gap-2">
                                                                    #{s}
                                                                    <button type="button" onClick={() => handleRemoveService(i)} className="hover:text-red-500 transition-colors"><X size={14} /></button>
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Column: Visual Info */}
                                            <div className="space-y-8">
                                                <div className="space-y-4">
                                                    <h3 className="text-fluid-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                                        <MapIcon size={16} className="text-indigo-600" />
                                                        위치 지정 (South Korea Map)
                                                    </h3>
                                                    <SouthKoreaMap
                                                        selectedLocation={formData.location}
                                                        onSelect={(loc) => setFormData({ ...formData, location: loc })}
                                                    />
                                                </div>

                                                <div className="space-y-4">
                                                    <h3 className="text-fluid-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                                        <Upload size={16} className="text-indigo-600" />
                                                        센터 이미지
                                                    </h3>
                                                    <div className="relative group aspect-video bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden cursor-pointer hover:border-indigo-600 transition-all">
                                                        {formData.image ? (
                                                            <>
                                                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                                                    <label className="cursor-pointer bg-white text-slate-900 px-4 py-2 rounded-lg font-bold text-fluid-sm hover:scale-105 transition-all flex items-center gap-2 shadow-lg">
                                                                        <Edit3 size={16} /> 변경
                                                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                                                    </label>
                                                                    <button type="button" onClick={() => setFormData({ ...formData, image: '' })} className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-fluid-sm hover:scale-105 transition-all flex items-center gap-2 shadow-lg">
                                                                        <Trash2 size={16} /> 삭제
                                                                    </button>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <label className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center cursor-pointer">
                                                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 mb-4 group-hover:scale-110 transition-transform duration-500">
                                                                    <Plus size={24} />
                                                                </div>
                                                                <p className="text-fluid-sm font-black text-slate-900">클릭하여 이미지 업로드</p>
                                                                <p className="text-[11px] font-bold text-slate-400 mt-1">추천 사이즈: 16:9 비율</p>
                                                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                                            </label>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div className="px-6 md:px-10 py-5 border-t border-slate-100 bg-white flex flex-col md:flex-row justify-end gap-3 shrink-0">
                                    <button type="button" onClick={handleCloseModal} className="order-2 md:order-1 px-8 py-3.5 rounded-lg text-slate-400 font-black text-sm hover:bg-slate-50 transition-all flex items-center justify-center">취소</button>
                                    <button form="center-form" type="submit" className="order-1 md:order-2 bg-indigo-600 text-white px-10 py-3.5 rounded-lg font-black text-fluid-sm hover:bg-indigo-700 transition-all active:scale-95 shadow-xl shadow-indigo-600/10 uppercase tracking-widest flex items-center justify-center gap-3">
                                        <span>{editingCenter ? '수정 사항 저장' : '새 서비스센터 등록'}</span>
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
};

export default AdminCenters;
