import React from 'react'
import { motion } from 'framer-motion'
import { Plus, FileText, Edit, Eye, CheckCircle2, XCircle } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import PlanForm from './forms/PlanForm'

const PlansSection = ({ 
  plans, 
  showPlanForm, 
  setShowPlanForm, 
  editingPlan, 
  setEditingPlan, 
  handleView, 
  handleEdit, 
  handleAdd, 
  handleGeneratePDF 
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Subscription Plans</h2>
        <div className="flex gap-4">
          <Button
            onClick={handleGeneratePDF}
            className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate PDF
          </Button>
          <Button
            onClick={handleAdd}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Plan
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Offer Price</TableHead>
              <TableHead>Months</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell>{plan.id}</TableCell>
                <TableCell>{plan.name}</TableCell>
                <TableCell>{plan.description}</TableCell>
                <TableCell>${plan.price}</TableCell>
                <TableCell>${plan.offerPrice}</TableCell>
                <TableCell>{plan.months}</TableCell>
                <TableCell>
                  {plan.isActive ? (
                    <span className="flex items-center text-emerald-500">
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Active
                    </span>
                  ) : (
                    <span className="flex items-center text-red-500">
                      <XCircle className="w-4 h-4 mr-1" />
                      Inactive
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleView(plan)}
                      variant="ghost"
                      size="sm"
                      className="text-slate-600 dark:text-slate-300 hover:text-emerald-500"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleEdit(plan)}
                      variant="ghost"
                      size="sm"
                      className="text-slate-600 dark:text-slate-300 hover:text-emerald-500"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {showPlanForm && (
        <PlanForm
          editingPlan={editingPlan}
          setShowPlanForm={setShowPlanForm}
          setEditingPlan={setEditingPlan}
        />
      )}
    </div>
  )
}

export default PlansSection 