'use client';

import { EventsList } from '@/components/Events';
import { Calendar, Sparkles, Users } from 'lucide-react';

export default function EventsShowcase() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Events Showcase
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore all the amazing events happening at Infinity Club
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 text-center">
            <Calendar className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">50+</h3>
            <p className="text-gray-600 dark:text-gray-400">Events This Year</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 text-center">
            <Users className="w-10 h-10 text-purple-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">1000+</h3>
            <p className="text-gray-600 dark:text-gray-400">Participants</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 text-center">
            <Sparkles className="w-10 h-10 text-pink-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">5</h3>
            <p className="text-gray-600 dark:text-gray-400">Departments</p>
          </div>
        </div>

        {/* All Events Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded"></div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              All Events
            </h2>
          </div>
          <EventsList />
        </div>

        {/* Latest Events Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-green-600 to-teal-600 rounded"></div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Latest 6 Events
            </h2>
          </div>
          <EventsList limit={6} />
        </div>

        {/* Department Specific Events Example */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-orange-600 to-red-600 rounded"></div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Department Events (ID: 1)
            </h2>
          </div>
          <EventsList departmentId={1} />
        </div>

        {/* Info Box */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl p-8 border border-indigo-200 dark:border-indigo-800">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📢 How to Use These Components
          </h3>
          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p>• <strong>All Events:</strong> <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">{'<EventsList />'}</code></p>
            <p>• <strong>Limited Events:</strong> <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">{'<EventsList limit={6} />'}</code></p>
            <p>• <strong>Department Events:</strong> <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">{'<EventsList departmentId={1} />'}</code></p>
            <p className="mt-4 text-sm">
              💡 Check <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">EVENTS_COMPONENTS_GUIDE.md</code> for complete documentation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
