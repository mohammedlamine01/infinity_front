'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { eventsAPI } from '@/utils/api';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, Plus, Edit2, Trash2, ArrowLeft } from 'lucide-react';

export default function AdminEventsPage() {
  const router = useRouter();
  const { isAuth, user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', date: '', location: '' });

  useEffect(() => {
    if (!authLoading && (!isAuth || user?.role !== 'admin')) {
      router.push('/dashboard');
      return;
    }
    fetchEvents();
  }, [isAuth, user, authLoading, router]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventsAPI.getAll();
      setEvents(response.data.data || response.data || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load events',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in the title',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (editingEvent) {
        await eventsAPI.update(editingEvent.id, formData);
        toast({ title: 'Success', description: 'Event updated' });
      } else {
        await eventsAPI.create(formData);
        toast({ title: 'Success', description: 'Event created' });
      }
      
      setFormData({ title: '', description: '', date: '', location: '' });
      setEditingEvent(null);
      setIsDialogOpen(false);
      fetchEvents();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save event',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await eventsAPI.delete(id);
      toast({ title: 'Success', description: 'Event deleted' });
      fetchEvents();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-hero" />
      </div>
    );
  }

  if (!isAuth || user?.role !== 'admin') return null;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <h1 className="text-4xl font-bold mb-2">Manage Events</h1>
        <p className="text-muted-foreground mb-6">Create and manage events</p>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mb-6">
              <Plus className="w-4 h-4 mr-2" /> New Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingEvent ? 'Edit' : 'Create'} Event</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  placeholder="Event title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Event description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="datetime-local"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Event location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingEvent ? 'Update' : 'Create'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 gap-4">
          {events.map((event) => (
            <Card key={event.id}>
              <CardContent className="pt-6 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold">{event.title}</h3>
                  {event.description && <p className="text-sm text-muted-foreground">{event.description}</p>}
                  {event.date && <p className="text-xs text-muted-foreground mt-1">{new Date(event.date).toLocaleString()}</p>}
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="ghost" size="sm" onClick={() => {
                    setEditingEvent(event);
                    setFormData({ 
                      title: event.title, 
                      description: event.description || '', 
                      date: event.date || '',
                      location: event.location || ''
                    });
                    setIsDialogOpen(true);
                  }}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(event.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
