# API Integration Complete ✅

This document outlines the complete API integration for your Next.js frontend with the Laravel 11 REST API.

## Base Configuration

**API Base URL:** `https://infinity-club.onrender.com/api`
**Environment:** `.env.local` file with `NEXT_PUBLIC_API_URL`

## Features Implemented

### 1. ✅ Authentication System
- **Login**: `/login` - JWT token-based authentication
- **Register**: `/register` - New user registration with optional specialties
- **Logout**: Automatic token cleanup
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Role-Based Access**: Admin and visitor roles

**Key Files:**
- `/src/utils/auth.js` - Authentication functions
- `/src/utils/api.js` - API client with axios and interceptors
- `/src/contexts/AuthContext.jsx` - Auth state management
- `/src/utils/withProtectedRoute.jsx` - Protected route wrappers

### 2. ✅ User Management
- **Dashboard**: `/dashboard` - User profile and overview
- **Profile**: `/profile` - View/edit user information
- **Authentication**: JWT token stored in localStorage
- **Auto-login**: After registration if token provided

### 3. ✅ Departments & Specialties
- **Browse Departments**: `/departments` - List all departments
- **Department Details**: `/departments/[id]` - View specialties by department
- **Browse Specialties**: `/specialties` - List all specialties
- **Specialty Details**: `/specialties/[id]` - View members by specialty

**API Endpoints Used:**
- `GET /api/departments` - List all departments
- `GET /api/departments/{id}` - Get single department
- `GET /api/departments/{id}/specialites` - Get specialties for department
- `GET /api/specialites` - List all specialties
- `GET /api/specialites/{id}` - Get single specialty
- `GET /api/specialites/{id}/users` - Get users in specialty

### 4. ✅ Events Management
- **Events Page**: `/events` - View all events with filters
- **Filtering**: By date (all, upcoming, past)
- **Event Details**: Title, description, date, location
- **Admin Management**: `/admin/events` - Create/edit/delete events

**API Endpoints Used:**
- `GET /api/events` - List all events
- `GET /api/events/{id}` - Get single event
- `POST /api/auth/events` - Create event (admin only)
- `PUT /api/auth/events/{id}` - Update event (admin only)
- `DELETE /api/auth/events/{id}` - Delete event (admin only)

### 5. ✅ Links Management (Protected)
- **Links Page**: `/links` - View/manage personal links
- **Add Link**: Create new link (title + URL)
- **Edit Link**: Update existing links
- **Delete Link**: Remove links

**API Endpoints Used:**
- `GET /api/links/{userId}` - Get user's links
- `POST /api/links` - Create link (auth required)
- `PUT /api/links/{linkId}` - Update link (auth required)
- `DELETE /api/links/{linkId}` - Delete link (auth required)

### 6. ✅ Admin Dashboard (Admin Only)
- **Dashboard**: `/admin` - Admin control center
- **Department Management**: `/admin/departments` - CRUD operations
- **Specialty Management**: `/admin/specialties` - CRUD operations
- **Event Management**: `/admin/events` - CRUD operations
- **User Management**: `/admin/users` - View and manage users

**Access Control:**
- Only users with `role: 'admin'` can access
- Auto-redirect to `/dashboard` for non-admin users

## API Client Architecture

### Axios Instance (`/src/utils/api.js`)
```javascript
// Auto-attaches Bearer token to all requests
// Handles 401 errors automatically
// Includes response interceptors for error handling
```

### Auth Functions (`/src/utils/auth.js`)
```javascript
loginUser(email, password)         // Login and save token
registerUser(formData)             // Register new user
logoutUser()                       // Logout and clear token
getCurrentUser()                   // Get cached user data
getUserRole()                      // Get user role
isAdmin()                          // Check if user is admin
fetchCurrentUser()                 // Fetch fresh user data from API
updateUserProfile(id, userData)    // Update user profile
```

### Protected Routes (`/src/utils/withProtectedRoute.jsx`)
```javascript
withProtectedRoute(Component)   // Requires authentication
withAdminRoute(Component)       // Requires admin role
```

## Token Management

**Token Storage:** `localStorage`
- `token` - JWT access token
- `user` - User object (JSON)
- `userRole` - User role string

**Token Usage:**
```javascript
// Automatically added to all API requests
Authorization: Bearer {token}
```

## Response Handling

### Success Response
```javascript
{
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin",
      "bio": "User bio",
      "phone": "+1234567890"
    },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  }
}
```

### Error Response
```javascript
{
  "message": "Error message",
  "errors": {
    "field": ["validation error"]
  }
}
```

## Page Navigation Map

```
/                          - Home page
├── /login                 - Login page
├── /register              - Registration page
├── /dashboard             - User dashboard (protected)
├── /profile               - User profile (protected)
├── /departments           - Browse departments
│   └── /departments/[id]  - Department details
├── /specialties           - Browse specialties
│   └── /specialties/[id]  - Specialty details & members
├── /events                - View events
└── /links                 - Manage links (protected)

/admin                      - Admin dashboard (admin only)
├── /admin/departments     - Manage departments (admin only)
├── /admin/specialties     - Manage specialties (admin only)
├── /admin/events          - Manage events (admin only)
└── /admin/users           - Manage users (admin only)
```

## Environment Variables

```env
NEXT_PUBLIC_API_URL=https://infinity-club.onrender.com/api
NEXT_PUBLIC_APP_NAME=Infinity Club
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Component Structure

### Key Components Used
- `Card` - Display information
- `Dialog` - Modal forms
- `Button` - Actions
- `Input` - Form inputs
- `Label` - Form labels
- `Avatar` - User profile pictures
- UI Icons (Lucide React)

### Layout Components
- `Navbar` - Navigation (check if updated with new links)
- `Footer` - Footer content
- `Loading spinners` - For async operations

## Error Handling

All pages include:
- Loading states with spinners
- Error toasts with messages
- Graceful fallbacks
- Redirect on 401 (unauthorized)

## Next Steps / Recommendations

1. **Update Navbar** - Add links to:
   - `/departments`
   - `/specialties`
   - `/events`
   - `/links` (if authenticated)
   - `/admin` (if admin user)

2. **Add User Profile Page** - If not already done:
   - Display user information
   - Edit profile functionality
   - Change password
   - Update avatar

3. **Add Search** - Enhance with search across:
   - Departments
   - Specialties
   - Users
   - Events

4. **Notifications** - Add user notifications for:
   - New events
   - Profile updates
   - Messages

5. **Email Verification** - If needed:
   - Send verification email on registration
   - Verify email before allowing login

## Testing the Integration

### Test Authentication
```bash
1. Go to /register and create an account
2. Login with credentials
3. Check localStorage for token
4. Navigate to /dashboard
5. Try /admin (should redirect if not admin)
```

### Test API Endpoints
```bash
1. Browse /departments
2. Click on department to see specialties
3. Click on specialty to see members
4. View events on /events page
5. Try creating a link on /links
```

### Test Admin Features
```bash
1. Login as admin user
2. Go to /admin
3. Try creating/editing/deleting departments
4. Try managing specialties, events, and users
```

## Troubleshooting

### 401 Unauthorized
- Check if token is in localStorage
- Token might be expired
- Try logging out and logging back in

### CORS Issues
- Check if API has CORS enabled
- API should allow requests from localhost:3000

### Data Not Loading
- Check browser console for error messages
- Verify API URL in .env.local
- Check API endpoints return correct data format

### Admin Features Not Showing
- Verify user role is 'admin'
- Check localStorage for 'userRole'
- Refresh page after login

## API Response Notes

The API might return data in different formats:
- `response.data.data` - Data array/object
- `response.data` - Direct data

Both formats are handled with: `data.data || data || []`

---

**Version:** 1.0
**Last Updated:** May 7, 2026
**Status:** ✅ Complete and Functional
