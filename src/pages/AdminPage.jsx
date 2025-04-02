import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  Percent, 
  Plus, 
  FileText, 
  Edit, 
  Eye,
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  X,
  CheckCircle2,
  XCircle
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Switch } from "../components/ui/switch"
import Select from 'react-select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import DashboardSection from '../components/admin/DashboardSection'
import PlansSection from '../components/admin/PlansSection'
import ConfigSection from '../components/admin/ConfigSection'
import CommissionSection from '../components/admin/CommissionSection'

// Plan schema for validation
const planSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  offerPrice: z.number().min(0, "Offer price must be positive").optional(),
  months: z.number().min(1, "Months must be at least 1"),
  points: z.array(z.string()),
  isActive: z.boolean().default(true)
})

// Config schema for validation
const configSchema = z.object({
  key: z.string().min(1, "Key is required"),
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  value: z.string().min(1, "Value is required")
})

// Commission schema for validation
const commissionSchema = z.object({
  maxDownline: z.number().min(1, "Max downline must be at least 1"),
  type: z.string().min(1, "Type is required"),
  levels: z.array(z.object({
    level: z.number().min(0),
    role: z.string().min(1, "Role is required"),
    commissionPercentage: z.number().min(0).max(100, "Commission cannot exceed 100%")
  }))
})

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showPlanForm, setShowPlanForm] = useState(false)
  const [editingPlan, setEditingPlan] = useState(null)
  const [showConfigForm, setShowConfigForm] = useState(false)
  const [showCommissionForm, setShowCommissionForm] = useState(false)
  const [editingConfig, setEditingConfig] = useState(null)
  const [editingCommission, setEditingCommission] = useState(null)

  // Sample data for plans
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: "Basic Plan",
      description: "Perfect for beginners",
      price: 29.99,
      offerPrice: 24.99,
      months: 1,
      points: ["Basic nutrition guidance", "Weekly meal plans", "Email support"],
      isActive: true
    },
    {
      id: 2,
      name: "Pro Plan",
      description: "For serious fitness enthusiasts",
      price: 49.99,
      offerPrice: 39.99,
      months: 3,
      points: ["Advanced nutrition guidance", "Daily meal plans", "Priority support", "Progress tracking"],
      isActive: true
    }
  ])

  // Sample data for configs
  const [configs, setConfigs] = useState([
    {
      id: 1,
      key: "site_name",
      name: "Site Name",
      type: "text",
      value: "FitFluencer"
    },
    {
      id: 2,
      key: "maintenance_mode",
      name: "Maintenance Mode",
      type: "boolean",
      value: "false"
    }
  ])

  // Sample data for commissions
  const [commissions, setCommissions] = useState([
    {
      id: 1,
      maxDownline: 5,
      type: "dietitian",
      levels: [
        { level: 0, role: "admin", commissionPercentage: 5 },
        { level: 1, role: "dietitian", commissionPercentage: 3 },
        { level: 2, role: "dietitian", commissionPercentage: 2 },
        { level: 3, role: "dietitian", commissionPercentage: 1 },
        { level: 4, role: "dietitian", commissionPercentage: 0.5 },
        { level: 5, role: "dietitian", commissionPercentage: 0.5 }
      ]
    },
    {
      id: 2,
      maxDownline: 3,
      type: "corporate",
      levels: [
        { level: 0, role: "admin", commissionPercentage: 8 },
        { level: 1, role: "corporate", commissionPercentage: 4 },
        { level: 2, role: "corporate", commissionPercentage: 2 },
        { level: 3, role: "corporate", commissionPercentage: 1 }
      ]
    }
  ])

  // Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = useForm({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      offerPrice: 0,
      months: 1,
      points: [],
      isActive: true
    }
  })

  // Config form setup
  const {
    register: registerConfig,
    handleSubmit: handleConfigSubmit,
    reset: resetConfig,
    formState: { errors: configErrors },
    setValue: setConfigValue
  } = useForm({
    resolver: zodResolver(configSchema),
    defaultValues: {
      key: "",
      name: "",
      type: "",
      value: ""
    }
  })

  // Commission form setup
  const {
    register: registerCommission,
    handleSubmit: handleCommissionSubmit,
    reset: resetCommission,
    formState: { errors: commissionErrors },
    setValue: setCommissionValue,
    watch: watchCommission
  } = useForm({
    resolver: zodResolver(commissionSchema),
    defaultValues: {
      maxDownline: 1,
      type: "",
      levels: []
    }
  })

  const maxDownline = watchCommission("maxDownline")

  const onSubmit = (data) => {
    if (editingPlan) {
      // Update existing plan
      setPlans(plans.map(plan => 
        plan.id === editingPlan.id ? { ...plan, ...data } : plan
      ))
      toast.success("Plan updated successfully!")
    } else {
      // Add new plan
      const newPlan = {
        id: plans.length + 1,
        ...data
      }
      setPlans([...plans, newPlan])
      toast.success("Plan added successfully!")
    }
    setShowPlanForm(false)
    reset()
    setEditingPlan(null)
  }

  const handleEdit = (type, id) => {
    if (type === 'commission') {
      const commission = commissions.find(c => c.id === id);
      setEditingCommission(commission);
      setShowCommissionForm(true);
    } else if (type === 'config') {
      const config = configs.find(c => c.id === id);
      setEditingConfig(config);
      setShowConfigForm(true);
    } else {
      const plan = plans.find(p => p.id === id);
      setEditingPlan(plan)
      setValue("name", plan.name)
      setValue("description", plan.description)
      setValue("price", plan.price)
      setValue("offerPrice", plan.offerPrice)
      setValue("months", plan.months)
      setValue("points", plan.points)
      setValue("isActive", plan.isActive)
      setShowPlanForm(true)
    }
  }

  const handleAdd = (type) => {
    if (type === 'commission') {
      setEditingCommission(null)
      setShowCommissionForm(true)
    } else {
      setEditingPlan(null)
      reset()
      setShowPlanForm(true)
    }
  }

  const handleView = (type, id) => {
    if (type === 'commission') {
      const commission = commissions.find(c => c.id === id);
      toast.success(`Viewing commission structure: ${commission.type}`);
    } else if (type === 'config') {
      const config = configs.find(c => c.id === id);
      toast.success(`Viewing config: ${config.name}`);
    } else {
      const plan = plans.find(p => p.id === id);
      toast.success(`Viewing plan: ${plan.name}`);
    }
  }

  const handleGeneratePDF = () => {
    toast.success('Generating PDF...')
  }

  const onSubmitConfig = (data) => {
    if (editingConfig) {
      setConfigs(configs.map(config => 
        config.id === editingConfig.id ? { ...config, ...data } : config
      ))
      toast.success("Config updated successfully!")
    } else {
      const newConfig = {
        id: configs.length + 1,
        ...data
      }
      setConfigs([...configs, newConfig])
      toast.success("Config added successfully!")
    }
    setShowConfigForm(false)
    resetConfig()
    setEditingConfig(null)
  }

  const onSubmitCommission = (data) => {
    if (editingCommission) {
      setCommissions(commissions.map(commission => 
        commission.id === editingCommission.id ? { ...commission, ...data } : commission
      ))
      toast.success("Commission updated successfully!")
    } else {
      const newCommission = {
        id: commissions.length + 1,
        ...data
      }
      setCommissions([...commissions, newCommission])
      toast.success("Commission added successfully!")
    }
    setShowCommissionForm(false)
    resetCommission()
    setEditingCommission(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="commission">Commission</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <DashboardSection />
        </TabsContent>

        <TabsContent value="plans">
          <PlansSection
            plans={plans}
            showPlanForm={showPlanForm}
            setShowPlanForm={setShowPlanForm}
            editingPlan={editingPlan}
            setEditingPlan={setEditingPlan}
            handleView={handleView}
            handleEdit={handleEdit}
            handleAdd={handleAdd}
          />
        </TabsContent>

        <TabsContent value="config">
          <ConfigSection
            configs={configs}
            showConfigForm={showConfigForm}
            setShowConfigForm={setShowConfigForm}
            editingConfig={editingConfig}
            setEditingConfig={setEditingConfig}
            handleView={handleView}
            handleEdit={handleEdit}
            handleAdd={handleAdd}
          />
        </TabsContent>

        <TabsContent value="commission">
          <CommissionSection
            commissions={commissions}
            showCommissionForm={showCommissionForm}
            setShowCommissionForm={setShowCommissionForm}
            editingCommission={editingCommission}
            setEditingCommission={setEditingCommission}
            handleView={handleView}
            handleEdit={handleEdit}
            handleAdd={handleAdd}
            onSubmitCommission={onSubmitCommission}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminPage 
