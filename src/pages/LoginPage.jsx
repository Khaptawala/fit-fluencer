import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [loginMethod, setLoginMethod] = useState('email')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    password: ''
  })

  // Hide navbar on login page
  useEffect(() => {
    document.body.classList.add('login-page')
    // Clean up function to remove the class when component unmounts
    return () => {
      document.body.classList.remove('login-page')
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast.success('Login successful!')
      navigate('/dashboard') // Redirect to dashboard after login
    }, 1500)
  }

  const goToDashboard = () => {
    toast.success('Welcome to the dashboard!')
    navigate('/dashboard')
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-300 dark:bg-emerald-900/30 rounded-full blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-blue-300 dark:bg-blue-900/30 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-300 dark:bg-purple-900/30 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* 3D elements */}
        <div className="hidden lg:block absolute top-1/4 right-16 transform rotate-12 opacity-90">
          <motion.div
            initial={{ y: 100, opacity: 0, rotateY: -30 }}
            animate={{ y: 0, opacity: 1, rotateY: 0 }}
            transition={{ duration: 1.5, type: 'spring', delay: 0.5 }}
            className="w-72 h-96 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 card-3d"
            style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
          >
            <motion.div 
              initial={{ rotateY: -30 }}
              animate={{ rotateY: 0 }}
              transition={{ duration: 1.5, type: 'spring', delay: 0.5 }}
              className="w-full h-full rounded-xl bg-gradient-to-br from-emerald-400/70 to-emerald-600/70 relative overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center mb-4"
                >
                  <img src="/src/logo/FitFluencer Final Logo 2.png" alt="Logo" className="w-10 h-10" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2">Join FitFluencer</h3>
                <p className="text-white/80 text-center text-sm mb-6">Transform your fitness journey with expert guidance and personalized plans</p>
                <div className="w-full h-1 bg-white/20 rounded-full mb-6">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '70%' }}
                    transition={{ delay: 1.2, duration: 1.5 }}
                    className="h-full bg-white rounded-full"
                  ></motion.div>
                </div>
                <div className="grid grid-cols-3 gap-2 w-full">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <motion.div 
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + (i * 0.1) }}
                      className="aspect-square rounded-lg bg-white/20 backdrop-blur-sm"
                    ></motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto grid md:grid-cols-2 gap-4 md:gap-12 items-center z-10">
        {/* Left side - brand & information */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center md:text-left md:pr-8"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <img
              src="/src/logo/FitFluencer Final Logo 2.png"
              alt="FitFluencer Logo"
              className="h-20 mx-auto md:mx-0"
            />
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent"
          >
            Welcome to<br/>FitFluencer
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-slate-600 dark:text-slate-300 text-lg md:text-xl mb-8 max-w-lg"
          >
            Your journey to a healthier lifestyle begins here. Sign in to access personalized fitness plans, nutrition guides, and expert coaching.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="hidden md:flex gap-8 mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <motion.div 
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full"
                ></motion.div>
              </div>
              <div>
                <h3 className="font-semibold">Track Progress</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Monitor your fitness journey</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <motion.div 
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-6 h-6 flex items-center justify-center"
                >
                  <span className="block w-4 h-4 bg-emerald-500 rounded-sm"></span>
                </motion.div>
              </div>
              <div>
                <h3 className="font-semibold">Expert Guidance</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Learn from certified trainers</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Right side - login form */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, type: 'spring' }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/30 dark:border-slate-700/30"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Sign In</h2>
            <p className="text-slate-500 dark:text-slate-400">Access your account</p>
          </div>
          
          {/* Login Method Toggle */}
          <div className="bg-emerald-50 dark:bg-slate-700/30 rounded-xl p-1 mb-6">
            <div className="flex">
              <button
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                  loginMethod === 'email'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:text-emerald-500'
                }`}
              >
                <div className="flex items-center justify-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </div>
              </button>
              <button
                onClick={() => setLoginMethod('mobile')}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                  loginMethod === 'mobile'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:text-emerald-500'
                }`}
              >
                <div className="flex items-center justify-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Mobile
                </div>
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div
              initial={false}
              animate={{ height: loginMethod === 'email' ? 'auto' : 0, opacity: loginMethod === 'email' ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className={loginMethod === 'mobile' ? 'hidden' : ''}
            >
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-12 border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  placeholder="name@example.com"
                  required
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              </div>
            </motion.div>

            <motion.div
              initial={false}
              animate={{ height: loginMethod === 'mobile' ? 'auto' : 0, opacity: loginMethod === 'mobile' ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className={loginMethod === 'email' ? 'hidden' : ''}
            >
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Mobile Number
              </label>
              <div className="relative group">
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-12 border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  placeholder="+1 (123) 456-7890"
                  required
                />
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              </div>
            </motion.div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-12 pr-12 border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  placeholder="Enter your password"
                  required
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-emerald-500 rounded border-slate-300 focus:ring-emerald-500" 
                />
                <span className="ml-2 text-sm text-slate-600 dark:text-slate-300">Remember me</span>
              </label>
              <a href="#" className="text-sm text-emerald-500 hover:text-emerald-600 font-medium">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white py-3 rounded-lg shadow-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 btn-shimmer"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>

            <Button
              type="button"
              className="w-full mt-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-lg shadow-lg font-medium flex items-center justify-center gap-2 transition-all duration-300"
              onClick={goToDashboard}
            >
              <span>Quick Access Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white dark:bg-slate-800 text-xs text-slate-500 dark:text-slate-400">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {['google', 'apple', 'facebook'].map((provider) => (
                <button
                  key={provider}
                  type="button"
                  className="flex items-center justify-center py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <img 
                    src={`/src/assets/icons/${provider}.svg`} 
                    alt={`${provider} logo`} 
                    className="w-5 h-5"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </button>
              ))}
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Don't have an account?{' '}
                <a href="#" className="text-emerald-500 hover:text-emerald-600 font-medium">
                  Create account
                </a>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage 