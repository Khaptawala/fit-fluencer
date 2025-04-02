import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Copy, UserPlus, Users, Link as LinkIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const InviteLinkPage = () => {
  const [creatorName, setCreatorName] = useState('')
  const [role, setRole] = useState('client')
  const [generatedLink, setGeneratedLink] = useState('')

  const generateLink = () => {
    if (!creatorName) {
      toast.error('Please enter your name')
      return
    }

    // Create encoded parameters
    const params = new URLSearchParams()
    params.append('creator', encodeURIComponent(creatorName))
    params.append('role', role)

    // Generate link with base URL
    const baseUrl = window.location.origin
    const link = `${baseUrl}/register?${params.toString()}`
    setGeneratedLink(link)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink)
      .then(() => toast.success('Link copied to clipboard!'))
      .catch(() => toast.error('Failed to copy link'))
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-b from-white to-emerald-50 dark:from-slate-950 dark:to-slate-900 py-12"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent mb-4">
              Generate Invitation Link
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Create a personalized invitation link for new users to join your network
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Your Name (Link Creator)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    className="w-full px-4 py-3 pl-12 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-900"
                    placeholder="Enter your name"
                  />
                  <UserPlus className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Role for New User
                </label>
                <div className="relative">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 pl-12 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-900 appearance-none"
                  >
                    <option value="client">Client</option>
                    <option value="dietitian">Dietitian</option>
                  </select>
                  <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateLink}
                className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20 font-medium"
              >
                Generate Link
              </motion.button>
            </div>
            
            {generatedLink && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center gap-2 mb-4">
                  <LinkIcon className="h-5 w-5 text-emerald-500" />
                  <h3 className="font-semibold text-slate-700 dark:text-slate-300">Invitation Link</h3>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={generatedLink}
                    className="flex-grow p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm overflow-hidden"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyToClipboard}
                    className="p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <Copy className="h-5 w-5" />
                  </motion.button>
                  <Link to={generatedLink}>
                          go
                  </Link>
                </div>
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                  Share this link with the new {role} user to invite them to register.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default InviteLinkPage 