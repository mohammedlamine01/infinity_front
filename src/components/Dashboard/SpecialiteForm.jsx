'use client';

import { useState, useEffect } from 'react';
import { specialitesAPI, departmentsAPI } from '@/utils/api';
import { toast } from 'sonner';

export default function SpecialiteForm({ specialite, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    nom_sp: '',
    id_dep: '',
  });
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDepartments();
    
    if (specialite) {
      setFormData({
        nom_sp: specialite.nom_sp || specialite.name || '',
        id_dep: specialite.id_dep || '',
      });
    }
  }, [specialite]);

  const fetchDepartments = async () => {
    try {
      const { data } = await departmentsAPI.getAll();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
      toast.error('Failed to load departments');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (specialite) {
        await specialitesAPI.update(specialite.id, formData);
        toast.success('Specialite updated successfully!');
      } else {
        await specialitesAPI.create(formData);
        toast.success('Specialite created successfully!');
      }
      
      onSuccess?.();
    } catch (error) {
      console.error('Error saving specialite:', error);
      toast.error(error.response?.data?.message || 'Failed to save specialite');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Specialite Name *
        </label>
        <input
          type="text"
          value={formData.nom_sp}
          onChange={(e) => setFormData({ ...formData, nom_sp: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
          placeholder="e.g., Software Engineering"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Department *
        </label>
        <select
          value={formData.id_dep}
          onChange={(e) => setFormData({ ...formData, id_dep: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
          required
        >
          <option value="">Select a department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.nom_dep || dept.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Saving...' : specialite ? 'Update Specialite' : 'Create Specialite'}
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
