import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductTabs = ({ activeBrand }) => {
    const tabs = [
        { name: '혼다', id: 'HONDA', href: '/product/honda' },
        { name: '야마하', id: 'YAMAHA', href: '/product/yamaha' },
        { name: '존테스', id: 'ZONTES', href: '/product/zontes' },
        { name: '리스 승계', id: 'SUCCESSION', href: '/product/succession' },
    ];

    return (
        <div className="sticky top-space-3xl md:top-[80px] z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 mb-12">
            <div className="container px-4">
                <div className="flex items-center gap-8 overflow-x-auto no-scrollbar scroll-smooth py-4">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.id}
                            to={tab.href}
                            className={`relative px-1 py-2 text-sm font-black whitespace-nowrap transition-colors ${activeBrand === tab.id ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            {tab.name}
                            {activeBrand === tab.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                />
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductTabs;
