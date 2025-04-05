import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  UserIcon, 
  MapPinIcon, 
  CalendarIcon, 
  HeartIcon, 
  MoveIcon, 
  PhoneIcon, 
  AtSignIcon, 
  HomeIcon, 
  BuildingIcon, 
  GlobeIcon,
  CheckCircle2,
  ArrowRight,
  ArrowLeft
} from 'lucide-react'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Please enter a valid email"),
  gender: z.string().min(1, "Please select a gender"),
  dob: z.string().min(1, "Please select a date of birth"),
  height: z.string().min(1, "Please enter your height"),
  weight: z.string().min(1, "Please enter your weight"),
  fitnessGoal: z.string().min(1, "Please select a fitness goal"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
})

const steps = [
  { id: 'personal', title: 'Personal Info', icon: <UserIcon className="w-5 h-5" /> },
  { id: 'physical', title: 'Physical Stats', icon: <MoveIcon className="w-5 h-5" /> },
  { id: 'address', title: 'Address', icon: <MapPinIcon className="w-5 h-5" /> },
]

const RegisterPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [currentStep, setCurrentStep] = useState(0)
  const [animationDirection, setAnimationDirection] = useState('forward')
  const [creator, setCreator] = useState('')
  const [role, setRole] = useState('')
  
  // Parse URL parameters to get creator and role
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    
    const creatorParam = params.get('creator')
    const roleParam = params.get('role')
    
    // Validate URL parameters
    if (!creatorParam || !['client', 'dietitian'].includes(roleParam)) {
      // Invalid parameters, redirect to invalid link page
      navigate('/invalid-link')
      return
    }
    
    // Set creator and role from valid parameters
    setCreator(decodeURIComponent(creatorParam))
    setRole(roleParam)
    
    // Pre-fill email field if it exists in the URL
    const emailParam = params.get('email')
    if (emailParam) {
      form.setValue('email', emailParam)
    }
  }, [location])
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      phone: "",
      email: "",
      gender: "",
      dob: "",
      height: "",
      weight: "",
      fitnessGoal: "",
      address: "",
      city: "",
      state: "",
    },
    mode: "onChange"
  })

  const { formState } = form
  const { errors, isSubmitting, isValid } = formState

  const goToNextStep = async () => {
    // Get fields for current step to validate
    const fieldsToValidate = {
      0: ["firstName", "lastName", "username", "phone", "email", "gender", "dob"],
      1: ["height", "weight", "fitnessGoal"],
      2: ["address", "city", "state"]
    }[currentStep]
    
    // Trigger validation for only the fields in the current step
    const result = await form.trigger(fieldsToValidate)
    
    if (result) {
      setAnimationDirection('forward')
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
    } else {
      // Show error toast if validation fails
      toast.error("Please fix the errors before proceeding")
    }
  }

  const goToPrevStep = () => {
    setAnimationDirection('backward')
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const onSubmit = (data) => {
    // Add creator and role to the submitted data
    const submissionData = {
      ...data,
      invitedBy: creator,
      role: role
    }
    
    console.log(submissionData)
    toast.success("Registration successful!")
    // Redirect to dashboard or next step
    setTimeout(() => navigate('/dashboard'), 1500)
  }

  // Determine if current step is complete
  const isStepComplete = (stepIndex) => {
    const fieldsToValidate = {
      0: ["firstName", "lastName", "username", "phone", "email", "gender", "dob"],
      1: ["height", "weight", "fitnessGoal"],
      2: ["address", "city", "state"]
    }[stepIndex]
    
    return fieldsToValidate.every(field => !errors[field] && form.getValues(field))
  }

  // Animation variants
  const variants = {
    hidden: (direction) => ({
      x: direction === 'forward' ? 100 : -100,
      opacity: 0
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    exit: (direction) => ({
      x: direction === 'forward' ? -100 : 100,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    })
  }

  const renderFormStep = () => {
    switch(currentStep) {
      case 0:
        return (
          <motion.div
            key="personal"
            custom={animationDirection}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            className="space-y-6"
          >
            <div className="space-y-6">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg">
                  <UserIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-emerald-800">Personal Information</h3>
                  <p className="text-gray-500">Enter your basic personal details</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John" 
                          {...field} 
                          className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Doe" 
                          {...field} 
                          className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="johndoe" 
                          {...field} 
                          className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500">
                          <PhoneIcon className="h-4 w-4" />
                        </div>
                        <FormControl>
                          <Input 
                            placeholder="1234567890" 
                            {...field} 
                            className="pl-10 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500">
                          <AtSignIcon className="h-4 w-4" />
                        </div>
                        <FormControl>
                          <Input 
                            placeholder="john.doe@example.com" 
                            {...field} 
                            className="pl-10 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-emerald-200 focus:ring-emerald-500">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500">
                          <CalendarIcon className="h-4 w-4" />
                        </div>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field} 
                            className="pl-10 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </motion.div>
        )
      case 1:
        return (
          <motion.div
            key="physical"
            custom={animationDirection}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            className="space-y-6"
          >
            <div className="space-y-6">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg">
                  <MoveIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-emerald-800">Physical Statistics</h3>
                  <p className="text-gray-500">Your physical measurements and goals</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (cm)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="175" 
                          {...field} 
                          className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
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
                        <Input 
                          type="number" 
                          placeholder="70" 
                          {...field} 
                          className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="fitnessGoal"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Fitness Goal</FormLabel>
                      <div className="flex items-center space-x-2 mb-2">
                        <HeartIcon className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm text-gray-500">Select your primary fitness objective</span>
                      </div>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-emerald-200 focus:ring-emerald-500">
                            <SelectValue placeholder="Select your fitness goal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="weight-loss">Weight Loss</SelectItem>
                          <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                          <SelectItem value="endurance">Improve Endurance</SelectItem>
                          <SelectItem value="flexibility">Increase Flexibility</SelectItem>
                          <SelectItem value="overall-fitness">Overall Fitness</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            key="address"
            custom={animationDirection}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            className="space-y-6"
          >
            <div className="space-y-6">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg">
                  <MapPinIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-emerald-800">Address Information</h3>
                  <p className="text-gray-500">Your location details</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500">
                          <HomeIcon className="h-4 w-4" />
                        </div>
                        <FormControl>
                          <Input 
                            placeholder="123 Fitness Street" 
                            {...field} 
                            className="pl-10 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500">
                            <BuildingIcon className="h-4 w-4" />
                          </div>
                          <FormControl>
                            <Input 
                              placeholder="New York" 
                              {...field} 
                              className="pl-10 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500">
                            <GlobeIcon className="h-4 w-4" />
                          </div>
                          <FormControl>
                            <Input 
                              placeholder="New York" 
                              {...field} 
                              className="pl-10 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-700">
          Create Your FitFluencer Profile
        </h1>
        {creator && role && (
          <p className="text-gray-500 mt-2">
            You've been invited by <span className="font-medium text-emerald-600">{creator}</span> to join as a <span className="font-medium text-emerald-600 capitalize">{role}</span>
          </p>
        )}
        <p className="text-gray-500 mt-2">Join our community of fitness enthusiasts and begin your transformation journey</p>
      </motion.div>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-emerald-100">
        {/* Progress stepper */}
        <div className="bg-emerald-50 p-5 border-b border-emerald-100">
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 top-4 w-full h-0.5 bg-emerald-200" style={{ transform: 'translateX(50%)' }}>
                    <div 
                      className={`h-full bg-emerald-500 transition-all duration-500`}
                      style={{ width: currentStep > index ? '100%' : '0%' }}
                    ></div>
                  </div>
                )}
                
                {/* Step indicator */}
                <button 
                  className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
                    currentStep === index 
                      ? 'bg-emerald-500 text-white ring-4 ring-emerald-100' 
                      : currentStep > index || isStepComplete(index)
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-emerald-100 text-emerald-500'
                  }`}
                  onClick={() => {
                    // Only allow clicking on completed steps or current step
                    if (currentStep > index || isStepComplete(index)) {
                      setCurrentStep(index)
                    }
                  }}
                >
                  {currentStep > index || isStepComplete(index) ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>
                
                {/* Step title */}
                <div className="flex items-center mt-2 space-x-1">
                  <span className="hidden md:block">{step.icon}</span>
                  <span className={`text-sm font-medium ${
                    currentStep === index ? 'text-emerald-700' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {renderFormStep()}
              
              <div className="pt-6 space-y-4">
                <Separator className="bg-emerald-100" />
                <div className="flex justify-between">
                  {currentStep > 0 && (
                    <Button 
                      type="button" 
                      variant="outline"
                      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      onClick={goToPrevStep}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                  )}
                  
                  <div className="ml-auto">
                    {currentStep < steps.length - 1 ? (
                      <Button 
                        type="button" 
                        onClick={goToNextStep}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white"
                      >
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        <Button 
                          type="submit" 
                          size="lg" 
                          className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-md"
                          disabled={isSubmitting || !isValid}
                        >
                          {isSubmitting ? "Registering..." : "Complete Registration"}
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
