'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { specialitesAPI, departmentsAPI } from '@/utils/api';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, Plus, Edit2, Trash2, ArrowLeft } from 'lucide-react';

export default function AdminSpecialtiesPage() {
  const router = useRouter();
  const { isAuth, user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const [specialties, setSpecialties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSpec, setEditingSpec] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', id_dep: '' });

  useEffect(() => {
    if (!authLoading && (!isAuth || user?.role !== 'admin')) {
      router.push('/dashboard');
      return;
    }
    
    fetchData();
  }, [isAuth, user, authLoading, router]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [specRes, deptRes] = await Promise.all([
        specialitesAPI.getAll(),
        departmentsAPI.getAll(),
      ]);
      setSpecialties(specRes.data.data || specRes.data || []);
      setDepartments(deptRes.data.data || deptRes.data || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddSpecialty = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in the name',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (editingSpec) {
        await specialitesAPI.update(editingSpec.id, formData);
        toast({ title: 'Success', description: 'Specialty updated' });
      } else {
        await specialitesAPI.create(formData);
        toast({ title: 'Success', description: 'Specialty created' });
      }
      
      setFormData({ name: '', description: '', id_dep: '' });
      setEditingSpec(null);
      setIsDialogOpen(false);
      fetchData();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to save',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this specialty?')) return;
    try {
      await specialitesAPI.delete(id);
      toast({ title: 'Success', description: 'Specialty deleted' });
      fetchData();
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
        <h1 className="text-4xl font-bold mb-2">Manage Specialties</h1>
        <p className="text-muted-foreground mb-6">Create and manage specialties</p>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mb-6">
              <Plus className="w-4 h-4 mr-2" /> New Specialty
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingSpec ? 'Edit' : 'Create'} Specialty</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddSpecialty} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Specialty name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dept">Department</Label>
                <select
                  id="dept"
                  value={formData.id_dep}
                  onChange={(e) => setFormData({ ...formData, id_dep: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select department</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name || d.nom}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingSpec ? 'Update' : 'Create'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 gap-4">
          {specialties.map((spec) => (
            <Card key={spec.id}>
              <CardContent className="pt-6 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{spec.name || spec.nom}</h3>
                  {spec.description && <p className="text-sm text-muted-foreground">{spec.description}</p>}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => {
                    setEditingSpec(spec);
                    setFormData({ name: spec.name || spec.nom, description: spec.description || '', id_dep: spec.id_dep || '' });
                    setIsDialogOpen(true);
                  }}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(spec.id)}>
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
