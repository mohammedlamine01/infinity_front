'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { linksAPI } from '@/utils/api';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';

export default function LinksPage() {
  const router = useRouter();
  const { isAuth, user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [formData, setFormData] = useState({ title: '', url: '' });

  useEffect(() => {
    if (!authLoading && !isAuth) {
      router.push('/login');
      return;
    }
    
    if (user?.id) {
      fetchLinks();
    }
  }, [isAuth, user, authLoading, router]);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const response = await linksAPI.getByUser(user.id);
      setLinks(response.data.data || response.data || []);
    } catch (error) {
      console.error('Error fetching links:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your links',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddLink = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.url.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (editingLink) {
        await linksAPI.update(editingLink.id, formData);
        toast({
          title: 'Success',
          description: 'Link updated successfully',
        });
      } else {
        await linksAPI.create(formData);
        toast({
          title: 'Success',
          description: 'Link created successfully',
        });
      }
      
      setFormData({ title: '', url: '' });
      setEditingLink(null);
      setIsDialogOpen(false);
      fetchLinks();
    } catch (error) {
      console.error('Error saving link:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to save link',
        variant: 'destructive',
      });
    }
  };

  const handleEditLink = (link) => {
    setEditingLink(link);
    setFormData({ title: link.title, url: link.url });
    setIsDialogOpen(true);
  };

  const handleDeleteLink = async (linkId) => {
    if (!window.confirm('Are you sure you want to delete this link?')) return;

    try {
      await linksAPI.delete(linkId);
      toast({
        title: 'Success',
        description: 'Link deleted successfully',
      });
      fetchLinks();
    } catch (error) {
      console.error('Error deleting link:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete link',
        variant: 'destructive',
      });
    }
  };

  const handleOpenDialog = () => {
    setFormData({ title: '', url: '' });
    setEditingLink(null);
    setIsDialogOpen(true);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-hero" />
      </div>
    );
  }

  if (!isAuth) {
    return null;
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-muted/50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Links</h1>
          <p className="text-muted-foreground">Manage your personal links and social profiles</p>
        </div>

        {/* Add Link Button */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenDialog} className="mb-6">
              <Plus className="w-4 h-4 mr-2" />
              Add New Link
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingLink ? 'Edit Link' : 'Add New Link'}</DialogTitle>
              <DialogDescription>
                {editingLink ? 'Update your link details' : 'Add a new link to your profile'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddLink} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Link Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., My Portfolio"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingLink(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingLink ? 'Update Link' : 'Add Link'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Links List */}
        {links.length === 0 ? (
          <Card className="text-center p-8">
            <p className="text-muted-foreground mb-4">You haven't added any links yet</p>
            <Button onClick={handleOpenDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Link
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {links.map((link) => (
              <Card key={link.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{link.title}</h3>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-hero hover:underline flex items-center"
                      >
                        {link.url}
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </a>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditLink(link)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteLink(link.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
