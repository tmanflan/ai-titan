@echo off
echo.
echo 🚀 AI Titan DeepSeek Agent - One-Click Setup
echo =============================================
echo.
echo This will automatically:
echo - Set up the package structure
echo - Configure the project files
echo - Install the agent globally
echo - Test the installation
echo.
pause
echo.

REM Check if Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Python is not installed or not in PATH
    echo Please install Python and try again.
    pause
    exit /b 1
)

echo 🔧 Running automated setup...
echo.

REM Run the automated setup script
python setup_global_agent.py

if errorlevel 1 (
    echo.
    echo ❌ Setup failed. Please check the errors above.
    pause
    exit /b 1
)

echo.
echo 🎉 Setup completed! The agent is now available globally.
echo.
echo 📋 Quick Test:
echo ===============
echo.
echo Testing the global command...
deepseek-agent "Hello, test the global installation"

echo.
echo ✨ Success! You can now use 'deepseek-agent' from anywhere!
echo.
echo 📚 Next steps:
echo - Try: deepseek-agent --interactive
echo - Or use in Python: from ai_titan.agent import run_deepseek_agent
echo - Run: python quick_start.py for examples
echo.
pause