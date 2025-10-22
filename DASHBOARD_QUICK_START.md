# 🚀 Infinity Club Frontend - Quick Start Guide

## What's Been Built

A complete **Admin Dashboard** for Infinity Club with full CRUD operations for departments, specialites, and events. The system includes:

✅ **Complete API Integration** - All Laravel backend endpoints connected  
✅ **Admin Dashboard** - Full CRUD with beautiful UI  
✅ **Authentication** - JWT-based login/logout  
✅ **Dark Mode** - Theme toggle  
✅ **Responsive Design** - Works on all devices  
✅ **Toast Notifications** - User feedback for all actions  
✅ **Image Upload** - For events  
✅ **Search & Filter** - For users  

---

## 🏃‍♂️ Run the Project

### 1. Start Backend (Laravel)
```bash
cd infinity_club-
php artisan serve
# Backend runs on http://localhost:8000
```

### 2. Start Frontend (Next.js)
```bash
cd infinity_front
npm run dev
# Frontend runs on http://localhost:3000
```

### 3. Login as Admin
- Go to: `http://localhost:3000/login`
- Use admin credentials from your database
- You'll be redirected to: `http://localhost:3000/dashboard`

---

## 🎯 Admin Dashboard Features

### Dashboard Overview (`/dashboard`)
- Statistics cards showing counts of departments, specialites, events, and users
- Quick action buttons
- Recent activity feed

### Departments (`/dashboard/departments`)
- View all departments in card grid
- ➕ **Create**: Click "Add Department" button
- ✏️ **Edit**: Click "Edit" on any department card
- 🗑️ **Delete**: Click "Delete" with confirmation modal
- Fields: Name, Description

### Specialites (`/dashboard/specialites`)
- View all specialites in card grid
- ➕ **Create**: Click "Add Specialite" button
- ✏️ **Edit**: Click "Edit" on any specialite card
- 🗑️ **Delete**: Click "Delete" with confirmation modal
- Fields: Name, Description, Department (dropdown)

### Events (`/dashboard/events`)
- View all events in card grid with images
- ➕ **Create**: Click "Add Event" button
- ✏️ **Edit**: Click "Edit" on any event card
- 🗑️ **Delete**: Click "Delete" with confirmation modal
- Fields: Name, Description, Date, Location, Department (dropdown), Image (upload)

### Users (`/dashboard/users`)
- View all users in card grid
- 🔍 **Search**: Real-time search by name, email, or specialite
- Displays: Name, Email, Phone, Specialite, Role badge, Bio

---

## 📁 Key Files to Know

### API Integration
```javascript
// src/utils/api.js
import { departmentsAPI, specialitesAPI, eventsAPI } from '@/utils/api';

// Usage:
const { data } = await departmentsAPI.getAll();
await departmentsAPI.create({ name: 'CS', description: '...' });
await departmentsAPI.update(id, { name: 'New Name' });
await departmentsAPI.delete(id);
```

### Authentication
```javascript
// src/contexts/AuthContext.jsx
import { useAuth } from '@/contexts/AuthContext';

const { isAuth, user, login, logout } = useAuth();
// user.role === 'admin' for admin features
```

### Toast Notifications
```javascript
import { toast } from 'sonner';

toast.success('Department created!');
toast.error('Failed to delete');
toast.info('Loading...');
```

---

## 🎨 UI Components

### Dashboard Layout
```
┌─────────────────────────────────────┐
│ Sidebar    │   Main Content         │
│            │                        │
│ Dashboard  │   [Page Content]       │
│ Departments│                        │
│ Specialites│                        │
│ Events     │                        │
│ Users      │                        │
│            │                        │
│ [Logout]   │                        │
└─────────────────────────────────────┘
```

### Modal Forms
- Forms open in centered modals
- Smooth animations
- Cancel/Submit buttons
- Validation feedback

### Delete Confirmation
- Always asks for confirmation
- Red danger button
- Prevents accidental deletions

---

## 🔐 Access Control

### Public Access
- Homepage (/)
- Login page (/login)
- Register page (/register)

### Requires Login
- Profile page (/profile)

### Admin Only
- All dashboard pages (/dashboard/*)
- Checked in layout: `user.role === 'admin'`
- Non-admins redirected to homepage

---

## 🌙 Theme & Languages

### Dark Mode
- Toggle in Navbar (top right)
- Persists across sessions
- All components support both themes

### Languages (Planned)
- English (default)
- French
- Arabic (RTL ready)
- Toggle in Navbar

---

## 🐛 Testing Checklist

### Admin Dashboard
1. **Login** as admin
2. **Navigate** to /dashboard
3. **View** statistics cards
4. **Go to** Departments page
5. **Click** "Add Department"
6. **Fill** form and submit
7. **See** success toast
8. **See** new department in grid
9. **Click** "Edit" on department
10. **Update** and save
11. **Click** "Delete"
12. **Confirm** deletion
13. **Repeat** for Specialites and Events
14. **Go to** Users page
15. **Search** for a user
16. **Toggle** dark mode
17. **Logout**

---

## 📝 Next Steps

### To Complete the Frontend:

1. **Profile Page** (`/profile`)
   - Update user info form
   - Add/edit/delete social links
   - View own profile

2. **Public Pages**
   - `/departments` - List all departments
   - `/departments/[id]` - Department detail with specialites
   - `/specialites` - List all specialites
   - `/specialites/[id]` - Specialite detail with users
   - `/events` - List all events
   - `/events/[id]` - Event detail page

3. **Homepage** (`/`)
   - Hero section with CTA
   - About section
   - Activities/Features section
   - Recent events list
   - Contact section

4. **Improvements**
   - Pagination for large lists
   - Advanced search/filters
   - Bulk operations
   - Export data (CSV/PDF)
   - User avatars
   - Event RSVP system

---

## 💡 Tips

### Adding a New CRUD Entity

1. **Create API methods** in `src/utils/api.js`:
```javascript
export const myEntityAPI = {
  getAll: () => api.get('/my-entity'),
  create: (data) => api.post('/my-entity', data),
  update: (id, data) => api.put(`/my-entity/${id}`, data),
  delete: (id) => api.delete(`/my-entity/${id}`),
};
```

2. **Create Form Component** in `src/components/Dashboard/MyEntityForm.jsx`

3. **Create Page** in `src/app/dashboard/my-entity/page.jsx`

4. **Add to Sidebar** in `src/components/Dashboard/Sidebar.jsx`

### Debugging

**Check Network Tab:**
- See all API requests
- Check status codes
- View request/response data

**Check Console:**
- Error messages
- API errors logged

**Check Auth:**
```javascript
// In browser console:
localStorage.getItem('token')  // Should show JWT
localStorage.getItem('user')   // Should show user JSON
```

---

## 🎉 What Works Right Now

✅ **Full Admin Panel** - Complete CRUD for all entities  
✅ **Authentication** - Login/Logout with JWT  
✅ **Image Upload** - For events  
✅ **Search** - For users  
✅ **Modals** - Beautiful forms and confirmations  
✅ **Toasts** - Success/Error feedback  
✅ **Dark Mode** - Full theme support  
✅ **Responsive** - Mobile/Tablet/Desktop  
✅ **Loading States** - Skeletons and spinners  
✅ **Validation** - Form field validation  

---

## 📞 Need Help?

### Common Issues

**"Failed to load departments"**
- Check if backend is running on `http://localhost:8000`
- Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
- Check browser console for API errors

**"Redirected to login"**
- Token might be expired
- Login again
- Check `localStorage.getItem('token')`

**"Not authorized"**
- User might not be admin
- Check `user.role` in database
- Admin role required for dashboard

**Changes not showing**
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Check if API returned success

---

## 🚀 Quick Demo Script

```bash
# 1. Start Backend
cd infinity_club-
php artisan serve

# 2. Start Frontend (new terminal)
cd infinity_front
npm run dev

# 3. Open browser
# Go to: http://localhost:3000/login

# 4. Login with admin credentials

# 5. Explore dashboard:
# - Click "Departments" in sidebar
# - Click "Add Department"
# - Fill: Name = "Computer Science", Description = "CS Dept"
# - Click "Create Department"
# - See success toast
# - See new department card

# 6. Try dark mode toggle (top right)

# 7. Try user search:
# - Click "Users" in sidebar
# - Type in search box
# - See filtered results

# Done! ✅
```

---

**Ready to develop!** 🎉

The core admin dashboard is fully functional. You can now:
- Manage all club data
- Test the complete workflow
- Build out the public pages
- Add custom features

**Next**: Implement profile page and public-facing pages.
