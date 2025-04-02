import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { X } from 'lucide-react'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { toast } from 'sonner'

const configSchema = z.object({
  key: z.string().min(1, 'Key is required'),
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  value: z.string().min(1, 'Value is required')
})

const ConfigForm = ({ editingConfig, setShowConfigForm, setEditingConfig }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(configSchema),
    defaultValues: editingConfig || {
      key: '',
      name: '',
      type: '',
      value: ''
    }
  })

  const onSubmit = (data) => {
    // Here you would typically make an API call to save the config
    console.log('Config data:', data)
    toast.success(editingConfig ? 'Config updated successfully!' : 'Config added successfully!')
    handleClose()
  }

  const handleClose = () => {
    setShowConfigForm(false)
    setEditingConfig(null)
    reset()
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
          className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-6 w-full max-w-md"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {editingConfig ? 'Edit Config' : 'Add New Config'}
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="key">Key</Label>
              <Input
                id="key"
                {...register('key')}
                className={errors.key ? 'border-red-500' : ''}
              />
              {errors.key && (
                <p className="text-sm text-red-500">{errors.key.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register('name')}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                {...register('type')}
                className={errors.type ? 'border-red-500' : ''}
              />
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                {...register('value')}
                className={errors.value ? 'border-red-500' : ''}
              />
              {errors.value && (
                <p className="text-sm text-red-500">{errors.value.message}</p>
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
                {editingConfig ? 'Update' : 'Add'} Config
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ConfigForm 