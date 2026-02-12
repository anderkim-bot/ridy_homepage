import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './svg/Ridy_logo.svg';

const Footer = () => {
    const location = useLocation();

    // Pages that have their own custom CTA sections
    const hideCtaPages = ['/service/rental', '/service/payout', '/service/center'];
    const shouldHideCta = hideCtaPages.includes(location.pathname);

    return (
        <footer className="bg-[#0f172a] border-t border-slate-800 text-slate-400">
            {/* Dark CTA Section per Design System 5-12 */}
            {!shouldHideCta && (
                <div className="bg-[#1e293b] py-8 md:py-10 px-[20px] md:px-[60px]">
                    <div className="container flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="flex flex-col gap-4">
                            <h2 className="text-[20px] md:text-[24px] font-extrabold text-white leading-[1.4]">
                                고민하는 사이에도 <br /> 누군가는 달리고 있습니다.
                            </h2>
                        </div>

                        <div className="flex flex-col gap-4 w-full md:w-auto">
                            <Link to="/rental/inquiry" className="btn-ridy btn-ridy-dark bg-white text-slate-900 hover:bg-slate-100">
                                리스/렌탈 문의하기
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Footer Info */}
            <div className="py-8 md:py-12 px-[20px] md:px-[60px]">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8 md:mb-12">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center mb-6">
                                <img src={Logo} alt="RIDY Logo" className="h-[24px] md:h-[28px] w-auto brightness-0 invert" />
                            </div>
                            <div className="flex flex-col gap-2 text-[12px] text-slate-400 font-normal leading-[1.6]">
                                <p className="text-white font-bold text-[14px] mb-2">주식회사 LLNP</p>
                                <p>대표이사 : 임사라</p>
                                <p>문의 : info@llnpco.com</p>
                                <p>전화 : 1555-6595</p>
                                <p>주소 : 서울특별시 용산구 한남대로28가길 31-5</p>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[14px] font-bold text-white mb-4">서비스</h4>
                            <ul className="flex flex-col gap-4 text-[12px] text-slate-400">
                                <li><Link to="/service/rental" className="hover:text-white transition-colors">라이디 렌탈</Link></li>
                                <li><Link to="/service/payout" className="hover:text-white transition-colors">라이디 페이아웃</Link></li>
                                <li><Link to="/service/center" className="hover:text-white transition-colors">라이디 정비</Link></li>
                                <li><Link to="/product/honda" className="hover:text-white transition-colors">렌탈 기종 안내</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-[14px] font-bold text-white mb-4">고객지원</h4>
                            <ul className="flex flex-col gap-4 text-[12px] text-slate-400">
                                <li><Link to="/support/notice" className="hover:text-white transition-colors">공지사항</Link></li>
                                <li><Link to="/support/faq" className="hover:text-white transition-colors">자주 묻는 질문</Link></li>
                                <li><Link to="/partnership/center" className="hover:text-white transition-colors">가맹 문의</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-[12px] text-slate-500 gap-6">
                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
                            <p>© 2025 LLNP Co., Ltd. All rights reserved</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};


export default Footer;
