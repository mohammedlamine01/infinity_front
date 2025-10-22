# Convert all TSX files to JSX

Write-Host "Converting all .tsx files to .jsx..." -ForegroundColor Green

# Change to the src directory
Set-Location "c:\Users\home\Desktop\infinity\infinity_front\src"

# Function to rename files
function Rename-ToJSX {
    param (
        [string]$Path
    )
    
    Get-ChildItem -Path $Path -Recurse -Filter "*.tsx" | ForEach-Object {
        $newName = $_.Name -replace "\.tsx$", ".jsx"
        $newPath = Join-Path $_.Directory $newName
        
        Write-Host "Renaming: $($_.FullName) -> $newPath" -ForegroundColor Yellow
        Rename-Item -Path $_.FullName -NewName $newName -Force
    }
}

# Convert all .tsx files
Rename-ToJSX -Path "."

Write-Host "`nConversion complete!" -ForegroundColor Green
Write-Host "All .tsx files have been converted to .jsx" -ForegroundColor Cyan

# Delete the .ts file in utils (keep only .js)
if (Test-Path "utils\i18n.ts") {
    Remove-Item "utils\i18n.ts" -Force
    Write-Host "Removed utils\i18n.ts (using .js version)" -ForegroundColor Yellow
}

Set-Location "c:\Users\home\Desktop\infinity\infinity_front"
