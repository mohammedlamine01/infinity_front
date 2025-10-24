'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { departmentsAPI, imagesAPI, eventsAPI } from '@/utils/api';
import { toast } from 'sonner';

export default function AddEventForm({ event, onSuccess, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'seminar',
    description: '',
    date: '',
    time: '',
    location: '',
    id_dep: '',
    image: null,
  });

  useEffect(() => {
    fetchDepartments();
    if (event) {
      setFormData({
        name: event.name || '',
        type: event.type || 'seminar',
        description: event.description || '',
        date: event.date || '',
        time: event.time || '',
        location: event.location || '',
        id_dep: event.id_dep?.toString() || '',
        image: event.image || null,
      });
      if (event.image) {
        setImagePreview(imagesAPI.getUrl(event.image));
      }
    }
  }, [event]);

  const fetchDepartments = async () => {
    try {
      const { data } = await departmentsAPI.getAll();
      const deptData = Array.isArray(data) ? data : (data?.departments || []);
      setDepartments(deptData);
    } catch (error) {
      console.error('Error fetching departments:', error);
      toast.error('Failed to load departments');
      setDepartments([]);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
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

  const validateForm = () => {
    if (!formData.name?.trim()) return toast.error('Event name is required');
    if (!formData.type) return toast.error('Event type is required');
    if (!formData.id_dep) return toast.error('Department is required');
    if (!formData.location?.trim()) return toast.error('Location is required');
    if (!formData.date) return toast.error('Date is required');
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (event) {
        await eventsAPI.update(event.id, formDataToSend);
        toast.success('Event updated successfully!');
      } else {
        await eventsAPI.create(formDataToSend);
        toast.success('Event created successfully!');
      }

      onSuccess?.();
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error('Failed to save event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-4">
      <Card className="w-full max-w-[900px] h-[85vh] flex flex-col overflow-hidden shadow-lg border border-border/40 bg-card/95 backdrop-blur-sm">
        {/* Header */}
        <CardHeader className="py-3 border-b border-border/50">
          <CardTitle className="text-lg font-semibold text-center bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            {event ? '✏️ Edit Event' : '➕ Add New Event'}
          </CardTitle>
        </CardHeader>

        {/* Form Content */}
        <CardContent className="flex-1 px-6 py-4 grid grid-cols-2 gap-5 text-sm overflow-hidden">
          {/* Left Column */}
          <div className="space-y-3">
            <div>
              <Label className="text-xs font-medium">Event Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g., Tech Talk"
                className="h-8 text-sm"
              />
            </div>

            <div>
              <Label className="text-xs font-medium">Event Type *</Label>
              <Select value={formData.type} onValueChange={(v) => handleChange('type', v)}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seminar">🎓 Seminar</SelectItem>
                  <SelectItem value="workshop">🔧 Workshop</SelectItem>
                  <SelectItem value="conference">🎤 Conference</SelectItem>
                  <SelectItem value="competition">🏆 Competition</SelectItem>
                  <SelectItem value="meeting">🤝 Meeting</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs font-medium">Department *</Label>
              <Select value={formData.id_dep} onValueChange={(v) => handleChange('id_dep', v)}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id.toString()}>
                      {dept.nom_dep || dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs font-medium">Description</Label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full h-[70px] text-sm p-2 border rounded-md resize-none"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs font-medium">Date *</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
              <div>
                <Label className="text-xs font-medium">Time</Label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleChange('time', e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-medium">Location *</Label>
              <Input
                placeholder="Main Hall"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="h-8 text-sm"
              />
            </div>

            <div>
              <Label className="text-xs font-medium">Event Image</Label>
              {imagePreview ? (
                <div className="relative w-full h-20 border rounded-md overflow-hidden">
                  <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-20 border border-dashed rounded-md cursor-pointer hover:border-green-400 hover:bg-green-50 transition">
                  <Upload className="w-5 h-5 text-muted-foreground mb-1" />
                  <span className="text-xs text-muted-foreground">Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </CardContent>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 pb-4 border-t border-border/50">
          <Button
            onClick={onCancel}
            variant="outline"
            className="h-8 text-xs border-border hover:border-green-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="h-8 text-xs bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white"
          >
            {loading ? 'Saving...' : event ? 'Update Event' : 'Create Event'}
          </Button>
        </div>
      </Card>
    </div>
  );
}