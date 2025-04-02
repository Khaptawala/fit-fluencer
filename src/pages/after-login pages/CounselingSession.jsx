import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardList,
  Coffee,
  Calendar,
  Activity,
  Heart,
  Stethoscope,
  MessageCircle,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import { useNavigate } from 'react-router-dom';

// Import the counseling session forms
import FirstCounselingForm from './counseling/FirstSession';
import SecondCounselingForm from './counseling/SecondSession';
import ThirdCounselingForm from './counseling/ThirdSession';

const CounselingSessionPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("session1");
  const [profileData, setProfileData] = useState(null);
  
//   useEffect(() => {
//     // Get profile data from localStorage
//     const savedProfileData = localStorage.getItem('profileData');
//     if (savedProfileData) {
//       setProfileData(JSON.parse(savedProfileData));
//     } else {
//       // If no profile data, redirect to profile summary page
//       navigate('/profile-summary');
//     }
//   }, [navigate]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="bg-emerald-50 border-b border-slate-200">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-bold text-emerald-700">Counseling Sessions</CardTitle>
                <CardDescription>Track your fitness journey through personalized counseling</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/profile-summary')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Profile
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <Tabs defaultValue="session1" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="session1" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
                  Initial Assessment
                </TabsTrigger>
                <TabsTrigger value="session2" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
                  Follow-Up Session
                </TabsTrigger>
                <TabsTrigger value="session3" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
                  Progress Evaluation
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="session1">
                <FirstCounselingForm 
                  profileData={profileData} 
                  onComplete={() => setActiveTab("session2")}
                />
              </TabsContent>
              
              <TabsContent value="session2">
                <SecondCounselingForm 
                  profileData={profileData}
                  onComplete={() => setActiveTab("session3")}
                />
              </TabsContent>
              
              <TabsContent value="session3">
                <ThirdCounselingForm 
                  profileData={profileData}
                  onComplete={() => navigate('/dashboard')}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CounselingSessionPage; 