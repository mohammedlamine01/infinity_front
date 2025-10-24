'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { departmentsAPI } from '@/utils/api';
import { toast } from 'sonner';

export default function Step1BasicInfo({ formData, setFormData, onNext }) {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const { data } = await departmentsAPI.getAll();
      const deptData = Array.isArray(data) ? data : (data?.departments || []);
      setDepartments(deptData);
    } catch (error) {
      console.error('Error fetching departments:', error);
      toast.error('Failed to load departments');
      setDepartments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateStep = () => {
    if (!formData.name?.trim()) {
      toast.error('Event name is required');
      return false;
    }
    if (!formData.type) {
      toast.error('Event type is required');
      return false;
    }
    if (!formData.id_dep) {
      toast.error('Department is required');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      onNext();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-6">
        
        <div className="flex justify-center mt-6">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                1
              </div>
              <span className="ml-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400">Basic Info</span>
            </div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-indigo-200 to-purple-200 dark:from-indigo-800 dark:to-purple-800"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <span className="ml-3 text-sm font-medium text-gray-600 dark:text-gray-400">Details & Media</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8 px-8">
        <div className="space-y-3">
          <Label htmlFor="name" className="text-sm font-semibold text-foreground flex items-center gap-1">
            Event Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="e.g., Hackathon 2025"
            value={formData.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full h-12 bg-background border-2 border-border hover:border-indigo-300 dark:hover:border-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200 shadow-sm"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="type" className="text-sm font-semibold text-foreground flex items-center gap-1">
            Event Type <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.type || ''} onValueChange={(value) => handleChange('type', value)}>
            <SelectTrigger className="w-full h-12 bg-background border-2 border-border hover:border-indigo-300 dark:hover:border-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200 shadow-sm">
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent className="bg-background border-2 border-border shadow-xl">
              <SelectItem value="seminar" className="hover:bg-indigo-50 dark:hover:bg-indigo-950 cursor-pointer py-3">🎓 Seminar</SelectItem>
              <SelectItem value="workshop" className="hover:bg-indigo-50 dark:hover:bg-indigo-950 cursor-pointer py-3">🔧 Workshop</SelectItem>
              <SelectItem value="conference" className="hover:bg-indigo-50 dark:hover:bg-indigo-950 cursor-pointer py-3">🎤 Conference</SelectItem>
              <SelectItem value="competition" className="hover:bg-indigo-50 dark:hover:bg-indigo-950 cursor-pointer py-3">🏆 Competition</SelectItem>
              <SelectItem value="meeting" className="hover:bg-indigo-50 dark:hover:bg-indigo-950 cursor-pointer py-3">🤝 Meeting</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="description" className="text-sm font-semibold text-foreground">
            Description
          </Label>
          <textarea
            id="description"
            placeholder="Describe the event..."
            value={formData.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-4 py-3 bg-background border-2 border-border rounded-md hover:border-indigo-300 dark:hover:border-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 shadow-sm min-h-[120px] resize-none"
            rows={4}
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="department" className="text-sm font-semibold text-foreground flex items-center gap-1">
            Department <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.id_dep || ''}
            onValueChange={(value) => handleChange('id_dep', value)}
            disabled={loading}
          >
            <SelectTrigger className="w-full h-12 bg-background border-2 border-border hover:border-indigo-300 dark:hover:border-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200 shadow-sm disabled:opacity-50">
              <SelectValue placeholder={loading ? "Loading departments..." : "Select a department"} />
            </SelectTrigger>
            <SelectContent className="bg-background border-2 border-border shadow-xl max-h-60">
              {departments.map((dept) => (
                <SelectItem
                  key={dept.id}
                  value={dept.id.toString()}
                  className="hover:bg-indigo-50 dark:hover:bg-indigo-950 cursor-pointer py-3"
                >
                  {dept.nom_dep || dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end pt-6 border-t border-border/50">
          <button
            type="button"
            onClick={handleNext}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            Next Step
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}