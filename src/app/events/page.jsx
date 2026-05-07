'use client';

import { useState, useEffect } from 'react';
import { eventsAPI } from '@/utils/api';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Loader2 } from 'lucide-react';

export default function EventsPage() {
  const { toast } = useToast();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, upcoming, past

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventsAPI.getAll();
      const allEvents = response.data.data || response.data || [];
      setEvents(allEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: 'Error',
        description: 'Failed to load events',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = (eventsToFilter) => {
    if (filter === 'all') return eventsToFilter;
    
    const now = new Date();
    return eventsToFilter.filter((event) => {
      if (!event.date) return false;
      const eventDate = new Date(event.date);
      return filter === 'upcoming' ? eventDate > now : eventDate <= now;
    });
  };

  const filteredEvents = filterEvents(events);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Calendar className="w-12 h-12 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold">Events</h1>
            </div>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Discover upcoming seminars, workshops, conferences, and more at Infinity Club
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filters</h2>
          <div className="flex gap-2 flex-wrap">
            {['all', 'upcoming', 'past'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === type
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Events List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : filteredEvents.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-muted-foreground">No {filter === 'all' ? '' : filter} events found</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                {event.image && (
                  <div className="h-40 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                    <Calendar className="w-12 h-12 text-white opacity-50" />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {event.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{event.description}</p>
                  )}
                  
                  <div className="space-y-2">
                    {event.date && (
                      <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                        <Clock className="w-4 h-4 mr-2" />
                        {new Date(event.date).toLocaleString()}
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                    )}
                  </div>
                  
                  <Button className="w-full mt-4">Learn More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Want to Host an Event?</h2>
          <p className="text-xl text-indigo-100 mb-6 max-w-2xl mx-auto">
            Join us in creating amazing experiences for our community
          </p>
          <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors shadow-lg">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
