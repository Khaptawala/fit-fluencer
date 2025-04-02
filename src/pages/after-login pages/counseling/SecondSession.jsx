import React, { useState, useEffect } from 'react';
import {
  FileCheck,
  Zap,
  Utensils,
  Dumbbell,
  Brain,
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

const SecondCounselingForm = ({ profileData, onComplete }) => {
  const [session1Data, setSession1Data] = useState(null);
  
  useEffect(() => {
    // Get data from the previous session
    const savedSession1Data = localStorage.getItem('counselingSession1');
    if (savedSession1Data) {
      setSession1Data(JSON.parse(savedSession1Data));
    }
  }, []);
  
  const form = useForm({
    defaultValues: {
      // Progress & Challenges
      overallFeeling: '',
      energyChanges: '',
      digestionChanges: '',
      sleepChanges: '',
      biggestChallenge: '',
      difficultFoods: '',
      
      // Meal Plan Adherence
      mealPlanAdherence: null,
      satisfactionWithPortions: null,
      foodsToSwap: '',
      eatingOutFrequency: '',
      
      // Physical Activity
      workoutRoutineAdherence: null,
      exerciseDifficulties: '',
      energyBeforeWorkout: null,
      energyAfterWorkout: null,
      workoutModifications: '',
      
      // Emotional & Mindful Eating
      emotionalEating: '',
      cravingTriggers: [],
      moodChanges: '',
      
      // Adjustments & Next Steps
      newMealOptions: '',
      mealPrepGuidance: null,
      shortTermImprovements: '',
    }
  });
  
  const onSubmit = (data) => {
    // Save the second counseling session data
    localStorage.setItem('counselingSession2', JSON.stringify(data));
    
    // Move to the next tab
    if (onComplete) {
      onComplete();
    }
  };
  
  const cravingTriggersList = [
    { id: "stress", label: "Stress" },
    { id: "boredom", label: "Boredom" },
    { id: "socialEvents", label: "Social Events" },
    { id: "emotions", label: "Emotions (sadness, happiness, etc.)" },
    { id: "tiredness", label: "Tiredness/Fatigue" },
    { id: "hunger", label: "True Hunger" }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-emerald-700 mb-4">Follow-Up & Early Adjustments</h2>
      <p className="text-slate-600 mb-6">
        This session helps us review your initial changes, identify challenges, and fine-tune your plan.
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Accordion type="single" collapsible defaultValue="section1" className="w-full">
            {/* Section 1: Progress & Challenges Check-In */}
            <AccordionItem value="section1">
              <AccordionTrigger className="text-lg font-medium">
                <div className="flex items-center">
                  <FileCheck className="mr-2 h-5 w-5 text-emerald-500" />
                  Progress & Challenges Check-In
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-slate-50 rounded-md">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="overallFeeling"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Overall Feeling</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How have you been feeling since starting the plan?" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="energyChanges"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Energy Levels</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Energy changes?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="much-worse">Much Worse</SelectItem>
                              <SelectItem value="slightly-worse">Slightly Worse</SelectItem>
                              <SelectItem value="no-change">No Change</SelectItem>
                              <SelectItem value="slightly-better">Slightly Better</SelectItem>
                              <SelectItem value="much-better">Much Better</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="digestionChanges"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Digestion</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Digestion changes?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="much-worse">Much Worse</SelectItem>
                              <SelectItem value="slightly-worse">Slightly Worse</SelectItem>
                              <SelectItem value="no-change">No Change</SelectItem>
                              <SelectItem value="slightly-better">Slightly Better</SelectItem>
                              <SelectItem value="much-better">Much Better</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="sleepChanges"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sleep Quality</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sleep changes?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="much-worse">Much Worse</SelectItem>
                              <SelectItem value="slightly-worse">Slightly Worse</SelectItem>
                              <SelectItem value="no-change">No Change</SelectItem>
                              <SelectItem value="slightly-better">Slightly Better</SelectItem>
                              <SelectItem value="much-better">Much Better</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="biggestChallenge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Biggest Challenge</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What has been the biggest challenge in following your diet?" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="difficultFoods"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficult Foods or Meals</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Are there any specific foods or meals you struggled with?" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Section 2: Meal Plan Adherence & Adjustments */}
            <AccordionItem value="section2">
              <AccordionTrigger className="text-lg font-medium">
                <div className="flex items-center">
                  <Utensils className="mr-2 h-5 w-5 text-emerald-500" />
                  Meal Plan Adherence & Adjustments
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-slate-50 rounded-md">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="mealPlanAdherence"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meal Plan Adherence</FormLabel>
                        <FormDescription>How consistently were you able to follow the meal plan?</FormDescription>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="very-consistent" />
                              </FormControl>
                              <FormLabel className="font-normal">Very Consistent (90-100%)</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="mostly-consistent" />
                              </FormControl>
                              <FormLabel className="font-normal">Mostly Consistent (70-90%)</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="somewhat-consistent" />
                              </FormControl>
                              <FormLabel className="font-normal">Somewhat Consistent (50-70%)</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="inconsistent" />
                              </FormControl>
                              <FormLabel className="font-normal">Inconsistent (less than 50%)</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="satisfactionWithPortions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Satisfaction with Portions & Meal Frequency</FormLabel>
                        <FormDescription>Did you feel satisfied with the portion sizes and meal frequency?</FormDescription>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="very-satisfied" />
                              </FormControl>
                              <FormLabel className="font-normal">Very Satisfied</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="satisfied" />
                              </FormControl>
                              <FormLabel className="font-normal">Satisfied</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="neutral" />
                              </FormControl>
                              <FormLabel className="font-normal">Neutral</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="unsatisfied" />
                              </FormControl>
                              <FormLabel className="font-normal">Unsatisfied</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="very-unsatisfied" />
                              </FormControl>
                              <FormLabel className="font-normal">Very Unsatisfied</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="foodsToSwap"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Foods to Swap</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Are there any foods you didn't enjoy or would like to swap?" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="eatingOutFrequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Eating Out Frequency</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="How often have you been eating out?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="never">Never</SelectItem>
                            <SelectItem value="rarely">Rarely (1-2 times since last session)</SelectItem>
                            <SelectItem value="sometimes">Sometimes (3-5 times since last session)</SelectItem>
                            <SelectItem value="frequently">Frequently (6+ times since last session)</SelectItem>
                            <SelectItem value="daily">Almost Daily</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Section 3: Physical Activity & Daily Routine */}
            <AccordionItem value="section3">
              <AccordionTrigger className="text-lg font-medium">
                <div className="flex items-center">
                  <Dumbbell className="mr-2 h-5 w-5 text-emerald-500" />
                  Physical Activity & Daily Routine
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-slate-50 rounded-md">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="workoutRoutineAdherence"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Workout Routine Adherence</FormLabel>
                        <FormDescription>Were you able to maintain your workout routine?</FormDescription>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="fully" />
                              </FormControl>
                              <FormLabel className="font-normal">Yes, fully</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="mostly" />
                              </FormControl>
                              <FormLabel className="font-normal">Mostly</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="partially" />
                              </FormControl>
                              <FormLabel className="font-normal">Partially</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="not-really" />
                              </FormControl>
                              <FormLabel className="font-normal">Not really</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="exerciseDifficulties"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exercise Difficulties</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any difficulties with exercise (injury, motivation, time constraints)?" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="energyBeforeWorkout"
                      render={({ field: { value, onChange } }) => (
                        <FormItem>
                          <FormLabel>Energy Before Workouts</FormLabel>
                          <FormDescription>Rate your energy level before workouts (1-10)</FormDescription>
                          <FormControl>
                            <div className="space-y-3">
                              <Slider
                                defaultValue={[value || 5]}
                                max={10}
                                min={1}
                                step={1}
                                onValueChange={(vals) => onChange(vals[0])}
                              />
                              <div className="flex justify-between text-xs text-slate-500">
                                <span>Low Energy (1)</span>
                                <span>High Energy (10)</span>
                              </div>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="energyAfterWorkout"
                      render={({ field: { value, onChange } }) => (
                        <FormItem>
                          <FormLabel>Energy After Workouts</FormLabel>
                          <FormDescription>Rate your energy level after workouts (1-10)</FormDescription>
                          <FormControl>
                            <div className="space-y-3">
                              <Slider
                                defaultValue={[value || 5]}
                                max={10}
                                min={1}
                                step={1}
                                onValueChange={(vals) => onChange(vals[0])}
                              />
                              <div className="flex justify-between text-xs text-slate-500">
                                <span>Exhausted (1)</span>
                                <span>Energized (10)</span>
                              </div>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="workoutModifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Workout Modifications</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Would you like to modify your workout intensity or type? Please specify." 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Section 4: Emotional & Mindful Eating */}
            <AccordionItem value="section4">
              <AccordionTrigger className="text-lg font-medium">
                <div className="flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-emerald-500" />
                  Emotional & Mindful Eating
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-slate-50 rounded-md">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="emotionalEating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emotional Eating</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Have you experienced stress eating, cravings, or emotional eating? Please describe." 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cravingTriggers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Craving Triggers</FormLabel>
                        <FormDescription>What triggers your cravings the most?</FormDescription>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                          {cravingTriggersList.map((item) => (
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
                    name="moodChanges"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mood Changes Based on Diet</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Have you noticed any mood changes based on your diet? Please describe." 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Section 5: Adjustments & Next Steps */}
            <AccordionItem value="section5">
              <AccordionTrigger className="text-lg font-medium">
                <div className="flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-emerald-500" />
                  Adjustments & Next Steps
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-slate-50 rounded-md">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="newMealOptions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Meal Options</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Would you like to try new meal options or alternative foods? Please specify." 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="mealPrepGuidance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meal Prep Guidance</FormLabel>
                        <FormDescription>Do you feel you need more structured meal prep guidance?</FormDescription>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-row space-x-4"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="yes" />
                              </FormControl>
                              <FormLabel className="font-normal">Yes</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="somewhat" />
                              </FormControl>
                              <FormLabel className="font-normal">Somewhat</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="no" />
                              </FormControl>
                              <FormLabel className="font-normal">No</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="shortTermImprovements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short-Term Improvements</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What small improvements would you like to focus on in the next 1-2 weeks?" 
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
              Save and Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SecondCounselingForm; 