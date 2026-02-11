import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './svg/Ridy_logo.svg';

const Footer = () => {
    const location = useLocation();

    // Pages that have their own custom CTA sections
    const hideCtaPages = ['/service/rental', '/service/payout', '/service/center'];
    const shouldHideCta = hideCtaPages.includes(location.pathname);

    return (
        <footer className="bg-bg-white border-t border-[#E0E0E0]">
            {/* Dark CTA Section per Design System 5-12 */}
            {!shouldHideCta && (
                <div className="bg-bg-dark py-[51px] px-[20px] md:px-[60px]">
                    <div className="container flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="flex flex-col gap-4">
                            <h2 className="text-[20px] md:text-[24px] font-extrabold text-white leading-[1.4]">
                                고민하는 사이에도 <br /> 누군가는 달리고 있습니다.
                            </h2>
                        </div>

                        <div className="flex flex-col gap-4 w-full md:w-auto">
                            <Link to="/rental/inquiry" className="btn-ridy btn-ridy-dark">
                                리스/렌탈 문의하기
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Footer Info */}
            <div className="py-20 px-[20px] md:px-[60px]">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center mb-8">
                                <img src={Logo} alt="RIDY Logo" className="h-[24px] md:h-[28px] w-auto" />
                            </div>
                            <div className="flex flex-col gap-2 text-[12px] text-text-muted font-normal leading-[1.6]">
                                <p className="text-text-secondary font-bold text-[14px] mb-2">주식회사 LLNP</p>
                                <p>대표이사 : 임사라</p>
                                <p>문의 : support@ridy.co.kr</p>
                                <p>전화 : 070-4204-5506</p>
                                <p>주소 : 서울특별시 용산구 한남대로28가길 31-5</p>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[14px] font-bold text-text-secondary mb-8">서비스</h4>
                            <ul className="flex flex-col gap-4 text-[12px] text-text-muted">
                                <li><Link to="/service/rental" className="hover:text-primary transition-colors">라이디 렌탈</Link></li>
                                <li><Link to="/service/payout" className="hover:text-primary transition-colors">라이디 페이아웃</Link></li>
                                <li><Link to="/service/center" className="hover:text-primary transition-colors">라이디 정비</Link></li>
                                <li><Link to="/product/honda" className="hover:text-primary transition-colors">렌탈 기종 안내</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-[14px] font-bold text-text-secondary mb-8">고객지원</h4>
                            <ul className="flex flex-col gap-4 text-[12px] text-text-muted">
                                <li><Link to="/support/notice" className="hover:text-primary transition-colors">공지사항</Link></li>
                                <li><Link to="/support/faq" className="hover:text-primary transition-colors">자주 묻는 질문</Link></li>
                                <li><Link to="/partnership/center" className="hover:text-primary transition-colors">가맹 문의</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-[#E0E0E0] flex flex-col md:flex-row justify-between items-center text-[12px] text-text-muted gap-6">
                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
                            <p>© 2025 LLNP Co., Ltd. All rights reserved</p>
                            <div className="flex gap-6">
                                <Link to="#" className="hover:text-primary transition-colors">이용약관</Link>
                                <Link to="#" className="font-bold text-text-primary hover:text-primary transition-colors">개인정보처리방침</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};


export default Footer;
