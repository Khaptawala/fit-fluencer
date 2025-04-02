import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Dumbbell, Salad, Heart, ArrowLeft, ArrowUp } from 'lucide-react'
import { Button } from '../ui/button'
import { motion, AnimatePresence } from 'framer-motion'

const images = [
  {
    url: "https://images.unsplash.com/photo-1551763323-d09bd70a386f?q=80&w=2070&auto=format&fit=crop",
    title: "Expert Training Sessions",
    description: "Get personalized workouts tailored to your goals"
  },
  {
    url: "https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?q=80&w=2070&auto=format&fit=crop",
    title: "Nutrition Guidance",
    description: "Learn how to fuel your body for optimal performance"
  },
  {
    url: "https://images.unsplash.com/photo-1574689211272-bc14e289e223?q=80&w=2070&auto=format&fit=crop",
    title: "Mind-Body Balance",
    description: "Achieve holistic wellness with our comprehensive approach"
  },
  {
    url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
    title: "Community Support",
    description: "Join a community that keeps you motivated and accountable"
  }
]

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])
  
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }
  
  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }
  
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-emerald-50 border-emerald-200 text-emerald-600">
                <motion.span 
                  className="px-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  Transform Your Life Today
                </motion.span>
              </div>
            </motion.div>

            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Your Journey to a{" "}
              <motion.span 
                className="text-emerald-600 inline-block"
                animate={{ 
                  scale: [1, 1.05, 1],
                  color: ["#10b981", "#0ea5e9", "#10b981"]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                Healthier
              </motion.span>{" "}
              You Starts Here
            </motion.h1>

            <motion.p 
              className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              FitFluencer offers personalized fitness plans and nutrition guidance to help you achieve 
              your health goals, whether you're looking to lose weight, gain muscle, or maintain a balanced lifestyle.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium group">
                <Link to="/contact">
                  Get Started{" "}
                  <motion.span
                    className="inline-block ml-2"
                    initial={{ x: 0 }}
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#plans">View Plans</a>
              </Button>
            </motion.div>
            
            <motion.div 
              className="mt-8 grid grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {[1, 2, 3].map((num) => (
                <motion.div 
                  key={num}
                  className="flex items-center gap-2"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + (num * 0.1), duration: 0.3 }}
                >
                  <motion.div 
                    className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center"
                    whileHover={{ scale: 1.1, backgroundColor: "#a7f3d0" }}
                  >
                    <ArrowUp className="h-4 w-4 text-emerald-600" />
                  </motion.div>
                  <span className="text-sm font-medium">
                    {num === 1 ? "Expert Coaches" : num === 2 ? "Custom Plans" : "Real Results"}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="relative h-[600px]">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-200 dark:bg-emerald-900 rounded-full filter blur-2xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-200 dark:bg-purple-900 rounded-full filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-pink-200 dark:bg-pink-900 rounded-full filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>
            
            <div className="relative h-full rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentImage}
                  className="absolute inset-0"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <img 
                    src={images[currentImage].url} 
                    alt={images[currentImage].title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="absolute bottom-10 left-6 right-6">
                      <motion.h3 
                        className="text-2xl font-bold text-white mb-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        {images[currentImage].title}
                      </motion.h3>
                      <motion.p 
                        className="text-white/90 text-base mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        {images[currentImage].description}
                      </motion.p>
                      
                      <motion.div 
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                          <Dumbbell className="h-4 w-4 text-emerald-400" />
                          <span className="text-white text-sm">Customized Workouts</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                          <Salad className="h-4 w-4 text-emerald-400" />
                          <span className="text-white text-sm">Meal Plans</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                          <Heart className="h-4 w-4 text-emerald-400" />
                          <span className="text-white text-sm">Health Coaching</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute bottom-36 left-6 right-6 flex justify-between">
                <motion.button 
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"
                  onClick={prevImage}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="h-5 w-5" />
                </motion.button>
                <motion.button 
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"
                  onClick={nextImage}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </div>
              
              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                {images.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full ${index === currentImage ? 'bg-white' : 'bg-white/40'}`}
                    onClick={() => setCurrentImage(index)}
                    whileHover={{ scale: 1.2 }}
                    animate={{ 
                      scale: index === currentImage ? [1, 1.2, 1] : 1,
                      transition: { duration: 1, repeat: index === currentImage ? Infinity : 0 }
                    }}
                  />
                ))}
              </div>
            </div>

            <motion.div 
              className="absolute -top-6 -right-10 bg-white dark:bg-slate-900 rounded-lg shadow-lg p-4 border border-slate-200 dark:border-slate-800"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 dark:bg-emerald-900/50 p-2 rounded-full">
                  <Dumbbell className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Personalized</p>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">For your goals</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-6 -left-10 bg-white dark:bg-slate-900 rounded-lg shadow-lg p-4 border border-slate-200 dark:border-slate-800"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 dark:bg-emerald-900/50 p-2 rounded-full">
                  <Heart className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Healthy Living</p>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">Expert guidance</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection 