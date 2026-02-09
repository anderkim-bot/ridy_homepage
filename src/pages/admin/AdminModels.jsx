import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDropzone } from 'react-dropzone';
import ColorPicker from 'react-best-gradient-color-picker';
import {
    Plus, Search, Trash2, Edit3, X, PackagePlus,
    Palette, Cpu, Gauge, Thermometer, Weight, Star, Info,
    Upload, Check, LayoutGrid, FileText, Pipette, ChevronDown, Monitor,
    ArrowLeft, ArrowRight, GripVertical, GripHorizontal, AlertCircle, Loader2
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { bikeService } from '../../services/bikeService';

// Schema for Validation
const modelSchema = z.object({
    name: z.string().min(2, '기종 이름을 2자 이상 입력해주세요.'),
    slug: z.string().min(2, '슬러그를 2자 이상 입력해주세요.'),
    brand: z.enum(['HONDA', 'YAMAHA', 'ZONTES', 'SUCCESSION']),
    originalBrand: z.string().optional(),
    weight: z.string().optional(),
    category: z.enum(['소형', '중형', '대형', '리스 승계']).optional(),
    engine: z.string().optional(),
    displacement: z.string().optional(),
    cooling: z.string().optional(),
    maxPower: z.string().optional(),
    isPopular: z.boolean().default(false),
    items: z.array(z.object({
        image: z.string().optional(),
        colorHex: z.string().optional(),
        colorName: z.string().optional(),
    })).optional(),
    isCompleted: z.boolean().default(false),
    plateNumber: z.string().optional(),
    year: z.string().optional(),
    mileage: z.string().optional(),
    accidentHistory: z.string().optional(),
    maintenanceStatus: z.string().optional(),
    remainingPeriod: z.string().optional(),
    rentalFee: z.string().default('상담 시 안내'),
    successionFee: z.string().default('0'),
    location: z.string().default('전국'),
    transferMethod: z.string().default('전국 탁송'),
    successionColor: z.string().optional(),
    successionColorHex: z.string().default('#000000'),
    successionImages: z.array(z.string()).default([])
});

const CustomSelect = ({ label, value, options, onChange, darkMode = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div ref={containerRef} className="relative flex flex-col gap-3 md:gap-4 mb-4">
            <label className={`${darkMode ? 'text-slate-400' : 'text-slate-400'} text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] ml-1`}>
                {label}
            </label>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between px-5 md:px-6 py-4 md:py-4.5 rounded-[12px] md:rounded-[14px] cursor-pointer transition-all border outline-none
                    ${darkMode
                        ? 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 focus:ring-2 focus:ring-primary/40'
                        : 'bg-white border-slate-200/30 text-slate-900 hover:border-slate-200 focus:ring-4 focus:ring-primary/5 focus:border-primary/40 shadow-sm'}`}
            >
                <span className="text-[14px] md:text-[15px] font-bold">{selectedOption ? selectedOption.label : '선택해주세요'}</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 5, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className={`absolute z-[100] w-full mt-2 rounded-[14px] md:rounded-[16px] shadow-2xl border overflow-hidden
                            ${darkMode ? 'bg-slate-800 border-white/10' : 'bg-white border-slate-100'}`}
                    >
                        {options.map((opt) => (
                            <div
                                key={opt.value}
                                onClick={() => {
                                    onChange(opt.value);
                                    setIsOpen(false);
                                }}
                                className={`px-6 py-4 text-[13px] md:text-[14px] font-bold cursor-pointer transition-colors
                                    ${darkMode
                                        ? 'text-slate-300 hover:bg-white/10 hover:text-white'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-primary'}`}
                            >
                                {opt.label}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const AdminModels = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [activeTab, setActiveTab] = useState('ALL');
    const [pickerIdx, setPickerIdx] = useState(null);
    const [isSuccessionPickerOpen, setIsSuccessionPickerOpen] = useState(false);
    const [models, setModels] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const loadModels = async () => {
        setIsLoading(true);
        try {
            const data = await bikeService.getBikes();
            setModels(data);
        } catch (error) {
            console.error('Error loading models:', error);
            alert('데이터를 불러오는 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadModels();
    }, []);

    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
        resolver: zodResolver(modelSchema),
        defaultValues: {
            brand: 'HONDA',
            category: '소형',
            isPopular: false,
            rentalFee: '상담 시 안내',
            location: '전국',
            transferMethod: '전국 탁송',
            successionColor: '',
            successionColorHex: '#000000',
            maintenanceStatus: '양호',
            originalBrand: 'HONDA',
            items: Array(5).fill({ image: '', colorHex: '#FFFFFF', colorName: '' }),
            successionImages: [],
            isCompleted: false
        }
    });

    const currentBrand = watch('brand');
    const currentMaintenance = watch('maintenanceStatus');
    const currentOriginalBrand = watch('originalBrand');
    const successionImages = watch('successionImages') || [];

    // Auto-slug and Category logic
    useEffect(() => {
        if (currentBrand === 'SUCCESSION') {
            setValue('category', '리스 승계');
            if (!editingId) {
                const currentSlug = watch('slug');
                if (!currentSlug || currentSlug.startsWith('lease')) {
                    const leaseCount = models.filter(m => m.brand === 'SUCCESSION').length + 1;
                    setValue('slug', `lease${leaseCount}`);
                }
            }
        } else {
            // Auto-slug for regular models (lowercase product name)
            if (!editingId) {
                const name = watch('name');
                if (name) {
                    const generatedSlug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                    setValue('slug', generatedSlug);
                }
            }
        }
    }, [currentBrand, editingId, models, setValue, watch]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const processedData = { ...data };

            // 1. Process standard item images & filter empty ones
            if (processedData.items) {
                const filteredItems = [];
                for (let i = 0; i < processedData.items.length; i++) {
                    let img = processedData.items[i].image;
                    if (img) {
                        if (img.startsWith('data:')) {
                            const file = bikeService.dataURLtoFile(img, `bike-${Date.now()}-${i}.jpg`);
                            img = await bikeService.uploadImage(file, `standard/${processedData.slug}-${i}-${Date.now()}.jpg`);
                        }
                        filteredItems.push({
                            ...processedData.items[i],
                            image: img
                        });
                    }
                }
                processedData.items = filteredItems;
            }

            // 2. Process succession images
            if (processedData.successionImages) {
                const newUrls = [];
                for (let i = 0; i < processedData.successionImages.length; i++) {
                    const img = processedData.successionImages[i];
                    if (img.startsWith('data:')) {
                        const file = bikeService.dataURLtoFile(img, `lease-${Date.now()}-${i}.jpg`);
                        const url = await bikeService.uploadImage(file, `succession/${processedData.slug}-${i}-${Date.now()}.jpg`);
                        newUrls.push(url);
                    } else {
                        newUrls.push(img);
                    }
                }
                processedData.successionImages = newUrls;
            }

            // 3. Save to Local DB
            const savedData = await bikeService.saveBike({
                ...processedData,
                id: editingId
            });

            alert(editingId ? '기종 정보가 성공적으로 업데이트되었습니다.' : '새로운 기종이 성공적으로 등록되었습니다.');
            loadModels();
            closeModal();
        } catch (error) {
            console.error('Error saving model:', error);
            alert(`저장 중 오류가 발생했습니다: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onError = (errors) => {
        console.log('Validation Errors:', errors);
        const firstError = Object.values(errors)[0];
        if (firstError) {
            alert(`입력 정보를 확인해주세요: ${firstError.message}`);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setPickerIdx(null);
        setIsSuccessionPickerOpen(false);
        reset();
    };

    const handleEdit = (model) => {
        setEditingId(model.id);
        const fullItems = model.items ? [...model.items] : [];
        while (fullItems.length < 5) fullItems.push({ image: '', colorHex: '#FFFFFF', colorName: '' });
        reset({
            ...model,
            items: fullItems,
            successionImages: model.successionImages || [],
            maintenanceStatus: model.maintenanceStatus || '양호',
            originalBrand: model.originalBrand || 'HONDA'
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('기종을 삭제하시겠습니까?')) {
            try {
                await bikeService.deleteBike(id);
                loadModels();
            } catch (error) {
                console.error('Error deleting bike:', error);
                alert('삭제 중 오류가 발생했습니다.');
            }
        }
    };

    // Standard single dropzone for model items
    const ImageDropzone = ({ index }) => {
        const onDrop = useCallback(acceptedFiles => {
            const file = acceptedFiles[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    setValue(`items.${index}.image`, reader.result);
                };
                reader.readAsDataURL(file);
            }
        }, [index]);
        const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] }, multiple: false });
        const currentImage = watch(`items.${index}.image`);
        return (
            <div {...getRootProps()} className={`relative w-full aspect-square rounded-[12px] md:rounded-[14px] border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden ${isDragActive ? 'border-primary bg-primary/5' : 'border-slate-200 bg-slate-50 hover:border-primary/40'}`}>
                <input {...getInputProps()} />
                {currentImage ? (
                    <>
                        <img src={currentImage} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-1"><Upload size={18} /></div>
                    </>
                ) : (
                    <>
                        <Upload size={20} className="text-slate-300" />
                        <span className="text-[9px] font-black text-slate-400 mt-1.5 uppercase tracking-tighter">Slot {index + 1}</span>
                    </>
                )}
            </div>
        );
    };

    // Bulk Dropzone Component for Succession
    const SuccessionBulkDropzone = () => {
        const onDrop = useCallback(async acceptedFiles => {
            const currentImages = watch('successionImages') || [];
            if (currentImages.length >= 10) {
                alert('이미지는 최대 10장까지만 업로드 가능합니다.');
                return;
            }

            const remainingCount = 10 - currentImages.length;
            const filesToProcess = acceptedFiles.slice(0, remainingCount);

            const readFiles = filesToProcess.map(file => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                });
            });

            const results = await Promise.all(readFiles);
            const newImages = [...currentImages, ...results].slice(0, 10);
            setValue('successionImages', newImages);
        }, [watch, setValue]);

        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop,
            accept: { 'image/*': [] },
            multiple: true,
            maxFiles: 10
        });

        return (
            <div {...getRootProps()} className={`w-full py-10 md:py-12 border-2 border-dashed rounded-[16px] md:rounded-[20px] transition-all flex flex-col items-center justify-center cursor-pointer gap-4 ${isDragActive ? 'border-primary bg-primary/5' : 'border-slate-200/60 bg-white hover:border-primary/40 shadow-sm'}`}>
                <input {...getInputProps()} />
                <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-100 rounded-[12px] flex items-center justify-center text-slate-400">
                    <Upload size={28} />
                </div>
                <div className="text-center">
                    <p className="text-sm md:text-base font-black text-slate-900">이미지 일괄 업로드</p>
                    <p className="text-[10px] md:text-xs font-bold text-slate-400 mt-0.5 uppercase tracking-wider">Drag & Drop or Multi-Select (Max 10)</p>
                </div>
            </div>
        );
    };

    // Gallery Manager with Drag & Drop Reordering
    const GalleryManager = () => {
        const images = watch('successionImages') || [];

        const removeImage = (index) => {
            const newImages = images.filter((_, i) => i !== index);
            setValue('successionImages', newImages);
        };

        const handleReorder = (newOrder) => {
            setValue('successionImages', newOrder);
        };

        return (
            <div className="space-y-6">
                <SuccessionBulkDropzone />

                <Reorder.Group
                    axis="y"
                    values={images}
                    onReorder={handleReorder}
                    className="space-y-3"
                >
                    <AnimatePresence mode="popLayout">
                        {images.map((img, idx) => (
                            <Reorder.Item
                                key={img.substring(0, 100) + idx}
                                value={img}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="relative bg-white border border-slate-200 rounded-[14px] p-3 flex items-center gap-4 group cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="text-slate-300 group-hover:text-slate-400 transition-colors shrink-0"><GripVertical size={20} /></div>
                                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0"><span className="text-[12px] font-black">{idx + 1}</span></div>
                                <div className="w-14 h-14 md:w-20 md:h-20 rounded-lg overflow-hidden border border-slate-100 shrink-0"><img src={img} className="w-full h-full object-cover" alt="" /></div>
                                <div className="flex-1 flex flex-col"><span className="text-[11px] font-black text-slate-900 uppercase tracking-tighter">{idx === 0 ? 'MAIN THUMBNAIL' : `IMAGE ${idx + 1}`}</span><span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Drag to reorder</span></div>
                                <button type="button" onClick={() => removeImage(idx)} className="w-10 h-10 md:w-11 md:h-11 bg-red-50 text-red-500 rounded-lg flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all shrink-0 active:scale-90"><Trash2 size={18} /></button>
                            </Reorder.Item>
                        ))}
                    </AnimatePresence>
                </Reorder.Group>

                {images.length > 0 && (
                    <div className="p-4 bg-slate-50 rounded-[12px] border border-slate-200/50 flex items-center justify-center gap-2">
                        <Info size={14} className="text-primary" />
                        <p className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-tight">카드를 길게 눌러 드래그하면 순서를 변경할 수 있습니다.</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 lg:p-12 font-sans text-slate-900">
            <div className="max-w-[1500px] mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8 mb-10 md:mb-16">
                    <div className="space-y-3">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-primary rounded-[14px] flex items-center justify-center shadow-lg shadow-primary/20"><PackagePlus className="text-white w-6 h-6 md:w-8 md:h-8" /></div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 leading-none">Ridy Console</h1>
                                <p className="text-[10px] md:text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Model & Succession Manager</p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            reset({
                                brand: 'HONDA',
                                category: '소형',
                                isPopular: false,
                                rentalFee: '상담 시 안내',
                                location: '전국',
                                transferMethod: '전국 탁송',
                                successionColor: '',
                                successionColorHex: '#000000',
                                maintenanceStatus: '양호',
                                originalBrand: 'HONDA',
                                items: Array(5).fill({ image: '', colorHex: '#FFFFFF', colorName: '' }),
                                successionImages: [],
                                isCompleted: false,
                                name: '',
                                slug: '',
                                weight: '',
                                displacement: '',
                                engine: '',
                                cooling: '',
                                maxPower: ''
                            });
                            setEditingId(null);
                            setIsModalOpen(true);
                        }}
                        className="w-full md:w-auto flex items-center justify-center gap-4 bg-slate-900 text-white px-8 py-4 md:py-4.5 rounded-[12px] md:rounded-[16px] font-black text-sm md:text-base transition-all hover:bg-slate-800 hover:scale-[1.02] active:scale-95 shadow-xl shadow-slate-900/10"
                    >
                        <Plus size={20} />
                        <span>신규 기종 추가</span>
                    </button>
                </header>

                <div className="overflow-x-auto pb-4 mb-8 md:mb-12 no-scrollbar">
                    <div className="flex p-1.5 bg-white rounded-[16px] md:rounded-[20px] shadow-sm border border-slate-200 w-max">
                        {['ALL', 'HONDA', 'YAMAHA', 'ZONTES', 'SUCCESSION'].map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)} className={`min-w-[90px] md:min-w-[110px] py-3 md:py-3.5 px-4 md:px-6 rounded-[10px] md:rounded-[14px] text-xs md:text-sm font-black transition-all ${activeTab === tab ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10' : 'text-slate-400 hover:text-slate-600'}`}>
                                {tab === 'ALL' ? '전체 보기' : (tab === 'SUCCESSION' ? '리스 승계' : tab)}
                            </button>
                        ))}
                    </div>
                </div>

                {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 size={40} className="text-primary animate-spin" />
                        <p className="text-slate-400 font-bold">데이터를 불러오는 중...</p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden md:block bg-white rounded-[20px] md:rounded-[24px] shadow-sm border border-slate-200 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50 border-b border-slate-100"><tr className="text-slate-400 font-bold text-[11px] uppercase tracking-[0.2em]"><th className="px-8 py-6">Model & Identity</th><th className="px-8 py-6">Classification</th><th className="px-8 py-6 text-right">Settings</th></tr></thead>
                                <tbody className="divide-y divide-slate-100">
                                    {models.filter(m => activeTab === 'ALL' || m.brand === activeTab).map(model => (
                                        <tr key={model.id} className="group hover:bg-slate-50/30 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-14 h-14 rounded-[12px] bg-slate-100 overflow-hidden border border-slate-200 shrink-0"><img src={model.brand === 'SUCCESSION' ? (model.succession_images?.[0] || model.successionImages?.[0]) : model.items?.[0]?.image} className="w-full h-full object-cover" alt="" /></div>
                                                    <div className="flex flex-col"><span className="text-lg font-black text-slate-900">{model.name}</span><span className="text-[11px] font-mono font-bold text-primary tracking-tighter mt-0.5">/{model.slug}</span></div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col gap-1">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black tracking-widest uppercase w-fit ${model.brand === 'SUCCESSION' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'}`}>
                                                        {model.brand}
                                                    </span>
                                                    {model.brand === 'SUCCESSION' && (model.originalBrand || model.original_brand) && (
                                                        <span className="text-[10px] font-bold text-slate-400 ml-1">Brand: {model.originalBrand || model.original_brand}</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6"><div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => handleEdit(model)} className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-primary hover:border-primary transition-all flex items-center justify-center"><Edit3 size={16} /></button><button onClick={() => handleDelete(model.id)} className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-500 transition-all flex items-center justify-center"><Trash2 size={16} /></button></div></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden space-y-3">
                            {models.filter(m => activeTab === 'ALL' || m.brand === activeTab).map(model => (
                                <div key={model.id} className="bg-white p-4 rounded-[20px] border border-slate-200 shadow-sm flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-[12px] bg-slate-100 overflow-hidden border border-slate-100 shrink-0"><img src={model.brand === 'SUCCESSION' ? (model.succession_images?.[0] || model.successionImages?.[0]) : model.items?.[0]?.image} className="w-full h-full object-cover" alt="" /></div>
                                    <div className="flex-1 min-w-0"><div className="flex flex-col"><span className="text-base font-black text-slate-900 truncate">{model.name}</span><div className="flex items-center gap-2 mt-1"><span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[8px] font-black tracking-widest uppercase ${model.brand === 'SUCCESSION' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'}`}>{model.brand}</span><span className="text-[9px] font-bold text-slate-400 truncate">/{model.slug}</span></div></div></div>
                                    <div className="flex gap-2"><button onClick={() => handleEdit(model)} className="w-9 h-9 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center active:bg-primary/10 active:text-primary transition-colors"><Edit3 size={16} /></button><button onClick={() => handleDelete(model.id)} className="w-9 h-9 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center active:bg-red-50 active:text-red-500 transition-colors"><Trash2 size={16} /></button></div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-6 lg:p-10">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={!isSubmitting ? closeModal : undefined} className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl" />
                        <motion.div initial={{ opacity: 0, y: "100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "100%" }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="relative bg-white w-full max-w-7xl h-[95vh] md:h-[90vh] rounded-t-[20px] md:rounded-[24px] shadow-2xl flex flex-col overflow-hidden" >
                            <div className="px-6 md:px-10 py-5 md:py-6 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
                                <div className="flex items-center gap-4"><div className={`w-11 h-11 md:w-12 md:h-12 rounded-[12px] flex items-center justify-center ${currentBrand === 'SUCCESSION' ? 'bg-amber-500 text-white' : 'bg-primary text-white'}`}><PackagePlus size={22} /></div><div><h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-none">{currentBrand === 'SUCCESSION' ? '리스 승계 관리' : '기종 관리'}</h2><p className="text-[10px] md:text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{editingId ? 'Edit' : 'New'} Entry</p></div></div>
                                <button onClick={!isSubmitting ? closeModal : undefined} className="w-10 h-10 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center text-slate-400 transition-all"><X size={20} /></button>
                            </div>

                            <form id="model-form" onSubmit={handleSubmit(onSubmit, onError)} className="flex-1 overflow-y-auto custom-scrollbar">
                                <div className="grid grid-cols-1 lg:grid-cols-12">
                                    <div className="lg:col-span-12 xl:col-span-7 p-6 md:p-10 lg:pb-32 space-y-10 border-r border-slate-50">
                                        <section className="space-y-8">
                                            <div className="flex items-center gap-3"><div className="w-1 h-5 bg-primary rounded-full" /><h3 className="text-[11px] md:text-[12px] font-black text-slate-900 uppercase tracking-widest">Classification</h3></div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                                <div className="col-span-1"><CustomSelect label="Category Agency" value={currentBrand} options={[{ label: 'HONDA (혼다)', value: 'HONDA' }, { label: 'YAMAHA (야마하)', value: 'YAMAHA' }, { label: 'ZONTES (존테스)', value: 'ZONTES' }, { label: '리스 승계 (SUCCESSION)', value: 'SUCCESSION' }]} onChange={(val) => setValue('brand', val)} /></div>
                                                {currentBrand === 'SUCCESSION' ? (
                                                    <div className="col-span-1"><CustomSelect label="Original Brand" value={currentOriginalBrand} options={[{ label: 'HONDA', value: 'HONDA' }, { label: 'YAMAHA', value: 'YAMAHA' }, { label: 'ZONTES', value: 'ZONTES' }, { label: 'OTHER', value: 'OTHER' }]} onChange={(val) => setValue('originalBrand', val)} /></div>
                                                ) : (
                                                    <div className="col-span-1"><CustomSelect label="Classification" value={watch('category')} options={[{ label: '소형', value: '소형' }, { label: '중형', value: '중형' }, { label: '대형', value: '대형' }]} onChange={(val) => setValue('category', val)} /></div>
                                                )}
                                            </div>
                                        </section>
                                        <section className="space-y-8">
                                            <div className="flex items-center gap-3"><div className="w-1 h-5 bg-slate-300 rounded-full" /><h3 className="text-[11px] md:text-[12px] font-black text-slate-900 uppercase tracking-widest">General Information</h3></div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                                <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
                                                    <label className="cms-label">Model Name / Title</label>
                                                    <input {...register('name')} className={`cms-input ${errors.name ? 'border-red-500 bg-red-50/30' : ''}`} placeholder="ex) HONDA PCX 125" />
                                                    {errors.name && <span className="text-[10px] font-bold text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.name.message}</span>}
                                                </div>
                                                <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
                                                    <label className="cms-label">URL Identifier (Slug)</label>
                                                    <input {...register('slug')} className={`cms-input font-mono text-sm ${errors.slug ? 'border-red-500 bg-red-50/30' : ''}`} placeholder="pcx-125-2024" />
                                                    {errors.slug && <span className="text-[10px] font-bold text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.slug.message}</span>}
                                                </div>
                                            </div>
                                        </section>
                                        {/* Specification Section */}
                                        <section className="space-y-8 p-6 md:p-10 bg-slate-900 rounded-[20px] md:rounded-[24px] text-white shadow-2xl shadow-slate-900/20">
                                            <div className="flex items-center gap-3"><Cpu size={16} className="text-primary" /><h3 className="text-[11px] md:text-[12px] font-black text-slate-300 uppercase tracking-widest">Specifications</h3></div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                                {currentBrand === 'SUCCESSION' ? (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 w-full">
                                                        <div className="col-span-1 md:col-span-2"><CustomSelect label="승계 진행 상태" value={watch('isCompleted') ? 'yes' : 'no'} options={[{ label: '승계 완료 (Completed)', value: 'yes' }, { label: '진행 중 (Available)', value: 'no' }]} onChange={(val) => setValue('isCompleted', val === 'yes')} darkMode={true} /></div>
                                                        <div className="flex flex-col gap-3 mb-2"><label className="su-label">차량번호</label><input {...register('plateNumber')} className="su-input" placeholder="예) 서울 강동 타 1234" /></div>
                                                        <div className="flex flex-col gap-3 mb-2"><label className="su-label">연식</label><input {...register('year')} className="su-input" placeholder="예) 25년" /></div>
                                                        <div className="flex flex-col gap-3 mb-2"><label className="su-label">주행거리</label><input {...register('mileage')} className="su-input" placeholder="예) 1234km" /></div>
                                                        <div className="flex flex-col gap-3 mb-2"><label className="su-label">잔여 계약 기간</label><input {...register('remainingPeriod')} className="su-input" placeholder="예) 123일" /></div>
                                                        <div className="col-span-1 md:col-span-2 flex flex-col gap-3 mb-2"><label className="su-label">사고이력</label><textarea {...register('accidentHistory')} className="su-input min-h-[80px] py-4" placeholder="사고 이력을 상세히 입력해주세요." /></div>
                                                        <div className="col-span-1 md:col-span-2"><CustomSelect label="정비/소모품 상태" value={currentMaintenance} darkMode={true} options={[{ label: '새상품급', value: '새상품급' }, { label: '매우 양호', value: '매우 양호' }, { label: '양호', value: '양호' }, { label: '사용감 있음', value: '사용감 있음' }, { label: '교환 필요', value: '교환 필요' }]} onChange={(val) => setValue('maintenanceStatus', val)} /></div>
                                                        <div className="flex flex-col gap-3 mb-2"><label className="su-label">색상 이름</label><input {...register('successionColor')} className="su-input" placeholder="예) 블랙" /></div>
                                                        <div className="flex flex-col gap-3 mb-2">
                                                            <label className="su-label">색상 피커</label>
                                                            <div className="flex items-center gap-4 su-input cursor-pointer" onClick={() => setIsSuccessionPickerOpen(true)}>
                                                                <div className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: watch('successionColorHex') }} />
                                                                <span className="font-mono text-sm uppercase">{watch('successionColorHex')}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="flex flex-col gap-3 mb-2"><label className="su-label">차량중량 (KG)</label><input {...register('weight')} className="su-input" placeholder="예) 186" /></div>
                                                        <div className="flex flex-col gap-3 mb-2"><label className="su-label">배기량 (CC)</label><input {...register('displacement')} className="su-input" placeholder="예) 125cc" /></div>
                                                        <div className="flex flex-col gap-3 mb-2"><label className="su-label">엔진</label><input {...register('engine')} className="su-input" placeholder="엔진 형식을 입력하세요" /></div>
                                                        <div className="flex flex-col gap-3 mb-2"><label className="su-label">냉각방식</label><input {...register('cooling')} className="su-input" /></div>
                                                        <div className="flex flex-col gap-3 mb-2"><label className="su-label">최고출력 (PS/RPM)</label><input {...register('maxPower')} className="su-input" /></div>
                                                        <div className="col-span-1 md:col-span-2"><CustomSelect label="인기상품 노출" value={watch('isPopular') ? 'yes' : 'no'} options={[{ label: '인기상품으로 노출 (YES)', value: 'yes' }, { label: '일반 기종 (NO)', value: 'no' }]} onChange={(val) => setValue('isPopular', val === 'yes')} darkMode={true} /></div>
                                                    </>
                                                )}
                                            </div>
                                        </section>
                                    </div>
                                    <div className="lg:col-span-12 xl:col-span-5 p-6 md:p-10 bg-slate-50/50 space-y-10">
                                        <div className="flex items-center gap-3"><Palette size={16} className="text-primary" /><h3 className="text-[11px] md:text-[12px] font-black text-slate-900 uppercase tracking-widest">Visual Assets (Images & Colors)</h3></div>
                                        {currentBrand === 'SUCCESSION' ? <GalleryManager /> : (
                                            <div className="space-y-4">
                                                <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex gap-3 text-blue-600">
                                                    <Info size={16} className="mt-0.5" />
                                                    <p className="text-[11px] font-bold leading-relaxed uppercase tracking-tight">이미지를 등록하지 않은 컬러 세트는 홈페이지에 노출되지 않습니다. (최대 5개)</p>
                                                </div>
                                                {[0, 1, 2, 3, 4].map(idx => (
                                                    <div key={idx} className="p-4 bg-white border border-slate-200/20 rounded-[16px] flex items-center gap-5 shadow-sm">
                                                        <div className="w-16 h-16 shrink-0"><ImageDropzone index={idx} /></div>
                                                        <div className="flex-1 space-y-3">
                                                            <div className="flex flex-col gap-1.5">
                                                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Color Name {idx + 1}</label>
                                                                <input {...register(`items.${idx}.colorName`)} placeholder="ex) Pearl White" className="cms-input !py-2.5 !text-[12px] !bg-slate-50 border-none" />
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex flex-col gap-1.5 flex-1">
                                                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Color Picker</label>
                                                                    <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg">
                                                                        <button type="button" onClick={() => setPickerIdx(idx)} className="w-7 h-7 rounded-md shadow-md transition-transform hover:scale-110" style={{ backgroundColor: watch(`items.${idx}.colorHex`) }} />
                                                                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">{watch(`items.${idx}.colorHex`)}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </form>
                            <div className="px-6 md:px-10 py-5 border-t border-slate-100 bg-white flex flex-col md:flex-row justify-end gap-3 shrink-0">
                                <button type="button" onClick={closeModal} disabled={isSubmitting} className="order-2 md:order-1 px-8 py-3.5 rounded-lg text-slate-400 font-black text-sm hover:bg-slate-50 transition-all disabled:opacity-50">취소</button>
                                <button form="model-form" type="submit" disabled={isSubmitting} className="order-1 md:order-2 bg-slate-900 text-white px-10 py-3.5 rounded-lg font-black text-sm transition-all hover:bg-slate-800 active:scale-95 shadow-xl shadow-slate-900/10 uppercase tracking-wider flex items-center gap-3 disabled:bg-slate-700">
                                    {isSubmitting ? <><Loader2 size={18} className="animate-spin" /><span>저장 중...</span></> : <span>{editingId ? '업데이트' : '등록 완료 (PUBLISH)'}</span>}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Succession Color Picker */}
            <AnimatePresence>{isSuccessionPickerOpen && (<div className="fixed inset-0 z-[300] flex items-center justify-center p-4"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSuccessionPickerOpen(false)} className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" /><motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white p-6 md:p-8 rounded-[20px] shadow-2xl w-full max-w-[400px] flex flex-col items-center gap-6"><div className="w-full flex justify-between items-center bg-slate-50 px-5 py-3.5 rounded-xl"><div className="flex items-center gap-3"><Pipette size={14} className="text-primary" /><h4 className="text-base font-black tracking-tight text-slate-900">Color Spectrum</h4></div><button onClick={() => setIsSuccessionPickerOpen(false)} className="text-slate-400 hover:text-slate-900"><X size={16} /></button></div><ColorPicker value={watch('successionColorHex')} onChange={(val) => setValue('successionColorHex', val)} hideGradient hideOpacity width={260} height={160} /><div className="w-full grid grid-cols-2 gap-4"><div className="space-y-1"><span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Hex</span><input value={watch('successionColorHex')} onChange={(e) => setValue('successionColorHex', e.target.value)} className="w-full bg-slate-100 border-none rounded-lg p-3 font-mono font-black text-center text-sm text-slate-900 outline-none focus:ring-2 focus:ring-primary/20" /></div><button onClick={() => setIsSuccessionPickerOpen(false)} className="h-fit self-end bg-slate-900 text-white font-black py-3 rounded-lg shadow-lg active:scale-95 text-sm uppercase tracking-widest">Done</button></div></motion.div></div>)}</AnimatePresence>

            {/* Standard Item Color Picker */}
            <AnimatePresence>{pickerIdx !== null && (<div className="fixed inset-0 z-[300] flex items-center justify-center p-4"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPickerIdx(null)} className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" /><motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white p-6 md:p-8 rounded-[20px] shadow-2xl w-full max-w-[400px] flex flex-col items-center gap-6"><div className="w-full flex justify-between items-center bg-slate-50 px-5 py-3.5 rounded-xl"><div className="flex items-center gap-3"><Pipette size={14} className="text-primary" /><h4 className="text-base font-black tracking-tight text-slate-900">Color Spectrum {pickerIdx + 1}</h4></div><button onClick={() => setPickerIdx(null)} className="text-slate-400 hover:text-slate-900"><X size={16} /></button></div><ColorPicker value={watch(`items.${pickerIdx}.colorHex`)} onChange={(val) => setValue(`items.${pickerIdx}.colorHex`, val)} hideGradient hideOpacity width={260} height={160} /><div className="w-full grid grid-cols-2 gap-4"><div className="space-y-1"><span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Hex</span><input value={watch(`items.${pickerIdx}.colorHex`)} onChange={(e) => setValue(`items.${pickerIdx}.colorHex`, e.target.value)} className="w-full bg-slate-100 border-none rounded-lg p-3 font-mono font-black text-center text-sm text-slate-900 outline-none focus:ring-2 focus:ring-primary/20" /></div><button onClick={() => setPickerIdx(null)} className="h-fit self-end bg-slate-900 text-white font-black py-3 rounded-lg shadow-lg active:scale-95 text-sm uppercase tracking-widest">Done</button></div></motion.div></div>)}</AnimatePresence>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); border-radius: 999px; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default AdminModels;
