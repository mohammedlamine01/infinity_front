# Compact Events Grid Component

A responsive, animated grid component that displays all events in compact cards that fit entirely within the viewport.

## Features

- **Responsive Grid**: Automatically adjusts columns based on screen size (2-7 columns)
- **Compact Cards**: 180px height × 220px width for optimal space usage
- **Viewport Fitting**: Uses `h-screen` and `overflow-hidden` to prevent scrolling
- **Framer Motion Animations**: Staggered entrance animations and hover effects
- **Dynamic Font Sizing**: Automatically adjusts title font size based on length
- **Modern UI**: Glassmorphism effects with backdrop blur
- **Dark Mode Support**: Full theme compatibility

## Usage

```jsx
import CompactEventsGrid from '@/components/Events/CompactEventsGrid';

export default function EventsPage() {
  return <CompactEventsGrid />;
}
```

## Routes

- `/events/compact` - Compact grid view
- `/events/showcase` - Demo page

## Card Content

Each compact card displays:
- **Event Image**: 80px height with hover zoom effect
- **Title**: Truncated with dynamic font sizing
- **Date & Time**: Formatted as "Dec 25 • 2:00 PM"
- **Location**: Truncated if too long
- **Type Indicator**: Colored dot showing event type

## Responsive Breakpoints

- **Mobile (< 640px)**: 2 columns
- **Small (640-768px)**: 3 columns
- **Medium (768-1024px)**: 4 columns
- **Large (1024-1280px)**: 5 columns
- **XL (1280-1536px)**: 6 columns
- **2XL (> 1536px)**: 7 columns

## Animations

- **Entrance**: Staggered fade-in with upward motion
- **Hover**: Scale up (5%) with enhanced shadow
- **Image Zoom**: 10% scale increase on hover
- **Type Indicator**: Spring animation on load

## Technical Details

- **No Scrolling**: `overflow-hidden` ensures viewport-only display
- **Flex Layout**: Header (64px) + Grid (remaining height)
- **Grid Auto-fit**: Cards maintain aspect ratio across screen sizes
- **API Integration**: Uses existing `eventsAPI.getAll()`
- **Error Handling**: Toast notifications for API failures