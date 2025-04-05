import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Copy, UserPlus, Users, Link as LinkIcon, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

const InviteLinkPage = () => {
  const [creatorName, setCreatorName] = useState('')
  const [role, setRole] = useState('client')
  const [email, setEmail] = useState('')
  const [generatedLink, setGeneratedLink] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const validateInputs = () => {
    if (!creatorName.trim()) {
      toast.error('Please enter your name')
      return false
    }
    
    // Optional email validation
    if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Please enter a valid email address')
      return false
    }
    
    return true
  }

  const generateLink = () => {
    if (!validateInputs()) {
      return
    }

    setIsGenerating(true)
    
    // Simulate API call or processing time
    setTimeout(() => {
      try {
        // Create encoded parameters
        const params = new URLSearchParams()
        params.append('creator', encodeURIComponent(creatorName.trim()))
        params.append('role', role)
        
        // Add email if provided
        if (email.trim()) {
          params.append('email', encodeURIComponent(email.trim()))
        }
        
        // Generate link with base URL
        const baseUrl = window.location.origin
        const link = `${baseUrl}/register?${params.toString()}`
        setGeneratedLink(link)
        toast.success('Invitation link generated successfully!')
      } catch (error) {
        toast.error('Failed to generate link. Please try again.')
        console.error('Link generation error:', error)
      } finally {
        setIsGenerating(false)
      }
    }, 800)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink)
      .then(() => toast.success('Link copied to clipboard!'))
      .catch(() => toast.error('Failed to copy link'))
  }
  
  const openLink = () => {
    window.open(generatedLink, '_blank')
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
                  Invitee Email (Optional)
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 pl-12 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-900"
                    placeholder="Optional: Pre-fill their email"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
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
                disabled={isGenerating}
                className={`w-full ${isGenerating ? 'bg-emerald-400' : 'bg-emerald-600 hover:bg-emerald-700'} text-white py-3 px-4 rounded-lg transition-colors shadow-lg shadow-emerald-500/20 font-medium flex items-center justify-center`}
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : "Generate Link"}
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
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="w-full">
                    <input
                      type="text"
                      readOnly
                      value={generatedLink}
                      className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm overflow-hidden"
                    />
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={copyToClipboard}
                      className="flex-1 sm:flex-none p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Copy className="h-5 w-5" />
                      <span className="sm:hidden md:inline">Copy</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={openLink}
                      className="flex-1 sm:flex-none p-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="h-5 w-5" />
                      <span className="sm:hidden md:inline">Open</span>
                    </motion.button>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                  Share this link with the new {role} user to invite them to register.
                  {email && <span> The email address {email} will be pre-filled for them.</span>}
                </p>

                <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800/30">
                  <p className="text-sm text-emerald-700 dark:text-emerald-300 flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                    </svg>
                    This link will direct users to a registration form with your name as the inviter and their role preset to {role}.
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default InviteLinkPage 