#!/usr/bin/env powershell

# AI Titan DeepSeek Agent - One-Click PowerShell Setup

Write-Host ""
Write-Host "🚀 AI Titan DeepSeek Agent - One-Click Setup" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This will automatically:" -ForegroundColor Yellow
Write-Host "- Set up the package structure" -ForegroundColor White
Write-Host "- Configure the project files" -ForegroundColor White
Write-Host "- Install the agent globally" -ForegroundColor White
Write-Host "- Test the installation" -ForegroundColor White
Write-Host ""

# Prompt user to continue
$continue = Read-Host "Press Enter to continue or Ctrl+C to cancel"

Write-Host ""
Write-Host "🔍 Checking Python installation..." -ForegroundColor Yellow

# Check if Python is available
try {
    $pythonVersion = python --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Python found: $pythonVersion" -ForegroundColor Green
    } else {
        throw "Python not found"
    }
} catch {
    Write-Host "❌ Error: Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Python and try again." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "🔧 Running automated setup..." -ForegroundColor Yellow
Write-Host ""

# Run the automated setup script
try {
    python setup_global_agent.py
    
    if ($LASTEXITCODE -ne 0) {
        throw "Setup script failed"
    }
    
    Write-Host ""
    Write-Host "🎉 Setup completed! The agent is now available globally." -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Quick Test:" -ForegroundColor Cyan
    Write-Host "===============" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Testing the global command..." -ForegroundColor Yellow
    
    # Test the installation
    deepseek-agent "Hello, test the global installation"
    
    Write-Host ""
    Write-Host "✨ Success! You can now use 'deepseek-agent' from anywhere!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📚 Next steps:" -ForegroundColor Cyan
    Write-Host "- Try: deepseek-agent --interactive" -ForegroundColor White
    Write-Host "- Or use in Python: from ai_titan.agent import run_deepseek_agent" -ForegroundColor White
    Write-Host "- Run: python quick_start.py for examples" -ForegroundColor White
    
} catch {
    Write-Host ""
    Write-Host "❌ Setup failed. Please check the errors above." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Read-Host "Press Enter to exit"