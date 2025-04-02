import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ArrowRight, Star, BarChart, Calendar, Clock, Zap, Award, Sparkles } from 'lucide-react'
import { Button } from '../ui/button'
import { motion, useAnimation } from 'framer-motion'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Badge } from '../ui/badge'

const FeatureItem = ({ feature, delay }) => {
  return (
    <motion.li 
      className="flex items-start gap-2"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: [0, 5, 0] }}
      >
        <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
      </motion.div>
      <span>{feature}</span>
    </motion.li>
  );
};

const PricingCard = ({ 
  title, 
  description, 
  price, 
  originalPrice,
  duration, 
  features, 
  isPopular, 
  delay,
  discount,
  icon: Icon
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className={`relative overflow-hidden transition-all duration-300 h-full ${isPopular ? 'border-emerald-500 shadow-lg' : ''} ${isHovered ? 'shadow-xl' : 'shadow'}`}>
        {discount > 0 && (
          <motion.div 
            className="absolute top-4 right-4 z-10"
            animate={{ 
              scale: isHovered ? [1, 1.05, 1] : 1,
            }}
            transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
          >
            <Badge className="bg-amber-500 text-white font-medium px-2.5 py-1 rounded-full">Save {discount}%</Badge>
          </motion.div>
        )}
        
        {isPopular && (
          <motion.div 
            className="absolute top-0 right-0 z-10"
            animate={{ 
              scale: isHovered ? [1, 1.05, 1] : 1,
            }}
            transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
          >
            <Badge className="rounded-tl-none rounded-br-none bg-emerald-500 text-white">Most Popular</Badge>
          </motion.div>
        )}
        
        <CardHeader className="pt-10 pb-6 relative">
          <motion.div 
            className="absolute top-3 left-3 text-emerald-500"
            animate={{ 
              rotate: isHovered ? 360 : 0,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <Icon className="h-6 w-6" />
          </motion.div>
          
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="min-h-[40px] mt-1">{description}</CardDescription>
          
          <div className="mt-4 flex items-baseline">
            {originalPrice && (
              <span className="text-slate-600 dark:text-slate-400 line-through mr-2">₹{originalPrice.toLocaleString()}</span>
            )}
            <motion.span 
              className="text-4xl font-bold"
              animate={{ 
                color: isHovered && isPopular ? ["#10b981", "#0ea5e9", "#10b981"] : "#000000"
              }}
              transition={{ duration: 2, repeat: isHovered && isPopular ? Infinity : 0 }}
            >
              ₹{price.toLocaleString()}
            </motion.span>
            <span className="text-slate-600 dark:text-slate-400 ml-1">/ {duration}</span>
          </div>
        </CardHeader>
        
        <CardContent>
          <ul className="space-y-3">
            {features.map((feature, i) => (
              <FeatureItem key={i} feature={feature} delay={delay + (i * 0.05)} />
            ))}
          </ul>
        </CardContent>
        
        <CardFooter>
          <motion.div
            className="w-full"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button asChild className={`w-full ${isPopular ? 'bg-emerald-600 hover:bg-emerald-700' : ''}`}>
              <Link to="/contact">
                Get Started 
                <motion.div 
                  className="ml-2"
                  animate={{ 
                    x: isHovered ? [0, 4, 0] : 0
                  }}
                  transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0 }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </Link>
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

const PricingPlans = () => {
  const plans = [
    {
      title: "Monthly Plan",
      description: "Perfect for a quick transformation",
      price: 5000,
      originalPrice: null,
      duration: "month",
      discount: 0,
      features: [
        "Personalized workout plan",
        "Custom meal planning",
        "Weekly check-ins with trainer",
        "Access to fitness app",
        "24/7 chat support"
      ],
      isPopular: false,
      delay: 0.1,
      icon: Calendar
    },
    {
      title: "3-Month Plan",
      description: "Our most popular plan for serious results",
      price: 13500,
      originalPrice: 15000,
      duration: "3 months",
      discount: 10,
      features: [
        "Everything in Monthly Plan",
        "Twice weekly check-ins",
        "Nutrition consultation",
        "Progress tracking tools",
        "Exclusive group workouts",
        "Priority support access"
      ],
      isPopular: true,
      delay: 0.2,
      icon: Star
    },
    {
      title: "6-Month Plan",
      description: "Commit to longer-term fitness goals",
      price: 24000,
      originalPrice: 30000,
      duration: "6 months",
      discount: 20,
      features: [
        "All features in 3-Month Plan",
        "Quarterly fitness assessments",
        "Personalized supplements plan",
        "Body composition analysis",
        "Video analysis of workouts",
        "Priority scheduling"
      ],
      isPopular: false,
      delay: 0.3,
      icon: Award
    },
    {
      title: "1-Year Plan",
      description: "Best value for long-term commitment",
      price: 42000,
      originalPrice: 60000,
      duration: "year",
      discount: 30,
      features: [
        "All features in 6-Month Plan",
        "Monthly 1-on-1 coaching sessions",
        "Annual health assessment",
        "Exclusive premium content",
        "Personal fitness coach",
        "VIP access to webinars and events"
      ],
      isPopular: false,
      delay: 0.4,
      icon: Sparkles
    }
  ]

  return (
    <section className="py-16 md:py-24" id="plans">
      <div className="container">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 inline-block">
            <motion.div 
              className="px-4 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 font-medium text-sm"
              animate={{ 
                scale: [1, 1.03, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Zap className="w-4 h-4 inline-block mr-2" />
              Find Your Perfect Plan
            </motion.div>
          </div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Simple, Transparent Pricing
          </motion.h2>
          
          <motion.p 
            className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Choose the perfect plan for your fitness journey and transform your life with expert guidance.
          </motion.p>
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, i) => (
            <PricingCard key={i} {...plan} />
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center p-8 rounded-xl border border-slate-200 dark:border-slate-800 max-w-3xl mx-auto bg-gradient-to-r from-slate-50 to-emerald-50 dark:from-slate-900/50 dark:to-emerald-950/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ 
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div className="flex items-center justify-center mb-4">
            <motion.div 
              className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Clock className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </motion.div>
          </div>
          
          <h3 className="text-xl font-semibold mb-2">Need a Custom Plan?</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Looking for something specific to your unique fitness goals? We offer customized plans tailored just for you.
          </p>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button asChild variant="outline" className="border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/30">
              <Link to="/contact">Contact Us For Details</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default PricingPlans 