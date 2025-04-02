import React from 'react'
import { Link } from 'react-router-dom'
import { DumbbellIcon, Instagram, Facebook, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white mt-auto pt-12 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <DumbbellIcon className="h-6 w-6 text-emerald-500" />
              <span className="text-emerald-500 font-extrabold">Fit<span className="text-white">Fluencer</span></span>
            </Link>
            <p className="mt-4 text-slate-400">
              Transforming lives through personalized fitness journeys and expert nutrition guidance.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-slate-400 hover:text-emerald-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-emerald-500 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-4">Programs</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">
                  Weight Loss
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">
                  Weight Gain
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">
                  Muscle Building
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">
                  Nutrition Planning
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <address className="not-italic text-slate-400">
              <p>123 Fitness Avenue</p>
              <p>Wellness District</p>
              <p>Health City, HC 12345</p>
              <p className="mt-3">info@fitfluencer.com</p>
              <p>+1 (555) 123-4567</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-6 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} FitFluencer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 