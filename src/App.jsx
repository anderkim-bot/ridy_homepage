import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Intro from './pages/brand/Intro';
import Ceo from './pages/brand/Ceo';
import History from './pages/brand/History';
import Location from './pages/brand/Location';
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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />

        <main className="pt-[100px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/models" element={<AdminModels />} />
            <Route path="/product/detail/:slug" element={<ModelDetail />} />

            {/* Brand */}
            <Route path="/brand/intro" element={<Intro />} />
            <Route path="/brand/ceo" element={<Ceo />} />
            <Route path="/brand/history" element={<History />} />
            <Route path="/brand/location" element={<Location />} />

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
