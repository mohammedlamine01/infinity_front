'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { imagesAPI } from '@/utils/api';
import { toast } from 'sonner';

export default function Step2DetailsMedia({ formData, setFormData, onBack, onSubmit, loading }) {
  const [imagePreview, setImagePreview] = useState(null);

  // Set image preview on component mount if image exists
  React.useEffect(() => {
    if (formData.image && typeof formData.image === 'string') {
      setImagePreview(imagesAPI.getUrl(formData.image));
    } else if (formData.image instanceof File) {
      setImagePreview(URL.createObjectURL(formData.image));
    }
  }, [formData.image]);

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

  const validateStep = () => {
    if (!formData.location?.trim()) {
      toast.error('Location is required');
      return false;
    }
    if (!formData.date) {
      toast.error('Date is required');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateStep()) {
      onSubmit();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Step 2: Details & Media
        </CardTitle>
        <div className="flex justify-center mt-6">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                ✓
              </div>
              <span className="ml-3 text-sm font-semibold text-green-600 dark:text-green-400">Basic Info</span>
            </div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-green-400 to-indigo-600"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                2
              </div>
              <span className="ml-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400">Details & Media</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="date" className="text-sm font-semibold text-foreground flex items-center gap-1">
              Date <span className="text-red-500">*</span>
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date || ''}
              onChange={(e) => handleChange('date', e.target.value)}
              className="w-full h-12 bg-background border-2 border-border hover:border-indigo-300 dark:hover:border-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200 shadow-sm"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="time" className="text-sm font-semibold text-foreground">
              Time
            </Label>
            <Input
              id="time"
              type="time"
              value={formData.time || ''}
              onChange={(e) => handleChange('time', e.target.value)}
              className="w-full h-12 bg-background border-2 border-border hover:border-indigo-300 dark:hover:border-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200 shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="location" className="text-sm font-semibold text-foreground flex items-center gap-1">
            Location <span className="text-red-500">*</span>
          </Label>
          <Input
            id="location"
            type="text"
            placeholder="e.g., Main Hall, Room 101"
            value={formData.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full h-12 bg-background border-2 border-border hover:border-indigo-300 dark:hover:border-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200 shadow-sm"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold text-foreground">Event Image</Label>

          {imagePreview ? (
            <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-border shadow-lg group">
              <img
                src={imagePreview}
                alt="Event preview"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3 bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                Event Image
              </div>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 bg-gradient-to-br from-background to-muted/20 hover:from-indigo-50/50 dark:hover:from-indigo-950/20 group">
              <Upload className="w-12 h-12 text-muted-foreground group-hover:text-indigo-500 transition-colors duration-200 mb-3" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground text-center font-medium transition-colors duration-200">
                Click to upload image
              </span>
              <span className="text-xs text-muted-foreground/70 mt-1">
                PNG, JPG up to 5MB
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

        <div className="flex justify-between pt-8 border-t border-border/50">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="px-8 py-3 border-2 border-border hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-all duration-200 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Publishing...
              </>
            ) : (
              <>
                Publish Event
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}