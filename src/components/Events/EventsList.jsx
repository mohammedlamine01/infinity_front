'use client';

import { useEffect, useState } from 'react';
import { eventsAPI } from '@/utils/api';
import { toast } from 'sonner';
import EventCard from './EventCard';
import { Calendar, AlertCircle } from 'lucide-react';

export default function EventsList({ limit = null, departmentId = null }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [departmentId]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await eventsAPI.getAll();
      
      // Ensure data is an array
      let eventsData = Array.isArray(data) ? data : (data?.events || []);
      let filteredEvents = eventsData;
      
      // Filter by department if specified
      if (departmentId) {
        filteredEvents = eventsData.filter(event => event.id_dep === departmentId);
      }
      
      // Sort by date (newest first)
      filteredEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      // Limit results if specified
      if (limit) {
        filteredEvents = filteredEvents.slice(0, limit);
      }
      
      setEvents(filteredEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError(error.response?.data?.message || 'Failed to load events');
      toast.error('Failed to load events');
      setEvents([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-800 rounded-xl h-96"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-800">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
          Error Loading Events
        </h3>
        <p className="text-red-700 dark:text-red-300">{error}</p>
        <button
          onClick={fetchEvents}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No Events Found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          There are no events available at the moment. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
