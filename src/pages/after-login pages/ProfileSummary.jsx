import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Ruler, 
  Weight, 
  Activity, 
  Calculator,
  ChevronRight,
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const ProfileSummaryPage = () => {
  const navigate = useNavigate();
  const [bmiResult, setBmiResult] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  
  const form = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      gender: '',
      age: '',
      height: '',
      weight: '',
      fitnessGoal: ''
    }
  });

  // Calculate BMI when height or weight changes
  useEffect(() => {
    const weight = parseFloat(form.watch('weight'));
    const height = parseFloat(form.watch('height')) / 100; // convert cm to meters
    
    if (weight > 0 && height > 0) {
      const bmi = weight / (height * height);
      setBmiResult(bmi.toFixed(1));
      
      // Set BMI category
      if (bmi < 18.5) {
        setBmiCategory('Underweight');
      } else if (bmi >= 18.5 && bmi < 25) {
        setBmiCategory('Normal weight');
      } else if (bmi >= 25 && bmi < 30) {
        setBmiCategory('Overweight');
      } else {
        setBmiCategory('Obesity');
      }
    } else {
      setBmiResult(null);
      setBmiCategory('');
    }
  }, [form.watch('weight'), form.watch('height')]);

  const onSubmit = (data) => {
    // Save data to localStorage or send to backend
    const profileData = {
      ...data,
      bmi: bmiResult,
      bmiCategory: bmiCategory
    };
    
    localStorage.setItem('profileData', JSON.stringify(profileData));
    
    // Navigate to counseling session form
    navigate('/counseling-session');
  };

  const fitnessGoals = [
    "Weight Loss",
    "Muscle Gain",
    "Improve Overall Fitness",
    "Enhance Athletic Performance",
    "Better Health Management",
    "Increase Flexibility",
    "Improve Endurance"
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="bg-emerald-50 border-b border-slate-200">
            <CardTitle className="text-2xl font-bold text-emerald-700">Profile Summary</CardTitle>
            <CardDescription>Please provide your personal details before your first counseling session</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-700 flex items-center">
                    <User className="mr-2 h-5 w-5 text-emerald-500" />
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="Enter your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-row space-x-4"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="male" />
                              </FormControl>
                              <FormLabel className="font-normal">Male</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="female" />
                              </FormControl>
                              <FormLabel className="font-normal">Female</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="other" />
                              </FormControl>
                              <FormLabel className="font-normal">Other</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-lg font-semibold text-slate-700 flex items-center">
                    <Activity className="mr-2 h-5 w-5 text-emerald-500" />
                    Physical Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age (years)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Your age" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height (cm)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Your height in cm" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight (kg)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Your weight in kg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="fitnessGoal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fitness Goal</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your primary fitness goal" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {fitnessGoals.map((goal) => (
                              <SelectItem key={goal} value={goal}>{goal}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* BMI Result */}
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-slate-700 flex items-center mb-3">
                    <Calculator className="mr-2 h-5 w-5 text-emerald-500" />
                    Body Mass Index (BMI)
                  </h3>
                  
                  {bmiResult ? (
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="text-3xl font-bold text-emerald-600">{bmiResult}</div>
                        <div className="text-sm text-slate-500">Your BMI indicates: <span className="font-medium">{bmiCategory}</span></div>
                      </div>
                      <div className="mt-3 md:mt-0 bg-white p-3 rounded-lg shadow-sm border border-slate-200">
                        <div className="text-xs text-slate-500 mb-1">BMI Categories</div>
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
                    </div>
                  ) : (
                    <div className="text-sm text-slate-500">
                      Enter your height and weight above to calculate your BMI automatically.
                    </div>
                  )}
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Save and Continue to Counseling
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProfileSummaryPage; 