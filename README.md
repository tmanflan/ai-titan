# TitanForge

TitanForge is a powerful meta-app builder: visually or textually define app components, and generate deployable code with AI.

## Features

- **Text-to-Code**: Describe your app in natural language and get working React code
- **Visual Builder**: Drag and drop components to design your UI
- **Image-to-Code**: Upload wireframes or mockups and convert them to code
- **AI-Powered**: Leverages DeepSeek AI for intelligent code generation

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Copy `.env.example` to `Secrets.env` and add your API keys
3. Install dependencies:

```bash
# Install backend dependencies
cd app-builder-backend
npm install

# Install frontend dependencies
cd ../app-builder-frontend
npm install
```

### Running the Application

```bash
# Start the backend server (from app-builder-backend directory)
npm start

# Start the frontend development server (from app-builder-frontend directory)
npm run dev
```

## Usage

1. Open your browser to http://localhost:5173 (or the port shown in your terminal)
2. Use the text input to describe your app or use the drag-and-drop interface
3. Click "Generate Code" to create your application
4. Export the generated code for use in your projects

## Development Roadmap

- User authentication and project saving
- More component types and customization options
- Direct deployment to hosting platforms
- Advanced AI features and code optimization
