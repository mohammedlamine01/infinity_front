'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { departmentsAPI } from '@/utils/api';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, Plus, Edit2, Trash2, ArrowLeft } from 'lucide-react';

export default function AdminDepartmentsPage() {
  const router = useRouter();
  const { isAuth, user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    if (!authLoading && (!isAuth || user?.role !== 'admin')) {
      router.push('/dashboard');
      return;
    }
    
    fetchDepartments();
  }, [isAuth, user, authLoading, router]);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await departmentsAPI.getAll();
      setDepartments(response.data.data || response.data || []);
    } catch (error) {
      console.error('Error fetching departments:', error);
      toast({
        title: 'Error',
        description: 'Failed to load departments',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddDepartment = async (e) => {
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
      if (editingDept) {
        await departmentsAPI.update(editingDept.id, formData);
        toast({
          title: 'Success',
          description: 'Department updated successfully',
        });
      } else {
        await departmentsAPI.create(formData);
        toast({
          title: 'Success',
          description: 'Department created successfully',
        });
      }
      
      setFormData({ name: '', description: '' });
      setEditingDept(null);
      setIsDialogOpen(false);
      fetchDepartments();
    } catch (error) {
      console.error('Error saving department:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to save department',
        variant: 'destructive',
      });
    }
  };

  const handleEditDept = (dept) => {
    setEditingDept(dept);
    setFormData({ 
      name: dept.name || dept.nom, 
      description: dept.description || '' 
    });
    setIsDialogOpen(true);
  };

  const handleDeleteDept = async (deptId) => {
    if (!window.confirm('Are you sure you want to delete this department?')) return;

    try {
      await departmentsAPI.delete(deptId);
      toast({
        title: 'Success',
        description: 'Department deleted successfully',
      });
      fetchDepartments();
    } catch (error) {
      console.error('Error deleting department:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete department',
        variant: 'destructive',
      });
    }
  };

  const handleOpenDialog = () => {
    setFormData({ name: '', description: '' });
    setEditingDept(null);
    setIsDialogOpen(true);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-hero" />
      </div>
    );
  }

  if (!isAuth || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl font-bold mb-2">Manage Departments</h1>
          <p className="text-muted-foreground">Create, update, and delete departments</p>
        </div>

        {/* Add Department Button */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenDialog} className="mb-6">
              <Plus className="w-4 h-4 mr-2" />
              New Department
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingDept ? 'Edit Department' : 'Create Department'}</DialogTitle>
              <DialogDescription>
                {editingDept ? 'Update department details' : 'Create a new department'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddDepartment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Department Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Computer Science"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Department description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingDept(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingDept ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Departments Table */}
        {departments.length === 0 ? (
          <Card className="text-center p-8">
            <p className="text-muted-foreground mb-4">No departments yet</p>
            <Button onClick={handleOpenDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Department
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {departments.map((dept) => (
              <Card key={dept.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{dept.name || dept.nom}</h3>
                      {dept.description && (
                        <p className="text-sm text-muted-foreground">{dept.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditDept(dept)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteDept(dept.id)}
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
