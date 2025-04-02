import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Weight, 
  Activity,
  Target,
  Clock,
  Edit,
  FileText,
  MessageCircle,
  Award
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Badge } from '../../../components/ui/badge';
import { Progress } from '../../../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [counselingSessions, setCounselingSessions] = useState({
    session1: null,
    session2: null,
    session3: null
  });
  
  useEffect(() => {
    // Get profile data from localStorage
    const savedProfileData = localStorage.getItem('profileData');
    if (savedProfileData) {
      setProfileData(JSON.parse(savedProfileData));
    }
    
    // Get counseling sessions data from localStorage
    const savedSession1 = localStorage.getItem('counselingSession1');
    const savedSession2 = localStorage.getItem('counselingSession2');
    const savedSession3 = localStorage.getItem('counselingSession3');
    
    setCounselingSessions({
      session1: savedSession1 ? JSON.parse(savedSession1) : null,
      session2: savedSession2 ? JSON.parse(savedSession2) : null,
      session3: savedSession3 ? JSON.parse(savedSession3) : null
    });
  }, []);
  
  // Function to calculate completed sessions
  const calculateCompletedSessions = () => {
    let count = 0;
    if (counselingSessions.session1) count++;
    if (counselingSessions.session2) count++;
    if (counselingSessions.session3) count++;
    return count;
  };
  
  // Mock user data (fallback if no profile data is found)
  const mockUserData = {
    name: "Rahul Sharma",
    email: "rahul.s@example.com",
    phone: "+91 98765 43210",
    joinDate: "March 15, 2023",
    gender: "Male",
    age: "32",
    height: "175",
    weight: "78",
    fitnessGoal: "Weight Loss",
    bmi: "25.5",
    bmiCategory: "Overweight",
    plan: "3-Month Plan",
    completedDays: 48,
    totalDays: 90
  };
  
  // Use profile data or fallback to mock data
  const userData = profileData || mockUserData;
  
  // Progress calculation
  const daysProgress = (userData.completedDays / userData.totalDays) * 100;
  const sessionsCompleted = calculateCompletedSessions();
  const sessionsProgress = (sessionsCompleted / 3) * 100;
  
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <div className="md:col-span-1">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-emerald-50 border-b border-slate-200 pb-4">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 border-4 border-white shadow-md mb-4">
                  <AvatarImage src="/profile-avatar.jpg" alt={userData.name} />
                  <AvatarFallback className="bg-emerald-100 text-emerald-800 text-xl">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl font-bold text-slate-800">{userData.name}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                    {userData.plan}
                  </Badge>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-100">
                    <Mail className="h-4 w-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-100">
                    <Phone className="h-4 w-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Phone Number</p>
                    <p className="font-medium">{userData.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-100">
                    <Calendar className="h-4 w-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Joined On</p>
                    <p className="font-medium">{userData.joinDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-100">
                    <Target className="h-4 w-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Fitness Goal</p>
                    <p className="font-medium">{userData.fitnessGoal}</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Link to="/profile-summary">
                    <Button variant="outline" className="w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Detailed Information */}
        <div className="md:col-span-2">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="details" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
                Personal Details
              </TabsTrigger>
              <TabsTrigger value="progress" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
                Progress
              </TabsTrigger>
              <TabsTrigger value="counseling" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
                Counseling
              </TabsTrigger>
            </TabsList>
            
            {/* Personal Details Tab */}
            <TabsContent value="details" className="space-y-6">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-200 pb-4">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <User className="h-5 w-5 mr-2 text-emerald-500" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-slate-500">Gender</p>
                      <p className="font-medium text-lg">{userData.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Age</p>
                      <p className="font-medium text-lg">{userData.age} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Height</p>
                      <p className="font-medium text-lg">{userData.height} cm</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Weight</p>
                      <p className="font-medium text-lg">{userData.weight} kg</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-200 pb-4">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Weight className="h-5 w-5 mr-2 text-emerald-500" />
                    BMI Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-slate-500">Current BMI</p>
                      <p className="font-medium text-lg">{userData.bmi}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Category</p>
                      <Badge className={`
                        ${userData.bmiCategory === 'Normal weight' ? 'bg-green-100 text-green-800' : ''}
                        ${userData.bmiCategory === 'Underweight' ? 'bg-blue-100 text-blue-800' : ''}
                        ${userData.bmiCategory === 'Overweight' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${userData.bmiCategory === 'Obesity' ? 'bg-red-100 text-red-800' : ''}
                      `}>
                        {userData.bmiCategory}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-slate-50 p-4 rounded-lg">
                    <div className="text-sm text-slate-500 mb-2">BMI Categories</div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Underweight</span>
                        <span className="font-medium">&lt; 18.5</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Normal weight</span>
                        <span className="font-medium">18.5 - 24.9</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Overweight</span>
                        <span className="font-medium">25 - 29.9</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Obesity</span>
                        <span className="font-medium">&gt; 30</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Progress Tab */}
            <TabsContent value="progress" className="space-y-6">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-200 pb-4">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-emerald-500" />
                    Program Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <p className="text-sm font-medium">Days Completed</p>
                        <p className="text-sm text-slate-500">{userData.completedDays} of {userData.totalDays} days</p>
                      </div>
                      <Progress value={daysProgress} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <p className="text-sm font-medium">Counseling Sessions</p>
                        <p className="text-sm text-slate-500">{sessionsCompleted} of 3 sessions</p>
                      </div>
                      <Progress value={sessionsProgress} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                      <div className="bg-slate-50 p-4 rounded-lg text-center">
                        <div className="text-3xl font-bold text-emerald-600">{userData.completedDays}</div>
                        <div className="text-sm text-slate-500">Days Active</div>
                      </div>
                      
                      <div className="bg-slate-50 p-4 rounded-lg text-center">
                        <div className="text-3xl font-bold text-emerald-600">{sessionsCompleted}</div>
                        <div className="text-sm text-slate-500">Counseling Sessions</div>
                      </div>
                      
                      <div className="bg-slate-50 p-4 rounded-lg text-center">
                        <div className="text-3xl font-bold text-emerald-600">
                          {Math.floor((userData.totalDays - userData.completedDays) / 7)}
                        </div>
                        <div className="text-sm text-slate-500">Weeks Remaining</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-200 pb-4">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Award className="h-5 w-5 mr-2 text-emerald-500" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg">
                      <div className="bg-emerald-100 text-emerald-800 p-2 rounded-full">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">First Week Completed</p>
                        <p className="text-xs text-slate-500">Completed 7 consecutive days</p>
                      </div>
                    </div>
                    
                    {sessionsCompleted >= 1 && (
                      <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg">
                        <div className="bg-blue-100 text-blue-800 p-2 rounded-full">
                          <MessageCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">First Counseling Session</p>
                          <p className="text-xs text-slate-500">Completed initial assessment</p>
                        </div>
                      </div>
                    )}
                    
                    {userData.completedDays >= 30 && (
                      <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg">
                        <div className="bg-purple-100 text-purple-800 p-2 rounded-full">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">1 Month Milestone</p>
                          <p className="text-xs text-slate-500">Completed 30 days of the program</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Counseling Tab */}
            <TabsContent value="counseling" className="space-y-6">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-200 pb-4">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2 text-emerald-500" />
                    Counseling Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className={`flex items-center gap-3 p-3 rounded-lg ${counselingSessions.session1 ? 'bg-emerald-50' : 'bg-slate-50'}`}>
                      <div className={`p-2 rounded-full ${counselingSessions.session1 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-500'}`}>
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium">Initial Counseling Session</p>
                          {counselingSessions.session1 ? (
                            <Badge className="bg-emerald-100 text-emerald-800">Completed</Badge>
                          ) : (
                            <Badge className="bg-slate-100 text-slate-800">Pending</Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">Lifestyle assessment and initial plan</p>
                      </div>
                    </div>
                    
                    <div className={`flex items-center gap-3 p-3 rounded-lg ${counselingSessions.session2 ? 'bg-emerald-50' : 'bg-slate-50'}`}>
                      <div className={`p-2 rounded-full ${counselingSessions.session2 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-500'}`}>
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium">Follow-Up Session</p>
                          {counselingSessions.session2 ? (
                            <Badge className="bg-emerald-100 text-emerald-800">Completed</Badge>
                          ) : (
                            <Badge className="bg-slate-100 text-slate-800">Pending</Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">Progress review and plan adjustments</p>
                      </div>
                    </div>
                    
                    <div className={`flex items-center gap-3 p-3 rounded-lg ${counselingSessions.session3 ? 'bg-emerald-50' : 'bg-slate-50'}`}>
                      <div className={`p-2 rounded-full ${counselingSessions.session3 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-500'}`}>
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium">Final Progress Evaluation</p>
                          {counselingSessions.session3 ? (
                            <Badge className="bg-emerald-100 text-emerald-800">Completed</Badge>
                          ) : (
                            <Badge className="bg-slate-100 text-slate-800">Pending</Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">Long-term strategy and future plans</p>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Link to="/counseling-session">
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                          {sessionsCompleted === 0 ? "Start Counseling" : 
                           sessionsCompleted === 3 ? "Review Counseling" : "Continue Counseling"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
