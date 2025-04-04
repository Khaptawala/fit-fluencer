import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import InviteLinkPage from './pages/InviteLinkPage'
import AboutMePage from './pages/AboutMePage'
import CertificatesPage from './pages/CertificatesPage'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import { CounselingSession, Dashboard, ErrorPage } from './pages/after-login pages'
import ProgressTracking from './pages/after-login pages/ProgressTracking'
import NutritionTracking from './pages/after-login pages/NutritionTracking'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import UserProfile from './pages/after-login pages/counseling/UserProfile'
import RegisterPage from './pages/after-login pages/RegisterPage'
import PlansPage from './pages/after-login pages/PlansPage'

const App = () => {
  return (
    <Router>
      <div className='min-h-screen flex flex-col'>
        <Navbar />
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/invite" element={<InviteLinkPage />} />
          <Route path="/about" element={<AboutMePage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/progress-tracking" element={<ProgressTracking />} />
          <Route path="/nutrition-tracking" element={<NutritionTracking />} />
          <Route path="/counseling-session" element={<CounselingSession />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/plans" element={<PlansPage />} />
          {/* <Route path="/profile-summary" element={<ProfileSummary />} /> */}
          <Route path="/user-profile" element={<UserProfile />} />
          {/* 404 Error page - must be the last route */}
          <Route path="*" element={<ErrorPage />} />

        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App




