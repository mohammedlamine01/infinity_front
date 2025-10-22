# Events Components Documentation

## Components Created

### 1. EventsList Component
**Location:** `src/components/Events/EventsList.jsx`

A flexible component that fetches and displays all events from your API.

#### Props:
- `limit` (number, optional): Limit the number of events displayed
- `departmentId` (number, optional): Filter events by department

#### Features:
- Fetches events from API
- Loading state with skeleton screens
- Error handling with retry functionality
- Empty state message
- Sorting by date (newest first)
- Department filtering
- Responsive grid layout

#### Usage Examples:

```jsx
// Display all events
import { EventsList } from '@/components/Events';

<EventsList />

// Display only 6 events
<EventsList limit={6} />

// Display events for a specific department
<EventsList departmentId={1} />
```

---

### 2. EventCard Component
**Location:** `src/components/Events/EventCard.jsx`

A beautiful card component to display individual event information.

#### Props:
- `event` (object, required): Event data object

#### Features:
- Displays event image or placeholder
- Event type badge with color coding
- Status badge (Upcoming/Past)
- Event details: date, location, time, department
- Truncated description
- Hover effects and animations
- Dark mode support

#### Event Object Structure:
```javascript
{
  id: number,
  name: string,
  description: string,
  date: string, // ISO date format
  location: string,
  time: string,
  type: string, // seminar, workshop, conference, competition, meeting
  image: string, // image filename
  id_dep: number,
  department_name: string
}
```

---

### 3. Events Page
**Location:** `src/app/events/page.jsx`

A full-page component for displaying all events with filters.

#### Features:
- Hero section with gradient background
- Filter section (time period and event type)
- Events grid display
- Call-to-action section
- Fully responsive

---

## API Integration

The components use the `eventsAPI` from `@/utils/api.js`:

```javascript
import { eventsAPI } from '@/utils/api';

// Get all events
eventsAPI.getAll()

// Get single event
eventsAPI.getById(id)

// Create event (admin only)
eventsAPI.create(data)

// Update event (admin only)
eventsAPI.update(id, data)

// Delete event (admin only)
eventsAPI.delete(id)
```

---

## Using in Your Pages

### Homepage - Display Latest Events
```jsx
import { EventsList } from '@/components/Events';

export default function HomePage() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
        <EventsList limit={3} />
      </div>
    </section>
  );
}
```

### Department Page - Show Department Events
```jsx
import { EventsList } from '@/components/Events';

export default function DepartmentPage({ departmentId }) {
  return (
    <section>
      <h2>Department Events</h2>
      <EventsList departmentId={departmentId} />
    </section>
  );
}
```

### Custom Implementation
```jsx
'use client';

import { useEffect, useState } from 'react';
import { eventsAPI } from '@/utils/api';
import { EventCard } from '@/components/Events';

export default function CustomEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await eventsAPI.getAll();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
```

---

## Styling

All components use:
- Tailwind CSS for styling
- Dark mode support
- Responsive design
- Smooth animations and transitions
- Lucide icons for visual elements

---

## Testing Your API

To test with your API endpoint:

```bash
# POST request to create an event
POST http://localhost:8000/api/auth/events
Content-Type: application/json

{
  "name": "Test Seminar",
  "type": "seminar",
  "date": "2025-10-30",
  "location": "Main Hall",
  "description": "This is a test seminar event",
  "id_dep": 1,
  "image": ""
}
```

Then visit:
- **Public Events Page:** `http://localhost:3000/events`
- **Dashboard Events:** `http://localhost:3000/dashboard/events`

---

## Customization

### Change Event Type Colors
Edit the `getEventTypeColor` function in `EventCard.jsx`:

```javascript
const getEventTypeColor = (type) => {
  const colors = {
    seminar: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    // Add more types...
  };
  return colors[type?.toLowerCase()] || colors.default;
};
```

### Modify Card Design
The `EventCard` component can be customized by editing the JSX structure and Tailwind classes.

### Add More Filters
Update the `EventsPage` component to add more filtering options.

---

## Dependencies Required

Make sure you have these packages installed:

```bash
npm install lucide-react sonner
```

If not installed, run:
```bash
npm install lucide-react sonner axios
```

---

## File Structure

```
src/
├── components/
│   └── Events/
│       ├── EventsList.jsx      # Main list component
│       ├── EventCard.jsx       # Individual card component
│       └── index.js            # Exports
├── app/
│   ├── events/
│   │   └── page.jsx           # Public events page
│   └── dashboard/
│       └── events/
│           └── page.jsx       # Dashboard events (admin)
└── utils/
    └── api.js                  # API configuration
```
