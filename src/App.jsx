import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import InviteLinkPage from './pages/InviteLinkPage'
import RegisterPage from './pages/RegisterPage'
import AboutMePage from './pages/AboutMePage'
import CertificatesPage from './pages/CertificatesPage'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import { Dashboard } from './pages/after-login pages'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

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
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutMePage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App




