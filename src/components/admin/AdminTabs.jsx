import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutGrid, Bell, Briefcase, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const TABS = [
    {
        id: 'models',
        label: '기종 관리',
        mobileLabel: '기종',
        path: '/admin/models',
        icon: LayoutGrid
    },
    {
        id: 'notices',
        label: '공지사항 관리',
        mobileLabel: '공지',
        path: '/admin/notices',
        icon: Bell
    },
    {
        id: 'centers',
        label: '서비스센터 관리',
        mobileLabel: '서비스센터',
        path: '/admin/centers',
        icon: LayoutGrid // Placeholder icon
    },
    {
        id: 'cases',
        label: '출고 사례 관리',
        mobileLabel: '출고',
        path: '/admin/cases',
        icon: Briefcase
    },
    {
        id: 'popups',
        label: '팝업 관리',
        mobileLabel: '팝업',
        path: '/admin/popups',
        icon: Layers
    }
];

const AdminTabs = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="w-full md:w-auto overflow-x-auto scrollbar-hide pb-1.5 md:pb-0">
            <div className="flex md:inline-flex bg-slate-200/50 p-1 rounded-2xl w-[calc(100vw-32px)] md:w-auto md:min-w-0">

                {TABS.map((tab) => {
                    const isActive = location.pathname === tab.path;
                    const Icon = tab.icon;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => navigate(tab.path)}
                            className={`relative flex-1 md:flex-none flex items-center justify-center gap-1 md:gap-2 px-1 md:px-8 py-2.5 rounded-xl text-[10px] md:text-sm font-black transition-all whitespace-nowrap z-10 ${isActive ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'
                                }`}
                        >
                            <Icon size={12} className="md:w-4 md:h-4" />

                            <span className="md:hidden">{tab.mobileLabel}</span>
                            <span className="hidden md:inline">{tab.label}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="admin-tab-active"
                                    className="absolute inset-0 bg-white rounded-xl shadow-sm -z-10"
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>

    );
};

export default AdminTabs;
