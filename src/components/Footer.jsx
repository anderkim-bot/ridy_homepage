import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './svg/2-1.Ridy(가로형) 1.svg';

const Footer = () => {
    return (
        <footer className="bg-white py-20 border-t border-slate-100">
            <div className="container">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-2">
                        <div className="flex items-center mb-8">
                            <img src={Logo} alt="RIDY Logo" className="h-[24px] md:h-[28px] w-auto" />
                        </div>
                        <div className="space-y-2 text-slate-500 font-medium leading-relaxed">
                            <p className="text-slate-900 font-black text-xl mb-4">주식회사 LLNP</p>
                            <p>대표이사 : 임사라</p>
                            <p>문의 : <a href="mailto:support@ridy.co.kr" className="hover:text-primary font-bold transition-colors">support@ridy.co.kr</a></p>
                            <p>전화 : 070-4204-5506</p>
                            <p className="leading-tight">주소 : 서울특별시 용산구 한남대로28가길 31-5</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-slate-900 font-black mb-8 text-lg">서비스</h4>
                        <ul className="space-y-4 text-slate-500 font-bold">
                            <li><Link to="/service/rental" className="text-cta-halo hover:font-black">라이디 렌탈</Link></li>
                            <li><Link to="/service/payout" className="text-cta-halo hover:font-black">라이디 페이아웃</Link></li>
                            <li><Link to="/service/center" className="text-cta-halo hover:font-black">라이디 정비</Link></li>
                            <li><Link to="/product/honda" className="text-cta-halo hover:font-black">렌탈 기종 안내</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-slate-900 font-black mb-8 text-lg">고객지원</h4>
                        <ul className="space-y-4 text-slate-500 font-bold">
                            <li><Link to="/support/notice" className="text-cta-halo hover:font-black">공지사항</Link></li>
                            <li><Link to="/support/faq" className="text-cta-halo hover:font-black">자주 묻는 질문</Link></li>
                            <li><Link to="/partnership/center" className="text-cta-halo hover:font-black">가맹 문의</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm font-bold gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
                        <p>© 2025 LLNP Co., Ltd. All rights reserved</p>
                        <div className="flex space-x-6 text-slate-500">
                            <a href="#" className="text-cta-halo hover:font-black">이용약관</a>
                            <a href="#" className="text-cta-halo font-black text-slate-900 hover:text-primary">개인정보처리방침</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
