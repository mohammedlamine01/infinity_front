/**
 * PREMIUM CARD COMPONENTS - QUICK REFERENCE
 * ==========================================
 * 
 * Import:
 * import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardBadge } from '@/components/ui/card'
 * 
 * VARIANTS:
 * ---------
 * - default   → Clean minimal card with subtle shadow
 * - glass     → Glassmorphism with backdrop blur
 * - gradient  → Gradient background with animated border
 * - elevated  → Bold top border accent
 * - bordered  → Animated gradient border on hover
 * - premium   → Advanced with shine animation
 * 
 * BASIC USAGE:
 * -----------
 * <Card variant="glass">
 *   <CardHeader>
 *     <CardTitle>Title Here</CardTitle>
 *     <CardDescription>Description text</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     Main content
 *   </CardContent>
 *   <CardFooter>
 *     Footer actions
 *   </CardFooter>
 * </Card>
 * 
 * WITH BADGE:
 * ----------
 * <CardHeader>
 *   <div className="flex justify-between">
 *     <CardTitle>Title</CardTitle>
 *     <CardBadge variant="primary">Active</CardBadge>
 *   </div>
 * </CardHeader>
 * 
 * BADGE VARIANTS:
 * --------------
 * - primary    → Green with shadow (active states)
 * - secondary  → Light mint with border (neutral)
 * - success    → Chart color (completed)
 * - accent     → Soft mint (featured)
 * 
 * EXAMPLES:
 * --------
 */

// Example 1: Simple Card
export const SimpleCard = () => (
  <Card variant="default">
    <CardHeader>
      <CardTitle>Simple Card</CardTitle>
      <CardDescription>A basic card example</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Your content here</p>
    </CardContent>
  </Card>
)

// Example 2: Glass Card with Stats
export const StatsCard = () => (
  <Card variant="glass">
    <CardHeader>
      <CardTitle>Analytics</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-muted-foreground">Users</p>
          <p className="text-2xl font-bold text-primary">2.4K</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Revenue</p>
          <p className="text-2xl font-bold text-chart-1">$12K</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Growth</p>
          <p className="text-2xl font-bold text-chart-2">+24%</p>
        </div>
      </div>
    </CardContent>
  </Card>
)

// Example 3: Pricing Card
export const PricingCard = () => (
  <Card variant="premium">
    <CardHeader>
      <div className="flex justify-between items-start">
        <CardTitle>Pro Plan</CardTitle>
        <CardBadge variant="primary">Popular</CardBadge>
      </div>
      <CardDescription>Perfect for growing teams</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div>
          <span className="text-4xl font-bold text-primary">$49</span>
          <span className="text-muted-foreground">/month</span>
        </div>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            Unlimited projects
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            Priority support
          </li>
        </ul>
      </div>
    </CardContent>
    <CardFooter>
      <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg">
        Get Started
      </button>
    </CardFooter>
  </Card>
)

// Example 4: Profile Card
export const ProfileCard = () => (
  <Card variant="bordered">
    <CardHeader>
      <CardTitle>User Profile</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-chart-2" />
        <div>
          <p className="font-medium">Alex Johnson</p>
          <p className="text-sm text-muted-foreground">Product Designer</p>
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <CardBadge variant="accent">Verified</CardBadge>
    </CardFooter>
  </Card>
)

// Example 5: Feature Card
export const FeatureCard = () => (
  <Card variant="gradient">
    <CardHeader>
      <CardTitle>Premium Features</CardTitle>
      <CardDescription>Unlock advanced capabilities</CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2 text-sm">
        <li className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
          Advanced analytics
        </li>
        <li className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
          Team collaboration
        </li>
        <li className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
          Priority support
        </li>
      </ul>
    </CardContent>
    <CardFooter>
      <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg">
        Upgrade Now
      </button>
    </CardFooter>
  </Card>
)

// Example 6: Notification Card
export const NotificationCard = () => (
  <Card variant="elevated">
    <CardHeader>
      <div className="flex justify-between items-start">
        <CardTitle>Notifications</CardTitle>
        <CardBadge variant="primary">3 New</CardBadge>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="flex gap-3">
          <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
          <div>
            <p className="text-sm font-medium">New message</p>
            <p className="text-xs text-muted-foreground">Sarah mentioned you</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-2 h-2 rounded-full bg-chart-1 mt-1.5" />
          <div>
            <p className="text-sm font-medium">Task completed</p>
            <p className="text-xs text-muted-foreground">Review finished</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

/**
 * CUSTOMIZATION TIPS:
 * ------------------
 * 
 * 1. Override with className:
 *    <Card variant="default" className="max-w-md shadow-2xl">
 * 
 * 2. Combine variants with Tailwind utilities:
 *    <Card variant="glass" className="hover:scale-105">
 * 
 * 3. Add custom animations:
 *    <Card variant="premium" className="animate-pulse">
 * 
 * 4. Responsive sizing:
 *    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
 *      <Card variant="default">...</Card>
 *    </div>
 * 
 * 5. Dark mode is automatic - uses CSS variables
 * 
 * COLOR VARIABLES (OKLCH):
 * -----------------------
 * --primary: oklch(0.6273 0.1700 149.2005)    [Vibrant Green]
 * --secondary: oklch(0.9303 0.0528 159.6007)  [Light Mint]
 * --accent: oklch(0.9439 0.0423 159.9135)     [Soft Mint]
 * --muted: oklch(0.9684 0.0068 247.8951)      [Light Gray]
 * --border: oklch(0.9516 0.0364 160.0815)     [Subtle Green-Gray]
 * 
 * SHADOWS:
 * -------
 * --shadow-sm  → Subtle
 * --shadow-md  → Default
 * --shadow-lg  → Elevated
 * --shadow-xl  → Premium
 * --shadow-2xl → Hero
 * 
 * See CARD_COMPONENTS_GUIDE.md for full documentation
 */
