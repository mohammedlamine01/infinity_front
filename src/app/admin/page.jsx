'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Users, Building2, Briefcase, Calendar } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const { isAuth, user, loading } = useAuth();

  useEffect(() => {
    if (!loading && (!isAuth || user?.role !== 'admin')) {
      router.push('/dashboard');
    }
  }, [isAuth, user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-hero" />
      </div>
    );
  }

  if (!isAuth || user?.role !== 'admin') {
    return null;
  }

  const adminSections = [
    {
      title: 'Departments',
      description: 'Manage all departments',
      icon: Building2,
      href: '/admin/departments',
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Specialties',
      description: 'Manage all specialties',
      icon: Briefcase,
      href: '/admin/specialties',
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    },
    {
      title: 'Events',
      description: 'Create and manage events',
      icon: Calendar,
      href: '/admin/events',
      color: 'bg-green-500/10 text-green-600 dark:text-green-400',
    },
    {
      title: 'Users',
      description: 'Manage user accounts and roles',
      icon: Users,
      href: '/admin/users',
      color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your Infinity Club resources</p>
        </div>

        {/* Admin Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {adminSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link key={section.href} href={section.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className={`inline-flex p-3 rounded-lg ${section.color} mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle>{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Check the documentation for managing your resources
                </p>
                <Button variant="outline">View Documentation</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  All systems operational ✓
                </p>
                <p className="text-xs text-muted-foreground">
                  Last checked: Just now
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
