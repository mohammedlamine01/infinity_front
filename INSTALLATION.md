# Installation Guide for Infinity Club Frontend

## Required Dependencies

Run the following command to install all required packages:

```bash
npm install axios next-themes lucide-react class-variance-authority clsx tailwind-merge @radix-ui/react-slot @radix-ui/react-toast tailwindcss-animate
```

## Individual Package Installation

If you prefer to install packages separately:

```bash
# HTTP client for API calls
npm install axios

# Dark mode support
npm install next-themes

# Icon library
npm install lucide-react

# Utility libraries for styling
npm install class-variance-authority clsx tailwind-merge

# Radix UI primitives for ShadCN components
npm install @radix-ui/react-slot @radix-ui/react-toast

# Tailwind CSS animations
npm install tailwindcss-animate
```

## Setup Steps

1. **Install all dependencies:**
   ```bash
   cd infinity_front
   npm install
   ```

2. **Create environment file:**
   Create `.env.local` in the root of infinity_front:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

3. **Add your logo:**
   - Place `infinity_club_logo.png` in the `public/` folder
   - If you don't have a logo yet, create a placeholder

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000`

## Complete Package.json

Your `package.json` should have these dependencies:

```json
{
  "dependencies": {
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "next": "15.5.6",
    "axios": "^1.7.9",
    "next-themes": "^0.4.4",
    "lucide-react": "^0.468.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.7.0",
    "@radix-ui/react-slot": "^1.1.1",
    "@radix-ui/react-toast": "^1.2.5",
    "tailwindcss-animate": "^1.0.7"
  }
}
```

## Troubleshooting

### If you see module not found errors:
```bash
npm install
```

### If you see TypeScript errors:
The project uses `.jsx` files, so TypeScript errors can be ignored, or you can disable strict type checking.

### If styles don't load:
Make sure Tailwind CSS is properly configured in `tailwind.config.js` and `postcss.config.mjs`.

### If images don't load:
1. Check that your logo is in `public/infinity_club_logo.png`
2. Verify the image file name matches exactly (case-sensitive)

## Backend Connection

Make sure your Laravel backend is running on `http://localhost:8000` before testing authentication features.

Update the API URL in `.env.local` if your backend runs on a different port.
