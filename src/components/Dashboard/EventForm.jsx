'use client';

import { useState, useEffect } from 'react';
import { eventsAPI, departmentsAPI, imagesAPI } from '@/utils/api';
import { toast } from 'sonner';
import { Upload, X } from 'lucide-react';

export default function EventForm({ event, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'seminar', // Add type field with default value
    description: '',
    date: '',
    location: '',
    time: '', // Add time field
    id_dep: '', // Changed from id_dp to id_dep
    image: null,
  });
  const [departments, setDepartments] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDepartments();
    
    if (event) {
      setFormData({
        name: event.name || '',
        type: event.type || 'seminar',
        description: event.description || '',
        date: event.date || '',
        location: event.location || '',
        time: event.time || '',
        id_dep: event.id_dep || '',
        image: null,
      });
      
      if (event.image) {
        setImagePreview(imagesAPI.getUrl(event.image));
      }
    }
  }, [event]);

  const fetchDepartments = async () => {
    try {
      const { data } = await departmentsAPI.getAll();
      // Ensure data is an array
      const deptData = Array.isArray(data) ? data : (data?.departments || []);
      setDepartments(deptData);
    } catch (error) {
      console.error('Error fetching departments:', error);
      toast.error('Failed to load departments');
      setDepartments([]); // Set empty array on error
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, image: null });
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare data for submission
      const submitData = {
        name: formData.name,
        type: formData.type,
        description: formData.description || '',
        date: formData.date,
        location: formData.location,
        time: formData.time || '',
        id_dep: parseInt(formData.id_dep), // Ensure it's a number
        image: formData.image || '',
      };

      console.log('Submitting event data:', submitData); // Debug log

      if (event) {
        await eventsAPI.update(event.id, submitData);
        toast.success('Event updated successfully!');
      } else {
        await eventsAPI.create(submitData);
        toast.success('Event created successfully!');
      }
      
      onSuccess?.();
    } catch (error) {
      console.error('Error saving event:', error);
      console.error('Error response:', error.response?.data); // Debug log
      toast.error(error.response?.data?.message || 'Failed to save event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Event Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
          placeholder="e.g., Hackathon 2025"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Event Type *
        </label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
          required
        >
          <option value="seminar">Seminar</option>
          <option value="workshop">Workshop</option>
          <option value="conference">Conference</option>
          <option value="competition">Competition</option>
          <option value="meeting">Meeting</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
          placeholder="Describe the event..."
          rows={4}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date *
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Time
          </label>
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Location *
        </label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
          placeholder="e.g., Main Hall"
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

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Event Image
        </label>
        
        {imagePreview ? (
          <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
            <img
              src={imagePreview}
              alt="Event preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Upload className="w-12 h-12 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Click to upload image
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Saving...' : event ? 'Update Event' : 'Create Event'}
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
