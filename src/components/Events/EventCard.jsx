'use client';

import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { imagesAPI } from '@/utils/api';

export default function EventCard({ event }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getEventTypeColor = (type) => {
    const colors = {
      seminar: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      workshop: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      conference: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      competition: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      meeting: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
      default: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    };
    return colors[type?.toLowerCase()] || colors.default;
  };

  const isUpcoming = (dateString) => {
    return new Date(dateString) > new Date();
  };

  const isPast = (dateString) => {
    return new Date(dateString) < new Date();
  };

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600">
        {event.image ? (
          <img
            src={imagesAPI.getUrl(event.image)}
            alt={event.name || 'Event'}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Calendar className="w-16 h-16 text-white/50" />
          </div>
        )}
        
        {/* Event Type Badge */}
        {event.type && (
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getEventTypeColor(event.type)}`}>
              {event.type}
            </span>
          </div>
        )}

        {/* Status Badge */}
        {isUpcoming(event.date) && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
              Upcoming
            </span>
          </div>
        )}
        {isPast(event.date) && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-500 text-white">
              Past Event
            </span>
          </div>
        )}
      </div>

      {/* Event Details */}
      <div className="p-6">
        {/* Event Name */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {event.name || 'Untitled Event'}
        </h3>

        {/* Event Meta */}
        <div className="space-y-2 mb-4">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4 text-indigo-500 flex-shrink-0" />
            <span>{formatDate(event.date)}</span>
          </div>

          {/* Location */}
          {event.location && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          )}

          {/* Time */}
          {event.time && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span>{event.time}</span>
            </div>
          )}

          {/* Department */}
          {event.department_name && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Users className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="line-clamp-1">{event.department_name}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {event.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
            {event.description}
          </p>
        )}

        {/* Action Button */}
        <button className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg">
          View Details
        </button>
      </div>
    </div>
  );
}
