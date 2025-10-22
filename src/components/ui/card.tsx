import * as React from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "gradient" | "elevated" | "bordered" | "premium"
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
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
  }
)
Card.displayName = "Card"

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("card-header", className)}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("card-title", className)}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("card-description", className)}
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("card-content", className)}
      {...props}
    />
  )
)
CardContent.displayName = "CardContent"

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("card-footer", className)}
      {...props}
    />
  )
)
CardFooter.displayName = "CardFooter"

export interface CardBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "accent"
}

const CardBadge = React.forwardRef<HTMLSpanElement, CardBadgeProps>(
  ({ className, variant = "primary", ...props }, ref) => {
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
  }
)
CardBadge.displayName = "CardBadge"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardBadge }
