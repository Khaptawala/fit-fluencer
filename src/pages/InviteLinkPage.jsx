import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Copy, Share2, ExternalLink, Sparkles, UserPlus, Link as LinkIcon, CheckCircle } from 'lucide-react'

const InviteLinkPage = () => {
  const [clientLink, setClientLink] = useState('')
  const [dietitianLink, setDietitianLink] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeCard, setActiveCard] = useState(null)
  const [copyAnimation, setCopyAnimation] = useState(null)
  
  // We would normally fetch this from auth context
  // This is a placeholder for demonstration
  const loggedInUser = {
    name: "John Doe",
    id: "user123"
  }

  const generateClientLink = () => {
    setIsGenerating(true)
    setActiveCard('client')
    
    // Simulate API call
    setTimeout(() => {
      try {
        const baseUrl = window.location.origin
        const params = new URLSearchParams()
        params.append('creator', encodeURIComponent(loggedInUser.name))
        params.append('role', 'client')
        params.append('ref', loggedInUser.id)
        
        setClientLink(`${baseUrl}/register?${params.toString()}`)
        toast.success('Client invitation link generated!')
      } catch (error) {
        toast.error('Failed to generate link. Please try again.')
      } finally {
        setIsGenerating(false)
      }
    }, 800)
  }
  
  const generateDietitianLink = () => {
    setIsGenerating(true)
    setActiveCard('dietitian')
    
    // Simulate API call
    setTimeout(() => {
      try {
        const baseUrl = window.location.origin
        const params = new URLSearchParams()
        params.append('creator', encodeURIComponent(loggedInUser.name))
        params.append('role', 'dietitian')
        params.append('ref', loggedInUser.id)
        
        setDietitianLink(`${baseUrl}/register?${params.toString()}`)
        toast.success('Dietitian invitation link generated!')
      } catch (error) {
        toast.error('Failed to generate link. Please try again.')
      } finally {
        setIsGenerating(false)
      }
    }, 800)
  }

  const copyToClipboard = (link, type) => {
    navigator.clipboard.writeText(link)
      .then(() => {
        toast.success('Link copied to clipboard!')
        setCopyAnimation(type)
        setTimeout(() => setCopyAnimation(null), 1500)
      })
      .catch(() => toast.error('Failed to copy link'))
  }
  
  const openLink = (link) => {
    window.open(link, '_blank')
  }
  
  const shareLink = async (link, title) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join ${loggedInUser.name}'s FitFluencer Platform`,
          text: `${loggedInUser.name} is inviting you to join as a ${title}`,
          url: link,
        })
        toast.success('Link shared successfully!')
      } catch (error) {
        toast.error('Failed to share link')
      }
      } else {
      copyToClipboard(link)
    }
  }

  const cardVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 300, damping: 15 }
    },
    tap: {
      scale: 0.98,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { type: "spring", stiffness: 500, damping: 20 }
    }
  }

  // Shortened link for display
  const shortenLink = (link) => {
    if (!link) return '';
    // Get the part after the domain
    const url = new URL(link);
    return `${url.origin}/register?...`;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-950 dark:to-slate-900 py-10 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-block mb-4"
          >
            <span className="relative inline-flex">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 blur-xl opacity-30 rounded-full"></div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ ease: "linear", duration: 10, repeat: Infinity }}
                className="relative"
              >
                <Sparkles size={40} className="text-emerald-500" />
              </motion.div>
            </span>
          </motion.div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Invite Team Members
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Create personalized invitation links for clients and dietitians to join your fitness platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-4">
          {/* Client Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover="hover"
            whileTap="tap"
            variants={cardVariants}
            className={`bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg relative ${activeCard === 'client' ? 'ring-2 ring-blue-500' : ''}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-transparent opacity-60"></div>
            
            <div className="relative p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Client Invitation</h3>
                    <p className="text-slate-500 dark:text-slate-400">For health seekers & trainees</p>
                  </div>
                </div>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.3 }}
                  className={`h-8 w-8 rounded-full ${clientLink ? 'bg-green-500' : 'bg-blue-500'} flex items-center justify-center`}
                >
                  {clientLink ? (
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <UserPlus className="h-4 w-4 text-white" />
                  )}
                </motion.div>
              </div>
              
              <div className="mb-8">
                <div className="relative h-40 rounded-xl bg-blue-50 dark:bg-slate-900/50 overflow-hidden mb-6">
                  <motion.img 
                    src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Client"
                    className="w-full h-full object-cover object-center"
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-sm font-semibold">Perfect for:</p>
                    <p className="text-xs opacity-90">• Health tracking & monitoring</p>
                    <p className="text-xs opacity-90">• Nutrition meal plans</p>
                  </div>
                </div>
                
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Generate a personalized link for clients to join your platform with pre-filled credentials and instant access.
                </p>
                
                {clientLink ? (
                  <div className="space-y-4">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative"
                    >
                      <div className="absolute -left-2 -top-2 h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <LinkIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      
                      <div className="pt-5 pb-3 px-5 bg-gradient-to-r from-blue-500/10 to-blue-600/5 dark:from-blue-900/20 dark:to-blue-800/10 backdrop-blur-sm rounded-xl border border-blue-200 dark:border-blue-800/30 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md font-medium">Client Link</span>
                          </div>
                          <motion.div 
                            animate={copyAnimation === 'client' ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 0.5 }}
                          >
                            {copyAnimation === 'client' ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : null}
                          </motion.div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-stretch gap-3">
                          <div className="group relative flex-grow">
                            <div className="absolute inset-0 bg-blue-50 dark:bg-slate-700/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="text-sm text-slate-600 dark:text-slate-300 font-mono px-3 py-2 bg-white/70 dark:bg-slate-800/70 rounded-lg truncate relative">
                              {shortenLink(clientLink)}
                              <div className="absolute inset-y-0 right-2 flex items-center">
                                <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded hidden group-hover:block">Click to copy</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-1">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => copyToClipboard(clientLink, 'client')}
                              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 flex-1 sm:flex-initial flex items-center justify-center"
                              aria-label="Copy link"
                            >
                              <Copy className="h-4 w-4" />
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => shareLink(clientLink, 'Client')}
                              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 flex-1 sm:flex-initial flex items-center justify-center"
                              aria-label="Share link"
                            >
                              <Share2 className="h-4 w-4" />
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => openLink(clientLink)}
                              className="bg-slate-700 text-white p-2 rounded-lg hover:bg-slate-800 flex-1 sm:flex-initial flex items-center justify-center"
                              aria-label="Open link"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={generateClientLink}
                    disabled={isGenerating && activeCard === 'client'}
                    className={`w-full ${isGenerating && activeCard === 'client' ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 px-4 rounded-xl shadow-lg transition-colors font-medium flex items-center justify-center`}
                  >
                    {isGenerating && activeCard === 'client' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-5 w-5 mr-2" />
                        Generate Client Link
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Dietitian Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover="hover"
            whileTap="tap"
            variants={cardVariants}
            className={`bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg relative ${activeCard === 'dietitian' ? 'ring-2 ring-emerald-500' : ''}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/20 dark:to-transparent opacity-60"></div>
            
            <div className="relative p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0a6 6 0 11-12 0 6 6 0 0112 0zm-1.5 0a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Dietitian Invitation</h3>
                    <p className="text-slate-500 dark:text-slate-400">For nutrition experts</p>
                  </div>
                </div>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.3 }}
                  className={`h-8 w-8 rounded-full ${dietitianLink ? 'bg-green-500' : 'bg-emerald-500'} flex items-center justify-center`}
                >
                  {dietitianLink ? (
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <UserPlus className="h-4 w-4 text-white" />
                  )}
                </motion.div>
              </div>
              
              <div className="mb-8">
                <div className="relative h-40 rounded-xl bg-emerald-50 dark:bg-slate-900/50 overflow-hidden mb-6">
                  <motion.img 
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Dietitian"
                    className="w-full h-full object-cover object-center"
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-sm font-semibold">Perfect for:</p>
                    <p className="text-xs opacity-90">• Nutrition counseling</p>
                    <p className="text-xs opacity-90">• Diet plan creation</p>
                  </div>
                </div>
                
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Generate a personalized link for dietitians to join your platform with professional access and tools.
                </p>
                
                {dietitianLink ? (
                  <div className="space-y-4">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative"
                    >
                      <div className="absolute -left-2 -top-2 h-8 w-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                        <LinkIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      
                      <div className="pt-5 pb-3 px-5 bg-gradient-to-r from-emerald-500/10 to-emerald-600/5 dark:from-emerald-900/20 dark:to-emerald-800/10 backdrop-blur-sm rounded-xl border border-emerald-200 dark:border-emerald-800/30 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs rounded-md font-medium">Dietitian Link</span>
                          </div>
                          <motion.div 
                            animate={copyAnimation === 'dietitian' ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 0.5 }}
                          >
                            {copyAnimation === 'dietitian' ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : null}
                          </motion.div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-stretch gap-3">
                          <div className="group relative flex-grow">
                            <div className="absolute inset-0 bg-emerald-50 dark:bg-slate-700/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="text-sm text-slate-600 dark:text-slate-300 font-mono px-3 py-2 bg-white/70 dark:bg-slate-800/70 rounded-lg truncate relative">
                              {shortenLink(dietitianLink)}
                              <div className="absolute inset-y-0 right-2 flex items-center">
                                <div className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded hidden group-hover:block">Click to copy</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-1">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => copyToClipboard(dietitianLink, 'dietitian')}
                              className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 flex-1 sm:flex-initial flex items-center justify-center"
                              aria-label="Copy link"
                            >
                              <Copy className="h-4 w-4" />
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => shareLink(dietitianLink, 'Dietitian')}
                              className="bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-600 flex-1 sm:flex-initial flex items-center justify-center"
                              aria-label="Share link"
                            >
                              <Share2 className="h-4 w-4" />
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => openLink(dietitianLink)}
                              className="bg-slate-700 text-white p-2 rounded-lg hover:bg-slate-800 flex-1 sm:flex-initial flex items-center justify-center"
                              aria-label="Open link"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={generateDietitianLink}
                    disabled={isGenerating && activeCard === 'dietitian'}
                    className={`w-full ${isGenerating && activeCard === 'dietitian' ? 'bg-emerald-400' : 'bg-emerald-600 hover:bg-emerald-700'} text-white py-3 px-4 rounded-xl shadow-lg transition-colors font-medium flex items-center justify-center`}
                  >
                    {isGenerating && activeCard === 'dietitian' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-5 w-5 mr-2" />
                        Generate Dietitian Link
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12 text-sm text-slate-500 dark:text-slate-400"
        >
          <p>Links are personalized with your account information and expire in 7 days</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default InviteLinkPage 