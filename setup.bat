@echo off
echo Installing TitanForge dependencies...

echo Installing backend dependencies...
cd app-builder-backend
npm install

echo Installing frontend dependencies...
cd ../app-builder-frontend
npm install

echo Setup complete! To start the application:
echo 1. Start the backend: cd app-builder-backend && npm start
echo 2. Start the frontend: cd app-builder-frontend && npm run dev

pause