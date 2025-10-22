# Remove TypeScript type annotations from JSX files

Write-Host "Removing TypeScript type annotations from JSX files..." -ForegroundColor Green

$files = Get-ChildItem -Path "c:\Users\home\Desktop\infinity\infinity_front\src" -Recurse -Filter "*.jsx"

foreach ($file in $files) {
    Write-Host "Processing: $($file.FullName)" -ForegroundColor Yellow
    
    $content = Get-Content $file.FullName -Raw
    
    # Remove ": keyof Translations" type annotations
    $content = $content -replace ': keyof Translations', ''
    
    # Remove ", Translations" from imports
    $content = $content -replace ', Translations\s*}', ' }'
    $content = $content -replace '\{\s*Translations\s*,', '{'
    
    # Remove other common type annotations in function parameters
    $content = $content -replace '\(([^)]+):\s*[A-Za-z<>|&\[\]]+\s*\)', '($1)'
    
    # Save the file
    Set-Content -Path $file.FullName -Value $content -NoNewline
}

Write-Host "`nType annotations removed!" -ForegroundColor Green
