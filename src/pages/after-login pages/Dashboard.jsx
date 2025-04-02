import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  User,
  Calendar,
  TrendingUp,
  Award,
  BarChart2,
  Clock,
  Star,
  FileText,
  MessageCircle,
  Bell,
  Settings,
  ChevronRight,
  Heart,
  Zap,
  Dumbbell,
  Coffee,
  Home,
  LayoutDashboard,
  LogOut,
  PieChart,
  Menu,
  X,
  Plus,
  ChevronDown
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
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';

// Enhanced progress chart component
export const CircularProgress = ({ value, size = 90, strokeWidth = 10, color, label }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = ((100 - value) / 100) * circumference;
  
  return (
    <div className="relative flex flex-col items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        {/* Background gradient for track */}
        <defs>
          <linearGradient id={`gradient-${value}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        
        {/* Track with gradient */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#gradient-${value})`}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: progress }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{value}%</span>
        {label && <span className="text-xs text-slate-500 mt-1">{label}</span>}
      </div>
    </div>
  );
};

const MetricCard = ({ icon: Icon, title, value, trend, description, delay, colorClass }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="h-full border-none shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10`}>
              <Icon className={`h-5 w-5 ${colorClass}`} />
            </div>
            {trend && (
              <Badge variant={trend === 'up' ? 'success' : 'destructive'} className="text-xs">
                {trend === 'up' ? '+' : '-'}{Math.abs(trend.value)}%
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-1">{value}</div>
          <CardDescription>{title}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Sidebar navigation link
const SidebarLink = ({ icon: Icon, label, active, onClick, route }) => {
  return route ? (
    <Link 
      to={route}
      className={`flex items-center w-full py-2 px-3 rounded-lg transition-colors ${
        active 
          ? 'bg-emerald-100 text-emerald-800 font-medium' 
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      <Icon className={`h-5 w-5 mr-3 ${active ? 'text-emerald-600' : 'text-slate-500'}`} />
      <span>{label}</span>
    </Link>
  ) : (
    <button 
      onClick={onClick}
      className={`flex items-center w-full py-2 px-3 rounded-lg transition-colors ${
        active 
          ? 'bg-emerald-100 text-emerald-800 font-medium' 
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      <Icon className={`h-5 w-5 mr-3 ${active ? 'text-emerald-600' : 'text-slate-500'}`} />
      <span>{label}</span>
    </button>
  );
};

const DashboardPage = () => {
  // Mock data
  const user = {
    name: 'Rahul Sharma',
    avatar: '/profile-avatar.jpg',
    plan: '3-Month Plan',
    joinDate: 'March 15, 2023',
    daysActive: 48,
    email: 'rahul.s@example.com',
    dietitian: 'Dr. Sarah Johnson',
    trainer: 'Mike Peterson'
  };

  const metrics = [
    { icon: Heart, title: 'Active Days', value: '48/90', colorClass: 'text-rose-500' },
    { icon: Zap, title: 'Current Streak', value: '7 days', colorClass: 'text-amber-500' },
    { icon: Award, title: 'Achievements', value: '12', colorClass: 'text-blue-500' },
    { icon: Star, title: 'Success Score', value: '86%', colorClass: 'text-emerald-500' }
  ];

  // State for sidebar visibility on mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // State for active section
  const [activeSection, setActiveSection] = useState('dashboard');

  // Get current date
  const currentDate = new Date();
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  // Sidebar navigation items
  const sidebarItems = [
    { icon: Home, label: 'Home', id: 'dashboard' },
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard-detail' },
    { icon: User, label: 'Profile Summary', id: 'profile-summary', route: '/profile-summary' },
    { icon: MessageCircle, label: 'Counseling Sessions', id: 'counseling-session', route: '/counseling-session' },
    { icon: Calendar, label: 'New Session', id: 'new-session' },
    { icon: TrendingUp, label: 'Progress Tracking', id: 'progress-tracking', route: '/progress-tracking' },
    { icon: Coffee, label: 'Today\'s Meal Plan', id: 'meal-plan' },
    { icon: Dumbbell, label: 'Today\'s Workouts', id: 'workouts' },
    { icon: PieChart, label: 'Daily Calories & Nutrition', id: 'nutrition-tracking', route: '/nutrition-tracking' },
  ];

  // User projects
  const userProjects = [
    { name: 'Weight Management', color: 'bg-emerald-500' },
    { name: 'Muscle Building', color: 'bg-blue-500' },
    { name: 'Endurance Training', color: 'bg-green-500' }
  ];

  // Function to render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
      case 'dashboard-detail':
        return (
          <>
            <div className="mb-8">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">Hello, {user.name.split(' ')[0]}</h2>
                <p className="text-xl text-emerald-500 font-medium">How can I help you today?</p>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Session
                </Button>
                <Button variant="outline">Track Progress</Button>
                <Button variant="outline">View Workouts</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 space-y-6">
                <Card className="overflow-hidden border border-slate-200 shadow-sm">
                  <CardHeader className="bg-white p-4 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <LayoutDashboard className="h-5 w-5 text-emerald-500" />
                        <CardTitle className="text-base font-medium">Your Progress</CardTitle>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs h-8">
                        <Plus className="h-4 w-4 mr-1" /> Add Goal
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <NextSessionCard delay={0.2} />
                      <ProgressTrackerCard delay={0.25} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <MealPlanCard delay={0.3} />
                      <WorkoutCard delay={0.35} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-4 space-y-6">
                <Card className="overflow-hidden border border-slate-200 shadow-sm">
                  <CardHeader className="bg-white p-4 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-emerald-500" />
                        <CardTitle className="text-base font-medium">Upcoming</CardTitle>
                      </div>
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="border-b border-slate-100 p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Nutrition Consultation</h4>
                          <div className="flex items-center text-sm text-slate-500 mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Tomorrow, 10:00 AM</span>
                          </div>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">Upcoming</Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Fitness Assessment</h4>
                          <div className="flex items-center text-sm text-slate-500 mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Friday, 2:00 PM</span>
                          </div>
                        </div>
                        <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-200">Scheduled</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border border-slate-200 shadow-sm">
                  <CardHeader className="bg-white p-4 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-emerald-500" />
                        <CardTitle className="text-base font-medium">Progress Summary</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {metrics.map((metric, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-lg ${metric.colorClass} bg-opacity-10 mr-3`}>
                              <metric.icon className={`h-4 w-4 ${metric.colorClass}`} />
                            </div>
                            <span className="text-sm font-medium">{metric.title}</span>
                          </div>
                          <span className="font-medium">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        );
      case 'profile-summary':
        // This will be handled by the router navigation
        return null;
      case 'counseling-session':
        // This will be handled by the router navigation
        return null;
      case 'new-session':
        return (
          <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-slate-500">New Session content will be displayed here</p>
          </div>
        );
      case 'progress-tracking':
        // This will also be handled by router navigation
        return null;
      case 'meal-plan':
        return <MealPlanCard delay={0.2} />;
      case 'workouts':
        return <WorkoutCard delay={0.2} />;
      case 'nutrition-tracking':
        // This will also be handled by router navigation
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Mobile Sidebar Toggle */}
      <button 
        className="md:hidden fixed z-50 bottom-4 right-4 bg-emerald-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside 
        className={`bg-white border-r border-slate-200 w-60 fixed inset-y-0 left-0 z-40 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* User profile in sidebar */}
          <div className="p-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-emerald-200">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-emerald-100 text-emerald-800">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-medium">{user.name}</h2>
                <p className="text-xs text-slate-500">Online</p>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 p-4 space-y-1">
            {sidebarItems.map((item) => (
              <SidebarLink
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeSection === item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                route={item.route}
              />
            ))}
          </nav>
          
          {/* User projects section */}
          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-slate-600">My Goals</h3>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {userProjects.map((project, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100">
                  <div className={`w-2 h-2 rounded-full ${project.color}`}></div>
                  <span className="text-sm text-slate-700">{project.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-60 overflow-auto bg-gray-50">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header with date and profile */}
          <header className="flex justify-between items-center mb-8">
            <div>
              <p className="text-sm text-slate-500">{formattedDate}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button size="icon" variant="ghost" className="text-slate-600">
                <Bell className="h-5 w-5" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-emerald-100 text-emerald-800">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setActiveSection('dashboard')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/user-profile" className="flex items-center w-full">
                      <User className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main content area */}
          <div>
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

// Keeping the component implementations but modifying the styles
const NextSessionCard = ({ delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm h-full">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-5 w-5 text-emerald-500" />
          <h3 className="font-medium">Next Session</h3>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h4 className="font-medium">Nutrition Consultation</h4>
            <p className="text-slate-500 text-sm">with Dr. Sarah Johnson</p>
          </div>
          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatar-nutritionist.jpg" alt="Dr. Sarah" />
            <AvatarFallback className="bg-emerald-100 text-emerald-800">SJ</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex items-center text-sm text-slate-500 mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <span>Tomorrow, 10:00 AM - 11:00 AM</span>
        </div>
        <Button variant="outline" size="sm" className="w-full">
          Join Session
        </Button>
      </div>
    </motion.div>
  );
};

const ProgressTrackerCard = ({ delay }) => {
  const goals = [
    { name: 'Weight Goal', current: 68, target: 65, unit: 'kg', progress: 66 },
    { name: 'Workout Goal', current: 16, target: 20, unit: 'sessions', progress: 80 },
    { name: 'Protein Intake', current: 85, target: 100, unit: 'g/day', progress: 85 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm h-full">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-5 w-5 text-emerald-500" />
          <h3 className="font-medium">Progress Tracker</h3>
        </div>
        <div className="flex justify-between mb-6">
          <CircularProgress value={66} color="#10b981" label="Weight" />
          <CircularProgress value={80} color="#10b981" label="Workouts" />
          <CircularProgress value={85} color="#10b981" label="Protein" />
        </div>
        <div className="space-y-4">
          {goals.map((goal, i) => (
            <div key={i} className="bg-slate-50 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">{goal.name}</span>
                <span className="text-sm text-slate-500">
                  {goal.current} / {goal.target} {goal.unit}
                </span>
              </div>
              <div className="flex items-center">
                <div className="relative flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <span className="ml-3 text-xs font-medium text-emerald-600">{goal.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const MealPlanCard = ({ delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm h-full">
        <div className="flex items-center gap-2 mb-3">
          <Coffee className="h-5 w-5 text-emerald-500" />
          <h3 className="font-medium">Today's Meal Plan</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="bg-amber-100 text-amber-800 p-1.5 rounded-md mr-3">
              <Coffee className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Breakfast</h4>
              <p className="text-xs text-slate-500">Protein smoothie with berries</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-emerald-100 text-emerald-800 p-1.5 rounded-md mr-3">
              <Coffee className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Lunch</h4>
              <p className="text-xs text-slate-500">Grilled chicken salad with quinoa</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-indigo-100 text-indigo-800 p-1.5 rounded-md mr-3">
              <Coffee className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Dinner</h4>
              <p className="text-xs text-slate-500">Baked salmon with vegetables</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const WorkoutCard = ({ delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm h-full">
        <div className="flex items-center gap-2 mb-3">
          <Dumbbell className="h-5 w-5 text-emerald-500" />
          <h3 className="font-medium">Today's Workout</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg">
            <div className="flex items-center">
              <div className="bg-emerald-100 text-emerald-800 p-1.5 rounded-md mr-3">
                <Dumbbell className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Core Circuit</h4>
                <p className="text-xs text-slate-500">15 mins • 4 exercises</p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="h-8">Start</Button>
          </div>
          <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg">
            <div className="flex items-center">
              <div className="bg-emerald-100 text-emerald-800 p-1.5 rounded-md mr-3">
                <Dumbbell className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Upper Body</h4>
                <p className="text-xs text-slate-500">25 mins • 6 exercises</p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="h-8">Start</Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPage; 