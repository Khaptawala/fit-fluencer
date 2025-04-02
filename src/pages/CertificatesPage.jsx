import React from 'react'
import { motion } from 'framer-motion'
import { Award, Calendar, CheckCircle2 } from 'lucide-react'

const CertificatesPage = () => {
  const certificates = [
    {
      title: "Registered Dietitian Nutritionist (RDN)",
      issuer: "Academy of Nutrition and Dietetics",
      date: "2020",
      description: "Professional certification in clinical nutrition and dietetics",
      level: "Advanced"
    },
    {
      title: "Sports Nutrition Specialist",
      issuer: "International Society of Sports Nutrition",
      date: "2021",
      description: "Specialized certification in sports and performance nutrition",
      level: "Advanced"
    },
    {
      title: "Weight Management Specialist",
      issuer: "American Council on Exercise",
      date: "2021",
      description: "Expert certification in weight management and lifestyle coaching",
      level: "Advanced"
    },
    {
      title: "Medical Nutrition Therapy",
      issuer: "Academy of Nutrition and Dietetics",
      date: "2022",
      description: "Advanced certification in therapeutic nutrition interventions",
      level: "Advanced"
    },
    {
      title: "Nutrition Coach",
      issuer: "Precision Nutrition",
      date: "2022",
      description: "Comprehensive certification in nutrition coaching and behavior change",
      level: "Intermediate"
    },
    {
      title: "Functional Nutrition Practitioner",
      issuer: "Functional Nutrition Alliance",
      date: "2023",
      description: "Specialized certification in functional and integrative nutrition",
      level: "Advanced"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-white to-emerald-50 dark:from-slate-950 dark:to-slate-900"
    >
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
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
              Certificates & Qualifications
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Professional certifications and qualifications that demonstrate expertise in nutrition and dietetics
            </p>
          </motion.div>
        </div>
      </section>

      {/* Certificates Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                    <Award className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-1">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-2">
                      {cert.issuer}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 mb-3">
                      <Calendar className="w-4 h-4" />
                      {cert.date}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                      {cert.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        {cert.level}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Qualifications */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6">
              Continuous Professional Development
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              I regularly participate in continuing education programs and professional development activities to stay current with the latest research and best practices in nutrition and dietetics.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg shadow-lg shadow-emerald-500/20"
            >
              <Award className="w-5 h-5" />
              <span>View Professional Development Log</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default CertificatesPage 