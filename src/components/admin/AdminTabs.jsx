import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutGrid, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const TABS = [
    {
        id: 'models',
        label: '기종 관리',
        path: '/admin/models',
        icon: LayoutGrid
    },
    {
        id: 'notices',
        label: '공지사항 관리',
        path: '/admin/notices',
        icon: Bell
    }
];

const AdminTabs = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="inline-flex bg-slate-200/50 p-1 rounded-2xl">
            {TABS.map((tab) => {
                const isActive = location.pathname === tab.path;
                const Icon = tab.icon;

                return (
                    <button
                        key={tab.id}
                        onClick={() => navigate(tab.path)}
                        className={`relative flex-1 flex items-center justify-center gap-2 px-8 py-2.5 rounded-xl text-sm font-black transition-all whitespace-nowrap z-10 ${isActive ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'
                            }`}
                    >
                        <Icon size={16} />
                        {tab.label}
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
    );
};

export default AdminTabs;
