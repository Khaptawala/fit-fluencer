import React from 'react'
import { motion } from 'framer-motion'
import HeroSection from '../components/home/HeroSection'
import StatsCounter from '../components/home/StatsCounter'
import PricingPlans from '../components/home/PricingPlans'
import { Users, Award, Heart, Clock } from 'lucide-react'

const AboutSection = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-emerald-500" />,
      title: "Expert Network",
      description: "Connect with certified dietitians and health professionals"
    },
    {
      icon: <Award className="w-8 h-8 text-emerald-500" />,
      title: "Quality Care",
      description: "Get personalized nutrition plans from experienced professionals"
    },
    {
      icon: <Heart className="w-8 h-8 text-emerald-500" />,
      title: "Holistic Approach",
      description: "Focus on overall wellness and sustainable lifestyle changes"
    },
    {
      icon: <Clock className="w-8 h-8 text-emerald-500" />,
      title: "24/7 Support",
      description: "Access guidance and support whenever you need it"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-emerald-50 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent mb-4">
            Why Choose FitFluencer?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            We connect you with expert dietitians who provide personalized nutrition guidance and support your journey to better health.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Our platform is designed to make it easy for you to find and connect with the right dietitian for your needs. Whether you're looking to improve your nutrition, manage a health condition, or achieve specific fitness goals, our network of professionals is here to help.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <StatsCounter />
      </motion.div>
      <AboutSection />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <PricingPlans />
      </motion.div>
    </motion.div>
  )
}

export default HomePage 