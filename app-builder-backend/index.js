require('dotenv').config();
const express = require('express');
const { callDeepSeek } = require('./deepseek');
const { img2code } = require('./img2code_integration');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
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
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

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
  return `import React from 'react';\n\nfunction App() {\n  return (\n    <div>\n      ${definition.components.map(renderComponent).join('\n      ')}\n    </div>\n  );\n}\n\nexport default App;\n`;
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
