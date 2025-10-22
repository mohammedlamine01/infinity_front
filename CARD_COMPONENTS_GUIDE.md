# Premium Card Components - Usage Guide

## Overview
Modern, visually stunning card components built with your custom OKLCH color system featuring glassmorphism, gradients, and premium micro-interactions.

## Color System (OKLCH Format)
- **Primary**: `oklch(0.363 0.18 142.1)` - Your custom green (hsl(142.1 76.2% 36.3%))
- **Secondary**: `oklch(0.9303 0.0528 159.6007)` - Light mint
- **Accent**: `oklch(0.9439 0.0423 159.9135)` - Soft mint
- **Muted**: `oklch(0.9684 0.0068 247.8951)` - Light gray
- **Border**: `oklch(0.9516 0.0364 160.0815)` - Subtle green-gray

## Installation

The card component is already set up in your project:
- Component: `/src/components/ui/card.jsx`
- Styles: `/src/styles/globals.css`
- Demo: `/src/app/cards/page.jsx`

## Card Variants

### 1. Default Card
Classic card with subtle shadow and hover lift effect.

```jsx
<Card variant="default">
  <CardHeader>
    <CardTitle>Project Dashboard</CardTitle>
    <CardDescription>Track your team's progress</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Your content */}
  </CardContent>
  <CardFooter>
    {/* Footer actions */}
  </CardFooter>
</Card>
```

**Features:**
- Clean, minimal design
- Soft shadow (`--shadow-md`)
- Hover: lift + enhanced shadow
- Border with your custom border color

---

### 2. Glass Card
Stunning glassmorphism effect with backdrop blur.

```jsx
<Card variant="glass">
  <CardHeader>
    <CardTitle>Analytics Overview</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Your content */}
  </CardContent>
</Card>
```

**Features:**
- Backdrop blur (12px)
- Gradient background (card → accent)
- Inner glow using primary color
- Premium hover effect with scale

---

### 3. Gradient Card
Eye-catching gradient with animated border.

```jsx
<Card variant="gradient">
  <CardHeader>
    <CardTitle>Premium Features</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Your content */}
  </CardContent>
</Card>
```

**Features:**
- Multi-stop gradient (card → secondary → accent)
- Animated gradient border
- Glow effect on hover
- Modern masked border technique

---

### 4. Elevated Card
Bold top border accent design.

```jsx
<Card variant="elevated">
  <CardHeader>
    <CardTitle>Featured Article</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Your content */}
  </CardContent>
</Card>
```

**Features:**
- 4px primary-colored top border
- Large shadow (`--shadow-lg`)
- Hover: border expands inward
- Clean, professional look

---

### 5. Bordered Card
Animated gradient border on hover.

```jsx
<Card variant="bordered">
  <CardHeader>
    <CardTitle>User Profile</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Your content */}
  </CardContent>
</Card>
```

**Features:**
- Standard border (resting state)
- Gradient border reveals on hover
- Smooth fade transition
- Lift effect

---

### 6. Premium Card (Animated)
Most advanced variant with shine animation.

```jsx
<Card variant="premium">
  <CardHeader>
    <CardTitle>Enterprise Plan</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Your content */}
  </CardContent>
</Card>
```

**Features:**
- Gradient background
- Animated light sweep on hover
- Glow effect with primary color
- Scale + lift transformation
- Perfect for pricing cards or CTAs

---

## Badge Component

Add status indicators or labels to your cards.

```jsx
<CardBadge variant="primary">Active</CardBadge>
<CardBadge variant="secondary">Draft</CardBadge>
<CardBadge variant="success">Completed</CardBadge>
<CardBadge variant="accent">Featured</CardBadge>
```

**Badge Variants:**
- `primary` - Green with shadow (for active states)
- `secondary` - Light mint with border (for neutral states)
- `success` - Chart-1 color (for completed/success states)
- `accent` - Soft mint with primary border (for featured items)

---

## Card Sub-Components

### CardHeader
```jsx
<CardHeader>
  <CardTitle>Your Title</CardTitle>
  <CardDescription>Supporting text</CardDescription>
</CardHeader>
```
- Flex column with gap
- Bottom border separator
- Padding: 1.5rem

### CardTitle
```jsx
<CardTitle>Amazing Feature</CardTitle>
```
- Gradient text effect (foreground → primary)
- Tight letter spacing
- 2xl font size
- Semibold weight

### CardDescription
```jsx
<CardDescription>This is a description</CardDescription>
```
- Muted foreground color
- Small font size
- Relaxed line height

### CardContent
```jsx
<CardContent>
  <p>Your main content here</p>
</CardContent>
```
- Padding: 1.5rem (top reduced)
- Flexible container

### CardFooter
```jsx
<CardFooter>
  <button>Action</button>
</CardFooter>
```
- Flex row with gap
- Top border separator
- Padding: 1.5rem (top reduced)

---

## Complete Example

```jsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardBadge } from '@/components/ui/card'

export default function MyComponent() {
  return (
    <Card variant="premium">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>Enterprise Plan</CardTitle>
          <CardBadge variant="primary">Popular</CardBadge>
        </div>
        <CardDescription>
          Everything you need to scale your business
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <span className="text-4xl font-bold text-primary">$99</span>
            <span className="text-muted-foreground">/month</span>
          </div>
          
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              Unlimited team members
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              Advanced analytics
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              Priority support
            </li>
          </ul>
        </div>
      </CardContent>
      
      <CardFooter>
        <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
          Get Started
        </button>
      </CardFooter>
    </Card>
  )
}
```

---

## Design Patterns

### 1. Stats Cards
```jsx
<Card variant="glass">
  <CardContent>
    <div className="grid grid-cols-3 gap-4">
      <div>
        <p className="text-xs text-muted-foreground">Users</p>
        <p className="text-2xl font-bold text-primary">2.4K</p>
      </div>
      {/* More stats... */}
    </div>
  </CardContent>
</Card>
```

### 2. Pricing Cards
```jsx
<Card variant="premium">
  <CardHeader>
    <CardTitle>Pro Plan</CardTitle>
    <CardBadge variant="primary">Most Popular</CardBadge>
  </CardHeader>
  <CardContent>
    <div className="text-4xl font-bold text-primary">$49</div>
    {/* Features list... */}
  </CardContent>
  <CardFooter>
    <button className="w-full bg-primary text-primary-foreground">
      Subscribe
    </button>
  </CardFooter>
</Card>
```

### 3. Profile Cards
```jsx
<Card variant="bordered">
  <CardHeader>
    <CardTitle>User Profile</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-chart-2" />
      <div>
        <p className="font-medium">John Doe</p>
        <p className="text-sm text-muted-foreground">Designer</p>
      </div>
    </div>
  </CardContent>
</Card>
```

---

## Customization

### Extending Variants
Add custom variants by modifying `/src/styles/globals.css`:

```css
.card-custom {
  @apply bg-card text-card-foreground;
  /* Your custom styles */
}
```

Then use it:
```jsx
<Card variant="custom">
```

### Override Styles
Use className prop for one-off customizations:

```jsx
<Card variant="default" className="max-w-md mx-auto shadow-2xl">
  {/* Content */}
</Card>
```

---

## Accessibility

All cards include:
- Semantic HTML structure
- Proper contrast ratios (WCAG AA compliant)
- Keyboard navigation support
- ARIA-friendly markup
- Reduced motion support (transitions respect `prefers-reduced-motion`)

---

## Dark Mode

All variants automatically adapt to dark mode through CSS variables. The dark theme uses:
- Darker backgrounds
- Adjusted shadow opacity
- Maintained contrast ratios
- Same vibrant primary green accent

---

## Performance

- CSS-based animations (GPU accelerated)
- No JavaScript for basic interactions
- Minimal re-renders
- Optimized gradient rendering
- Lazy-loaded backdrop blur

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Graceful degradation for backdrop-filter
- CSS Grid and Flexbox support required
- OKLCH color space (fallbacks provided)

---

## Demo

View the full showcase at: `/cards`

Or run locally:
```bash
npm run dev
```

Then navigate to `http://localhost:3000/cards`

---

## Tips & Best Practices

1. **Choose the right variant:**
   - `default` - General purpose, most content
   - `glass` - Hero sections, overlays, modal-like content
   - `gradient` - CTAs, premium features, special announcements
   - `elevated` - Featured content, blog posts, articles
   - `bordered` - User profiles, settings, form sections
   - `premium` - Pricing, upgrades, important actions

2. **Combine with badges:**
   - Use badges to show status, counts, or labels
   - Place in CardHeader for best visibility

3. **Maintain hierarchy:**
   - CardTitle → main heading
   - CardDescription → supporting text
   - Keep content focused and scannable

4. **Responsive design:**
   - Use grid layouts for multiple cards
   - Consider 1 column on mobile, 2-3 on desktop

5. **Color strategy:**
   - Let the primary green be an accent, not dominant
   - Use gradients sparingly for maximum impact
   - Leverage muted colors for supporting elements

---

## Troubleshooting

**Cards not showing shadows:**
- Check that CSS variables are defined in globals.css
- Verify Tailwind is processing the custom shadow utilities

**Colors look wrong:**
- Ensure browser supports OKLCH (or has fallback)
- Check that globals.css is imported in your layout

**Hover effects not working:**
- Verify transition classes are applied
- Check for CSS specificity conflicts

---

## Credits

Built with:
- Next.js 14
- Tailwind CSS 3
- Custom OKLCH color system
- Modern CSS features (backdrop-filter, gradients, masks)

---

**Enjoy building beautiful UIs! 🎨✨**
