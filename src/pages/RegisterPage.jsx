import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Lock, CheckCircle2, MapPin, Home, Building, Phone, MapIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group'
import { Label } from '../components/ui/label'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Name must be at least 2 characters',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  phone: z.string().min(10, {
    message: 'Please enter a valid phone number',
  }),
  gender: z.string({
    required_error: 'Please select your gender',
  }),
  address: z.string().min(5, {
    message: 'Please enter a valid address',
  }),
  city: z.string().min(2, {
    message: 'Please enter a valid city name',
  }),
  state: z.string().min(2, {
    message: 'Please enter a valid state name',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
  confirmPassword: z.string(),
  plan: z.string({
    required_error: 'Please select a subscription plan',
  }),
  additionalInfo: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const RegisterPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      gender: '',
      address: '',
      city: '',
      state: '',
      password: '',
      confirmPassword: '',
      plan: '',
      additionalInfo: '',
    },
  })
  
  // Link parameters state
  const [linkParams, setLinkParams] = React.useState({
    creator: '',
    role: '',
  })
  
  const [isSuccess, setIsSuccess] = React.useState(false)
  
  // Parse URL parameters on component mount
  React.useEffect(() => {
    const params = new URLSearchParams(location.search)
    const creator = params.get('creator')
    const role = params.get('role')
    
    if (creator && role) {
      setLinkParams({
        creator: decodeURIComponent(creator),
        role: role.toLowerCase(),
      })
    } else {
      toast.error('Invalid invitation link')
      setTimeout(() => navigate('/'), 2000)
    }
  }, [location, navigate])
  
  function onSubmit(values) {
    console.log(values)
    // Here you would normally send the form data to your backend
    setIsSuccess(true)
    setTimeout(() => navigate('/'), 3000)
  }
  
  if (!linkParams.creator || !linkParams.role) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-white to-emerald-50 dark:from-slate-950 dark:to-slate-900 py-8"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent mb-2">
              Register as a {linkParams.role}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">
              Complete your registration to join our community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-5 md:p-6"
            >
              <div className="mb-5 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800">
                <p className="text-sm text-emerald-800 dark:text-emerald-200">
                  <span className="font-semibold">{linkParams.creator}</span> has invited you to join as a <span className="font-semibold">{linkParams.role}</span>.
                </p>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Full Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="John Doe" {...field} className="pl-9 text-sm h-9" />
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Email Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="john@example.com" {...field} className="pl-9 text-sm h-9" />
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="+91 12345 67890" {...field} className="pl-9 text-sm h-9" />
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-9 text-sm">
                                <SelectValue placeholder="Select your gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="123 Main Street" {...field} className="pl-9 text-sm h-9" />
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">City</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="Mumbai" {...field} className="pl-9 text-sm h-9" />
                              <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">State</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="Maharashtra" {...field} className="pl-9 text-sm h-9" />
                              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input type="password" {...field} className="pl-9 text-sm h-9" />
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input type="password" {...field} className="pl-9 text-sm h-9" />
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="py-2">
                    <h3 className="text-base font-semibold mb-3">Select your plan</h3>
                    <FormField
                      control={form.control}
                      name="plan"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="space-y-2"
                            >
                              <label className="cursor-pointer">
                                <Card className={`border border-slate-200 dark:border-slate-700 transition-all hover:border-emerald-300 dark:hover:border-emerald-500 ${field.value === "monthly" ? "ring-2 ring-emerald-500 dark:ring-emerald-400" : ""}`}>
                                  <CardContent className="p-3 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                      <RadioGroupItem value="monthly" id="monthly" className="h-4 w-4" />
                                      <div>
                                        <Label htmlFor="monthly" className="font-medium text-sm">
                                          Monthly Plan
                                        </Label>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">
                                          ₹5,000 per month
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </label>
                              
                              <label className="cursor-pointer">
                                <Card className={`border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 transition-all hover:border-emerald-300 dark:hover:border-emerald-500 ${field.value === "quarterly" ? "ring-2 ring-emerald-500 dark:ring-emerald-400" : ""}`}>
                                  <CardContent className="p-3 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                      <RadioGroupItem value="quarterly" id="quarterly" className="h-4 w-4" />
                                      <div>
                                        <Label htmlFor="quarterly" className="font-medium text-sm">
                                          3-Month Plan
                                        </Label>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">
                                          ₹10,000 for 3 months (₹12,000 value)
                                        </div>
                                      </div>
                                    </div>
                                    <div className="bg-emerald-600 text-white text-xs font-medium px-2 py-0.5 rounded text-[10px]">
                                      Best Value
                                    </div>
                                  </CardContent>
                                </Card>
                              </label>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Additional Information (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any health conditions, previous fitness experience, or specific requirements..." 
                            className="min-h-[80px] text-sm resize-none"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full py-2 h-9 text-sm bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-500/10">
                    Register
                  </Button>
                </form>
              </Form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                  <CardDescription className="text-xs">
                    Reach out to us directly using the information below.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-100 dark:bg-emerald-900/50 p-1.5 rounded-full">
                      <Phone className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Phone</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-xs">+91 98765 43210</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-100 dark:bg-emerald-900/50 p-1.5 rounded-full">
                      <Mail className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Email</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-xs">contact@fitfluencer.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-100 dark:bg-emerald-900/50 p-1.5 rounded-full">
                      <MapPin className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Office</h3>
                      <address className="not-italic text-slate-600 dark:text-slate-400 text-xs">
                        123 Fitness Avenue<br />
                        Wellness District<br />
                        Health City, HC 12345
                      </address>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg mt-4 border border-slate-200 dark:border-slate-800">
                    <h3 className="font-medium text-sm mb-2">Operating Hours</h3>
                    <ul className="space-y-1 text-slate-600 dark:text-slate-400 text-xs">
                      <li className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span>8:00 AM - 8:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Saturday:</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Sunday:</span>
                        <span>Closed</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl text-center max-w-sm"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mx-auto w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mb-4"
              >
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              </motion.div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                Registration Successful!
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Welcome to FitFluencer. Redirecting you to the dashboard...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default RegisterPage 