# 🎨 Card Variants Visual Guide

## Color Palette (OKLCH)

```
Primary:   ████ oklch(0.363 0.18 142.1) - Your Custom Green (hsl(142.1 76.2% 36.3%))
Secondary: ████ oklch(0.9303 0.0528 159.6007) - Light Mint  
Accent:    ████ oklch(0.9439 0.0423 159.9135) - Soft Mint
Muted:     ████ oklch(0.9684 0.0068 247.8951) - Light Gray
Border:    ████ oklch(0.9516 0.0364 160.0815) - Subtle Green-Gray
```

---

## 1️⃣ Default Card

**Use Case:** General content, blog posts, listings

**Visual Features:**
- Clean white background
- Subtle shadow (--shadow-md)
- Thin border
- Hover: lifts up 2px + enhanced shadow

**Code:**
```jsx
<Card variant="default">
  <CardHeader>
    <CardTitle>Project Dashboard</CardTitle>
    <CardDescription>Track your progress</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

**Perfect For:** 80% of your cards

---

## 2️⃣ Glass Card

**Use Case:** Hero sections, overlays, premium features

**Visual Features:**
- Glassmorphism effect
- Backdrop blur (12px)
- Gradient: card → accent
- Inner glow with primary color
- Hover: scale + enhanced glow

**Code:**
```jsx
<Card variant="glass">
  <CardHeader>
    <CardTitle>Analytics Overview</CardTitle>
  </CardHeader>
  <CardContent>
    Stats and metrics
  </CardContent>
</Card>
```

**Perfect For:** Hero cards, dashboard headers

---

## 3️⃣ Gradient Card

**Use Case:** CTAs, premium features, special announcements

**Visual Features:**
- Multi-color gradient background
- Animated gradient border
- Hover: glow + shadow with primary color
- Masked border technique

**Code:**
```jsx
<Card variant="gradient">
  <CardHeader>
    <CardTitle>Premium Features</CardTitle>
  </CardHeader>
  <CardContent>
    Feature list
  </CardContent>
</Card>
```

**Perfect For:** Feature highlights, upsells

---

## 4️⃣ Elevated Card

**Use Case:** Featured content, articles, important info

**Visual Features:**
- Bold 4px top border (primary color)
- Large shadow (--shadow-lg)
- Hover: border expands inward
- Professional, clean look

**Code:**
```jsx
<Card variant="elevated">
  <CardHeader>
    <CardTitle>Featured Article</CardTitle>
  </CardHeader>
  <CardContent>
    Article content
  </CardContent>
</Card>
```

**Perfect For:** Blog posts, featured items

---

## 5️⃣ Bordered Card

**Use Case:** Profiles, settings, forms

**Visual Features:**
- Standard border (resting)
- Gradient border reveals on hover
- Smooth opacity transition
- Lift effect

**Code:**
```jsx
<Card variant="bordered">
  <CardHeader>
    <CardTitle>User Profile</CardTitle>
  </CardHeader>
  <CardContent>
    Profile info
  </CardContent>
</Card>
```

**Perfect For:** User cards, settings panels

---

## 6️⃣ Premium Card

**Use Case:** Pricing, upgrades, critical CTAs

**Visual Features:**
- Gradient background
- Animated light sweep on hover
- Glow effect with primary color
- Scale + lift transformation
- Maximum wow factor

**Code:**
```jsx
<Card variant="premium">
  <CardHeader>
    <CardTitle>Enterprise Plan</CardTitle>
    <CardBadge variant="primary">Popular</CardBadge>
  </CardHeader>
  <CardContent>
    $99/month
  </CardContent>
  <CardFooter>
    <button>Get Started</button>
  </CardFooter>
</Card>
```

**Perfect For:** Pricing cards, upgrade prompts

---

## 🏷️ Badge Variants

### Primary Badge
```jsx
<CardBadge variant="primary">Active</CardBadge>
```
- Green background
- White text
- Shadow effect
- **Use:** Active states, featured items

### Secondary Badge
```jsx
<CardBadge variant="secondary">Draft</CardBadge>
```
- Light mint background
- Dark text
- Subtle border
- **Use:** Neutral states, secondary info

### Success Badge
```jsx
<CardBadge variant="success">Completed</CardBadge>
```
- Chart-1 color (bright green)
- White text
- Shadow effect
- **Use:** Completed tasks, success states

### Accent Badge
```jsx
<CardBadge variant="accent">Featured</CardBadge>
```
- Soft mint background
- Primary border
- Dark text
- **Use:** Special highlights, featured items

---

## 📐 Layout Patterns

### Single Column (Mobile)
```jsx
<div className="space-y-6">
  <Card variant="default">...</Card>
  <Card variant="glass">...</Card>
  <Card variant="premium">...</Card>
</div>
```

### Two Column Grid
```jsx
<div className="grid md:grid-cols-2 gap-6">
  <Card variant="default">...</Card>
  <Card variant="elevated">...</Card>
</div>
```

### Three Column Grid
```jsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card variant="glass">...</Card>
  <Card variant="gradient">...</Card>
  <Card variant="premium">...</Card>
</div>
```

### Masonry Layout
```jsx
<div className="columns-1 md:columns-2 lg:columns-3 gap-6">
  <Card variant="default" className="mb-6">...</Card>
  <Card variant="glass" className="mb-6">...</Card>
  <Card variant="bordered" className="mb-6">...</Card>
</div>
```

---

## 🎭 Animation Details

### Hover Effects by Variant

| Variant | Transform | Shadow | Other |
|---------|-----------|--------|-------|
| default | translateY(-2px) | md → lg | - |
| glass | translateY(-4px) scale(1.01) | lg → xl | Glow intensifies |
| gradient | translateY(-3px) | xl + glow | Border pulses |
| elevated | translateY(-2px) | lg → xl | Border expands |
| bordered | translateY(-2px) | sm → md | Gradient border |
| premium | translateY(-4px) scale(1.02) | xl + glow | Light sweep |

### Transition Timing
- Duration: 300ms
- Easing: ease-out
- Properties: all

---

## 🌓 Dark Mode

All variants automatically adapt:

**Light Mode:**
- White/light backgrounds
- Subtle shadows
- Green accents

**Dark Mode:**
- Dark backgrounds
- Enhanced shadow opacity
- Same vibrant primary green
- Maintained contrast ratios

No code changes needed - uses CSS variables!

---

## ✨ Special Effects

### Glassmorphism (glass variant)
```css
backdrop-filter: blur(12px);
background: linear-gradient(135deg, card → accent);
```

### Gradient Border (gradient variant)
```css
/* Masked gradient border technique */
background-clip: padding-box;
```

### Shine Animation (premium variant)
```css
/* Light sweep on hover */
::before pseudo-element with gradient
transition: left 0.5s
```

### Glow Effect (multiple variants)
```css
box-shadow: var(--shadow-xl), 0 0 20px var(--primary);
```

---

## 🎯 Usage Decision Tree

```
Need a card?
│
├─ General content? → default
│
├─ Hero/Featured? → glass or elevated
│
├─ Call-to-action? → gradient or premium
│
├─ User profile/Settings? → bordered
│
└─ Pricing/Upgrade? → premium
```

---

## 🔥 Pro Tips

1. **Don't overuse premium** - Save it for critical CTAs
2. **Mix variants** - Create visual hierarchy
3. **Use badges sparingly** - 1-2 per card max
4. **Maintain spacing** - Use consistent gap in grids
5. **Responsive first** - Test on mobile
6. **Combine with gradients** - Background gradients in content
7. **Test dark mode** - Ensure readability
8. **Accessibility matters** - Maintain contrast ratios

---

## 📱 Responsive Breakpoints

```jsx
// Mobile first approach
<div className="
  grid 
  grid-cols-1           {/* Mobile: 1 column */}
  md:grid-cols-2        {/* Tablet: 2 columns */}
  lg:grid-cols-3        {/* Desktop: 3 columns */}
  xl:grid-cols-4        {/* Large: 4 columns */}
  gap-4 md:gap-6        {/* Responsive gap */}
">
  <Card variant="default">...</Card>
</div>
```

---

## 🎨 Example Combinations

### Dashboard Stats
```jsx
<div className="grid md:grid-cols-3 gap-6">
  <Card variant="glass">
    <CardContent>
      <p className="text-xs text-muted-foreground">Users</p>
      <p className="text-3xl font-bold text-primary">2.4K</p>
    </CardContent>
  </Card>
  {/* More stat cards... */}
</div>
```

### Pricing Table
```jsx
<div className="grid md:grid-cols-3 gap-6">
  <Card variant="default">
    <CardHeader>
      <CardTitle>Starter</CardTitle>
      <CardDescription>$19/month</CardDescription>
    </CardHeader>
  </Card>
  
  <Card variant="premium">
    <CardHeader>
      <CardTitle>Pro</CardTitle>
      <CardBadge variant="primary">Popular</CardBadge>
    </CardHeader>
  </Card>
  
  <Card variant="gradient">
    <CardHeader>
      <CardTitle>Enterprise</CardTitle>
    </CardHeader>
  </Card>
</div>
```

### Team Section
```jsx
<div className="grid md:grid-cols-4 gap-4">
  {teamMembers.map(member => (
    <Card variant="bordered" key={member.id}>
      <CardContent>
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-chart-2" />
          <p className="font-medium">{member.name}</p>
          <p className="text-xs text-muted-foreground">{member.role}</p>
        </div>
      </CardContent>
    </Card>
  ))}
</div>
```

---

**View live examples at `/cards` route!** 🚀
