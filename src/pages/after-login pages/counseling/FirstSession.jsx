import React, { useState } from 'react';
import {
  User,
  Coffee,
  Moon,
  Droplet,
  Wine,
  Stethoscope,
  Pill,
  AlertTriangle,
  Utensils,
  Timer,
  Heart,
  ArrowRight
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../components/ui/accordion';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group';
import { Checkbox } from '../../../components/ui/checkbox';
import { useForm } from 'react-hook-form';

const FirstCounselingForm = ({ profileData, onComplete }) => {
  // Get form methods from react-hook-form
  const form = useForm({
    defaultValues: {
      // Personal info is pre-filled from profile data
      name: profileData?.name || '',
      email: profileData?.email || '',
      phone: profileData?.phone || '',
      gender: profileData?.gender || '',
      age: profileData?.age || '',
      
      // Lifestyle and habits
      occupation: '',
      workSchedule: '',
      sleepHours: '',
      sleepQuality: '',
      waterIntake: '',
      alcoholConsumption: '',
      smokingHabit: '',
      
      // Medical history
      currentMedicalConditions: '',
      previousSurgeries: '',
      familyMedicalHistory: '',
      currentMedications: '',
      supplements: '',
      foodAllergies: '',
      
      // Dietary preferences
      dietType: '',
      mealsPerDay: '',
      commonlyConsumedFoods: '',
      foodCravings: '',
      foodDislikes: '',
      cookingHabits: '',
      
      // Digestive health
      digestiveIssues: [],
      foodTriggers: '',
      intolerances: [],
      
      // Additional
      physicalActivityLevel: '',
      stressLevel: '',
    }
  });
  
  const onSubmit = (data) => {
    // Save the first counseling session data
    localStorage.setItem('counselingSession1', JSON.stringify(data));
    
    // Move to the next tab
    if (onComplete) {
      onComplete();
    }
  };
  
  // Options for various form fields
  const dietTypes = [
    "Vegetarian", "Vegan", "Pescatarian", "Mediterranean", 
    "Omnivore", "Keto", "Paleo", "Low-carb", "Gluten-free", "Other"
  ];
  
  const activityLevels = [
    "Sedentary (little or no exercise)",
    "Lightly active (light exercise/sports 1-3 days/week)",
    "Moderately active (moderate exercise/sports 3-5 days/week)",
    "Very active (hard exercise/sports 6-7 days/week)",
    "Extra active (very hard exercise & physical job or training twice a day)"
  ];
  
  const stressLevels = [
    "Low", "Moderate", "High", "Very High"
  ];
  
  const digestiveIssuesList = [
    { id: "bloating", label: "Bloating" },
    { id: "constipation", label: "Constipation" },
    { id: "diarrhea", label: "Diarrhea" },
    { id: "acidReflux", label: "Acid Reflux/Heartburn" },
    { id: "stomachPain", label: "Stomach Pain" },
    { id: "none", label: "None" }
  ];
  
  const intolerancesList = [
    { id: "lactose", label: "Lactose Intolerance" },
    { id: "gluten", label: "Gluten Intolerance" },
    { id: "none", label: "None" }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-emerald-700 mb-4">Initial Counseling Session</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Accordion type="single" collapsible defaultValue="section1" className="w-full">
            {/* Section 1: Personal and Contact Information */}
            <AccordionItem value="section1">
              <AccordionTrigger className="text-lg font-medium">
                <div className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-emerald-500" />
                  Personal and Contact Information
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-slate-50 rounded-md">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} disabled />
                          </FormControl>
                          <FormDescription>Automatically filled from your profile</FormDescription>
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
                            <Input placeholder="Your phone number" {...field} disabled />
                          </FormControl>
                          <FormDescription>Automatically filled from your profile</FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email" {...field} disabled />
                          </FormControl>
                          <FormDescription>Automatically filled from your profile</FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <FormControl>
                            <Input placeholder="Your gender" {...field} disabled />
                          </FormControl>
                          <FormDescription>Automatically filled from your profile</FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input placeholder="Your age" {...field} disabled />
                        </FormControl>
                        <FormDescription>Automatically filled from your profile</FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Section 2: Lifestyle and Daily Habits */}
            <AccordionItem value="section2">
              <AccordionTrigger className="text-lg font-medium">
                <div className="flex items-center">
                  <Coffee className="mr-2 h-5 w-5 text-emerald-500" />
                  Lifestyle and Daily Habits
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-slate-50 rounded-md">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Occupation</FormLabel>
                        <FormControl>
                          <Input placeholder="What is your current occupation?" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="workSchedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Routine</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your typical work schedule (e.g., 9-5 desk job, shift work, physically demanding, etc.)" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="sleepHours"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sleep Hours</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Average hours of sleep per night" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="sleepQuality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sleep Quality</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="How would you rate your sleep quality?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="poor">Poor</SelectItem>
                              <SelectItem value="fair">Fair</SelectItem>
                              <SelectItem value="good">Good</SelectItem>
                              <SelectItem value="excellent">Excellent</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="waterIntake"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Water Intake</FormLabel>
                        <FormControl>
                          <Input placeholder="How many glasses of water do you drink daily?" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="alcoholConsumption"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alcohol Consumption</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="How often do you consume alcohol?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="never">Never</SelectItem>
                              <SelectItem value="rarely">Rarely</SelectItem>
                              <SelectItem value="occasionally">Occasionally (1-2 times/month)</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="smokingHabit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Smoking Habit</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Do you smoke?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="never">Never smoked</SelectItem>
                              <SelectItem value="former">Former smoker</SelectItem>
                              <SelectItem value="occasional">Occasional smoker</SelectItem>
                              <SelectItem value="regular">Regular smoker</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Section 3: Medical History & Health Conditions */}
            <AccordionItem value="section3">
              <AccordionTrigger className="text-lg font-medium">
                <div className="flex items-center">
                  <Stethoscope className="mr-2 h-5 w-5 text-emerald-500" />
                  Medical History & Health Conditions
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-slate-50 rounded-md">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="currentMedicalConditions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Medical Conditions</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="List any current medical conditions (e.g., diabetes, hypertension, thyroid disorders, etc.)" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="previousSurgeries"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Previous Surgeries or Chronic Illnesses</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="List any previous surgeries or chronic illnesses" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="familyMedicalHistory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Family Medical History</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Do you have a family history of heart disease, diabetes, cancer, or other significant conditions?" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="currentMedications"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Medications</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="List any medications you are currently taking" 
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="supplements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Supplements</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="List any supplements or vitamins you are taking" 
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="foodAllergies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Food Allergies & Intolerances</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="List any known food allergies or intolerances" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Section 4: Dietary Preferences & Eating Habits */}
            <AccordionItem value="section4">
              <AccordionTrigger className="text-lg font-medium">
                <div className="flex items-center">
                  <Utensils className="mr-2 h-5 w-5 text-emerald-500" />
                  Dietary Preferences & Eating Habits
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-slate-50 rounded-md">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="dietType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Diet Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your preferred diet type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {dietTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="mealsPerDay"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frequency of Meals</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="How many meals do you typically have per day?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1-2">1-2 meals</SelectItem>
                            <SelectItem value="3">3 meals</SelectItem>
                            <SelectItem value="4-5">4-5 meals</SelectItem>
                            <SelectItem value="6+">6+ meals</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="commonlyConsumedFoods"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Commonly Consumed Foods</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="List foods that make up the majority of your diet" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="foodCravings"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Food Cravings & Weaknesses</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What foods do you typically crave? Any specific food weaknesses?" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="foodDislikes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Food Dislikes or Restrictions</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="List any foods you particularly dislike or avoid" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cookingHabits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cooking & Meal Preparation Habits</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="How often do you cook at home?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="rarely">Rarely (mostly eat out/order in)</SelectItem>
                            <SelectItem value="sometimes">Sometimes (2-3 times/week)</SelectItem>
                            <SelectItem value="often">Often (4-5 times/week)</SelectItem>
                            <SelectItem value="always">Almost always (prepare most meals)</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Section 5: Digestive Health & Food Sensitivities */}
            <AccordionItem value="section5">
              <AccordionTrigger className="text-lg font-medium">
                <div className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-emerald-500" />
                  Digestive Health & Food Sensitivities
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-slate-50 rounded-md">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="digestiveIssues"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Digestive Issues</FormLabel>
                        <FormDescription>Do you experience any of the following issues?</FormDescription>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {digestiveIssuesList.map((item) => (
                            <FormItem key={item.id} className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    const updatedList = checked
                                      ? [...(field.value || []), item.id]
                                      : (field.value || []).filter((value) => value !== item.id);
                                    field.onChange(updatedList);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{item.label}</FormLabel>
                            </FormItem>
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="foodTriggers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Food Triggers</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Are there any foods that cause digestive discomfort? Please list them." 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="intolerances"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Food Intolerances</FormLabel>
                        <FormDescription>Do you have any known food intolerances?</FormDescription>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {intolerancesList.map((item) => (
                            <FormItem key={item.id} className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    const updatedList = checked
                                      ? [...(field.value || []), item.id]
                                      : (field.value || []).filter((value) => value !== item.id);
                                    field.onChange(updatedList);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{item.label}</FormLabel>
                            </FormItem>
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Section 6: Physical Activity & Mental Health */}
            <AccordionItem value="section6">
              <AccordionTrigger className="text-lg font-medium">
                <div className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-emerald-500" />
                  Physical Activity & Stress Level
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-slate-50 rounded-md">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="physicalActivityLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Physical Activity Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your typical activity level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {activityLevels.map((level) => (
                              <SelectItem key={level} value={level}>{level}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="stressLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stress Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="How would you rate your overall stress level?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {stressLevels.map((level) => (
                              <SelectItem key={level} value={level}>{level}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="flex justify-end pt-4">
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              Save and Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FirstCounselingForm; 