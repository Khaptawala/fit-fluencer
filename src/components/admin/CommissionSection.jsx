import React from 'react'
import { Plus, Edit, Eye } from 'lucide-react'
import { Button } from '../ui/button'
import CommissionForm from './forms/CommissionForm'

const CommissionSection = ({
  commissions,
  showCommissionForm,
  setShowCommissionForm,
  editingCommission,
  setEditingCommission,
  handleView,
  handleEdit,
  handleAdd,
  onSubmitCommission
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Commission Structure</h2>
        <Button
          onClick={() => handleAdd('commission')}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Commission
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Sr No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Max Downline</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Commission</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {commissions?.map((commission) => (
              <tr key={commission.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-300">{commission.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-300">{commission.maxDownline}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-300 capitalize">{commission.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-300">
                  {commission?.levels?.reduce((sum, level) => sum + level?.commissionPercentage, 0)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleView('commission', commission.id)}
                      variant="ghost"
                      size="sm"
                      className="text-slate-600 dark:text-slate-300 hover:text-emerald-500"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleEdit('commission', commission.id)}
                      variant="ghost"
                      size="sm"
                      className="text-slate-600 dark:text-slate-300 hover:text-emerald-500"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCommissionForm && (
        <CommissionForm
          editingCommission={editingCommission}
          setShowCommissionForm={setShowCommissionForm}
          setEditingCommission={setEditingCommission}
          onSubmitCommission={onSubmitCommission}
        />
      )}
    </div>
  )
}

export default CommissionSection 