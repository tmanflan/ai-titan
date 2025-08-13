#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Automated DeepSeek Agent Runner for PowerShell

.DESCRIPTION
    This script provides an easy way to interact with the DeepSeek agent from PowerShell.
    It supports both single prompts and interactive mode.

.PARAMETER Prompt
    The prompt to send to the DeepSeek agent

.PARAMETER Interactive
    Run in interactive mode

.PARAMETER Model
    The model to use (default: deepseek-coder)

.PARAMETER Temperature
    Temperature for response generation (default: 0.7)

.PARAMETER MaxTokens
    Maximum tokens in response (default: 1000)

.EXAMPLE
    .\agent.ps1 "Write a Python function to calculate fibonacci numbers"

.EXAMPLE
    .\agent.ps1 -Interactive

.EXAMPLE
    .\agent.ps1 "Explain React hooks" -Temperature 0.5 -MaxTokens 500
#>

param(
    [Parameter(Position=0, Mandatory=$false)]
    [string]$Prompt,
    
    [Parameter()]
    [switch]$Interactive,
    
    [Parameter()]
    [string]$Model = "deepseek-coder",
    
    [Parameter()]
    [double]$Temperature = 0.7,
    
    [Parameter()]
    [int]$MaxTokens = 1000
)

# Change to script directory
Set-Location $PSScriptRoot

# Function to find Python executable
function Find-Python {
    $pythonPaths = @(
        "../.venv/Scripts/python.exe",
        "../venv/Scripts/python.exe",
        "python.exe",
        "python3.exe"
    )
    
    foreach ($path in $pythonPaths) {
        if (Test-Path $path -ErrorAction SilentlyContinue) {
            return $path
        }
        
        # Try to find in PATH
        try {
            $null = Get-Command $path -ErrorAction Stop
            return $path
        } catch {
            continue
        }
    }
    
    throw "Python not found. Please install Python or activate your virtual environment."
}

# Build arguments
$args = @("run_agent.py")

if ($Interactive) {
    $args += "--interactive"
    $args += "--model", $Model
    $args += "--temperature", $Temperature
    $args += "--max-tokens", $MaxTokens
} elseif ($Prompt) {
    $args += $Prompt
    $args += "--model", $Model
    $args += "--temperature", $Temperature
    $args += "--max-tokens", $MaxTokens
} else {
    Write-Host "Usage: .\agent.ps1 'Your prompt here'" -ForegroundColor Yellow
    Write-Host "Example: .\agent.ps1 'Write a Python function to sort a list'" -ForegroundColor Green
    Write-Host "" 
    Write-Host "For interactive mode: .\agent.ps1 -Interactive" -ForegroundColor Green
    Write-Host ""
    Write-Host "Additional options:" -ForegroundColor Cyan
    Write-Host "  -Model <model_name>     (default: deepseek-coder)"
    Write-Host "  -Temperature <0.0-1.0>  (default: 0.7)"
    Write-Host "  -MaxTokens <number>     (default: 1000)"
    exit 1
}

try {
    $python = Find-Python
    Write-Host "Using Python: $python" -ForegroundColor Gray
    
    & $python @args
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error running the agent. Exit code: $LASTEXITCODE" -ForegroundColor Red
        Write-Host "Make sure Python and dependencies are installed." -ForegroundColor Yellow
    }
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Make sure Python and dependencies are installed." -ForegroundColor Yellow
}