# 🔍 Modern Multilingual Search Interface

A beautiful, intelligent, and fully responsive search interface built with React, Tailwind CSS, and shadcn/ui components.

## ✨ Features

### 🌍 Multilingual Support
- **Three Languages**: English, French, and Arabic
- **RTL Support**: Automatic right-to-left layout for Arabic
- **Smooth Language Switching**: Instant UI updates without page reload
- **Persistent Language**: Saves user preference in localStorage

### 🎨 Modern Design
- **Green Theme**: Matches the homepage hero section with `oklch(0.6273 0.1700 149.2005)` primary color
- **Dark Mode**: Full dark mode support using CSS variables
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Responsive**: Mobile-first design that works on all screen sizes
- **Minimal & Clean**: Inspired by Google and Notion interfaces

### 🔄 Progressive Search Flow
The interface follows a step-by-step approach:
1. **Departments** → Display all departments as cards
2. **Specialties** → Show specialties after selecting a department
3. **Users** → Display users after selecting a specialty
4. **Profile & Links** → Show detailed user information with CV, Portfolio, and LinkedIn links

### 🎯 Smart Filtering
- **Real-time Search**: Filter across all levels (department, specialty, user)
- **Multi-level Filters**:
  - Category filters (Computer Science, Economics, Languages, Sciences)
  - Date range filters (Today, This Week, This Month, This Year)
  - Type filters (Student, Alumni, Professor)
- **Collapsible Filter Panel**: Clean and organized filter sections
- **One-click Reset**: Clear all filters and start fresh

### 🚀 User Experience
- **Breadcrumb Navigation**: Always know where you are
- **Back Navigation**: Easy navigation between levels
- **Loading States**: Beautiful loading animations
- **Empty States**: Helpful messages when no results found
- **Hover Effects**: Interactive cards with smooth transitions
- **Focus States**: Accessible keyboard navigation

## 📁 Project Structure

```
src/
├── components/
│   ├── search/
│   │   ├── SearchPanel.jsx          # Main container & state management
│   │   ├── SearchInput.jsx          # Search bar with icon
│   │   ├── DepartmentSelect.jsx     # Department cards grid
│   │   ├── SpecialiteSelect.jsx     # Specialty cards grid
│   │   ├── UserList.jsx             # User cards list
│   │   └── UserLinks.jsx            # User profile & links
│   ├── FiltersPanel.jsx             # Collapsible filters sidebar
│   ├── Loader.jsx                   # Loading animation
│   └── LanguageSwitcher.jsx         # EN | FR | AR switcher
├── contexts/
│   └── LanguageContext.jsx          # Language state & RTL logic
├── utils/
│   └── searchTranslations.js        # All translations (EN/FR/AR)
└── app/
    └── search/
        └── page.jsx                 # Search page route
```

## 🎨 Design System

### Color Palette
```css
/* Primary Green (from Hero) */
--primary: oklch(0.6273 0.1700 149.2005);
--primary-foreground: oklch(0.98 0 0);

/* Background & Surfaces */
--background: oklch(0.99 0.002 106);
--card: oklch(1.0 0 0);
--card-hover: oklch(0.995 0.0015 106);

/* Gradients */
from-green-600 to-emerald-600
from-slate-50 via-green-50/30 to-slate-50
```

### Typography
- **Font Family**: Inter (EN/FR), system fonts with Arabic fallback
- **Font Sizes**: Responsive scale from text-sm to text-3xl
- **Font Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Spacing & Shadows
- **Border Radius**: rounded-xl (12px), rounded-lg (8px)
- **Shadows**: shadow-sm, shadow-md, shadow-lg, shadow-xl
- **Transitions**: duration-300 ease-in-out

## 🔌 API Integration

The interface expects the following API endpoints:

```javascript
// Fetch all departments
GET /api/departments
Response: [{ id, name, description, specialites_count }]

// Fetch specialties by department
GET /api/departments/:deptId/specialites
Response: [{ id, name, description, users_count }]

// Fetch users by specialty
GET /api/specialites/:specId/users
Response: [{ id, name, email, role, profile_image, cv_url, portfolio_url, linkedin_url }]
```

### Update API Endpoints
Edit `SearchPanel.jsx` to match your backend:

```javascript
const API_BASE_URL = 'http://localhost:8000/api';

const fetchDepartments = async () => {
  const response = await fetch(`${API_BASE_URL}/departments`);
  const data = await response.json();
  setDepartments(data);
};
```

## 🚀 Getting Started

### 1. Installation
The components are already created in your project. No additional installation needed!

### 2. Navigate to Search Page
```bash
# Start your development server
npm run dev

# Visit the search page
http://localhost:3000/search
```

### 3. Test the Interface
- Switch languages using the EN | FR | AR buttons
- Search across departments, specialties, and users
- Apply filters using the left sidebar
- Navigate through the progressive flow
- Test RTL layout with Arabic

## 🎯 Usage Examples

### Basic Search
1. Open the search page
2. Type in the search bar to filter results
3. Click on a department card
4. Select a specialty
5. Choose a user
6. View profile and links

### With Filters
1. Open the filters panel (left sidebar)
2. Select categories (e.g., Computer Science)
3. Choose a date range (e.g., This Month)
4. Pick user types (e.g., Student, Alumni)
5. Results update automatically

### Language Switching
1. Click EN | FR | AR in the header
2. All text updates instantly
3. Layout switches to RTL for Arabic
4. Language preference is saved

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js` or use inline classes:
```jsx
className="bg-gradient-to-r from-blue-600 to-purple-600"
```

### Add New Filters
Edit `FiltersPanel.jsx`:
```javascript
const newFilter = [
  { id: 'value1', label: 'Label 1' },
  { id: 'value2', label: 'Label 2' }
];
```

### Modify Translations
Edit `src/utils/searchTranslations.js`:
```javascript
export const searchTranslations = {
  en: { newKey: 'New Value' },
  fr: { newKey: 'Nouvelle Valeur' },
  ar: { newKey: 'قيمة جديدة' }
};
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

### Mobile Optimizations
- Stacked layout for filters and content
- Single column grid for cards
- Collapsible filter panel
- Touch-friendly buttons (min 44px)
- Optimized font sizes

## ⚡ Performance

### Optimizations Applied
- ✅ Lazy loading with AnimatePresence
- ✅ Memoized filter functions
- ✅ Debounced search input
- ✅ Minimal re-renders
- ✅ Code splitting by route
- ✅ CSS-in-JS avoided (Tailwind CSS)
- ✅ Optimized animations (GPU acceleration)

## 🌐 Browser Support
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## 🔮 Future Enhancements
- [ ] AI-powered semantic search
- [ ] Voice search integration
- [ ] Advanced filtering (range, multi-select)
- [ ] Export search results
- [ ] Save search queries
- [ ] Search history
- [ ] Autocomplete suggestions
- [ ] Fuzzy search
- [ ] Search analytics

## 📄 License
Part of the Infinity Front project.

## 🤝 Contributing
Feel free to enhance and customize this search interface for your needs!

---

**Built with ❤️ using React, Tailwind CSS, Framer Motion, and shadcn/ui**
