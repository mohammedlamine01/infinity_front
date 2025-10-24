'use client';

import React, { useState, useEffect } from 'react';
import { eventsAPI } from '@/utils/api';
import { toast } from 'sonner';
import Step1BasicInfo from './Step1BasicInfo';
import Step2DetailsMedia from './Step2DetailsMedia';

export default function MultiStepEventForm({ event, onSuccess, onCancel }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'seminar',
    description: '',
    date: '',
    location: '',
    time: '',
    id_dep: '',
    image: null,
  });

  // Initialize form data if editing an existing event
  React.useEffect(() => {
    if (event) {
      setFormData({
        name: event.name || '',
        type: event.type || 'seminar',
        description: event.description || '',
        date: event.date || '',
        location: event.location || '',
        time: event.time || '',
        id_dep: event.id_dep?.toString() || '',
        image: event.image || null,
      });
    }
  }, [event]);

  const handleNext = () => {
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async () => {
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
        id_dep: parseInt(formData.id_dep),
        image: formData.image || '',
      };

      console.log('Submitting event data:', submitData);

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
      console.error('Error response:', error.response?.data);
      toast.error(error.response?.data?.message || 'Failed to save event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative overflow-hidden">
        {currentStep === 1 && (
          <div className="transform transition-all duration-500 ease-in-out translate-x-0 opacity-100">
            <Step1BasicInfo
              formData={formData}
              setFormData={setFormData}
              onNext={handleNext}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="transform transition-all duration-500 ease-in-out translate-x-0 opacity-100">
            <Step2DetailsMedia
              formData={formData}
              setFormData={setFormData}
              onBack={handleBack}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>
        )}
      </div>

      {onCancel && (
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}