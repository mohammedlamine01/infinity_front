# Infinity Club Frontend - Quick Install Script
# Run this script to install all required dependencies

Write-Host "🚀 Installing Infinity Club Frontend Dependencies..." -ForegroundColor Green
Write-Host ""

# Navigate to the project directory
Set-Location -Path "c:\Users\home\Desktop\infinity\infinity_front"

Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install axios next-themes lucide-react class-variance-authority clsx tailwind-merge @radix-ui/react-slot @radix-ui/react-toast tailwindcss-animate

Write-Host ""
Write-Host "✅ Installation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  Don't forget to:" -ForegroundColor Yellow
Write-Host "   1. Add your club logo to public/infinity_club_logo.png"
Write-Host "   2. Make sure your Laravel backend is running on port 8000"
Write-Host ""
Write-Host "🎯 To start the development server, run:" -ForegroundColor Cyan
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Then open: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
