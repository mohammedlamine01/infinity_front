'use client';

import { useEffect, useState } from 'react';
import { eventsAPI, imagesAPI } from '@/utils/api';
import { toast } from 'sonner';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const CompactEventCard = ({ event }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getEventTypeColor = (type) => {
    const colors = {
      seminar: 'bg-blue-500',
      workshop: 'bg-green-500',
      conference: 'bg-purple-500',
      competition: 'bg-orange-500',
      meeting: 'bg-gray-500',
      default: 'bg-indigo-500',
    };
    return colors[type?.toLowerCase()] || colors.default;
  };

  // Dynamic font sizing based on title length
  const getTitleFontSize = (title) => {
    const length = title?.length || 0;
    if (length > 50) return 'text-xs';
    if (length > 30) return 'text-xs';
    return 'text-sm';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className="group h-[180px] w-[220px] overflow-hidden border border-border/50 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm cursor-pointer">
        {/* Event Image */}
        <div className="relative h-[80px] overflow-hidden">
          {(event.image_url || event.image_path || event.image) ? (
            <motion.img
              src={event.image_url || imagesAPI.getUrl(event.image_path || event.image)}
              alt={event.name || 'Event'}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <div className={`w-full h-full ${getEventTypeColor(event.type)} flex items-center justify-center`}>
              <Calendar className="w-6 h-6 text-white/70" />
            </div>
          )}

          {/* Event Type Indicator */}
          <motion.div
            className="absolute top-2 right-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)} shadow-sm`}></div>
          </motion.div>
        </div>

        <CardContent className="p-3 h-[100px] flex flex-col justify-between">
          {/* Event Title */}
          <motion.h3
            className={`${getTitleFontSize(event.name)} font-bold text-foreground line-clamp-2 leading-tight mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {event.name || 'Untitled Event'}
          </motion.h3>

          {/* Event Details */}
          <motion.div
            className="space-y-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Date & Time */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3 text-indigo-500 flex-shrink-0" />
              <span className="truncate">
                {formatDate(event.date)}
                {event.time && ` • ${event.time}`}
              </span>
            </div>

            {/* Location */}
            {event.location && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3 text-red-500 flex-shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function CompactEventsGrid() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gridCols, setGridCols] = useState(6);

  useEffect(() => {
    fetchEvents();
    updateGridColumns();

    const handleResize = () => updateGridColumns();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updateGridColumns = () => {
    const width = window.innerWidth;
    if (width < 640) setGridCols(2); // mobile
    else if (width < 768) setGridCols(3); // sm
    else if (width < 1024) setGridCols(4); // md
    else if (width < 1280) setGridCols(5); // lg
    else if (width < 1536) setGridCols(6); // xl
    else setGridCols(7); // 2xl
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data } = await eventsAPI.getAll();

      // Ensure data is an array
      const eventsData = Array.isArray(data) ? data : (data?.events || []);

      // Sort by date (newest first)
      eventsData.sort((a, b) => new Date(b.date) - new Date(a.date));

      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const getGridColsClass = () => {
    const cols = Math.min(gridCols, Math.ceil(events.length / 3)); // Ensure we don't have too many columns for few events
    return `grid-cols-${Math.max(2, Math.min(cols, 8))}`;
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-background overflow-hidden flex flex-col">
      {/* Header */}
      <div className="h-16 flex items-center justify-center border-b border-border/50 bg-card/50 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-indigo-600" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            All Events ({events.length})
          </h1>
        </div>
      </div>

      {/* Events Grid Container */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full p-4 overflow-hidden">
          {events.length > 0 ? (
            <motion.div
              className="h-full overflow-hidden"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              <div
                className="h-full grid gap-3 auto-rows-max overflow-hidden"
                style={{
                  gridTemplateColumns: `repeat(${Math.min(gridCols, Math.ceil(events.length / 2))}, minmax(0, 1fr))`
                }}
              >
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <CompactEventCard event={event} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">No events found</p>
                <p className="text-muted-foreground/70 text-sm mt-2">Create your first event to get started</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}