@echo off
echo 🚀 AI Titan DeepSeek Agent Installation
echo ==================================================
echo.
echo Installing AI Titan package globally...
echo.

REM Check if Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Python is not installed or not in PATH
    echo Please install Python and try again.
    pause
    exit /b 1
)

REM Install the package
python -m pip install -e .
if errorlevel 1 (
    echo ❌ Installation failed
    pause
    exit /b 1
)

echo.
echo 🎉 Installation completed successfully!
echo.
echo 📋 Usage Instructions:
echo ==============================
echo.
echo 1. From anywhere in your system, run:
echo    deepseek-agent "Your prompt here"
echo.
echo 2. For interactive mode:
echo    deepseek-agent --interactive
echo.
echo 3. With custom parameters:
echo    deepseek-agent "Your prompt" --temperature 0.5 --max-tokens 500
echo.
echo 4. In your Python projects:
echo    from ai_titan.agent import run_deepseek_agent
echo    response = run_deepseek_agent('Your prompt')
echo.
echo ✨ The agent is now available globally across all your projects!
echo.
pause