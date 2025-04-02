import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { Textarea } from '../../ui/textarea'
import { Switch } from '../../ui/switch'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const planSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  offerPrice: z.number().min(0, "Offer price must be positive").optional(),
  months: z.number().min(1, "Months must be at least 1"),
  points: z.array(z.string()),
  isActive: z.boolean().default(true)
})

const PlanForm = ({ editingPlan, setShowPlanForm, setEditingPlan, onSubmit }) => {
  const [points, setPoints] = useState(editingPlan?.points || [])
  const [newPoint, setNewPoint] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = useForm({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: editingPlan?.name || "",
      description: editingPlan?.description || "",
      price: editingPlan?.price || 0,
      offerPrice: editingPlan?.offerPrice || 0,
      months: editingPlan?.months || 1,
      points: editingPlan?.points || [],
      isActive: editingPlan?.isActive ?? true
    }
  })

  const handleAddPoint = () => {
    if (newPoint.trim()) {
      setPoints([...points, newPoint.trim()])
      setNewPoint("")
    }
  }

  const handleRemovePoint = (index) => {
    setPoints(points.filter((_, i) => i !== index))
  }

  const handleFormSubmit = (data) => {
    onSubmit({ ...data, points })
    setShowPlanForm(false)
    reset()
    setEditingPlan(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-6 w-full max-w-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            {editingPlan ? "Edit Plan" : "Add New Plan"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setShowPlanForm(false)
              setEditingPlan(null)
              reset()
            }}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              {...register("name")}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="offerPrice">Offer Price</Label>
              <Input
                id="offerPrice"
                type="number"
                step="0.01"
                {...register("offerPrice", { valueAsNumber: true })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="months">Months *</Label>
            <Input
              id="months"
              type="number"
              {...register("months", { valueAsNumber: true })}
              className={errors.months ? "border-red-500" : ""}
            />
            {errors.months && (
              <p className="text-red-500 text-sm mt-1">{errors.months.message}</p>
            )}
          </div>

          <div>
            <Label>Points</Label>
            <div className="space-y-2">
              {points.map((point, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={point}
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemovePoint(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  value={newPoint}
                  onChange={(e) => setNewPoint(e.target.value)}
                  placeholder="Add a new point"
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleAddPoint}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Add Point
                </Button>
              </div>
            </div>
            <input type="hidden" {...register("points")} value={JSON.stringify(points)} />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              {...register("isActive")}
            />
            <Label htmlFor="isActive">Active Plan</Label>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowPlanForm(false)
                setEditingPlan(null)
                reset()
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingPlan ? "Update Plan" : "Add Plan"}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default PlanForm 