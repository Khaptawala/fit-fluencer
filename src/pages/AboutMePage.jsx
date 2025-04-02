import React from 'react'
import { motion } from 'framer-motion'
import { Award, Heart, Users, Clock, GraduationCap, Briefcase } from 'lucide-react'

const AboutMePage = () => {
  const experiences = [
    {
      icon: <GraduationCap className="w-6 h-6 text-emerald-500" />,
      title: "Education",
      items: [
        "Master's in Nutrition Science",
        "Certified Dietitian",
        "Sports Nutrition Specialist"
      ]
    },
    {
      icon: <Briefcase className="w-6 h-6 text-emerald-500" />,
      title: "Experience",
      items: [
        "5+ years of clinical practice",
        "Sports team nutrition consultant",
        "Wellness program director"
      ]
    }
  ]

  const skills = [
    "Clinical Nutrition",
    "Sports Nutrition",
    "Weight Management",
    "Medical Nutrition Therapy",
    "Nutrition Counseling",
    "Meal Planning"
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-white to-emerald-50 dark:from-slate-950 dark:to-slate-900"
    >
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-emerald-300/20 dark:from-emerald-900/20 dark:to-emerald-700/20"
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent mb-4">
              About Me
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Passionate dietitian dedicated to helping people achieve their health and wellness goals through personalized nutrition guidance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">
                  My Journey
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  With over 5 years of experience in clinical nutrition and wellness, I've dedicated my career to helping individuals transform their lives through proper nutrition and lifestyle changes.
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  My approach combines evidence-based nutrition science with personalized care, ensuring each client receives tailored guidance that fits their unique needs and goals.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {exp.icon}
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                        {exp.title}
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {exp.items.map((item, i) => (
                        <li key={i} className="text-slate-600 dark:text-slate-300 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">
                  My Approach
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <Heart className="w-6 h-6 text-emerald-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                        Holistic Care
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
                        Comprehensive approach to health and wellness
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Users className="w-6 h-6 text-emerald-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                        Personalized Plans
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
                        Tailored nutrition strategies for your goals
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Award className="w-6 h-6 text-emerald-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                        Evidence-Based
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
                        Science-backed nutrition recommendations
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-emerald-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                        Ongoing Support
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
                        Continuous guidance and motivation
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">
                  Specializations
                </h2>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default AboutMePage 