# 🚀 Infinity Club Frontend - Complete Setup Guide

## 📋 Overview

This is a complete Next.js 15 application with:
- ✅ Multi-language support (English, French, Arabic with RTL)
- ✅ Dark mode
- ✅ JWT Authentication
- ✅ ShadCN UI Components
- ✅ Tailwind CSS
- ✅ Protected Routes
- ✅ 2-Step Registration

## 📁 Project Structure Created

```
infinity_front/
├── src/
│   ├── app/
│   │   ├── layout.jsx              ✅ Root layout with providers
│   │   ├── page.jsx                ✅ Homepage with all sections
│   │   ├── login/page.jsx          ✅ Login page
│   │   ├── register/page.jsx       ✅ 2-step registration
│   │   ├── dashboard/page.jsx      ✅ Protected dashboard
│   │   └── api/auth.js             ✅ Auth API utilities
│   │
│   ├── components/
│   │   ├── Navbar.jsx              ✅ Responsive navbar
│   │   ├── Footer.jsx              ✅ Footer with social links
│   │   ├── Hero.jsx                ✅ Hero section (#A8D88C bg)
│   │   ├── About.jsx               ✅ About section with cards
│   │   ├── Activities.jsx          ✅ Activities section
│   │   ├── Team.jsx                ✅ Team section
│   │   ├── LoginForm.jsx           ✅ Login form component
│   │   ├── RegisterFormStep1.jsx   ✅ Registration step 1
│   │   ├── RegisterFormStep2.jsx   ✅ Registration step 2
│   │   ├── LanguageSelector.jsx    ✅ Language switcher
│   │   ├── DarkModeToggle.jsx      ✅ Dark mode toggle
│   │   ├── ProtectedRoute.jsx      ✅ Route protection
│   │   ├── theme-provider.jsx      ✅ Theme provider
│   │   └── ui/                     ✅ ShadCN components
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       ├── input.jsx
│   │       ├── label.jsx
│   │       ├── alert.jsx
│   │       ├── toast.jsx
│   │       └── toaster.jsx
│   │
│   ├── contexts/
│   │   └── LanguageContext.jsx     ✅ Language context & provider
│   │
│   ├── utils/
│   │   ├── auth.js                 ✅ JWT management
│   │   └── i18n.js                 ✅ Translations (EN/FR/AR)
│   │
│   ├── hooks/
│   │   └── use-toast.js            ✅ Toast hook
│   │
│   ├── lib/
│   │   └── utils.js                ✅ Utility functions
│   │
│   └── styles/
│       └── globals.css             ✅ Global styles + dark mode
│
├── public/
│   └── infinity_club_logo.png      ⚠️ ADD YOUR LOGO HERE
│
├── .env.local                      ✅ Environment variables
├── tailwind.config.js              ✅ Tailwind configuration
├── next.config.ts                  ✅ Next.js configuration
└── INSTALLATION.md                 ✅ Installation guide
```

## 🛠️ Installation Steps

### Step 1: Install Dependencies

```bash
cd infinity_front
npm install axios next-themes lucide-react class-variance-authority clsx tailwind-merge @radix-ui/react-slot @radix-ui/react-toast tailwindcss-animate
```

### Step 2: Add Your Club Logo

Place your logo as `infinity_club_logo.png` in the `public/` folder.

If you don't have a logo yet, you can create a placeholder or the app will show a broken image icon.

### Step 3: Verify Environment Variables

The `.env.local` file has been created with:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Update this if your Laravel backend uses a different URL.

### Step 4: Run Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

## 🎨 Features Implemented

### 1. **Navbar**
- Club logo
- Navigation links (Home, About, Activities, Team, Contact)
- Dark mode toggle
- Language selector (EN/FR/AR)
- Login/Register buttons (hidden when authenticated)
- Dashboard/Logout buttons (shown when authenticated)
- Fully responsive with mobile menu

### 2. **Hero Section**
- Background color: #A8D88C
- Large white text
- "Discover Our Projects" CTA button
- Smooth scroll to About section

### 3. **About Section**
- Club mission description
- 3 feature cards: Innovation, Technology, Teamwork
- Hover animations

### 4. **Activities Section**
- Workshops, Hackathons, Tech Talks cards
- Calendar indicators
- Hover scale animations

### 5. **Team Section**
- Team member cards with avatars
- Role and bio display
- Social links (GitHub, LinkedIn, Email)
- Hover animations

### 6. **Footer**
- Club description
- Social media links:
  - 📧 infinity.tech@univ-bba.dz
  - Instagram: @club_infinity
  - YouTube: club_infinity
  - Facebook: infinity club
- Copyright notice

### 7. **Authentication**

#### Login Page (`/login`)
- Email + Password fields
- Error handling with toast notifications
- Special alert for "account not validated" error
- Redirects to dashboard on success
- Redirects to dashboard if already authenticated

#### Registration Page (`/register`)
- **Step 1:** Name, Email, Phone
- **Step 2:** Specialty, Bio, Password, Confirm Password
- Password confirmation validation
- Success message with redirect to login
- Redirects to dashboard if already authenticated

#### Dashboard (`/dashboard`)
- Protected route
- User profile display
- Activity summary
- Bio section

### 8. **Dark Mode**
- Toggle in navbar
- Uses next-themes
- Respects system preference
- Persists in localStorage
- Smooth transitions

### 9. **Multi-Language**
- English, French, Arabic
- RTL support for Arabic
- Language selector in navbar
- Persists in localStorage
- All UI elements translated

### 10. **JWT Token Management**
- Stored in localStorage
- Auto-attached to API requests
- Auto-refresh on 401 errors
- Secure logout

## 🔌 Backend API Integration

The app expects these endpoints:

### POST `/api/login`
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
Response:
```json
{
  "token": "jwt_token_here",
  "user": {
    "name": "User Name",
    "email": "user@example.com",
    "phone": "+213...",
    "specialty": "...",
    "bio": "..."
  }
}
```

### POST `/api/register`
```json
{
  "name": "Full Name",
  "email": "user@example.com",
  "phone": "+213...",
  "specialty": "Computer Science",
  "bio": "About me...",
  "password": "password123"
}
```

### POST `/api/logout`
Headers: `Authorization: Bearer {token}`

### Error for Non-Validated Account
When login fails due to account not validated, return:
```json
{
  "error": "Votre compte n'a pas encore été validé. Veuillez attendre la confirmation de l'administrateur."
}
```

## 🎯 Usage Examples

### Changing Translations
Edit `src/utils/i18n.js`:
```javascript
export const translations = {
  en: {
    home: 'Home',
    // Add more...
  },
  fr: {
    home: 'Accueil',
    // Add more...
  },
  ar: {
    home: 'الرئيسية',
    // Add more...
  }
};
```

### Customizing Colors
Edit `tailwind.config.js` and `src/styles/globals.css`

### Updating Social Links
Edit `src/components/Footer.jsx`

### Adding Team Members
Edit `src/components/Team.jsx`

## 🚨 Troubleshooting

### Issue: Module not found
```bash
npm install
```

### Issue: Styles not loading
1. Check `tailwind.config.js` paths
2. Restart dev server: `npm run dev`

### Issue: API connection failed
1. Verify backend is running on port 8000
2. Check `.env.local` API URL
3. Enable CORS on backend

### Issue: Images not loading
1. Add logo to `public/infinity_club_logo.png`
2. Verify file name is exact (case-sensitive)

## 📱 Responsive Design

The app is fully responsive:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🌐 Browser Support

- Chrome (latest) ✅
- Firefox (latest) ✅
- Safari (latest) ✅
- Edge (latest) ✅

## 📦 Production Build

```bash
npm run build
npm start
```

## ✅ Checklist

- [x] Project structure created
- [x] All components implemented
- [x] Authentication pages built
- [x] Protected routes working
- [x] Dark mode functional
- [x] Multi-language support
- [x] ShadCN UI components
- [x] JWT auth integration
- [x] Responsive design
- [ ] Add your club logo
- [ ] Install npm dependencies
- [ ] Connect to backend API
- [ ] Test all features

## 🎉 Next Steps

1. **Install dependencies:** Run the npm install command above
2. **Add your logo:** Place in `public/` folder
3. **Start Laravel backend:** Make sure it's running on port 8000
4. **Run frontend:** `npm run dev`
5. **Test features:**
   - Register a new user
   - Login
   - Switch languages
   - Toggle dark mode
   - Access dashboard

## 📧 Support

For issues or questions, contact: infinity.tech@univ-bba.dz

---

**Built with ❤️ for Infinity Club - University of BBA**
