# API Response Format Fix

## Problem
The error `events.map is not a function` occurs when the API returns data in a different format than expected.

## What Was Fixed

### 1. Dashboard Events Page (`src/app/dashboard/events/page.jsx`)
Added safety check to ensure `events` is always an array:

```javascript
const fetchEvents = async () => {
  try {
    const { data } = await eventsAPI.getAll();
    // Ensure data is an array
    const eventsData = Array.isArray(data) ? data : (data?.events || []);
    setEvents(eventsData);
  } catch (error) {
    console.error('Error fetching events:', error);
    toast.error(t('failedToLoad') + ' ' + t('events').toLowerCase());
    setEvents([]); // Set empty array on error
  } finally {
    setLoading(false);
  }
};
```

### 2. EventsList Component (`src/components/Events/EventsList.jsx`)
Added the same safety check:

```javascript
const fetchEvents = async () => {
  try {
    setLoading(true);
    setError(null);
    const { data } = await eventsAPI.getAll();
    
    // Ensure data is an array
    let eventsData = Array.isArray(data) ? data : (data?.events || []);
    let filteredEvents = eventsData;
    
    // ... rest of the code
    
    setEvents(filteredEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    setError(error.response?.data?.message || 'Failed to load events');
    toast.error('Failed to load events');
    setEvents([]); // Set empty array on error
  } finally {
    setLoading(false);
  }
};
```

## Why This Happens

Your Laravel API might be returning data in one of these formats:

### Format 1: Direct Array (Expected)
```json
[
  { "id": 1, "name": "Event 1", ... },
  { "id": 2, "name": "Event 2", ... }
]
```

### Format 2: Wrapped in Object
```json
{
  "events": [
    { "id": 1, "name": "Event 1", ... },
    { "id": 2, "name": "Event 2", ... }
  ]
}
```

### Format 3: Paginated Response
```json
{
  "data": [
    { "id": 1, "name": "Event 1", ... }
  ],
  "total": 10,
  "per_page": 15
}
```

## Solution Applied

The fix handles all these cases:
```javascript
const eventsData = Array.isArray(data) ? data : (data?.events || []);
```

This checks:
1. Is `data` already an array? Use it directly
2. Is `data` an object with an `events` property? Use that
3. Otherwise, use an empty array `[]`

## Check Your API Response

To see what your API actually returns, open browser console and check the network tab:

1. Open DevTools (F12)
2. Go to Network tab
3. Visit `/events` or `/dashboard/events`
4. Look for the request to `/api/events`
5. Check the response format

## If You Still Have Issues

### Check Laravel Controller

Your Laravel controller should return events like this:

**Option 1: Direct Array (Recommended)**
```php
public function index()
{
    $events = Event::all();
    return response()->json($events);
}
```

**Option 2: Wrapped Response**
```php
public function index()
{
    $events = Event::all();
    return response()->json([
        'events' => $events,
        'total' => $events->count()
    ]);
}
```

**Option 3: Resource Collection**
```php
public function index()
{
    return EventResource::collection(Event::all());
}
```

## Test Now

The pages should now work correctly:
- http://localhost:3000/events
- http://localhost:3000/events-showcase
- http://localhost:3000/dashboard/events

Even if there are no events, you'll see the "No Events Found" message instead of an error.

## Still Getting Errors?

Open browser console and add this temporarily to see what's returned:

```javascript
// In fetchEvents function, add console.log
const { data } = await eventsAPI.getAll();
console.log('API Response:', data);
console.log('Is Array?', Array.isArray(data));
console.log('Type:', typeof data);
```

Then share the console output to get more specific help!
