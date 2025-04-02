import React, { useState, useEffect } from 'react';
import {
  Scale,
  Brain,
  BookOpen,
  Utensils,
  Users,
  Target,
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
import { Slider } from '../../../components/ui/slider';
import { useForm } from 'react-hook-form';

const ThirdCounselingForm = ({ profileData, onComplete }) => {
  const [previousSessionsData, setPreviousSessionsData] = useState({
    session1: null,
    session2: null
  });
  
  useEffect(() => {
    // Get data from previous sessions
    const savedSession1Data = localStorage.getItem('counselingSession1');
    const savedSession2Data = localStorage.getItem('counselingSession2');
    
    if (savedSession1Data) {
      setPreviousSessionsData(prev => ({
        ...prev,
        session1: JSON.parse(savedSession1Data)
      }));
    }
    
    if (savedSession2Data) {
      setPreviousSessionsData(prev => ({
        ...prev,
        session2: JSON.parse(savedSession2Data)
      }));
    }
  }, []);
  
  const form = useForm({
    defaultValues: {
      // Physical & Mental Changes
      weightChanges: '',
      digestionResponse: '',
      energyResponse: '',
      mentalChanges: '',
      discomfortAfterMeals: '',
      
      // Nutritional Awareness
      nutritionalConfidence: null,
      mealPrepEase: null,
      sustainableHabits: '',
      
      // Meal Plan Tweaks
      currentCravings: '',
      intermittentFasting: null,
      culturalPreferences: '',
      
      // Social Life & Eating Out
      socialImpact: '',
      restaurantChoices: null,
      supportSystem: '',
      
      // Long-Term Goals
      biggestMotivation: '',
      enjoymentFactor: '',
      progressTracking: [],
      shortTermGoal: '',
    }
  });
  
  const onSubmit = (data) => {
    // Save the third counseling session data
    localStorage.setItem('counselingSession3', JSON.stringify(data));
    
    // Complete the counseling sessions
    if (onComplete) {
      onComplete();
    }
  };
  
  const progressTrackingOptions = [
    { id: "weightMeasurements", label: "Regular Weight Measurements" },
    { id: "bodyMeasurements", label: "Body Measurements" },
    { id: "progressPhotos", label: "Progress Photos" },
    { id: "fitnessTests", label: "Fitness Tests" },
    { id: "foodDiary", label: "Food Diary" },
    { id: "moodTracking", label: "Mood Tracking" }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-emerald-700 mb-4">Deeper Progress Evaluation & Long-Term Strategy</h2>
      <p className="text-slate-600 mb-6">
        This session helps strengthen habits, enhance consistency, and address deeper concerns for your long-term success.
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Accordion type="single" collapsible defaultValue="section1" className="w-full">
            {/* Section 1: Physical & Mental Changes */}
            <AccordionItem value="section1">
              <AccordionTrigger className="text-lg font-medium">
                <div className="flex items-center">
                  <Scale className="mr-2 h-5 w-5 text-emerald-500" />
                  Physical & Mental Changes
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-slate-50 rounded-md">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="weightChanges"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight Changes</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How is your body responding to the new diet in terms of weight changes?" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="digestionResponse"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Digestive Response</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How has your digestion responded to the dietary changes?" 
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="energyResponse"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Energy Levels</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How have your energy levels changed since starting the program?" 
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="mentalChanges"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mental Improvements</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Have you noticed any improvements in focus, mood, or sleep quality?" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="discomfortAfterMeals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discomfort After Meals</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Do you feel any bloating, discomfort, or sluggishness after meals? Please describe." 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Section 2: Nutritional Awareness & Independence */}
            <AccordionItem value="section2">
              <AccordionTrigger className="text-lg font-medium">
                <div className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-emerald-500" />
                  Nutritional Awareness & Independence
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-slate-50 rounded-md">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="nutritionalConfidence"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nutritional Confidence</FormLabel>
                        <FormDescription>Do you feel more confident in choosing healthy meals?</FormDescription>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="much-more-confident" />
                              </FormControl>
                              <FormLabel className="font-normal">Much more confident</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="somewhat-more-confident" />
                              </FormControl>
                              <FormLabel className="font-normal">Somewhat more confident</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="slightly-more-confident" />
                              </FormControl>
                              <FormLabel className="font-normal">Slightly more confident</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="no-change" />
                              </FormControl>
                              <FormLabel className="font-normal">No change in confidence</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="mealPrepEase"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meal Preparation Ease</FormLabel>
                        <FormDescription>Are you able to grocery shop and meal prep with ease?</FormDescription>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="very-easy" />
                              </FormControl>
                              <FormLabel className="font-normal">Very easy - I'm comfortable with it</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="somewhat-easy" />
                              </FormControl>
                              <FormLabel className="font-normal">Somewhat easy - Getting better at it</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="neutral" />
                              </FormControl>
                              <FormLabel className="font-normal">Neutral - Still learning</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="challenging" />
                              </FormControl>
                              <FormLabel className="font-normal">Challenging - Need more guidance</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="sustainableHabits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sustainable Habits</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What healthy habits have you learned that feel sustainable long-term?" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Section 3: Meal Plan Tweaks & New Strategies */}
            <AccordionItem value="section3">
              <AccordionTrigger className="text-lg font-medium">
                <div className="flex items-center">
                  <Utensils className="mr-2 h-5 w-5 text-emerald-500" />
                  Meal Plan Tweaks & New Strategies
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-slate-50 rounded-md">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="currentCravings"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Cravings</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Are there any specific cravings we should address in your meal plan?" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="intermittentFasting"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Intermittent Fasting Interest</FormLabel>
                        <FormDescription>Would you like to try intermittent fasting or other eating patterns?</FormDescription>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-row space-x-4"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="very-interested" />
                              </FormControl>
                              <FormLabel className="font-normal">Very Interested</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="somewhat-interested" />
                              </FormControl>
                              <FormLabel className="font-normal">Somewhat</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="not-interested" />
                              </FormControl>
                              <FormLabel className="font-normal">Not Interested</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="culturalPreferences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cultural or Personal Food Preferences</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Are there any cultural or personal food preferences we should better integrate into your meal plan?" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Section 4: Social Life & Eating Out */}
            <AccordionItem value="section4">
              <AccordionTrigger className="text-lg font-medium">
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-emerald-500" />
                  Social Life & Eating Out
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-slate-50 rounded-md">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="socialImpact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Social Life Impact</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How has your social life affected your eating habits?" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="restaurantChoices"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Restaurant Choices</FormLabel>
                        <FormDescription>Do you feel comfortable making healthy choices at restaurants?</FormDescription>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="very-comfortable" />
                              </FormControl>
                              <FormLabel className="font-normal">Very comfortable</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="somewhat-comfortable" />
                              </FormControl>
                              <FormLabel className="font-normal">Somewhat comfortable</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="neutral" />
                              </FormControl>
                              <FormLabel className="font-normal">Neutral</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="uncomfortable" />
                              </FormControl>
                              <FormLabel className="font-normal">Uncomfortable</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="supportSystem"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Support System</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Have family, friends, or colleagues been supportive of your changes?" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Section 5: Long-Term Goal Setting */}
            <AccordionItem value="section5">
              <AccordionTrigger className="text-lg font-medium">
                <div className="flex items-center">
                  <Target className="mr-2 h-5 w-5 text-emerald-500" />
                  Long-Term Goal Setting
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-slate-50 rounded-md">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="biggestMotivation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Biggest Motivation</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What is your biggest motivation to keep going with this program?" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="enjoymentFactor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Making the Plan More Enjoyable</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we make this plan more enjoyable and less restrictive for you?" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="progressTracking"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Progress Tracking Methods</FormLabel>
                        <FormDescription>How would you like to track your progress going forward?</FormDescription>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                          {progressTrackingOptions.map((item) => (
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
                    name="shortTermGoal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short-Term Goal</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What's your next short-term goal for the next 2-4 weeks?" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="flex justify-end pt-4">
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              Complete Counseling Program
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ThirdCounselingForm; 