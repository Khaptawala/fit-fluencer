import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Crown, Medal, Star, ArrowRight, Shield, Clock, TrendingUp, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const PlansPage = () => {
  const navigate = useNavigate()
  const [hoveredPlan, setHoveredPlan] = useState(null)

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly Plan',
      icon: <Clock className="h-5 w-5" />,
      duration: '1 Month',
      price: 29.99,
      regularPrice: 39.99,
      pricePerMonth: 29.99,
      description: 'Perfect for those who want to try our services',
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      highlight: false,
      savings: 'Save 25%',
      benefits: [
        'Personalized workout plans',
        'Basic nutrition guidance',
        'Access to workout library',
        'Progress tracking',
        'Community forum access'
      ]
    },
    {
      id: 'quarterly',
      name: 'Quarterly Plan',
      icon: <Medal className="h-5 w-5" />,
      duration: '3 Months',
      price: 79.99,
      regularPrice: 119.97,
      pricePerMonth: 26.66,
      description: 'Great for committed fitness enthusiasts',
      color: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
      highlight: true,
      popular: true,
      savings: 'Save 33%',
      benefits: [
        'Everything in Monthly',
        'Advanced workout customization',
        'Detailed nutrition plans',
        'Priority support',
        'Weekly progress reports',
        'One free personal training session'
      ]
    },
    {
      id: 'biannual',
      name: 'Biannual Plan',
      icon: <Star className="h-5 w-5" />,
      duration: '6 Months',
      price: 149.99,
      regularPrice: 239.94,
      pricePerMonth: 25.00,
      description: 'Serious fitness commitment with better value',
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      highlight: false,
      savings: 'Save 38%',
      benefits: [
        'Everything in Quarterly',
        'Premium content access',
        'Two free personal training sessions',
        'Custom meal planning',
        'Fitness assessment',
        'Access to exclusive workshops'
      ]
    },
    {
      id: 'annual',
      name: 'Annual Plan',
      icon: <Crown className="h-5 w-5" />,
      duration: '12 Months',
      price: 249.99,
      regularPrice: 479.88,
      pricePerMonth: 20.83,
      description: 'Maximum savings for a full year of fitness',
      color: 'bg-gradient-to-r from-amber-500 to-orange-500',
      highlight: false,
      savings: 'Save 48%',
      bestseller: true,
      benefits: [
        'Everything in Biannual',
        'Unlimited personal training sessions',
        'Advanced body analytics',
        'VIP access to all features',
        'Monthly coach consultation',
        'Customized yearly fitness roadmap'
      ]
    }
  ]

  const selectPlan = (plan) => {
    toast.success(`${plan.name} selected!`)
    setTimeout(() => navigate('/register'), 1000)
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Choose Your <span className="text-emerald-500">Subscription Plan</span>
          </h1>
          <p className="mt-5 max-w-3xl mx-auto text-xl text-slate-500">
            Select the plan that fits your fitness journey and goals
          </p>
          
          {/* Benefits */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            {[
              { icon: <Shield className="h-5 w-5" />, text: "Cancel anytime" },
              { icon: <TrendingUp className="h-5 w-5" />, text: "Get results faster" },
              { icon: <DollarSign className="h-5 w-5" />, text: "Longer plans = bigger savings" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm"
              >
                <div className="text-emerald-500">{item.icon}</div>
                <span className="text-sm font-medium text-slate-700">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative rounded-2xl bg-white overflow-hidden transition-all duration-300 ${
                hoveredPlan === plan.id 
                  ? 'shadow-2xl scale-105 z-10 translate-y-[-8px]' 
                  : 'shadow-xl'
              } ${plan.highlight ? 'ring-2 ring-emerald-500 ring-offset-2' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 z-10">
                  <div className="bg-emerald-500 text-white text-xs font-semibold py-1 px-3 rounded-bl-xl shadow-lg">
                    MOST POPULAR
                  </div>
                </div>
              )}
              
              {plan.bestseller && (
                <div className="absolute top-0 right-0 z-10">
                  <div className="bg-amber-500 text-white text-xs font-semibold py-1 px-3 rounded-bl-xl shadow-lg">
                    BEST VALUE
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className={`${plan.color} text-white p-6`}>
                <div className="flex items-center gap-2 font-medium">
                  <div className="bg-white/20 rounded-full p-1">
                    {plan.icon}
                  </div>
                  <span className="text-lg">{plan.name}</span>
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    {plan.regularPrice && (
                      <span className="ml-2 text-sm line-through opacity-70">
                        ${plan.regularPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-sm opacity-90">${plan.pricePerMonth.toFixed(2)}/month</span>
                    {plan.savings && (
                      <div className="ml-2 bg-white/20 rounded-full px-2 py-0.5 text-xs font-bold">
                        {plan.savings}
                      </div>
                    )}
                  </div>
                  <p className="mt-3 text-sm opacity-80">{plan.description}</p>
                </div>
              </div>

              {/* Duration Badge */}
              <div className="relative px-6 py-4">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white shadow-md px-4 py-1 rounded-full border-2 border-slate-200">
                  <span className="text-sm font-semibold text-slate-700">{plan.duration}</span>
                </div>
              </div>

              {/* Features */}
              <div className="px-6 py-4">
                <h4 className="text-slate-700 font-medium mb-4">What's included:</h4>
                <ul className="space-y-3">
                  {plan.benefits.map((benefit, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + (i * 0.1) }}
                      className="flex gap-3 text-sm"
                    >
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-slate-600">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="p-6 bg-slate-50 mt-auto">
                <motion.div 
                  whileHover={{ scale: 1.03 }} 
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    className={`w-full py-6 ${
                      plan.highlight 
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                        : hoveredPlan === plan.id
                          ? 'bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-800'
                          : 'bg-white hover:bg-slate-100 border-2 border-slate-200 text-slate-800'
                    }`}
                    onClick={() => selectPlan(plan)}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Choose Plan
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Button>
                </motion.div>
                <p className="text-xs text-center text-slate-500 mt-3">
                  No credit card required • Cancel anytime
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24 text-center">
          <h2 className="text-2xl font-bold text-slate-800">Frequently Asked Questions</h2>
          <p className="mt-2 text-slate-600">Have questions about our plans? We're here to help.</p>
          
          <div className="max-w-3xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "Can I switch plans later?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be applied immediately, and any remaining balance will be credited to your account."
              },
              {
                q: "What happens when my subscription ends?",
                a: "Your subscription will automatically renew at the end of your billing period. You'll receive a reminder email before renewal."
              },
              {
                q: "Is there a free trial available?",
                a: "We offer a 7-day free trial for new users. You can try all premium features before committing to a subscription."
              },
              {
                q: "How do I cancel my subscription?",
                a: "You can cancel your subscription at any time from your account settings. Your plan will remain active until the end of your billing period."
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + (i * 0.1) }}
                className="bg-white p-6 rounded-xl shadow-md text-left"
              >
                <h3 className="text-lg font-medium text-slate-800 mb-2">{item.q}</h3>
                <p className="text-slate-600 text-sm">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="mt-20 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-xl"
        >
          <div className="md:w-1/2 p-8 md:p-12 flex items-center justify-center">
            <div>
              <div className="mb-4 text-amber-500 flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <blockquote className="text-slate-700 text-lg font-medium italic">
                "After trying several fitness apps, FitFluencer's 6-month plan has been a game-changer. The personalized guidance and constant support keep me motivated. I've lost 30 pounds and feel amazing!"
              </blockquote>
              <div className="mt-6 flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold">
                  JS
                </div>
                <div className="ml-4">
                  <p className="text-slate-800 font-semibold">Jennifer Smith</p>
                  <p className="text-slate-500 text-sm">Biannual Plan Member • 6 months ago</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 bg-gradient-to-br from-emerald-500 to-blue-600 p-8 md:p-12 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to transform your fitness journey?</h3>
            <p className="mb-6 opacity-90">Join thousands of members who have achieved their fitness goals with our personalized plans and expert guidance.</p>
            <ul className="space-y-3 mb-8">
              {[
                "Professional workout plans tailored to your goals",
                "Nutritional guidance from certified experts",
                "Progress tracking with detailed analytics",
                "Supportive community to keep you motivated"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button 
              className="bg-white text-emerald-600 hover:bg-emerald-50"
              onClick={() => navigate('/register')}
            >
              Start Your Fitness Journey
            </Button>
          </div>
        </motion.div>

        {/* Money-back guarantee */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full border border-amber-200">
            <Shield className="h-5 w-5 text-amber-500" />
            <span className="text-amber-700 font-medium">30-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlansPage 