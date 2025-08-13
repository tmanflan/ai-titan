@echo off
echo AI Titan DeepSeek Agent - Open VSX Publishing Script
echo ================================================
echo.

echo Checking for Open VSX CLI...
npm list -g ovsx >nul 2>&1
if %errorlevel% neq 0 (
    echo Open VSX CLI not found. Installing...
    npm install -g ovsx
    echo Open VSX CLI installed successfully!
) else (
    echo Open VSX CLI found!
)

echo.
echo Checking for VSIX file...
if exist "ai-titan-deepseek-agent-1.0.0.vsix" (
    echo VSIX file found: ai-titan-deepseek-agent-1.0.0.vsix
) else (
    echo ERROR: VSIX file not found!
    pause
    exit /b 1
)

echo.
echo To publish to Open VSX, you need a personal access token.
echo Get your token from: https://open-vsx.org/user-settings/tokens
echo.
set /p token="Enter your Open VSX access token (or press Enter to skip): "

if "%token%"=="" (
    echo No token provided. Skipping publication.
    echo You can manually publish using: ovsx publish ai-titan-deepseek-agent-1.0.0.vsix -p YOUR_TOKEN
) else (
    echo Publishing to Open VSX...
    ovsx publish ai-titan-deepseek-agent-1.0.0.vsix -p %token%
    if %errorlevel% equ 0 (
        echo Extension published successfully to Open VSX!
    ) else (
        echo ERROR: Failed to publish extension.
    )
)

echo.
echo Publishing process completed!
echo Check your extension at: https://open-vsx.org/
echo.
pause