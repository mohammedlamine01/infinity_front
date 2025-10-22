# Event Form 400 Error - Fixed ✅

## Problem
The API was returning `400 Bad Request` when trying to create/update events because the form data didn't match the backend expectations.

## What Was Fixed

### 1. Changed Field Name
**Before:** `id_dp` (incorrect)  
**After:** `id_dep` (correct - matches your API)

### 2. Added Missing Fields
- ✅ `type` field (seminar, workshop, conference, competition, meeting)
- ✅ `time` field (optional time for the event)

### 3. Fixed Data Submission
The form now sends properly formatted data:

```javascript
const submitData = {
  name: formData.name,
  type: formData.type,           // NEW: Event type
  description: formData.description || '',
  date: formData.date,
  location: formData.location,
  time: formData.time || '',     // NEW: Event time
  id_dep: parseInt(formData.id_dep), // FIXED: Correct field name + number format
  image: formData.image || '',
};
```

### 4. Added Debug Logging
The form now logs data before submission to help troubleshoot:

```javascript
console.log('Submitting event data:', submitData);
console.log('Error response:', error.response?.data);
```

### 5. Form Fields Updated
The form now includes:
- ✅ Event Name (text input)
- ✅ **Event Type (dropdown)** - NEW!
- ✅ Description (textarea)
- ✅ Date (date picker)
- ✅ **Time (time picker)** - NEW!
- ✅ Location (text input)
- ✅ Department (dropdown)
- ✅ Image (file upload)

## Event Types Available

The form now has a dropdown for event types:
- Seminar (default)
- Workshop
- Conference
- Competition
- Meeting

## Expected API Format

Your backend should now receive:

```json
{
  "name": "AI Workshop",
  "type": "workshop",
  "description": "Learn AI basics",
  "date": "2025-11-01",
  "location": "Computer Lab",
  "time": "14:00",
  "id_dep": 1,
  "image": ""
}
```

## Test It Now

1. Go to: http://localhost:3000/dashboard/events
2. Click "Add Event"
3. Fill out the form:
   - Name: Test Event
   - Type: Select from dropdown
   - Date: Pick a date
   - Time: Pick a time (optional)
   - Location: Enter location
   - Department: Select from dropdown
4. Click "Create Event"

## If You Still Get Errors

Check the browser console for:
1. **"Submitting event data:"** - Shows what's being sent
2. **"Error response:"** - Shows what the backend returns

Common issues:
- ❌ Department not selected (make sure departments are loading)
- ❌ Date format wrong (should be YYYY-MM-DD)
- ❌ Backend expects different field names

## Verify Your Backend

Make sure your Laravel controller accepts these fields:

```php
// EventController.php
public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string',
        'type' => 'required|string',
        'description' => 'nullable|string',
        'date' => 'required|date',
        'location' => 'required|string',
        'time' => 'nullable|string',
        'id_dep' => 'required|integer',
        'image' => 'nullable|string',
    ]);

    $event = Event::create($validated);
    return response()->json($event, 201);
}
```

## Success! 🎉

The form should now work correctly and create events without 400 errors!
