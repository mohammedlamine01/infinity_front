'use client';

import { useState, useEffect } from 'react';
import { departmentsAPI } from '@/utils/api';
import { toast } from 'sonner';

export default function DepartmentForm({ department, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    nom_dep: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (department) {
      setFormData({
        nom_dep: department.nom_dep || department.name || '',
      });
    }
  }, [department]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (department) {
        await departmentsAPI.update(department.id, formData);
        toast.success('Department updated successfully!');
      } else {
        await departmentsAPI.create(formData);
        toast.success('Department created successfully!');
      }
      
      onSuccess?.();
    } catch (error) {
      console.error('Error saving department:', error);
      toast.error(error.response?.data?.message || 'Failed to save department');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Department Name *
        </label>
        <input
          type="text"
          value={formData.nom_dep}
          onChange={(e) => setFormData({ ...formData, nom_dep: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
          placeholder="e.g., Computer Science"
          required
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Saving...' : department ? 'Update Department' : 'Create Department'}
        </button>
        
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
