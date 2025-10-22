# 📝 How to Add Events to Your Existing Pages

## Example 1: Add to Homepage

**File:** `src/app/page.jsx`

```jsx
'use client';

import { EventsList } from '@/components/Events';
import { Calendar } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      {/* Your existing homepage content */}
      
      {/* Add this section anywhere on your homepage */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calendar className="w-8 h-8 text-indigo-600" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Upcoming Events
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join us for exciting seminars, workshops, and conferences
            </p>
          </div>
          
          {/* Display latest 3 events */}
          <EventsList limit={3} />
          
          <div className="text-center mt-8">
            <a 
              href="/events" 
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              View All Events
            </a>
          </div>
        </div>
      </section>
      
      {/* Rest of your homepage */}
    </div>
  );
}
```

---

## Example 2: Add to Department Page

**File:** `src/app/departments/[id]/page.jsx`

```jsx
'use client';

import { EventsList } from '@/components/Events';
import { useParams } from 'next/navigation';

export default function DepartmentPage() {
  const params = useParams();
  const departmentId = parseInt(params.id);
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Department info */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Department Name</h1>
        <p className="text-gray-600">Department description...</p>
      </div>
      
      {/* Department Events Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Department Events</h2>
        <EventsList departmentId={departmentId} />
      </div>
      
      {/* Other department content */}
    </div>
  );
}
```

---

## Example 3: Add to About Page

**File:** `src/app/about/page.jsx`

```jsx
'use client';

import { EventsList } from '@/components/Events';

export default function AboutPage() {
  return (
    <div>
      {/* About content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h1>About Infinity Club</h1>
          <p>Our story...</p>
        </div>
      </section>
      
      {/* Recent Events Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Recent Events
          </h2>
          <EventsList limit={6} />
        </div>
      </section>
    </div>
  );
}
```

---

## Example 4: Create Custom Events Section Component

**File:** `src/components/sections/EventsSection.jsx`

```jsx
'use client';

import { EventsList } from '@/components/Events';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function EventsSection({ 
  title = "Upcoming Events",
  description = "Join us for exciting events",
  limit = 3,
  departmentId = null,
  showViewAll = true 
}) {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="w-8 h-8 text-indigo-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        
        {/* Events List */}
        <EventsList limit={limit} departmentId={departmentId} />
        
        {/* View All Button */}
        {showViewAll && (
          <div className="text-center mt-12">
            <Link 
              href="/events"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-semibold"
            >
              View All Events
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
```

Then use it anywhere:

```jsx
import EventsSection from '@/components/sections/EventsSection';

// On any page
<EventsSection 
  title="Latest Events"
  description="Don't miss out on our upcoming activities"
  limit={6}
/>

// Department specific
<EventsSection 
  title="Computer Science Events"
  departmentId={1}
  limit={4}
/>
```

---

## Example 5: Add to Sidebar Widget

**File:** `src/components/widgets/UpcomingEventsWidget.jsx`

```jsx
'use client';

import { useEffect, useState } from 'react';
import { eventsAPI } from '@/utils/api';
import { Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function UpcomingEventsWidget({ limit = 3 }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await eventsAPI.getAll();
        // Get upcoming events only
        const upcoming = data
          .filter(e => new Date(e.date) > new Date())
          .slice(0, limit);
        setEvents(upcoming);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [limit]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (events.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-indigo-600" />
        Upcoming Events
      </h3>
      
      <div className="space-y-4">
        {events.map(event => (
          <Link 
            key={event.id}
            href={`/events/${event.id}`}
            className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
              {event.name}
            </h4>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              {new Date(event.date).toLocaleDateString()}
            </div>
            {event.location && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                <MapPin className="w-4 h-4" />
                {event.location}
              </div>
            )}
          </Link>
        ))}
      </div>
      
      <Link 
        href="/events"
        className="block text-center mt-4 text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium"
      >
        View All →
      </Link>
    </div>
  );
}
```

Use in sidebar:

```jsx
<aside className="w-full lg:w-1/3">
  <UpcomingEventsWidget limit={5} />
</aside>
```

---

## Example 6: Add to User Dashboard

**File:** `src/app/user/dashboard/page.jsx`

```jsx
'use client';

import { EventsList } from '@/components/Events';
import { useAuth } from '@/contexts/AuthContext';

export default function UserDashboard() {
  const { user } = useAuth();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">
        Welcome, {user?.name}!
      </h1>
      
      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Your stats cards */}
      </div>
      
      {/* Recommended Events for User's Department */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          Events in Your Department
        </h2>
        <EventsList departmentId={user?.id_dep} limit={3} />
      </div>
      
      {/* All Upcoming Events */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          Other Upcoming Events
        </h2>
        <EventsList limit={6} />
      </div>
    </div>
  );
}
```

---

## Quick Integration Checklist

- [ ] Import EventsList component
- [ ] Add section with title/description
- [ ] Insert `<EventsList />` component
- [ ] Add optional limit prop
- [ ] Add optional departmentId filter
- [ ] Style the section container
- [ ] Add "View All" link (optional)
- [ ] Test on desktop
- [ ] Test on mobile
- [ ] Test dark mode

---

## Pro Tips

### 1. Customize Grid Layout
```jsx
// Change from 3 columns to 2
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* events */}
</div>
```

### 2. Add Background
```jsx
<section className="py-16 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
  <EventsList limit={3} />
</section>
```

### 3. Center Content
```jsx
<div className="max-w-7xl mx-auto px-4">
  <EventsList limit={6} />
</div>
```

### 4. Add Animations
```jsx
<div className="animate-fade-in">
  <EventsList limit={4} />
</div>
```

---

**Ready to add events to your pages! 🚀**
