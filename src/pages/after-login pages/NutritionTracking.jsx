import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import {
  Calendar,
  Coffee,
  PieChart as PieChartIcon,
  FileText,
  FilePlus2,
  ChevronDown,
  Trash2,
  Plus,
  ArrowLeft,
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

// Nutrition data for the table
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

// Data for the macronutrient chart
const macroData = [
  { name: 'Protein', value: 133, fill: '#10B981' }, // emerald
  { name: 'Carbs', value: 165, fill: '#3B82F6' },   // blue
  { name: 'Fat', value: 64, fill: '#8B5CF6' },      // violet
];

// Common meal types for quick selection
const commonMeals = [
  { label: "Breakfast", value: "breakfast" },
  { label: "Morning Snack", value: "morning-snack" },
  { label: "Lunch", value: "lunch" },
  { label: "Afternoon Snack", value: "afternoon-snack" },
  { label: "Dinner", value: "dinner" },
  { label: "Evening Snack", value: "evening-snack" },
];

// Sample quick-add food items
const quickAddFoods = [
  { name: "Grilled Chicken Breast (100g)", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: "Brown Rice (100g cooked)", calories: 112, protein: 2.6, carbs: 23, fat: 0.9 },
  { name: "Avocado (half)", calories: 160, protein: 2, carbs: 8.5, fat: 14.7 },
  { name: "Greek Yogurt (200g)", calories: 130, protein: 22, carbs: 5, fat: 0.5 },
  { name: "Oatmeal (1 cup cooked)", calories: 158, protein: 6, carbs: 27, fat: 3.2 },
  { name: "Almonds (30g)", calories: 180, protein: 6, carbs: 6, fat: 14 },
  { name: "Banana (medium)", calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
  { name: "Whole Egg", calories: 70, protein: 6, carbs: 0.6, fat: 5 },
  { name: "Salmon Fillet (100g)", calories: 208, protein: 22, carbs: 0, fat: 13 },
  { name: "Spinach (100g)", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
];

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
                <FileText className="mr-2 h-4 w-4" />
                <span>View detailed report</span>
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

const NutritionTracking = () => {
  const [date, setDate] = useState(new Date());
  const [editingMeal, setEditingMeal] = useState(null);
  const [isAddMealOpen, setIsAddMealOpen] = useState(false);
  const [newMeal, setNewMeal] = useState({
    meal: "Breakfast",
    items: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: ""
  });

  // Calculate nutrition totals
  const nutritionTotals = nutritionData.reduce((totals, item) => {
    return {
      calories: totals.calories + item.calories,
      protein: totals.protein + item.protein,
      carbs: totals.carbs + item.carbs,
      fat: totals.fat + item.fat
    };
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

  // Daily nutrition goals
  const nutritionGoals = {
    calories: 2000,
    protein: 140,
    carbs: 200,
    fat: 65
  };

  // Calculate percentages for progress bars
  const caloriePercentage = Math.min(100, (nutritionTotals.calories / nutritionGoals.calories) * 100);
  const proteinPercentage = Math.min(100, (nutritionTotals.protein / nutritionGoals.protein) * 100);
  const carbsPercentage = Math.min(100, (nutritionTotals.carbs / nutritionGoals.carbs) * 100);
  const fatPercentage = Math.min(100, (nutritionTotals.fat / nutritionGoals.fat) * 100);

  // Handle adding a new meal
  const handleAddMeal = () => {
    // Form validation would go here
    console.log("Adding new meal:", newMeal);
    setIsAddMealOpen(false);
    
    // Reset form fields
    setNewMeal({
      meal: "Breakfast",
      items: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: ""
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">Nutrition Tracking</h1>
            <p className="text-slate-500">Track your daily meals, calories, and macronutrients</p>
          </div>
          <Link to="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </motion.div>

      <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            {formatDate(date)}
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Select Date
          </Button>
          <Dialog open={isAddMealOpen} onOpenChange={setIsAddMealOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Meal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Meal</DialogTitle>
                <DialogDescription>
                  Enter the details of your meal. All fields are required.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="meal-type" className="text-right">
                    Meal Type
                  </Label>
                  <Select 
                    value={newMeal.meal}
                    onValueChange={(value) => setNewMeal({...newMeal, meal: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select meal type" />
                    </SelectTrigger>
                    <SelectContent>
                      {commonMeals.map((meal) => (
                        <SelectItem key={meal.value} value={meal.label}>
                          {meal.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="food-items" className="text-right">
                    Food Items
                  </Label>
                  <Input
                    id="food-items"
                    value={newMeal.items}
                    onChange={(e) => setNewMeal({...newMeal, items: e.target.value})}
                    placeholder="E.g., Grilled chicken with vegetables"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="calories" className="text-right">
                    Calories
                  </Label>
                  <Input
                    id="calories"
                    type="number"
                    value={newMeal.calories}
                    onChange={(e) => setNewMeal({...newMeal, calories: e.target.value})}
                    placeholder="E.g., 350"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="protein" className="text-right">
                    Protein (g)
                  </Label>
                  <Input
                    id="protein"
                    type="number"
                    value={newMeal.protein}
                    onChange={(e) => setNewMeal({...newMeal, protein: e.target.value})}
                    placeholder="E.g., 25"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="carbs" className="text-right">
                    Carbs (g)
                  </Label>
                  <Input
                    id="carbs"
                    type="number"
                    value={newMeal.carbs}
                    onChange={(e) => setNewMeal({...newMeal, carbs: e.target.value})}
                    placeholder="E.g., 30"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fat" className="text-right">
                    Fat (g)
                  </Label>
                  <Input
                    id="fat"
                    type="number"
                    value={newMeal.fat}
                    onChange={(e) => setNewMeal({...newMeal, fat: e.target.value})}
                    placeholder="E.g., 15"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddMealOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleAddMeal}>
                  Add Meal
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Quick Add Section */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-3">Quick Add Common Foods</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {quickAddFoods.slice(0, 5).map((food, index) => (
            <Card key={index} className="border-none shadow-sm bg-white">
              <CardContent className="p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm">{food.name}</p>
                    <p className="text-xs text-slate-500">{food.calories} cal, {food.protein}g protein</p>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Nutrition Summary & Macros Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card className="border-none shadow-sm bg-white h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Daily Nutrition Summary</CardTitle>
                <Badge variant={nutritionTotals.calories <= nutritionGoals.calories ? "success" : "destructive"}>
                  {nutritionTotals.calories} / {nutritionGoals.calories} Calories
                </Badge>
              </div>
              <CardDescription>
                Track your daily intake against your nutritional goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                      <span className="text-sm font-medium">Calories</span>
                    </div>
                    <span className="text-sm">{nutritionTotals.calories} / {nutritionGoals.calories} kcal</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${caloriePercentage > 100 ? 'bg-red-500' : 'bg-emerald-500'}`}
                      style={{ width: `${caloriePercentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm font-medium">Protein</span>
                    </div>
                    <span className="text-sm">{nutritionTotals.protein} / {nutritionGoals.protein}g</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full bg-blue-500"
                      style={{ width: `${proteinPercentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-violet-500 mr-2"></div>
                      <span className="text-sm font-medium">Carbs</span>
                    </div>
                    <span className="text-sm">{nutritionTotals.carbs} / {nutritionGoals.carbs}g</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full bg-violet-500"
                      style={{ width: `${carbsPercentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                      <span className="text-sm font-medium">Fat</span>
                    </div>
                    <span className="text-sm">{nutritionTotals.fat} / {nutritionGoals.fat}g</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full bg-amber-500"
                      style={{ width: `${fatPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <ChartCard title="Macronutrient Ratio" icon={PieChartIcon}>
          <div className="h-[220px] w-full">
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
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value}g (${Math.round((value / (macroData.reduce((sum, entry) => sum + entry.value, 0))) * 100)}%)`, name]}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e2e8f0'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Meal Table */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Today's Meals & Nutrition</h2>
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
                      <div className="flex justify-end gap-1">
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
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div className="text-sm text-slate-500">
                <span className="font-medium text-slate-700">Daily Goal: </span>
                {nutritionGoals.calories} calories, {nutritionGoals.protein}g protein, {nutritionGoals.carbs}g carbs, {nutritionGoals.fat}g fat
              </div>
              <div className="flex items-center gap-2">
                <div className={`px-2 py-1 rounded-md text-xs font-medium ${nutritionTotals.calories <= nutritionGoals.calories ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  {nutritionTotals.calories <= nutritionGoals.calories ? 'Under Calorie Target' : 'Over Calorie Target'}
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

export default NutritionTracking; 