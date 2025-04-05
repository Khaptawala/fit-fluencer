import React, { useState, useEffect } from 'react';
import { 
  FaChevronDown, 
  FaChevronRight, 
  FaUserMd, 
  FaUsers, 
  FaBuilding, 
  FaUser, 
  FaRunning, 
  FaTrophy, 
  FaChartLine, 
  FaSearch, 
  FaClipboardList, 
  FaFileAlt
} from 'react-icons/fa';
import { motion } from 'framer-motion';

// Sample data - replace with actual API call
const sampleData = {
  company: {
    name: "FitFluencer",
    dietitians: [
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        teams: [
          { 
            id: 101, 
            name: "Weight Loss Group A", 
            members: 15,
            membersList: [
              { id: 1001, name: "Alex Johnson", age: 32, goal: "Lose 10kg", progress: "7kg lost" },
              { id: 1002, name: "Maria Garcia", age: 28, goal: "Lose 5kg", progress: "3kg lost" },
              { id: 1003, name: "Robert Chen", age: 45, goal: "Improve fitness", progress: "Consistent attendance" },
              { id: 1004, name: "James Wilson", age: 38, goal: "Lose 15kg", progress: "9kg lost" },
              { id: 1005, name: "Sofia Rodriguez", age: 29, goal: "Tone muscles", progress: "Great improvement" },
              { id: 1006, name: "Michael Brown", age: 41, goal: "Lose 8kg", progress: "5kg lost" },
              { id: 1007, name: "Emma Davis", age: 36, goal: "Reduce body fat", progress: "3% reduction" },
              { id: 1008, name: "Christopher Lee", age: 33, goal: "Lose 12kg", progress: "6kg lost" },
              { id: 1009, name: "Olivia Martinez", age: 27, goal: "Increase endurance", progress: "Significant improvement" },
              { id: 1010, name: "David Taylor", age: 31, goal: "Lose 7kg", progress: "4kg lost" },
              { id: 1011, name: "Sophia Thomas", age: 34, goal: "General fitness", progress: "Regular attendance" },
              { id: 1012, name: "Daniel Anderson", age: 40, goal: "Lose 20kg", progress: "12kg lost" },
              { id: 1013, name: "Grace White", age: 35, goal: "Improve health", progress: "BP normalized" },
              { id: 1014, name: "John Martin", age: 42, goal: "Lose 10kg", progress: "8kg lost" },
              { id: 1015, name: "Isabella Moore", age: 30, goal: "Nutrition guidance", progress: "Diet improvements" }
            ] 
          },
          { 
            id: 102, 
            name: "Fitness Enthusiasts", 
            members: 12,
            membersList: [
              { id: 2001, name: "William Scott", age: 25, goal: "Muscle gain", progress: "5kg muscle added" },
              { id: 2002, name: "Ava Nelson", age: 29, goal: "Marathon training", progress: "20km achieved" },
              { id: 2003, name: "Ethan Wright", age: 32, goal: "Overall fitness", progress: "Excellent progress" },
              { id: 2004, name: "Charlotte Green", age: 27, goal: "Strength training", progress: "30% strength increase" },
              { id: 2005, name: "Noah King", age: 34, goal: "Endurance building", progress: "Completed triathlon" },
              { id: 2006, name: "Amelia Baker", age: 31, goal: "Conditioning", progress: "Significant improvement" },
              { id: 2007, name: "Benjamin Adams", age: 28, goal: "Muscle definition", progress: "Visible progress" },
              { id: 2008, name: "Mia Phillips", age: 33, goal: "Athletic performance", progress: "Personal records" },
              { id: 2009, name: "Lucas Evans", age: 26, goal: "Sports specific", progress: "Enhanced performance" },
              { id: 2010, name: "Harper Campbell", age: 30, goal: "Body recomposition", progress: "Balanced results" },
              { id: 2011, name: "Mason Mitchell", age: 35, goal: "Functional fitness", progress: "Movement improvement" },
              { id: 2012, name: "Evelyn Carter", age: 29, goal: "General fitness", progress: "Consistent improvement" }
            ] 
          }
        ]
      },
      {
        id: 2,
        name: "Dr. Michael Chen",
        teams: [
          { 
            id: 201, 
            name: "Sports Nutrition", 
            members: 20,
            membersList: [
              { id: 3001, name: "Liam Roberts", age: 22, goal: "Athletic performance", progress: "Significant improvement" },
              { id: 3002, name: "Ella Turner", age: 25, goal: "Nutrition planning", progress: "Optimal diet plan" },
              { id: 3003, name: "Jackson Cooper", age: 21, goal: "Competition prep", progress: "Ready for competition" },
              // Additional members would be listed here
            ] 
          },
          { 
            id: 202, 
            name: "Diabetes Management", 
            members: 8,
            membersList: [
              { id: 4001, name: "Aiden Morgan", age: 55, goal: "Blood sugar control", progress: "Consistent levels" },
              { id: 4002, name: "Scarlett Murphy", age: 48, goal: "Weight management", progress: "5kg lost" },
              { id: 4003, name: "Grayson Perez", age: 62, goal: "Dietary balance", progress: "Improved diet" },
              // Additional members would be listed here
            ] 
          }
        ]
      },
      {
        id: 3,
        name: "Dr. Emily Rodriguez",
        teams: [
          { 
            id: 301, 
            name: "Vegan Nutrition", 
            members: 10,
            membersList: [
              { id: 5001, name: "Riley Thompson", age: 27, goal: "Balanced nutrition", progress: "Nutritional needs met" },
              { id: 5002, name: "Layla Sanchez", age: 31, goal: "Ethical eating", progress: "Successful transition" },
              // Additional members would be listed here
            ] 
          },
          { 
            id: 302, 
            name: "Prenatal Nutrition", 
            members: 15,
            membersList: [
              { id: 6001, name: "Madison Lewis", age: 29, goal: "Healthy pregnancy", progress: "Optimal weight gain" },
              { id: 6002, name: "Zoe Ward", age: 33, goal: "Nutritional needs", progress: "All requirements met" },
              // Additional members would be listed here
            ] 
          }
        ]
      }
    ]
  }
};

// Animation variants for Framer Motion
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

const listItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

// Calculate total members across all teams
const getTotalMembers = (data) => {
  if (!data) return 0;
  return data.company.dietitians.reduce((total, dietitian) => {
    return total + dietitian.teams.reduce((teamTotal, team) => teamTotal + team.members, 0);
  }, 0);
};

const ViewTeam = () => {
  const [teamData, setTeamData] = useState(null);
  const [expandedDietitians, setExpandedDietitians] = useState({});
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalMembers, setTotalMembers] = useState(0);

  useEffect(() => {
    // In a real application, fetch data from an API
    // For now, using sample data
    setTeamData(sampleData);
    setTotalMembers(getTotalMembers(sampleData));
    
    // Auto-expand the first dietitian for better UX
    if (sampleData.company.dietitians.length > 0) {
      setExpandedDietitians({ 1: true });
    }
  }, []);

  const toggleDietitian = (dietitianId) => {
    setExpandedDietitians({
      ...expandedDietitians,
      [dietitianId]: !expandedDietitians[dietitianId]
    });
  };

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
  };

  // Filter team members based on search
  const filteredMembers = selectedTeam?.membersList.filter(member => 
    searchTerm === "" || 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.goal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!teamData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-lg">Loading team structure...</span>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="container mx-auto p-6"
      style={{
        background: "linear-gradient(to bottom, #f9faff, #ffffff)"
      }}
    >
      <motion.div
        className="relative mb-10 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        <motion.h1 
          className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 text-transparent bg-clip-text"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            textShadow: "0 10px 20px rgba(0, 0, 100, 0.05)"
          }}
        >
          Team Hierarchy View
        </motion.h1>
        <motion.div
          className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        />
        <motion.p
          className="text-gray-600 mt-2 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Visualize your organization's team structure, with dietitians and their respective team members
        </motion.p>

        {/* Decorative elements */}
        <motion.div 
          className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-blue-50 opacity-70 z-0"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        />
        <motion.div 
          className="absolute -bottom-10 -right-10 w-16 h-16 rounded-full bg-indigo-50 opacity-70 z-0"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        />
      </motion.div>
      
      <div className="flex flex-col md:flex-row gap-6 relative">
        {/* Decorative connection lines */}
        <div className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 border-t-2 border-dashed border-indigo-100 hidden md:block"></div>
        
        {/* Tree Structure */}
        <motion.div 
          className="md:w-1/2 bg-white rounded-lg shadow-lg p-6 border border-gray-100 z-10"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ 
            boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
            background: "linear-gradient(to right bottom, #ffffff, #fafbff)" 
          }}
          whileHover={{ 
            boxShadow: "rgba(50, 50, 93, 0.3) 0px 15px 30px -5px, rgba(0, 0, 0, 0.35) 0px 10px 20px -8px" 
          }}
        >
          <div className="mb-4">
            <motion.div 
              className="flex items-center justify-between font-bold text-xl mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg"
              whileHover={{ 
                scale: 1.01,
                boxShadow: "0 4px 15px rgba(0, 0, 100, 0.1)" 
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 bg-opacity-10 rounded-lg shadow-inner transform transition-transform hover:rotate-12">
                  <FaBuilding className="text-blue-600 text-2xl transform hover:scale-110 transition-transform" />
                </div>
                <span>{teamData.company.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative p-2 bg-indigo-100 rounded-full shadow-sm">
                  <FaUsers className="text-indigo-600" />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 400 }}
                    className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {totalMembers}
                  </motion.div>
                </div>
                <span className="text-sm font-normal text-indigo-700">Total Members</span>
              </div>
            </motion.div>
            
            <div className="pl-6 border-l-2 border-blue-100">
              {teamData.company.dietitians.map((dietitian) => (
                <motion.div 
                  key={dietitian.id} 
                  className="mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: dietitian.id * 0.1 }}
                >
                  {/* Dietitian Level */}
                  <div 
                    className="flex items-center gap-2 cursor-pointer hover:bg-blue-50 p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-blue-100"
                    onClick={() => toggleDietitian(dietitian.id)}
                  >
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: expandedDietitians[dietitian.id] ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {expandedDietitians[dietitian.id] ? 
                        <FaChevronDown className="text-blue-500" /> : 
                        <FaChevronRight className="text-blue-500" />
                      }
                    </motion.div>
                    <div className="relative p-1.5 bg-gradient-to-br from-green-100 to-green-50 rounded-full transform transition-transform shadow-sm hover:shadow">
                      <FaUserMd className="text-green-600" />
                      <motion.div 
                        className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 300, 
                          delay: dietitian.id * 0.1 
                        }}
                      />
                    </div>
                    <span className="font-medium">{dietitian.name}</span>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: dietitian.id * 0.1 + 0.2 }}
                      className="ml-auto text-xs bg-green-50 text-green-700 rounded-full px-2 py-0.5 border border-green-100"
                    >
                      {dietitian.teams.length} Teams
                    </motion.div>
                  </div>
                  
                  {/* Teams Level */}
                  {expandedDietitians[dietitian.id] && (
                    <motion.div 
                      className="pl-8 mt-2 border-l-2 border-indigo-100"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      {dietitian.teams.map((team, index) => (
                        <motion.div 
                          key={team.id}
                          className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer mb-2 transition-all duration-300 border ${selectedTeam?.id === team.id ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-md' : 'hover:bg-gray-50 border-transparent hover:border-gray-200'}`}
                          onClick={() => handleTeamClick(team)}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          whileHover={{ 
                            scale: 1.03, 
                            y: -2,
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                          }}
                          style={selectedTeam?.id === team.id ? {
                            boxShadow: "rgba(23, 92, 230, 0.15) 0px 4px 24px"
                          } : {}}
                        >
                          <div className="relative">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${selectedTeam?.id === team.id ? 'bg-indigo-500 shadow-lg' : 'bg-indigo-100'}`}>
                              <FaUsers className={`${selectedTeam?.id === team.id ? 'text-white' : 'text-indigo-500'}`} />
                            </div>
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ 
                                delay: 0.5 + index * 0.1,
                                type: "spring",
                                stiffness: 400
                              }}
                              className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-100 border border-indigo-200 text-indigo-700 rounded-full flex items-center justify-center text-[8px] font-bold"
                            >
                              {index + 1}
                            </motion.div>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-800">{team.name}</div>
                            <div className="text-xs text-gray-500">ID: {team.id}</div>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs bg-indigo-100 text-indigo-800 rounded-full px-2 py-1 font-medium border border-indigo-200 flex items-center gap-1">
                              <FaUsers className="text-indigo-400 text-[10px]" />
                              <span>{team.members}</span>
                            </span>
                            <motion.div
                              whileHover={{ rotate: 45, scale: 1.2 }}
                              className="ml-2 p-1 rounded-full hover:bg-indigo-100 transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                              </svg>
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Team Details */}
        <motion.div 
          className="md:w-1/2 bg-white rounded-lg shadow-lg p-6 overflow-auto border border-gray-100"
          style={{ 
            maxHeight: '80vh',
            boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
            background: "linear-gradient(to right bottom, #ffffff, #fcfcff)"
          }}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          whileHover={{ 
            boxShadow: "rgba(50, 50, 93, 0.3) 0px 15px 30px -5px, rgba(0, 0, 0, 0.35) 0px 10px 20px -8px" 
          }}
        >
          {selectedTeam ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <motion.div 
                className="flex items-center gap-3 mb-6"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="p-3 bg-gradient-to-br from-indigo-100 to-blue-50 rounded-lg shadow-md transform hover:rotate-3 transition-transform">
                  <FaUsers className="text-indigo-600 text-xl" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-blue-700 bg-clip-text text-transparent">
                  {selectedTeam.name}
                </h2>
              </motion.div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <motion.div 
                  className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-lg border border-gray-200 flex items-center gap-3 hover:shadow-md transition-all duration-200"
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 10px 20px rgba(0, 0, 100, 0.1)",
                    borderColor: "#ccd6ff"
                  }}
                >
                  <div className="p-2 bg-blue-100 rounded-lg shadow-inner">
                    <FaClipboardList className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Team ID</div>
                    <div className="font-medium">{selectedTeam.id}</div>
                  </div>
                </motion.div>
                <motion.div 
                  className="bg-gradient-to-br from-gray-50 to-green-50 p-4 rounded-lg border border-gray-200 flex items-center gap-3 hover:shadow-md transition-all duration-200"
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 10px 20px rgba(0, 100, 0, 0.1)",
                    borderColor: "#ccffcc"
                  }}
                >
                  <div className="p-2 bg-green-100 rounded-lg shadow-inner">
                    <FaUsers className="text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Total Members</div>
                    <div className="font-medium">{selectedTeam.members}</div>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="relative mb-6"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 shadow-sm hover:shadow transition-shadow"
                  placeholder="Search members by name or goal..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-2 mb-4 p-2 border-b border-indigo-100"
                whileHover={{ 
                  backgroundColor: "rgba(240, 245, 255, 0.5)",
                  borderColor: "#818cf8"
                }}
              >
                <FaChartLine className="text-indigo-600" />
                <h3 className="text-xl font-semibold">Team Members</h3>
                <span className="text-xs bg-indigo-100 text-indigo-800 rounded-full px-2 py-1 ml-auto">
                  {filteredMembers.length} of {selectedTeam.members}
                </span>
              </motion.div>
              
              <motion.div 
                className="space-y-4"
                variants={fadeIn}
              >
                {filteredMembers.map((member, index) => (
                  <motion.div 
                    key={member.id} 
                    className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                    style={{
                      transform: "perspective(1000px)",
                      transformStyle: "preserve-3d",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                    }}
                    variants={listItem}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ 
                      scale: 1.03, 
                      y: -5,
                      rotateX: 2,
                      rotateY: 2,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      borderColor: "#818cf8"
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-blue-50 flex items-center justify-center shadow-md">
                          <FaUser className="text-indigo-600" />
                        </div>
                        <motion.div 
                          className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center border-2 border-white"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.05, type: "spring" }}
                        >
                          <span className="text-white text-xs">✓</span>
                        </motion.div>
                      </div>
                      <span className="font-medium text-gray-800">{member.name}</span>
                      <span className="text-xs bg-indigo-50 text-indigo-800 rounded-full px-2 py-1 ml-auto font-medium border border-indigo-100">
                        {member.age} yrs
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm mt-3">
                      <motion.div 
                        className="flex items-center gap-2 bg-amber-50 rounded-lg p-2 border border-amber-100"
                        whileHover={{ 
                          backgroundColor: "#fff8e6",
                          y: -2,
                          boxShadow: "0 4px 6px -1px rgba(251, 191, 36, 0.1)"
                        }}
                      >
                        <div className="p-1 bg-amber-100 rounded-full">
                          <FaTrophy className="text-amber-500" />
                        </div>
                        <div>
                          <span className="text-gray-600 text-xs">Goal:</span>
                          <div className="font-medium text-gray-800">{member.goal}</div>
                        </div>
                      </motion.div>
                      <motion.div 
                        className="flex items-center gap-2 bg-green-50 rounded-lg p-2 border border-green-100"
                        whileHover={{ 
                          backgroundColor: "#f0fff4",
                          y: -2,
                          boxShadow: "0 4px 6px -1px rgba(52, 211, 153, 0.1)"
                        }}
                      >
                        <div className="p-1 bg-green-100 rounded-full">
                          <FaRunning className="text-green-500" />
                        </div>
                        <div>
                          <span className="text-gray-600 text-xs">Progress:</span>
                          <div className="text-green-600 font-medium">{member.progress}</div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto transform hover:translate-y-[-3px]">
                  <FaFileAlt />
                  <span>View Detailed Team Report</span>
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              className="flex flex-col items-center justify-center h-full text-gray-500 py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.3
                }}
                className="relative w-24 h-24 mb-6"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-blue-50 rounded-full shadow-inner flex items-center justify-center">
                  <FaUsers className="text-6xl text-indigo-300" />
                </div>
                <div className="absolute top-0 right-0 w-8 h-8 bg-indigo-100 rounded-full animate-pulse"></div>
                <div className="absolute bottom-3 left-0 w-6 h-6 bg-blue-100 rounded-full animate-ping"></div>
              </motion.div>
              <motion.p 
                className="text-xl mb-4 font-medium bg-gradient-to-r from-gray-500 to-gray-700 bg-clip-text text-transparent"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Select a team to view members
              </motion.p>
              <motion.p 
                className="text-gray-400 text-center max-w-md"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Click on a team from the hierarchy view on the left to see detailed information and member list
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ViewTeam; 