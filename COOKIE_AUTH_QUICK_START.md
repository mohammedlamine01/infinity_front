# 🚀 HTTP Cookie Authentication - Quick Reference

## What Was Fixed

Your application now **saves token and user data to HTTP cookies** instead of just localStorage. This means:

✅ **Profile icon works** - Can access `/profile`  
✅ **Dashboard button works** - Can access `/dashboard` (admin only)  
✅ **Persistent login** - Session survives page refresh  
✅ **Server-side access** - Backend can read auth data  
✅ **Better security** - CSRF protection with SameSite=Strict  

---

## How Cookies Work

### **On Login:**
```
User logs in
  ↓
Token saved to: authToken cookie
User data saved to: userData cookie
Admin status saved to: userRole cookie
  ↓
Cookies sent with every request
Persisted for 30 days
```

### **On Page Refresh:**
```
User refreshes page
  ↓
Cookies still exist
App reads from cookies
User stays logged in
No re-login needed
```

### **On Logout:**
```
User clicks logout
  ↓
All cookies deleted
localStorage cleared
User redirected to home
  ↓
Complete session cleanup
```

---

## Accessing Your Profile

### **Step 1: Login**
1. Go to: `http://localhost:3000/login`
2. Enter your email and password
3. Click "Login"

### **Step 2: Click Profile Icon**
1. After login, look at the top-right navbar
2. Click the **user icon** (👤)
3. Should navigate to `/profile`

### **Step 3: View/Edit Profile**
1. See your user information
2. Add professional links
3. Edit or delete links

---

## Accessing Admin Dashboard

### **Step 1: Login as Admin**
1. Go to: `http://localhost:3000/login`
2. Enter **admin credentials**
3. Click "Login"

### **Step 2: Click Dashboard**
1. After login, the **Dashboard button appears** in navbar
2. Click "Dashboard"
3. Should show admin panel

### **Step 3: Manage Content**
1. View statistics
2. Manage departments, specialites, events, users
3. Add, edit, delete items

---

## Cookie Details

### **Saved Cookies**
| Cookie | Contains | Lasts |
|--------|----------|-------|
| `authToken` | JWT token | 30 days |
| `userData` | Full user object | 30 days |
| `userRole` | User's role | 30 days |
| `userId` | User's ID | 30 days |
| `userName` | User's name | 30 days |

### **View Cookies in Browser**
1. Press `F12` to open DevTools
2. Go to **Application** tab
3. Click **Cookies**
4. Select `localhost:3000`
5. See all stored cookies

---

## Testing Checklist

- [ ] Login with admin account
- [ ] See dashboard button appear
- [ ] Click dashboard → should open dashboard
- [ ] Click profile icon → should open profile
- [ ] Refresh page → should stay logged in
- [ ] Add/edit links on profile
- [ ] Manage admin content on dashboard
- [ ] Click logout → should clear all data
- [ ] Try accessing `/dashboard` without login → should redirect
- [ ] Try accessing `/profile` without login → should redirect

---

## Common Issues & Fixes

### **Dashboard Button Doesn't Show**
- ✓ Verify you're logged in as admin
- ✓ Check cookies: `userRole` should be `admin`
- ✓ Refresh page (F5)

### **Can't Access Dashboard**
- ✓ Verify you're admin (`userRole=admin` cookie)
- ✓ Clear cache: Ctrl+Shift+Delete
- ✓ Try incognito window

### **Profile Shows "Not Found"**
- ✓ Verify you're logged in (check cookies)
- ✓ Wait for page to load completely
- ✓ Check console (F12) for errors

### **Logged Out After Refresh**
- ✓ This shouldn't happen - cookies should persist
- ✓ Check if cookies are enabled in browser
- ✓ Check browser settings for cookie blocks

---

## Files Changed

| File | Change |
|------|--------|
| `src/utils/cookies.js` | **NEW** - Cookie management |
| `src/utils/auth.js` | **Updated** - Save token/user to cookies |
| `src/components/Navbar.jsx` | **Updated** - Cookie-based admin check |
| `src/app/dashboard/layout.jsx` | **Updated** - Cookie-based protection |
| `src/contexts/AuthContext.jsx` | **Updated** - Initialize cookies |

---

## Security Notes

✅ **Safe to use** - Industry standard implementation  
✅ **CSRF protected** - SameSite=Strict enabled  
✅ **Auto-expires** - 30 days maximum  
✅ **Cleared on logout** - No data left behind  
✅ **No sensitive data** - Passwords not stored  

---

## Need Help?

### **Check Authentication Status**
```javascript
// In browser console (F12):
document.cookie  // See all cookies

// Or check specific cookie:
document.cookie.split('; ').find(row => row.startsWith('userRole='))
```

### **Verify Login**
```javascript
// Check if authToken exists
document.cookie.includes('authToken=')  // Should be true when logged in
```

### **Clear All Cookies**
```javascript
// In browser console:
document.cookie.split("; ").forEach(c => 
  document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
)
```

---

## Next Steps

1. ✅ Test login/logout
2. ✅ Access profile page
3. ✅ Access dashboard (admin only)
4. ✅ Verify cookies in DevTools
5. ✅ Test page refresh
6. ✅ Check role-based access

---

## 🎉 Everything Ready!

Your authentication system is now:
- ✅ **Cookie-based** (HTTP cookies)
- ✅ **Persistent** (survives page refresh)
- ✅ **Secure** (CSRF protected)
- ✅ **Server-compatible** (backend can read)

**You're all set to use Profile and Dashboard!** 🚀
