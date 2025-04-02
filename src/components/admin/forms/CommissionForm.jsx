import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { X } from 'lucide-react'
import Select from 'react-select'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { toast } from 'sonner'

const commissionSchema = z.object({
  maxDownline: z.number().min(1, 'Max downline must be at least 1'),
  type: z.string().min(1, 'Type is required'),
  levels: z.array(z.object({
    level: z.number(),
    role: z.string().min(1, 'Role is required'),
    commissionPercentage: z.number().min(0).max(100, 'Commission percentage must be between 0 and 100')
  }))
}).refine((data) => {
  const totalCommission = data.levels.reduce((sum, level) => sum + level.commissionPercentage, 0)
  return totalCommission <= 100
}, {
  message: 'Total commission percentage cannot exceed 100%',
  path: ['levels']
})

const CommissionForm = ({ editingCommission, setShowCommissionForm, setEditingCommission, onSubmitCommission }) => {
  const [selectedType, setSelectedType] = useState(editingCommission?.type || '')
  const [maxDownline, setMaxDownline] = useState(editingCommission?.maxDownline || 1)

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(commissionSchema),
    defaultValues: editingCommission || {
      maxDownline: 1,
      type: '',
      levels: [{ level: 0, role: '', commissionPercentage: 0 }]
    }
  })

  const { fields, append, update, replace } = useFieldArray({
    control,
    name: 'levels'
  })

  const typeOptions = [
    { value: 'dietitian', label: 'Dietitian' },
    { value: 'corporate', label: 'Corporate' }
  ]

  useEffect(() => {
    if (!selectedType) return;

    const levels = [];
    for (let i = 0; i <= maxDownline; i++) {
      const existingLevel = editingCommission?.levels?.find(l => l.level === i);
      levels.push({
        level: i,
        role: existingLevel?.role || (i === 0 ? 'admin' : selectedType),
        commissionPercentage: existingLevel?.commissionPercentage || 0
      });
    }
    replace(levels);
  }, [maxDownline, selectedType, editingCommission, replace]);

  const getRoleOptions = () => {
    if (selectedType === 'dietitian') {
      return [
        { value: 'admin', label: 'Admin' },
        { value: 'dietitian', label: 'Dietitian' }
      ]
    } else if (selectedType === 'corporate') {
      return [
        { value: 'admin', label: 'Admin' },
        { value: 'corporate', label: 'Corporate' }
      ]
    }
    return []
  }

  const onSubmit = (data) => {
    // Call to the parent component onSubmit handler through props
    if (editingCommission) {
      // If we're editing, include the original ID
      data.id = editingCommission.id;
    }
    // Pass the form data to the parent component
    if (typeof onSubmitCommission === 'function') {
      onSubmitCommission(data);
    }
    toast.success(editingCommission ? 'Commission updated successfully!' : 'Commission added successfully!')
    handleClose()
  }

  const handleClose = () => {
    setShowCommissionForm(false)
    setEditingCommission(null)
    reset()
  }

  const handleMaxDownlineChange = (e) => {
    const value = parseInt(e.target.value)
    if (value >= 1) {
      setMaxDownline(value)
      setValue('maxDownline', value)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {editingCommission ? 'Edit Commission' : 'Add New Commission'}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxDownline">Max Downline</Label>
                <Input
                  id="maxDownline"
                  type="number"
                  min="1"
                  value={maxDownline}
                  onChange={handleMaxDownlineChange}
                  className={errors.maxDownline ? 'border-red-500' : ''}
                />
                {errors.maxDownline && (
                  <p className="text-sm text-red-500">{errors.maxDownline.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  id="type"
                  options={typeOptions}
                  value={typeOptions.find(option => option.value === selectedType)}
                  onChange={(option) => {
                    setSelectedType(option.value)
                    setValue('type', option.value)
                  }}
                  className={errors.type ? 'border-red-500' : ''}
                />
                {errors.type && (
                  <p className="text-sm text-red-500">{errors.type.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Commission Levels</Label>
              <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-sm font-medium text-slate-500 dark:text-slate-400">Level</th>
                      <th className="text-left text-sm font-medium text-slate-500 dark:text-slate-400">Role</th>
                      <th className="text-left text-sm font-medium text-slate-500 dark:text-slate-400">Commission %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((field, index) => (
                      <tr key={field.id}>
                        <td className="py-2">
                          <Input
                            value={field.level}
                            readOnly
                            className="bg-slate-100 dark:bg-slate-800"
                          />
                        </td>
                        <td className="py-2">
                          <Select
                            options={getRoleOptions()}
                            value={getRoleOptions().find(option => option.value === field.role)}
                            onChange={(option) => {
                              update(index, { ...field, role: option.value })
                            }}
                            className={errors.levels?.[index]?.role ? 'border-red-500' : ''}
                          />
                          {errors.levels?.[index]?.role && (
                            <p className="text-sm text-red-500">{errors.levels[index].role.message}</p>
                          )}
                        </td>
                        <td className="py-2">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            {...register(`levels.${index}.commissionPercentage`)}
                            className={errors.levels?.[index]?.commissionPercentage ? 'border-red-500' : ''}
                          />
                          {errors.levels?.[index]?.commissionPercentage && (
                            <p className="text-sm text-red-500">{errors.levels[index].commissionPercentage.message}</p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {errors.levels && !Array.isArray(errors.levels) && (
                <p className="text-sm text-red-500">{errors.levels.message}</p>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="text-slate-600 dark:text-slate-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {editingCommission ? 'Update' : 'Add'} Commission
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CommissionForm 