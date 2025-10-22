'use client';

import { useEffect, useState } from 'react';
import { eventsAPI, imagesAPI } from '@/utils/api';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, X, Calendar, MapPin } from 'lucide-react';
import EventForm from '@/components/Dashboard/EventForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/i18n';

export default function EventsPage() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await eventsAPI.getAll();
      // Ensure data is an array
      const eventsData = Array.isArray(data) ? data : (data?.events || []);
      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error(t('failedToLoad') + ' ' + t('events').toLowerCase());
      setEvents([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedEvent(null);
    setShowModal(true);
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await eventsAPI.delete(id);
      toast.success(t('eventDeleted'));
      fetchEvents();
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error(error.response?.data?.message || t('failedToDelete'));
    }
  };

  const handleFormSuccess = () => {
    setShowModal(false);
    fetchEvents();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('events')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t('manageAllEvents')}
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          {t('addEvent')}
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white dark:bg-gray-900 rounded-xl h-80"></div>
            </div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-xl">
          <p className="text-gray-500 dark:text-gray-400">{t('noEventsFound')}</p>
          <button
            onClick={handleCreate}
            className="mt-4 text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            {t('createFirstEvent')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
            >
              {event.image && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={imagesAPI.getUrl(event.image)}
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {event.name}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                </div>

                {event.description && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                    {t('edit')}
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(event.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    {t('delete')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedEvent ? 'Edit Event' : 'Create Event'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <EventForm
              event={selectedEvent}
              onSuccess={handleFormSuccess}
              onCancel={() => setShowModal(false)}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Confirm Delete
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this event? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
