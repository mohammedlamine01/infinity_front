# Search Interface - Quick Reference Guide

## 🚀 How It Works Now

### State Management
All state is managed by the `useSearchState` hook. The component destructures values directly:

```javascript
const {
  // Direct state access
  departments,        // Array of departments
  selectedDepartment, // Currently selected department
  specialties,        // Array of specialties
  selectedSpecialty,  // Currently selected specialty
  users,             // Array of users
  selectedUser,      // Currently selected user
  searchQuery,       // Current search text
  
  // Computed values
  currentView,       // Object with view state booleans
  recentlyViewed,    // Recently viewed items array
  
  // Actions
  handleDepartmentClick,  // Navigate to department
  handleSpecialtyClick,   // Navigate to specialty
  handleUserClick,        // Navigate to user profile
  goBack,                 // Navigate back one level
  resetAll,               // Reset to initial state
} = useSearchState();
```

### View States

The `currentView` object has these properties:

```javascript
currentView = {
  isDepartmentsView: true/false,   // Viewing department list
  isSpecialtiesView: true/false,   // Viewing specialties in a department
  isUsersView: true/false,         // Viewing users in a specialty
  isUserProfileView: true/false,   // Viewing individual user profile
}
```

### Navigation Flow

```
Departments View (Home)
    ↓ (click department)
Specialties View
    ↓ (click specialty)
Users View
    ↓ (click user)
User Profile View
```

### Data Loading Pattern

```javascript
// Initial load (once on mount)
useEffect(() => {
  loadInitialData();  // Loads departments and all specialties
}, []);

// View-specific load (when navigation changes)
useEffect(() => {
  loadViewData();  // Loads data based on current selection
}, [selectedDepartment, selectedSpecialty, selectedUser]);
```

### Search & Filter

```javascript
// Search applies to current view
if (searchQuery || globalSearchQuery) {
  const query = searchQuery || globalSearchQuery;
  const viewType = currentView.isDepartmentsView ? 'departments' : 
                   currentView.isSpecialtiesView ? 'specialties' : 'users';
  data = filterItems(data, query, viewType);
}
```

### Rendering Logic

```javascript
// Component decides what to render based on currentView
if (currentView.isDepartmentsView) {
  return renderDepartmentsView();
} else if (currentView.isSpecialtiesView) {
  return renderSpecialtiesView();
} else if (currentView.isUsersView || currentView.isUserProfileView) {
  return renderUsersView();
}
```

## 🔧 Common Tasks

### Add a New Filter
```javascript
// In FiltersPanel component
updateFilters('filterType', values);
```

### Change Sort Order
```javascript
const category = currentView.isDepartmentsView ? 'departments' :
                 currentView.isSpecialtiesView ? 'specialties' : 'users';
updateSortOption(category, sortValue);
```

### Navigate Programmatically
```javascript
// Go to a department
handleDepartmentClick(departmentObject);

// Go to a specialty
handleSpecialtyClick(specialtyObject);

// Go to a user profile
handleUserClick(userObject);

// Go back one level
goBack();

// Reset everything
resetAll();
```

### Handle Search
```javascript
// Update search
setSearchQuery(newQuery);
setGlobalSearchQuery(newQuery);

// Clear search
setSearchQuery('');
clearGlobalSearch();
```

## 📊 Data Structure

### Department Object
```javascript
{
  id: number,
  nom_dep: string,
  name: string,
  // ... other properties
}
```

### Specialty Object
```javascript
{
  id: number,
  nom_sp: string,
  name: string,
  department_id: number,
  // ... other properties
}
```

### User Object
```javascript
{
  id: number,
  name: string,
  email: string,
  specialty_id: number,
  // ... other properties
}
```

## 🎨 View Mode Toggle

Only available in Users View:
```javascript
{currentView.isUsersView && !selectedUser && (
  <Button onClick={toggleViewMode}>
    {viewMode === VIEW_MODES.GRID ? <Grid /> : <List />}
  </Button>
)}
```

## 🔍 Recently Viewed

Automatically tracked:
```javascript
// Items are added when clicked
handleDepartmentClick(dept);  // Auto-adds to recently viewed
handleSpecialtyClick(spec);   // Auto-adds to recently viewed
handleUserClick(user);        // Auto-adds to recently viewed

// Display only on departments view (home)
{recentlyViewed && recentlyViewed.length > 0 && currentView.isDepartmentsView && (
  <RecentlyViewed items={recentlyViewed} />
)}
```

## ⚡ Performance Tips

1. **Don't create duplicate state** - Use values from the hook
2. **Use proper dependencies** - useEffect should depend on actual state values
3. **Avoid unnecessary re-renders** - Use memoization if needed
4. **Load data lazily** - Only load what's needed for current view

## 🐛 Debugging

If you see errors:
1. Check that you're using values from the hook, not `searchState.property`
2. Verify `currentView` is used as an object with boolean properties
3. Ensure navigation functions match those returned by the hook
4. Check useEffect dependencies match actual state values

---

**Last Updated:** October 24, 2025
