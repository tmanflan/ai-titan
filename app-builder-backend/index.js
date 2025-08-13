require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { callDeepSeek } = require('./deepseek');
const { img2code } = require('./img2code_integration');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
app.use(cors());
app.use(express.json());

// POST /image-to-code: Accepts an image, extracts UI, sends to DeepSeek, returns code
app.post('/image-to-code', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
  try {
    // Step 1: Extract UI description/code from image
    const uiDescription = await img2code(req.file.path);
    // Step 2: Send to DeepSeek for code generation
    const result = await callDeepSeek(uiDescription);
    res.json({ uiDescription, code: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /deepseek: Accepts a prompt and returns DeepSeek API response
app.post('/deepseek', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });
  try {
    const result = await callDeepSeek(prompt);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /generate: Accepts app definition and returns generated React code
app.post('/generate', (req, res) => {
  const appDefinition = req.body;
  const generatedCode = generateReactApp(appDefinition);
  res.send({ code: generatedCode });
});

function generateReactApp(definition) {
  // Simple code generation: map components to JSX
  const renderComponent = (c) => {
    switch (c.type) {
      case 'Button':
        return `<button>${c.label || 'Button'}</button>`;
      case 'Input':
        return `<input placeholder="${c.label || 'Input'}" />`;
      case 'Form':
        return `<form><input placeholder="Form Input" /></form>`;
      default:
        return `<div>Unknown</div>`;
    }
  };
  
  // Handle both text description and component array
  if (definition.description) {
    // Simple placeholder implementation for text-to-code
    return `import React from 'react';

function App() {
  return (
    <div>
      <h1>App from Description</h1>
      <p>Based on: "${definition.description}"</p>
    </div>
  );
}

export default App;
`;
  } else if (definition.components && Array.isArray(definition.components)) {
    return `import React from 'react';

function App() {
  return (
    <div>
      ${definition.components.map(renderComponent).join('\n      ')}
    </div>
  );
}

export default App;
`;
  } else {
    return `import React from 'react';

function App() {
  return (
    <div>
      <p>No valid definition provided</p>
    </div>
  );
}

export default App;
`;
  }
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
