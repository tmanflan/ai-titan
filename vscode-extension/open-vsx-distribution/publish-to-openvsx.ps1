# Open VSX Publishing Script for AI Titan DeepSeek Agent
# This script helps publish the extension to Open VSX marketplace

Write-Host "AI Titan DeepSeek Agent - Open VSX Publishing Script" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green

# Check if ovsx CLI is installed
Write-Host "Checking for Open VSX CLI..." -ForegroundColor Yellow
try {
    $ovsxVersion = ovsx --version
    Write-Host "Open VSX CLI found: $ovsxVersion" -ForegroundColor Green
} catch {
    Write-Host "Open VSX CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g ovsx
    Write-Host "Open VSX CLI installed successfully!" -ForegroundColor Green
}

# Check if VSIX file exists
if (Test-Path "ai-titan-deepseek-agent-1.0.0.vsix") {
    Write-Host "VSIX file found: ai-titan-deepseek-agent-1.0.0.vsix" -ForegroundColor Green
} else {
    Write-Host "ERROR: VSIX file not found!" -ForegroundColor Red
    exit 1
}

# Prompt for access token
Write-Host ""
Write-Host "To publish to Open VSX, you need a personal access token." -ForegroundColor Cyan
Write-Host "Get your token from: https://open-vsx.org/user-settings/tokens" -ForegroundColor Cyan
Write-Host ""
$token = Read-Host "Enter your Open VSX access token (or press Enter to skip publishing)"

if ([string]::IsNullOrWhiteSpace($token)) {
    Write-Host "No token provided. Skipping publication." -ForegroundColor Yellow
    Write-Host "You can manually publish using: ovsx publish ai-titan-deepseek-agent-1.0.0.vsix -p YOUR_TOKEN" -ForegroundColor Cyan
} else {
    Write-Host "Publishing to Open VSX..." -ForegroundColor Yellow
    try {
        ovsx publish ai-titan-deepseek-agent-1.0.0.vsix -p $token
        Write-Host "Extension published successfully to Open VSX!" -ForegroundColor Green
    } catch {
        Write-Host "ERROR: Failed to publish extension." -ForegroundColor Red
        Write-Host "Error details: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Publishing process completed!" -ForegroundColor Green
Write-Host "Check your extension at: https://open-vsx.org/" -ForegroundColor Cyan

Pause