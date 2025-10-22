'use client';

import { useEffect, useState } from 'react';
import { useAsyncLoad } from '@/hooks/useAsyncLoad';

/**
 * Example: Dashboard with Multiple Data Sources
 * Shows loading while fetching multiple API endpoints
 */
export default function DashboardExample() {
  const { withLoadingAndProgress } = useAsyncLoad();
  const [dashboardData, setDashboardData] = useState({
    users: [],
    stats: {},
    activities: [],
    notifications: [],
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    await withLoadingAndProgress(
      async (updateProgress, updateMessage) => {
        try {
          // Fetch all data in parallel
          updateMessage('Loading dashboard data...');

          const [users, stats, activities, notifications] = await Promise.all([
            fetch('/api/users')
              .then(r => r.json())
              .finally(() => updateProgress(25)),
            
            fetch('/api/stats')
              .then(r => r.json())
              .finally(() => updateProgress(50)),
            
            fetch('/api/activities')
              .then(r => r.json())
              .finally(() => updateProgress(75)),
            
            fetch('/api/notifications')
              .then(r => r.json())
              .finally(() => updateProgress(100)),
          ]);

          setDashboardData({ users, stats, activities, notifications });
        } catch (error) {
          console.error('Failed to load dashboard:', error);
        }
      },
      { message: 'Loading dashboard...' }
    );
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-6 bg-card rounded-lg shadow">
          <h3 className="text-sm text-muted-foreground">Total Users</h3>
          <p className="text-3xl font-bold">{dashboardData.stats.totalUsers || 0}</p>
        </div>
        <div className="p-6 bg-card rounded-lg shadow">
          <h3 className="text-sm text-muted-foreground">Active Today</h3>
          <p className="text-3xl font-bold">{dashboardData.stats.activeToday || 0}</p>
        </div>
        <div className="p-6 bg-card rounded-lg shadow">
          <h3 className="text-sm text-muted-foreground">Revenue</h3>
          <p className="text-3xl font-bold">${dashboardData.stats.revenue || 0}</p>
        </div>
        <div className="p-6 bg-card rounded-lg shadow">
          <h3 className="text-sm text-muted-foreground">Orders</h3>
          <p className="text-3xl font-bold">{dashboardData.stats.orders || 0}</p>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <div className="space-y-2">
          {dashboardData.activities.map((activity, index) => (
            <div key={index} className="p-4 bg-card rounded-lg">
              <p>{activity.description}</p>
              <p className="text-sm text-muted-foreground">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <div className="space-y-2">
          {dashboardData.notifications.map((notif, index) => (
            <div key={index} className="p-4 bg-card rounded-lg">
              <p className="font-medium">{notif.title}</p>
              <p className="text-sm text-muted-foreground">{notif.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
