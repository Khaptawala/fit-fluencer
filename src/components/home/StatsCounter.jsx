import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { Users, Scale, Award, Medal, Apple } from 'lucide-react'

const CountUp = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const nodeRef = useRef(null)
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 })
  
  useEffect(() => {
    if (!isInView) return
    
    let startTime
    let animationFrame
    
    const startAnimation = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / (duration * 1000), 1)
      
      setCount(Math.floor(percentage * end))
      
      if (percentage < 1) {
        animationFrame = requestAnimationFrame(startAnimation)
      }
    }
    
    animationFrame = requestAnimationFrame(startAnimation)
    
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView])
  
  return <span ref={nodeRef}>{count.toLocaleString()}{suffix}</span>
}

const CircularProgress = ({ value, size = 120, strokeWidth = 8, color }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const progress = ((100 - value) / 100) * circumference
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: progress }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold">{value}%</span>
      </div>
    </div>
  )
}

const StatCard = ({ icon: Icon, title, value, suffix, color, delay }) => {
  return (
    <motion.div 
      className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold mb-2 dark:text-white">
        <CountUp end={value} suffix={suffix} />
      </h3>
      <p className="text-slate-600 dark:text-slate-400">{title}</p>
    </motion.div>
  )
}

const DietitianCard = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])
  
  return (
    <motion.div 
      ref={ref}
      className="col-span-2 p-8 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-100 dark:border-emerald-900 shadow-lg"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.6 }
        }
      }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4 text-emerald-800 dark:text-emerald-400">Expert Dietitians Network</h3>
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Our growing network of certified dietitians provide personalized nutrition plans and ongoing support for your health journey.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-sm">Certified Professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-teal-500"></div>
              <span className="text-sm">Personalized Plans</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div>
              <h4 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                <CountUp end={250} suffix="+" />
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Dietitians</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                <CountUp end={50} suffix="+" />
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Specialties</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                <CountUp end={98} suffix="%" />
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Success Rate</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <CircularProgress value={95} color="#10b981" />
          <CircularProgress value={85} color="#0ea5e9" />
          <CircularProgress value={90} color="#8b5cf6" />
        </div>
      </div>
    </motion.div>
  )
}

const StatsCounter = () => {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950">
      <div className="container">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Transforming Lives Every Day
          </motion.h2>
          <motion.p 
            className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join thousands of clients who have successfully achieved their health and fitness goals with FitFluencer.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={Users} 
            title="Active Members" 
            value={10000} 
            suffix="+" 
            color="bg-emerald-600" 
            delay={0.1}
          />
          <StatCard 
            icon={Scale} 
            title="Total Weight Lost" 
            value={25000} 
            suffix="kg" 
            color="bg-purple-600" 
            delay={0.2}
          />
          <StatCard 
            icon={Award} 
            title="Success Stories" 
            value={5000} 
            suffix="+" 
            color="bg-amber-600" 
            delay={0.3}
          />
          <StatCard 
            icon={Apple} 
            title="Nutrition Plans" 
            value={8500} 
            suffix="+" 
            color="bg-sky-600" 
            delay={0.4}
          />
        </div>
        
        <DietitianCard />
      </div>
    </section>
  )
}

export default StatsCounter 