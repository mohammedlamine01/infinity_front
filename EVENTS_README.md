# 🎉 Events Display Components - README

## 🚀 Quick Start

```jsx
import { EventsList } from '@/components/Events';

// Display all events
<EventsList />

// Display 6 events
<EventsList limit={6} />

// Display department events
<EventsList departmentId={1} />
```

## 📍 Pages to Visit

- **Public Events:** http://localhost:3000/events
- **Events Showcase:** http://localhost:3000/events-showcase
- **Dashboard (Admin):** http://localhost:3000/dashboard/events

## 📦 What's Included

### Components
- `EventsList` - Fetches and displays events
- `EventCard` - Individual event card

### Pages
- `/events` - Public events page
- `/events-showcase` - Demo page
- `/dashboard/events` - Admin page

## 🧪 Test Your API

```bash
# Create an event
POST http://localhost:8000/api/auth/events
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN

{
  "name": "Test Event",
  "type": "seminar",
  "date": "2025-11-01",
  "location": "Main Hall",
  "time": "10:00 AM",
  "description": "Event description",
  "id_dep": 1,
  "image": ""
}
```

## 📚 Documentation

- `EVENTS_QUICK_START.md` - Quick start guide
- `EVENTS_COMPONENTS_GUIDE.md` - Technical documentation
- `EVENTS_COMPLETE_SUMMARY.md` - Complete overview
- `test-events.js` - Test script for creating sample events

## ✨ Features

- ✅ Responsive design
- ✅ Dark mode
- ✅ Loading states
- ✅ Error handling
- ✅ Image support
- ✅ Type badges
- ✅ Status badges
- ✅ Hover animations

## 🎯 Event Types

- `seminar` - Blue badge
- `workshop` - Green badge
- `conference` - Purple badge
- `competition` - Orange badge
- `meeting` - Gray badge

## 🔧 Installation

Components are already created! Just use them:

```jsx
import { EventsList, EventCard } from '@/components/Events';
```

## 💡 Usage Examples

### Homepage - Featured Events
```jsx
<section className="py-16">
  <h2>Upcoming Events</h2>
  <EventsList limit={3} />
</section>
```

### Department Page
```jsx
<section>
  <h2>Department Events</h2>
  <EventsList departmentId={departmentId} />
</section>
```

### All Events
```jsx
<section>
  <h1>All Events</h1>
  <EventsList />
</section>
```

## 🎨 Customization

### Change colors
Edit `src/components/Events/EventCard.jsx` → `getEventTypeColor()`

### Change layout
Edit `src/components/Events/EventsList.jsx` → grid classes

## 🐛 Troubleshooting

**Events not showing?**
1. Check backend: http://localhost:8000/api/events
2. Check browser console for errors
3. Verify API_URL in `.env.local`

**Images not loading?**
1. Run: `php artisan storage:link`
2. Check image paths in database

**CORS errors?**
Update Laravel `config/cors.php`:
```php
'allowed_origins' => ['http://localhost:3000'],
```

## 📞 Need Help?

Check the detailed documentation files:
- Quick start guide
- Technical documentation
- Complete summary

---

**That's it! You're ready to display events! 🚀**
