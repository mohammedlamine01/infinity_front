'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardBadge } from '@/components/ui/card'

export default function CardShowcase() {
  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
            Premium Card Components
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Modern, visually stunning card designs with glassmorphism, gradients, and micro-interactions using your custom OKLCH color system.
          </p>
        </div>

        {/* Default Card */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Default Card</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="default">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle>Project Dashboard</CardTitle>
                  <CardBadge variant="primary">Active</CardBadge>
                </div>
                <CardDescription>
                  Track your team's progress and milestones in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Completion</span>
                    <span className="text-sm font-medium">68%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full transition-all" style={{ width: '68%' }}></div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
                  View Details
                </button>
              </CardFooter>
            </Card>

            <Card variant="default">
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  Collaborate with 12 active team members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-chart-2 border-2 border-card"></div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs font-medium">
                    +7
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <CardBadge variant="secondary">12 Active</CardBadge>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Glass Card */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Glassmorphism Card</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card variant="glass">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle>Analytics Overview</CardTitle>
                  <CardBadge variant="success">+24%</CardBadge>
                </div>
                <CardDescription>
                  Real-time performance metrics and insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Users</p>
                    <p className="text-2xl font-bold text-primary">2.4K</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Sessions</p>
                    <p className="text-2xl font-bold text-chart-1">5.8K</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Bounce</p>
                    <p className="text-2xl font-bold text-chart-2">32%</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <button className="text-sm text-primary font-medium hover:underline">
                  View full report →
                </button>
              </CardFooter>
            </Card>

            <Card variant="glass">
              <CardHeader>
                <CardTitle>Storage Usage</CardTitle>
                <CardDescription>
                  Your cloud storage capacity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">47.8 GB</span>
                    <span className="text-sm text-muted-foreground">of 100 GB</span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-3">
                    <div className="bg-gradient-to-r from-primary to-chart-1 h-3 rounded-full" style={{ width: '47.8%' }}></div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <CardBadge variant="accent">Premium Plan</CardBadge>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Gradient Card */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Gradient Card</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="gradient">
              <CardHeader>
                <CardTitle>Premium Features</CardTitle>
                <CardDescription>
                  Unlock advanced capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Unlimited projects
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Advanced analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Priority support
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
                  Upgrade Now
                </button>
              </CardFooter>
            </Card>

            <Card variant="gradient">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardBadge variant="primary">3 New</CardBadge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                    <div>
                      <p className="text-sm font-medium">New comment</p>
                      <p className="text-xs text-muted-foreground">Sarah mentioned you</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-chart-1 mt-1.5"></div>
                    <div>
                      <p className="text-sm font-medium">Task completed</p>
                      <p className="text-xs text-muted-foreground">Design review finished</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Elevated Card */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Elevated Card</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Featured Article</CardTitle>
                <CardDescription>
                  Latest insights and best practices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-foreground">
                  Discover cutting-edge techniques for building modern web applications with enhanced performance and user experience.
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>5 min read</span>
                  <span>•</span>
                  <span>Published today</span>
                </div>
              </CardFooter>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle>Quick Stats</CardTitle>
                  <CardBadge variant="primary">Live</CardBadge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-accent rounded-lg">
                    <p className="text-xs text-muted-foreground">Revenue</p>
                    <p className="text-xl font-bold text-primary">$12.4K</p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <p className="text-xs text-muted-foreground">Orders</p>
                    <p className="text-xl font-bold text-chart-1">342</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Bordered Card */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Bordered Card</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="bordered">
              <CardHeader>
                <CardTitle>User Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-chart-2"></div>
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

            <Card variant="bordered">
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Customize your preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span>Notifications</span>
                    <div className="w-10 h-5 bg-primary rounded-full"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Dark Mode</span>
                    <div className="w-10 h-5 bg-muted rounded-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Premium Card */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Premium Card (Animated)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card variant="premium">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle>Enterprise Plan</CardTitle>
                  <CardBadge variant="primary">Popular</CardBadge>
                </div>
                <CardDescription>
                  Everything you need to scale
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
                      Advanced security
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      24/7 support
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

            <Card variant="premium">
              <CardHeader>
                <CardTitle>Achievement Unlocked!</CardTitle>
                <CardBadge variant="success">New</CardBadge>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-4 py-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary via-chart-1 to-chart-2 flex items-center justify-center">
                    <span className="text-3xl">🏆</span>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">100 Projects Completed</p>
                    <p className="text-sm text-muted-foreground">You're on fire!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
