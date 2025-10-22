/**
 * ============================================
 * CSS VARIABLES REFERENCE
 * ============================================
 * 
 * All custom properties available in your design system
 * Located in: /src/styles/globals.css
 */

/* ============================================
   COLORS (OKLCH Format)
   ============================================ */

/* Light Mode Colors */
:root {
  /* Base Colors */
  --background: oklch(1.0000 0 0);              /* Pure white */
  --foreground: oklch(0.1371 0.0360 258.5258);  /* Almost black */
  
  /* Card Colors */
  --card: oklch(1.0000 0 0);                    /* White */
  --card-foreground: oklch(0.1371 0.0360 258.5258);
  
  /* Primary (Your Custom Green) */
  --primary: oklch(0.363 0.18 142.1);           /* hsl(142.1 76.2% 36.3%) */
  --primary-foreground: oklch(0.9838 0.0035 247.8583);
  
  /* Secondary (Light Mint) */
  --secondary: oklch(0.9303 0.0528 159.6007);
  --secondary-foreground: oklch(0.2079 0.0399 265.7275);
  
  /* Accent (Soft Mint) */
  --accent: oklch(0.9439 0.0423 159.9135);
  --accent-foreground: oklch(0.2079 0.0399 265.7275);
  
  /* Muted (Light Gray) */
  --muted: oklch(0.9684 0.0068 247.8951);
  --muted-foreground: oklch(0.5547 0.0407 257.4404);
  
  /* Borders & Inputs */
  --border: oklch(0.9516 0.0364 160.0815);      /* Subtle green-gray */
  --input: oklch(0.9516 0.0364 160.0815);
  --ring: oklch(0.6273 0.1700 149.2005);        /* Focus ring = primary */
  
  /* Destructive (Red) */
  --destructive: oklch(0.6368 0.2078 25.3259);
  --destructive-foreground: oklch(0.9838 0.0035 247.8583);
  
  /* Popover */
  --popover: oklch(1.0000 0 0);
  --popover-foreground: oklch(0.1371 0.0360 258.5258);
}

/* Dark Mode Colors */
.dark {
  --background: oklch(0 0 0);                   /* Pure black */
  --foreground: oklch(0.9838 0.0035 247.8583);  /* Almost white */
  
  --card: oklch(0.1324 0 0);                    /* Dark gray */
  --card-foreground: oklch(0.9838 0.0035 247.8583);
  
  --primary: oklch(0.6273 0.1700 149.2005);     /* Same vibrant green! */
  --primary-foreground: oklch(0.2079 0.0399 265.7275);
  
  --secondary: oklch(0.2156 0 0);
  --secondary-foreground: oklch(0.9838 0.0035 247.8583);
  
  --accent: oklch(0.2156 0 0);
  --accent-foreground: oklch(0.9838 0.0035 247.8583);
  
  --muted: oklch(0.2697 0 0);
  --muted-foreground: oklch(0.7107 0.0351 256.7877);
  
  --border: oklch(0.2697 0 0);
  --input: oklch(0.2697 0 0);
  --ring: oklch(0.6273 0.1700 149.2005);
  
  --destructive: oklch(0.3959 0.1331 25.7205);
  --destructive-foreground: oklch(0.9838 0.0035 247.8583);
}

/* ============================================
   CHART COLORS
   ============================================ */

:root, .dark {
  --chart-1: oklch(0.7763 0.2066 149.5172);  /* Bright green */
  --chart-2: oklch(0.6526 0.2090 142.7082);  /* Mid green */
  --chart-3: oklch(0.8187 0.1407 167.2174);  /* Teal */
  --chart-4: oklch(0.7849 0.2299 138.0859);  /* Lime */
  --chart-5: oklch(0.6806 0.1109 194.8628);  /* Cyan */
}

/* ============================================
   SIDEBAR COLORS
   ============================================ */

:root {
  --sidebar: oklch(0.9684 0.0068 247.8951);
  --sidebar-foreground: oklch(0.1371 0.0360 258.5258);
  --sidebar-primary: oklch(0.6273 0.1700 149.2005);
  --sidebar-primary-foreground: oklch(0.9838 0.0035 247.8583);
  --sidebar-accent: oklch(0.9439 0.0423 159.9135);
  --sidebar-accent-foreground: oklch(0.2079 0.0399 265.7275);
  --sidebar-border: oklch(0.9169 0.0633 159.2702);
  --sidebar-ring: oklch(0.6273 0.1700 149.2005);
}

.dark {
  --sidebar: oklch(0 0 0);
  --sidebar-foreground: oklch(0.9838 0.0035 247.8583);
  --sidebar-primary: oklch(0.6273 0.1700 149.2005);
  --sidebar-primary-foreground: oklch(0.2079 0.0399 265.7275);
  --sidebar-accent: oklch(0.2156 0 0);
  --sidebar-accent-foreground: oklch(0.9838 0.0035 247.8583);
  --sidebar-border: oklch(0.2697 0 0);
  --sidebar-ring: oklch(0.6273 0.1700 149.2005);
}

/* ============================================
   TYPOGRAPHY
   ============================================ */

:root, .dark {
  --font-sans: 'Inter', sans-serif;
  --font-serif: 'Lora', serif;
  --font-mono: 'Fira Code', monospace;
}

/* Letter Spacing */
:root, .dark {
  --tracking-normal: normal;
  --tracking-tighter: calc(var(--tracking-normal) - 0.05em);
  --tracking-tight: calc(var(--tracking-normal) - 0.025em);
  --tracking-wide: calc(var(--tracking-normal) + 0.025em);
  --tracking-wider: calc(var(--tracking-normal) + 0.05em);
  --tracking-widest: calc(var(--tracking-normal) + 0.1em);
}

/* ============================================
   SPACING & RADIUS
   ============================================ */

:root, .dark {
  --radius: 0.5rem;                            /* Base radius = 8px */
  --radius-sm: calc(var(--radius) - 4px);      /* 4px */
  --radius-md: calc(var(--radius) - 2px);      /* 6px */
  --radius-lg: var(--radius);                  /* 8px */
  --radius-xl: calc(var(--radius) + 4px);      /* 12px */
  
  --spacing: 0.25rem;                          /* Base spacing = 4px */
}

/* ============================================
   SHADOWS (Light Mode)
   ============================================ */

:root {
  --shadow-x: 0rem;
  --shadow-y: 0.1rem;
  --shadow-blur: 0.5rem;
  --shadow-spread: 0.05rem;
  --shadow-opacity: 0.1;
  --shadow-color: 0 0% 0%;
  
  /* Predefined Shadows */
  --shadow-2xs: 0rem 0.1rem 0.5rem 0.05rem hsl(0 0% 0% / 0.05);
  --shadow-xs:  0rem 0.1rem 0.5rem 0.05rem hsl(0 0% 0% / 0.05);
  --shadow-sm:  0rem 0.1rem 0.5rem 0.05rem hsl(0 0% 0% / 0.10), 
                0rem 1px 2px -0.95px hsl(0 0% 0% / 0.10);
  --shadow:     0rem 0.1rem 0.5rem 0.05rem hsl(0 0% 0% / 0.10), 
                0rem 1px 2px -0.95px hsl(0 0% 0% / 0.10);
  --shadow-md:  0rem 0.1rem 0.5rem 0.05rem hsl(0 0% 0% / 0.10), 
                0rem 2px 4px -0.95px hsl(0 0% 0% / 0.10);
  --shadow-lg:  0rem 0.1rem 0.5rem 0.05rem hsl(0 0% 0% / 0.10), 
                0rem 4px 6px -0.95px hsl(0 0% 0% / 0.10);
  --shadow-xl:  0rem 0.1rem 0.5rem 0.05rem hsl(0 0% 0% / 0.10), 
                0rem 8px 10px -0.95px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0rem 0.1rem 0.5rem 0.05rem hsl(0 0% 0% / 0.25);
}

/* Shadows (Dark Mode) */
.dark {
  --shadow-opacity: 0.6;
  
  --shadow-2xs: 0rem 0.1rem 0.5rem 0.05rem hsl(0 0% 0% / 0.30);
  --shadow-xs:  0rem 0.1rem 0.5rem 0.05rem hsl(0 0% 0% / 0.30);
  --shadow-sm:  0rem 0.1rem 0.5rem 0.05rem hsl(0 0% 0% / 0.60), 
                0rem 1px 2px -0.95px hsl(0 0% 0% / 0.60);
  --shadow:     0rem 0.1rem 0.5rem 0.05rem hsl(0 0% 0% / 0.60), 
                0rem 1px 2px -0.95px hsl(0 0% 0% / 0.60);
  --shadow-md:  0rem 0.1rem 0.5rem 0.05rem hsl(0 0% 0% / 0.60), 
                0rem 2px 4px -0.95px hsl(0 0% 0% / 0.60);
  --shadow-lg:  0rem 0.1rem 0.5rem 0.05rem hsl(0 0% 0% / 0.60), 
                0rem 4px 6px -0.95px hsl(0 0% 0% / 0.60);
  --shadow-xl:  0rem 0.1rem 0.5rem 0.05rem hsl(0 0% 0% / 0.60), 
                0rem 8px 10px -0.95px hsl(0 0% 0% / 0.60);
  --shadow-2xl: 0rem 0.1rem 0.5rem 0.05rem hsl(0 0% 0% / 1.50);
}

/* ============================================
   USAGE IN CSS
   ============================================ */

/*
Example: Using color variables
*/
.my-element {
  background: var(--primary);
  color: var(--primary-foreground);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-lg);
  border-radius: var(--radius);
  font-family: var(--font-sans);
  letter-spacing: var(--tracking-normal);
}

/*
Example: Creating gradients
*/
.my-gradient {
  background: linear-gradient(
    135deg,
    var(--primary),
    var(--accent)
  );
}

/*
Example: Using chart colors
*/
.chart-element-1 { background: var(--chart-1); }
.chart-element-2 { background: var(--chart-2); }
.chart-element-3 { background: var(--chart-3); }

/* ============================================
   USAGE IN TAILWIND
   ============================================ */

/*
Direct usage (configured in tailwind.config.js):

<div className="bg-primary text-primary-foreground">
<div className="border-border shadow-lg rounded-lg">
<div className="text-muted-foreground font-sans">

Chart colors:
<div className="bg-chart-1">
<div className="bg-chart-2">

Shadows:
<div className="shadow-sm">
<div className="shadow-md">
<div className="shadow-lg">

Border radius:
<div className="rounded-sm">  // 4px
<div className="rounded-md">  // 6px
<div className="rounded-lg">  // 8px
<div className="rounded-xl">  // 12px
*/

/* ============================================
   COLOR PALETTE REFERENCE
   ============================================ */

/*
Visual representation (approximate):

PRIMARY (Vibrant Green)
███████████ oklch(0.6273 0.1700 149.2005)

SECONDARY (Light Mint)
███████████ oklch(0.9303 0.0528 159.6007)

ACCENT (Soft Mint)
███████████ oklch(0.9439 0.0423 159.9135)

MUTED (Light Gray)
███████████ oklch(0.9684 0.0068 247.8951)

BORDER (Subtle Green-Gray)
███████████ oklch(0.9516 0.0364 160.0815)

CHART-1 (Bright Green)
███████████ oklch(0.7763 0.2066 149.5172)

CHART-2 (Mid Green)
███████████ oklch(0.6526 0.2090 142.7082)

CHART-3 (Teal)
███████████ oklch(0.8187 0.1407 167.2174)
*/

/* ============================================
   BEST PRACTICES
   ============================================ */

/*
1. Always use CSS variables instead of hardcoded colors
   ✓ background: var(--primary);
   ✗ background: #00ff00;

2. Use semantic color names
   ✓ var(--muted-foreground)
   ✗ var(--gray-500)

3. Prefer OKLCH for custom colors (better perceptual uniformity)

4. Test in both light and dark mode

5. Use chart colors for data visualization

6. Apply proper shadows for depth
   - sm/xs: subtle elements
   - md: default cards
   - lg: elevated cards
   - xl: premium elements
   - 2xl: hero sections

7. Maintain consistency with radius
   - sm: small buttons, badges
   - md: inputs, small cards
   - lg: large buttons, cards
   - xl: modals, large cards
*/

/* ============================================
   TAILWIND CONFIG INTEGRATION
   ============================================ */

/*
All variables are available in Tailwind via:

colors: {
  background: "var(--background)",
  foreground: "var(--foreground)",
  primary: {
    DEFAULT: "var(--primary)",
    foreground: "var(--primary-foreground)",
  },
  // ... etc
}

boxShadow: {
  sm: "var(--shadow-sm)",
  md: "var(--shadow-md)",
  lg: "var(--shadow-lg)",
  // ... etc
}

borderRadius: {
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  xl: "var(--radius-xl)",
}

fontFamily: {
  sans: "var(--font-sans)",
  serif: "var(--font-serif)",
  mono: "var(--font-mono)",
}
*/
