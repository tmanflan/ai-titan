# AI Titan DeepSeek Agent - VSIX Builder Script
# PowerShell script to build and package the VS Code extension

Write-Host "🚀 AI Titan DeepSeek Agent - VSIX Builder" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Cyan

# Function to check if a command exists
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Function to run command with error handling
function Invoke-SafeCommand($command, $description) {
    Write-Host "\n$description..." -ForegroundColor Yellow
    try {
        Invoke-Expression $command
        Write-Host "✅ $description completed" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "❌ $description failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Check requirements
Write-Host "\n📋 Checking requirements..." -ForegroundColor Yellow

if (-not (Test-Command "node")) {
    Write-Host "❌ Node.js not found. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Node.js found" -ForegroundColor Green

if (-not (Test-Command "npm")) {
    Write-Host "❌ npm not found. Please install Node.js" -ForegroundColor Red
    exit 1
}
Write-Host "✅ npm found" -ForegroundColor Green

# Check if vsce is installed
try {
    npx vsce --version | Out-Null
    Write-Host "✅ vsce found" -ForegroundColor Green
}
catch {
    Write-Host "📦 Installing vsce..." -ForegroundColor Yellow
    npm install -g @vscode/vsce
    Write-Host "✅ vsce installed" -ForegroundColor Green
}

# Install dependencies
if (-not (Invoke-SafeCommand "npm install" "Installing dependencies")) {
    exit 1
}

# Compile TypeScript
if (-not (Invoke-SafeCommand "npm run compile" "Compiling TypeScript")) {
    exit 1
}

# Check for icon
Write-Host "\n🎨 Checking icon files..." -ForegroundColor Yellow
$iconPath = "images\icon.png"
$icon32Path = "images\icon-32x32.png"
$icon256Path = "images\icon-256x256.png"

if (Test-Path $iconPath) {
    Write-Host "✅ Main icon found (icon.png)" -ForegroundColor Green
} else {
    Write-Host "⚠️  Main PNG icon not found at $iconPath" -ForegroundColor Yellow
    Write-Host "   Please ensure you have the main icon.png file" -ForegroundColor Yellow
}

if (Test-Path $icon32Path) {
    Write-Host "✅ 32x32 icon found" -ForegroundColor Green
} else {
    Write-Host "ℹ️  Optional 32x32 icon not found at $icon32Path" -ForegroundColor Blue
}

if (Test-Path $icon256Path) {
    Write-Host "✅ 256x256 icon found" -ForegroundColor Green
} else {
    Write-Host "ℹ️  Optional 256x256 icon not found at $icon256Path" -ForegroundColor Blue
}

# Ensure images directory exists
if (-not (Test-Path "images")) {
    New-Item -ItemType Directory -Path "images" -Force | Out-Null
    Write-Host "📁 Created images directory" -ForegroundColor Yellow
}

Write-Host "\n📝 Icon Requirements for VS Code Extensions:" -ForegroundColor Cyan
Write-Host "• Main icon: 128x128 PNG (required for marketplace)" -ForegroundColor White
Write-Host "• Your PNG files: 32x32 and 256x256 (perfect for different contexts)" -ForegroundColor White
Write-Host "• Ensure PNG files are optimized for best marketplace presentation" -ForegroundColor White

# Clean previous builds
Write-Host "\n🧹 Cleaning previous builds..." -ForegroundColor Yellow
Get-ChildItem -Path "." -Filter "*.vsix" | Remove-Item -Force -ErrorAction SilentlyContinue
Write-Host "✅ Cleanup completed" -ForegroundColor Green

# Package extension
Write-Host "\n📦 Packaging extension..." -ForegroundColor Yellow
try {
    npx vsce package
    
    # Find the generated VSIX file
    $vsixFile = Get-ChildItem -Path "." -Filter "*.vsix" | Select-Object -First 1
    
    if ($vsixFile) {
        Write-Host "\n🎉 Extension packaged successfully: $($vsixFile.Name)" -ForegroundColor Green
        Write-Host "\n📋 Next steps:" -ForegroundColor Cyan
        Write-Host "1. Test the extension:" -ForegroundColor White
        Write-Host "   code --install-extension $($vsixFile.Name)" -ForegroundColor Gray
        Write-Host "2. Publish to marketplace:" -ForegroundColor White
        Write-Host "   npx vsce publish" -ForegroundColor Gray
        Write-Host "3. Or upload manually to:" -ForegroundColor White
        Write-Host "   https://marketplace.visualstudio.com/manage" -ForegroundColor Gray
        
        Write-Host "\n💰 Marketplace Publishing Tips:" -ForegroundColor Cyan
        Write-Host "• Set up publisher account at https://marketplace.visualstudio.com/" -ForegroundColor White
        Write-Host "• Create Personal Access Token in Azure DevOps" -ForegroundColor White
        Write-Host "• Use 'npx vsce login <publisher-name>' to authenticate" -ForegroundColor White
        Write-Host "• Consider pricing strategy (free trial, paid, subscription)" -ForegroundColor White
        
    } else {
        Write-Host "❌ VSIX file not found" -ForegroundColor Red
        exit 1
    }
    
} catch {
    Write-Host "❌ Packaging failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "\n🎊 Build completed successfully!" -ForegroundColor Green
Write-Host "🚀 Your VS Code extension is ready for the marketplace!" -ForegroundColor Green

# Optional: Open the marketplace management page
$openMarketplace = Read-Host "\nWould you like to open the VS Code Marketplace management page? (y/n)"
if ($openMarketplace -eq 'y' -or $openMarketplace -eq 'Y') {
    Start-Process "https://marketplace.visualstudio.com/manage"
}