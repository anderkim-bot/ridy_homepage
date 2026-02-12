import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Rental from './pages/service/Rental';
import Payout from './pages/service/Payout';
import Center from './pages/service/Center';
import Process from './pages/service/Process';
import Network from './pages/service/Network';
import Honda from './pages/product/Honda';
import Yamaha from './pages/product/Yamaha';
import Zontes from './pages/product/Zontes';
import Lease from './pages/product/Lease';
import ModelDetail from './pages/product/ModelDetail';
import OnlineInquiry from './pages/inquiry/RentalInquiry';
import KakaoInquiry from './pages/inquiry/Kakao';
import Notice from './pages/support/Notice';
import Faq from './pages/support/Faq';
import Archive from './pages/support/Archive';
import Partnership from './pages/partnership/Center';
import AdminModels from './pages/admin/AdminModels';
import AdminNotices from './pages/admin/AdminNotices';
import AdminCenters from './pages/admin/AdminCenters';
import AdminCases from './pages/admin/AdminCases';
import ScrollToTop from './components/ScrollToTop';



function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Navbar />


        <main className="pt-[100px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/models" element={<AdminModels />} />
            <Route path="/admin/notices" element={<AdminNotices />} />
            <Route path="/admin/centers" element={<AdminCenters />} />
            <Route path="/admin/cases" element={<AdminCases />} />
            <Route path="/product/detail/:slug" element={<ModelDetail />} />


            {/* Service */}
            <Route path="/service/info" element={<Rental />} /> {/* Matching Navbar href for now */}
            <Route path="/service/rental" element={<Rental />} />
            <Route path="/service/payout" element={<Payout />} />
            <Route path="/service/center" element={<Center />} />
            <Route path="/service/process" element={<Process />} />
            <Route path="/service/network" element={<Network />} />

            {/* Product */}
            <Route path="/product/rental" element={<Honda />} /> {/* Matching Navbar href for now */}
            <Route path="/product/honda" element={<Honda />} />
            <Route path="/product/yamaha" element={<Yamaha />} />
            <Route path="/product/zontes" element={<Zontes />} />
            <Route path="/product/succession" element={<Lease />} />

            {/* Inquiry */}
            <Route path="/rental/inquiry" element={<OnlineInquiry />} />
            <Route path="/inquiry/rental" element={<OnlineInquiry />} />
            <Route path="/inquiry/online" element={<OnlineInquiry />} />
            <Route path="/inquiry/kakao" element={<KakaoInquiry />} />

            {/* Support */}
            <Route path="/board/notice" element={<Notice />} /> {/* Matching Navbar href for now */}
            <Route path="/support/notice" element={<Notice />} />
            <Route path="/support/faq" element={<Faq />} />
            <Route path="/support/archive" element={<Archive />} />

            {/* Partnership */}
            <Route path="/partnership/center" element={<Partnership />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
