import React from 'react'
import { motion } from 'framer-motion'
import { Users, DollarSign, Package, TrendingUp } from 'lucide-react'

const DashboardSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Total Users</h3>
        <Users className="w-8 h-8 text-emerald-500" />
      </div>
      <p className="text-3xl font-bold text-emerald-500">1,234</p>
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">+12% from last month</p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Revenue</h3>
        <DollarSign className="w-8 h-8 text-emerald-500" />
      </div>
      <p className="text-3xl font-bold text-emerald-500">$12,345</p>
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">+8% from last month</p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Active Plans</h3>
        <Package className="w-8 h-8 text-emerald-500" />
      </div>
      <p className="text-3xl font-bold text-emerald-500">456</p>
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">+5% from last month</p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Growth Rate</h3>
        <TrendingUp className="w-8 h-8 text-emerald-500" />
      </div>
      <p className="text-3xl font-bold text-emerald-500">15%</p>
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">+3% from last month</p>
    </motion.div>
  </div>
)

export default DashboardSection 