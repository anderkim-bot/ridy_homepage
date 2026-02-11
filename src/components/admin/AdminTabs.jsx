import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutGrid, Bell, Briefcase } from 'lucide-react';
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
    },
    {
        id: 'centers',
        label: '서비스센터 관리',
        path: '/admin/centers',
        icon: LayoutGrid // Placeholder icon
    },
    {
        id: 'cases',
        label: '출고 사례 관리',
        path: '/admin/cases',
        icon: Briefcase
    }

];

const AdminTabs = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="flex bg-slate-200/50 p-1 rounded-2xl w-full">
            {TABS.map((tab) => {
                const isActive = location.pathname === tab.path;
                const Icon = tab.icon;

                return (
                    <button
                        key={tab.id}
                        onClick={() => navigate(tab.path)}
                        className={`relative flex-1 min-w-0 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 py-3 md:py-2.5 rounded-xl text-[11px] md:text-sm font-black transition-all z-10 ${isActive ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'
                            }`}
                    >
                        <Icon size={20} className="md:w-4 md:h-4 w-5 h-5" />
                        <span className="leading-tight text-center">
                            {tab.id === 'centers' ? (
                                <>서비스센터<br className="md:hidden" />관리</>
                            ) : tab.id === 'cases' ? (
                                <>출고사례<br className="md:hidden" />관리</>
                            ) : (
                                <>{tab.label.split(' ')[0]}<br className="md:hidden" />{tab.label.split(' ')[1]}</>
                            )}
                        </span>
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
