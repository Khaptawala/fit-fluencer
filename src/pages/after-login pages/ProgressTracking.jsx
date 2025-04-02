import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar
} from 'recharts';
import {
  Activity,
  BarChart2,
  Calendar,
  ChevronDown,
  Clock,
  Dumbbell,
  FileText,
  FilePlus2,
  Heart,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Target,
  TrendingUp,
  User,
  Weight,
  Zap,
  Download
} from 'lucide-react';

import { CircularProgress } from '../after-login pages/Dashboard';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';

// Mock data for charts
const weightData = [
  { name: 'Week 1', weight: 75 },
  { name: 'Week 2', weight: 74.2 },
  { name: 'Week 3', weight: 73.5 },
  { name: 'Week 4', weight: 72.8 },
  { name: 'Week 5', weight: 72.1 },
  { name: 'Week 6', weight: 71.5 },
  { name: 'Week 7', weight: 71.0 },
  { name: 'Week 8', weight: 70.3 },
];

const caloriesData = [
  { name: 'Mon', consumed: 1800, burned: 2200 },
  { name: 'Tue', consumed: 1950, burned: 2100 },
  { name: 'Wed', consumed: 2050, burned: 2300 },
  { name: 'Thu', consumed: 1750, burned: 2150 },
  { name: 'Fri', consumed: 2100, burned: 2450 },
  { name: 'Sat', consumed: 2250, burned: 2200 },
  { name: 'Sun', consumed: 1900, burned: 1950 },
];

const workoutData = [
  { name: 'Week 1', cardio: 45, strength: 60, flexibility: 30 },
  { name: 'Week 2', cardio: 60, strength: 75, flexibility: 30 },
  { name: 'Week 3', cardio: 75, strength: 90, flexibility: 45 },
  { name: 'Week 4', cardio: 60, strength: 105, flexibility: 30 },
  { name: 'Week 5', cardio: 90, strength: 120, flexibility: 45 },
  { name: 'Week 6', cardio: 105, strength: 120, flexibility: 60 },
  { name: 'Week 7', cardio: 120, strength: 135, flexibility: 45 },
  { name: 'Week 8', cardio: 135, strength: 150, flexibility: 60 },
];

const macroData = [
  { name: 'Protein', value: 40 },
  { name: 'Carbs', value: 30 },
  { name: 'Fat', value: 25 },
  { name: 'Fiber', value: 5 },
];

const bodyCompData = [
  { name: 'Body Fat', value: 18 },
  { name: 'Muscle Mass', value: 45 },
  { name: 'Water', value: 30 },
  { name: 'Other', value: 7 },
];

const workoutDistributionData = [
  { name: 'Cardio', value: 30 },
  { name: 'Strength Training', value: 45 },
  { name: 'Flexibility', value: 15 },
  { name: 'HIIT', value: 10 },
];

const progressData = [
  { name: 'Weight Goal', progress: 75 },
  { name: 'Workout Goal', progress: 90 },
  { name: 'Strength Goal', progress: 65 },
  { name: 'Cardio Goal', progress: 80 },
  { name: 'Nutrition Goal', progress: 70 },
];

// Colors for charts
const COLORS = [
  '#10B981', // emerald-500
  '#3B82F6', // blue-500
  '#8B5CF6', // violet-500
  '#EC4899', // pink-500
  '#F97316', // orange-500
];

// Add nutrition data
const nutritionData = [
  { 
    id: 1,
    meal: "Breakfast", 
    items: "Protein smoothie with berries, banana, and almond milk", 
    calories: 350, 
    protein: 25, 
    carbs: 40, 
    fat: 10 
  },
  { 
    id: 2,
    meal: "Snack", 
    items: "Greek yogurt with honey and nuts", 
    calories: 220, 
    protein: 18, 
    carbs: 15, 
    fat: 8 
  },
  { 
    id: 3,
    meal: "Lunch", 
    items: "Grilled chicken salad with quinoa and olive oil dressing", 
    calories: 450, 
    protein: 35, 
    carbs: 30, 
    fat: 20 
  },
  { 
    id: 4,
    meal: "Snack", 
    items: "Protein bar and apple", 
    calories: 280, 
    protein: 15, 
    carbs: 35, 
    fat: 8 
  },
  { 
    id: 5,
    meal: "Dinner", 
    items: "Baked salmon with vegetables and brown rice", 
    calories: 520, 
    protein: 40, 
    carbs: 45, 
    fat: 18 
  },
];

const MetricCard = ({ icon: Icon, title, value, trend, description, delay, colorClass }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="h-full border-none shadow-sm bg-white">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10`}>
              <Icon className={`h-5 w-5 ${colorClass}`} />
            </div>
            {trend && (
              <Badge variant={trend.type === 'up' ? 'success' : 'destructive'} className="text-xs">
                {trend.type === 'up' ? '+' : '-'}{Math.abs(trend.value)}%
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-1">{value}</div>
          <CardDescription>{title}</CardDescription>
          {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ChartCard = ({ title, icon: Icon, children, description, className }) => {
  return (
    <Card className={`overflow-hidden border-none shadow-sm bg-white ${className}`}>
      <CardHeader className="bg-white p-4 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-emerald-500" />
            <CardTitle className="text-base font-medium">{title}</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                <span>Download data</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FilePlus2 className="mr-2 h-4 w-4" />
                <span>Add new data</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {description && <CardDescription className="mt-1">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {children}
      </CardContent>
    </Card>
  );
};

const ProgressTracking = () => {
  const [timeRange, setTimeRange] = useState('8-weeks');

  // Calculate nutrition totals
  const nutritionTotals = nutritionData.reduce((totals, item) => {
    return {
      calories: totals.calories + item.calories,
      protein: totals.protein + item.protein,
      carbs: totals.carbs + item.carbs,
      fat: totals.fat + item.fat
    };
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold mb-2">Progress Tracking</h1>
        <p className="text-slate-500">Track your fitness journey with detailed analytics and visualizations</p>
      </motion.div>

      <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
        <Tabs defaultValue="overview" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="body">Body</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7-days">Last 7 Days</SelectItem>
              <SelectItem value="30-days">Last 30 Days</SelectItem>
              <SelectItem value="8-weeks">Last 8 Weeks</SelectItem>
              <SelectItem value="6-months">Last 6 Months</SelectItem>
              <SelectItem value="1-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          icon={Weight}
          title="Current Weight"
          value="70.3 kg"
          trend={{ type: 'down', value: 6.3 }}
          description="Down from 75kg (8 weeks ago)"
          delay={0.1}
          colorClass="text-emerald-500"
        />
        <MetricCard
          icon={Target}
          title="Goals Reached"
          value="3/5"
          description="60% of overall targets met"
          delay={0.2}
          colorClass="text-blue-500"
        />
        <MetricCard
          icon={Dumbbell}
          title="Workout Streak"
          value="14 days"
          trend={{ type: 'up', value: 40 }}
          description="Your best streak yet!"
          delay={0.3}
          colorClass="text-violet-500"
        />
        <MetricCard
          icon={Activity}
          title="Weekly Activity"
          value="8 hrs"
          trend={{ type: 'up', value: 12 }}
          description="2 hrs more than last week"
          delay={0.4}
          colorClass="text-orange-500"
        />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Weight Progress" icon={TrendingUp} description="Track your weight changes over time">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weightData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e2e8f0'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  fill="url(#weightGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Starting: 75 kg</p>
              <p className="text-sm text-emerald-500 font-medium">Current: 70.3 kg</p>
            </div>
            <div>
              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                -4.7 kg (6.3%)
              </Badge>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Calorie Balance" icon={Zap}>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={caloriesData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e2e8f0'
                  }}
                />
                <Legend />
                <Bar dataKey="consumed" name="Calories Consumed" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="burned" name="Calories Burned" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Avg. Consumed: <span className="text-violet-500">1,970 cal</span></p>
            </div>
            <div>
              <p className="text-sm font-medium">Avg. Burned: <span className="text-emerald-500">2,190 cal</span></p>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Secondary Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ChartCard title="Macronutrient Distribution" icon={PieChartIcon}>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {macroData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e2e8f0'
                  }}
                  formatter={(value) => [`${value}%`, null]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {macroData.map((item, index) => (
              <div key={index} className="flex items-center text-sm">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span>{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Workout Distribution" icon={Dumbbell}>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={workoutDistributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  labelLine={false}
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                    return (
                      <text
                        x={x}
                        y={y}
                        fill="#fff"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={12}
                        fontWeight={600}
                      >
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                >
                  {workoutDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e2e8f0'
                  }}
                  formatter={(value) => [`${value}%`, null]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {workoutDistributionData.map((item, index) => (
              <div key={index} className="flex items-center text-sm">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span>{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Body Composition" icon={User}>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart 
                cx="50%" 
                cy="50%" 
                innerRadius="20%" 
                outerRadius="90%" 
                data={bodyCompData} 
                startAngle={180} 
                endAngle={0}
              >
                <RadialBar
                  background
                  dataKey="value"
                  cornerRadius={10}
                >
                  {bodyCompData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </RadialBar>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e2e8f0'
                  }}
                  formatter={(value) => [`${value}%`, null]}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {bodyCompData.map((item, index) => (
              <div key={index} className="flex items-center text-sm">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span>{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Workout Activity Chart */}
      <ChartCard title="Workout Activity" icon={Activity} className="mb-6">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={workoutData}
              margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0'
                }}
                formatter={(value) => [`${value} min`, null]}
              />
              <Legend />
              <Bar dataKey="cardio" name="Cardio (minutes)" stackId="a" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="strength" name="Strength (minutes)" stackId="a" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="flexibility" name="Flexibility (minutes)" stackId="a" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="grid grid-cols-3 gap-6 w-full">
            <div>
              <p className="text-sm font-medium mb-1">Cardio</p>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm">+200% increase</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Strength</p>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                <span className="text-sm">+150% increase</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Flexibility</p>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-violet-500 mr-2"></div>
                <span className="text-sm">+100% increase</span>
              </div>
            </div>
          </div>
        </div>
      </ChartCard>

      {/* Goal Progress Cards */}
      <h2 className="text-xl font-bold mb-4">Goal Progress</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {progressData.map((item, index) => (
          <Card key={index} className="border-none shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{item.name}</h3>
                <Badge variant="outline">{item.progress}%</Badge>
              </div>
              <Progress value={item.progress} className="h-2 mb-2" />
              <p className="text-xs text-slate-500">
                {item.progress < 50 
                  ? "You're just getting started" 
                  : item.progress < 80 
                    ? "Good progress, keep going!" 
                    : "Almost there, you're doing great!"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly Summary Card with 3D style effect */}
      <Card className="bg-gradient-to-br from-emerald-500 to-blue-500 border-none shadow-lg overflow-hidden mb-6">
        <CardContent className="p-6">
          <div className="relative z-10">
            <h3 className="text-white text-xl font-bold mb-2">Weekly Progress Summary</h3>
            <p className="text-white/80 mb-4">You're making excellent progress toward your fitness goals!</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform hover:scale-105 transition-transform">
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-white/20 rounded-lg mr-3">
                    <Weight className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-white font-medium">Weight Loss</h4>
                </div>
                <p className="text-2xl font-bold text-white">4.7 kg</p>
                <p className="text-white/70 text-sm">6.3% of starting weight</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform hover:scale-105 transition-transform">
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-white/20 rounded-lg mr-3">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-white font-medium">Activity Level</h4>
                </div>
                <p className="text-2xl font-bold text-white">+35%</p>
                <p className="text-white/70 text-sm">Increased from last month</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform hover:scale-105 transition-transform">
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-white/20 rounded-lg mr-3">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-white font-medium">Health Score</h4>
                </div>
                <p className="text-2xl font-bold text-white">82/100</p>
                <p className="text-white/70 text-sm">Up 8 points this month</p>
              </div>
            </div>
            
            <div className="mt-6">
              <Button className="bg-white text-emerald-600 hover:bg-white/90">
                <FileText className="h-4 w-4 mr-2" />
                View Detailed Report
              </Button>
            </div>
          </div>
          
          {/* Background decorative elements for 3D effect */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-60 h-60 bg-blue-400/20 rounded-full blur-3xl"></div>
        </CardContent>
      </Card>

      {/* Daily Calories & Nutrition Track Summary */}
      <div id="nutrition" className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Daily Calories & Nutrition Track Summary</h2>
          <Button variant="outline" size="sm">
            <FilePlus2 className="h-4 w-4 mr-2" />
            Add Meal
          </Button>
        </div>
        
        <Card className="border-none shadow-sm bg-white overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="w-[120px]">Meal</TableHead>
                  <TableHead className="w-[350px]">Food Items</TableHead>
                  <TableHead className="text-right">Calories</TableHead>
                  <TableHead className="text-right">Protein (g)</TableHead>
                  <TableHead className="text-right">Carbs (g)</TableHead>
                  <TableHead className="text-right">Fat (g)</TableHead>
                  <TableHead className="text-right w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {nutritionData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium">{item.meal}</TableCell>
                    <TableCell>{item.items}</TableCell>
                    <TableCell className="text-right">{item.calories}</TableCell>
                    <TableCell className="text-right">{item.protein}</TableCell>
                    <TableCell className="text-right">{item.carbs}</TableCell>
                    <TableCell className="text-right">{item.fat}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 text-slate-500"
                        >
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                          <path d="m15 5 4 4" />
                        </svg>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="bg-emerald-50">
                <TableRow>
                  <TableCell colSpan={2} className="font-semibold">Daily Totals</TableCell>
                  <TableCell className="text-right font-semibold">{nutritionTotals.calories}</TableCell>
                  <TableCell className="text-right font-semibold">{nutritionTotals.protein}</TableCell>
                  <TableCell className="text-right font-semibold">{nutritionTotals.carbs}</TableCell>
                  <TableCell className="text-right font-semibold">{nutritionTotals.fat}</TableCell>
                  <TableCell className="text-right"></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
          <div className="p-4 border-t border-slate-100 bg-slate-50">
            <div className="flex justify-between items-center">
              <div className="text-sm text-slate-500">
                <span className="font-medium text-slate-700">Daily Goal: </span>
                2000 calories, 140g protein, 200g carbs, 65g fat
              </div>
              <div className="flex items-center gap-2">
                <div className={`px-2 py-1 rounded-md text-xs font-medium ${nutritionTotals.calories <= 2000 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  {nutritionTotals.calories <= 2000 ? 'Under Calorie Target' : 'Over Calorie Target'}
                </div>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Set Nutrition Goals
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProgressTracking; 