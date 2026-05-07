'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { usersAPI } from '@/utils/api';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

export default function AdminUsersPage() {
  const router = useRouter();
  const { isAuth, user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    if (!authLoading && (!isAuth || user?.role !== 'admin')) {
      router.push('/dashboard');
      return;
    }
    fetchUsers();
  }, [isAuth, user, authLoading, router]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const [allRes, pendingRes] = await Promise.all([
        usersAPI.getAll().catch(() => ({ data: { data: [] } })),
        usersAPI.getPending().catch(() => ({ data: { data: [] } })),
      ]);
      setUsers(allRes.data.data || allRes.data || []);
      setPendingUsers(pendingRes.data.data || pendingRes.data || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load users',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleValidateUser = async (userId) => {
    try {
      await usersAPI.validate(userId);
      toast({ title: 'Success', description: 'User validated' });
      fetchUsers();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to validate user',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await usersAPI.delete(userId);
      toast({ title: 'Success', description: 'User deleted' });
      fetchUsers();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete user',
        variant: 'destructive',
      });
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
        <h1 className="text-4xl font-bold mb-2">Manage Users</h1>
        <p className="text-muted-foreground mb-6">View and manage user accounts</p>

        {/* Pending Users */}
        {pendingUsers.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Pending Validation ({pendingUsers.length})</h2>
            <div className="grid grid-cols-1 gap-4">
              {pendingUsers.map((user) => (
                <Card key={user.id}>
                  <CardContent className="pt-6 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <Button size="sm" onClick={() => handleValidateUser(user.id)}>
                      <CheckCircle className="w-4 h-4 mr-2" /> Validate
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Users */}
        <div>
          <h2 className="text-2xl font-bold mb-4">All Users ({users.length})</h2>
          <div className="grid grid-cols-1 gap-4">
            {users.map((u) => (
              <Card key={u.id}>
                <CardContent className="pt-6 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold">{u.name}</h3>
                    <p className="text-sm text-muted-foreground">{u.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">Role: {u.role || 'visiteur'}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteUser(u.id)}
                  >
                    <XCircle className="w-4 h-4 text-destructive" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
