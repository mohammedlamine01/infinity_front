# 🎉 Events Display Components - Quick Start Guide

## ✅ What's Been Created

### Components
1. **EventsList** - Main component to fetch and display all events
   - Location: `src/components/Events/EventsList.jsx`
   - Features: Loading states, error handling, filtering, sorting

2. **EventCard** - Beautiful card component for individual events
   - Location: `src/components/Events/EventCard.jsx`
   - Features: Image display, badges, hover effects, dark mode

### Pages
1. **Public Events Page** - Full events page with filters
   - URL: `/events`
   - Location: `src/app/events/page.jsx`

2. **Events Showcase** - Demo page showing all component variations
   - URL: `/events-showcase`
   - Location: `src/app/events-showcase/page.jsx`

3. **Dashboard Events** (Already existed)
   - URL: `/dashboard/events`
   - Location: `src/app/dashboard/events/page.jsx`

---

## 🚀 How to Test

### 1. Start Your Servers

```powershell
# Terminal 1 - Backend (Laravel)
cd infinity_club-
php artisan serve

# Terminal 2 - Frontend (Next.js)
cd infinity_front
npm run dev
```

### 2. Create Test Events via API

```bash
# Using curl or Postman
POST http://localhost:8000/api/auth/events
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN

{
  "name": "AI & Machine Learning Seminar",
  "type": "seminar",
  "date": "2025-11-15",
  "location": "Main Auditorium",
  "time": "10:00 AM",
  "description": "Learn about the latest advances in AI and machine learning",
  "id_dep": 1,
  "image": ""
}
```

### 3. View Your Events

Open your browser and visit:
- **All Events:** http://localhost:3000/events
- **Showcase Demo:** http://localhost:3000/events-showcase
- **Dashboard (Admin):** http://localhost:3000/dashboard/events

---

## 💡 Usage Examples

### Display All Events
```jsx
import { EventsList } from '@/components/Events';

<EventsList />
```

### Display Limited Number of Events
```jsx
import { EventsList } from '@/components/Events';

// Show only 3 events
<EventsList limit={3} />
```

### Display Department Specific Events
```jsx
import { EventsList } from '@/components/Events';

// Show events for department with id_dep = 1
<EventsList departmentId={1} />
```

### Use Individual Event Card
```jsx
import { EventCard } from '@/components/Events';

const event = {
  id: 1,
  name: "Tech Conference 2025",
  type: "conference",
  date: "2025-12-01",
  location: "Tech Hub",
  description: "Annual tech conference",
  image: "event.jpg",
  id_dep: 1
};

<EventCard event={event} />
```

---

## 🎨 Features

### EventsList Component
- ✅ Automatic API fetching
- ✅ Loading skeleton screens
- ✅ Error handling with retry
- ✅ Empty state messaging
- ✅ Sort by date (newest first)
- ✅ Filter by department
- ✅ Limit results
- ✅ Responsive grid layout
- ✅ Dark mode support

### EventCard Component
- ✅ Event image or placeholder
- ✅ Type badges (color-coded)
- ✅ Status badges (Upcoming/Past)
- ✅ Date formatting
- ✅ Location display
- ✅ Time display
- ✅ Department info
- ✅ Description truncation
- ✅ Hover animations
- ✅ Dark mode support

---

## 🔧 API Integration

The components automatically connect to your Laravel backend:

### API Endpoints Used
```javascript
// Get all events (public)
GET /api/events

// Get single event (public)
GET /api/events/{id}

// Create event (requires auth)
POST /api/auth/events

// Update event (requires auth)
PUT /api/auth/events/{id}

// Delete event (requires auth)
DELETE /api/auth/events/{id}
```

### Expected Event Data Structure
```javascript
{
  id: 8245864306,
  name: "Event Name",
  type: "seminar", // seminar, workshop, conference, competition, meeting
  date: "2025-10-30",
  location: "Main Hall",
  time: "10:00 AM", // optional
  description: "Event description",
  id_dep: 1,
  department_name: "Department Name", // optional, if joined
  image: "events/image.jpg" // optional
}
```

---

## 🎯 Where to Use

### 1. Homepage - Featured Events
```jsx
// src/app/page.jsx
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

### 2. Department Page
```jsx
// src/app/department/[id]/page.jsx
import { EventsList } from '@/components/Events';

export default function DepartmentPage({ params }) {
  return (
    <section>
      <h2>Department Events</h2>
      <EventsList departmentId={params.id} />
    </section>
  );
}
```

### 3. Events Archive Page
```jsx
// src/app/events/page.jsx
import { EventsList } from '@/components/Events';

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">All Events</h1>
      <EventsList />
    </div>
  );
}
```

---

## 🎨 Customization

### Change Event Type Colors
Edit `src/components/Events/EventCard.jsx`:

```javascript
const getEventTypeColor = (type) => {
  const colors = {
    seminar: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    workshop: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    conference: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    // Add your custom types here
  };
  return colors[type?.toLowerCase()] || colors.default;
};
```

### Modify Grid Layout
Change the grid classes in EventsList:

```jsx
// 3 columns on large screens
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// 4 columns on large screens
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

---

## 📝 Testing Checklist

- [ ] Backend server running (port 8000)
- [ ] Frontend server running (port 3000)
- [ ] Created test events via API
- [ ] Visited `/events` page
- [ ] Visited `/events-showcase` page
- [ ] Tested responsive design (mobile/desktop)
- [ ] Tested dark mode
- [ ] Tested empty state (no events)
- [ ] Tested loading state
- [ ] Tested error state (stop backend)

---

## 🐛 Troubleshooting

### Events Not Showing
1. Check if backend is running: `http://localhost:8000/api/events`
2. Open browser console for errors
3. Verify API_URL in `.env.local`
4. Check if events exist in database

### Images Not Loading
1. Check image path format
2. Verify storage folder permissions
3. Check `imagesAPI.getUrl()` function in `utils/api.js`

### CORS Issues
Add to Laravel backend `config/cors.php`:
```php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:3000'],
```

---

## 📦 Required Dependencies

Make sure these are installed:

```bash
npm install lucide-react sonner axios
```

---

## 🎓 Next Steps

1. **Add Event Details Page**
   - Create `src/app/events/[id]/page.jsx`
   - Show full event information

2. **Add Event Registration**
   - Create registration form
   - Track attendees

3. **Add Calendar View**
   - Use a calendar library
   - Show events on calendar

4. **Add Search & Advanced Filters**
   - Search by name/description
   - Filter by date range, location, type

5. **Add Event Categories/Tags**
   - Extend backend model
   - Add category filter

---

## 📚 Documentation Files

- `EVENTS_COMPONENTS_GUIDE.md` - Detailed technical documentation
- `EVENTS_QUICK_START.md` - This file

---

## 🎉 Success!

You now have a complete events display system with:
- ✅ Reusable components
- ✅ API integration
- ✅ Multiple page examples
- ✅ Beautiful UI with animations
- ✅ Dark mode support
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states

**Need help?** Check the component files for inline comments and examples!
