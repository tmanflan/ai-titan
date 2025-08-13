@echo off
REM Automated DeepSeek Agent Runner for Windows
REM Usage: agent.bat "Your prompt here"

cd /d "%~dp0"

if "%1"=="" (
    echo Usage: agent.bat "Your prompt here"
    echo Example: agent.bat "Write a Python function to sort a list"
    echo.
    echo For interactive mode: agent.bat --interactive
    pause
    exit /b 1
)

REM Check if virtual environment exists
if exist "../.venv/Scripts/python.exe" (
    "../.venv/Scripts/python.exe" run_agent.py %*
) else if exist "../venv/Scripts/python.exe" (
    "../venv/Scripts/python.exe" run_agent.py %*
) else (
    python run_agent.py %*
)

if %errorlevel% neq 0 (
    echo.
    echo Error running the agent. Make sure Python and dependencies are installed.
    pause
)