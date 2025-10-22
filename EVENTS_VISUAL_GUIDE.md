# 🎨 Events Components Visual Guide

## 📦 Component Preview

### EventCard Component

```
┌────────────────────────────────────────┐
│  ┌──────────────────────────────────┐  │
│  │                                  │  │
│  │         Event Image              │  │ <- Image or gradient placeholder
│  │        (48px height)             │  │
│  │                                  │  │
│  └──────────────────────────────────┘  │
│  [Type Badge]          [Status Badge]  │ <- "Seminar" | "Upcoming"
│                                        │
│  Event Name (Bold, Large)              │ <- Max 2 lines, truncated
│                                        │
│  📅 October 30, 2025                   │ <- Formatted date
│  📍 Main Auditorium                    │ <- Location
│  🕐 10:00 AM                           │ <- Time (if available)
│  👥 Computer Science                   │ <- Department (if available)
│                                        │
│  Event description text that can      │
│  span multiple lines but is limited    │ <- Max 3 lines, truncated
│  to three lines maximum...             │
│                                        │
│  ┌────────────────────────────────┐   │
│  │      View Details →             │   │ <- Action button
│  └────────────────────────────────┘   │
└────────────────────────────────────────┘
```

**Hover Effect:** Card scales up (102%), shadow increases

---

### EventsList Component

**Desktop View (3 columns):**
```
┌────────────┐  ┌────────────┐  ┌────────────┐
│  Event 1   │  │  Event 2   │  │  Event 3   │
│            │  │            │  │            │
│            │  │            │  │            │
└────────────┘  └────────────┘  └────────────┘

┌────────────┐  ┌────────────┐  ┌────────────┐
│  Event 4   │  │  Event 5   │  │  Event 6   │
│            │  │            │  │            │
│            │  │            │  │            │
└────────────┘  └────────────┘  └────────────┘
```

**Tablet View (2 columns):**
```
┌──────────────┐  ┌──────────────┐
│   Event 1    │  │   Event 2    │
│              │  │              │
└──────────────┘  └──────────────┘

┌──────────────┐  ┌──────────────┐
│   Event 3    │  │   Event 4    │
│              │  │              │
└──────────────┘  └──────────────┘
```

**Mobile View (1 column):**
```
┌────────────────────┐
│     Event 1        │
│                    │
└────────────────────┘

┌────────────────────┐
│     Event 2        │
│                    │
└────────────────────┘

┌────────────────────┐
│     Event 3        │
│                    │
└────────────────────┘
```

---

## 🎨 Color Scheme

### Event Type Badges

**Seminar (Blue):**
```
┌──────────┐
│ SEMINAR  │ <- Blue background, darker blue text
└──────────┘
```
- Light mode: `bg-blue-100 text-blue-800`
- Dark mode: `bg-blue-900/30 text-blue-300`

**Workshop (Green):**
```
┌──────────┐
│ WORKSHOP │ <- Green background, darker green text
└──────────┘
```
- Light mode: `bg-green-100 text-green-800`
- Dark mode: `bg-green-900/30 text-green-300`

**Conference (Purple):**
```
┌────────────┐
│ CONFERENCE │ <- Purple background, darker purple text
└────────────┘
```
- Light mode: `bg-purple-100 text-purple-800`
- Dark mode: `bg-purple-900/30 text-purple-300`

**Competition (Orange):**
```
┌─────────────┐
│ COMPETITION │ <- Orange background, darker orange text
└─────────────┘
```
- Light mode: `bg-orange-100 text-orange-800`
- Dark mode: `bg-orange-900/30 text-orange-300`

**Meeting (Gray):**
```
┌─────────┐
│ MEETING │ <- Gray background, darker gray text
└─────────┘
```
- Light mode: `bg-gray-100 text-gray-800`
- Dark mode: `bg-gray-900/30 text-gray-300`

---

### Status Badges

**Upcoming (Green):**
```
┌──────────┐
│ Upcoming │ <- Solid green background, white text
└──────────┘
```
- Color: `bg-green-500 text-white`

**Past Event (Gray):**
```
┌────────────┐
│ Past Event │ <- Solid gray background, white text
└────────────┘
```
- Color: `bg-gray-500 text-white`

---

## 📱 Responsive Breakpoints

```
Mobile:     < 768px   → 1 column
Tablet:     768px+    → 2 columns
Desktop:    1024px+   → 3 columns
```

---

## 🎭 States

### Loading State
```
┌────────────────────────────────────────┐
│  ╔══════════════════════════════════╗  │
│  ║  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ║  │ <- Pulsing gray
│  ║  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ║  │    skeleton
│  ╚══════════════════════════════════╝  │
│  ░░░░░░░░░░░░                          │
│  ░░░░░░░░░░░░░░░░░░                    │
└────────────────────────────────────────┘
```
Shows 3 skeleton cards with pulsing animation

---

### Error State
```
┌──────────────────────────────────────────┐
│                                          │
│          ⚠ (Alert Circle Icon)          │
│                                          │
│      Error Loading Events               │
│                                          │
│   Failed to load events from server     │
│                                          │
│       ┌────────────────┐                │
│       │   Try Again    │                │
│       └────────────────┘                │
│                                          │
└──────────────────────────────────────────┘
```
Red-themed error message with retry button

---

### Empty State
```
┌──────────────────────────────────────────┐
│                                          │
│          📅 (Calendar Icon)             │
│                                          │
│         No Events Found                 │
│                                          │
│   There are no events available at      │
│   the moment. Check back soon!          │
│                                          │
└──────────────────────────────────────────┘
```
Gray-themed message when no events exist

---

## 🎨 Dark Mode Comparison

### Light Mode
```
Card Background:    White (#FFFFFF)
Text:              Dark Gray (#111827)
Secondary Text:    Medium Gray (#6B7280)
Border:            Light Gray (#E5E7EB)
Hover Background:  Very Light Gray (#F9FAFB)
```

### Dark Mode
```
Card Background:    Dark Gray (#111827)
Text:              White (#FFFFFF)
Secondary Text:    Light Gray (#9CA3AF)
Border:            Dark Gray (#1F2937)
Hover Background:  Slightly Lighter Dark (#1F2937)
```

---

## 🎯 Icon Usage

### Icons and Their Meanings

```
📅 Calendar     → Event date
📍 MapPin       → Event location
🕐 Clock        → Event time
👥 Users        → Department/attendees
⚠ AlertCircle  → Error state
➡ ArrowRight   → Navigation/CTA
```

**Icon Library:** Lucide React
**Icon Size:** `w-4 h-4` or `w-5 h-5`
**Icon Colors:** Match text color with slight theme color

---

## 🔍 Typography

```
Event Name:         text-xl font-bold
Description:        text-sm text-gray-600
Meta Info:          text-sm text-gray-600
Section Heading:    text-3xl font-bold
Page Title:         text-4xl md:text-5xl font-bold
```

---

## 📏 Spacing

```
Card Padding:           p-6 (24px)
Grid Gap:              gap-6 (24px)
Section Padding Y:     py-16 (64px)
Container Padding X:   px-4 (16px)
Card Border Radius:    rounded-xl (12px)
Button Border Radius:  rounded-lg (8px)
```

---

## 🎬 Animations

### Card Hover
```
Transform:     scale(1.02)
Shadow:        shadow-lg → shadow-2xl
Duration:      300ms
Timing:        ease-in-out
```

### Image Hover
```
Transform:     scale(1.1)
Duration:      300ms
Timing:        ease-in-out
```

### Loading Pulse
```
Animation:     pulse
Duration:      2s
Repeat:        infinite
```

---

## 🎨 Gradient Backgrounds

### Hero Section
```css
background: linear-gradient(to right, #4F46E5, #9333EA)
/* Indigo-600 to Purple-600 */
```

### Card Image Placeholder
```css
background: linear-gradient(to bottom-right, #4F46E5, #9333EA)
/* Indigo-500 to Purple-600 */
```

### Action Button
```css
background: linear-gradient(to right, #4F46E5, #9333EA)
/* Indigo-600 to Purple-600 */
```

---

## 📐 Component Dimensions

### EventCard
```
Width:          Full width (responsive)
Min Height:     ~400px
Image Height:   192px (h-48)
Content Padding: 24px (p-6)
```

### EventsList Grid
```
Gap:            24px (gap-6)
Columns Mobile:  1
Columns Tablet:  2
Columns Desktop: 3
```

---

## 🎯 Component Hierarchy Visual

```
EventsList Component
│
├─ Loading State (if loading)
│  └─ 3x Skeleton Cards
│
├─ Error State (if error)
│  ├─ Error Icon
│  ├─ Error Message
│  └─ Retry Button
│
├─ Empty State (if no events)
│  ├─ Calendar Icon
│  └─ Empty Message
│
└─ Events Grid (if has events)
   ├─ EventCard #1
   │  ├─ Image Container
   │  │  ├─ Event Image
   │  │  ├─ Type Badge (top-right)
   │  │  └─ Status Badge (top-left)
   │  ├─ Content Container
   │  │  ├─ Event Name
   │  │  ├─ Meta Info
   │  │  │  ├─ Date
   │  │  │  ├─ Location
   │  │  │  ├─ Time
   │  │  │  └─ Department
   │  │  ├─ Description
   │  │  └─ Action Button
   │
   ├─ EventCard #2
   │  └─ ... (same structure)
   │
   └─ EventCard #N
      └─ ... (same structure)
```

---

## 🎨 CSS Classes Reference

### Common Classes Used

```css
/* Layout */
.container        → max-w-7xl mx-auto px-4
.grid            → display: grid
.flex            → display: flex

/* Spacing */
.p-6             → padding: 1.5rem (24px)
.py-16           → padding-y: 4rem (64px)
.gap-6           → gap: 1.5rem (24px)
.mb-8            → margin-bottom: 2rem (32px)

/* Typography */
.text-xl         → font-size: 1.25rem
.font-bold       → font-weight: 700
.line-clamp-2    → max 2 lines with ellipsis
.line-clamp-3    → max 3 lines with ellipsis

/* Colors */
.bg-white        → background: white
.text-gray-600   → color: gray-600
.dark:bg-gray-900 → dark mode background

/* Borders & Shadows */
.rounded-xl      → border-radius: 0.75rem
.border          → border-width: 1px
.shadow-lg       → box-shadow: large
.hover:shadow-2xl → hover: extra large shadow

/* Transitions */
.transition-all  → transition: all 300ms
.transition-colors → transition: colors 300ms
.duration-300    → duration: 300ms

/* Hover Effects */
.hover:scale-[1.02] → scale: 102% on hover
.hover:bg-indigo-700 → darker bg on hover
```

---

## 📊 Performance Metrics

```
Component Load:     < 100ms
Image Load:         Progressive (lazy)
Skeleton Display:   Immediate
API Response Time:  ~200-500ms
Total Render Time:  < 1 second
```

---

## ✨ Accessibility Features

```
✅ Semantic HTML
✅ ARIA labels
✅ Keyboard navigation
✅ Focus states
✅ Color contrast (WCAG AA)
✅ Screen reader friendly
✅ Responsive images
✅ Touch-friendly (44px targets)
```

---

**Visual guide complete! Now you know exactly what to expect! 🎨**
