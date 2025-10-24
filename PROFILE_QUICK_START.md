# Profile Page - Quick Start Guide

## 🚀 How to Use Your New Profile Page

### For Regular Users

1. **Access Your Profile**
   - Click the **User icon** (👤) in the top navigation bar
   - Or navigate directly to `/profile`

2. **View Your Information**
   - See your name, role, email, phone
   - View your department and specialty
   - Check when you became a member

3. **Manage Your Professional Links**
   
   **Add a Link:**
   - Click "Add Link" button
   - Fill in:
     - Title (e.g., "My GitHub")
     - URL (e.g., "https://github.com/username")
     - Description (optional)
   - Click "Save"

   **Edit a Link:**
   - Click the edit icon (✏️) on any link
   - Update the information
   - Click "Save"

   **Delete a Link:**
   - Click the delete icon (🗑️) on any link
   - Confirm the deletion

### For Admin Users

**Everything regular users can do, PLUS:**
- Access to Dashboard via the "Dashboard" button in navbar
- The dashboard button appears next to the profile icon

## 📱 Navigation

### Desktop View
```
Navbar: [Logo] [Links] [🌙] [🌐] [👤] [Dashboard*] [Logout]
                                       ↑            ↑
                                    Profile    Admin Only
```

### Mobile View
```
Menu:
- Home
- About
- Activities
- Team
- Contact
------------------
- 👤 Profile
- Dashboard*        ← Admin Only
- Logout
```

## 🎯 What You'll See

### Profile Layout

```
┌─────────────────────────────────────────────────┐
│                 My Profile                       │
├──────────────────┬──────────────────────────────┤
│                  │  My Professional Links        │
│   [Avatar]       │  [+ Add Link]                │
│   John Doe       │                              │
│   Member         │  ┌────────────────────────┐  │
│                  │  │ GitHub Profile         │  │
│   📧 Email       │  │ github.com/user   [✏️🗑️]│  │
│   📱 Phone       │  └────────────────────────┘  │
│   💼 Department  │                              │
│   🎓 Specialty   │  ┌────────────────────────┐  │
│   📅 Member Since│  │ LinkedIn              │  │
│                  │  │ linkedin.com/in/... [✏️🗑️]│
│   Bio:           │  └────────────────────────┘  │
│   Lorem ipsum... │                              │
└──────────────────┴──────────────────────────────┘
```

## ✨ Features

- ✅ **Responsive Design**: Works on all devices
- ✅ **Multilingual**: English, French, Arabic
- ✅ **Real-time Updates**: Changes reflect immediately
- ✅ **Secure**: Only you can edit your links
- ✅ **Beautiful Animations**: Smooth transitions
- ✅ **Professional Look**: Modern, clean design

## 🔒 Security

- You must be logged in to access your profile
- You can only edit/delete your own links
- Dashboard is only accessible to admin users
- All API calls are authenticated with JWT

## 💡 Tips

1. **Add Professional Links**: GitHub, LinkedIn, Portfolio, etc.
2. **Keep URLs Valid**: Make sure to include `https://`
3. **Add Descriptions**: Help others know what each link is for
4. **Regular Updates**: Keep your links current

## 🎨 Customization

The profile page automatically uses:
- Your preferred language setting
- Your theme (light/dark mode)
- Your profile information from registration

## 🐛 Troubleshooting

**Profile page is empty?**
- Make sure you're logged in
- Check that your account is validated by an admin

**Can't see Dashboard button?**
- This is normal for regular users
- Only admin users can access the dashboard

**Links not saving?**
- Check your internet connection
- Make sure you're still logged in
- Verify the URL format is correct

**Page redirects to login?**
- Your session may have expired
- Please log in again

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors (F12)
2. Ensure you're using a modern browser
3. Clear cache and reload
4. Contact an administrator

---

**Enjoy your new profile page! 🎉**
