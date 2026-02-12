import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, MessageSquare, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Logo from './svg/Ridy_logo.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null); // For Mobile
  const [isHovered, setIsHovered] = useState(null); // For Desktop
  const location = useLocation();

  const navItems = [
    {
      name: '서비스 안내',
      href: '/service/info',
      subItems: [
        { name: 'RIDY Rental', href: '/service/rental', desc: '합리적인 바이크 렌탈 시스템' },
        { name: 'RIDY Payout', href: '/service/payout', desc: '라이더를 위한 스마트 정산 앱' },
        { name: 'RIDY Service Center', href: '/service/center', desc: '전국 최대 규모 정비 네트워크' },
      ]
    },
    {
      name: '렌탈 기종',
      href: '/product/rental',
      subItems: [
        { name: '혼다 (Honda)', href: '/product/honda', desc: '신뢰의 브랜드, 혼다 인기 모델' },
        { name: '야마하 (Yamaha)', href: '/product/yamaha', desc: '퍼포먼스의 대명사, 야마하 라인업' },
        { name: '존테스 (Zontes)', href: '/product/zontes', desc: '가성비와 첨단 사양의 존테스' },
        { name: '리스 승계', href: '/product/succession', desc: '합리적인 조건의 리스 승계 매물' },
      ]
    },
    { name: '렌탈 문의', href: '/rental/inquiry' },
    { name: '고객 지원', href: '/board/notice' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveSubMenu(null);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-100 transition-all duration-500 ${scrolled ? 'bg-white shadow-sm h-[60px] md:h-[80px]' : 'bg-transparent h-[80px]'
          }`}
      >
        {/* Progress Bar */}
        {scrolled && <div className="absolute top-0 left-0 h-[6px] bg-primary w-full" />}

        <div className="container flex justify-between items-center h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img src={Logo} alt="라이디 (RIDY) 로고" className="h-6 md:h-7 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative h-full flex items-center"
                onMouseEnter={() => setIsHovered(item.name)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <Link
                  to={item.href}
                  className={`text-nav flex items-center gap-1 transition-colors ${location.pathname.startsWith(item.href)
                    ? 'text-primary'
                    : 'hover:text-primary'
                    }`}
                >
                  {item.name}
                  {item.subItems && (
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isHovered === item.name ? 'rotate-180' : ''}`} />
                  )}
                </Link>

                {/* Submenu Dropdown */}
                <AnimatePresence>
                  {item.subItems && isHovered === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute top-[80%] left-1/2 -translate-x-1/2 w-64 bg-white rounded-sm shadow-dropdown-ridy py-4 mt-2"
                    >
                      <div className="flex flex-col">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            className="px-5 py-3 hover:bg-bg-gray transition-colors group"
                          >
                            <span className="block text-[14px] font-bold text-[#4F4F4F] group-hover:text-primary transition-colors">
                              {sub.name}
                            </span>
                            <span className="block text-[11px] text-text-muted font-normal mt-0.5">
                              {sub.desc}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              to="/rental/inquiry"
              className="hidden sm:flex btn-ridy btn-ridy-outline rounded-lg! border-text-primary text-text-primary hover:bg-text-primary hover:text-white"

            >
              <span>렌탈 문의하기</span>
            </Link>

            <button
              className="lg:hidden p-2 text-text-secondary"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>


      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-90 bg-white pt-28 overflow-y-auto"

          >
            <div className="container flex flex-col gap-8 pb-10">
              <div className="flex flex-col gap-2">
                <p className="text-xs font-bold text-primary uppercase tracking-widest pl-4">Menu</p>
                <div className="flex flex-col">
                  {navItems.map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      {item.subItems ? (
                        <div className="border-b border-slate-50">
                          <button
                            onClick={() => setActiveSubMenu(activeSubMenu === item.name ? null : item.name)}
                            className={`w-full flex justify-between items-center px-4 py-5 text-xl font-bold transition-colors ${activeSubMenu === item.name ? 'text-primary' : 'text-foreground'
                              }`}
                          >
                            <span>{item.name}</span>
                            <ChevronDown
                              size={20}
                              className={`transition-transform duration-300 ${activeSubMenu === item.name ? 'rotate-180 text-primary' : 'text-slate-300'}`}
                            />
                          </button>

                          <AnimatePresence initial={false}>
                            {activeSubMenu === item.name && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden bg-slate-50/50"
                              >
                                {item.subItems.map((sub) => (
                                  <Link
                                    key={sub.name}
                                    to={sub.href}
                                    className="flex items-center justify-between px-6 py-4 border-b border-white/50"
                                  >
                                    <div className="flex flex-col">
                                      <span className="text-[16px] font-black">{sub.name}</span>
                                      <span className="text-[11px] text-slate-400">{sub.desc}</span>
                                    </div>
                                    <ChevronRight size={16} className="text-slate-300" />
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          to={item.href}
                          className="flex justify-between items-center px-4 py-5 text-xl font-bold border-b border-slate-50 transition-colors"
                        >
                          <span>{item.name}</span>
                          <ChevronRight size={20} className="text-slate-300" />
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h4 className="text-lg font-black text-foreground">라이더를 위한 토탈 솔루션</h4>
                  <p className="text-sm text-slate-500 font-medium">지금 라이디 앱을 다운로드하고 <br />스마트한 주행을 시작하세요.</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="h-14 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-sm font-bold shadow-sm">
                    App Store
                  </button>
                  <button className="h-14 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-sm font-bold shadow-sm">
                    Google Play
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
