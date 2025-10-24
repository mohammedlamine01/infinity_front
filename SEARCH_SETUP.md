# 🚀 SETUP INSTRUCTIONS - Search Interface

## ✅ What's Already Done

All components have been created in your project:

```
✓ src/components/search/SearchPanel.jsx
✓ src/components/search/SearchInput.jsx
✓ src/components/search/DepartmentSelect.jsx
✓ src/components/search/SpecialiteSelect.jsx
✓ src/components/search/UserList.jsx
✓ src/components/search/UserLinks.jsx
✓ src/components/FiltersPanel.jsx
✓ src/components/Loader.jsx
✓ src/components/LanguageSwitcher.jsx
✓ src/utils/searchTranslations.js
✓ src/utils/demoData.js (for testing without backend)
✓ src/app/search/page.jsx
```

## 🎯 Choose Your Setup

### Option A: Test with Demo Data (No Backend Needed)

**Step 1**: Update `SearchPanel.jsx` to use demo data

Replace lines 63-94 (the fetch functions) with:

```javascript
import { mockAPI } from '../../utils/demoData';

const fetchDepartments = async () => {
  setIsLoading(true);
  try {
    const data = await mockAPI.getDepartments();
    setDepartments(data);
  } catch (error) {
    console.error('Error fetching departments:', error);
  } finally {
    setIsLoading(false);
  }
};

const fetchSpecialites = async (deptId) => {
  setIsLoading(true);
  try {
    const data = await mockAPI.getSpecialites(deptId);
    setSpecialites(data);
  } catch (error) {
    console.error('Error fetching specialites:', error);
  } finally {
    setIsLoading(false);
  }
};

const fetchUsers = async (specId) => {
  setIsLoading(true);
  try {
    const data = await mockAPI.getUsers(specId);
    setUsers(data);
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    setIsLoading(false);
  }
};
```

**Step 2**: Start your dev server
```bash
npm run dev
```

**Step 3**: Navigate to
```
http://localhost:3000/search
```

**Step 4**: Test!
- ✅ Switch languages (EN/FR/AR)
- ✅ Search and filter
- ✅ Click through departments → specialties → users
- ✅ View user profiles

---

### Option B: Connect to Your Backend API

**Step 1**: Find your API base URL
```javascript
// Example: http://localhost:8000/api
const API_BASE_URL = 'YOUR_API_URL_HERE';
```

**Step 2**: Update `SearchPanel.jsx` (lines 63-94)
```javascript
const fetchDepartments = async () => {
  setIsLoading(true);
  try {
    const response = await fetch(`${API_BASE_URL}/departments`);
    const data = await response.json();
    setDepartments(data);
  } catch (error) {
    console.error('Error fetching departments:', error);
  } finally {
    setIsLoading(false);
  }
};

const fetchSpecialites = async (deptId) => {
  setIsLoading(true);
  try {
    const response = await fetch(`${API_BASE_URL}/departments/${deptId}/specialites`);
    const data = await response.json();
    setSpecialites(data);
  } catch (error) {
    console.error('Error fetching specialites:', error);
  } finally {
    setIsLoading(false);
  }
};

const fetchUsers = async (specId) => {
  setIsLoading(true);
  try {
    const response = await fetch(`${API_BASE_URL}/specialites/${specId}/users`);
    const data = await response.json();
    setUsers(data);
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    setIsLoading(false);
  }
};
```

**Step 3**: Ensure your API returns data in this format:

**Departments**:
```json
[
  {
    "id": 1,
    "name": "Computer Science",
    "description": "Study of computation",
    "specialites_count": 5
  }
]
```

**Specialties**:
```json
[
  {
    "id": 101,
    "name": "Artificial Intelligence",
    "description": "ML and AI",
    "users_count": 45
  }
]
```

**Users**:
```json
[
  {
    "id": 1001,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Student",
    "profile_image": "https://...",
    "cv_url": "https://...",
    "portfolio_url": "https://...",
    "linkedin_url": "https://...",
    "phone": "+123456789",
    "location": "City",
    "bio": "Description",
    "skills": ["Skill1", "Skill2"]
  }
]
```

**Step 4**: Start your servers
```bash
# Backend (Laravel example)
php artisan serve

# Frontend
npm run dev
```

**Step 5**: Test the integration!

---

## 🎨 Quick Customization

### Change Colors
```jsx
// Find and replace in all components:
"green-600" → "blue-600"
"emerald-600" → "indigo-600"
```

### Add to Navigation
In your main layout or navbar:
```jsx
<Link href="/search">
  <Search className="h-5 w-5" />
  Search
</Link>
```

### Enable Dark Mode
Your theme provider should already support it. Toggle with:
```jsx
import { useTheme } from 'next-themes';

const { theme, setTheme } = useTheme();
<button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
  Toggle Dark Mode
</button>
```

---

## 🐛 Common Issues

### "Module not found: searchTranslations"
**Fix**: Make sure the file exists at `src/utils/searchTranslations.js`

### "Cannot read property 'name'"
**Fix**: Add optional chaining
```jsx
{dept?.name || 'Unknown'}
```

### Filters not working
**Fix**: Check that `onFiltersChange` is being called properly

### RTL not switching
**Fix**: Ensure `LanguageContext` wraps your app/page

---

## 📚 Documentation

| File | Description |
|------|-------------|
| `SEARCH_COMPLETE_GUIDE.md` | Full documentation with all features |
| `SEARCH_QUICK_START.md` | Quick start guide |
| `SEARCH_VISUAL_GUIDE.md` | Visual layout reference |

---

## 🎉 You're Ready!

Your search interface is fully built and ready to use. Just choose Option A or B above to get started!

**Option A** = Test immediately with demo data  
**Option B** = Connect to your real API

Either way, you have a production-ready search interface! 🚀

---

**Need help?** Check the complete guide or review the component files for more details.
