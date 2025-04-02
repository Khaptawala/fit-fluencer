import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { DumbbellIcon, Menu, UserPlusIcon, HomeIcon, MessageSquareIcon, UserCircle, Award, LogIn } from 'lucide-react'
import { Button } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from './ui/sheet'
import { motion } from 'framer-motion'

const Navbar = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: <HomeIcon className="h-4 w-4" /> },
    { path: '/about', label: 'About Me', icon: <UserCircle className="h-4 w-4" /> },
    { path: '/certificates', label: 'Certificates', icon: <Award className="h-4 w-4" /> },
    { path: '/invite', label: 'Invite User', icon: <UserPlusIcon className="h-4 w-4" /> },
    { path: '/contact', label: 'Contact Us', icon: <MessageSquareIcon className="h-4 w-4" /> },
  ]

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="border-b sticky top-0 z-50 bg-white/80 backdrop-blur-md dark:bg-slate-950/80"
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <DumbbellIcon className="h-8 w-8 text-emerald-500" />
          </motion.div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
            Fit<span className="text-slate-800 dark:text-white">Fluencer</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-medium flex items-center gap-2 transition-all duration-200 ${
                location.pathname === item.path
                  ? 'text-emerald-500 scale-105'
                  : 'text-slate-600 hover:text-emerald-500 dark:text-slate-300'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          <Button 
            asChild 
            className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20"
          >
            <Link to="/login">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Link>
          </Button>
        </div>
        
        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-6 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-medium flex items-center gap-2 transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'text-emerald-500 scale-105'
                      : 'text-slate-600 hover:text-emerald-500 dark:text-slate-300'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
              <Button 
                asChild 
                className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20"
              >
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  )
}

export default Navbar 