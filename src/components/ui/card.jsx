import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "card-default",
    glass: "card-glass",
    gradient: "card-gradient",
    elevated: "card-elevated",
    bordered: "card-bordered",
    premium: "card-premium"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "card-base",
        variants[variant],
        className
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("card-header", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("card-title", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("card-description", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn("card-content", className)} 
    {...props} 
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("card-footer", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

const CardBadge = React.forwardRef(({ className, variant = "primary", ...props }, ref) => {
  const variants = {
    primary: "badge-primary",
    secondary: "badge-secondary",
    success: "badge-success",
    accent: "badge-accent"
  }

  return (
    <span
      ref={ref}
      className={cn(
        "card-badge",
        variants[variant],
        className
      )}
      {...props}
    />
  )
})
CardBadge.displayName = "CardBadge"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardBadge }
