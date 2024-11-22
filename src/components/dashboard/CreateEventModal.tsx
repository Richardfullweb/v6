import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RRule, Frequency } from 'rrule';
import { X, Calendar, Clock, MapPin, Upload, DollarSign, Video, Users, Repeat } from 'lucide-react';
import { Event } from '../../types/event';

const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  location: z.string().min(1, 'Location is required'),
  parish: z.string().min(1, 'Parish is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string(),
  price: z.number().min(0),
  imageUrl: z.string().url().optional(),
  isRecurring: z.boolean(),
  frequency: z.enum(['DAILY', 'WEEKLY', 'MONTHLY']).optional(),
  interval: z.number().min(1).optional(),
  endDate: z.string().optional(),
  maxAttendees: z.number().min(1).optional(),
  waitlistEnabled: z.boolean(),
  isHybrid: z.boolean(),
  streamingUrl: z.string().url().optional(),
});

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (eventData: Partial<Event>) => void;
  templates?: Event[];
}

export default function CreateEventModal({ isOpen, onClose, onSubmit, templates = [] }: CreateEventModalProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      isRecurring: false,
      waitlistEnabled: false,
      isHybrid: false,
    }
  });

  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const isRecurring = watch('isRecurring');
  const isHybrid = watch('isHybrid');

  const handleFormSubmit = (data: any) => {
    let recurrenceRule;
    if (data.isRecurring && data.frequency) {
      recurrenceRule = new RRule({
        freq: Frequency[data.frequency as keyof typeof Frequency],
        interval: data.interval || 1,
        dtstart: new Date(data.date),
        until: data.endDate ? new Date(data.endDate) : undefined,
      });
    }

    const eventData = {
      ...data,
      date: new Date(data.date),
      recurrenceRule,
      organizer: {
        name: 'Fr. Michael Thomas',
        role: 'Event Organizer',
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3'
      }
    };

    onSubmit(eventData);
    onClose();
  };

  const loadTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      // Pre-fill form with template data
      // Implementation depends on your form library
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        
        <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-semibold text-gray-900">Create New Event</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-8">
            {/* Templates Section */}
            {templates.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Start from Template</h3>
                <select
                  className="w-full rounded-md border-gray-300"
                  value={selectedTemplate}
                  onChange={(e) => {
                    setSelectedTemplate(e.target.value);
                    loadTemplate(e.target.value);
                  }}
                >
                  <option value="">Select a template</option>
                  {templates.map(template => (
                    <option key={template.id} value={template.id}>{template.title}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Event Title *</label>
                  <input
                    {...register('title')}
                    className="mt-1 block w-full rounded-md border-gray-300"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Category *</label>
                  <select
                    {...register('category')}
                    className="mt-1 block w-full rounded-md border-gray-300"
                  >
                    <option value="">Select a category</option>
                    <option value="Mass">Mass</option>
                    <option value="Adoration">Adoration</option>
                    <option value="Retreats">Retreats</option>
                    <option value="Youth">Youth</option>
                    <option value="Parish Events">Parish Events</option>
                    <option value="Conferences">Conferences</option>
                    <option value="Prayer Groups">Prayer Groups</option>
                  </select>
                </div>

                {/* Recurring Event Settings */}
                <div className="md:col-span-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register('isRecurring')}
                      className="rounded border-gray-300 text-red-600"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      This is a recurring event
                    </label>
                  </div>
                </div>

                {isRecurring && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Frequency</label>
                      <select
                        {...register('frequency')}
                        className="mt-1 block w-full rounded-md border-gray-300"
                      >
                        <option value="DAILY">Daily</option>
                        <option value="WEEKLY">Weekly</option>
                        <option value="MONTHLY">Monthly</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">End Date</label>
                      <input
                        type="date"
                        {...register('endDate')}
                        className="mt-1 block w-full rounded-md border-gray-300"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">Date *</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      {...register('date')}
                      className="block w-full pl-10 rounded-md border-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Time *</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      {...register('time')}
                      placeholder="e.g., 9:00 AM - 5:00 PM"
                      className="block w-full pl-10 rounded-md border-gray-300"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Location *</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      {...register('location')}
                      placeholder="Enter venue name and address"
                      className="block w-full pl-10 rounded-md border-gray-300"
                    />
                  </div>
                </div>

                {/* Hybrid Event Settings */}
                <div className="md:col-span-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register('isHybrid')}
                      className="rounded border-gray-300 text-red-600"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      This is a hybrid event (in-person + online)
                    </label>
                  </div>
                </div>

                {isHybrid && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Streaming URL</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <Video className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="url"
                        {...register('streamingUrl')}
                        placeholder="Enter streaming link"
                        className="block w-full pl-10 rounded-md border-gray-300"
                      />
                    </div>
                  </div>
                )}

                {/* Capacity and Waitlist */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Maximum Attendees</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      {...register('maxAttendees')}
                      min="1"
                      className="block w-full pl-10 rounded-md border-gray-300"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register('waitlistEnabled')}
                    className="rounded border-gray-300 text-red-600"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Enable waitlist when capacity is reached
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      {...register('price')}
                      min="0"
                      step="0.01"
                      className="block w-full pl-10 rounded-md border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
              <textarea
                {...register('description')}
                rows={4}
                className="block w-full rounded-md border-gray-300"
                placeholder="Provide a detailed description of the event..."
              />
            </div>

            {/* Event Image */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Event Image</h3>
              <div className="mt-1 relative rounded-md shadow-sm">
                <Upload className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  {...register('imageUrl')}
                  placeholder="Enter image URL"
                  className="block w-full pl-10 rounded-md border-gray-300"
                />
              </div>
            </div>

            <div className="bg-gray-50 -mx-6 -mb-6 px-6 py-4 flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}